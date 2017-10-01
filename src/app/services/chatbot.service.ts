import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

import * as io from 'socket.io-client';

@Injectable()
export class Chatbot {

  private url = 'http://localhost:5000';  
  private socket;

  constructor(private fb: FacebookService) {

    let initParams: InitParams = {
      appId: '1920807244817016',
      xfbml: true,
      version: 'v2.8'
    };

    this.fb.init(initParams);

  }
  
  sendMessage(message){
    this.socket.emit('POSTBACK', this.sendPostback(message.payload, null).msg);  
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('SET_MENU', (response) => {
        let data = this.parseResponse(response); 
        observer.next(data); 
      });
      this.socket.on('BOT_MESSAGE', (response) => {
        let data = this.parseResponse(response); 
        observer.next(this.createBotMessageDescriptor(data));   
      });     
      this.socket.on('BACKEND_ACTION', (response) => {
        let data = this.parseResponse(response); 
        this.doBackendAction(data); 
        observer.next(data);    
      });           
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  

  createBotMessageDescriptor(data) {

    let descriptor = {}; 
    
    if (data.sender_action == 'typing_on') {

      descriptor['code'] = 'typing';
      descriptor['duration'] = data.time;

    } else if (data.message) {
      
      descriptor['code'] = 'say';
      descriptor['speach'] = {
        caption: data.message.text,
        attachment: data.message.attachment,
        options: data.message.quick_replies, 
        input: {
          type: 'simple'
        }      
      }

    }

    return descriptor;

  }


  parseResponse(response) {
    return JSON.parse(decodeURI(response));
  }

  doBackendAction(descriptor) {
      if (descriptor.backend_action.user_store){
        let userStore = descriptor.backend_action.user_store;
        if (userStore.type === 'load'){
          let value = localStorage.getItem(userStore.fieldName);
          this.socket.emit('POSTBACK', this.sendPostback('user_store_load', value).msg);
        } else if (userStore.type === 'save') {
          let value = localStorage.setItem(userStore.fieldName, userStore.value);
          this.socket.emit('POSTBACK', this.sendPostback('user_store_save', null).msg);
        }
      }    
  }

  sendPostback(payload, data, sender: string='123456', recipient: string='1234455') {
    let msg = this.generateMessageBody();
    this.setPostback(payload, data, msg);
    return {
      type: 'POSTBACK',
      msg,
    };
  }

  sendTextResponse(payload) {
    console.log(payload);
    console.log(this.sendTextMessage(payload));
    this.socket.emit('USER_MESSAGE', this.sendTextMessage(payload));
  }

  generateMessageBody(sender: string='1352773691447531', recipient: string='1234455') {
    return {
      sender: { id: sender },
      recipient: { id: recipient },
      timestamp: Date.now(),
    };
  }

  setPostback(payload: string, data: object, msg: Object): Object {
    msg["postback"] = {
        payload: payload,
        data: data
    };
    return msg;
  }

  loginWithFB() {

        const options: LoginOptions = {
            scope: 'public_profile,user_friends,email,pages_show_list',
            return_scopes: true,
            enable_profile_selector: true
        };    

        this.fb.login(options).then((response: LoginResponse) => { 
          this.socket.emit('POSTBACK', this.sendPostback('facebookAuth', response.authResponse).msg);
        });    
  }

  sendTextMessage(text: string, sender: string='123456', recipient: string='1234455') {
    let msg = this.generateMessageBody();
    if (!msg['message']) {
      msg['message']={};
    }  
    msg['message']['text'] = text;
    return {
      type: 'SEND_MESSAGE',
      msg,
    };
  }



}