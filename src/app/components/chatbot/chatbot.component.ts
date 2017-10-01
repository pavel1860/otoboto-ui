import {Component, Input} from '@angular/core';
import {Chatbot} from '../../services/chatbot.service';

@Component({
  selector: 'chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})

export class ChatbotComponent {
  
  speach;
  attachment; 
  options;

  constructor(private chatbotService: Chatbot) {}

  ngOnInit() {

  }

  say(speach, attachment, options) {
      this.speach = speach;
      this.attachment = attachment ? attachment.type : undefined;
      this.options = options;
  }

  loginWithFB() {
    this.chatbotService.loginWithFB();
  }

}