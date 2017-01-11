import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

//Components
import { AddRestaurantPage } from '../add-restaurant-page/add-restaurant-page';
import { RestaurantDetailPage } from '../restaurant-detail/restaurant-detail';

//Entities
import { Restaurant } from '../../entities/restaurant';

//Providers
import { RestaurantService } from '../../providers/restaurant.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public items = [];

  constructor(public navCtrl: NavController, 
              public modalCtrl : ModalController,
              private restService: RestaurantService) {}

  //here we will load all the needed info for the app to work
  ionViewDidLoad(){
 
    //we receive the response from the restaurant service
    this.restService.getDataFromLocalStorage().then((rests) => {
      
      //we check if we have saved values on the local storage
      if(rests){
        console.log("Data available in the local storage " + rests);
        this.items = JSON.parse(rests); 

        console.log("Length: " + this.items.length);  
        console.log("Items: " + this.items[0]);
        console.log("Items: " + this.items[1]);
        console.log("Items: " + this.items[2]);
      } else { 

        console.log("Looking for rests in the server");
        //if not then we get the info from the server
        this.restService.updateRestaurantsFromServer().then(restaurants => {
          if(restaurants){
            this.items = restaurants;
          }
        });
      }
    });
  }

  isNotNull(rest):boolean{
      if(rest != null){
        return true;
      }
      return false;
  }   

  addRestaurant(){

    //we are creating a modal and setting the AddItemPage as the page that we want to show
    let addModal = this.modalCtrl.create(AddRestaurantPage);

    //when the modal is dismissed then we check if we have
    //a valid item and we send it to the saved list
    addModal.onDidDismiss((item)=>{
      if(item){
          this.saveRestaurant(item);
      }
    });

    //finally we need to present the modal
    addModal.present();

  }

  saveRestaurant(item){
    this.items.push(item);
    this.restService.saveRestaurants(this.items);
  }

  viewRestaurant(item){
    this.navCtrl.push(RestaurantDetailPage,{ item:item });
  }

}
