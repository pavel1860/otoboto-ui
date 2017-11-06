import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent {

  @Input() userProfileData; 
  @Input() loading; 
  @Output() loginRequest: EventEmitter<any> = new EventEmitter();

}
