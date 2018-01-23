import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'main-details',
  templateUrl: './main-details.component.html',
  styleUrls: ['./main-details.component.scss']
})

export class MainDetailsComponent {

    @Input() data; 
    @Input() expanded = false; 

    @Output() showContact: EventEmitter<any> = new EventEmitter();

    normalizedRank;
    properties; 
    showPhoneNumber = false;

    ngOnInit() {
      this.normalizedRank = Math.round(this.data.rank * 10) / 10;

      this.properties = [
        {
          caption: 'יד ' + this.data.hand,
          icon: '../../../assets/hand.svg'
        }, 
        {
          caption: this.data.km/1000 + ' אלף ק״מ',
          icon: '../../../assets/km.svg'
        }, 
        {
          caption: 'אוטומטי',
          icon: '../../../assets/gear.svg'
        }, 
        {
          caption: '1500 סמ״ק',
          icon: '../../../assets/volume.svg'
        }                        
      ]
    }

    block(e) {
      e.stopPropagation(); 
    }
    
}
