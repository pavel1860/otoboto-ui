import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'bot-speach',
  templateUrl: './bot-speach.component.html',
  styleUrls: ['./bot-speach.component.scss']
})

export class BotSpeachComponent {

    @Input() captionType; 
    @Input() caption; 
    @Input() userResponseType; 
    @Input() operationCode; 
    @Input() placeholder; 

    @Output() userResponse: EventEmitter<any> = new EventEmitter();
    @Output() request: EventEmitter<any> = new EventEmitter();

    isMobile;

    constructor (private device: DeviceService) {}

    ngOnInit() {
      this.isMobile = this.device.isMobile(); 
    }

}