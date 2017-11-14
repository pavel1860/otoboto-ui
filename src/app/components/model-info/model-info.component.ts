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
        
    }

}