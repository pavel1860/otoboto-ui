import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ResultsComponent } from './components/results/results.component';

import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FacebookLoginButtonComponent } from './components/facebook-login-button/facebook-login-button.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { PagerComponent } from './components/pager/pager.component';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { PriceSelectorComponent } from './components/price-selector/price-selector.component';
import { CarTypeSelectorComponent } from './components/car-types-selector/car-types-selector.component';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { GoogleAutocompleteComponent } from './components/google-autocomplete/google-autocomplete.component';

import { Otoboto } from './services/otoboto.service';

import { NisPipe }  from './pipes/nis.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FacebookModule } from 'ngx-facebook';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ResultsComponent,
    ControlPanelComponent,
    TopBarComponent,
    FacebookLoginButtonComponent,
    NisPipe,
    WizardComponent,
    PagerComponent,
    CarTypeSelectorComponent,
    LocationSelectorComponent,
    PriceSelectorComponent,
    GoogleAutocompleteComponent,
    InputBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule,
    ReactiveFormsModule,   
    AppRoutingModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    SwiperModule,
    FacebookModule.forRoot(),
    SwiperModule.forRoot(SWIPER_CONFIG)
  ],
  providers: [
    Otoboto
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
