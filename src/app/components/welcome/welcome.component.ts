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

  wizardResults = {};
  userProfileData;
  uid;  
  loading = false; 
  isNewUser;
  //isGuest;

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
    private device: DeviceService
  ) {
    this.isMobile = device.isMobile();
  }

  ngOnInit() {

    if (this.local.getAccessToken()) {
      this.api.getFacebookLoginStatus().then(response => {
        if (response.status == 'connected') {
          setTimeout(this.loginWithFacebook,0);
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
        this.displayResults();
      }
      
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
        this.displayWizard(); 
      } else if (response['get_results']) {
        this.router.navigate(['./welcome']); 
        this.displayResults();      
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

  logout = () => {
    this.local.clear();
    this.userProfileData = undefined;
    this.displayWizard();
    this.api.disconnect().subscribe(response => {

    });

  }

  newSearch = () => {
    this.displayWizard();
    this.resultsViewMode = undefined;
  }

  processResults = (wizardResults) => {
    if (this.userProfileData) {
      console.log(wizardResults);
      this.api.updateUserSearchParams(wizardResults, this.isNewUser).subscribe(response => {
        //this.router.navigate(['./results']);  
        this.displayResults();
      });
    } else {
      this.router.navigate(['./welcome'], {
        queryParams: {isGuest: true},
        queryParamsHandling: "merge"
      });
      this.displayResults();     
    }
    
  }

  displayResults = () => {

    this.showResults = false;
    this.showWizard = false;
    this.minimizeControlPanel = true; 
    this.setSearchFilters(); 

    setTimeout(() => {
      this.showResults = true; 
      this.hideBot = false; 
    }, 800);
    
  }

  displayWizard = () => {
    this.showWizard = true; 
    this.showResults = false; 
    this.minimizeControlPanel = false; 
    this.hideBot = true; 
  }

  setViewMode = (viewMode) => {
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
    });
    
  }

  processBotRequest = (request) => {
    console.log(request);
    if (request.code == 'newSearch') {
      this.newSearch(); 
      return;
    }
    if (request.code == 'logout') {
      this.logout(); 
      return;
    }
  }

}