import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'full-image-gallery',
  templateUrl: './full-image-gallery.component.html',
  styleUrls: ['./full-image-gallery.component.scss']
})

export class FullImageGallery {

    @Input() images; 
    @Input() index; 

    @Output() close: EventEmitter<any> = new EventEmitter();

    block(e) {
      e.stopPropagation();
    }
    
}
