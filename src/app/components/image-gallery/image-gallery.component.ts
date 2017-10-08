import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})

export class ImageGalleryComponent {

  @Output() click: EventEmitter<any> = new EventEmitter();
  @Input() images;

}