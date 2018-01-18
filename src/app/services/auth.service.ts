import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';
import { Otoboto } from './otoboto.service';
import { LocalService } from './local.service';
import { environment } from '../../environments/environment';

@Injectable()
export class Auth {

    constructor(private fb: FacebookService, private otoboto: Otoboto, private local: LocalService) {

        let initParams: InitParams = {
            appId: environment['APP_ID'],
            xfbml: true,
            version: 'v2.8'
        };
        
        this.fb.init(initParams);
    }

    loginWithFB(userParams) {

        const options: LoginOptions = {
            scope: 'public_profile,user_friends,email,pages_show_list',
            return_scopes: true,
            enable_profile_selector: true
        }; 
 
        return this.fb.login(options).then(userLoginData => {
          
            userLoginData['userParams'] = userParams;
            return userLoginData;
        }).then(this.systemLogin).then(this.getUserFacebookProfile); 

    }

    isLoggedIn() {
        return this.fb.getLoginStatus().then((userLoginData)=>{

        })        
    }

    login() {
        return this.fb.getLoginStatus().then((userLoginData)=>{

        }).then(this.systemLogin).then(this.getUserFacebookProfile); 
    }

    systemLogin = (userLoginData) => {
        if (userLoginData) {
            return new Promise((resolve, reject) => {
                let accessToken = userLoginData.authResponse.accessToken;
                //this.local.setAccessToken(accessToken);
                /*
                this.otoboto.login(accessToken, userLoginData.userParams).subscribe(response => {
                    let userData = response.json(); 
                    let uid = userData.user_id; 
                    let userSearchResults = userData.data;  
                    this.local.saveResults(userSearchResults);
                    this.local.setCookie(userLoginData); 
                    userData.fid = userLoginData.authResponse.userID;
                    resolve(userData); 
                });
                */              
            });
        }
    }

    getUserFacebookProfile = (userData) => {
        if (userData) {
            return new Promise((resolve, reject) => {
                this.fb.api('/me?fields=id,picture').then((userInfo)=> {
                    userData.userInfo = userInfo; 
                    resolve(userData);
                }); 
            });  
        }
    }

}