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
    properties; 

    ngOnInit() {
      this.normalizedRank = Math.round(this.data.rank * 10) / 10;

      this.properties = [
        {
          caption: 'יד ' + this.data.hand,
          icon: '../../../assets/property-speed.svg'
        }, 
        {
          caption: this.data.km/1000 + ' אלף ק״מ',
          icon: '../../../assets/property-speed.svg'
        }, 
        {
          caption: 'אוטומטי',
          icon: '../../../assets/property-speed.svg'
        }, 
        {
          caption: '1500 סמ״ק',
          icon: '../../../assets/property-speed.svg'
        }                        
      ]
    }
    
}
