import { Injectable } from '@angular/core';

@Injectable()
export class LocalService {

    constructor() {}

    saveResults(results) {
        localStorage.setItem('data',JSON.stringify(results));
    }

    setAccessToken(token) {
        localStorage.setItem('access_token',JSON.stringify(token));
    }

    setUserId(uid) {

    }

    getResults() {
        return JSON.parse(localStorage.getItem('data'));
    }

    saveUserFacebookInfo(facebookID, userData) {
        localStorage.setItem(facebookID,JSON.stringify(userData));
    }

    getUserFacebookInfo(facebookID) {
        return JSON.parse(localStorage.getItem(facebookID)); 
    }

    cookieExists(userLoginData) {
        let cookieData = JSON.parse(localStorage.getItem('login')); 
        if (!cookieData) {
            return false; 
        } 
        return ((cookieData['userID'] == userLoginData.userID) && (cookieData['accessToken'] == userLoginData.accessToken))
    }

    setCookie(userLoginData) {
        localStorage.setItem('login', JSON.stringify(userLoginData));
    }

}