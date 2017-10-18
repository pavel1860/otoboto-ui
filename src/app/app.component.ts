import {Component, ViewChild} from '@angular/core';
import {Chatbot} from './services/chatbot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  message;
  results = []; 
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

    console.log(message);

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

  renderList(newList) {

    /*
    let newListIds = newList.map(item => item.fields.car_document_id.$oid); 

    // remove item which is missing from the new list
    for (let index = this.results.length - 1; index >= 0; index--) {
      let id = this.results[index].car_document_id.$oid;
      if (newListIds.indexOf(id) == -1) {
        this.results.splice(index,1);
      }
    }

    // add item which is missing from the old list
    let oldListIds = newList.map(item => item.fields.car_document_id.$oid);
    for (let index = newList.length - 1; index >= 0; index--) {
      let id = newList[index].fields.car_document_id.$oid;
      if (oldListIds.indexOf(id) == -1) {
        this.results.push(newList[index]);
      }
    }   
    */ 


      
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
