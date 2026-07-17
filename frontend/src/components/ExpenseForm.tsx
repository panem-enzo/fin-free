import { useState } from "react";
import { insertExpense, deleteAllExpenses } from "../services/api.ts";
import type { Expense } from "../types/index.ts";
import { Button } from "./ui/Button.tsx";
import { ConfirmDialog } from "./ui/ConfirmDialog.tsx";
import { useToast } from "../context/useToast.ts";
import {
  validateExpense,
  hasValidationErrors,
  type ExpenseValidationErrors,
} from "../utils/validateExpense.ts";

export const ExpenseForm = ({
  addExpense,
  clearExpenses,
}: {
  addExpense: (expense: Expense) => void;
  clearExpenses: () => void;
}) => {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<ExpenseValidationErrors>({});
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentDate = new Date();

    const expense: Expense = {
      id: 0,
      date: `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()}`,
      amount: parseFloat(amount),
      category: category,
      description: description,
    };

    const validationErrors = validateExpense(expense);
    setErrors(validationErrors);
    if (hasValidationErrors(validationErrors)) {
      return;
    }

    try {
      const expenseFromDb = await insertExpense(expense);
      addExpense(expenseFromDb);

      // Reset Values
      setAmount("");
      setCategory("");
      setDescription("");
      setErrors({});
      showToast("Expense added", "success");
    } catch (error) {
      console.error("Failed to add expense:", error);
      showToast("Failed to add expense", "error");
    }
  };

  const handleClearAll = async () => {
    setIsClearConfirmOpen(false);
    try {
      await deleteAllExpenses();
      clearExpenses();
      showToast("All expenses cleared", "success");
    } catch (error) {
      console.error("Failed to clear expenses:", error);
      showToast("Failed to clear expenses", "error");
    }
  };

  return (
    <div className="col-span-3">
      <form
        className="flex flex-col items-center p-4 gap-2 shadow-sm rounded-2xl bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl text-teal-900">Add New Expense</h1>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="expense-amount">Amount ($)</label>
          <div className="inset-shadow-sm rounded-lg">
            <input
              id="expense-amount"
              className="p-1 w-full focus:ring-2 focus:ring-primary rounded-lg"
              type="number"
              placeholder="Amount ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-describedby={errors.amount ? "expense-amount-error" : undefined}
              aria-invalid={errors.amount ? true : undefined}
            />
          </div>
          {errors.amount && (
            <p id="expense-amount-error" className="text-danger text-sm">
              {errors.amount}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="expense-category">Category</label>
          <div className="inset-shadow-sm rounded-lg">
            <input
              id="expense-category"
              className="p-1 w-full focus:ring-2 focus:ring-primary rounded-lg"
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-describedby={errors.category ? "expense-category-error" : undefined}
              aria-invalid={errors.category ? true : undefined}
            />
          </div>
          {errors.category && (
            <p id="expense-category-error" className="text-danger text-sm">
              {errors.category}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="expense-description">Description</label>
          <div className="inset-shadow-sm rounded-lg">
            <input
              id="expense-description"
              className="p-1 w-full focus:ring-2 focus:ring-primary rounded-lg"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-describedby={errors.description ? "expense-description-error" : undefined}
              aria-invalid={errors.description ? true : undefined}
            />
          </div>
          {errors.description && (
            <p id="expense-description-error" className="text-danger text-sm">
              {errors.description}
            </p>
          )}
        </div>
        <Button type="submit" variant="primary">
          Add Expense
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setIsClearConfirmOpen(true)}
        >
          Clear All
        </Button>
      </form>
      <ConfirmDialog
        open={isClearConfirmOpen}
        title="Clear all expenses?"
        message="This will permanently delete every expense. This action cannot be undone."
        confirmLabel="Clear All"
        onConfirm={handleClearAll}
        onCancel={() => setIsClearConfirmOpen(false)}
      />
    </div>
  );
};
