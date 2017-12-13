import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ChartSqlOperationsProvider } from '../../providers/chart-sql-operations/chart-sql-operations';
import { DbConfigProvider } from '../../providers/db-config/db-config';
import { SQLiteObject } from '@ionic-native/sqlite'; 
/**
 * Generated class for the ChartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})

export class ChartsPage {
  @ViewChild(Slides) slides: Slides;
  chartType : string;
  chartOptions : any;
  recentExpenseList : Array <Object>;
  dbConnector : Object;
  recentExpenseListDate : Array <string>
  
  constructor(public navCtrl: NavController, public modal : ModalController, public chartSqlOperationProvider : ChartSqlOperationsProvider, public openDb : DbConfigProvider) {
    this.chartType = "spline";
    this.drawChart();      
    this.recentExpenseList = [];
  }

  ionViewDidLoad()
  {
    this.openDb.openDatabase()
    .then((data : SQLiteObject) => {
     this.dbConnector = data; 
     console.log("chart database open", data);
     //this.createTable();
     this.extractRecentExpenseList(this.dbConnector)
     .then((data) => {
       console.log("Recent data extraction successful ",data);
       return data;
     })
     .catch((error) => {
       console.log("Recent data extraction failed", error);
       return error;
     })
    })
    .catch((error) => {
      console.log("failed", error );
      return error;
    })
  }
 
  extractRecentExpenseList(connector)
  {
    return this.chartSqlOperationProvider.selectRecentExpense(connector)
    .then((data) => {
      console.log("Recent data extraction succeded ", data);
      let ln = data.rows.length;
      for(let i=0;i<ln;i++){
         console.log("Data rows ", data.rows.item(i));
         this.recentExpenseList[i] = data.rows.item(i);
         let date = new Date(data.rows.item(i).date);
         
         this.recentExpenseListDate[i] = date.getDate().toString() + date.getMonth().toString();
         console.log(this.recentExpenseListDate[i]);       
      }
      return data;
    })
    .catch((error) => {
      console.log("Recent data extraction succeded ", error);
      return error;
    })
  }


  drawChart()
  {
      this.chartOptions = {chart: {
      type: this.chartType,
      backgroundColor : null
  },
  title: {
      text: 'Expenses'
  },
  xAxis: {
      categories: ['3 Nov', '4 Nov', '5 Nov', '6 Nov', '7 Nov']
        
    },
  yAxis: {
      title: {
          text: ''
      },
      plotLines: [{
        value: 600,
        color: 'green',
        dashStyle: 'shortdash',
        width: 2,
        label: {
            text: 'budget'
        }
      }]
  },
  series: [{
      name: 'Expense',
      data: [1000, 200, 400, 75, 100]
   }]
  }
  }


  slideChanged()
  { 
    let currentIndex = this.slides.getActiveIndex();
    if(currentIndex == 0)
    {
      this.chartType = "spline";
      this.drawChart();
    }
    if(currentIndex == 1)
    {
      this.chartType = "bar";
      this.drawChart();
    }
    if(currentIndex == 2)
    {
      this.chartType = "pie";
      this.drawChart();
    }
  }

  openModal(){
    let modal = this.modal.create("AddExpensePage");
    modal.present(); 
  }



}

  




