import { Component, Input, ViewChild, Output, EventEmitter, NgZone, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Otoboto } from '../../services/otoboto.service';
import { LocalService } from '../../services/local.service';
import { DeviceService } from 'app/services/device.service';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [ Otoboto ],
  animations: [
    trigger('divState', [
      state('in', style({backgroundColor: 'red',transform: 'translateX(0)'})),
      transition('void => *', [
        animate(2000, keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 0.5, offset: 0.3}),
          style({opacity: 1, offset: 1.0})
        ]))
      ])
    ])
  ]  
})

export class WelcomeComponent {

  @ViewChild('results') results;
  @ViewChild('bot') bot;

  wizardResults = {};
  userProfileData;
  uid;  
  loading = false; 
  loadingWizard = false;
  isNewUser;
  isGuest;
  globalViewMode; 
  haveResults;
  showHaveResults;
  showAvatar;

  showWizard = false;
  showResults = false; 
  hideBot = true;
  resultsViewMode = 'results';
  parameters;
  isMobile = true; 

  minimizeControlPanel = false; 
  showUserSettings = false;
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private api: Otoboto,
    private local: LocalService,
    private device: DeviceService,
    private zone: NgZone
  ) {
    this.isMobile = device.isMobile();
  }

  ngOnInit() {

    let token = this.local.getAccessToken(); 

    if (token) {

      this.api.getFacebookLoginStatus().then(response => {

        if (response.status == 'connected') {
  
          this.loginWithFacebook(token);
            
        } else {
          this.displayWizard();
        }
      });
    } else {
      this.displayWizard();
    }

    this.route.queryParams.subscribe((params) => {

      this.isNewUser = params.isNewUser; 
      
      if (params.isGuest) {
        this.isGuest = params.isGuest;
        this.displayResults();
      } else if (params.myResults) {
        this.displayResults();
      } else {
        this.displayWizard();
      }
      
    });   
    
  }

  loginWithFacebook = (token?) => {

    this.loading = true; 

    this.api.loginWithFB(token).then(response => {

      if (!response) {
        this.loading = false;
        return;
      }

      this.userProfileData = response['userProfileData'];

      if (response['get_search_params']) {

        // User is new. Try to update his wizard results. 

        this.api.updateUserSearchParams(this.wizardResults, true).subscribe(response => {

          if (response['get_search_params'] || response.status == 'fail') {

            console.log('case 1');

            // wizard results are not full. Send him (or keep him) to wizard. 
            this.loading = false;
            this.router.navigate(['./welcome'], {
              queryParams: {isNewUser: true},
              queryParamsHandling: "merge"
            });
            this.haveResults = false;
            this.displayWizard(); 

          } else if (response['get_results']) {

            //wizard results are full. Show him (or keep him) in results. 
            console.log('case 2');
            this.haveResults = true;
            this.loading = false;
            this.router.navigate(['./welcome'], {
              queryParams: {myResults: true},
              queryParamsHandling: "merge"
            }); 
            
            //this.displayResults();  
                         

          }

        })

        /*
        this.loading = false;
        this.router.navigate(['./welcome'], {
          queryParams: {isNewUser: true},
          queryParamsHandling: "merge"
        });
        this.displayWizard(); 
        */

      } else if (response['get_results']) {

        console.log('case 3');
        
        // User is known. show him results. 
        
        this.loading = false;
        this.haveResults = true;
        this.router.navigate(['./welcome'], {
          queryParams: {myResults: true}
        }); 
        /*
        setTimeout(() => {
          this.router.navigate(['./welcome']); 
        }, 0);
        */

      } else {

        console.log('case 4');
        this.logout();

        this.loading = false;
        
      }
    }, e => {
      console.log(e);
    });
  }

  disconnect = () => {
    this.api.disconnect().subscribe(response => {
    });
  }

  logout = () => {
    this.local.clear();
    this.userProfileData = undefined;
    this.resultsViewMode = undefined;
    this.displayWizard();
    this.haveResults = false;
    this.showHaveResults = false;
    this.showAvatar = false;
    this.api.disconnect().subscribe(response => {

    });
    this.router.navigate(['./welcome'], {
      queryParams: {}
    });  
  }

  newSearch = () => {
    this.bot.reset();
    this.displayWizard();
    this.resultsViewMode = undefined;
    this.showHaveResults = this.haveResults;
    this.router.navigate(['./welcome'], {
      queryParams: {}
    });   
  }

  processResults = (wizardResults) => {
    this.loadingWizard = true;
    this.wizardResults = wizardResults;
    if (this.userProfileData) {

      this.api.updateUserSearchParams(wizardResults, this.isNewUser).subscribe(response => {
        //this.router.navigate(['./results']);  
        this.loadingWizard = false;
        this.displayResults();
      });
    } else {
      this.router.navigate(['./welcome'], {
        queryParams: {isGuest: true},
        queryParamsHandling: "merge"
      });
      this.loadingWizard = false;
      //this.displayResults();     
    }
    
  }

  displayResults = () => {

    this.showResults = false;
    this.showWizard = false;
    this.minimizeControlPanel = true; 
    this.setSearchFilters(); 

    setTimeout(() => {
      this.showResults = true; 
      this.resultsViewMode = 'results';
      this.globalViewMode = 'searchResults';
      this.hideBot = false; 
      //this.haveResults = true;
    }, 800);
    
  }

  displayWizard = () => {
    this.showWizard = true; 
    this.showResults = false; 
    this.minimizeControlPanel = false; 
    this.hideBot = true; 
    this.globalViewMode = 'wizard';
    this.showAvatar = true;
  }

  setViewMode = (viewMode) => {
    if ((!this.userProfileData) && (viewMode == 'favorites')) {
      this.bot.state('suggestLogin');
      return;
    }
    this.resultsViewMode = viewMode;
    this.results.setViewMode(viewMode);
  }

  reset = () => {
    this.router.navigate(['./welcome'], {
      queryParams: {}
    });   
  }

  setSearchFilters = () => {
    this.api.getUserSearchParameters().subscribe(response => {
      this.parameters = response.data.search_params; 
      this.bot.updateFilters();
    });
    
  }

  processBotRequest = (request) => {

    if (request.code == 'newSearch') {
      this.newSearch(); 
      return;
    }
    if (request.code == 'logout') {
      this.logout(); 
      return;
    }
    if (request.code == 'login') {
      this.loginWithFacebook(); 
      return;
    }    
  }

}