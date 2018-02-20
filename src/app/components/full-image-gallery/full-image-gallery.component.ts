import { Component, Input, Output, EventEmitter, HostListener, trigger, state, style, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'full-image-gallery',
  templateUrl: './full-image-gallery.component.html',
  styleUrls: ['./full-image-gallery.component.scss'], 
  animations: [
    trigger('divState', [
      transition('void => *', [
        animate(150, keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 1, offset: 1.0})
        ]))
      ]), 
      transition('* => void', [
        animate(150, keyframes([
          style({opacity: 1, offset: 0}),
          style({opacity: 0, offset: 1.0})
        ]))
      ])
    ])
  ]  
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
