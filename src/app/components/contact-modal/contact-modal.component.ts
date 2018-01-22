import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})

export class ContactModalComponent {
    
    isActive = false;
    
    constructor() {}

    ngOnInit() {



    }

    open(data) {
        this.isActive = true;
        console.log(data);
    }
  
}