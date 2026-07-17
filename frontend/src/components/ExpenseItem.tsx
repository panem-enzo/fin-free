import { useState } from "react";
import { deleteExpense, updateExpense } from "../services/api";
import type { Expense } from "../types";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "./ui/Button";
import { ConfirmDialog } from "./ui/ConfirmDialog";
import { useToast } from "../context/useToast";
import {
  validateExpense,
  hasValidationErrors,
  type ExpenseValidationErrors,
} from "../utils/validateExpense";

export const ExpenseItem = ({
  item,
  onDeleted,
  onUpdated,
}: {
  item: Expense;
  onDeleted: (id: number) => void;
  onUpdated: (expense: Expense) => void;
}) => {
  const [savedExpense, setSavedExpense] = useState<Expense>(item);
  const [date, setDate] = useState<string>(item.date);
  const [amount, setAmount] = useState<string>(item.amount.toString());
  const [category, setCategory] = useState<string>(item.category);
  const [description, setDescription] = useState<string>(item.description);
  const [errors, setErrors] = useState<ExpenseValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { showToast } = useToast();

  const isDirty =
    date !== savedExpense.date ||
    amount !== savedExpense.amount.toString() ||
    category !== savedExpense.category ||
    description !== savedExpense.description;

  const handleCancel = () => {
    setDate(savedExpense.date);
    setAmount(savedExpense.amount.toString());
    setCategory(savedExpense.category);
    setDescription(savedExpense.description);
    setErrors({});
  };

  const handleSave = async () => {
    const updated: Expense = {
      id: item.id,
      date,
      amount: parseFloat(amount),
      category,
      description,
    };

    const validationErrors = validateExpense(updated);
    setErrors(validationErrors);
    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsSaving(true);
    try {
      await updateExpense(item.id, updated);
      setSavedExpense(updated);
      setErrors({});
      onUpdated(updated);
      showToast("Expense updated", "success");
    } catch (error) {
      console.error(`Failed to update expense with id=${item.id}:`, error);
      showToast("Failed to update expense", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleteConfirmOpen(false);
    try {
      await deleteExpense(item.id);
      onDeleted(item.id);
      showToast("Expense deleted", "success");
    } catch (error) {
      console.error(`Failed to delete expense with id=${item.id}:`, error);
      showToast("Failed to delete expense", "error");
    }
  };

  return (
    <>
      <tr className="flex rounded-md ring-1 ring-gray-900/30 hover:bg-gray-50">
        <td className="p-2 border-r-1 border-gray-900/30">
          <label htmlFor={`expense-date-${item.id}`} className="sr-only">
            Date
          </label>
          <input
            id={`expense-date-${item.id}`}
            className="p-1 w-25 hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary rounded-md"
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-describedby={errors.date ? `expense-date-error-${item.id}` : undefined}
            aria-invalid={errors.date ? true : undefined}
          />
          {errors.date && (
            <p id={`expense-date-error-${item.id}`} className="text-danger text-sm">
              {errors.date}
            </p>
          )}
        </td>
        <td className="p-2 border-r-1 border-gray-900/30">
          <label htmlFor={`expense-category-${item.id}`} className="sr-only">
            Category
          </label>
          <input
            id={`expense-category-${item.id}`}
            className="p-1 w-50 hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary rounded-md"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-describedby={
              errors.category ? `expense-category-error-${item.id}` : undefined
            }
            aria-invalid={errors.category ? true : undefined}
          />
          {errors.category && (
            <p id={`expense-category-error-${item.id}`} className="text-danger text-sm">
              {errors.category}
            </p>
          )}
        </td>
        <td className="p-2 border-r-1 border-gray-900/30">
          <label htmlFor={`expense-description-${item.id}`} className="sr-only">
            Description
          </label>
          <input
            id={`expense-description-${item.id}`}
            className="p-1 w-50 hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary rounded-md"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-describedby={
              errors.description ? `expense-description-error-${item.id}` : undefined
            }
            aria-invalid={errors.description ? true : undefined}
          />
          {errors.description && (
            <p
              id={`expense-description-error-${item.id}`}
              className="text-danger text-sm"
            >
              {errors.description}
            </p>
          )}
        </td>
        <td className="p-2">
          <label htmlFor={`expense-amount-${item.id}`} className="sr-only">
            Amount ($)
          </label>
          <input
            id={`expense-amount-${item.id}`}
            className="p-1 w-25 hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary rounded-md"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-describedby={errors.amount ? `expense-amount-error-${item.id}` : undefined}
            aria-invalid={errors.amount ? true : undefined}
          />
          {errors.amount && (
            <p id={`expense-amount-error-${item.id}`} className="text-danger text-sm">
              {errors.amount}
            </p>
          )}
        </td>
        <td className="flex items-center gap-1 ml-auto">
          {isDirty && (
            <>
              <Button type="button" variant="primary" disabled={isSaving} onClick={() => handleSave()}>
                Save
              </Button>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          )}
          <Button
            type="button"
            variant="secondary"
            aria-label="Delete expense"
            onClick={() => setIsDeleteConfirmOpen(true)}
          >
            <MdOutlineDeleteOutline />
          </Button>
        </td>
      </tr>
      <ConfirmDialog
        open={isDeleteConfirmOpen}
        title="Delete this expense?"
        message="This will permanently delete this expense. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteConfirmOpen(false)}
      />
    </>
  );
};
