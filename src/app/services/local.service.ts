import { Injectable } from '@angular/core';

@Injectable()
export class LocalService {

    constructor() {}

    getResults() {
        return JSON.parse(localStorage.getItem('data'));
    }

    getFavorites() {
        return JSON.parse(localStorage.getItem('favorites'));
    }

    saveResults(results) {

        localStorage.setItem('data',JSON.stringify(results));
    }

    saveFavorites(favorites) {
        localStorage.setItem('favorites',JSON.stringify(favorites));
    }

    setAccessToken(token) {
        localStorage.setItem('access_token',JSON.stringify(token));
    }

    setUserId(uid) {

    }

    saveUserFacebookInfo(facebookID, userData) {
        localStorage.setItem(facebookID,JSON.stringify(userData));
    }

    getUserFacebookInfo() {
        return JSON.parse(localStorage.getItem('login')); 
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

    saveUserProfile(data) {
        localStorage.setItem('profile', JSON.stringify(data));
    }

    getUserProfile() {
        return JSON.parse(localStorage.getItem('profile')); 
    }  
    
    likeItem(item) {
        this.removeItem(item);
        let favorites = this.getFavorites();
        favorites.push(item);
        this.saveFavorites(favorites);
    }

    removeItem(item) {
        let results = this.getResults();
        let index = results.findIndex(element => element.car_document_id.$oid == item.car_document_id.$oid);
        results.splice(index,1);
        this.saveResults(results);
    }

    removeIds(ids) {
        let results = this.getResults();
        console.log(results); 
        console.log(ids);
        let filtered = results.filter(item => {
            let id = item.car_document_id.$oid; 
            let index = ids.indexOf(id);
            console.log(index);
            return index == -1;
        }); 
        console.log(filtered); 
        this.saveResults(filtered);
    }

    clear() {
        localStorage.removeItem('profile');
        localStorage.removeItem('login');
        localStorage.removeItem('data');
        localStorage.removeItem('favorites');
    }

}