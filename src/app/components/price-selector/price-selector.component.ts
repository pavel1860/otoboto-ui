import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'price-selector',
  templateUrl: './price-selector.component.html',
  styleUrls: ['./price-selector.component.scss']
})

export class PriceSelectorComponent {

    @ViewChild('inputPane') inputPane;
    @ViewChild('input') input;

    @Output() done: EventEmitter<any> = new EventEmitter();

    _valueToken;
    get valueToken() {
        return this._valueToken;
    }
    
    @Input('valueToken')
    set valueToken(value) {
        if (!value) {
            this._valueToken = '';
        } else {
            this._valueToken = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
    }

    valueControler = new FormControl();
    value; 
    showInputPane = false; 
    
    ngOnInit() {
        if (this.valueToken){
            this.value = parseInt(this.valueToken.toString().replace(/\₪|,/g, ''));
        }
        if(!this.valueToken) {
            this.valueToken = '';
        }
        this.valueControler.valueChanges.subscribe(token => {
            //this.value = token;
            //this.valueToken = token.toString();

                let stripped = token.toString().replace(/\₪|,/g, '');
                if (isNaN(stripped)) {
                    this.valueToken = '';
                } else {
                    let as_num = parseInt(stripped);
                    if (isNaN(as_num)) {
                        this.valueToken = '';
                    } else {
                        this.valueToken = as_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        this.value = as_num;
                    }
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



}