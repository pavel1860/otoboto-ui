import { Component, Output, EventEmitter, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent {

  searchArguments;
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private zone: NgZone
  ) {}

}