import { Http, Headers, Response, Jsonp, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Otoboto } from './otoboto.service';

import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";

@Injectable()
export class Models {

	constructor(private http: Http) {}

    getModels() {
        return this.http.get("../../../assets/data/models.json").map(res => {
            let obj = res.json();
            return obj;
        });    
    }

}
