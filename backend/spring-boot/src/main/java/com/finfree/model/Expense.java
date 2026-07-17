package com.finfree.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.Objects;

@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String date;

    @NotNull
    @Positive
    private Double amount;

    @NotBlank
    private String category;

    @Size(max = 500)
    private String description;

    public Expense() {
    }

    public Expense(Integer id, String date, Double amount, String category, String description) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
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
