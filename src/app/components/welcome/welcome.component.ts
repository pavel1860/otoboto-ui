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

    this.route.queryParams.subscribe((params) => {
      this.isNewUser = params.isNewUser;  
    });   
    

    this.api.loadGuestData('mini', 'haifa', '40000').subscribe(response => {
      console.log(response);
    });

    /*
    this.route.queryParams.subscribe((params) => {
      this.uid = params.uid;
      
    });   

    
    this.auth.login().then(response => {
     
      if (response) {
        this.doOnLoggedIn(response);
      } else {
        this.router.navigate(['./welcome'],{queryParams: {
          guest: true
        }, queryParamsHandling: "merge"}); 
        this.loading = false;   
      }
    });
    */

  }

  loginWithFacebook = () => {
    this.loading = true; 
    this.api.loginWithFB().then(response => {
      console.log(response);
      this.userProfileData = response['userProfileData'];
      if (response['get_search_params']) {
        this.loading = false;
        this.router.navigate(['./welcome'], {
          queryParams: {isNewUser: true},
          queryParamsHandling: "merge"
        });
      } else if (response['get_results']) {
        this.router.navigate(['./results']);          
      } else {
        console.log('An unexpected error occured');
      }
    });
  }

  disconnect = () => {
    this.api.disconnect().subscribe(response => {
      console.log(response);
    });
  }

  processResults = (wizardResults) => {
    if ((this.userProfileData) || true) {
      this.api.updateUserSearchParams(wizardResults, this.isNewUser).subscribe(response => {
        console.log(response);
        this.router.navigate(['./results']);  
      });
    } else {
      /*
      this.router.navigate(['./results'], {
        queryParams: {isGuest: true},
        queryParamsHandling: "merge"
      });
      */      
    }
  }

  /*
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
      //this.router.navigate(['./welcome'],{queryParams: {
      //  uid: response['user_id']
      //}, queryParamsHandling: "merge"});         
    }
  }

  goToResults(wizardResults) {
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
  */



}