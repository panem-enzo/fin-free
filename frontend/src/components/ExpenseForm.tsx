import { useState } from "react";
import { insertExpense, deleteAllExpenses } from "../services/api.ts";
import type { Expense } from "../types/index.ts";

export const ExpenseForm = ({
  addExpense,
}: {
  addExpense: (expense: Expense) => void;
}) => {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentDate = new Date();

    let expense: Expense = {
      id: 0,
      date: `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()}`,
      amount: parseFloat(amount),
      category: category,
      description: description,
    };

    // API Call
    const expenseFromDb = insertExpense(expense);
    expense = {
      id: expenseFromDb.id,
      date: expenseFromDb.date,
      amount: expenseFromDb.amount,
      category: expenseFromDb.category,
      description: expenseFromDb.description,
    };

    addExpense(expense);

    // Reset Values
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <div className="col-span-3">
      <form
        className="flex flex-col items-center p-4 gap-2 shadow-sm rounded-2xl bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl text-teal-900">Add New Expense</h1>
        <div className="inset-shadow-sm rounded-lg">
          <input
            className="p-1"
            type="number"
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="inset-shadow-sm rounded-lg">
          <input
            className="p-1"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="inset-shadow-sm rounded-lg">
          <input
            className="p-1"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="flex cursor-pointer rounded-lg p-2 text-white bg-emerald-300 hover:bg-emerald-400"
        >
          Add Expense
        </button>
        <button
          type="button"
          className=" flex items-center gap-1 cursor-pointer rounded-lg bg-gray-100 hover:bg-red-400 hover:text-white p-2"
          onClick={() => deleteAllExpenses()}
        >
          Clear All
        </button>
      </form>
    </div>
  );
};
