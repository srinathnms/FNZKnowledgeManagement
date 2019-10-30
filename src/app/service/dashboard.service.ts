﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { IDashboardMenu } from '../model/dashboard';

@Injectable()
export class DashboardService {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = '/GetByTitle(\'FNZ_Management_Dashboard_Menu\')/items';
    }

    get(): Observable<IDashboardMenu[]> {
        const requestUrl = this.getUrl(this.baseUrl);
        return this.http.get<IDashboardMenu[]>(requestUrl).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );;
    }

    private getUrl(url: string) {
        return environment.API_URL + url;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}
