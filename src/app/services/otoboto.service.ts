import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, RequestOptions } from "@angular/http";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';
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
        OPEN_SESSION: 'tok'
    }

    constructor(private fb: FacebookService, private http: Http) {
        
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

    setHeadersForAuth = () => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.accessToken); 
        this.requestOptions = new RequestOptions({ headers: headers });          
    }

    setHeaders = () => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.accessToken); 
        this.requestOptions = new RequestOptions({ headers: headers, withCredentials: true });          
    }  

    loginWithFB = () => {

        const options: LoginOptions = {
            scope: 'public_profile,user_friends,email,pages_show_list',
            return_scopes: true,
            enable_profile_selector: true
        }; 

        return this.fb.login(options).then(userLoginData => {
            this.accessToken = userLoginData.authResponse.accessToken;
            this.setHeadersForAuth();
            return;
        }).then(this.connect);

    }

    connect = () => {
        return new Promise((resolve, reject) => {
            let url = this.base + this.END_POINTS.CONNECT + `?tok=${this.accessToken}`;
            this.http.post(url, null, this.requestOptions).map(res => res.json()).subscribe(response => {
                this.setHeaders(); 
                resolve(response);
            }); 
        });  
    }

    disconnect = () => {
        let url = this.base + this.END_POINTS.DISCONNECT;
        return this.http.get(url, this.requestOptions).map(res => res.json());       
    }

    getUserFacebookProfile = (userData) => {
        if (userData) {
            return new Promise((resolve, reject) => {
                this.fb.api('/me?fields=id,picture').then((userProfileData)=> {
                    userData.userProfileData = userProfileData; 
                    resolve(userData);
                }); 
            });  
        }
    }

    loadGuestData = (category, city, price) => {
        let url = this.base + this.END_POINTS.GUEST_DATA + `?category=${category}&city=${city}&price=${price}`;
        return this.http.get(url, this.requestOptions).map(res => res.json());      
    }

    loadUserData = (page) => {
        let url = this.base + this.END_POINTS.USER_DATA + `?page=${page}`;
        return this.http.get(url, this.requestOptions).map(res => res.json());         
    }

    loadUserFavorites = () => {
        let url = this.base + this.END_POINTS.USER_FAVORITES; 
        return this.http.get(url, this.requestOptions).map(res => res.json());         
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



}