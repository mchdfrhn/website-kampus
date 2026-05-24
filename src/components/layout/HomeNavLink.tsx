"use client";

import Link, { type LinkProps } from "next/link";
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

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    if (pathname !== "/" || props.href !== "/") return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link {...props} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  );
}
