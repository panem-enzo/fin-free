package com.finfree.service;

import com.finfree.exception.ExpenseNotFoundException;
import com.finfree.model.Expense;
import com.finfree.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense insertExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense getExpenseById(Integer id) {
        return expenseRepository.findById(id).orElseThrow(() -> new ExpenseNotFoundException(id + " not found"));
    }

    public void removeAllExpenses() {
        expenseRepository.deleteAllInBatch();
    }

    public void removeExpenseById(Integer id) {
        expenseRepository.deleteById(id);
    }

    public void updateExpenseById(Integer id, Expense update) {
        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new ExpenseNotFoundException(id + " not found"));
        expense.setDate(update.getDate());
        expense.setAmount(update.getAmount());
        expense.setCategory(update.getCategory());
        expense.setDescription(update.getDescription());
        expenseRepository.save(expense);
    }

    public Double calculateTotal() {
        return expenseRepository.calculateTotal();
    }

}
