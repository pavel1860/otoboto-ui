import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {ListViewComponent} from './components/list-view/list-view.component';
import {ChatbotComponent} from './components/chatbot/chatbot.component';
import {ChatbotMessageComponent} from './components/chatbot-message/chatbot-message.component';
import {ChatbotInputComponent} from './components/chatbot-input/chatbot-input.component';
import {FacebookLoginButtonComponent} from './components/facebook-login-button/facebook-login-button.component'

import {Chatbot} from './services/chatbot.service';

import {NisPipe}  from './pipes/nis.pipe';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import {MatIconModule} from '@angular/material';

import { FacebookModule } from 'ngx-facebook';

@NgModule({
  declarations: [
    AppComponent, 
    TopBarComponent,
    ListViewComponent,
    NisPipe,
    ChatbotComponent,
    ChatbotMessageComponent,
    ChatbotInputComponent,
    FacebookLoginButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule, 
    MdCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    FacebookModule.forRoot()
  ],
  providers: [
    Chatbot
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
