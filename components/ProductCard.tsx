import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "@/lib/products";
import Price from "./Price";
import SaveButton from "./SaveButton";

interface ProductCardProps {
  product: Product;
  /** Responsive `sizes` for the image. */
  sizes?: string;
  /** Replace the save heart (used by the saved page for a remove button). */
  action?: ReactNode;
  children?: ReactNode;
}

const DEFAULT_SIZES = "(min-width: 1600px) 370px, (min-width: 1024px) 23vw, 46vw";

export default function ProductCard({ product, sizes = DEFAULT_SIZES, action, children }: ProductCardProps) {
  const href = `/product/${product.slug}`;
  return (
    <article className="card">
      <Link href={href} className="card__media" tabIndex={-1} aria-hidden="true">
        <Image src={product.front.src} alt="" fill sizes={sizes} />
        <Image src={product.back.src} alt="" fill sizes={sizes} className="alt" />
      </Link>
      {action ?? <SaveButton slug={product.slug} name={product.name} />}
      <div className="card__meta">
        <Price amount={product.price} />
        <Link className="card__name" href={href}>
          {product.name}
        </Link>
      </div>
      {children}
    </article>
  );
}
