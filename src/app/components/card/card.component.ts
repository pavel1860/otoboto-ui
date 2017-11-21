import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [ DeviceService ]
})

export class CardComponent {

    @Input() data; 

    @Output() like: EventEmitter<any> = new EventEmitter();
    @Output() dislike: EventEmitter<any> = new EventEmitter();
    @Output() expand: EventEmitter<any> = new EventEmitter();

    isMobile = true;

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

      this.computePostDate(); 

      console.log(this.carInfoSpec);
    }

    computePostDate() {
      if (!this.data.date_created) {
        return; 
      }
      let dateParts = this.data.date_created.split(' '); 
      let date = dateParts[0];
      let time = dateParts[1];
      let dateArray = date.split('-').map(item => {return parseInt(item)});
      let timeArray = time.split(':').map(item => {return parseInt(item)});
      let computedDate = new Date(dateArray[2], dateArray[1], dateArray[0], timeArray[0], timeArray[1], 0, 0);
      //let timestamp = DcomputedDate.getMilliseconds - 
      
      
    }

    block(e) {
      e.stopPropagation(); 
    }



}
