"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ProductImage } from "@/lib/products";
import Dialog from "./Dialog";
import { ChevronLeft, ChevronRight, CloseIcon, ExpandIcon } from "./Icons";

const VIEWS = ["Front", "Back", "Detail"] as const;

export default function ProductGallery({ images, name }: { images: [ProductImage, ProductImage, ProductImage]; name: string }) {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => () => setViewer(false), []);

  // Mobile swipe: keep the counter in sync with the scroll position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (track.scrollWidth <= track.clientWidth) return;
        setActive(Math.round(track.scrollLeft / track.clientWidth));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const select = (i: number) => {
    const next = (i + images.length) % images.length;
    setActive(next);
    const track = trackRef.current;
    if (track && track.scrollWidth > track.clientWidth) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: next * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
    }
  };

  const onThumbKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (active + keys[e.key] + images.length) % images.length;
    select(next);
    thumbsRef.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  };

  return (
    <div className="gal">
      <div className="gal__main">
        <div className="gal__track" ref={trackRef} aria-label={`${name} images`} role="region">
          {images.map((img, i) => (
            <div key={img.src} className={i === active ? "gal__slide is-active" : "gal__slide"} aria-hidden={i !== active}>
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1600px) 760px, (min-width: 1024px) 50vw, 100vw" loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : undefined} />
            </div>
          ))}
        </div>
        <span className="gal__count" aria-live="polite">
          {active + 1} / {images.length}
        </span>
        <span className="gal__bar" aria-hidden="true">
          <i style={{ transform: `translateX(${active * 100}%)` }} />
        </span>
        <button type="button" className="gal__zoom" onClick={() => setViewer(true)} aria-label="Enlarge image" aria-haspopup="dialog">
          <ExpandIcon />
        </button>
      </div>
      <div className="gal__thumbs" ref={thumbsRef} role="group" aria-label="Choose image" onKeyDown={onThumbKey}>
        {images.map((img, i) => (
          <button key={img.src} type="button" aria-current={i === active} aria-label={`Show ${VIEWS[i].toLowerCase()} view`} tabIndex={i === active ? 0 : -1} onClick={() => select(i)}>
            <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 96px, 30vw" />
          </button>
        ))}
      </div>

      <Dialog open={viewer} onClose={() => setViewer(false)} variant="viewer" label={`${name}, ${VIEWS[active].toLowerCase()} view, enlarged`} showScrim={false}>
        <div className="panel__head">
          <span className="label">
            {VIEWS[active]} view <span className="muted">({active + 1} of {images.length})</span>
          </span>
          <button type="button" className="close" onClick={() => setViewer(false)} aria-label="Close enlarged image">
            <CloseIcon />
          </button>
        </div>
        <div className="viewer__stage">
          <Image src={images[active].src} alt={images[active].alt} fill sizes="100vw" />
        </div>
        <div className="viewer__nav">
          <button type="button" onClick={() => select(active - 1)} aria-label="Previous image">
            <ChevronLeft />
          </button>
          <button type="button" onClick={() => select(active + 1)} aria-label="Next image">
            <ChevronRight />
          </button>
        </div>
      </Dialog>
    </div>
  );
}
