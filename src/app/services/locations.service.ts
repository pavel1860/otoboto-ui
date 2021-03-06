import { Http, Headers, Response, Jsonp, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";

@Injectable()
export class Locations {

	constructor(private http: Http) {}

    getLocations() {
        return this.http.get("../../../assets/data/locations.json").map(res => {
            let obj = res.json();
            return obj.map(item => item.column0);
        });    
    }

}
