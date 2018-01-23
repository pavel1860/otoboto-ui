import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})

export class SectionTitleComponent {

    @Input() icon; 
    @Input() title; 
    @Input() active; 

}