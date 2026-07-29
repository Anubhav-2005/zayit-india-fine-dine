export function AssetRightsNotice() {
  return (
    <aside className="border border-foreground/25 bg-sand/60 p-6 md:p-8">
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-accent">
        Private preview asset notice
      </p>
      <p className="pretty-copy mt-4 max-w-4xl text-sm leading-7 text-muted">
        Restaurant-specific image crops in this private working preview come
        from Zayit’s public social profile and do not establish a reuse licence.
        Before public launch, replace them with the owner’s original
        high-resolution files and photographer permissions. No traveller photos
        or AI-generated images are used.
      </p>
    </aside>
  );
}
