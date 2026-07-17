import type { Expense } from "../types";

export interface ExpenseValidationErrors {
  date?: string;
  category?: string;
  amount?: string;
  description?: string;
}

const MAX_DESCRIPTION_LENGTH = 500;

export const validateExpense = (
  expense: Expense
): ExpenseValidationErrors => {
  const errors: ExpenseValidationErrors = {};

  if (!expense.date.trim()) {
    errors.date = "Date is required";
  }

  if (!expense.category.trim()) {
    errors.category = "Category is required";
  }

  if (Number.isNaN(expense.amount)) {
    errors.amount = "Amount is required";
  } else if (expense.amount <= 0) {
    errors.amount = "Amount must be greater than zero";
  }

  if (expense.description.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer`;
  }

  return errors;
};

export const hasValidationErrors = (
  errors: ExpenseValidationErrors
): boolean => Object.keys(errors).length > 0;
