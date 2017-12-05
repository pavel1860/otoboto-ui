import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Models } from '../../services/models.service';

@Component({
  selector: 'car-manufacturer-selector',
  templateUrl: './car-manufacturer-selector.component.html',
  styleUrls: ['./car-manufacturer-selector.component.scss'],
  providers: [Models]
})

export class CarManufacturerSelector {
    
    @Input() initialValue = '';

    @Output() done: EventEmitter<any> = new EventEmitter();

    items = [];
    icon = '../../assets/location-icon-color.svg';
    placeholder = 'הכנס יצרן';
    
    constructor(private models: Models) {}

    ngOnInit() {

        this.models.getModels().subscribe(response => {
            this.items = response.map(item => {
                return item._id;
            });
        }); 

    }
  
}