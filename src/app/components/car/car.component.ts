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

  rankSummary; 

  constructor() {}

  ngOnInit() {
      this.rankSummary = this.computeRankSummary(this.data.normalized_rank); 
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



}