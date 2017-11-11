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
  
      @ViewChild('inputPane') inputPane;
      @ViewChild('input') input;
  
      @Input() valueToken = '';
      @Output() done: EventEmitter<any> = new EventEmitter();
  
      valueControler = new FormControl();
      value; 
      showInputPane = false; 
      isReady = false; 
      options = [];
      
      constructor(private locations: Locations) {

      }

      ngOnInit() {

          if(!this.valueToken) {
              this.valueToken = '';
          }

          this.locations.init().subscribe(() => {
            this.isReady = true; 
          });  

          this.valueControler.valueChanges.subscribe(token => {
              if (token.length <= 1) {
                return; 
              }
              this.options = this.locations.search(token);
          });  

      }
  
      block(e) {
          e.stopPropagation();
      }
  
      openInputPane() {
          this.inputPane.open(); 
          setTimeout(() => this.input.nativeElement.focus(), 0);        
      }
  
  }