import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})

export class ImageGalleryComponent {

    @Input() images; 
    @Input() index = 0;
    @Input() autoCrop = true;

    @Output() indexChange: EventEmitter<any> = new EventEmitter();
    @Output() imageClick: EventEmitter<any> = new EventEmitter();
    
    swiperConfig = {            
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0
    } 

    ngOnInit() {
        if (this.images.length > 1) {
            this.swiperConfig['nextButton'] = '.swiper-button-next';
            this.swiperConfig['prevButton'] = '.swiper-button-prev';
        }
    }
    
}
