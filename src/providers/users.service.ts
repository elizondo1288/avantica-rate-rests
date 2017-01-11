import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UsersService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersService {

  listOfUsers:any[];

  constructor(public http: Http) {
    console.log('Hello UsersService Provider');
  }

  loadUsers(){
    return new Promise(resolve =>
      this.http.get('https://randomuser.me/api/?results=20')
        .map(res=> res.json())
        .subscribe(data=> {

          //results is the parameter in the jason
          this.listOfUsers = data.results;
          resolve(this.listOfUsers);
        })
    );
  }

}
