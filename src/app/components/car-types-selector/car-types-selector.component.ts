import { Component, Output, EventEmitter } from '@angular/core';
import { Config } from '../../services/config.service';

@Component({
  selector: 'car-types-selector',
  templateUrl: './car-types-selector.component.html',
  styleUrls: ['./car-types-selector.component.scss']
})

export class CarTypeSelectorComponent {

    @Output() selected: EventEmitter<any> = new EventEmitter();

    options;

    constructor(private config: Config) {

        this.options = config.CAR_TYPES;

    }
    
}