import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  providers: [ Auth ]
})

export class TopBarComponent {

  constructor(private auth: Auth) {}

  loginWithFB() {
    this.auth.loginWithFB(); 
  }

}
