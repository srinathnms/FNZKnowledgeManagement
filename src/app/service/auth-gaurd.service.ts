import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { IUserClaims } from 'src/app/model/user';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    async getUserContext(): Promise<IUserClaims> {
        const userClaims = await this.authService.getUserContext().toPromise();
        if (userClaims) {
            localStorage.setItem('currentUser', JSON.stringify(userClaims));
        }
        return userClaims;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let isUserLoggedIn: boolean;

        this.getUserContext().then(x => isUserLoggedIn = !!x);
        if (isUserLoggedIn) {
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
