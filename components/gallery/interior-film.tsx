"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { assetPath } from "@/lib/paths";

export function InteriorFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const togglePlayback = async () => {
    if (!started) {
      setStarted(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (!video.paused) {
      video.pause();
      return;
    }

    try {
      await video.play();
      setStarted(true);
    } catch {
      setStarted(false);
    }
  };

  return (
    <figure className="group">
      <div className="relative mx-auto aspect-[9/14] max-h-[46rem] w-full max-w-[32rem] overflow-hidden bg-sand-deep shadow-[0_2rem_5rem_rgba(76,53,24,0.14)]">
        {started ? (
          <video
            ref={videoRef}
            className="size-full object-cover"
            src={assetPath("/images/owner/zayit-interior-film.mp4")}
            preload="metadata"
            playsInline
            muted
            loop
            autoPlay
            controls
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label="Owner-supplied vertical walkthrough film of Zayit’s bright interior"
          />
        ) : (
          <Image
            src={assetPath("/images/owner/zayit-lounge-portrait.avif")}
            alt="The bright ivory-and-blue lounge inside Zayit India Fine Dine"
            fill
            sizes="(max-width: 767px) 92vw, 40vw"
            className="object-cover"
          />
        )}
        {!started || !playing ? (
          <button
            type="button"
            onClick={togglePlayback}
            className="absolute inset-0 grid place-items-center bg-linear-to-t from-olive/45 via-transparent to-transparent text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-light"
            aria-label={started ? "Resume interior film" : "Play interior film"}
          >
            <span className="grid size-16 place-items-center rounded-full border border-white/55 bg-olive/78 shadow-xl backdrop-blur-md transition-transform group-hover:scale-105 motion-reduce:transition-none">
              <Play aria-hidden="true" className="ml-1 size-5 fill-current" />
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={togglePlayback}
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/45 bg-olive/72 text-ivory opacity-0 backdrop-blur-md transition-opacity hover:bg-olive focus-visible:opacity-100 group-hover:opacity-100"
            aria-label="Pause interior film"
          >
            <Pause aria-hidden="true" className="size-4 fill-current" />
          </button>
        )}
      </div>
      <figcaption className="mx-auto mt-4 flex max-w-[32rem] items-center justify-between border-b border-foreground/18 pb-3 text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-muted">
        <span>Owner-supplied film</span>
        <span>Tap to play · sound off</span>
      </figcaption>
    </figure>
  );
}
