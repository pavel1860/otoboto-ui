import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'image-swiper-gallery',
  templateUrl: './image-swiper-gallery.component.html',
  styleUrls: ['./image-swiper-gallery.component.css']
})

export class ImageSwiperGalleryComponent {
  
  @Input() images;
  @Input() index = 1; 

  @Output() close: EventEmitter<any> = new EventEmitter();
  
  ordered = [];

  swiperConfig; 

  constructor() {}

  ngOnInit() {

    this.swiperConfig = {            
                pagination: '.swiper-pagination',
                paginationClickable: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 0,
                initialSlide: this.index
            } 
            
            console.log(this.swiperConfig);
    
    this.ordered = []; 
    this.ordered.push(this.images[this.index]);

    this.images.forEach((element,index) => {
        if (index != this.index) {
            this.ordered.push(element); 
        } 
    });

  }

  block(e) {
      e.stopPropagation();
  }



}
 