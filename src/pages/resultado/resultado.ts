import {Component} from '@angular/core';
import {
  IonicPage, NavController, Loading, LoadingController
} from 'ionic-angular';
import {Cuestionario, CuestionarioProvider} from "../../providers/cuestionario/cuestionario";
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

  constructor(
    public navCtrl: NavController,
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

        let celulas = [];

        _.forEach(promedioRespuestas[idcuestionario], i => {
          for (let cel in i) {
            if (cel !== 'descripcionPregunta' && cel !== 'promedioGeneral') {
              if (!(celulas.indexOf(cel) > -1)) {
                celulas.push(cel);
              }
            }
          }
        });

        let rs = [], rs2 = [];
        _.forEach(promedioRespuestas, _preguntas => {
          for (let preguntasKey in _preguntas) {
            _.forEach(Object.keys(_preguntas[preguntasKey]), key => {
                if (key !== 'descripcionPregunta' && key !== 'promedioGeneral') {
                  if (key === celulas[0]) {
                    rs.push(_preguntas[preguntasKey][key].promedio);
                  }
                  if (key === celulas[1]) {
                    rs2.push(_preguntas[preguntasKey][key].promedio);
                  }

                }
              }
            );
          }
        });
        this.listaResultadoCuestionario = [
          {
            celula : '1',
            respuestas : rs
          },
          {
            celula: '2',
            respuestas : rs2
          }
        ];
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

