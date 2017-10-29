import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Otoboto } from '../../services/otoboto.service';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent {

    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        private api: Otoboto
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            //this.api.getCars(params); 
        });          
    }

}
