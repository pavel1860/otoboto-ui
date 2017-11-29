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
/*
    @HostListener('window:scroll', ['$event']) onScrollEvent($event){
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 900) {
        this.loadMoreData();
      }     
    } 
*/
    @ViewChildren('element') listItem: QueryList<any>;

    @Input() set items(items: any) {
      this.loading = false;
      this._items = items;  
      this.hasNewData = false; 
    } 

    @Input() hidden; 
    @Input() allowLike = true; 

    get items(): any { 
      return this._items; 
    }

    @Output() like: EventEmitter<any> = new EventEmitter();
    @Output() dislike: EventEmitter<any> = new EventEmitter(); 
    @Output() ready: EventEmitter<any> = new EventEmitter();
    @Output() loadMore: EventEmitter<any> = new EventEmitter();

    ngAfterViewInit() {
      if (this.items.length == 0) {
        this.ready.emit();
      }
      this.listItem.changes.subscribe(t => {
        this.ready.emit();
        if (t.length == 0) {
          this.loadMoreData();
        }
      })
    }

    isHidden(item) {
      let index = this.hidden.findIndex(id => id == item.car_document_id);
      return index != -1; 
    }

    loadMoreData() {
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

    /*
     reachedEndOfData = false; 
     loading; 
     collapseAll = true; 
     hasNewData = false;
    _items; 

    page = 0;

    @HostListener('window:scroll', ['$event']) onScrollEvent($event){
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 900) {
        this.loadMoreData();
      }     
    } 

    @ViewChildren('element') things: QueryList<any>;

    @Input() set items(items: any) {
      this._items = items;  
      this.hasNewData = false; 
      this.page++;
    } 

    @Input() disableLike = false; 

    get items(): any { 
      return this._items; 
    } 

    @Input() hidden = []; 

    @Output() like: EventEmitter<any> = new EventEmitter();
    @Output() dislike: EventEmitter<any> = new EventEmitter();  
    @Output() loadMore: EventEmitter<any> = new EventEmitter();  
    @Output() ready: EventEmitter<any> = new EventEmitter();  
    
    ngOnInit() {
      //this.loadMoreData();
    }

    ngAfterViewInit() {

      if (this.items.length == 0) {
        this.loading = false;
        this.ready.emit();
      }
      this.things.changes.subscribe(t => {
        if ((t.length < 5) && (!this.reachedEndOfData)) {
          this.loading = true;
          this.loadMoreData();
        }
        this.ready.emit();
      })
    }

    onScroll() {

      if (this.reachedEndOfData) {
        this.loading = false; 
        return; 
      }
      this.loading = true;

    }

    loadMoreData() {
      if (!this.hasNewData) {
        this.loadMore.emit(this.page);
        this.hasNewData = true; 
      }
    }

    reset() {
      this.collapseAll = true; 
      this.reachedEndOfData = false; 
      this.page = 0;
    }

    isHidden(item) {
      let index = this.hidden.findIndex(id => id == item.car_document_id.$oid);
      return index != -1; 
    }

    endOfData() {
      this.reachedEndOfData = true; 
    }

    */

}
