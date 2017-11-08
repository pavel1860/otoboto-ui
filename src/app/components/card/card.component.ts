import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {

    @Input() data; 

    @Output() like: EventEmitter<any> = new EventEmitter();
    @Output() dislike: EventEmitter<any> = new EventEmitter();

    swiperConfig = {            
      pagination: '.swiper-pagination',
      paginationClickable: true,
      spaceBetween: 0
    } 
}
