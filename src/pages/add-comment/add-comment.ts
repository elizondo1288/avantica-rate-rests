import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { RestaurantComment} from '../../entities/restaurant-comment';

/*
  Generated class for the AddComment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-comment',
  templateUrl: 'add-comment.html'
})
export class AddCommentPage {

  public comment:string;
  public rating:number;
  public title:string;

  constructor(public navCtrl: NavController, public view:ViewController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.title = this.navParams.get('title');
    console.log("Title " + this.title);
  }

  saveComment(){
    console.log("Saving comment = " + this.comment + " = " + this.rating + " = " + this.title);

    let commentObj:RestaurantComment = {comment:this.comment,
                                        rating:Number(this.rating),
                                        title:this.title};
    
    this.view.dismiss(commentObj);
  }
 
  close(){
    this.view.dismiss();
  }

}
