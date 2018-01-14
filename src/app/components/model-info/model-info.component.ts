import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'model-info',
  templateUrl: './model-info.component.html',
  styleUrls: ['./model-info.component.scss']
})

export class ModelInfoComponent {

    @Input() data; 

    modelInfoSpec;

    ngOnInit() {

      this.modelInfoSpec = [];

      if (this.data.lead_price) {
          this.modelInfoSpec.push({
            title: 'מחיר מחירון',
            value: this.data.lead_price + ' ש״ח'              
          })
      }

      if (this.data.gas_tank) {
        this.modelInfoSpec.push({
            title: 'גודל המיכל',
            value: this.data.gas_tank             
        })
      }

      if (this.data.gas_avg) {
        this.modelInfoSpec.push({
            title: 'צריכת דלק ממוצעת',
            value: this.data.gas_avg          
        })
      }

      if (this.data.HP) {
        this.modelInfoSpec.push({
            title: 'כוחות סוס',
            value: this.data.HP        
        })
      }

      if (this.data.engine_type) {
        this.modelInfoSpec.push({
            title: 'סוג מנוע',
            value: this.data.engine_type 
        })
      }
      
      if (this.data.weight) {
        this.modelInfoSpec.push({
            title: 'משקל',
            value: this.data.weight + ' ק״ג'
        })
      }           

  }

}