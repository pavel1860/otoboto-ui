import {Component, ViewChild} from '@angular/core';
import {Chatbot} from './services/chatbot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  message;
  results; 
  displayMode; 
  mode; 
  showGallery = false; 

  images;
  imageInitialIndex; 
  
  @ViewChild('chatbot') chatbot;

  constructor(private chatbotService: Chatbot) {}

  ngOnInit() {
    this.chatbotService.getMessages().subscribe(message => {
      this.execute(message); 
    });
  }

  execute(message) {

    this.setDisplay(message); 

    switch (message.code) {
      case "say":
        this.message = message.speach; 
        this.mode = message.mode;
        break;
      case "typing": 
        this.chatbot.activateTypingMode(); 
        break;
      case "queryResults": 
        this.mode = message.mode;
        this.results = message.items;
        break;
    }

  }

  sendAction(action) {
    this.chatbotService.sendMessage(action);
  }

  setDisplay(data) {
    this.displayMode = data.mode; 
  }

  openGallery(data) {
    this.images = data.images; 
    this.imageInitialIndex = data.initialIndex; 
    this.showGallery = true; 
    console.log(this.imageInitialIndex);
  }
  
}
