import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Keyboard } from "@ionic-native/keyboard";

import { MyApp } from "./app.component";

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";

import { FeedProvider } from "../providers/feed/feed";
import { IonicStorageModule } from "@ionic/storage";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CuestionarioProvider } from "../providers/cuestionario/cuestionario";
import { ApiService } from "../providers/api/api";
import { JwtService } from "../providers/jwt-service/jwt-service";
import { firebaseConfig } from "../environments/environment";
import { UserServiceProvider } from "../providers/user-service/user-service";
import { AuthProvider } from "../providers/auth/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
//import { LoginPage } from "../pages/login/login";
import { NotificacionesPage } from "../pages/notificaciones/notificaciones";
import { SettingsPage } from "../pages/settings/settings";

@NgModule({
  declarations: [MyApp, NotificacionesPage, SettingsPage],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, NotificacionesPage, SettingsPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FeedProvider,
    InAppBrowser,
    CuestionarioProvider,
    ApiService,
    JwtService,
    UserServiceProvider,
    AuthProvider,
    Keyboard
  ]
})
export class AppModule {}
