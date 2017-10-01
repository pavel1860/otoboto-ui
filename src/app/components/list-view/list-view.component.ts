import {Component, Input} from '@angular/core';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})

export class ListViewComponent {
  
  @Input() items;

  constructor() {}

  ngOnInit() {
    this.items = [
        {
            static_rank: 8.5,
            manufacturer: 'מאזדה', 
            model: 'לאנטיס',
            year: '2010',
            sub_model: 'טורבו 5 דלתות קלאסיק',
            hand: '3',
            km: 50000,
            city: 'אשקלון',
            price: 50000,
            web_pics: [
                'http://images.car.bauercdn.com/pagefiles/72609/mclaren-720s-01.jpg'
            ]
        },
        {
            static_rank: 8.5,
            manufacturer: 'מאזדה', 
            model: 'לאנטיס',
            year: '2010',
            sub_model: 'טורבו 5 דלתות קלאסיק',
            hand: '3',
            km: 50000,
            city: 'אשקלון',
            price: 50000,
            web_pics: [
                'http://images.car.bauercdn.com/pagefiles/72609/mclaren-720s-01.jpg'
            ]
        },
        {
            static_rank: 8.5,
            manufacturer: 'מאזדה', 
            model: 'לאנטיס',
            year: '2010',
            sub_model: 'טורבו 5 דלתות קלאסיק',
            hand: '3',
            km: 50000,
            city: 'אשקלון',
            price: 50000,
            web_pics: [
                'http://images.car.bauercdn.com/pagefiles/72609/mclaren-720s-01.jpg'
            ]
        }     
    ];
  }

}
 