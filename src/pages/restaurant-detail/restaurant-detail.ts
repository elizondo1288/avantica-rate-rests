import { Component } from '@angular/core';
import { NavController, 
        NavParams,
        ModalController,
        ToastController } from 'ionic-angular';

//Pages
import { AddCommentPage } from '../add-comment/add-comment';

//Services
import { RestaurantService } from '../../providers/restaurant.service';

/*
  Generated class for the RestaurantDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-restaurant-detail',
  templateUrl: 'restaurant-detail.html'
})
export class RestaurantDetailPage {
  
  private title:string;
  private description:string;
  private address:string;
  private restaurant_type:string;
  private generalRating: Number=0;
  private comments:any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restService:RestaurantService,
              public modalCtrl:ModalController,
              public toastCtrl:ToastController){}

  ionViewDidLoad() {
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;
    this.restaurant_type = this.navParams.get('item').restaurant_type;
    this.address = this.navParams.get('item').address;

    //we will receive the comments from a promise
    this.restService.getCommentsByRestaurant(this.title).then(
      comments => {
        if(comments){
          this.comments = comments;
        }
      }
    );

    this.restService.getAverageRating(this.title).then( rating => {
        if (rating){
          this.generalRating = rating;
        }
      }
    );
  }

  addComment(title){
    let modal = this.modalCtrl.create(AddCommentPage,{"title":this.title});

    modal.onDidDismiss(comment =>{
        if(comment){
          this.comments.push(comment);
          this.recalculateRating();
          this.presentToast();
        }
    });
    modal.present();
  }

  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'Comment was added successfully',
      duration: 2000,
      position:'middle'
    });
    toast.present();
  }

  recalculateRating(){
      let average:number = 0;

      for(let comm of this.comments) {
          average =  average + comm.rating;
      }

      this.generalRating = Math.round(average/this.comments.length);
  }

}
