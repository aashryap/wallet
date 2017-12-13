import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLiteObject } from '@ionic-native/sqlite';
import { ChartSqlOperationsProvider} from '../../providers/chart-sql-operations/chart-sql-operations';
import { DbConfigProvider } from '../../providers/db-config/db-config';
import { Chart } from 'Highcharts';
import { expense } from '../../shared/expenseDataType';
/**
 * Generated class for the AddExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-expense',
  templateUrl: 'add-expense.html',
})
export class AddExpensePage {

  chartData : expense;
  dbConnector : Object;
  data : Object;
  constructor(public navCtrl: NavController, public navParams: NavParams,public chartSqlOperationsProvider : ChartSqlOperationsProvider,  public dbConfigProvider : DbConfigProvider) {
   this.data = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddExpensePage');
    setTimeout(()=>{
      this.dbConfigProvider.openDatabase()
      .then((data : SQLiteObject) => {
       this.dbConnector = data; 
        console.log("Chart database open", data);
        this.chartSqlOperationsProvider.createTable(this.dbConnector)
        .then((data) => {
          console.log("Chart table created " + data);
          return data;
         })
        .catch((error)=>{
          console.log("Chart table failed to create " + error );
          return error;
        })
      } )
      .catch((error) => {
        console.log("failed", error );
      })
    }, 500);
  }

  registerInfo(data)
  {
    console.log(data);
    let date  = new Date();
    data.date = date.toString();
    this.chartSqlOperationsProvider.insertExpense(this.dbConnector, data)
    .then((data) => {
        console.log("Insert chart data query successfull "+ data);
        return data;
      })
    .catch((error) => {
       console.log("Insert query failed "+error);
       return error;
    } )
  }

  
}
