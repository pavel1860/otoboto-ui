import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Otoboto } from '../../services/otoboto.service';
import { DeviceService } from 'app/services/device.service';

@Component({
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})

export class ControlPanelComponent {

  isMobile;
  
  @Input() loading; 
  @Input() userProfileData; 
  @Input() minimize; 
  @Input() viewMode;
  @Input() globalViewMode; 

  @Output() loginRequest: EventEmitter<any> = new EventEmitter();
  @Output() viewModeChange: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();
  @Output() showUserSettingsDropDown: EventEmitter<any> = new EventEmitter();
  @Output() showResults: EventEmitter<any> = new EventEmitter();

  constructor(private otoboto: Otoboto, private device: DeviceService) {
    this.isMobile = device.isMobile();
  }

  getAllUsers() {

  }

  clear() {}

}
