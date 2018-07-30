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
	titulo			: string;
	descripcion		: string;
	orden			: number;
	id				: number;
	valor			: string;
	constructor(
		descripcion	: string,
		titulo		: string,
		orden		: number,
		id			: number,
		valor		: string,
	){
		this.titulo			= titulo;
		this.descripcion 	= descripcion;
		this.orden			= orden;
		this.id				= id;
		this.valor			= valor;
	}
}

export class Cuestionario {
	descripcion	: string;
	fechaInicio	: Date;
	fechaFin	: Date;
	preguntas	: ItemPregunta[];

	constructor(
		descripcion	: string,
		fechaInicio	:	Date,
		fechaFin	:	Date,
		preguntas	: ItemPregunta[]
	){
		this.descripcion 	= descripcion;
		this.fechaInicio 	= fechaInicio;
		this.fechaFin		= fechaFin;
		this.preguntas		= preguntas;
	}
}
@Injectable()
export class CuestionarioProvider {
	cuestionario: any;

	constructor(
		private apiService: ApiService
	) { }

	getAll(): Observable<any> {
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
}
