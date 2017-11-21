import { Component, Input } from '@angular/core';

@Component({
  selector: 'image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})

export class ImageGalleryComponent {

    @Input() images; 

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
