import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { BlogPost } from "@/lib/content";

export function ArticleCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <article
      className={
        featured
          ? "group border-y border-foreground/20 py-8 md:py-12"
          : "group border-t border-foreground/20 py-7"
      }
    >
      <div className="flex items-center justify-between gap-5 text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-muted">
        <span>{post.category}</span>
        <span>{post.readTime}</span>
      </div>
      <h2
        className={
          featured
            ? "display-balance mt-8 max-w-4xl font-serif text-5xl font-normal leading-[0.85] tracking-[-0.055em] md:text-7xl"
            : "display-balance mt-7 font-serif text-4xl font-normal leading-[0.9] tracking-[-0.045em]"
        }
      >
        <Link href={`/blog/${post.slug}`} className="hover:text-accent">
          {post.title}
        </Link>
      </h2>
      <p className="pretty-copy mt-5 max-w-2xl text-sm leading-7 text-muted">
        {post.dek}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="rule-link mt-7"
        aria-label={`Read ${post.title}`}
      >
        Read the note
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}
