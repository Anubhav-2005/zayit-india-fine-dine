import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-[color,background-color,border-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "border-foreground bg-foreground px-6 text-background hover:-translate-y-0.5 hover:bg-olive hover:text-ivory",
        gold:
          "border-gold bg-gold px-6 text-olive hover:-translate-y-0.5 hover:bg-gold-light",
        outline:
          "border-current bg-transparent px-6 text-current hover:-translate-y-0.5 hover:bg-foreground hover:text-background",
        ghost:
          "border-transparent bg-transparent px-4 text-current hover:bg-foreground/5",
      },
      size: {
        default: "h-12",
        sm: "h-11 px-5",
        lg: "h-14 px-8",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
