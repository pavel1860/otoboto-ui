import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Otoboto } from '../../services/otoboto.service';
import { LocalService } from '../../services/local.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})

export class UserSettingsComponent {

  @Input() userProfileData; 

  constructor(private local: LocalService, private router: Router, private api: Otoboto) {}

  ngOnInit() {

  }

  logout() {
    this.local.clear(); 
    this.router.navigate(['welcome']);
  }

  reset() {
      this.api.resetUser().subscribe(res => {

      })
  }

}
