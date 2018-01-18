import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
  providers: [ DeviceService ]
})

export class BotComponent {

  @ViewChild('speach') speach;

  @Output() showMe: EventEmitter<any> = new EventEmitter();
  @Output() hideMe: EventEmitter<any> = new EventEmitter();
  @Output() request: EventEmitter<any> = new EventEmitter();

  defaultCaption; 
  caption;
  captionType; 
  userResponseType;
  attention = true; 
  operationCode; 
  operationData;
  inputPlaceholder;
  hiddenCountdown; 
  isMobile = true; 
  currentState; 
  showBot = false;

  jump = false;

  constructor(private device: DeviceService) {}

  ngOnInit() {
    this.isMobile = this.device.isMobile();
  }

  alert() {
    this.jump = true; 
    setTimeout(() => {
      this.jump = false;
    },1500);
  }

  processUserResponse(answare) {
    if (answare == 'yes') {
      this.request.emit({code: this.operationCode, data: this.operationData}); 
    } 
    if (answare == 'no') {
      this.state('welcomeGuest');
    }
    
  }

  state(state, info?) {

    if (state == this.currentState) {
      
      this.alert();  
      console.log(this.jump);
    } 

    this.currentState = state; 

    console.log(state);

    switch (state) {

      case 'welcomeGuest':

        console.log(this.isMobile); 
        if (this.isMobile) {
          this.showBot = false;
        } else {
          this.show('defaultBoard');
        }
        
        break;
    
      case 'welcomeUser':

        if (this.isMobile) {
          this.showBot = false;
        } else {
          this.show('defaultBoard');
        }
        break; 
        
      case 'viewModeSearchResults':

        this.show('defaultBoard');
        break;         

      case 'viewModeSearchFavorites':

        if (this.isMobile) {
          return;
        }

        this.say('כאן נמצאים הרכבים שאהבת');
        break;   

      case 'viewModeUserSettings':
        if (this.isMobile) {
          return;
        }
        this.say('כאן אפשר לשחק עם ההגדרות');
        break; 

      case 'userSettings': 
        if (this.isMobile) {
          return;
        }
        this.show('userSettings');
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
        this.say(caption, true, 2);

        break; 

      case 'manufacturerIsHidden': 

        var caption = '';
        caption += 'הסתרתי עבורך את כל רכבי ה';
        caption += info.data.manufacturer;
        caption += '.';
        this.say(caption, true, 2);

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

  say(caption, attention?, time?) {
    this.userResponseType = undefined;
    this.caption = caption;
    this.captionType = 'question';
    this.showBot = true;
    if (time) {
      setTimeout(() => {
        this.showBot = false;
      }, time*1000);
    }
    if (attention) {
      this.showMe.emit();
    } else {
      this.hideMe.emit();
    }
  }

  ask(inputType, operationCode?, operationData?, placeholder?) {
    this.userResponseType = inputType;
    this.captionType = 'question';
    this.operationCode = operationCode; 
    this.operationData = operationData;
    this.inputPlaceholder = placeholder; 
  }

  show(captionType) {
    this.captionType = captionType;
    this.userResponseType = undefined; 
    this.caption = undefined;
  }

  reset() {
    this.caption = undefined;
    this.captionType = undefined;
    this.userResponseType = undefined; 
  }

  updateFilters() {
    this.speach.updateFilters();
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



  react(data, item) {

    let behavior = this.process(data);
    switch (behavior['code']) {
      case 'hideManufacturer':
          this.showMe.emit(true);
          this.attention = true; 
          this.caption = 'להסתיר את כל רכבי ה' + item.manufacturer + '?'; 
          this.userResponseType = 'yesNoQuestion'; 
          this.captionType = 'question';
          this.operationCode = 'hideManufacturer'; 
          this.operationData = item; 
          break;
      case 'hideModel':
          this.showMe.emit(true);
          this.attention = true; 
          this.caption = 'להסתיר את כל ה' + item.manufacturer + ' ' + item.model + '?'; 
          this.userResponseType = 'yesNoQuestion'; 
          this.captionType = 'question';
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
