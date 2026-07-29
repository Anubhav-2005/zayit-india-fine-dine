import { ArticleCard } from "@/components/blog/article-card";
import { PageHero } from "@/components/shared/page-hero";
import { SourceStamp } from "@/components/shared/source-stamp";
import { blogPosts } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "City Journal",
  description:
    "Original, source-backed notes on Zayit’s public menu, Jaisalmer landmarks and planning a visit—without invented authors, experiences or restaurant news.",
  path: "/blog",
});

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <main id="main-content">
      <PageHero
        eyebrow="City Journal"
        title="Notes from"
        accent="the Golden City."
        description="Evergreen, source-backed guides to the restaurant, its public menu and the part of Jaisalmer around it."
        meta="Original editorial · no fabricated news or firsthand claims"
      />

      <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-accent">
            Featured note
          </p>
          <div className="mt-7">
            <ArticleCard post={featured} featured />
          </div>
          <div className="mt-16 grid gap-x-12 md:grid-cols-2">
            {rest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <SourceStamp />
    </main>
  );
}
