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
                this.api.getUserSearchParameters().subscribe(response => {
                    this.setFilters(response.data.search_params);
                });                
            }
        
        });           
    }

    setFilters(parameters) {

        this.filters = [];

        if (parameters.category) {

            this.filters.push({
                id: 'category',
                title: 'סוג הרכב',
                icon: "../assets/filter-car.svg",
                allowModify: true,
                value: this.config.CAR_TYPES.find(item => item.id == parameters.category).caption               
            });

        }

        if (parameters.price) {

            this.filters.push({
                id: 'price',
                title: 'תקציב',
                icon: "../../assets/filter-price.svg",
                allowModify: true,
                value: parameters.price          
            });

        }        

        if (parameters.city) {

            this.filters.push({
                id: 'city',
                title: 'מיקום',
                icon: "../../assets/filter-location.svg",
                allowModify: true,
                value: parameters.city       
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

        console.log(this.filters);

    }

}
