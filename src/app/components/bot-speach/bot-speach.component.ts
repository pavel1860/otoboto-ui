import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bot-speach',
  templateUrl: './bot-speach.component.html',
  styleUrls: ['./bot-speach.component.scss']
})

export class BotSpeachComponent {

    @Input() caption; 
    @Input() userResponseType; 
    @Input() operationCode; 

    @Output() userResponse: EventEmitter<any> = new EventEmitter();

}