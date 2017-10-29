import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, RequestOptions } from "@angular/http";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';
import { environment } from '../../environments/environment';
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";

@Injectable()
export class Otoboto {

  private base;  

  constructor(private fb: FacebookService, private http: Http) {

    if (environment.production) {
      this.base = environment['BOT_URI'];
    } else {
      this.base = 'http://localhost:8080/';
    }

    let initParams: InitParams = {
      appId: '1920807244817016',
      xfbml: true,
      version: 'v2.8'
    };

    this.fb.init(initParams);

  }

	prepareData = (): Observable<Response> => {
		return this.http
			.get(this.base + "prepare_anonymous_data?price=40000&catagory=family")
			.map(res => res.json());
  };
  
  getData = (req): Observable<Response> => {
		return this.http
			.get(this.base + req + 'haifa')
			.map(res => res.json());
  };

}