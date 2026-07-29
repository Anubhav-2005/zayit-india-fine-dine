"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AudioContextConstructor = new (
  contextOptions?: AudioContextOptions,
) => AudioContext;

type WebAudioWindow = Window & {
  webkitAudioContext?: AudioContextConstructor;
};

type AmbientEngine = {
  context: AudioContext;
  master: GainNode;
  noise: AudioBufferSourceNode;
  lfo: OscillatorNode;
};

type AmbientSoundToggleProps = {
  className?: string;
  activeLabel?: string;
  inactiveLabel?: string;
};

function createAmbientEngine(): AmbientEngine | null {
  const audioWindow = window as WebAudioWindow;
  const AudioContextClass =
    window.AudioContext ?? audioWindow.webkitAudioContext;
  if (!AudioContextClass) return null;

  const context = new AudioContextClass({ latencyHint: "playback" });
  const master = context.createGain();
  const filter = context.createBiquadFilter();
  const noiseGain = context.createGain();
  const lfo = context.createOscillator();
  const lfoDepth = context.createGain();

  master.gain.value = 0;
  filter.type = "lowpass";
  filter.frequency.value = 520;
  filter.Q.value = 0.45;
  noiseGain.gain.value = 0.72;
  lfo.frequency.value = 0.075;
  lfoDepth.gain.value = 130;

  const seconds = 3;
  const buffer = context.createBuffer(
    1,
    context.sampleRate * seconds,
    context.sampleRate,
  );
  const channel = buffer.getChannelData(0);
  let previous = 0;

  for (let index = 0; index < channel.length; index += 1) {
    const white = Math.random() * 2 - 1;
    previous = previous * 0.985 + white * 0.015;
    channel[index] = previous * 1.8;
  }

  const noise = context.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  noise.connect(noiseGain);
  noiseGain.connect(filter);
  filter.connect(master);
  master.connect(context.destination);
  lfo.connect(lfoDepth);
  lfoDepth.connect(filter.frequency);
  noise.start();
  lfo.start();

  return { context, master, noise, lfo };
}

export function AmbientSoundToggle({
  className,
  activeLabel = "Pause ambient sound",
  inactiveLabel = "Play ambient sound",
}: AmbientSoundToggleProps) {
  const engineRef = useRef<AmbientEngine | null>(null);
  const suspendTimer = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [status, setStatus] = useState(
    "Ambient sound is off. It will never play without your action.",
  );

  const clearSuspendTimer = useCallback(() => {
    if (suspendTimer.current === null) return;
    window.clearTimeout(suspendTimer.current);
    suspendTimer.current = null;
  }, []);

  const pause = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    clearSuspendTimer();
    const now = engine.context.currentTime;
    engine.master.gain.cancelScheduledValues(now);
    engine.master.gain.setValueAtTime(engine.master.gain.value, now);
    engine.master.gain.linearRampToValueAtTime(0, now + 0.24);
    setIsPlaying(false);
    setStatus("Ambient sound paused.");

    suspendTimer.current = window.setTimeout(() => {
      if (engine.context.state === "running") {
        void engine.context.suspend();
      }
      suspendTimer.current = null;
    }, 280);
  }, [clearSuspendTimer]);

  const play = useCallback(async () => {
    clearSuspendTimer();
    setIsBusy(true);

    try {
      // The context is intentionally created inside this user-initiated handler.
      const engine = engineRef.current ?? createAmbientEngine();
      if (!engine) {
        setStatus("Ambient sound is not supported by this browser.");
        return;
      }
      engineRef.current = engine;

      if (engine.context.state === "suspended") {
        await engine.context.resume();
      }

      const now = engine.context.currentTime;
      engine.master.gain.cancelScheduledValues(now);
      engine.master.gain.setValueAtTime(engine.master.gain.value, now);
      engine.master.gain.linearRampToValueAtTime(0.032, now + 0.65);
      setIsPlaying(true);
      setStatus("Ambient sound playing.");
    } catch {
      setIsPlaying(false);
      setStatus("Ambient sound could not start. Try again after interacting.");
    } finally {
      setIsBusy(false);
    }
  }, [clearSuspendTimer]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      void play();
    }
  }, [isPlaying, pause, play]);

  useEffect(
    () => () => {
      clearSuspendTimer();
      const engine = engineRef.current;
      if (!engine) return;

      try {
        engine.noise.stop();
        engine.lfo.stop();
      } catch {
        // Sources may already be stopped during development remounts.
      }
      void engine.context.close();
      engineRef.current = null;
    },
    [clearSuspendTimer],
  );

  const label = isPlaying ? activeLabel : inactiveLabel;

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn("relative", className)}
        aria-label={label}
        aria-pressed={isPlaying}
        title={label}
        disabled={isBusy}
        onClick={toggle}
      >
        {isPlaying ? (
          <Volume2 aria-hidden="true" className="size-4" />
        ) : (
          <VolumeX aria-hidden="true" className="size-4" />
        )}
      </Button>
      <span className="sr-only" role="status" aria-live="polite">
        {status}
      </span>
    </>
  );
}
