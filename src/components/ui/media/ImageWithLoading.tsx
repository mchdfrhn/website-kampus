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
  const [isReady, setIsReady] = useState(false);
  const hasCustomTransition =
    typeof className === "string" && className.includes("transition");

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-100 via-white to-brand-mist transition-opacity duration-300",
          "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/75 before:to-transparent",
          isReady ? "opacity-0" : "opacity-100",
          skeletonClassName,
        )}
      />
      <Image
        {...props}
        className={cn(
          className,
          hasCustomTransition ? null : "transition-opacity duration-500",
          isReady ? "opacity-100" : "opacity-0",
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
