import { Component } from '@angular/core';
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

    params;
    results;

    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        private api: Otoboto,
        private local: LocalService,
        private auth: Auth
    ) {}

    ngOnInit() {

        this.route.queryParams.subscribe((params) => {

            if (params.guest) {

                this.getPreparedData(params);

            } else {

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
    }

    login() {
        this.auth.loginWithFB(this.params).then(response => {
            this.results = response['data'];
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

}
