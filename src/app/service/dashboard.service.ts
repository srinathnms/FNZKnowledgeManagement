import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { IDashboardMenu } from '../model/dashboard';

@Injectable()
export class DashboardService {
    private baseUrl: string;
    private mockDbUrl: string = "http://localhost:3000/FNZ_Management_Dashboard_Menu";

    constructor(private http: HttpClient) {
        this.baseUrl = '/GetByTitle(\'FNZ_Management_Dashboard_Menu\')/items';
    }

    get(): Observable<IDashboardMenu[]> {
        // const requestUrl = this.getUrl(this.baseUrl);
        return this.http.get<IDashboardMenu[]>(this.mockDbUrl).pipe(
            map((dashboardMenus: IDashboardMenu[]) => dashboardMenus),
            retry(3),
            catchError(this.handleError)
        );
    }

    put(dashboardMenu: IDashboardMenu): Observable<IDashboardMenu[]> {
        // const requestUrl = this.getUrl(this.baseUrl);
        return this.http.put<IDashboardMenu[]>(this.mockDbUrl, dashboardMenu).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    post(dashboardMenu: IDashboardMenu): Observable<IDashboardMenu[]> {
        // const requestUrl = this.getUrl(this.baseUrl);
        return this.http.post<IDashboardMenu[]>(this.mockDbUrl, dashboardMenu).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    delete(menuId: number): Observable<never> {
        // const requestUrl = this.getUrl(this.baseUrl);
        return this.http.delete(`${this.mockDbUrl}/${menuId}`).pipe(
            map((never: never) => never),
            retry(3),
            catchError(this.handleError)
        );
    }

    private getUrl(url: string) {
        return environment.API_URL + url;
    }

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
    };
}
