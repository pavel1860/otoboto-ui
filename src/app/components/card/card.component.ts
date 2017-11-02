import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {

    @Input() data; 

    swiperConfig = {            
      pagination: '.swiper-pagination',
      paginationClickable: true,
      spaceBetween: 0
    } 
}
