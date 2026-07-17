import { useCallback, useEffect, useState } from "react";
import { ExpenseForm } from "./ExpenseForm";
import type { Expense } from "../types";
// import { v4 as uuidv4 } from "uuid";
import { fetchExpenseTotal, getAllExpenses } from "../services/api";
import { ExpenseTable } from "./ExpenseTable";
import { ExpenseReport } from "./ExpenseReport";
import { OverviewItem } from "./OverviewItem";
import { useToast } from "../context/useToast";
import { cadFormatter } from "../services/currencyFormatter";

export const ExpenseWrapper = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showToast } = useToast();

  const fetchTotal = useCallback(async () => {
    try {
      const data = await fetchExpenseTotal();
      setTotal(data);
    } catch (error) {
      console.error("Failed to fetch total:", error);
      showToast("Failed to load expense total", "error");
    }
  }, [showToast]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getAllExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
        showToast("Failed to load expenses", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
    fetchTotal();
  }, [fetchTotal, showToast]);

  const addExpense = (expense: Expense) => {
    setExpenses((current) => [...current, expense]);
    fetchTotal();
  };

  const clearExpenses = () => {
    setExpenses([]);
    fetchTotal();
  };

  const removeExpense = (id: number) => {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
    fetchTotal();
  };

  const updateExpenseInList = (updated: Expense) => {
    setExpenses((current) =>
      current.map((expense) => (expense.id === updated.id ? updated : expense))
    );
    fetchTotal();
  };

  const averageExpense = expenses.length > 0 ? total / expenses.length : 0;

  return (
    <>
      <div className="col-span-5 grid grid-cols-5 grid-rows-3 p-4 gap-4">
        <div className="col-span-5 grid grid-cols-5 gap-4">
          <h1 className="col-span-5 font-bold text-3xl">Overview</h1>
          <div className="col-span-1">
            <OverviewItem
              type="Total Spending"
              value={cadFormatter.format(total)}
              isLoading={isLoading}
            />
          </div>
          <div className="col-span-1">
            <OverviewItem
              type="Expense Count"
              value={expenses.length.toString()}
              isLoading={isLoading}
            />
          </div>
          <div className="col-span-1">
            <OverviewItem
              type="Average Expense"
              value={cadFormatter.format(averageExpense)}
              isLoading={isLoading}
            />
          </div>
        </div>
        <ExpenseForm addExpense={addExpense} clearExpenses={clearExpenses} />
        <ExpenseReport expenseTotal={total} isLoading={isLoading} />
        <ExpenseTable
          expenses={expenses}
          isLoading={isLoading}
          onDeleted={removeExpense}
          onUpdated={updateExpenseInList}
        />
      </div>
    </>
  );
};
