import type { Expense } from "../types";
import { ExpenseItem } from "./ExpenseItem";
import { Skeleton } from "./ui/Skeleton";
import { EmptyState } from "./ui/EmptyState";

const SKELETON_ROW_COUNT = 3;

export const ExpenseTable = ({
  expenses,
  isLoading,
  onDeleted,
  onUpdated,
}: {
  expenses: Expense[];
  isLoading: boolean;
  onDeleted: (id: number) => void;
  onUpdated: (expense: Expense) => void;
}) => {
  return (
    <div className="col-span-5">
      <table className="shadow-sm rounded-2xl bg-white">
        <tbody className="flex flex-col p-4 gap-3">
          <tr className="flex rounded-md">
            <th className="w-15">Date</th>
            <th className="w-50">Category</th>
            <th className="w-65">Description</th>
            <th className="w-45">Amount ($)</th>
          </tr>
          {isLoading &&
            Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
              <tr key={index} className="flex rounded-md">
                <td className="p-2">
                  <Skeleton className="h-8 w-full" />
                </td>
              </tr>
            ))}
          {!isLoading && expenses.length === 0 && (
            <tr>
              <td className="p-2" colSpan={4}>
                <EmptyState
                  title="No expenses yet"
                  description="Add your first expense above to get started."
                />
              </td>
            </tr>
          )}
          {!isLoading &&
            expenses.map((expense) => (
              <ExpenseItem
                item={expense}
                key={expense.id}
                onDeleted={onDeleted}
                onUpdated={onUpdated}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
