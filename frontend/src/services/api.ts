import axios from "axios";
import type { Expense } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1",
});

// GET (*Needs Review*)
export const getAllExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await api.get("/expenses");
    return response.data as Expense[];
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
};

// POST
export const insertExpense = async (expense: Expense): Promise<Expense> => {
  try {
    const response = await api.post("/expenses", {
      date: expense.date,
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
    });
    return response.data as Expense;
  } catch (error) {
    console.error("Error inserting expense:", error);
    throw error;
  }
};

// DELETE
export const deleteAllExpenses = async (): Promise<void> => {
  try {
    const response = await api.delete("/expenses");
    console.log(`Expense list cleared successfully: ${response.data}`);
  } catch (error) {
    console.error("Error clearing expenses:", error);
    throw error;
  }
};

// PUT
export const updateExpense = async (
  id: number,
  expense: Expense
): Promise<void> => {
  try {
    await api.put(`/expenses/${id}`, {
      date: expense.date,
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
    });
  } catch (error) {
    console.error(`Error updating expense with id=${id}: `, error);
    throw error;
  }
};

// DELETE
export const deleteExpense = async (id: number): Promise<void> => {
  try {
    await api.delete(`/expenses/${id}`);
    console.log(`Expense: id=${id} successfully removed!`);
  } catch (error) {
    console.error(`Error deleting expense with id=${id}: `, error);
    throw error;
  }
};

export const fetchExpenseTotal = async (): Promise<number> => {
  try {
    const response = await api.get(`/expenses/fetchTotal`);
    return response.data as number;
  } catch (error) {
    console.error("Error fetching the expense total: ", error);
    throw error;
  }
};
