import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Locations } from '../../services/locations.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
  providers: [ Locations ]
})

export class LocationSelectorComponent {
    
      @Input() initialValue = '';
      @Input() submitButton; 

      @Output() done: EventEmitter<any> = new EventEmitter();
      @Output() value: EventEmitter<any> = new EventEmitter();
    
      items = [];
      icon = '../../assets/location-icon-color.svg';
      placeholder = 'הכנס עיר';
      
      constructor(private locations: Locations) {}

      ngOnInit() {

          this.locations.getLocations().subscribe(response => {
              this.items = response;
          })

      }
  
  }