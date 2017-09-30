import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import * as io from 'socket.io-client';
import {Chatbot} from './services/chatbot.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private chatbot: Chatbot) {}

  ngOnInit() {
    this.chatbot.getMessages().subscribe(message => {
      this.execute(message); 
    });
  }

  execute(message) {

    switch (message.code) {
      case "say":
        this.say(message.descriptor); 
        break;
      default:
        console.log(message); 
    }

  }

  say(descriptor) {}





}
