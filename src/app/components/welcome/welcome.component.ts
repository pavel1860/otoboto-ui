import { Component, Output, EventEmitter, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Otoboto } from '../../services/otoboto.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [ Otoboto ]
})

export class WelcomeComponent {

  wizardResults = {};
  userProfileData;
  uid;  
  loading = false; 
  isNewUser;
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private api: Otoboto,
    private local: LocalService
  ) {}

  ngOnInit() {

    if (this.local.getAccessToken()) {
      this.api.getFacebookLoginStatus().then(response => {
        if (response.status == 'connected') {
          setTimeout(this.loginWithFacebook,0);
        }
      });
    }

    this.route.queryParams.subscribe((params) => {
      this.isNewUser = params.isNewUser;  
    });   
    
  }

  loginWithFacebook = () => {
    this.loading = true; 
    this.api.loginWithFB().then(response => {
      this.userProfileData = response['userProfileData'];
      if (response['get_search_params']) {
        this.loading = false;
        this.router.navigate(['./welcome'], {
          queryParams: {isNewUser: true},
          queryParamsHandling: "merge"
        });
      } else if (response['get_results']) {
        this.router.navigate(['./results']); 
        this.loading = false;        
      } else {
        this.loading = false;
        console.log('An unexpected error occured');
      }
    }, e => {
      console.log(e);
    });
  }

  disconnect = () => {
    this.api.disconnect().subscribe(response => {
    });
  }

  processResults = (wizardResults) => {
    console.log(wizardResults);
    if (this.userProfileData) {
      this.api.updateUserSearchParams(wizardResults, this.isNewUser).subscribe(response => {
        this.router.navigate(['./results']);  
      });
    } else {
      this.router.navigate(['./results'], {
        queryParams: {isGuest: true},
        queryParamsHandling: "merge"
      });     
    }
    
  }

}