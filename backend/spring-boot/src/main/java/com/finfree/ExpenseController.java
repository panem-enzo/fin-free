package com.finfree;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/expenses")
public class ExpenseController {

    @PostMapping
    public Expense addExpense(
            @RequestParam Integer id,
            @RequestParam String date,
            @RequestParam Double amount,
            @RequestParam String category,
            @RequestParam String description) {
        return new Expense(id, date, amount, category, description);
    }
}
