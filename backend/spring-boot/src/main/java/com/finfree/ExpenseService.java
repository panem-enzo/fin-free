package com.finfree;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

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
        return expenseRepository.findById(id).orElseThrow(() -> new IllegalStateException(id + " not found"));
    }

    public void removeExpenseById(Integer id) {
        expenseRepository.deleteById(id);
    }

    public void updateExpenseById(Integer id, Expense update) {
        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new IllegalStateException(id + " not found"));
        expense.setDate(update.getDate());
        expense.setAmount(update.getAmount());
        expense.setCategory(update.getCategory());
        expense.setDescription(update.getDescription());
        expenseRepository.save(expense);
    }
}
