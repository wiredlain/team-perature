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
  listaCuestionarios = [];
  listaResultadoCuestionario = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private cuestionarioService: CuestionarioProvider
  ) {
  }

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
    this.getRespuestas('R0IPoWPzvH7gOC4xCLyZ');
  }

  public setListaEncuesta() {
    this.cuestionarioService.getCuestionarioCelula().subscribe(
      cuestionariosCelula => {
        let _cuestionariosCelulas = cuestionariosCelula;
        for (let key in _cuestionariosCelulas) {
          this.listaCuestionarios.push(cuestionariosCelula[key].idCuestionario);
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

  public getRespuestas(idcuestionario:string) {

    /*let _respuestas = this.rs;
    let nivel1;
    for (let val in _respuestas) { nivel1 = _respuestas[val];}
    */

    this.cuestionarioService.getRespuestas().subscribe(
      respuestas => {
        let _respuestas = respuestas;
        //_respuestas = this.rs;
        let nivel1, nivel2, nivel3, nivel4, data = [];

        for (let val in _respuestas) { nivel1 = _respuestas[val];}
        for (let i in nivel1) { nivel2 = nivel1[i];}
        for (let j in nivel2) { nivel3 = nivel2[j];}
        for (let k in nivel3) { nivel4 = nivel3[k];}

        //Nombre de celúlas
        for (let i in Object.keys(nivel1)) {
          data.push(Object.keys(nivel1)[i]);

          //this.listaResultadoCuestionario.push(data);
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

  public rs = {
    "snapshot": {
      "1": {
        "uTTXRArRbKOvRhZTD4WQlpYPzVm1": {
          "R0IPoWPzvH7gOC4xCLyZ": {
            "UUID": "uTTXRArRbKOvRhZTD4WQlpYPzVm1",
            "idCuestionario": "R0IPoWPzvH7gOC4xCLyZ",
            "jsonrespuesta": {
              "estado": 3,
              "fechaFin": "12/12/2019",
              "fechaIni": "13/07/2018",
              "jsonPreguntas": {
                "0": {
                  "Comentario": "asdasd",
                  "DescripcionPregunta": "Entrega de Valor",
                  "NumeroOrden": 1,
                  "idPregunta": 1,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 2
                },
                "1": {
                  "Comentario": "",
                  "DescripcionPregunta": "Fácil de Desplegar",
                  "NumeroOrden": 2,
                  "idPregunta": 2,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "2": {
                  "Comentario": "",
                  "DescripcionPregunta": "Diversión",
                  "NumeroOrden": 3,
                  "idPregunta": 3,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "3": {
                  "Comentario": "",
                  "DescripcionPregunta": "Calidad del Código",
                  "NumeroOrden": 4,
                  "idPregunta": 4,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "4": {
                  "Comentario": "",
                  "DescripcionPregunta": "Aprendizaje",
                  "NumeroOrden": 5,
                  "idPregunta": 5,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "5": {
                  "Comentario": "",
                  "DescripcionPregunta": "Misión",
                  "NumeroOrden": 6,
                  "idPregunta": 6,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "6": {
                  "Comentario": "",
                  "DescripcionPregunta": "Peones o Jugadores",
                  "NumeroOrden": 7,
                  "idPregunta": 7,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "7": {
                  "Comentario": "",
                  "DescripcionPregunta": "Velocidad",
                  "NumeroOrden": 8,
                  "idPregunta": 8,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "8": {
                  "Comentario": "",
                  "DescripcionPregunta": "Proceso adecuado",
                  "NumeroOrden": 9,
                  "idPregunta": 9,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "9": {
                  "Comentario": "",
                  "DescripcionPregunta": "Soporte",
                  "NumeroOrden": 10,
                  "idPregunta": 10,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "10": {
                  "Comentario": "",
                  "DescripcionPregunta": "Aprendizaje",
                  "NumeroOrden": 11,
                  "idPregunta": 11,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "11": {
                  "Comentario": "",
                  "DescripcionPregunta": "Misión",
                  "NumeroOrden": 12,
                  "idPregunta": 12,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                }
              }
            }
          }
        }
      },
      "2": {
        "n9ndqZrI7cbyPKAGigf0Cqv4Blu1": {
          "idCuestionarioDiferente": {
            "UUID": "n9ndqZrI7cbyPKAGigf0Cqv4Blu1",
            "idCuestionario": "idCuestionarioDiferente",
            "jsonrespuesta": {
              "estado": 3,
              "fechaFin": "12/12/2019",
              "fechaIni": "13/07/2018",
              "jsonPreguntas": {
                "0": {
                  "Comentario": "asdasd",
                  "DescripcionPregunta": "Entrega de Valor",
                  "NumeroOrden": 1,
                  "idPregunta": 1,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 2
                },
                "1": {
                  "Comentario": "",
                  "DescripcionPregunta": "Fácil de Desplegar",
                  "NumeroOrden": 2,
                  "idPregunta": 2,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "2": {
                  "Comentario": "",
                  "DescripcionPregunta": "Diversión",
                  "NumeroOrden": 3,
                  "idPregunta": 3,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "3": {
                  "Comentario": "",
                  "DescripcionPregunta": "Calidad del Código",
                  "NumeroOrden": 4,
                  "idPregunta": 4,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "4": {
                  "Comentario": "",
                  "DescripcionPregunta": "Aprendizaje",
                  "NumeroOrden": 5,
                  "idPregunta": 5,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "5": {
                  "Comentario": "",
                  "DescripcionPregunta": "Misión",
                  "NumeroOrden": 6,
                  "idPregunta": 6,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "6": {
                  "Comentario": "",
                  "DescripcionPregunta": "Peones o Jugadores",
                  "NumeroOrden": 7,
                  "idPregunta": 7,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "7": {
                  "Comentario": "",
                  "DescripcionPregunta": "Velocidad",
                  "NumeroOrden": 8,
                  "idPregunta": 8,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "8": {
                  "Comentario": "",
                  "DescripcionPregunta": "Proceso adecuado",
                  "NumeroOrden": 9,
                  "idPregunta": 9,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "9": {
                  "Comentario": "",
                  "DescripcionPregunta": "Soporte",
                  "NumeroOrden": 10,
                  "idPregunta": 10,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "10": {
                  "Comentario": "",
                  "DescripcionPregunta": "Aprendizaje",
                  "NumeroOrden": 11,
                  "idPregunta": 11,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                },
                "11": {
                  "Comentario": "",
                  "DescripcionPregunta": "Misión",
                  "NumeroOrden": 12,
                  "idPregunta": 12,
                  "observacionPregunta": "Lorem ipsum dolor sit amet consectetur adipiscing, elit enim cras lacinia sapien lobortis, conubia lacus aenean himenaeos montes, vulputate egestas et vivamus cubilia. Faucibus fermentum habitasse vitae sollicitudin placerat purus, fringilla donec nulla felis pharetra, gravida diam nascetur est vulputate. Auctor metus nostra sem convallis tortor mus ac vehicula aliquam, nunc sociosqu risus cum dictum porttitor sapien accumsan, conubia purus parturient id erat odio tellus duis.",
                  "valor": 0
                }
              }
            }
          }
        }
      }
    }
  };
}
