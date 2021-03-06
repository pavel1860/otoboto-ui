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
        DISLIKE: 'dislikes',
        MODELS_LIST: 'models_list'
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

    loginWithFB = (token?) => {

        const options: LoginOptions = {
            scope: 'public_profile,user_friends,email,pages_show_list',
            return_scopes: true,
            enable_profile_selector: true
        }; 

        if (token) {
            this.setHeaders(false);
            return this.connect().then(this.getUserFacebookProfile, e => {
                console.log('Error code C');
                return;
            });
        } else {
            return this.fb.login(options).then(userLoginData => {
                this.local.setAccessToken(userLoginData.authResponse.accessToken);
                this.setHeaders(false);
                return;
            }, e => {
                console.log('Error code A');
                return;
            }).then(this.connect, e => {
                console.log('Facebook connection error');
                return;
            }).then(this.getUserFacebookProfile, e => {
                console.log('Error code B');
                return;                
            });
        }

    }

    connect = () => {
        return new Promise((resolve, reject) => {
            let url = this.base + this.END_POINTS.CONNECT + `?tok=${this.local.getAccessToken()}`;
            this.http.post(url, null, this.requestOptions).map(res => res.json()).subscribe(response => {
                this.setHeaders(true); 
                resolve(response);
            }, e => {
                reject();
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
        if ((params.category == 'specific') && (params.manufacturer) && (params.model)) {
            url = this.base + this.END_POINTS.GUEST_DATA + `?manufacturer=${params.manufacturer}&model=${params.model}&city=${params.city}&price=${params.price}`;
        } else {
            url = this.base + this.END_POINTS.GUEST_DATA + `?category=${params.category}&city=${params.city}&price=${params.price}`;
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

    getUserSearchParameters = () => {
        let url = this.base + this.END_POINTS.USER_SEARCH_PARAMS;
        return this.http.get(url, this.requestOptions).map(res => res.json()); 
    }

    updateUserSearchParams = (params, isNewUser) => {
        
        let url; 

        if ((params.category == 'specific') && (params.manufacturer) && (params.model)) {
            url = this.base + this.END_POINTS.USER_SEARCH_PARAMS + `?manufacturer=${params.manufacturer}&model=${params.model}&city=${params.city}&price=${params.price}`;
        } else {
            url = this.base + this.END_POINTS.USER_SEARCH_PARAMS + `?category=${params.category}&city=${params.city}&price=${params.price}`;
        }
        
        if (isNewUser) {
            return this.http.post(url, null, this.requestOptions).map(res => res.json()); 
        } else {
            return this.http.put(url, null, this.requestOptions).map(res => res.json()); 
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

    getModelsList = () => {
        let url = this.base + this.END_POINTS.MODELS_LIST;
        return this.http.get(url, this.requestOptions).map(res => res.json().data);          
    }

}