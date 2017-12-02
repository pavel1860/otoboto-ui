import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, RequestOptions } from "@angular/http";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';
import { LocalService } from './local.service';

import { environment } from '../../environments/environment';
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";

@Injectable()
export class Otoboto {

    private base;
    private requestOptions;  
    private accessToken;  
    
    private END_POINTS = {
        CONNECT: 'fbconnect',
        GUEST_DATA: 'anonymous',
        USER_DATA: 'results',
        USER_FAVORITES: 'favorites',
        USER_SEARCH_PARAMS: 'users',
        DISCONNECT: 'disconnect',
        OPEN_SESSION: 'tok',
        DISLIKE: 'dislikes'
    }

    constructor(private fb: FacebookService, private http: Http, private local: LocalService) {
        
        if (environment.production) {
            this.base = environment['BOT_URI'];
        } else {
            this.base = 'http://localhost:8080/';
        }
    
        let initParams: InitParams = {
            appId: environment['APP_ID'],
            xfbml: true,
            version: 'v2.8'
        };
    
        this.fb.init(initParams);
        
    }

    init() {
        this.setHeaders(true);
    }

    setHeaders = (asBearer) => {
        let headers = new Headers();
        let token = this.local.getAccessToken();
        let authHeader;
        if (asBearer) {
            token = 'Bearer ' + token; 
            authHeader = 'Authorization';
        } else {
            authHeader = 'x-fb-token';
        }
        headers.append('Content-Type', 'application/json');
        headers.append(authHeader, token); 
        this.requestOptions = new RequestOptions({ headers: headers, withCredentials: true });          
    }  

    loginWithFB = () => {

        const options: LoginOptions = {
            scope: 'public_profile,user_friends,email,pages_show_list',
            return_scopes: true,
            enable_profile_selector: true
        }; 

        return this.fb.login(options).then(userLoginData => {
            this.local.setAccessToken(userLoginData.authResponse.accessToken);
            this.setHeaders(false);
            return;
        }).then(this.connect).then(this.getUserFacebookProfile);

    }

    connect = () => {
        return new Promise((resolve, reject) => {
            let url = this.base + this.END_POINTS.CONNECT + `?tok=${this.local.getAccessToken()}`;
            this.http.post(url, null, this.requestOptions).map(res => res.json()).subscribe(response => {
                this.setHeaders(true); 
                resolve(response);
            }); 
        });  
    }

    disconnect = () => {
        let url = this.base + this.END_POINTS.DISCONNECT;
        return this.http.post(url, this.requestOptions).map(res => res.json());       
    }

    getUserFacebookProfile = (userData) => {
        if (userData) {
            return new Promise((resolve, reject) => {
                this.fb.api('/me?fields=id,picture').then((userProfileData)=> {
                    userData.userProfileData = userProfileData;
                    this.local.setUserProfileData(userProfileData); 
                    resolve(userData);
                });  
            });  
        }
    }

    getFacebookLoginStatus = () => {
        return this.fb.getLoginStatus();
    }

    getUserFacebookData = () => {
        return this.fb.api('/me?fields=id,picture');
    }

    loadGuestData = (params) => {
        let url;
        if (params.category) {
            url = this.base + this.END_POINTS.GUEST_DATA + `?category=${params.category}&city=${params.city}&price=${params.price}`;
        } else if (params.manufacturer) {
            url = this.base + this.END_POINTS.GUEST_DATA + `?manufacturer=${params.manufacturer}&model=${params.model}&city=${params.city}&price=${params.price}`;
        }
        return this.http.get(url, this.requestOptions).map(res => res.json().data);      
    }

    loadUserData = (page) => {
        let url = this.base + this.END_POINTS.USER_DATA + `?page=${page}`;
        return this.http.get(url, this.requestOptions).map(res => res.json().data);         
    }

    loadUserFavorites = (page) => {
        let url = this.base + this.END_POINTS.USER_FAVORITES + `?page=${page}`;
        return this.http.get(url, this.requestOptions).map(res => res.json().data);         
    }    

    updateUserSearchParams = (searchParams, isNewUser) => {
        
        let url; 
        if (searchParams.category) {
            url = this.base + this.END_POINTS.USER_SEARCH_PARAMS + `?category=${searchParams.category}&city=${searchParams.city}&price=${searchParams.price}`;
        } else if (searchParams.manufacturer) {
            url = this.base + this.END_POINTS.USER_SEARCH_PARAMS + `?manufacturer=${searchParams.manufacturer}&model=${searchParams.model}&city=${searchParams.city}&price=${searchParams.price}`;
        }

        if (isNewUser) {
            return this.http.post(url, null, this.requestOptions).map(res => res.json()); 
        } else {
            return this.http.put(url, this.requestOptions).map(res => res.json()); 
        }

    } 

    like = (id) => {
        let url = this.base + this.END_POINTS.USER_FAVORITES + `?car_id=${id}`;
        return this.http.post(url, null, this.requestOptions).map(res => res.json());
    }

    dislike = (item) => {
        let url = this.base + this.END_POINTS.DISLIKE + `?car_id=${item.car_document_id}&manufacturer=${item.manufacturer}&model=${item.model}&year=${item.year}`;
        return this.http.post(url, null, this.requestOptions).map(res => res.json());        
    }

    removeItemFromFavorites = (item) => {
        let url = this.base + this.END_POINTS.USER_FAVORITES + `?car_id=${item.car_document_id}`;
        return this.http.delete(url, this.requestOptions).map(res => res.json());        
    }

    hideModel = (manufacturer, model) => {
        let url = this.base + this.END_POINTS.DISLIKE + `?manufacturer=${manufacturer}&model=${model}`;
        return this.http.post(url, null, this.requestOptions).map(res => res.json());   
    }

    hideManufacturer = (manufacturer) => {
        let url = this.base + this.END_POINTS.DISLIKE + `?manufacturer=${manufacturer}`;
        return this.http.post(url, null, this.requestOptions).map(res => res.json());   
    }

}