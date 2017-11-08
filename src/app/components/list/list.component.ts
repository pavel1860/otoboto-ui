import {Component, Input, Output, EventEmitter, trigger, state, style, transition, animate, keyframes} from '@angular/core';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('divState', [
      transition('* => void', [
        animate(500, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ])
  ]  
})

export class ListComponent {

    _items; 

    @Input() set items(items: any) {
      console.log(items);
      this._items = items;  
      this.hasNewData = false; 
    } 

    get items(): any { 
      return this._items; 
    } 

    @Output() like: EventEmitter<any> = new EventEmitter();
    @Output() dislike: EventEmitter<any> = new EventEmitter();  
    
    @Output() loadMore: EventEmitter<any> = new EventEmitter();  

    itemsLimit = 10; 
    hasNewData = false;

    onScroll() {

      this.itemsLimit += 10; 

      if (this.itemsLimit > this.items.length-20) {
        if (!this.hasNewData) {
          this.loadMore.emit();
          this.hasNewData = true; 
        }
      }

    }

    reset() {
      this.itemsLimit = 10;
    }

}
