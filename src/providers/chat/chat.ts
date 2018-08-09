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
export class ChatProvider {

	search: any;

	constructor(
		private apiService: ApiService
	) { }

	getMessage(search: string): Observable<any> {
		if (this.search !== undefined && this.search !== null) {
			return Observable.of(this.search);
		} else {
      let headers = {"content-type" : "application/json"}
			return this.apiService.post(`/watson/api/message`, {"input": {"text": search}}, headers)
				.map(response => {
					return response.output;
				}
				);
		}
	}
}
