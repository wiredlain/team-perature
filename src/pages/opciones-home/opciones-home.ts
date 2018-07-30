import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OpcionesHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opciones-home',
  templateUrl: 'opciones-home.html',
})
export class OpcionesHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpcionesHomePage');
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


}
