import { Injectable } from "@angular/core";
import { ApiService } from "../api/api";
import { Http } from "@angular/http";
import { Observable } from "rxjs";

/*
  Generated class for the CuestionarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class ItemPregunta {
	DescripcionPregunta	: string;
	observacionPregunta	: string;
	NumeroOrden			: number;
	idPregunta			: number;
	valor				: string;
	Comentario			: string;
	constructor(
		descripcion	: string,
		titulo		: string,
		orden		: number,
		id			: number,
		valor		: string,
		comentario	: string
	){
		this.DescripcionPregunta	= titulo;
		this.observacionPregunta 	= descripcion;
		this.NumeroOrden			= orden;
		this.idPregunta				= id;
		this.valor					= valor;
		this.Comentario				= comentario
	}
}

export class Cuestionario {
	descripcion		: string;
	fechaIni		: Date;
	fechaFin		: Date;
	estado			: number;
	jsonPreguntas	: ItemPregunta[];

	constructor(
		descripcion	: string,
		fechaInicio	: Date,
		fechaFin	: Date,
		estado		: number,
		preguntas	: ItemPregunta[]
	){
		this.descripcion 		= descripcion;
		this.fechaIni 			= fechaInicio;
		this.fechaFin			= fechaFin;
		this.estado				= estado;
		this.jsonPreguntas		= preguntas;
	}
}
@Injectable()
export class CuestionarioProvider {
	cuestionario: any;

	constructor(
		private apiService: ApiService
	) { }

	getAll(): Observable<Cuestionario> {
        if (this.cuestionario !== undefined && this.cuestionario !== null) {
            return Observable.of(this.cuestionario);
        } else {
			let headers = {'UUID': 1, 'IDCUESTIONARIO': 'R0IPoWPzvH7gOC4xCLyZ'}
            return this.apiService.get(`/cuestionario`, null, headers)
                .map(response => {
                    return response.cuestionario;
				}
			);
        }
	}
	createCuestionario(data): Observable<any> {
		let headers = {'UUID': 1, 'IDCUESTIONARIO': 'R0IPoWPzvH7gOC4xCLyZ', "content-type" : "application/json"}
    	return this.apiService.post(`/guardar/`, data, headers)
      		.map(response => {
        		return response;
			}
		);
  	}
}
