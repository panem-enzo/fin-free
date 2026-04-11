import { useEffect, useState } from "react";
import { ExpenseForm } from "./ExpenseForm";
import type { Expense } from "../types";
// import { v4 as uuidv4 } from "uuid";
import { fetchExpenseTotal, getAllExpenses } from "../services/api";
import { ExpenseTable } from "./ExpenseTable";
import { ExpenseReport } from "./ExpenseReport";

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
      <div className="grid grid-cols-5 gap-4">
        <ExpenseForm addExpense={addExpense} />
        <ExpenseReport expenseTotal={total} />
        <ExpenseTable expenses={expenses} />
      </div>
    </>
  );
};
