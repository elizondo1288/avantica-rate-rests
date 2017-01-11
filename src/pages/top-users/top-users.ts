import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

//Providers
import { UsersService } from '../../providers/users.service';

/*
  Generated class for the TopUsers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-top-users',
  templateUrl: 'top-users.html'
})
export class TopUsersPage {

  public users:any;
  public filteredUsers:any;
  private loader: any;
  public searchQuery: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public usersService:UsersService,
              public loadingCtrl: LoadingController) {

      this.loadTopUsers();
      this.presentLoading();
  }

  ionViewDidLoad() {}

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading users...",
    });
    this.loader.present();
  }

  loadTopUsers(){
    this.usersService.loadUsers().then(response => {
      this.users = response;
      this.filteredUsers = response;
      this.loader.dismiss();
    });
  }

  getUsers(ev: any) {
    
    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(val);
    this.filteredUsers = this.users;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {

      this.filteredUsers = this.filteredUsers.filter((item) => {
        return ((item.name.first.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
        (item.name.last.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
        (item.email.toLowerCase().indexOf(val.toLowerCase()) > -1));
      })
    }
  }
}
