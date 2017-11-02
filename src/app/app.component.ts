import { Component } from '@angular/core';
import { Bot } from './services/bot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private bot: Bot) {}

  ngOnInit() {
    this.bot.getMessages().subscribe(message => {
      console.log(message);
    });
  }


}
