import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'wizard-selector-autocomplete',
  templateUrl: './wizard-selector-autocomplete.component.html',
  styleUrls: ['./wizard-selector-autocomplete.component.scss']
})

export class WizardSelectorAutocomplete {
  
      @ViewChild('inputPane') inputPane;
      @ViewChild('input') input;
    
      @Input() icon;
      @Input() placeholder;
      @Input() items; 
      @Input() valueToken = '';
      @Output() done: EventEmitter<any> = new EventEmitter();
  
      valueControler = new FormControl();
      value; 
      showInputPane = false; 
      options = [];
      showOptionsMenu = false; 
      
      constructor() {}

      ngOnInit() {

          if(!this.valueToken) {
              this.valueToken = '';
          }

          this.valueControler.valueChanges.subscribe(token => {
               this.valueToken = token;
              if (token.length <= 0) {
                return; 
              }
              this.options = this.search(token,3);
              if (this.options.length > 0) {
                  this.showOptionsMenu = true; 
              }
          });  

      }
  
      block(e) {
          e.stopPropagation();
      }
  
      openInputPane() {
          this.inputPane.open(); 
          setTimeout(() => this.input.nativeElement.focus(), 0);        
      }

        search = (term, limit) => {

            let results = [];
            this.items.forEach(function(a){if (a.indexOf(term)>-1) results.push(a)});

            if (results.length < limit) {
                return results;
            } else {
                return results.slice(0, limit);
            }
                
        };
  }