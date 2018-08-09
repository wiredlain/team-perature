import {Component} from '@angular/core';
import {
  IonicPage, NavController, Loading, LoadingController
} from 'ionic-angular';
import {Cuestionario, CuestionarioProvider, ItemPregunta} from "../../providers/cuestionario/cuestionario";
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
  PromediosGeneralesArea = [];
  error = {
    message: null,
    type: null
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
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    this.loading.present();
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
        let newArray = [];
        _.forEach(celulas, i => {
          let data = {
            celula: i,
            respuestas: this.setRespuestasPorCelula(promedioRespuestas, i)
          };
          newArray.push(data);
        });
        this.setPromedioPorArea(promedioRespuestas);
        this.getComparativa(1, newArray);
        //this.loading.dismiss();
      },
      error => {
        this.loading.dismiss().then(() => {
          console.log(error);
        });
        console.log(error);
      });
  }

  private setRespuestasPorCelula(promedioRespuestas, index) {
    let rs = [], promedioCelula = 0, cantidadPreguntas = 0;
    try {
      _.forEach(promedioRespuestas, _preguntas => {
        for (let preguntasKey in _preguntas) {
          _.forEach(Object.keys(_preguntas[preguntasKey]), key => {
              if (key !== 'descripcionPregunta' && key !== 'promedioGeneral') {
                if (key === index) {
                  promedioCelula += parseFloat(_preguntas[preguntasKey][key].promedio);
                  rs.push(_preguntas[preguntasKey][key].promedio);
                }
              }
            }
          );
        }
        cantidadPreguntas = Object.keys(_preguntas).length;
      });
      rs.push((promedioCelula / cantidadPreguntas));
      return rs;
    } catch (e) {
    }
  }

  private setPromedioPorArea(promedioRespuestas) {
    try {
      _.forEach(promedioRespuestas, _preguntas => {
        for (let preguntasKey in _preguntas) {
          this.PromediosGeneralesArea.push(_preguntas[preguntasKey].promedioGeneral);
        }
      });
    } catch (e) {
      this.error.message = e;
      this.error.type = 'E';
    }
  }

  private getComparativa(indexReverse: number, promedioActual) {
    this.cuestionarioService.getCuestionarios().subscribe(
      cuestionarios => {
        let _comparativa = [];
        let _idCuestionario = Object.keys(cuestionarios)[Object.keys(cuestionarios).length - indexReverse].toString();
        this.cuestionarioService.getPromedioPorCuestionario_Celula(_idCuestionario).subscribe(
          rs => {
            let _penultimoCuestionario = rs, celulas = [];
            _.forEach(_penultimoCuestionario[_idCuestionario], i => {
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
                celula: i,
                respuestas: this.setRespuestasPorCelula(_penultimoCuestionario, i)
              };
              if (data !== null && !_.isEmpty(data)) {
                _comparativa.push(data);
                this.listaResultadoCuestionario.push(this.mergeRespuestas(_comparativa, promedioActual));
              }
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
      });
  }

  private mergeRespuestas(_comparativa, _promedioActual) {

    let data = {
      nombreCelula : '',
      respuestasCelula : []
    };

    _.forEach(_comparativa, (_item) => {
      data.nombreCelula = _item.celula;
      _.forEach(_item.respuestas, (_respuesta, i) => {
        /** respuesta de _item **/
        //console.log(_respuesta, i);
        //item.promedioAnterior = _respuesta;
        data.respuestasCelula[i] = {};
        data.respuestasCelula[i].promedioAnterior = _respuesta;
      });
    });

   _.forEach(_promedioActual, (_item) => {
      _.forEach(_item.respuestas, (_respuesta, i) => {
        /** respuesta de _item **/
        //console.log(_respuesta, i);
        data.respuestasCelula[i].promedioActual = _respuesta;
      });
    });
    return data;
  }
}

