import {Component, Input} from '@angular/core';
import {Chatbot} from '../../services/chatbot.service';

@Component({
  selector: 'chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})

export class ChatbotComponent {
  
  speach;
  allowInput = true; 
  isTyping = false;
  
  messages = [];

  constructor(private chatbotService: Chatbot) {}

  ngOnInit() {

  }

  say(message) {
    this.messages.push(message); 
    this.isTyping = false; 
  }

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