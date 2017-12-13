import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ChartsPage } from '../pages/charts/charts';
import { ExpenseListPage } from '../pages/expense-list/expense-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {ChartModule } from "angular2-highcharts";
import * as highcharts from "Highcharts";
import { ChartSqlOperationsProvider } from '../providers/chart-sql-operations/chart-sql-operations';
import { DbConfigProvider } from '../providers/db-config/db-config';
import { AddExpensePage } from '../pages/add-expense/add-expense';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChartsPage,
    ExpenseListPage,
    AddExpensePage,

     ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartModule.forRoot(highcharts),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddExpensePage,
    ExpenseListPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChartSqlOperationsProvider,
    DbConfigProvider,
    SQLite
  ]
})
export class AppModule {}
