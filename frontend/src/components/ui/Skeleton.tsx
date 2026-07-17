export const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div
      role="presentation"
      className={`animate-pulse bg-surface-muted rounded-card ${className}`}
    />
  );
};
