import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Chatbot } from './services/chatbot.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    Chatbot
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
