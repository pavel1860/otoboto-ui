import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-details',
  templateUrl: './main-details.component.html',
  styleUrls: ['./main-details.component.scss']
})

export class MainDetailsComponent {

    @Input() data; 

    normalizedRank;

    ngOnInit() {
      this.normalizedRank = Math.round(this.data.rank * 10) / 10;
    }
    
}
