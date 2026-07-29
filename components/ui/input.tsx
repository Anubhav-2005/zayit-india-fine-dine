import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full rounded-none border-0 border-b border-foreground/25 bg-transparent px-0 text-base text-foreground shadow-none transition-colors placeholder:text-muted/65 focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
