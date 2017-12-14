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
    
      _items;
      get items() {
          return this._items;
      }
      
      @Input('items')
      set items(value) {
          this._items = value;
          if (this.showListItems) {
            this.options = this.items;
          }
      }

      @Input() icon;
      @Input() placeholder;
      @Input() valueToken = '';
      @Input() showListItems = true;
      @Input() submitButton = true;

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

        if (this.showListItems) {
            console.log(this.items);
            this.options = this.items;
        }

          this.valueControler.valueChanges.subscribe(token => {
               this.valueToken = token;
              if (token.length <= 0) {
                  if (this.showListItems) {
                      this.options = this.items;
                  }
                return; 
              }

              let limit; 

              if (this.showListItems) {
                  limit = undefined;
              } else {
                  limit = 3;
              }

              this.options = this.search(token,limit);
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

        search = (term, limit?) => {

            let results = [];
            this.items.forEach(function(a){if (a.indexOf(term)>-1) results.push(a)});

            if (!limit && results.length == 0) {
                return this.items;
            }

            if ((results.length < limit) || (!limit)) {
                return results;
            } else {
                return results.slice(0, limit);
            }
                
        };
  }