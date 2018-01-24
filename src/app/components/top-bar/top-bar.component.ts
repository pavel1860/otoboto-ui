import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent {

  _viewMode; 

  @Input() userProfileData; 
  @Input() loading; 
  @Input() haveResults; 
  @Input() showAvatar; 

  @Input('viewMode')
  set viewMode(value) {
      this._viewMode = value;
      if (value == 'results') {
        this.hideBackButton = true;
      } else {
        this.hideBackButton = false;
      }
  }
  get viewMode() {
    return this._viewMode;
  }

  @Output() loginRequest: EventEmitter<any> = new EventEmitter();
  @Output() logoutRequest: EventEmitter<any> = new EventEmitter();
  @Output() showResults: EventEmitter<any> = new EventEmitter();
  
  showUserMenu = false;
  hideBackButton = false;

  block(e) {
    e.stopPropagation();
  }

}
