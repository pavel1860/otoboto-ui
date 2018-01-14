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
          if (this.showListItems && !this.suggestOnDemand) {
            this.options = this.items;
          } else {
              this.options = [];
          }
      }

      @Input() searchSensitivity = 1;
      @Input() icon;
      @Input() placeholder;
      @Input() valueToken = '';
      @Input() showListItems = true;
      @Input() submitButton = true;
      @Input() limit; 

      @Input() suggestOnDemand = false;

      @Output() done: EventEmitter<any> = new EventEmitter();
  
      valueControler = new FormControl();
      value; 
      showInputPane = false; 
      options = [];
      @Input() showOptionsMenu = false; 
      showList = true;
      
      constructor() {}

      ngOnInit() {

          if(!this.valueToken) {
              this.valueToken = '';
          }

        if ((this.showListItems) && (!this.suggestOnDemand)) {
            console.log(this.items);
            //this.options = this.items;
        } else {
            this.options = [];
        }

        console.log(this.options);

          this.valueControler.valueChanges.subscribe(token => {
              
              this.showList = true;
               this.valueToken = token;
              if (token.length <= this.searchSensitivity) {
                  if(this.suggestOnDemand) {
                    this.options = [];
                  } else if (this.showListItems) {
                      this.options = this.items;
                  }
                return; 
              }

              this.options = this.search(token,this.limit);
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
            this.items.forEach(function(a){
                if (a.startsWith(term)) {
                    results.push(a);
                } else {

                    let words = a.split(' ');
                    let startsWith = false;
                    words.forEach(function(word) {
                        if (word.startsWith(term)) {
                            startsWith = true;
                        }
                    }); 
                    if (startsWith) {
                        results.push(a)
                    }

                }

                //if (a.indexOf(term)>-1) results.push(a)
            });

            if (!limit && results.length == 0) {
                if (this.suggestOnDemand) {
                    return [];
                } else {
                    return this.items;
                }
                
            }

            if ((results.length < limit) || (!limit)) {
                return results;
            } else {
                return results.slice(0, limit);
            }
                
        };
  }