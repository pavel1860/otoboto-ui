import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Otoboto } from '../../services/otoboto.service';

@Component({
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})

export class ControlPanelComponent {

  @Input() loading; 
  @Input() userProfileData; 
  @Output() loginRequest: EventEmitter<any> = new EventEmitter();

  constructor(private otoboto: Otoboto) {}

  getAllUsers() {
    this.otoboto.getAllUsers().subscribe(res => {
      console.log(res);
    })
  }

  clear() {
    this.otoboto.clearUserSearch('59ff5509bfd217000ee15e4a').subscribe(res => {
      console.log(res);
    }); 
  }

}
