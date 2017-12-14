import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'full-image-gallery',
  templateUrl: './full-image-gallery.component.html',
  styleUrls: ['./full-image-gallery.component.scss']
})

export class FullImageGallery {

    @Input() images; 
    @Input() index; 

    @Output() close: EventEmitter<any> = new EventEmitter();

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      let x = event.keyCode;
      if (x === 27) {
          this.close.emit();
      }
    }

    block(e) {
      e.stopPropagation();
    }
    
}
