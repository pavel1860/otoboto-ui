import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'main-details',
  templateUrl: './main-details.component.html',
  styleUrls: ['./main-details.component.scss']
})

export class MainDetailsComponent {

    @Input() data; 
    @Output() like: EventEmitter<any> = new EventEmitter();
    @Output() dislike: EventEmitter<any> = new EventEmitter();

    normalizedRank;

    ngOnInit() {
      this.normalizedRank = Math.round(this.data.rank * 10) / 10;
    }
    
}
