package com.finfree;

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
    public Expense addNewExpense(@RequestBody Expense expense) {
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

    @PutMapping("{id}")
    public void updateExpenseById(@PathVariable Integer id, @RequestBody Expense expense) {
        expenseService.updateExpenseById(id, expense);
    }

    @DeleteMapping("{id}")
    public void removeExpenseById(@PathVariable Integer id) {
        expenseService.removeExpenseById(id);
    }

}
