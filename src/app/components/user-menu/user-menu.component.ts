import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})

export class UserMenuComponent {

  @Input() userProfileData; 
  @Input() loading; 
  @Input() haveResults; 
  @Input() showAvatar; 
  @Input() viewMode; 
  @Output() loginRequest: EventEmitter<any> = new EventEmitter();
  @Output() logoutRequest: EventEmitter<any> = new EventEmitter();
  @Output() newSearch: EventEmitter<any> = new EventEmitter();
  @Output() showResults: EventEmitter<any> = new EventEmitter();

  isActive = false;

  open() {
      console.log('sd');
      this.isActive = true;
  }

  block(e) {
    e.stopPropagation();
  }

}
