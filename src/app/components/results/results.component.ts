import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

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

    @ViewChild('list') listComponent;

    params;
    results;
    favorites = [];
    list;
    userProfileData;
    viewMode = 'results';
    offset = 0; 

    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        private api: Otoboto,
        private local: LocalService,
        private auth: Auth
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.params = params;
            console.log(params);
            if (params.guest) {
                this.getPreparedData(params);
            } else {
                this.api.init(params.uid);
                let initialViewMode = params.mode ? params.mode : this.viewMode;
                this.offset = params.offset ? params.offset : this.offset;
                
                this.setViewMode(initialViewMode);
                this.loadUserFavorites(params.uid); 
                this.loadLocalData(params.uid);
            }
        });
    }

    getPreparedData = (params) => {
        let uid = this.api.getUID(); 
        if (uid) {
            this.updateURI(params, uid); 
            this.getResults(params.city, uid);
        } else {
            setTimeout(this.getPreparedData, 250, params);
        }
    }
    
    updateURI(params, uid) {
        let searchArgs = {
            city: params.city,
            price: params.price, 
            type: params.type,
            uid: uid
        };
        this.router.navigate(['./results'],{queryParams : searchArgs});       
    }

    getResults(location, uid) {
        this.api.getData(location, uid).subscribe(response => {
            let results = response.data;
            this.local.saveResults(results); 
            this.results = results; 
         })        
    }

    loadLocalData(uid) {
        this.results = this.local.getResults(); 
        console.log(this.results);
        this.userProfileData = this.local.getUserProfile();
        console.log(this.results);
    }

    loadUserFavorites(uid) {
        this.api.getFavorites().subscribe(response => {
            this.favorites = response.data;
            this.local.saveFavorites(response.data);
        })
    }

    login() {
        console.log(this.params);
        this.auth.loginWithFB(this.params).then(response => {
            this.results = response['data'];
            this.userProfileData = this.local.getUserProfile();
        });
    }

    likeItem(item) {
        this.removeItemFromResults(item);
        this.favorites.push(item); 
        this.local.likeItem(item);
        this.api.like(item).subscribe(response => {
            console.log(response);
        });
    }

    dislikeItem(item) {
        this.removeItemFromResults(item);
        this.local.removeItem(item);
        this.api.dislike(item).subscribe(response => {
            console.log(response);
        });        
    }

    removeItemFromResults(item) {
        let index = this.results.findIndex(element => element.car_document_id.$oid == item.car_document_id.$oid);
        this.results.splice(index,1);
    }

    getItems(mode) {
        console.log('mode',mode);
        if (mode == 'results') {
            return this.results;
        } else if (mode == 'favorites') {
            return this.favorites;
        }
    }

    setViewMode(mode) {
        this.viewMode = mode; 
        this.router.navigate(['./results'],{
            queryParams: {mode: mode},
            queryParamsHandling: "merge"
          });  
        this.listComponent.reset();      
    }

    loadNextPage(mode) {
       
        if (mode == 'results') {
            console.log('bring more');
            this.offset++;
            this.api.getPage(this.offset).subscribe(response => {
                this.results = this.results.concat(response.data);
                this.local.saveResults(this.results);
            });
        }
       
    }

    setOffset(offset) {
        console.log(offset);
        this.router.navigate(['./results'],{
            queryParams: {offset: offset},
            queryParamsHandling: "merge"
          });            
    }

    /*
    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.params = params; 
            if (!params.uid) {
                this.getPreparedData();
            } else {
                this.api.setUID(params.uid);
                this.loadLocalData(params.uid); 
            }
        });          
    }

    getPreparedData = () => {
        let uid = this.api.getUID(); 
        if (uid) {
            this.updateURI(this.params, uid); 
            this.getResults(this.params.city, uid);
        } else {
            setTimeout(this.getPreparedData, 250);
        }
    }

    updateURI(params, uid) {
        let searchArgs = {
            city: params.city,
            price: params.price, 
            type: params.type,
            uid: uid
        };
        this.router.navigate(['./results'],{queryParams : searchArgs});       
    }

    getResults(location, uid) {
        this.api.getData(location, uid).subscribe(response => {
            console.log('showing general results');
            console.log(response.data); 
            let results = response.data;
            this.local.saveResults(results); 
            this.results = results; 
         })        
    }

    loadLocalData(uid) {
        console.log('showing catch results');
        this.results = this.local.getResults(); 
        console.log(this.results);
    }

    login() {

        this.auth.loginWithFB(this.params).then(response => {
            console.log('showing user saved results');
            console.log(response['data']);  
            this.results = response['data'];
        });
    }

    clearUserSearch() {
        this.api.clearUserSearch('59ff5509bfd217000ee15e4a').subscribe(response => {
            console.log(response);
        })
    }

    */
    clearUserSearch() {
        this.api.clearUserSearch('59ff5509bfd217000ee15e4a').subscribe(response => {
            console.log(response);
        })
    }
}