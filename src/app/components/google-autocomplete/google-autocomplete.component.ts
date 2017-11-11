import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

declare var google: any;

@Component({
    selector: 'google-autocomplete',
    templateUrl: 'google-autocomplete.component.html', 
    styleUrls: ['google-autocomplete.style.css']
})

export class GoogleAutocompleteComponent {

    @ViewChild('input') input;

    @Input() value; 
    @Output() location: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {

        this.prepareAddressInput();

    }

    prepareAddressInput() {

        setTimeout(() => {

            var options = {
                types: ['(cities)'],
                componentRestrictions: {country: "IL"}
            };

            var input = document.getElementById('pac-input');

            var autocomplete = new google.maps.places.Autocomplete(input, options);
            autocomplete.addListener('place_changed', () => {
                var place = autocomplete.getPlace();
                place.token = input['value'];
                this.location.emit(place); 
            });  

        }, 0); 
 
    }

    focus() {
        setTimeout(() => this.input.nativeElement.focus(), 0); 
    }
}