import { Http, Headers, Response, Jsonp, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";

@Injectable()
export class Locations {

    data; 

	constructor(private http: Http) {

    }

    init() {
        return this.http.get("../../../assets/data/locations.json").map(res => {
            let obj = res.json();
            this.data = obj.map(item => item.column0);
        });    
    }

	search = (term) => {

        let results = [];
        this.data.forEach(function(a){if (a.indexOf(term)>-1) results.push(a)});
        return results;

	};       

}
