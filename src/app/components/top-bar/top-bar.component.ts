import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent {

  @Output() tabSelected: EventEmitter<any> = new EventEmitter();

  tabs = [
    {
      id: 'favorite', 
      icon: 'favorite', 
      payload: 'favorites'
    }, 
    {
      id: 'search', 
      icon: 'search', 
      payload: 'car_search'
    }
  ] 

  constructor() {}  

  ngOnInit() {

  }







}
