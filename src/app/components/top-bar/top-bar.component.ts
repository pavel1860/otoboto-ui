import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent {

  @Input() userProfileData; 
  @Input() loading; 
  @Input() haveResults; 
  @Input() viewMode; 
  @Output() loginRequest: EventEmitter<any> = new EventEmitter();
  @Output() logoutRequest: EventEmitter<any> = new EventEmitter();
  @Output() showResults: EventEmitter<any> = new EventEmitter();

  showUserMenu = false;

  block(e) {
    e.stopPropagation();
  }

}
