import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})

export class LocationSelectorComponent {

  @Input() value = '';
  @Output() selected: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    if (!this.value) {
      this.value = '';
    }
  }

}