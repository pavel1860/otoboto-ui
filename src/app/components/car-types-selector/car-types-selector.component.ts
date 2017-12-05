import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'car-types-selector',
  templateUrl: './car-types-selector.component.html',
  styleUrls: ['./car-types-selector.component.scss']
})

export class CarTypeSelectorComponent {

    @Output() selected: EventEmitter<any> = new EventEmitter();

    options = [
        {
            id: 'mini', 
            caption: 'קטן',
            icon: '../assets/car-type-icon-mini.svg'
        }, 
        {
            id: 'family', 
            caption: 'משפחתי',
            icon: '../assets/car-type-icon-family.svg'
        }, 
        {
            id: 'sport', 
            caption: 'ספורט',
            icon: '../assets/car-type-icon-sport.svg'
        }, 
        {
            id: 'land',
            caption: 'שטח',
            icon: '../assets/car-type-icon-jeep.svg'
        }, 
        {
            id: 'executive',
            caption: 'מנהלים',
            icon: '../assets/car-type-icon-executive.svg'
        }, 
        {
            id: 'specific',
            caption: 'דגם ספציפי',
            icon: '',
            type: 'system'
        }                               
    ]

}