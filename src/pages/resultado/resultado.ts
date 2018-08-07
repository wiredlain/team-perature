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
  error = {
    message : null,
    type : null
  };

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

        _.forEach(celulas, i => {
          let data = {
            celula : i,
            respuestas : this.setRespuestasPorCelula(promedioRespuestas,i)
          };
          this.listaResultadoCuestionario.push(data);
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

  private setRespuestasPorCelula (promedioRespuestas, index){
    let rs = [];
    try {
      _.forEach(promedioRespuestas, _preguntas => {
        for (let preguntasKey in _preguntas) {
          _.forEach(Object.keys(_preguntas[preguntasKey]), key => {
              if (key !== 'descripcionPregunta' && key !== 'promedioGeneral') {
                if (key === index) {
                  rs.push(_preguntas[preguntasKey][key].promedio);
                }
              }
            }
          );
        }
      });
      return rs;
    }catch (e) {
      this.error.message = e;
      this.error.type = 'E';
    }
  }
}

