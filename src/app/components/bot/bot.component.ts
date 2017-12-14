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
  attention = true; 
  operationCode; 
  operationData;
  inputPlaceholder;
  hiddenCountdown; 
  isMobile = true; 

  constructor(private device: DeviceService) {}

  ngOnInit() {
    this.isMobile = this.device.isMobile();
  }

  state(state, info) {

    switch (state) {
    
      case 'welcomeGuest':

        this.say('הנה הרכבים המתאימים ביותר לחיפוש שלך');
        break;
    
      case 'welcomeUser':

        this.say('הנה תוצאות החיפוש האחרון שלך');
        break; 
        
      case 'viewModeSearchResults':

        this.say('הנה תוצאות החיפוש האחרון שלך');
        break;         

      case 'viewModeSearchFavorites':

        this.say('כאן נמצאים הרכבים שאהבת');
        break;   

      case 'viewModeUserSettings':

        this.say('כאן אפשר לשחק עם ההגדרות');
        break; 

      case 'suggestHideModel':

        var caption = '';
        caption = '';
        caption += 'שמתי לב שהסתרת';
        caption += ' ';
        caption += info.data.manufacturer + ' ' + info.data.model;
        caption += ' ';
        caption += 'כבר';
        caption += ' ';
        caption += info.counter;
        caption += ' ';
        caption += 'פעמים';
        caption += '.';
        caption += ' ';
        caption += 'להסתיר עבורך את כל הרכבים מדגם זה?';

        this.say(caption, true);
        this.ask('yesNoQuestion', 'hideModel', info.data); 

        break;   

      case 'suggestHideManufacturer':

        var caption = '';
        caption = '';
        caption += 'שמתי לב שהסתרת רכבי';
        caption += ' ';
        caption += info.data.manufacturer;
        caption += ' ';
        caption += 'כבר';
        caption += ' ';
        caption += info.counter;
        caption += ' ';
        caption += 'פעמים';
        caption += '.';
        caption += ' ';
        caption += 'להסתיר עבורך את כל הרכבים מיצרן זה?';

        this.say(caption, true);
        this.ask('yesNoQuestion', 'hideManufacturer', info.data); 

        break;  

      case 'modelIsHidden': 

        var caption = '';
        caption += 'הסתרתי עבורך את כל רכבי ה';
        caption += info.data.manufacturer + ' ' + info.data.model;
        caption += '.';
        this.say(caption, true);

        break; 

      case 'manufacturerIsHidden': 

        var caption = '';
        caption += 'הסתרתי עבורך את כל רכבי ה';
        caption += info.data.manufacturer;
        caption += '.';
        this.say(caption, true);

        break;    

      case 'suggestLogin': 

        var caption = '';
        caption += 'על מנת לבצע פעולה זו, עליך להתחבר אליי';
        this.say(caption, true);
        this.ask('singleAction', 'login'); 
        
        break;

      case 'setFilter': 

        var caption = '';
        caption += 'לעדכן ';
        caption += info.title;
        caption += '?';
        this.say(caption, true);        
        this.ask(info.id, 'setFilter', {filter: info.id}, info.title);

        break;

    }    
  
  }

  say(caption, attention?) {
    this.userResponseType = undefined;
    this.caption = caption;
    if (attention) {
      this.showMe.emit();
    } else {
      this.hideMe.emit();
    }
  }

  ask(inputType, operationCode, operationData?, placeholder?) {
    console.log(inputType);
    this.userResponseType = inputType;
    this.operationCode = operationCode; 
    this.operationData = operationData;
    this.inputPlaceholder = placeholder; 
  }



  /*
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
  */

  reset() {
    this.caption = this.defaultCaption; 
  }

  react(data, item) {

    let behavior = this.process(data);
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
