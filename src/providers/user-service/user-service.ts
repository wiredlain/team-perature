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

	saveUUID(token: String) {
		window.localStorage['UUID'] = token;
	}

	destroyUUID() {
		window.localStorage.removeItem('UUID');
	}

}
