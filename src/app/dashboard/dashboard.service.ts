import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IDashboardMenu } from 'src/app/model/dashboard';
import { BaseService } from '../services/base.service';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseService {
    constructor(private http: HttpClient, authService: AuthService) {
        super(authService);
    }

    get(): Observable<IDashboardMenu[]> {
        return this.http.get<IDashboardMenu[]>(environment.API_URL + '/lists/GetByTitle(\'DashboardMenus\')/items')
            .pipe(
                map((dashboardMenus: any) => dashboardMenus.value),
                retry(3),
                catchError(this.handleError)
            );
    }

    getFromMock(): Observable<IDashboardMenu[]> {
        return this.http.get<IDashboardMenu[]>('http://localhost:3000/FNZ_Management_Dashboard_Menu')
            .pipe(
                map((dashboardMenus: any) => dashboardMenus),
                retry(3),
                catchError(this.handleError)
            );
    }

    public getItemTypeForListName(name) {
        return 'SP.Data.' + name.charAt(0).toUpperCase() + name.slice(1) + 'ListItem';
    }

    put(dashboardMenu: IDashboardMenu): Observable<IDashboardMenu[]> {
        const listName = 'DashboardMenus';
        const itemType = this.getItemTypeForListName(listName);
        const formDigestValue = localStorage.getItem('currentUser');
        const item = {
            '__metadata': { 'type': 'SP.Data.DashboardMenusListItem' },
            'MenuName': dashboardMenu.MenuName,
            'ParentId': 1
        };
        debugger;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
            'Cache-Control': 'no-cache',
            'Accept': 'application/json;odata=verbose',
            'X-HTTP-Method': 'POST',
            'If-Match': '*',
            'X-RequestDigest': formDigestValue
        });

        const options = {
            headers: httpHeaders,
        };

        const siteUrl = 'https://cognizantonline.sharepoint.com/sites/ukInsurance/FNZ/_api/lists/getbytitle(\'' +
            listName + '\')/items';
        return this.http.post<IDashboardMenu[]>
            (siteUrl, JSON.stringify(item), options)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // post(dashboardMenu: IDashboardMenu): Observable<IDashboardMenu[]> {
    //     return this.http.post<IDashboardMenu[]>(this.mockDbUrl, dashboardMenu).pipe(
    //         retry(3),
    //         catchError(this.handleError)
    //     );
    // }

    // delete(menuId: number): Observable<never> {
    //     return this.http.delete(`${this.mockDbUrl}/${menuId}`).pipe(
    //         map((never: never) => never),
    //         retry(3),
    //         catchError(this.handleError)
    //     );
    // }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }
}
