import {Component, Input, Output, EventEmitter, ViewChildren, QueryList, trigger, state, style, transition, animate, keyframes} from '@angular/core';

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

     loading; 
    _items; 

    @ViewChildren('element') things: QueryList<any>;

    @Input() set items(items: any) {
      
      this.loading = true; 
      this._items = items;  
      this.hasNewData = false; 
      console.log('hey');
    } 

    get items(): any { 
      return this._items; 
    } 

    @Input() hidden = []; 

    @Output() like: EventEmitter<any> = new EventEmitter();
    @Output() dislike: EventEmitter<any> = new EventEmitter();  
    
    @Output() loadMore: EventEmitter<any> = new EventEmitter();  
    @Output() ready: EventEmitter<any> = new EventEmitter();  
    

    itemsLimit = 16; 
    hasNewData = false;

    ngOnInit() {
      console.log('ready');
    }

    ngOnChanges(a) {
; 
    }

    ngAfterViewChecked(a) {

    }

    ngAfterViewInit() {
      this.ready.emit();
      this.things.changes.subscribe(t => {
        this.ready.emit();
      })
    }

    //ngAfterContentChecked() {
    //  console.log('done2');
    //}

    onScroll() {

      this.itemsLimit += 16; 

      if (this.itemsLimit > this.items.length-20) {
        if (!this.hasNewData) {
          this.loadMore.emit();
          this.hasNewData = true; 
        }
      }

    }

    reset() {
      this.itemsLimit = 16;
    }

    isHidden(item) {
      let index = this.hidden.findIndex(id => id == item.car_document_id.$oid);
      
      if (index!=-1) {

      }
      return index != -1; 
    }

    hide(items) {
      this.hidden = this.hidden.concat(items);

    }

}
