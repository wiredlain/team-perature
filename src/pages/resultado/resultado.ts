import {Component} from '@angular/core';
import {
  IonicPage, NavController, NavParams, Loading, LoadingController
} from 'ionic-angular';
import {Cuestionario, CuestionarioProvider, ItemRespuestas} from "../../providers/cuestionario/cuestionario";
import * as _ from "lodash";

/**
 * Generated class for the ResultadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html'
})
export class ResultadoPage {
  public loading: Loading;
  cuestionario: Cuestionario;
  listaCuestionarios = [];
  listaResultadoCuestionario = [];
  respuestas: ItemRespuestas[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private cuestionarioService: CuestionarioProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPage');
  }

  public ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    this.loading.present();
    this.setListaEncuesta();
    //TODO: Eliminar
    this.getRespuestas('R0IPoWPzvH7gOC4xCLyZ');
  }

  public setListaEncuesta() {
    this.cuestionarioService.getCuestionarioCelula().subscribe(
      cuestionariosCelula => {
        let _cuestionariosCelulas = cuestionariosCelula;
        for (let celula in _cuestionariosCelulas) {
          for (let _idCuestionario in <any>_cuestionariosCelulas[celula]) {
            if (!(this.listaCuestionarios.indexOf(_idCuestionario) > -1)) {
              this.listaCuestionarios.push(_idCuestionario);
            }
          }
        }
        //console.log(this.listaCuestionarios);
        this.loading.dismiss();
      },
      error => {
        this.loading.dismiss().then(() => {
          console.log(error);
        });
        console.log(error);
      }
    );
  }

  public setIdCuestionario(idCuestionario: string) {
    this.getRespuestas(idCuestionario);
  }

  public getRespuestas(idcuestionario: string) {
    this.cuestionarioService.getPromedioPorCuestionario_Celula(idcuestionario).subscribe(
      promedioRespuestas => {

        let arrayCelulas = [];

        _.forEach(promedioRespuestas, item => {
          _.forEach(item, _respuestas => {
            let celula =
              {
                nombreCelula: '',
                respuestas: []
              };

            //Obtención nombres de células
            _.forEach(Object.keys(_respuestas), i => {
              if (!(arrayCelulas.indexOf(i) > -1)) {
                if (i !== 'descripcionPregunta' && i !== 'promedioGeneral') {
                  arrayCelulas.push(i)

                }
              }
            });

          });
        });

        this.loading.dismiss();
      },
      error => {
        this.loading.dismiss().then(() => {
          console.log(error);
        });
        console.log(error);
      }
    );
  }
}

