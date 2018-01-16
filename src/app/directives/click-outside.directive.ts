import {Directive, ElementRef, Output, Input, EventEmitter, HostListener} from '@angular/core';
 
@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef : ElementRef) {
    }
 
    @Input('clickOutside') callback : any; 

    @Output() clickedOutside: EventEmitter<any> = new EventEmitter();
 
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickedOutside.emit(null);
        }
    }
}