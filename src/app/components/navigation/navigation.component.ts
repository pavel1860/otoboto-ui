import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {

  @Input() userProfileData; 
  @Input() viewMode; 

  @Output() setViewMode: EventEmitter<any> = new EventEmitter();

  ngOnInit() {


  }

}
