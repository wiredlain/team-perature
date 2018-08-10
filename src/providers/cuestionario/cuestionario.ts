import { Injectable } from "@angular/core";
import { ApiService } from "../api/api";
import { Observable } from "rxjs";
import { UserServiceProvider } from "../user-service/user-service";

/*
  Generated class for the CuestionarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class ItemPregunta {
	DescripcionPregunta: string;
	observacionPregunta: string;
	NumeroOrden: number;
	idPregunta: number;
	valor: string;
	Comentario: string;

	constructor(
		descripcion: string,
		titulo: string,
		orden: number,
		id: number,
		valor: string,
		comentario: string
	) {
		this.DescripcionPregunta = titulo;
		this.observacionPregunta = descripcion;
		this.NumeroOrden = orden;
		this.idPregunta = id;
		this.valor = valor;
		this.Comentario = comentario
	}
}

export class Cuestionario {
	descripcion: string;
	fechaIni: Date;
	fechaFin: Date;
	estado: number;
	jsonPreguntas: ItemPregunta[];

	constructor(
		descripcion: string,
		fechaInicio: Date,
		fechaFin: Date,
		estado: number,
		preguntas: ItemPregunta[]
	) {
		this.descripcion = descripcion;
		this.fechaIni = fechaInicio;
		this.fechaFin = fechaFin;
		this.estado = estado;
		this.jsonPreguntas = preguntas;
	}
}

@Injectable()
export class CuestionarioProvider {
	cuestionario: any;
	uid: String;
	constructor(
		private apiService: ApiService,
		private userService: UserServiceProvider
	) {
		this.uid = this.userService.getUUID();
	}

	getCuestionario(uidCuestionario: string): Observable<Cuestionario> {
		if (this.cuestionario !== undefined && this.cuestionario !== null) {
			return Observable.of(this.cuestionario);
		} else {
			let headers = { 'UUID': this.uid, 'IDCUESTIONARIO': uidCuestionario }
			return this.apiService.get(`/tempPerature/cuestionario`, null, headers)
				.map(response => {
					return response.cuestionario;
				}
				);
		}
	}
	createCuestionario(data, uidCuestionario: string, idcelula:string): Observable<any> {
		let headers = { 'UUID': this.uid, 'IDCUESTIONARIO': uidCuestionario, "content-type": "application/json", 'idCelula': idcelula }
		return this.apiService.post(`/tempPerature/guardar/`, data, headers)
			.map(response => {
				return response;
			}
			);
	}

	getRespuestasCelula(data): Observable<any> {
		if (this.cuestionario !== undefined && this.cuestionario !== null) {
			return Observable.of(this.cuestionario);
		} else {
			return this.apiService.get(`/tempPerature/getAnswersByCell`, data)
				.map(response => {
					return response;
				}
				);
		}
	}

	getRespuestas(): Observable<any> {
		if (this.cuestionario !== undefined && this.cuestionario !== null) {
			return Observable.of(this.cuestionario);
		} else {
			return this.apiService.get(`/tempPerature/respuestas`, null)
				.map(response => {
					return response;
				}
				);
		}
	}

	getCuestionarioCelula(): Observable<any> {
		if (this.cuestionario !== undefined && this.cuestionario !== null) {
			return Observable.of(this.cuestionario);
		} else {
			return this.apiService.get(`/tempPerature/cuestionarioCelula`, null)
				.map(response => {
					return response;
				}
				);
		}
	}

	getPromedioPorCuestionario_Celula(idCuestionario: string): Observable<any> {
		if (this.cuestionario !== undefined && this.cuestionario !== null) {
			return Observable.of(this.cuestionario);
		} else {
			let headers = { 'IDCUESTIONARIO': idCuestionario };
			return this.apiService.get(`/tempPerature/getPromedio`, null, headers)
				.map(response => {
					return response.Promedio;
				}
				);
		}
	}

	getCuestionarios(): Observable<any> {
		if (this.cuestionario !== undefined && this.cuestionario !== null) {
			return Observable.of(this.cuestionario);
		} else {
			return this.apiService.get(`/tempPerature/cuestionarios`, null)
				.map(response => {
					return response;
				}
				);
		}
	}

	getCuestionariosValidosPorCelula(idCelula: string): Observable<any> {
		if (this.cuestionario !== undefined && this.cuestionario !== null) {
			return Observable.of(this.cuestionario);
		} else {
			let headers = { 'celula': idCelula };
			return this.apiService.get(`/tempPerature/cuestionariosValidos`, null, headers)
				.map(response => {
					return response;
				}
			);
		}
	}


}
