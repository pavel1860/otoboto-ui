import { Component, Output, EventEmitter, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Auth } from '../../services/auth.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [ Auth ]
})

export class WelcomeComponent {

  wizardResults = {};
  userProfileData;
  uid;  
  loading = true; 
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private auth: Auth,
    private local: LocalService
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      this.uid = params.uid;
      console.log(this.uid); 
    });   

    this.auth.login().then(response => {
      console.log(response); 
      if (response) {
        this.doOnLoggedIn(response);
      } else {
        this.router.navigate(['./welcome'],{queryParams: {
          guest: true
        }, queryParamsHandling: "merge"}); 
        this.loading = false;   
      }
    });

  }

  loginWithFacebook(wizardResults) {
    this.auth.loginWithFB(wizardResults).then(response => {
      console.log(response); 
      this.doOnLoggedIn(response);
    });
  }

  doOnLoggedIn(response) {  
    this.local.saveUserProfile(response.userInfo);  
    if (response['status'] == "success") {
      
      this.router.navigate(['./results'],{queryParams: {
        uid: response['user_id']
      }});  
    } else {
      this.router.navigate(['./welcome'],{queryParams: {}});        
      this.userProfileData = response.userInfo;
      this.loading = false; 
      console.log(this.userProfileData);
      //this.router.navigate(['./welcome'],{queryParams: {
      //  uid: response['user_id']
      //}, queryParamsHandling: "merge"});         
    }
  }

  goToResults(wizardResults) {
    console.log('sds');
    if (this.userProfileData) {
      this.loginWithFacebook(wizardResults); 
    } else {
      this.router.navigate(['./results'],{
        queryParams: wizardResults,
        queryParamsHandling: "merge"
      });
    }
    //this.loginWithFacebook(wizardResults); 

  }



}