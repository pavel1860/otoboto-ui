import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})

export class LocationSelectorComponent {

  @Input() value = '';
  @Output() done: EventEmitter<any> = new EventEmitter();

  selected; 
  
  ngOnInit() {
    if (!this.value) {
      this.value = '';
    }
  }

}