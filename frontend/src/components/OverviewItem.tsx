import { Skeleton } from "./ui/Skeleton";

export const OverviewItem = ({
  type,
  value,
  isLoading = false,
}: {
  type: string;
  value: string;
  isLoading?: boolean;
}) => {
  return (
    <>
      <div className="flex flex-col p-4 gap-2 shadow-sm rounded-2xl bg-white">
        <h1>{type}</h1>
        {isLoading ? (
          <Skeleton className="h-9 w-24" />
        ) : (
          <p className="font-bold text-3xl">{value}</p>
        )}
      </div>
    </>
  );
};
