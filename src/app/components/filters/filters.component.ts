import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Otoboto } from '../../services/otoboto.service';
import { Config } from '../../services/config.service';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent {

    _parameters;
    get parameters() {
        return this._parameters;
    }
    
    @Input('parameters')
    set parameters(value) {
        this._parameters = value || undefined;
        if (this._parameters) {
            this.setFilters();
        }
    }

    @Output() setFilter: EventEmitter<any> = new EventEmitter();

    filters;

    constructor(private otoboto: Otoboto, private config: Config) {}

    setFilters() {

        this.filters = [];

        if (this.parameters.category) {

            this.filters.push({
                id: 'category',
                title: 'סוג הרכב',
                icon: "../assets/car-type-icon-mini.svg",
                allowModify: true,
                value: this.config.CAR_TYPES.find(item => item.id == this.parameters.category).caption               
            });

        }

        if (this.parameters.price) {

            this.filters.push({
                id: 'price',
                title: 'תקציב',
                icon: "../../assets/price-icon-color.svg",
                allowModify: true,
                value: this.parameters.price          
            });

        }        

        if (this.parameters.city) {

            this.filters.push({
                id: 'city',
                title: 'מיקום',
                icon: "../../assets/location-icon-color.svg",
                allowModify: true,
                value: this.parameters.city       
            });

        }   

        if (this.parameters.radius) {

            this.filters.push({
                id: 'radius',
                title: 'מרחק ממך',
                icon: "../../assets/location-icon-color.svg",
                allowModify: true,
                value: this.parameters.radius     
            });

        }   

        console.log(this.filters);

    }

}
