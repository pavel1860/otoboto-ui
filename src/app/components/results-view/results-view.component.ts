import { Component, Output, EventEmitter, ViewChild, HostListener, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { DeviceService } from '../../services/device.service';

import { Otoboto } from '../../services/otoboto.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss']
})

export class ResultsViewComponent {

    @ViewChild('resultsList') searchResultsList;
    @ViewChild('favoritesList') favoritesList;
    @ViewChild('bot') bot;

    @HostListener('window:scroll', ['$event']) onScrollEvent($event){
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st < 142) {
            this.showBot = false; 
        } else {
            this.showBot = true;
        }
        this.lastScrollTop = st;        
    } 

    @Output() botState: EventEmitter<any> = new EventEmitter();
    @Output() viewModeChanged: EventEmitter<any> = new EventEmitter();
    @Output() userProfileDataChanged: EventEmitter<any> = new EventEmitter();
     
    searchResults = [];
    userFavorites = [];

    hiddenSearchResults = [];
    hiddenFavorites = [];

    noResults;

    searchResultsPage = 1;
    userFavoritesPage = 1;

    viewMode;
    userProfileData;
    isGuest;

    showBot;
    lockBot = false;

    operations;
    lastScrollTop;
    loading; 

    pendingAction;

    urlParams;

    imageGalleryData;

    isMobile;

    constructor(
        private route: ActivatedRoute, 
        private api: Otoboto, 
        private local: LocalService,
        private router: Router,
        private device: DeviceService
    ) {
        api.init(); 
        this.userProfileData = this.local.getUserProfileData(); 
    }

    ngOnInit() {

        this.isMobile = this.device.isMobile();
        this.setViewMode('results');

        this.route.queryParams.subscribe((params) => {
            this.init(params);
        });     

        this.operations = {
            hideManufacturer: this.hideManufacturer, 
            hideModel: this.hideModel,
            login: this.login
        }             

    }

    init(params) { 

        this.urlParams = params;
        
        if (params.isGuest) {
            this.isGuest = true;
            this.loadGuestData(params); 
            this.searchResultsList.close();
            this.setBotState('welcomeGuest');
        } else {
            this.setBotState('welcomeUser');
        }

    }

    loadGuestData(params) {
        this.api.loadGuestData(params).subscribe(response => {
            this.searchResults = response;
            this.noResults = !response || response.length == 0;
        });
    }

    loadUserSearchResults() {
        this.api.loadUserData(this.searchResultsPage).subscribe(response => {
            this.searchResults = this.searchResults.concat(response); 
            this.searchResultsPage++;
            this.noResults = !response || response.length == 0;
        });        
    }

    loadUserFavorites() {
        this.api.loadUserFavorites(this.userFavoritesPage).subscribe(response => {
            this.userFavorites = this.userFavorites.concat(response); 
            this.userFavoritesPage++;
        }, e => {
            if (e.status == 400) {
                this.favoritesList.close();
                this.loading = false;
            }
        });    
    }

    likeItem = (item) => {
        if (this.isGuest) {
            this.setBotState('suggestLogin');
            this.pendingAction = {
                operation: this.likeItem,
                data: item
            }
            return;
        }
        this.api.like(item.car_document_id).subscribe(response => {});
        this.hiddenSearchResults.push(item.car_document_id);
        this.setBotState('welcomeUser');
    }

    dislikeItem = (item) => {
        if (this.isGuest) {
            this.setBotState('suggestLogin');
            this.pendingAction = {
                operation: this.dislikeItem,
                data: item
            }
            return; 
        }        
        this.api.dislike(item).subscribe(response => {
            this.processFeedback(item, response.data); 
        });
        this.hiddenSearchResults.push(item.car_document_id);  
        this.setBotState('welcomeUser');      
    }

    removeItemFromFavorites(item) {
        this.api.removeItemFromFavorites(item).subscribe(response => {});
        this.hiddenFavorites.push(item.car_document_id);  
        this.setBotState('welcomeUser');           
    }

    setViewMode(viewMode) {

        this.viewMode = viewMode;
        this.viewModeChanged.emit(viewMode);
        
        if (viewMode == 'results') {
            this.setBotState('viewModeSearchResults');
        } else if (viewMode == 'favorites') {
            this.setBotState('viewModeSearchFavorites');
        } else if (viewMode == 'user') {
            this.setBotState('viewModeUserSettings');
        }

        if (viewMode != 'user') {
            this.loading = true; 
        }

        setTimeout(() => {
            if (this.isGuest) {
                return; 
            }
            if (viewMode == 'results') {
                this.userFavorites = [];
                this.userFavoritesPage = 1;
                this.loadUserSearchResults();
            } else if (viewMode == 'favorites') {
                this.searchResults = [];
                this.searchResultsPage = 1;
                this.loadUserFavorites();
            }
        }, 0); 

    }

    processFeedback(item, feedback) {

        if (feedback.ask_hide_model) {
            this.setBotState('suggestHideModel', {
                data: item,
                counter: feedback.dislike_counter
            });
        }

        if (feedback.ask_hide_manufacturer) {
            this.setBotState('suggestHideManufacturer', {
                data: item,
                counter: feedback.dislike_counter
            });
        }        

    }

    execute(operation) {
        if (!operation.code || !this.operations[operation.code]) {
            return;
        }
        this.operations[operation.code](operation.data); 
    }

    hideManufacturer = (item) => {
        this.api.hideManufacturer(item.manufacturer).subscribe(response => {
            this.hiddenSearchResults = this.hiddenSearchResults.concat(response.data);
            this.setBotState('manufacturerIsHidden', { 
                data: item
            });
        });
    }

    hideModel = (item) => {
        this.api.hideModel(item.manufacturer, item.model).subscribe(response => {
            this.hiddenSearchResults = this.hiddenSearchResults.concat(response.data);
            this.setBotState('modelIsHidden', { 
                data: item
            });
        });
    }

    login = () => {

        this.loading = true; 

        this.api.loginWithFB().then(response => {

          this.userProfileData = response['userProfileData'];

          this.userProfileDataChanged.emit(this.userProfileData); 

          if (response['get_search_params']) {
              
            this.api.updateUserSearchParams(this.urlParams, true).subscribe(response => {
                this.initUserMode(); 
            });

          } else if (response['get_results']) {

            this.initUserMode(); 

          } else {
            console.log('An unexpected error occured');
          }

        }, e => {
          console.log(e);
        });        
    }

    initUserMode = () => {
        this.router.navigate(['./welcome'], {
            queryParams: {}
        });  

        this.searchResults = [];
        this.searchResultsPage = 1;
        this.isGuest = false; 
        this.searchResultsList.open();

        setTimeout(() => {
            this.setViewMode('results');
            if (this.pendingAction) {
                setTimeout(() => { 
                    this.pendingAction.operation(this.pendingAction.data);
                }, 0);
            }
        }, 0);
    }

    setBotState = (state, data?) => {
        this.botState.emit({
            state: state,
            data: data
        })
    }

}


/*
export class ResultsComponent {

    @ViewChild('resultsList') resultsListComponent;
    @ViewChild('favoritesList') favoritesListComponent;
    @ViewChild('bot') botComponent;
    //@ViewChild(SwiperComponent) componentRef: SwiperComponent;

    @HostListener('window:scroll', ['$event']) onScrollEvent($event){

        let st = window.pageYOffset || document.documentElement.scrollTop;
        
        if (st < 142) {
            this.showBot = false; 
        }

        if (st > this.lastScrollTop){
            //this.showBot = false;
        } else {
            //scroll up 
            // Show navigation bar 
            //this.showNavigationBar = true; 
        }
        this.lastScrollTop = st;        

    } 

    params;
    loading = false;
    
    favorites = [];
    hiddenFavorites = [];

    list;
    userProfileData;
    viewMode;
    offset = -1; 
    lastScrollTop = 0;
    showNavigationBar = true;
    showBot = false; 
    feedback; 
    botInitial = true; 
    lockBot = false;
    

    // from here: 

    LIST_SLICE_SIZE = 10;

    results = [];
    hiddenResults = [];

    favoritesListItems = [];
    favoritesData;

    operations;

    swiperConfig = {            
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        nextButton: '.navigation-button',
        prevButton: '.swiper-button-prev',
    } 

    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        private api: Otoboto,
        private local: LocalService,
        private auth: Auth
    ) {}

    ngOnInit() {

        this.operations = {
            hideManufacturer: this.hideManufacturer, 
            hideModel: this.hideModel
        }     

        this.route.queryParams.subscribe((params) => {

            this.params = params;
            
            if (params.guest) {
                this.loadGuestData(params); 
            } else {
                this.api.init(params.uid);
                this.userProfileData = this.local.getUserProfile();
                this.loadUserFavorites(params.uid); 
                this.loadResults(0);
                this.setViewMode('results');
            }

        });
        
    }

    loadGuestData = (params) => {
        this.api.getGuestData(params).subscribe(response => {
            this.results = response.data;
            this.local.saveResults(this.results); 
        });
    }

    loadUserFavorites(uid) {
        this.api.getFavorites().subscribe(response => {
            this.favoritesData = response.data;
            this.loadFavorites(0);
        });
    }

    likeItem(item) {
        this.hiddenResults.push(item.car_document_id.$oid); 
        this.favoritesData.unshift(item); 
        this.api.like(item).subscribe(response => {});
    }

    dislikeItem(item) {
        this.hiddenResults.push(item.car_document_id.$oid); 
        this.api.dislike(item).subscribe(response => {
            this.botComponent.react(response,item); 
        });        
    }

    setViewMode(mode) {

        if (this.resultsListComponent) {
            this.resultsListComponent.reset();
            this.results = [];
        }

        if (this.favoritesListComponent) {
            this.favoritesListComponent.reset();
            this.loadFavorites(0);
        }

        this.resetScroller();
    
        setTimeout(()=> {
            this.viewMode = mode; 
            this.reactToViewModeChange(this.viewMode);
        },0);
        
    }

    resetScroller() {
        window.scrollTo(0, 0);
    }

    loadResults(page) {
        console.log('r',page);
        this.api.getPage(page).subscribe(response => {
            this.results = this.results.concat(response.data);
        });
    }

    loadFavorites(page) {
        let chunk = this.favoritesData.slice(page * this.LIST_SLICE_SIZE, page * this.LIST_SLICE_SIZE + this.LIST_SLICE_SIZE + 1); 
        if (chunk.length == 0) {
            this.favoritesListComponent.endOfData();
        } else {
            this.favoritesListItems = this.favoritesListItems.concat(chunk); 
            console.log(this.favoritesListItems); 
        }
    }

    removeFromFavorites(item) {
        this.hiddenFavorites.push(item.car_document_id.$oid);
        this.unhideResult(item);
        // TODO: backend operation
    }

    unhideResult(item) {
        let index = this.hiddenResults.indexOf(item.car_document_id.$oid);
        this.hiddenResults.splice(index,1);
    }

    hideManufacturer = (item) => {
        this.api.hideManufacturer(item.manufacturer).subscribe(response => {
            let data = JSON.parse(response.data);
            this.hiddenResults.concat(data);
            this.botComponent.say('הסתרתי את כל רכבי ה' + item.manufacturer, true, 2);
        });
    }

    hideModel = (item) => {
        this.api.hideModel(item.car_document_id.$oid, item.manufacturer, item.model, item.year).subscribe(response => {
            let data = JSON.parse(response.data);
            this.hiddenResults.concat(data);
            this.botComponent.say('הסתרתי את כל ה' + item.model, true, 2);
        });
    }

    execute(operation) {
        this.operations[operation.code](operation.data); 
    }

    reactToViewModeChange(viewMode) {
        if (viewMode == 'results') {
            this.botComponent.say('הנה הרכבים המתאימים ביותר עבורך', true); 
        } else if (viewMode == 'favorites') {
            this.botComponent.say('כאן נמצאים כל הרכבים שאהבת', true); 
        } else if (viewMode == 'user') {
            //this.componentRef.directiveRef.setIndex(2); 
        }
    }

}

*/

