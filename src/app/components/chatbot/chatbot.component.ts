import {Component, Input} from '@angular/core';
import {Chatbot} from '../../services/chatbot.service';

@Component({
  selector: 'chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})

export class ChatbotComponent {
  
  @Input() message; 
  @Input() mode; 

  isTyping = false;
  
  constructor(private chatbotService: Chatbot) {}

  activateTypingMode() {
    this.isTyping = true; 
  }

  loginWithFB() {
    this.chatbotService.loginWithFB();
  }

  selectOption(option) {
    this.chatbotService.sendMessage(option);
  }

  sendUserInput(value) {
    this.chatbotService.sendTextResponse(value);
  }

}