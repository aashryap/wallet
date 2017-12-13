import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ChartsPage } from '../charts/charts';
import { AddExpensePage } from '../add-expense/add-expense';
import { AddExpensePageModule } from '../add-expense/add-expense.module';
import { ExpenseListPage } from '../expense-list/expense-list';
import { ChartSqlOperationsProvider } from '../../providers/chart-sql-operations/chart-sql-operations';
import { DbConfigProvider } from '../../providers/db-config/db-config';
import { SQLiteObject } from '@ionic-native/sqlite'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  dbConnector : Object;
  recentExpenseList : Array <Object>;
  
  constructor(public navCtrl: NavController, public modal : ModalController, public openDb : DbConfigProvider, public chartSqlOperationsProvider : ChartSqlOperationsProvider) {
      this.recentExpenseList = [] 
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad ExpenseListPage');
    
  }

  openExpensePage(){
    console.log("In modal");
    let modal = this.modal.create(AddExpensePage);
    modal.present(); 
  }

  openExpenseList()
  {
    console.log("In Expense list");
    let expenseListPage = this.modal.create(ExpenseListPage);
    expenseListPage.present();
  }

}
