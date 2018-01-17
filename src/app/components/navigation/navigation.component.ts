import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {

  @Input() userProfileData; 
  @Input() viewMode; 

  @Output() setViewMode: EventEmitter<any> = new EventEmitter();
  @Output() showUserSettingsDropDown: EventEmitter<any> = new EventEmitter();

  isMobile;
  notifyFavorites = false;

  constructor(private device: DeviceService) {}

  ngOnInit() {

    this.isMobile = this.device.isMobile();

  }

  notifyAddedToFavorites() {
    console.log('sd');
    //this.notifyFavorites = true; 
    setInterval(() => {
      //this.notifyFavorites = false;
    }, 500);
  }

}
