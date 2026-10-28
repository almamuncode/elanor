import Image, { getImageProps } from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { CATEGORIES, countIn, FEATURED_SLUGS, getProduct, type Product } from "@/lib/products";

const CATEGORY_IMAGES = {
  tailoring: { src: "/images/category-tailoring.png", alt: "Woman in rust tailoring beside a caramel armchair" },
  dresses: { src: "/images/category-dresses.png", alt: "Woman in a burgundy shirt dress beside a plaster doorway" },
  everyday: { src: "/images/category-everyday.png", alt: "Woman in an ivory cardigan and brown trousers seated by a window" },
} as const;

function Hero() {
  const alt = "Woman in rust tailoring standing in a sunlit plaster room beside a caramel leather armchair";
  // One <picture>, so only the matching source downloads; eager + high priority for LCP.
  const common = { alt, quality: 75, loading: "eager" as const, fetchPriority: "high" as const };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: "/images/hero-campaign.png", width: 1536, height: 1024, sizes: "(min-width: 1600px) 1110px, 72vw" });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: "/images/hero-mobile.png", width: 1024, height: 1536, sizes: "100vw" });

  return (
    <section className="wrap" aria-labelledby="hero-title">
      <div className="hero">
        <div className="hero__media">
          <picture>
            <source media="(min-width: 768px)" srcSet={desktop} />
            <source srcSet={mobile} />
            {/* Art-directed <picture>: getImageProps supplies src, srcSet, sizes and alt. */}
            <img {...rest} alt={alt} />
          </picture>
        </div>
        <div className="hero__copy">
          <h1 className="d-xxl hero__title" id="hero-title">
            A new
            <br />
            point
            <br />
            of view
          </h1>
          <span className="script hero__script" aria-hidden="true">
            élan
          </span>
        </div>
        <div className="hero__foot">
          <p className="lede" style={{ margin: 0 }}>
            Everyday pieces with an individual point of view. Tailoring, dresses and easy layers in warm, wearable colour.
          </p>
          <div>
            <Link className="btn" href="/shop">
              Explore the collection
            </Link>
          </div>
        </div>
        <div className="hero__caption">
          <span>
            <span className="muted">Worn here:</span> The Rust Tailoring Look
          </span>
          <Link className="link" href="/product/rust-tailoring">
            Shop the look
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const featured = FEATURED_SLUGS.map(getProduct).filter((p): p is Product => p !== undefined);

  return (
    <>
      <Hero />

      <section className="sec wrap" aria-labelledby="edit-title">
        <div className="sec-head">
          <h2 className="d-l" id="edit-title">
            The edit
          </h2>
          <div>
            <p>Four looks to start with: a knit for every day, a soft midi, a trench and a striped shirt.</p>
            <Link className="link" href="/shop">
              View all 8 looks
            </Link>
          </div>
        </div>
        <div className="feat">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="wrap camp" aria-labelledby="camp-title">
        <figure className="camp__media" style={{ marginBlock: 0 }}>
          <Image
            src="/images/campaign-soft-structure.png"
            alt="Woman in an olive midi dress seated on a caramel leather sofa"
            width={1536}
            height={1024}
            sizes="(min-width: 1600px) 1504px, 100vw"
          />
        </figure>
        <div className="camp__copy">
          <h2 className="d-xl" id="camp-title">
            Soft
            <br />
            structure
          </h2>
          <p>A gathered waist, full sleeves and a skirt that moves. Dresses that hold their shape through the whole day.</p>
          <div>
            <Link className="link" href="/shop?category=dresses">
              Shop dresses
            </Link>
          </div>
        </div>
      </section>

      <section className="sec wrap" aria-labelledby="cat-title">
        <div className="sec-head">
          <h2 className="d-l" id="cat-title">
            Shop by
            <br />
            category
          </h2>
          <div>
            <p>Three ways into the collection.</p>
          </div>
        </div>
        <div className="cats">
          {CATEGORIES.map((c) => {
            const n = countIn(c.slug);
            return (
              <Link key={c.slug} className="cat" href={`/shop?category=${c.slug}`}>
                <div className="cat__media">
                  <Image src={CATEGORY_IMAGES[c.slug].src} alt={CATEGORY_IMAGES[c.slug].alt} width={1024} height={1536} sizes="(min-width: 1024px) 40vw, 78vw" />
                </div>
                <div className="cat__meta">
                  <span className="d-s">{c.label}</span>
                  <span className="go">{n} looks</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="sec wrap stmt" aria-labelledby="stmt-title" style={{ paddingTop: 0 }}>
        <hr className="rule" style={{ marginBottom: "var(--s9)" }} />
        <div className="stmt__type">
          <h2 className="d-xl lh-acc" id="stmt-title">
            Chosen with care.
            <br />
            Worn with élan.
          </h2>
        </div>
        <div className="stmt__row">
          <div className="stmt__side">
            <div>
              <p>
                ÉLANOR is built around a simple idea: fewer, better-considered pieces that work together and feel like yours. Clean lines, warm colour,
                nothing that asks for attention it hasn&apos;t earned.
              </p>
              <Link className="link" href="/about">
                Our point of view
              </Link>
            </div>
            <figure style={{ margin: 0 }}>
              <Image src="/images/detail-ivory-knit.png" alt="Close-up of ivory knit stitches and a brown button" width={1536} height={1024} sizes="(min-width: 1024px) 30vw, 100vw" />
            </figure>
          </div>
          <figure className="stmt__big" style={{ margin: 0 }}>
            <Image src="/images/story-fabric-detail.png" alt="Rust suiting and ivory fabric on a caramel leather sofa" width={1536} height={1024} sizes="(min-width: 1024px) 56vw, 100vw" />
            <figcaption className="cap">Illustrative texture study.</figcaption>
          </figure>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
