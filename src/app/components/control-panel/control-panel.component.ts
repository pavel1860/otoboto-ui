import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Otoboto } from '../../services/otoboto.service';
import { DeviceService } from 'app/services/device.service';

@Component({
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})

export class ControlPanelComponent {

  @ViewChild('nav') nav;

  isMobile;
  
  @Input() loading; 
  @Input() userProfileData; 
  @Input() minimize; 
  @Input() viewMode;
  @Input() globalViewMode; 
  @Input() haveResults; 
  @Input() showAvatar; 
  
  @Output() loginRequest: EventEmitter<any> = new EventEmitter();
  @Output() logoutRequest: EventEmitter<any> = new EventEmitter();
  @Output() viewModeChange: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();
  @Output() showUserSettingsDropDown: EventEmitter<any> = new EventEmitter();
  @Output() showResults: EventEmitter<any> = new EventEmitter();
  @Output() newSearch: EventEmitter<any> = new EventEmitter();

  constructor(private otoboto: Otoboto, private device: DeviceService) {
    this.isMobile = device.isMobile();
  }

  getAllUsers() {

  }

  notifyAddedToFavorites() {
    this.nav.notifyAddedToFavorites(); 
  }

  clear() {}

}
