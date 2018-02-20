import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})

export class ContactModalComponent {
    
    isActive = false;
    data;
    
    constructor() {}

    ngOnInit() {



    }

    open(data) {
        this.isActive = true;
        this.data = data;
        console.log(data);
    }

    close() {
        this.isActive = false;
    }
    
    block(e) {
      e.stopPropagation(); 
    }  



}