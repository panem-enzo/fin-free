import type { Expense } from "../types";
import { ExpenseItem } from "./ExpenseItem";

export const ExpenseTable = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <div className="col-span-3">
      <table className="shadow-sm rounded-2xl bg-white">
        <tbody className="flex flex-col p-4 gap-3">
          <tr className="flex rounded-md">
            <th className="w-15">Date</th>
            <th className="w-50">Category</th>
            <th className="w-65">Description</th>
            <th className="w-45">Amount ($)</th>
          </tr>
          {expenses.map((expense, index) => (
            <ExpenseItem item={expense} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
