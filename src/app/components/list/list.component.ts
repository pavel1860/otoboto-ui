import {Component, Input, Output, EventEmitter, ViewChildren, HostListener, QueryList, trigger, state, style, transition, animate, keyframes} from '@angular/core';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {

    _items;
    hasNewData = false; 
    collapseAll = true;
    loading = false;
    endOfData = false; 
    
    @ViewChildren('element') listItem: QueryList<any>;

    @Input() set items(items: any) {
      this.loading = false;
      this._items = items;  
      this.hasNewData = false; 
    } 

    @Input() hidden; 
    @Input() allowLike = true; 

    @Input() pager = false; 
    pagerIndex = 10;

    get items(): any { 
      return this._items; 
    }

    @Output() like: EventEmitter<any> = new EventEmitter();
    @Output() dislike: EventEmitter<any> = new EventEmitter(); 
    @Output() ready: EventEmitter<any> = new EventEmitter();
    @Output() loadMore: EventEmitter<any> = new EventEmitter();
    @Output() gallery: EventEmitter<any> = new EventEmitter();
    @Output() showContact: EventEmitter<any> = new EventEmitter();
    
    ngAfterViewInit() {
      if (this.items.length == 0) {
        this.ready.emit();
      }
      this.listItem.changes.subscribe(t => {
        this.ready.emit();
        if (t.length == 0) {
          this.loadMoreData();
        }
      }); 
    }

    isHidden(item, index) {

      if (this.pager) {
        if (index > this.pagerIndex) {
          return true; 
        }
      }
      return this.hidden.findIndex(id => id == item.car_document_id) != -1; 

    }

    loadMoreData() {

      if (this.pager) {
        if (this.pagerIndex < this.items.length - 1) {
          this.pagerIndex += 10;
        } 
        return; 
      }

      if (!this.hasNewData && !this.endOfData) {
        this.loading = true; 
        this.loadMore.emit();
        this.hasNewData = true; 
      }

    }

    close() {
      this.endOfData = true; 
      this.loading = false;
    }

    open() {
      this.endOfData = false;
    }

}
