import { Component, Input, Output, EventEmitter, NgZone, trigger, state, style, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'input-pane',
  templateUrl: './input-pane.component.html',
  styleUrls: ['./input-pane.component.scss'],
  animations: [
    trigger('divState', [
      transition('void => *', [
        animate(200, keyframes([
          style({opacity: 1, top: '100px', offset: 0}),
          style({opacity: 1, top: '30px', offset: 1})
        ]))
      ])
    ]) 
  ]  
})

export class InputPaneComponent {

    show; 

    @Output() clicked: EventEmitter<any> = new EventEmitter();

    open() {
        this.show = true; 
    }

    close() {
        this.show = false; 
    }

    block(e) {
        e.stopPropagation();
    }
}
