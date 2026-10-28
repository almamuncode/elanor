import Link from "next/link";
import { CATEGORIES } from "@/lib/products";
import { POLICIES } from "@/lib/policies";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__cols">
          <div>
            <h3>Shop</h3>
            <ul>
              <li>
                <Link href="/shop">All looks</Link>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop?category=${c.slug}`}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>ÉLANOR</h3>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/saved">Saved pieces</Link>
              </li>
              <li>
                <Link href="/bag">Bag</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Policies</h3>
            <ul>
              {POLICIES.map((p) => (
                <li key={p.slug}>
                  <Link href={`/policies/${p.slug}`}>
                    {p.title}
                    <span className="draft">Draft</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="ftr__note">
            A concept storefront. Products, prices and policies shown here are samples for the demo and are not available to order.
          </p>
        </div>
        <p className="ftr__mark" aria-hidden="true">
          ÉLANOR
        </p>
        <div className="ftr__base">
          <span>© 2026 ÉLANOR. A concept demo.</span>
          <span>Prices in BDT (sample)</span>
        </div>
      </div>
    </footer>
  );
}
