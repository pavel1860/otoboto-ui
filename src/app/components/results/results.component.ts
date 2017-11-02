import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Otoboto } from '../../services/otoboto.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent {

    params;
    results;

    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        private api: Otoboto,
        private local: LocalService
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.params = params; 
            if (!params.uid) {
                this.getPreparedData();
            } else {
                this.loadLocalData(params.uid); 
            }
        });          
    }

    getPreparedData = () => {
        let uid = this.api.getUID(); 
        if (uid) {
            this.updateURI(this.params, uid); 
            this.getResults(this.params.location, uid);
        } else {
            setTimeout(this.getPreparedData, 250);
        }
    }

    updateURI(params, uid) {
        let searchArgs = {
            location: params.location,
            price: params.price, 
            type: params.type,
            uid: uid
        };
        this.router.navigate(['./results'],{queryParams : searchArgs});       
    }

    getResults(location, uid) {
        this.api.getData(location, uid).subscribe(response => {
            console.log(response);
            let results = response.data;
            this.local.saveResults(uid, results); 
            this.results = results; 
         })        
    }

    loadLocalData(uid) {
        this.results = this.local.getResults(uid); 
        console.log(this.results);
    }

}
