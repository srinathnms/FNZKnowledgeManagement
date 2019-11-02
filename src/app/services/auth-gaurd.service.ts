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
            localStorage.setItem('currentUser', JSON.stringify(userClaims.FormDigestValue));
        }
        return userClaims;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let isUserLoggedIn: boolean;
        const userClaims = this.authService.currentUser;
        if (userClaims) {
            isUserLoggedIn = !!userClaims;
        } else {
            this.getUserContext().then(x => isUserLoggedIn = !!x)
                .catch((error: any) => console.log('auth error' + error));
        }
        this.getUserContext().then(x => isUserLoggedIn = !!x)
            .catch((error: any) => console.log('auth error' + error));
        if (isUserLoggedIn) {
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        return false;
    }
}
