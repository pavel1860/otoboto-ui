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
  @Input() minimize; 
  @Input() viewMode;

  @Output() loginRequest: EventEmitter<any> = new EventEmitter();
  @Output() viewModeChange: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();

  constructor(private otoboto: Otoboto) {}

  getAllUsers() {

  }

  clear() {}

}
