import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

//Pages
import { HomePage } from '../pages/home/home';
import { AboutUsPage } from '../pages/about-us/about-us';
import { TopUsersPage } from '../pages/top-users/top-users';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild("content") nav: Nav;

  rootPage: any = HomePage;
  menuOptions:Array<{title:string, component: any}>;

  constructor(platform: Platform, public menu: MenuController) {
  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();      
    });

    this.menuOptions=[ {title:'Home', component:HomePage },
                       {title:'Top Rated Users', component:TopUsersPage},
                       {title:'About us', component:AboutUsPage} ];
  }


  openPage(page){
      this.menu.close();
      this.nav.setRoot(page.component);
  }
}
