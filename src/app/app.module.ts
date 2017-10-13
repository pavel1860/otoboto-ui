import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {ListViewComponent} from './components/list-view/list-view.component';
import {ChatbotComponent} from './components/chatbot/chatbot.component';
import {ChatbotMessageComponent} from './components/chatbot-message/chatbot-message.component';
import {ChatbotInputComponent} from './components/chatbot-input/chatbot-input.component';
import {FacebookLoginButtonComponent} from './components/facebook-login-button/facebook-login-button.component'
import {CarComponent} from './components/car/car.component';
import {ImageGalleryComponent} from './components/image-gallery/image-gallery.component';
import {ChatbotFullLayoutComponent} from './components/chatbot-full-layout/chatbot-full-layout.component'; 
import {BotAvatarComponent} from './components/bot-avatar/bot-avatar.component'; 
import {ImageSwiperGalleryComponent} from './components/image-swiper-gallery/image-swiper-gallery.component'; 

import {Chatbot} from './services/chatbot.service';

import {NisPipe}  from './pipes/nis.pipe';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import {MatIconModule} from '@angular/material';

import { FacebookModule } from 'ngx-facebook';

import { SwiperModule } from 'angular2-swiper-wrapper';
import { SwiperConfigInterface } from 'angular2-swiper-wrapper';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true
};

@NgModule({
  declarations: [
    AppComponent, 
    TopBarComponent,
    ListViewComponent,
    NisPipe,
    ChatbotComponent,
    ChatbotMessageComponent,
    ChatbotInputComponent,
    FacebookLoginButtonComponent,
    CarComponent,
    ImageGalleryComponent,
    ChatbotFullLayoutComponent,
    BotAvatarComponent,
    ImageSwiperGalleryComponent
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
    SwiperModule,
    FacebookModule.forRoot(),
    SwiperModule.forRoot(SWIPER_CONFIG)
  ],
  providers: [
    Chatbot
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
