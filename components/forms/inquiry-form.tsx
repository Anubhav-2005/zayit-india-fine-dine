"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function getJaisalmerDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const value = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return `${value.year}-${value.month}-${value.day}`;
}

const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(80, "Keep your name under 80 characters.")
    .regex(
      /^[^\u0000-\u001F\u007F]+$/,
      "Remove control characters from your name.",
    ),
  email: z
    .email("Enter a valid email address.")
    .max(254, "Enter a shorter email address."),
  phone: z
    .string()
    .trim()
    .min(8, "Enter a phone number with country code.")
    .max(24, "Enter a shorter phone number.")
    .regex(
      /^[0-9+().\-\s]+$/,
      "Use only numbers and standard phone punctuation.",
    ),
  date: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        (/^\d{4}-\d{2}-\d{2}$/.test(value) &&
          !Number.isNaN(Date.parse(`${value}T00:00:00+05:30`)) &&
          value >= getJaisalmerDate()),
      "Choose today or a future date.",
    ),
  guests: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        (/^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 500),
      "Enter a guest count between 1 and 500.",
    ),
  message: z
    .string()
    .trim()
    .min(10, "Add a little more detail so the restaurant can help.")
    .max(1200, "Keep your message under 1,200 characters.")
    .refine(
      (value) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value),
      "Remove unsupported control characters from your message.",
    ),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;
export type InquiryKind =
  | "reservation"
  | "event"
  | "private-dining"
  | "contact";

const formCopy: Record<
  InquiryKind,
  { subject: string; messageLabel: string; messagePlaceholder: string }
> = {
  reservation: {
    subject: "Table request",
    messageLabel: "Anything the restaurant should know?",
    messagePlaceholder:
      "Preferred time, occasion, dietary questions or seating request…",
  },
  event: {
    subject: "Event enquiry",
    messageLabel: "Tell us about the event",
    messagePlaceholder:
      "Occasion, preferred date, timing and what you would like to plan…",
  },
  "private-dining": {
    subject: "Private dining enquiry",
    messageLabel: "Tell us about the gathering",
    messagePlaceholder:
      "Occasion, approximate group size and the atmosphere you have in mind…",
  },
  contact: {
    subject: "Website enquiry",
    messageLabel: "How can the restaurant help?",
    messagePlaceholder: "Write your message…",
  },
};

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

export function InquiryForm({
  kind,
  className,
}: {
  kind: InquiryKind;
  className?: string;
}) {
  const [status, setStatus] = useState("");
  const includePlanningFields = kind !== "contact";
  const earliestDate = getJaisalmerDate();
  const copy = formCopy[kind];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    shouldFocusError: true,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "",
      message: "",
    },
  });

  const onSubmit = (values: InquiryFormValues) => {
    const lines = [
      `${copy.subject} for Zayit India Fine Dine`,
      "",
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      values.date ? `Preferred date: ${values.date}` : "",
      values.guests ? `Guests: ${values.guests}` : "",
      "",
      values.message,
      "",
      "This is an enquiry request, not a confirmed booking.",
    ].filter(Boolean);
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `${copy.subject} — ${values.name}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    setStatus(
      "Your email app is opening with the request prepared. Nothing is sent until you review and send it.",
    );
    window.location.assign(mailto);
  };

  return (
    <form
      className={cn("space-y-8", className)}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label
            htmlFor={`${kind}-name`}
            className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]"
          >
            Name
          </label>
          <Input
            id={`${kind}-name`}
            maxLength={80}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${kind}-name-error` : undefined}
            {...register("name")}
          />
          <FieldError
            id={`${kind}-name-error`}
            message={errors.name?.message}
          />
        </div>
        <div>
          <label
            htmlFor={`${kind}-email`}
            className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]"
          >
            Email
          </label>
          <Input
            id={`${kind}-email`}
            type="email"
            maxLength={254}
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${kind}-email-error` : undefined}
            {...register("email")}
          />
          <FieldError
            id={`${kind}-email-error`}
            message={errors.email?.message}
          />
        </div>
      </div>

      <div className={cn("grid gap-8", includePlanningFields && "md:grid-cols-3")}>
        <div>
          <label
            htmlFor={`${kind}-phone`}
            className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]"
          >
            Phone
          </label>
          <Input
            id={`${kind}-phone`}
            type="tel"
            maxLength={24}
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91…"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${kind}-phone-error` : undefined}
            {...register("phone")}
          />
          <FieldError
            id={`${kind}-phone-error`}
            message={errors.phone?.message}
          />
        </div>
        {includePlanningFields ? (
          <>
            <div>
              <label
                htmlFor={`${kind}-date`}
                className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]"
              >
                Preferred date
              </label>
              <Input
                id={`${kind}-date`}
                type="date"
                min={earliestDate}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={
                  errors.date ? `${kind}-date-error` : undefined
                }
                {...register("date")}
              />
              <FieldError
                id={`${kind}-date-error`}
                message={errors.date?.message}
              />
            </div>
            <div>
              <label
                htmlFor={`${kind}-guests`}
                className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]"
              >
                Approx. guests
              </label>
              <Input
                id={`${kind}-guests`}
                type="number"
                inputMode="numeric"
                min="1"
                max="500"
                aria-invalid={Boolean(errors.guests)}
                aria-describedby={
                  errors.guests ? `${kind}-guests-error` : undefined
                }
                {...register("guests")}
              />
              <FieldError
                id={`${kind}-guests-error`}
                message={errors.guests?.message}
              />
            </div>
          </>
        ) : null}
      </div>

      <div>
        <label
          htmlFor={`${kind}-message`}
          className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]"
        >
          {copy.messageLabel}
        </label>
        <Textarea
          id={`${kind}-message`}
          maxLength={1200}
          placeholder={copy.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? `${kind}-message-error` : undefined
          }
          {...register("message")}
        />
        <FieldError
          id={`${kind}-message-error`}
          message={errors.message?.message}
        />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          Prepare email request
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Button>
        <p className="max-w-lg text-xs leading-6 text-muted">
          This validates your details, then opens your email app. It does not
          create a confirmed reservation. The publicly listed email awaits
          owner confirmation; calling is the verified route.
        </p>
      </div>
      <p role="status" aria-live="polite" className="text-sm font-medium">
        {status}
      </p>
    </form>
  );
}
