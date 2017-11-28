import { Injectable } from '@angular/core';

@Injectable()
export class LocalService {

    setAccessToken(token) {
        localStorage.setItem('access_token', token);
    }

    getAccessToken() {
        return localStorage.getItem('access_token');
    }

    cookieExists(userLoginData) {
        let cookieData = JSON.parse(localStorage.getItem('login')); 
        if (!cookieData) {
            return false; 
        } 
        return ((cookieData['userID'] == userLoginData.userID) && (cookieData['accessToken'] == userLoginData.accessToken))
    }

    setUserProfileData(userLoginData) {
        localStorage.setItem('profile', JSON.stringify(userLoginData));
    }

    getUserProfileData() {
        return JSON.parse(localStorage.getItem('profile'));
    }
    
    clear() {
        localStorage.removeItem('profile');
        localStorage.removeItem('login');
    }

}