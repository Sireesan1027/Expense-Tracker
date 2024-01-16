// transaction.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  expenses: { name: string; amount: number }[] = [];
  totalAmount: number = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    // Initialize expenses array from the service
    this.expenses = this.expenseService.getExpenses();
    this.renderExpenses();
  }

  renderExpenses() {
    this.totalAmount = 0;
    this.expenses.forEach((expense) => {
      this.totalAmount += expense.amount;
    });
    // Save expenses to the service
    this.expenseService.setExpenses(this.expenses);
  }

  addExpense(expenseNameInput: HTMLInputElement, expenseAmountInput: HTMLInputElement) {
    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);
  
    // Clear form inputs
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
  
    // Validate inputs
    if (expenseName === '' || isNaN(expenseAmount)) {
      alert('Please enter valid expense details.');
      return;
    }
  
    // Create new expense object
    const expense = {
      name: expenseName,
      amount: expenseAmount,
    };
  
    // Add expense to expenses array
    this.expenses.push(expense);
  
    // Render expenses
    this.renderExpenses();
  }

  deleteExpense(index: number) {
    this.expenses.splice(index, 1);
    this.renderExpenses();
  }
}