import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api';
import { Observable } from 'rxjs';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

	token: any;
	usuario: any;
	celula: any;

	constructor(
		private apiService: ApiService
	) { }

	getToken(UUID: string): Observable<String> {
		if (this.token !== undefined && this.token !== null) {
			return Observable.of(this.token);
		} else {
			let headers = { 'UUID': UUID }
			return this.apiService.get(`/tempPerature/getToken`, null, headers)
				.map(response => {
					return response.customToken;
				}
				);
		}
	}

	getUUID(): String {
		return window.localStorage['UUID'];
	}
	getUserUID(UUID: string): Observable<any> {
		if (this.usuario !== undefined && this.usuario !== null) {
			return Observable.of(this.usuario);
		} else {
			let headers = { 'UUID': UUID }
			return this.apiService.get(`/tempPerature/usuarioporId`, null, headers)
				.map(response => {
					return response.usuarios;
				}
			);
		}
	}
	getCelula(celulaid: string):Observable<any> {
		if (this.celula !== undefined && this.celula !== null) {
			return Observable.of(this.celula);
		} else {
			let headers = { 'celula': celulaid }
			return this.apiService.get(`/tempPerature/celulasPorId`, null, headers)
				.map(response => {
					return response.snapshot;
				}
			);
		}
	}
	saveUUID(token: String) {
		window.localStorage['UUID'] = token;
	}

	destroyUUID() {
		window.localStorage.removeItem('UUID');
	}

}
