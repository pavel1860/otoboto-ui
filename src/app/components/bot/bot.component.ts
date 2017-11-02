import { Component, Input } from '@angular/core';

@Component({
  selector: 'bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class BotComponent {

  width = window.screen.width;

  onResize(event){
    this.width = event.target.innerWidth;
  }
}
