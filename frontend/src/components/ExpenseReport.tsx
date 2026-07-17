import { cadFormatter } from "../services/currencyFormatter";
import { Skeleton } from "./ui/Skeleton";

export const ExpenseReport = ({
  expenseTotal,
  isLoading = false,
}: {
  expenseTotal: number;
  isLoading?: boolean;
}) => {
  return (
    <div className="col-span-2 flex flex-col items-center p-4 gap-2 shadow-sm rounded-2xl bg-white">
      <h1 className="text-xl text-teal-900">Expense Report</h1>
      {isLoading ? (
        <Skeleton className="h-6 w-40" />
      ) : (
        <h2 className="font-black">
          Total Spending: <span className="font-normal">{cadFormatter.format(expenseTotal)}</span>
        </h2>
      )}
    </div>
  );
};
