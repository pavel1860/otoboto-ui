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
  @Output() logout: EventEmitter<any> = new EventEmitter();
  @Output() resetSearch: EventEmitter<any> = new EventEmitter();

  constructor(private local: LocalService, private router: Router, private api: Otoboto) {}

  ngOnInit() {

  }

  reset() {
    /*
      this.api.resetUser().subscribe(res => {

      })
      */
  }

}
