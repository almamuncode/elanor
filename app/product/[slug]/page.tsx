import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyPanel from "@/components/BuyPanel";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import { categoryLabel, getProduct, PRODUCTS, relatedTo } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Look not found" };
  const description = `${product.summary} Sample product in ${product.colorLabel.toLowerCase()}.`;
  return {
    title: product.name,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description,
      images: [{ url: product.front.src, width: 1024, height: 1536, alt: product.front.alt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = relatedTo(product.slug);

  return (
    <>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/shop?category=${product.category}`}>{categoryLabel(product.category)}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
        <div className="pdp">
          <ProductGallery images={[product.front, product.back, product.detail]} name={product.name} />
          <BuyPanel
            product={{
              slug: product.slug,
              name: product.name,
              price: product.price,
              colorLabel: product.colorLabel,
              swatches: product.swatches,
              summary: product.summary,
            }}
          />
        </div>
      </div>

      <section className="wrap detail-strip" aria-labelledby="detail-title">
        <div>
          <h2 className="d-l" id="detail-title">
            The detail
          </h2>
          <p className="muted" style={{ margin: 0, maxWidth: "34ch" }}>
            A closer look at the pieces. Alternate views are illustrative concept images and may differ slightly from the front view.
          </p>
        </div>
        <figure>
          <Image src={product.detail.src} alt={product.detail.alt} width={1024} height={1536} sizes="(min-width: 1024px) 45vw, 100vw" />
        </figure>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }} aria-labelledby="related-title">
        <div className="sec-head" style={{ marginBottom: "var(--s7)" }}>
          <h2 className="d-m" id="related-title">
            You may also like
          </h2>
          <div>
            <Link className="link" href="/shop">
              View all looks
            </Link>
          </div>
        </div>
        <div className="pgrid" style={{ padding: 0 }}>
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
