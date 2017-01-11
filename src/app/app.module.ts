import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

//Pages

//Pages
import { HomePage } from '../pages/home/home';
import { AddRestaurantPage } from '../pages/add-restaurant-page/add-restaurant-page';
import { RestaurantDetailPage } from '../pages/restaurant-detail/restaurant-detail';
import { AddCommentPage } from '../pages/add-comment/add-comment';
import { AboutUsPage } from '../pages/about-us/about-us';
import { TopUsersPage } from '../pages/top-users/top-users';

//Providers
import { RestaurantService } from '../providers/restaurant.service';
import { UsersService } from '../providers/users.service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddRestaurantPage,
    RestaurantDetailPage,
    AddCommentPage,
    AboutUsPage,
    TopUsersPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddRestaurantPage,
    RestaurantDetailPage,
    AddCommentPage,
    AboutUsPage,
    TopUsersPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
     RestaurantService,
     UsersService,
     Storage
  ]
})
export class AppModule {}
