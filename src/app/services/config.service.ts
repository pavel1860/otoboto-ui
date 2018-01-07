import { Injectable } from '@angular/core';

@Injectable()
export class Config {

    CAR_TYPES = [
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
            icon: '../assets/specific-model.svg',
            type: 'system',
            width: '50px'         
        }
    ];


}