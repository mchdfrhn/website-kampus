"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageWithLoadingProps = ImageProps & {
  skeletonClassName?: string;
};

export default function ImageWithLoading({
  className,
  skeletonClassName,
  onLoad,
  onError,
  ...props
}: ImageWithLoadingProps) {
  // Priority images (LCP candidates) start visible to avoid Lighthouse penalising
  // opacity-0 → opacity-1 fade as "visual incompleteness" during Speed Index measurement.
  const isPriority = props.priority === true;
  const [isReady, setIsReady] = useState(isPriority);
  const hasCustomTransition =
    typeof className === "string" && className.includes("transition");

  return (
    <>
      {!isPriority && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-100 via-white to-brand-mist transition-opacity duration-300",
            "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/75 before:to-transparent",
            isReady ? "opacity-0" : "opacity-100",
            skeletonClassName,
          )}
        />
      )}
      <Image
        {...props}
        className={cn(
          className,
          // Priority images skip the fade-in entirely — they should paint immediately.
          // Non-priority images use a shorter 200ms fade (down from 500ms) to reduce
          // the window during which Lighthouse sees incomplete visual content.
          !isPriority && !hasCustomTransition && "transition-opacity duration-200",
          !isPriority && (isReady ? "opacity-100" : "opacity-0"),
        )}
        onLoad={(event) => {
          setIsReady(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setIsReady(true);
          onError?.(event);
        }}
      />
    </>
  );
}
