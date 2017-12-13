import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Otoboto } from '../../services/otoboto.service';
import { Config } from '../../services/config.service';

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

        category: {
            id: 'category',
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

        city: {
            id: 'city',
            title: 'מיקום',
            icon: "../../assets/location-icon-color.svg",
            allowModify: true
        },

        radius: {
            id: 'radius',
            title: 'מרחק ממך',
            icon: "../../assets/location-icon-color.svg",
            allowModify: true
        }

    }

    constructor(private otoboto: Otoboto, private config: Config) {}

    setFilters() {

        this.filters = Object.keys(this.parameters).map(parameter => {

            let value = this.parameters[parameter];
            if (!value) {
                return;
            }
            if (Array.isArray(value)) {
                value = value[0];
            }
            let filter = this.FILTERS_MAP[parameter]; 
            if (!filter) {
                return;
            }

            filter.value = value; 
            return filter; 
        });

        this.filters = this.filters.filter(item => item != undefined);

        console.log(this.filters); 

    }

}
