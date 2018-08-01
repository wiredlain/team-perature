import {Component} from '@angular/core';
import {
  IonicPage, NavController, NavParams, Loading,
  LoadingController
} from 'ionic-angular';
import {Cuestionario, CuestionarioProvider} from "../../providers/cuestionario/cuestionario";

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
  resultadoEncuesta = null;
  cuestionarioCelula = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private cuestionarioService: CuestionarioProvider
  ) {
  }




  //public listEncuesta = Object.keys(this.cuestionarioCelula);

  /*public resultadoEncuesta = {
    "UUID": "n9ndqZrI7cbyPKAGigf0Cqv4Blu1",
    "idCuestionario": "R0IPoWPzvH7gOC4xCLyZ",
    "jsonrespuesta": {
      "celulas": [
        {
          "nombreCelula": "noname",
          "respuestas": [
            {
              "idRespuesta": 1,
              "valor": 1
            },
            {
              "idRespuesta": 2,
              "valor": 2
            },
            {
              "idRespuesta": 3,
              "valor": 3
            },
            {
              "idRespuesta": 4,
              "valor": 4
            },
            {
              "idRespuesta": 5,
              "valor": 5
            },
            {
              "idRespuesta": 6,
              "valor": 6
            },
            {
              "idRespuesta": 7,
              "valor": 7
            },
            {
              "idRespuesta": 8,
              "valor": 8
            },
            {
              "idRespuesta": 9,
              "valor": 9
            },
            {
              "idRespuesta": 10,
              "valor": 10
            },
            {
              "idRespuesta": 11,
              "valor": 11
            },
            {
              "idRespuesta": 12,
              "valor": 12
            }
          ]
        },
        {
          "nombreCelula": "noname2",
          "respuestas": [
            {
              "idRespuesta": 1,
              "valor": 1
            },
            {
              "idRespuesta": 2,
              "valor": 2
            },
            {
              "idRespuesta": 3,
              "valor": 3
            },
            {
              "idRespuesta": 4,
              "valor": 4
            },
            {
              "idRespuesta": 5,
              "valor": 5
            },
            {
              "idRespuesta": 6,
              "valor": 6
            },
            {
              "idRespuesta": 7,
              "valor": 7
            },
            {
              "idRespuesta": 8,
              "valor": 8
            },
            {
              "idRespuesta": 9,
              "valor": 9
            },
            {
              "idRespuesta": 10,
              "valor": 10
            },
            {
              "idRespuesta": 11,
              "valor": 11
            },
            {
              "idRespuesta": 12,
              "valor": 12
            }
          ]
        },
        {
          "nombreCelula": "noname3",
          "respuestas": [
            {
              "idRespuesta": 1,
              "valor": 1
            },
            {
              "idRespuesta": 2,
              "valor": 2
            },
            {
              "idRespuesta": 3,
              "valor": 3
            },
            {
              "idRespuesta": 4,
              "valor": 4
            },
            {
              "idRespuesta": 5,
              "valor": 5
            },
            {
              "idRespuesta": 6,
              "valor": 6
            },
            {
              "idRespuesta": 7,
              "valor": 7
            },
            {
              "idRespuesta": 8,
              "valor": 8
            },
            {
              "idRespuesta": 9,
              "valor": 9
            },
            {
              "idRespuesta": 10,
              "valor": 10
            },
            {
              "idRespuesta": 11,
              "valor": 11
            },
            {
              "idRespuesta": 12,
              "valor": 12
            }
          ]
        },
        {
          "nombreCelula": "noname4",
          "respuestas": [
            {
              "idRespuesta": 1,
              "valor": 1
            },
            {
              "idRespuesta": 2,
              "valor": 2
            },
            {
              "idRespuesta": 3,
              "valor": 3
            },
            {
              "idRespuesta": 4,
              "valor": 4
            },
            {
              "idRespuesta": 5,
              "valor": 5
            },
            {
              "idRespuesta": 6,
              "valor": 6
            },
            {
              "idRespuesta": 7,
              "valor": 7
            },
            {
              "idRespuesta": 8,
              "valor": 8
            },
            {
              "idRespuesta": 9,
              "valor": 9
            },
            {
              "idRespuesta": 10,
              "valor": 10
            },
            {
              "idRespuesta": 11,
              "valor": 11
            },
            {
              "idRespuesta": 12,
              "valor": 12
            }
          ]
        },
        {
          "nombreCelula": "noname5",
          "respuestas": [
            {
              "idRespuesta": 1,
              "valor": 1
            },
            {
              "idRespuesta": 2,
              "valor": 2
            },
            {
              "idRespuesta": 3,
              "valor": 3
            },
            {
              "idRespuesta": 4,
              "valor": 4
            },
            {
              "idRespuesta": 5,
              "valor": 5
            },
            {
              "idRespuesta": 6,
              "valor": 6
            },
            {
              "idRespuesta": 7,
              "valor": 7
            },
            {
              "idRespuesta": 8,
              "valor": 8
            },
            {
              "idRespuesta": 9,
              "valor": 9
            },
            {
              "idRespuesta": 10,
              "valor": 10
            },
            {
              "idRespuesta": 11,
              "valor": 11
            },
            {
              "idRespuesta": 12,
              "valor": 12
            }
          ]
        }
      ]
    }
  };*/


  //public listaRespuestas = this.resultadoEncuesta.jsonrespuesta.celulas;

  public alerta(data) {
    alert(data);
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
    this.setResultado();
  }

  public setListaEncuesta () {
    this.cuestionarioService.getCuestionarioCelula().subscribe(
      cuestionariosCelula => {
        let _cuestionariosCelulas = cuestionariosCelula;
        for (let key in _cuestionariosCelulas) {
          this.cuestionarioCelula.push(cuestionariosCelula[key].idCuestionario);
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

  public setResultado () {
    this.cuestionarioService.getAll().subscribe(
      cuestionariosCelula => {
        this.resultadoEncuesta = cuestionariosCelula;
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
