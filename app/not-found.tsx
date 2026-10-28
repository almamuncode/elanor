import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap empty">
      <h1 className="d-xl">Page not found</h1>
      <p>This page doesn&apos;t exist. The full collection is a click away.</p>
      <Link className="btn" href="/shop">
        Explore the collection
      </Link>
    </div>
  );
}
