import type { Metadata } from "next";
import Link from "next/link";
import BagView from "@/components/BagView";

export const metadata: Metadata = { title: "Your bag" };

export default function BagPage() {
  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Bag</span>
      </nav>
      <div className="pagehead">
        <h1 className="d-xl">Your bag</h1>
      </div>
      <BagView />
    </div>
  );
}
