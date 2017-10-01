import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'chatbot-input',
  templateUrl: './chatbot-input.component.html',
  styleUrls: ['./chatbot-input.component.css']
})

export class ChatbotInputComponent {

  @Input() type; 
  @Output() send: EventEmitter<any> = new EventEmitter();

  inputValue = '';
  
  constructor() {}

  ngOnInit() {

  }

}
