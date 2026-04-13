import { useEffect, useState } from "react";
import { ExpenseForm } from "./ExpenseForm";
import type { Expense } from "../types";
// import { v4 as uuidv4 } from "uuid";
import { fetchExpenseTotal, getAllExpenses } from "../services/api";
import { ExpenseTable } from "./ExpenseTable";
import { ExpenseReport } from "./ExpenseReport";
import { OverviewItem } from "./OverviewItem";

export const ExpenseWrapper = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getAllExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    const fetchTotal = async () => {
      try {
        const data = await fetchExpenseTotal();
        setTotal(data);
      } catch (error) {
        console.error("Failed to fetch total:", error);
      }
    };

    fetchExpenses();
    fetchTotal();
  }, []);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <>
      <div className="col-span-5 grid grid-cols-5 grid-rows-3 p-4 gap-4">
        <div className="col-span-5 grid grid-cols-5 gap-4">
          <h1 className="col-span-5 font-bold text-3xl">Overview</h1>
          {/* NOTE: Dollar amount is hard-coded for now */}
          <div className="col-span-1">
            <OverviewItem type="Current Balance" amount={1312.11} />
          </div>
          <div className="col-span-1">
            <OverviewItem type="Income" amount={4765.32} />
          </div>
          <div className="col-span-1">
            <OverviewItem type="Expenses" amount={3453.21} />
          </div>
        </div>
        <ExpenseForm addExpense={addExpense} />
        <ExpenseReport expenseTotal={total} />
        <ExpenseTable expenses={expenses} />
      </div>
    </>
  );
};
