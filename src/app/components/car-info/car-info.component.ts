import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss']
})

export class CarInfoComponent {

    @Input() data; 

    carInfoSpec;

    ngOnInit() {
        this.carInfoSpec = [];

        if (this.data.age) {
            this.carInfoSpec.push({
                title: 'גיל הרכב',
                value: this.data.age >= 1 ? Number((this.data.age).toFixed(1)) + " שנים " : Number((this.data.age/10).toFixed(0)) + " חודשים "                
            })
        }

        if (this.data.current_ownership) {
            this.carInfoSpec.push({
                title: 'בעלות נוכחית',
                value: this.data.current_ownership              
            })
        }

        if (this.data.previous_ownership) {
            this.carInfoSpec.push({
                title: 'בעלות קודמת',
                value: this.data.previous_ownership           
            })
        }
        
        if (this.data.test_expires) {
            this.carInfoSpec.push({
                title: 'תאריך תפוגת הטסט',
                value: this.data.test_expires       
            })
        }    

    }

}