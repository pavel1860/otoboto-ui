import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class BotComponent {

  @Input() showMe = false; 

  @Output() request: EventEmitter<any> = new EventEmitter();

  caption; 
  userResponseType;
  attention = false; 
  operationCode; 
  operationData;

  width = window.screen.width;

  onResize(event){
    this.width = event.target.innerWidth;
  }

  react(data, item) {

    let behavior = this.process(data);

    switch (behavior['code']) {
      case 'hideManufacturer':
          this.showMe = true; 
          this.attention = true; 
          this.caption = 'להסתיר את כל ה' + item.manufacturer + '?'; 
          this.userResponseType = 'yesNoQuestion'; 
          this.operationCode = 'hideManufacturer'; 
          this.operationData = item; 
          break;
      case 'hideModel':
          this.showMe = true; 
          this.attention = true; 
          this.caption = 'להסתיר את כל ה' + item.manufacturer + ' ' + item.model + '?'; 
          this.userResponseType = 'yesNoQuestion'; 
          this.operationCode = 'hideModel'; 
          break;      
    }

  }

  process(data) {
    let behavior = {
      code: 'hideManufacturer'
    }; 
    if (data.ask_hide_manufacturer) {
      behavior.code = 'hideManufacturer'; 
      return 101;
    } 
    if (data.ask_hide_model) {
      behavior.code = 'hideModel'; 
    }
    return behavior; 
  }
}
