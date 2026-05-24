"use client";

import Link, { type LinkProps } from "next/link";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { type MouseEvent, type ReactNode } from "react";

type HomeNavLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

export default function HomeNavLink({
  children,
  className,
  ariaLabel,
  onClick,
  ...props
}: HomeNavLinkProps) {
  const pathname = usePathname();
  const lenis = useLenis();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    if (pathname !== "/" || props.href !== "/") return;

    event.preventDefault();

    if (lenis) {
      lenis.scrollTo(0, { duration: 0.65 });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link {...props} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  );
}
