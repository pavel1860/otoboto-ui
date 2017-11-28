import { Component, ViewChild, HostListener, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { Otoboto } from '../../services/otoboto.service';
import { LocalService } from '../../services/local.service';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [ Auth ]
})

export class ResultsComponent {


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

