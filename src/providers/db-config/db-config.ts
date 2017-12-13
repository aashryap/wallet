import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject,SQLite } from "@ionic-native/sqlite";
/*
  Generated class for the DbConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbConfigProvider {

  constructor(public http: HttpClient, public sqlite : SQLite ) {
    console.log('Hello DbConfigProvider Provider');
  }

  openDatabase() {
    //Open connection and Create DB object
    return this.sqlite.create({name: 'expense.db', location: 'default'})
    .then((db: SQLiteObject) => {
      return db;
    })
    .catch(e => {
      console.log("Error in creating db")
    });
  }

}
