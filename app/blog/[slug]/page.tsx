import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/shared/cta-band";
import { SourceStamp } from "@/components/shared/source-stamp";
import { blogPosts, getBlogPost, getSource } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.dek,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const postSources = post.sourceIds
    .map((id) => getSource(id))
    .filter((source) => source !== undefined);

  return (
    <main id="main-content">
      <article>
        <header className="bg-olive px-5 pb-20 pt-40 text-ivory sm:px-8 md:pb-28 md:pt-48 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-gold-light"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to the journal
            </Link>
            <p className="mt-14 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-light">
              {post.category}
            </p>
            <h1 className="hero-display display-balance mt-6 text-[clamp(4rem,9vw,8.5rem)] font-normal leading-[0.76] tracking-[-0.07em]">
              {post.title}
            </h1>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 border-t border-white/22 pt-5 text-[0.62rem] uppercase tracking-[0.13em] text-ivory/58">
              <span>Facts checked {post.checkedAt}</span>
              <span>{post.readTime}</span>
              <span>Original editorial guide</span>
            </div>
          </div>
        </header>

        <div className="px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[0.4fr_1fr]">
            <aside>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-accent">
                Sources used
              </p>
              <ul className="mt-5 border-t border-foreground/20">
                {postSources.map((source) => (
                  <li key={source.id} className="border-b border-foreground/20">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-12 items-center justify-between text-xs hover:text-accent"
                    >
                      {source.label}
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
            <div className="space-y-8">
              <p className="display-balance font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-accent md:text-5xl">
                {post.dek}
              </p>
              {post.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="pretty-copy text-base leading-8 text-muted md:text-lg md:leading-9"
                >
                  {paragraph}
                </p>
              ))}
              <p className="border-l-2 border-accent pl-5 text-sm leading-7 text-muted">
                This note is based on publicly available information and is not
                presented as a firsthand visit, owner statement or current
                restaurant announcement.
              </p>
            </div>
          </div>
        </div>
      </article>

      <SourceStamp />
      <CtaBand />
    </main>
  );
}
