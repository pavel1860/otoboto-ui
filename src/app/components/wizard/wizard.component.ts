import { Component, Input, Output, EventEmitter, NgZone, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Locations } from '../../services/locations.service';

import 'rxjs/add/operator/switchMap';

import { Otoboto } from '../../services/otoboto.service';
import { DeviceService } from 'app/services/device.service';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  providers: [ Locations ],
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
    
    @Output() results: EventEmitter<any> = new EventEmitter();
    @Output() done: EventEmitter<any> = new EventEmitter();

    step: number = 1; 

    category; 
    city;
    price;
    manufacturer;
    model;
    allowedSteps = [1];

    next;

    steps;

    isMobile; 

    @Input() loading = false;

    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        private zone: NgZone,
        private api: Otoboto,
        private locations: Locations,
        private device: DeviceService
    ) {}

    ngOnInit() {

        this.isMobile = this.device.isMobile();

        this.route.queryParams.subscribe((params) => {
            if (params.step) {
                this.step = params.step;
            }
            this.category = params.category; 
            this.city = params.city;
            this.price = params.price; 
            this.model = params.model; 
            this.manufacturer = params.manufacturer; 
            this.updateWizardByCategory(params.category);
        });        
    }

    updateURI() {

        let descriptor = {
            step: this.step,
            category: this.category,
            city: this.city,
            price: this.price,
            manufacturer: this.manufacturer,
            model: this.model
        };

        this.router.navigate(['./welcome'], {
            queryParams: descriptor,
            queryParamsHandling: "merge"
        });

    }

    nextStep() {
        let value = this[this.steps[this.step-1].data];
        if (!value) {
            return; 
        }
        if (this.step < this.steps.length) {
            this.step++;
            this.allowedSteps.push(this.step); 
           
        } else {
            let descriptor = {
                category: this.category,
                city: this.city,
                price: this.price,
                manufacturer: this.manufacturer,
                model: this.model
            }; 
            this.router.navigate(['./welcome'], {
                queryParams: descriptor,
                queryParamsHandling: "merge"
            });
            setTimeout(() => {
                this.done.emit(descriptor);
            },0);
        }
    }

    updateWizardByCategory(category) {

      

        this.steps = [];

        this.steps.push({
            inputType: "carTypesSelector",
            caption: "איזה סוג רכב אתה מחפש?",
            continueButton: false,
            data: 'category'            
        });

        this.steps.push({
            inputType: "priceSelector",
            caption: "הכנס תקציב משוער בשקלים",
            continueButton: true,
            data: 'price'           
        });

        this.steps.push({
            inputType: "locationSelector", 
            caption: 'באיזה אזור אתה מחפש?',
            continueButton: true,
            data: 'city',
            icon: '../../assets/location-icon-color.svg',
            placeholder: 'חפש עיר'         
        });

        if (category == 'specific') {

            this.steps.splice(1, 0, {
                inputType: "carManufacturerSelector", 
                caption: 'בחר יצרן מתוך הרשימה',
                continueButton: true,
                data: 'manufacturer'     
            });

            this.steps.splice(2, 0, {        
                inputType: "carModelSelector", 
                caption: 'בחר דגם מתוך הרשימה',
                continueButton: true,
                data: 'model' 
            });   

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

    setLocation(city) {
        this.city = city.token;
    }

    isFilled(step) {
        let value = this[this.steps[step-1].data];
        if (value == undefined) {
            return false;
        }
        return true;         
    }

}