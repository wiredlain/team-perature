import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FeedProvider } from '../providers/feed/feed';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpModule } from '@angular/http';

export const firebaseConfig = {
  apiKey: "AIzaSyDqr_WIaje0Ud0frQgzzECO0dj3vPzG5vg",
  authDomain: "teamperature-fbf9d.firebaseapp.com",
  databaseURL: "https://teamperature-fbf9d.firebaseio.com",
  projectId: "teamperature-fbf9d",
  storageBucket: "teamperature-fbf9d.appspot.com",
  messagingSenderId: "376527068069"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FeedProvider,
    InAppBrowser
  ]
})
export class AppModule {}
