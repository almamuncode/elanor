import Image from "next/image";
import Link from "next/link";

export default function EditBanner() {
  return (
    <section className="edit-banner" aria-labelledby="city-layers-title">
      <figure>
        <Image
          src="/images/campaign-city-layers.png"
          alt="Two women in a sand trench and cream co-ord walking beside a stone building"
          width={1536}
          height={1024}
          sizes="(min-width: 1600px) 1000px, (min-width: 1024px) 64vw, 100vw"
        />
      </figure>
      <div>
        <h2 className="d-l" id="city-layers-title">
          City
          <br />
          layers
        </h2>
        <p>A trench over black, a cream co-ord in easy knit. Two looks for days that move between places.</p>
        <div>
          <Link className="link" href="/shop?category=tailoring">
            Shop tailoring
          </Link>
        </div>
      </div>
    </section>
  );
}
