import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  AlertController,
  Events,
  Loading,
  LoadingController
} from "ionic-angular";
import {
  CuestionarioProvider,
  Cuestionario,
  ItemPregunta
} from "../../providers/cuestionario/cuestionario";
import * as _ from "lodash";
import { ChatPage } from "../chat/chat";
/**
 * Generated class for the FormularioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "FormularioPage"
})
@Component({
  templateUrl: "formulario.html"
})
export class FormularioPage {
  step: any;
  stepCondition: any;
  stepDefaultCondition: any;
  currentStep: any;
  stepsArray: Array<Object> = [];
  cuestionario: Cuestionario;
  preguntas: ItemPregunta[];
  modelo_preguntas: any[];
  public loading: Loading;
  preview: boolean;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public evts: Events,
    private cuestionarioService: CuestionarioProvider,
    public loadingCtrl: LoadingController
  ) {
    /**
     * Step Wizard Settings
     */
    this.modelo_preguntas = [];
    this.preview = false;
    this.step = 1; //The value of the first step, always 1
    this.stepCondition = false; //For each step the condition is set to this value, Set to true if you don't need condition in every step
    this.stepDefaultCondition = this.stepCondition; //Save the default condition for each step
    //Let's create some dummy data for this case
    //You can subscribe to the Event 'step:changed' to handle the current step
    this.evts.subscribe("step:changed", step => {
      //Handle the current step if you need
      this.currentStep = step;
      //Set the step condition to the default value

      this.stepCondition = this.stepDefaultCondition;
    });
    this.evts.subscribe("step:next", () => {
      //Do something if next
      console.log("Next pressed: ", this.currentStep);
    });
    this.evts.subscribe("step:back", () => {
      //Do something if back
      console.log("Back pressed: ", this.currentStep);
    });
  }
  /**
   * Demo functions
   */
  onFinish() {
    this.preview = true;
  }

  onCancelar(): void {
    this.preview = false;
    this.step = 1;
  }

  openChat(): void {
    this.navCtrl.push(ChatPage);
  }

  guardar(): void {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    this.loading.present().then(() => {
      this.cuestionarioService
        .createCuestionario(this.cuestionario, "R0IPoWPzvH7gOC4xCLyZ")
        .subscribe(
          respuesta => {
            this.loading.dismiss().then(() => {
              let alert = this.alertCtrl.create({
                message: "Formulario Guardado Exitosamente",
                buttons: [
                  {
                    text: "Ok",
                    role: "cancel",
                    handler: () => {
                      this.navCtrl.setRoot("HomePage");
                    }
                  }
                ]
              });
              alert.present();
            });
          },
          err => {
            this.loading.dismiss().then(() => {
              let alert = this.alertCtrl.create({
                message: "Error al guardar el formulario",
                buttons: [
                  {
                    text: "Ok",
                    role: "cancel"
                  }
                ]
              });
              alert.present();
            });
          }
        );
    });
  }
  onGuardar(): void {
    let alert = this.alertCtrl.create({
      message: "¿Estás seguro de enviar el formulario?",
      buttons: [
        {
          text: "No",
          role: "cancel"
        },
        {
          text: "Sí",
          handler: () => {
            this.guardar();
          }
        }
      ]
    });
    alert.present();
  }

  toggleCondition(_condition) {
    this.stepCondition = _condition.checked;
  }

  public ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    //this.loading.present();
    this.loading.present().then(() => {
      this.cuestionarioService
        .getCuestionario("R0IPoWPzvH7gOC4xCLyZ")
        .subscribe(
          cuestionarios => {
            //let id = Object.keys(cuestionarios)[0];
            let _cuestionario = cuestionarios;
            let _preguntas: any = _cuestionario.jsonPreguntas;

            let preguntas = [];
            _.forEach(_preguntas, (item: ItemPregunta) => {
              let p = new ItemPregunta(
                item.observacionPregunta,
                item.DescripcionPregunta,
                item.NumeroOrden,
                item.idPregunta,
                item.valor,
                item.Comentario
              );
              preguntas.push(p);
            });

            this.cuestionario = new Cuestionario(
              _cuestionario.descripcion,
              _cuestionario.fechaIni,
              _cuestionario.fechaFin,
              _cuestionario.estado,
              preguntas
            );
            this.preguntas = preguntas;
            this.loading.dismiss();
          },
          error => {
            this.loading.dismiss().then(() => {
              let alert = this.alertCtrl.create({
                message: "Error al obtener el formulario",
                buttons: [
                  {
                    text: "Ok",
                    role: "cancel",
                    handler: () => {
                      this.navCtrl.setRoot("HomePage");
                    }
                  }
                ]
              });
              alert.present();
            });
          }
        );
    });
  }
}
