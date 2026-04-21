"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/motion/Reveal";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}

export default function MotionWrapper({ 
  children, 
  className, 
  staggerChildren = 0.1,
  delayChildren = 0
}: MotionWrapperProps) {
  return (
    <StaggerContainer 
      className={className} 
      staggerChildren={staggerChildren}
      delayChildren={delayChildren}
    >
      {children}
    </StaggerContainer>
  );
}

export function MotionList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <StaggerContainer className={className}>
      {children}
    </StaggerContainer>
  );
}

export function MotionItem({ children }: { children: ReactNode }) {
  return (
    <StaggerItem>
      {children}
    </StaggerItem>
  );
}
