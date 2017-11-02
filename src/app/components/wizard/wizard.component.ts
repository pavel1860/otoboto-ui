import {Component, Input, Output, EventEmitter, NgZone, trigger, state, style, transition, animate, keyframes} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Otoboto } from '../../services/otoboto.service';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  animations: [
    trigger('divState', [
      state('in', style({backgroundColor: 'red',transform: 'translateX(0)'})),
      transition('void => *', [
        animate(2000, keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 0.5, offset: 0.3}),
          style({opacity: 1, offset: 1.0})
        ]))
      ])
    ])
  ]  
})

export class WizardComponent {

    showLocationPanel;
    
    @Output() done: EventEmitter<any> = new EventEmitter();

    step: number = 1; 

    type; 
    location;
    price;

    next;

    steps = [
        {
            inputType: "carTypesSelector",
            caption: "איזה סוג רכב אתה מחפש?",
            continueButton: false,
            data: 'type'
        }, 
        {
            inputType: "priceSelector",
            caption: "הכנס את התקציב",
            continueButton: true,
            data: 'price'
        },        
        {
            inputType: "locationSelector", 
            caption: 'באיזה אזור אתה מחפש?',
            continueButton: true,
            data: 'location'
        }
    ];

    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        private zone: NgZone,
        private api: Otoboto
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            if (params.step) {
                this.step = params.step;
            }
            this.type = params.type; 
            this.location = params.location;
            this.price = params.price; 
        });        
    }

    updateURI() {
        this.router.navigate(['./welcome'], {
            queryParams: {
                step: this.step,
                type: this.type,
                location: this.location,
                price: this.price
        }});
    }

    nextStep() {
        let value = this[this.steps[this.step-1].data];
        if (!value) {
            return; 
        }
        if (this.step < this.steps.length) {
            this.step++; 
        } else {
            this.zone.run(() =>  
                this.router.navigate(['./results'],{queryParams : {
                    type: this.type,
                    location: this.location,
                    price: this.price,
                    prepared: true
                }})
            );
        }
    }

    goToStep(step) {
        for (let index = 1; index < step; index++) {
            let value = this[this.steps[index-1].data];
            if (value == undefined) {
                return;
            }
        }
        this.step = step; 
        this.updateURI(); 
    }

    setLocation(location) {
        this.location = location.token;
    }

    isFilled(step) {
        let value = this[this.steps[step-1].data];
        if (value == undefined) {
            return false;
        }
        return true;         
    }

    prepareData(type, price) {
        this.api.prepareData(type, price).subscribe(response => {
            this.next = response['next']; 
        });
    }
    
}