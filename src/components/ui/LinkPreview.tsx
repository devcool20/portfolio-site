"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { MouseEvent, ReactNode } from "react";

type LinkPreviewProps = {
  children: ReactNode;
  className?: string;
  imageSrc?: string;
  title?: string;
  url: string;
};

export default function LinkPreview({
  children,
  className,
  imageSrc,
  title,
  url,
}: LinkPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const updatePosition = (event: MouseEvent<HTMLAnchorElement>) => {
    const cardWidth = Math.min(400, window.innerWidth - 32);
    const cardHeight = cardWidth * 0.625;
    const x = Math.min(
      Math.max(event.clientX, cardWidth / 2 + 16),
      window.innerWidth - cardWidth / 2 - 16,
    );
    const y = Math.max(event.clientY, cardHeight + 24);

    setPosition({
      x,
      y,
    });
  };

  const preview =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {isOpen && imageSrc && !imageFailed ? (
              <motion.div
                aria-hidden="true"
                className="link-preview-card"
                initial={{ opacity: 0, scale: 0.92, y: 14, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: -1 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  left: position.x,
                  top: position.y,
                }}
              >
                <div className="link-preview-image-wrap">
                  <Image
                    src={imageSrc}
                    alt={title ? `${title} preview` : ""}
                    fill
                    sizes="320px"
                    className="link-preview-image"
                    onError={() => setImageFailed(true)}
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <Link
        href={url}
        target={url.startsWith("http") ? "_blank" : undefined}
        rel={url.startsWith("http") ? "noreferrer" : undefined}
        className={className}
        onFocus={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setImageFailed(false);
          setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top,
          });
          setIsOpen(true);
        }}
        onBlur={() => setIsOpen(false)}
        onMouseEnter={(event) => {
          setImageFailed(false);
          updatePosition(event);
          setIsOpen(true);
        }}
        onMouseLeave={() => setIsOpen(false)}
        onMouseMove={updatePosition}
      >
        {children}
      </Link>
      {preview}
    </>
  );
}
