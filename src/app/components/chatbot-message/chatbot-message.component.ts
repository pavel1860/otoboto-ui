import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'chatbot-message',
  templateUrl: './chatbot-message.component.html',
  styleUrls: ['./chatbot-message.component.css']
})

export class ChatbotMessageComponent {

  @Input() message; 

  @Output() facebookLogin: EventEmitter<any> = new EventEmitter();
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();
  @Output() userInput: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {

  }

}
