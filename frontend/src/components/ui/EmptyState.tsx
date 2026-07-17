import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export const EmptyState = ({ title, description, icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-8 text-center text-stone-500">
      {icon}
      <p className="font-bold text-stone-700">{title}</p>
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
};
