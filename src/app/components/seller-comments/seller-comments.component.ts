import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'seller-comments',
  templateUrl: './seller-comments.component.html',
  styleUrls: ['./seller-comments.component.scss']
})

export class SellerCommentsComponent {

    @Input() data; 

}