import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})

export class PagerComponent {

    @Input() activeStep = 1; 
    @Input() allowed; 

    _length: boolean;
    get length(): boolean {
        return this._length;
    }
    
    @Input('length')
    set length(value: boolean) {
        this._length = value;
        this.steps = Array(this.length);
    }
    
    @Output() selectedStep: EventEmitter<any> = new EventEmitter();

    steps;

    isAllowed(step) {
    
        if (this.allowed.indexOf(step) != -1) {
     
            return true;
        } else {
            return false;
        }
    }

}