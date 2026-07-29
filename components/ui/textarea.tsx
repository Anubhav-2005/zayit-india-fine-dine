import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-28 w-full resize-y rounded-none border-0 border-b border-foreground/25 bg-transparent px-0 py-3 text-base text-foreground shadow-none transition-colors placeholder:text-muted/65 focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
