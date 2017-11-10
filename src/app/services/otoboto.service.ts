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

  private END_POINTS = {
    AUTH: 'authorize',
    PREPARE_DATA: 'prepare_anonymous_data',
    GET_DATA: 'set_anonymous_location',
    SHOW_RESULTS: 'show_anonymous_results', 
    CLEAR_SEARCH: 'clean_user_search', 
    GET_USERS: 'get_all_users',
    LIKE: 'add_liked_car',
    FAVORITES: 'favorites',
    RESET: 'clean_user_decisions',
    GET_PAGE: 'show_cars',
    DISLIKE: 'add_ignored_car'
  }

  uid;

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

    console.log(initParams); 

    this.fb.init(initParams);

  }

  init = (uid) => {
    console.log(uid);
    this.uid = uid;
  }

  login = (token, userParams) => {
    let request = this.base + this.END_POINTS.AUTH + '?' + 'token=' + token; 
    if (userParams) {
      if (userParams.type) {
        request += '&catagory=' + userParams.type
      }
      if (userParams.city) {
        request += '&city=' + userParams.city
      }
      if (userParams.price) {
        request += '&price=' + userParams.price
      }   
    }     
		return this.http
			.get(request)
      .map(res => {
        console.log(res);
        console.log(res.json());
        return res; 
      });
  }

	prepareData = (catagory, price): Observable<Response> => {
    let request = this.base + this.END_POINTS.PREPARE_DATA + '?' + 'catagory=' + catagory + '&' + 'price=' + price; 
		return this.http
			.get(request)
      .map(res => {
        let data = res.json(); 
        this.uid = data.user_id; 
        console.log('Data is ready, uid is: ', this.uid);
        return data; 
      });
  };
  
  getData = (location, uid) => {
    let request = this.base + this.END_POINTS.GET_DATA + '?' + 'user_id=' + this.uid + '&' + 'city=' + location + '&' + 'radius=' + '40';
    return this.http
      .get(request)
      .map(res => res.json());
  };

  getUID() {
    return this.uid;
  }

  setUID(uid) {
    this.uid = uid;
  }

  clearUserSearch(uid) {
    let request = this.base + this.END_POINTS.RESET + '?' + 'user_id=' + uid; 
		return this.http
			.get(request)
      .map(res => {
        let data = res.json(); 
        return data; 
      });    
  }

  getAllUsers() {
    let request = this.base + this.END_POINTS.GET_USERS; 
		return this.http
			.get(request)
      .map(res => {
        let data = res.json(); 
        return data; 
      });    
  }  

  like = (item) => {
    let request = this.base + this.END_POINTS.LIKE + '?' + 'user_id=' + this.uid + '&' + 'car_id=' + item.car_document_id.$oid; 
		return this.http
			.get(request)
      .map(res => {
        let data = res.json(); 
        return data; 
      });     
  }

  dislike = (item) => {
    let request = this.base + this.END_POINTS.DISLIKE + '?' + 'user_id=' + this.uid + '&' + 'car_id=' + item.car_document_id.$oid; 
		return this.http
			.get(request)
      .map(res => {
        let data = res.json(); 
        return data; 
      });     
  }

  getFavorites = () => {
    let request = this.base + this.END_POINTS.FAVORITES + '?' + 'user_id=' + this.uid;
		return this.http
			.get(request)
      .map(res => {
        let data = res.json(); 
        return data; 
      });      
  }

  getPage = (offest) => {
    let request = this.base + this.END_POINTS.GET_PAGE + '?' + 'user_id=' + this.uid + '&' + 'limit=20' + '&' + 'offset=' + offest;
		return this.http
			.get(request)
      .map(res => {
        let data = res.json(); 
        return data; 
      });      
  }

}