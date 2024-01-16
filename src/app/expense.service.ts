import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor() { }
  private expensesKey = 'expenses';

  getExpenses(): { name: string; amount: number }[] {
    const expensesString = localStorage.getItem(this.expensesKey);
    return expensesString ? JSON.parse(expensesString) : [];
  }

  setExpenses(expenses: { name: string; amount: number }[]): void {
    localStorage.setItem(this.expensesKey, JSON.stringify(expenses));
  }
}
