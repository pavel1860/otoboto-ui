import {Component, Input, Output, EventEmitter, trigger, state, style, transition, animate, keyframes} from '@angular/core';
import {Chatbot} from '../../services/chatbot.service';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
  animations: [
    trigger('divState', [
      state('in', style({backgroundColor: 'red',transform: 'translateX(0)'})),

      transition('void => *', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ])
  ]  
})

export class ListViewComponent {
  
  @Input() items;
  @Input() itemsToShow;
  @Output() action: EventEmitter<any> = new EventEmitter();
  @Output() openGallery: EventEmitter<any> = new EventEmitter();

  state = 'normal';
  wildState = 'normal';

  itemsLimit = 10;

  constructor() {}

  ngOnInit() {

  }

  onScroll() {
    this.itemsLimit += 10;
  }

  onAnimate(){
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal'
  }

  onShrink(){
      this.wildState == 'normal' ? this.wildState = 'shrunk' : this.wildState = 'normal'
  } 
  
  removeFromList(index) {
    this.items.splice(index, 1);
  }

}
 