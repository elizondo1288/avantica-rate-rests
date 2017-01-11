import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the AddItemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-restaurant-page',
  templateUrl: 'add-restaurant-page.html'
})
export class AddRestaurantPage {

  title;
  description;
  restaurant_type;
  address;

  constructor(public navCtrl: NavController, public view: ViewController) {}

  ionViewDidLoad() { }

  saveRestaurant(){

    let newRest = {
      title: this.title,
      description: this.description,
      restaurant_type: this.restaurant_type,
      address:this.address
    };
 
    this.view.dismiss(newRest);
 
  }
 
  close(){
    this.view.dismiss();
  }

}
