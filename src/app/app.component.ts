import {Component, ViewChild} from '@angular/core';
import {Chatbot} from './services/chatbot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  results; 
  
  @ViewChild('chatbot') chatbot;

  constructor(private chatbotService: Chatbot) {}

  ngOnInit() {
    this.chatbotService.getMessages().subscribe(message => {
      this.execute(message); 
    });
  }

  execute(message) {
    switch (message.code) {
      case "say":
        this.chatbot.say(message.speach); 
        break;
      case "typing": 
        this.chatbot.activateTypingMode(); 
        break;
    }

  }

  say(speach) {
    this.chatbot.say(speach.caption, speach.attachment, speach.options);
  }





}
