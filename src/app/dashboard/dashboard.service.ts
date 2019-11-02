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
        const headers: HttpHeaders = new HttpHeaders();
        headers.append('Accept', 'application/json;odata=nometadata');
        headers.append('Content-type', 'application/json;odata=verbose');
        headers.append('X-RequestDigest', this.formDigestValue);
        const options = {
            headers: headers,
        };
        return this.http.get<IDashboardMenu[]>(environment.API_URL + '/lists/GetByTitle(\'FNZ_Management_Dashboard_Menu\')/items', options)
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

    // put(dashboardMenu: IDashboardMenu): Observable<IDashboardMenu[]> {
    //     return this.http.put<IDashboardMenu[]>(this.mockDbUrl, dashboardMenu).pipe(
    //         retry(3),
    //         catchError(this.handleError)
    //     );
    // }

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
