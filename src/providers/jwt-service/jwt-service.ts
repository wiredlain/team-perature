import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

	constructor() { }

	getToken(): String {
		return window.localStorage['jwtToken'];
	}

	saveToken(token: String) {
		window.localStorage['jwtToken'] = token;
	}

	destroyToken() {
		window.localStorage.removeItem('jwtToken');
	}
	saveUser(user: any) {
		window.localStorage['user'] = JSON.stringify(user);
	}

	getUser() {
		return JSON.parse(window.localStorage['user']);
	}


}