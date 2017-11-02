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
        nextButton: '.swiper-button-prev.swiper-button-white',
        prevButton: '.swiper-button-prev',
        spaceBetween: 0
    } 

    

}
