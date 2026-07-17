package com.finfree.controller;

import com.finfree.service.ExpenseService;
import com.finfree.model.Expense;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/expenses")
@CrossOrigin("*")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public Expense addNewExpense(@Valid @RequestBody Expense expense) {
        return expenseService.insertExpense(expense);
    }

    @GetMapping
    public List<Expense> getExpenses() {
        return expenseService.getAllExpenses();
    }

    @GetMapping("{id}")
    public Expense getExpenseById(@PathVariable Integer id) {
        return expenseService.getExpenseById(id);
    }

    @GetMapping("/fetchTotal")
    public Double fetchTotal() {
        return expenseService.calculateTotal();
    }

    @PutMapping("{id}")
    public void updateExpenseById(@PathVariable Integer id, @Valid @RequestBody Expense expense) {
        expenseService.updateExpenseById(id, expense);
    }

    @DeleteMapping
    public void removeExpenses() {
        expenseService.removeAllExpenses();
    }

    @DeleteMapping("{id}")
    public void removeExpenseById(@PathVariable Integer id) {
        expenseService.removeExpenseById(id);
    }

}
