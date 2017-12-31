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
  @Output() newSearch: EventEmitter<any> = new EventEmitter();
  @Output() resetSearch: EventEmitter<any> = new EventEmitter();

  isGuest;

  constructor(private api: Otoboto, private route: ActivatedRoute) {}

  ngOnInit() {

      this.route.queryParams.subscribe((params) => {
        
        this.isGuest = params.isGuest;

      });           
  }

}
