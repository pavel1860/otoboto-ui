import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeviceService } from '../../services/device.service';

declare var Swipe:any;

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [ DeviceService ]
})

export class CardComponent {

    @Input() data; 
    @Input() allowLike = true; 

    @Output() like: EventEmitter<any> = new EventEmitter();
    @Output() dislike: EventEmitter<any> = new EventEmitter();
    @Output() expand: EventEmitter<any> = new EventEmitter();
    @Output() gallery: EventEmitter<any> = new EventEmitter();
    @Output() showContact: EventEmitter<any> = new EventEmitter();

    isMobile = true;
    showContactInfo = false;

    imageIndex = 0;
    showInfo = false; 
    carInfoSpec; 
    infoViewMode = 'sellerComments'; 

    swiperConfig = {            
      pagination: '.swiper-pagination',
      paginationClickable: true,
      spaceBetween: 0
    } 

    constructor(private device: DeviceService) {}

    ngOnInit() {

      this.isMobile = this.device.isMobile(); 

    }

    block(e) {
      e.stopPropagation(); 
    }

    imageIndexChange(e) {
      console.log(e);
    }



}
