"use client";

import { useStore } from "@/lib/store";
import { HeartIcon } from "./Icons";

export default function SaveButton({ slug, name, className = "card__save" }: { slug: string; name: string; className?: string }) {
  const { isSaved, toggleSaved, hydrated } = useStore();
  const saved = hydrated && isSaved(slug);
  return (
    <button
      type="button"
      className={className}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from saved pieces` : `Save ${name}`}
      onClick={() => toggleSaved(slug)}
    >
      <HeartIcon filled={saved} />
    </button>
  );
}
