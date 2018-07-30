import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Headers, Http, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/timeout";

import { JwtService } from "../jwt-service/jwt-service";
import * as _ from "lodash";

@Injectable()
export class ApiService {
  constructor(private http: Http, private jwtService: JwtService) {}

  private setHeaders(extra: Object = {}): Headers {
    const headersConfig = {
      Accept: "application/json"
    };

    if (this.jwtService.getToken()) {
      headersConfig["Authorization"] = `Bearer ${this.jwtService.getToken()}`;
    }

    if (extra) {
	  Object.assign(headersConfig, extra);	  
    }

    return new Headers(headersConfig);
  }

  private formatErrors(error: any, status: any) {
    const errorList: Array<any> = [];
    let response: any;

    if (error.status === 0) {
      response = { error: { code: 0 } };
    } else {
      response = error.json();
    }

    if (response.error) {
      errorList.push(response.error);
    } else if (response.errors) {
      _.forEach(response.errors, (value, id) => {
        errorList.push(value.error);
      });
    }

    return Observable.throw(errorList);
  }

  private parseError(err) {
    const errorList: Array<any> = [];

    if (err.error) {
      errorList.push(err.error);
    } else if (err.errors) {
      _.forEach(err.errors, (value, id) => {
        errorList.push({ id: id, actualizar: value });
      });
    }

    return errorList;
  }

  get(
    path: string,
	params: URLSearchParams = new URLSearchParams(),
	headers: Object = {}
  ): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, {
        headers: this.setHeaders(headers),
        search: params
      })
      .catch(this.formatErrors)
      .map((res: Response) => {
        return res.json();
      });
  }

  getTimeout(
    path: string,
    params: URLSearchParams = new URLSearchParams()
  ): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, {
        headers: this.setHeaders(),
        search: params
      })
      .timeout(1200000)
      .catch(this.formatErrors)
      .map((res: Response) => {
        return res.json();
      });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}, headers: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(headers)
      })
      .catch(this.formatErrors)
      .map((res: Response) => {
        return res.json();
      });
  }

  delete(path): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`, { headers: this.setHeaders() })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }
}
