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

      this.modelInfoSpec = [
          {
              title: 'מחיר מחירון',
              value: this.data.lead_price + ' ש״ח'
          },
          {
              title: 'גודל המיכל',
              value: this.data.gas_tank
          },
          {
              title: 'צריכת דלק ממוצעת',
              value: this.data.gas_avg
          },  
          {
              title: 'כוחות סוס',
              value: this.data.HP
          },     
          {
              title: 'סוג מנוע',
              value: this.data.engine_type
          },
          {
            title: 'משקל',
            value: this.data.weight + ' ק״ג'
          }                            
      ];   
  }

}