import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
  providers: [ DeviceService ]
})

export class BotComponent {

  @Output() showMe: EventEmitter<any> = new EventEmitter();
  @Output() hideMe: EventEmitter<any> = new EventEmitter();
  @Output() request: EventEmitter<any> = new EventEmitter();

  defaultCaption; 
  caption; 
  userResponseType;
  attention = false; 
  operationCode; 
  operationData;
  hiddenCountdown; 
  isMobile = true; 

  constructor(private device: DeviceService) {}

  ngOnInit() {
    this.isMobile = this.device.isMobile();
  }

  say(text, importent, duration, setAsDefault) {
    //clearTimeout(this.hiddenCountdown);

    if (setAsDefault) {
      this.defaultCaption = text; 
    }

    this.userResponseType = undefined;
    this.caption = text;
    this.attention = importent;

    if (duration) {
      setTimeout(() => {
        this.hideMe.emit();
        this.reset(); 
      }, duration*1000);
    }

  }

  reset() {
    this.caption = this.defaultCaption; 
  }

  react(data, item) {

    let behavior = this.process(data);
    console.log(behavior['code']);  
    switch (behavior['code']) {
      case 'hideManufacturer':
          this.showMe.emit(true);
          this.attention = true; 
          this.caption = 'להסתיר את כל רכבי ה' + item.manufacturer + '?'; 
          this.userResponseType = 'yesNoQuestion'; 
          this.operationCode = 'hideManufacturer'; 
          this.operationData = item; 
          break;
      case 'hideModel':
          this.showMe.emit(true);
          this.attention = true; 
          this.caption = 'להסתיר את כל ה' + item.manufacturer + ' ' + item.model + '?'; 
          this.userResponseType = 'yesNoQuestion'; 
          this.operationCode = 'hideModel'; 
          this.operationData = item; 
          break;      
    }

  }

  process(data) {
    let behavior = {
      code: ''
    }; 
    if (data.ask_hide_manufacturer) {
      behavior.code = 'hideManufacturer';
    } 
    if (data.ask_hide_model) {
      behavior.code = 'hideModel'; 
    }
    return behavior; 
  }
}
