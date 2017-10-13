import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Chatbot} from '../../services/chatbot.service';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})

export class ListViewComponent {
  
  @Input() items;
  @Output() action: EventEmitter<any> = new EventEmitter();
  @Output() openGallery: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {

  }



}
 