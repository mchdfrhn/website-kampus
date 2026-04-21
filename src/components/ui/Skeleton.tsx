import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-brand-navy/5", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden p-8 h-full">
      <Skeleton className="h-48 w-full rounded-2xl mb-6" />
      <Skeleton className="h-4 w-1/4 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-20 w-full mb-6" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

export function SectionHeaderSkeleton() {
  return (
    <div className="flex flex-col items-center text-center mb-16">
      <Skeleton className="h-10 w-64 mb-6" />
      <Skeleton className="h-1.5 w-20 rounded-full mb-6" />
      <Skeleton className="h-6 w-96 max-w-full" />
    </div>
  );
}
