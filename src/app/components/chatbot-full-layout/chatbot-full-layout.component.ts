import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Chatbot} from '../../services/chatbot.service';

@Component({
  selector: 'chatbot-full-layout',
  templateUrl: './chatbot-full-layout.component.html',
  styleUrls: ['./chatbot-full-layout.component.css']
})

export class ChatbotFullLayoutComponent {

  @Input() message; 
  @Input() input;

  @Output() facebookLogin: EventEmitter<any> = new EventEmitter();
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();
  @Output() userInput: EventEmitter<any> = new EventEmitter();

  constructor(private chatbotService: Chatbot) {}

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
