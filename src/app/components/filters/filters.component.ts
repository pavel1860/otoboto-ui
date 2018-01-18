import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Otoboto } from '../../services/otoboto.service';
import { Config } from '../../services/config.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent {

    //_parameters;
    isGuest;

    /*
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
    */

    @Output() setFilter: EventEmitter<any> = new EventEmitter();

    filters;

    constructor(private api: Otoboto, private config: Config, private route: ActivatedRoute) {}

    ngOnInit() {

        this.route.queryParams.subscribe((params) => {

            if (params.isGuest) {
                this.setFilters(params);
            } else {
                this.refreshUserFilters();               
            }
        
        });           
    }

    refreshUserFilters() {
        this.api.getUserSearchParameters().subscribe(response => {
            let params = response.data.search_params;
            params.manufacturer = params.manufacturer ? params.manufacturer[0] : undefined;
            params.model = params.model ? params.model[0] : undefined;
            this.setFilters(params);
        });          
    }

    setFilters(parameters) {

        this.filters = [];

        if (parameters.category && !parameters.manufacturer) {

            this.filters.push({
                id: 'category',
                title: 'סוג הרכב',
                icon: "../assets/filter-car.svg",
                allowModify: false,
                value: this.config.CAR_TYPES.find(item => item.id == parameters.category).caption               
            });

        }

        if (parameters.price) {

            this.filters.push({
                id: 'price',
                title: 'תקציב',
                icon: "../../assets/filter-price.svg",
                allowModify: false,
                value: parameters.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")           
            });

        }        

        if (parameters.city) {

            this.filters.push({
                id: 'city',
                title: 'מיקום',
                icon: "../../assets/filter-location.svg",
                allowModify: false,
                value: parameters.city       
            });

        } 

        if (parameters.manufacturer) {

            this.filters.push({
                id: 'specific',
                title: parameters.manufacturer + ' ' + parameters.model,
                icon: "../assets/filter-car.svg",
                allowModify: false,
                value: parameters.manufacturer + ' ' + parameters.model       
            });

        }  



        /*
        if (parameters.radius) {

            this.filters.push({
                id: 'radius',
                title: 'מרחק ממך',
                icon: "../../assets/location-icon-color.svg",
                allowModify: true,
                value: parameters.radius     
            });

        } 
        */  


    }

}
