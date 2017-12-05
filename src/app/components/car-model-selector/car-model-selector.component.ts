import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Models } from '../../services/models.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'car-model-selector',
  templateUrl: './car-model-selector.component.html',
  styleUrls: ['./car-model-selector.component.scss'],
  providers: [ Models ]
})

export class CarModelSelector {
    
    @Input() initialValue = '';
    @Input() manufacturer; 

    @Output() done: EventEmitter<any> = new EventEmitter();

    items = [];
    icon = '../../assets/location-icon-color.svg';
    placeholder = 'הכנס מודל';
    
    constructor(private models: Models) {}

    ngOnInit() {

        this.models.getModels().subscribe(response => {
            this.items = response.find(item => item._id == this.manufacturer).models.map(item => item.model);
        }); 

    }
  
}