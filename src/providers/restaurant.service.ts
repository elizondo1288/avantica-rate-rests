import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Restaurant } from '../entities/restaurant';
import { RestaurantComment } from '../entities/restaurant-comment';

import { RESTAURANTS} from '../mocks/mock-restaurants';
import { RESTAURANTCOMMENTS} from '../mocks/mock-restaurant-comment';

import { Storage } from '@ionic/storage';

import {CONST_RESTAURANTS} from '../constants/constants';

/*
  Generated class for the CommentsByRestaurant provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class RestaurantService {

  public COMMENTS_LIST : RestaurantComment[];
  public restaurantList: Restaurant[];

  constructor(public http: Http,public storage: Storage) { }

  //get restaurants from local storage
  getDataFromLocalStorage() {
    return this.storage.get(CONST_RESTAURANTS);  
  }
  //returns the list of restaurants from the server
  updateRestaurantsFromServer():Promise<Restaurant[]>{
    
    this.restaurantList = RESTAURANTS;
    this.saveDB();
    return Promise.resolve(RESTAURANTS);
  }

  //gets the comments of an specific restaurant
  getCommentsByRestaurant(title:string):Promise<RestaurantComment[]>{
      return Promise.resolve(
        RESTAURANTCOMMENTS.filter(
          RestaurantComment => RestaurantComment.title == title
        )
      );
  }

  getAverageRating(title:string):Promise<Number>{
    let average:number = 0;

    return Promise.resolve(
        this.getCommentsByRestaurant(title).then(comments => {
              
          if(comments){
            for(let comm of comments) {
                average =  average + comm.rating;
            }     
            return Math.round(average/comments.length);
          } else {
            return 0;
          }
        })
    );
  }

  saveComment(comment:RestaurantComment):void{
    this.COMMENTS_LIST.push(comment);
  }

  saveRestaurants(item):boolean{
    this.restaurantList = item;
    this.saveDB();

    return true; 
  }

  saveDB(){
    let newData = JSON.stringify(this.restaurantList);
    this.storage.set(CONST_RESTAURANTS, newData);
  }

}