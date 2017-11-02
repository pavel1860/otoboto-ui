import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'price-selector',
  templateUrl: './price-selector.component.html',
  styleUrls: ['./price-selector.component.scss']
})

export class PriceSelectorComponent {

    @Input() valueToken = '';
    @Output() done: EventEmitter<any> = new EventEmitter();

    valueControler = new FormControl();
    value; 
    
    ngOnInit() {
        if(!this.valueToken) {
            this.valueToken = '';
        }
        this.valueControler.valueChanges.subscribe(token => {
                let stripped = token.replace(/\₪|,/g, '');
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


}