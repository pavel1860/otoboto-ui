import { Injectable } from '@angular/core';

@Injectable()
export class LocalService {

    setAccessToken(token) {
        localStorage.setItem('access_token', token);
    }

    getAccessToken() {
        return localStorage.getItem('access_token');
        /*
        let res = localStorage.getItem('access_token');
        if (typeof res == 'string') {
            return res;
        } 
        */
    }

    setUserProfileData(userLoginData) {
        localStorage.setItem('profile', JSON.stringify(userLoginData));
    }

    getUserProfileData() {
        return JSON.parse(localStorage.getItem('profile'));
    }
    
    clear() {
        localStorage.removeItem('profile');
        localStorage.removeItem('access_token');
    }

}