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
		let alert = this.alertCtrl.create({
			title: "Finalizar",
			message: "¿Estás seguro de finalizar la encuesta?",
			buttons: [
				{
					text: "Cancelar",
					role: "cancel",
					handler: () => {
						this.preview = false;
					}
				},
				{
					text: "Aceptar",
					handler: () => {
						this.preview = true;
						console.log(this.modelo_preguntas);

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
		this.loading.present().then(()=>{
			this.cuestionarioService.getAll().subscribe(
				cuestionarios => {
					//let id = Object.keys(cuestionarios)[0];
					let _cuestionario = cuestionarios;
					let _preguntas = _cuestionario.jsonPreguntas.preguntas;
	
					let preguntas = [];
					let contador = 0;
					_.forEach(_preguntas, (item: any) => {
						let p = new ItemPregunta(
							item.observacionPregunta,
							item.DescripcionPregunta,
							item.NumeroOrden,
							item.idPregunta,
							item.valor
						);
						preguntas.push(p);
						this.modelo_preguntas[contador] = { comentario: null, rango: null };
						contador++;
						console.log(this.modelo_preguntas);
					});
	
					this.cuestionario = new Cuestionario(
						_cuestionario.descripcion,
						_cuestionario.fechaInicio,
						_cuestionario.fechaFin,
						preguntas
					);
					this.preguntas = preguntas;
					this.loading.dismiss();
				},
				error => {
					this.loading.dismiss();
					console.log(error);
				}
			);
		});
	}
}
