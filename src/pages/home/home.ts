import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  AlertController,
  NavController,
  Nav,
  PopoverController
} from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from "../../pages/login/login";
import { FeedProvider, Feed } from "../../providers/feed/feed";
import { NotificacionesPage } from "../notificaciones/notificaciones";
import { SettingsPage } from "../settings/settings";
import { ChatPage } from "../chat/chat";
import { JwtService } from "../../providers/jwt-service/jwt-service";

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  rootPage = "OpcionesHomePage";
  feeds: Feed[];
  user: any;

  constructor(
    private navController: NavController,
    public afAuth: AngularFireAuth,
    private feedProvider: FeedProvider,
    public alertCtrl: AlertController,
    public jwtService: JwtService,
	public popoverCtrl: PopoverController,
	public navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
  }

  public openFeed(feed: Feed) {
    //this.nav.setRoot('FormularioPage');
  }

  public ionViewWillEnter() {
    console.log(this.jwtService.getUser());
    
    this.user = this.jwtService.getUser();
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificacionesPage);
    popover.present({
      ev: myEvent
    });
  }

  presentSettings(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(SettingsPage);
    popover.present({
      ev: myEvent
    });
  }

  verResultados(): void {
    console.log("resultados");
    this.gotoPage('ResultadoPage')

  }

  llenarFormulario(): void {
    console.log("formulario");
    this.gotoPage('FormularioPage');

  }

  private gotoPage(page: string): void {
    this.navCtrl.push(page);
  }
  openChat(): void {
    this.navCtrl.push(ChatPage);
  }
  logOut() {
    this.afAuth.auth.signOut();
    this.navController.setRoot(LoginPage);
  }
}
