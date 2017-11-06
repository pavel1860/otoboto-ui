import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: Auth) { }

    canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

        return Observable.fromPromise(this.auth.isLoggedIn()).map(response => {
                        
            if (response) {
                return true;
            } else {
                this.router.navigate(['/welcome']);
                return false; 
            }
           
        }).catch(() => {
            return Observable.of(false);
        });

    }    

}
