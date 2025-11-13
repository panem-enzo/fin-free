package com.finfree;

import java.util.Objects;

public class Expense {
    private String date;
    private Integer amount;
    private String category;
    private String description;

    public Expense() {
    }

    public Expense(String date, Integer amount, String category, String description) {
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Expense expense = (Expense) o;
        return Objects.equals(date, expense.date) && Objects.equals(amount, expense.amount) && Objects.equals(category, expense.category) && Objects.equals(description, expense.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, amount, category, description);
    }
}
