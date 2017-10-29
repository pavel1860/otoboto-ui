import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})

export class PagerComponent {

    @Input() activeStep = 1; 
    @Input() length; 
    @Output() selectedStep: EventEmitter<any> = new EventEmitter();

    steps;

    ngOnInit() {
        this.steps = Array(this.length);
    }

}