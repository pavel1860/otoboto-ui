import { Injectable } from '@angular/core';

@Injectable()
export class LocalService {

    constructor() {}

    saveResults(uid, results) {
        localStorage.setItem(uid,JSON.stringify(results));
    }

    getResults(uid) {
        return JSON.parse(localStorage.getItem(uid));
    }

}