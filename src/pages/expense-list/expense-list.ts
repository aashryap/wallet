import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChartSqlOperationsProvider } from '../../providers/chart-sql-operations/chart-sql-operations';
import { expense } from '../../shared/expenseDataType';
import { DbConfigProvider } from '../../providers/db-config/db-config';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
/**
 * Generated class for the ExpenseListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense-list',
  templateUrl: 'expense-list.html',
})


export class ExpenseListPage {


  expenseList :  Array<Object>;
  dbConnector : Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public chartSqlOperations : ChartSqlOperationsProvider, public openDb : DbConfigProvider ) {
    this.expenseList = [];
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ExpenseListPage');
      this.openDb.openDatabase()
      .then((data : SQLiteObject) => {
       this.dbConnector = data; 
       console.log("chart database open", data);
       //this.createTable();
       this.extractExpenseList(this.dbConnector);
      })
      .catch((error) => {
        console.log("failed", error );
      })
  }

  extractExpenseList(dbConnector)
  {
    return this.chartSqlOperations.extractExpenseList(dbConnector)
    .then((data) => {
      console.log("Expense data list " , data);
      for(let i=0;i<data.rows.length;i++)
      {
        console.log(data.rows.item(i));
        this.expenseList[i] = data.rows.item(i);     
      }
        console.log("List array "+data);
      return data;
    })
    .catch((error) => {
      console.log("Error in extracting data " + error);
      return error;
    })
  }

}
