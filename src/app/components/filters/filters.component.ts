import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Otoboto } from '../../services/otoboto.service';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent {

    _parameters = [];
    get parameters() {
        return this._parameters;
    }
    
    @Input('parameters')
    set parameters(value) {
        this._parameters = value || [];
        this.setFilters();
    }

    filters; 

    FILTERS_MAP = {

        carType: {
            id: 'carType',
            title: 'סוג הרכב',
            icon: "../assets/car-type-icon-mini.svg",
            allowModify: false
        },

        price: {
            id: 'price',
            title: 'תקציב',
            icon: "../../assets/price-icon-color.svg",
            allowModify: true
        },

        location: {
            id: 'location',
            title: 'מיקום',
            icon: "../../assets/location-icon-color.svg",
            allowModify: true
        }

    }

    constructor(private otoboto: Otoboto) {}

    setFilters() {

        this.filters = this.parameters.map(parameter => {
            let filter = this.FILTERS_MAP[parameter.type]; 
            filter.value = parameter.value; 
            return filter; 
        });

    }

}
