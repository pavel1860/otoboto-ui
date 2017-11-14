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
        this.carInfoSpec = [
            {
                title: 'גיל הרכב',
                value: this.data.age >= 1 ? Number((this.data.age).toFixed(1)) + " שנים " : Number((this.data.age/10).toFixed(0)) + " חודשים "
            },
            {
                title: 'בעלות נוכחית',
                value: this.data.current_ownership
            },
            {
                title: 'בעלות קודמת',
                value: this.data.previous_ownership
            },  
            {
                title: 'תאריך תפוגת הטסט',
                value: this.data.test_expires
            },     
            {
                title: 'חודש עלייה לכביש',
                value: this.data.month_released
            }                          
        ];   
    }

}