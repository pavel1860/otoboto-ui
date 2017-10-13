import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent {
  
  @Input() data;
  @Input() actions;
  
  @Output() action: EventEmitter<any> = new EventEmitter();
  @Output() showImages: EventEmitter<any> = new EventEmitter();
  @Output() openGallery: EventEmitter<any> = new EventEmitter();

  properties;
  rankSummary; 
  gearTypeCaption; 
  handCaption; 
  milageCaption;
  volumeCaption;

  handToken = 'יד'; 

  handCaptionPrefix = [
      'ראשונה', 
      'שנייה', 
      'שלישית',
      'רביעית',
      'חמישית',
      'שישית',
      'שביעית'
  ]; 

  gearTypeHebrewTokens = {
    'automatic': 'אוטומטי', 
    'manual': 'ידני'
  };

  milageUnitToken = 'ק״מ';
  milageUnitTokenExtension = 'אלף';
  volumeUnitToken = 'סמ״ק';  

  swiperConfig = {            
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-prev.swiper-button-white',
            prevButton: '.swiper-button-prev',
            spaceBetween: 0
        } 

  constructor() {}

  ngOnInit() {

      this.rankSummary = this.computeRankSummary(this.data.static_rank); 
      this.handCaption = this.handToken + ' ' + this.handCaptionPrefix[this.data.hand - 1];
      this.gearTypeCaption = this.gearTypeHebrewTokens[this.data.gear]; 

      let milageCountWithCommas = this.data.km.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      if (this.data >= 10000) {
          this.milageCaption = milageCountWithCommas + ' ' + this.milageUnitToken;
      } else {
          this.milageCaption = milageCountWithCommas.substring(0, 2) + ' ' + this.milageUnitTokenExtension + ' ' + this.milageUnitToken;
      }

      this.volumeCaption = this.data.engin_capacity + ' ' + this.volumeUnitToken; 
        
      console.log(this.data); 
      this.properties = [
          {
              caption: 'יד',
              value: this.data.hand,
              icon: 'pan_tool'
          },
          {
              caption: 'קילומטרים',
              value: this.data.km,
              icon: 'network_check'
          }            
      ] 
      
  
  }

  computeRankSummary(rank) {
    if (rank <= 5) {
        return 'unrecommended'; 
    } else if (rank > 5 && rank < 7) {
        return 'neutral';
    } else {
        return 'recommended';
    }
  }

    showGallery(index, images) {
        this.openGallery.emit({initialIndex: index, images: images});
    }



}