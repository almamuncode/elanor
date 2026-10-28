import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPolicy, POLICIES } from "@/lib/policies";

export function generateStaticParams() {
  return POLICIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  return { title: policy ? `${policy.title} (draft)` : "Policy not found" };
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{policy.title}</span>
      </nav>
      <div className="pagehead">
        <h1 className="d-xl">{policy.title}</h1>
        <p>
          <span className="tag">Draft policy</span>
        </p>
      </div>
      <article className="policy">
        <p className="lede" style={{ maxWidth: "52ch", color: "var(--ink)" }}>
          {policy.intro}
        </p>
        {policy.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        <p className="note" style={{ marginTop: 40 }}>
          This is a placeholder written for the concept demo. It is not a binding policy and will be replaced before launch.
        </p>
      </article>
    </div>
  );
}
