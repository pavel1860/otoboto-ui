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
import { BotComponent } from './components/bot/bot.component';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { MainDetailsComponent } from './components/main-details/main-details.component';
import { RankGaugeComponent } from './components/rank-gauge/rank-gauge.component';
import { BotAvatarComponent } from './components/bot-avatar/bot-avatar.component';
import { InputPaneComponent } from './components/input-pane/input-pane.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { SellerCommentsComponent } from './components/seller-comments/seller-comments.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { ModelInfoComponent } from './components/model-info/model-info.component';
import { BotSpeachComponent } from './components/bot-speach/bot-speach.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FullImageGallery } from './components/full-image-gallery/full-image-gallery.component';
import { ResultsViewComponent } from './components/results-view/results-view.component';
import { WizardSelectorAutocomplete } from './components/wizard-selector-autocomplete/wizard-selector-autocomplete.component';
import { CarManufacturerSelector } from './components/car-manufacturer-selector/car-manufacturer-selector.component';
import { CarModelSelector } from './components/car-model-selector/car-model-selector.component';
import { FiltersComponent } from './components/filters/filters.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';

import { Otoboto } from './services/otoboto.service';
import { LocalService } from './services/local.service';
import { Locations } from './services/locations.service';
import { DeviceService } from './services/device.service';
import { Config } from './services/config.service';

import { NisPipe }  from './pipes/nis.pipe';
import { TimeAgoPipe } from './pipes/timeAgo.pipe';
import { AuthGuard } from './services/auth-guard.service';
import { Auth } from './services/auth.service';

import { ClickOutsideDirective } from './directives/click-outside.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FacebookModule } from 'ngx-facebook';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { GaugeModule } from "ng-gauge";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClipboardModule } from 'ngx-clipboard';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: false
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
    TimeAgoPipe,
    WizardComponent,
    PagerComponent,
    CarTypeSelectorComponent,
    LocationSelectorComponent,
    PriceSelectorComponent,
    GoogleAutocompleteComponent,
    InputBoxComponent,
    BotComponent,
    ListComponent,
    CardComponent,
    NavigationComponent,
    ImageGalleryComponent,
    MainDetailsComponent,
    RankGaugeComponent,
    BotAvatarComponent,
    InputPaneComponent,
    UserSettingsComponent,
    SellerCommentsComponent,
    SectionTitleComponent,
    CarInfoComponent,
    ModelInfoComponent,
    BotSpeachComponent,
    SearchResultsComponent,
    FavoritesComponent,
    FullImageGallery,
    ResultsViewComponent,
    WizardSelectorAutocomplete,
    CarManufacturerSelector,
    CarModelSelector,
    FiltersComponent,
    ClickOutsideDirective,
    UserMenuComponent,
    ContactModalComponent
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
    GaugeModule,
    ClipboardModule,
    FacebookModule.forRoot(),
    SwiperModule.forRoot(SWIPER_CONFIG)
  ],
  providers: [
    Otoboto,
    LocalService,
    AuthGuard,
    Auth,
    Locations,
    DeviceService,
    Config
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
