import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [

    { path: '', redirectTo: '/welcome', pathMatch: 'full' },

    {
        path: 'welcome',
        component: WelcomeComponent
    },

    {
        path: 'results',
        component: ResultsComponent
    },
    { path: 'detail/:id', component: ResultsComponent }

  ];

  @NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}