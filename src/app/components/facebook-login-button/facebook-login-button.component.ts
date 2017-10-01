import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'facebook-login-button',
  templateUrl: './facebook-login-button.component.html',
  styleUrls: ['./facebook-login-button.component.css']
})

export class FacebookLoginButtonComponent {

  @Output() click: EventEmitter<any> = new EventEmitter();

}