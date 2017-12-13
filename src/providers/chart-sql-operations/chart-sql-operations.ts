import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from "@ionic-native/sqlite";

/*
  Generated class for the ChartSqlOperationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ChartSqlOperationsProvider {
  createChartDataTableQuery : string;
  selectChartDataQuery : string;
  selectRecentChartDataQuery : string;
  insertChartDataTableQuery : string;
  deleteChartDataQuery : string;
  constructor(public http: HttpClient) {
    console.log('Hello ChartSqlOperationsProvider Provider');
    this.createChartDataTableQuery = "CREATE TABLE IF NOT EXISTS ChartDataTable(id INTEGER PRIMARY KEY AUTOINCREMENT, Expense TEXT , Date TEXT, Value REAL)";
    this.selectChartDataQuery = "SELECT * FROM chartDataTable";
    this.selectRecentChartDataQuery = "SELECT * FROM chartDataTable ORDER BY id DESC limit 5; ";
    this.insertChartDataTableQuery =  " INSERT INTO chartDataTable(Expense, Date, Value) VALUES(?,?,?) ";
    this.deleteChartDataQuery = " DELETE FROM chartDataTable WHERE id = ? ";
  }

  createTable(connector)
  {
      return connector.executeSql(this.createChartDataTableQuery,[])
      .then( ( data) =>{
        console.log("Table created ", data);
        return data;
      })
      .catch((error) =>{
        console.log(" Error in creating table ", error);
        return error;
      })
  }

  extractExpenseList(connector)
  {
    return connector.executeSql(this.selectChartDataQuery, [])
    .then((data) => {
      console.log("Extract expense list succesfull " + data );
      return data;
    })
    .catch((error) => {
      console.log("Extract expense list failed "+ error);
      return error;
    })
  }  

  insertExpense(connector, obj)
  {
    return connector.executeSql(this.insertChartDataTableQuery,[obj.expense_name, obj.date, obj.expense_value])
    .then((data) => {
      console.log("Insert into chartaDataTable successful " + data );
      return data;
    })
    .catch((error) => {
      console.log("Insert into chartDataTable failed "+ error);
      return error;
    })
  }

  selectRecentExpense(connector)
  {
    return connector.executeSql(this.selectRecentChartDataQuery, [])
    .then((data) => {
      console.log("Select recent expense successful "+ data);
      return data;
    })
    .catch((error) => {
      console.log("Select recent expense failed "+error);
      return error;
    })
  }

}
