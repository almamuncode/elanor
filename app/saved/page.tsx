import type { Metadata } from "next";
import Link from "next/link";
import SavedView from "@/components/SavedView";

export const metadata: Metadata = { title: "Saved pieces" };

export default function SavedPage() {
  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Saved pieces</span>
      </nav>
      <div className="pagehead">
        <h1 className="d-xl">Saved pieces</h1>
      </div>
      <SavedView />
    </div>
  );
}
