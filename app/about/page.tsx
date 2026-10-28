import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "ÉLANOR makes everyday pieces with an individual point of view. Proposed brand story for the concept demo.",
};

const PRINCIPLES = [
  { title: "Everyday first", body: "Pieces planned around the days you actually have: work, travel, dinner, the walk home." },
  { title: "Warm, wearable colour", body: "Rust, olive, burgundy, sand and ivory. Colours that sit together, so a wardrobe builds itself." },
  { title: "Your way of wearing it", body: "We show looks, not rules. Take the trench, keep the trousers, make it your own." },
];

export default function AboutPage() {
  return (
    <>
      <div className="wrap">
        <section className="ab-hero" aria-labelledby="about-title">
          <div className="ab-hero__type">
            <span className="script" aria-hidden="true">
              élan
            </span>
            <h1 className="d-xl" id="about-title">
              Pieces with
              <br />a point
              <br />
              of view
            </h1>
            <p className="lede">
              ÉLANOR takes its name from <i>élan</i>: energy, flair, a certain ease. We make everyday clothes for women who already know what they like, and
              want pieces that keep up.
            </p>
          </div>
          <figure>
            <Image
              src="/images/story-editorial-portrait.png"
              alt="Woman in a blue striped shirt seated on a caramel leather sofa"
              width={1024}
              height={1536}
              sizes="(min-width: 1024px) 40vw, 100vw"
              loading="eager"
            />
            <figcaption className="cap">Editorial portrait of a model.</figcaption>
          </figure>
        </section>

        <div className="demo-note" style={{ marginBottom: "var(--s9)" }}>
          <span className="tag">Proposed copy</span>
          <span>This page is a draft. Founding story, team, location, materials and production details will be added once they&apos;re confirmed by the owner.</span>
        </div>

        <section aria-labelledby="principles-title" style={{ paddingBottom: "var(--s9)" }}>
          <h2 className="sr-only" id="principles-title">
            How we think about dressing
          </h2>
          <div className="princ">
            {PRINCIPLES.map((p) => (
              <div key={p.title}>
                <h3 className="d-s">{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ab-pair" aria-label="Studio imagery" style={{ paddingBottom: "var(--s9)" }}>
          <figure>
            <Image
              src="/images/story-design-table.png"
              alt="Fabric swatches, paper patterns and sewing tools on a sunlit table"
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 64vw, 100vw"
            />
            <figcaption className="cap">Illustrative styling still life, not a documented studio.</figcaption>
          </figure>
          <div>
            <figure style={{ margin: 0 }}>
              <Image
                src="/images/detail-striped-cotton.png"
                alt="Close-up of a pale-blue striped shirt cuff and white button"
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
              <figcaption className="cap">Illustrative shirt texture.</figcaption>
            </figure>
            <p className="body-s muted" style={{ margin: 0 }}>
              Texture matters as much as shape: the weight of a cuff, the hand of a knit. We&apos;ll share real fabric details product by product.
            </p>
          </div>
        </section>
      </div>

      <section className="ab-close wrap" aria-labelledby="close-title">
        <h2 className="d-xl" id="close-title">
          Dress for the day
          <br />
          you&apos;re having.
        </h2>
        <Link className="btn" href="/shop">
          Explore the collection
        </Link>
      </section>
    </>
  );
}
