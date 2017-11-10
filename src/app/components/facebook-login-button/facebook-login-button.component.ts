import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'facebook-login-button',
  templateUrl: './facebook-login-button.component.html',
  styleUrls: ['./facebook-login-button.component.scss']
})

export class FacebookLoginButtonComponent {

  @Output() login: EventEmitter<any> = new EventEmitter();

}