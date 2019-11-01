import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IDashboardMenu } from 'src/app/model/dashboard';
import { IUserClaims } from 'src/app/model/user';

@Injectable()
export class DashboardService implements OnInit {
    private sharePointApi = environment.API_URL;
    private formDigest: IFormDigest;
    private mockDbUrl: string = "http://localhost:3000/FNZ_Management_Dashboard_Menu";

    constructor(private http: HttpClient) {
        // this.baseUrl = '/GetByTitle(\'FNZ_Management_Dashboard_Menu\')/items';
    }

    ngOnInit() {
        this.getRequestDigest().subscribe(
            (formDigest: IFormDigest) => {
                this.formDigest = formDigest;
            }
        );
    }

    get(): Observable<IDashboardMenu[]> {
        const headers: HttpHeaders = new HttpHeaders();
        headers.append('Accept', 'application/json;odata=nometadata');
        headers.append('Content-type', 'application/json;odata=verbose');
        headers.append('X-RequestDigest', this.formDigest && this.formDigest.FormDigestValue);
        const options = {
            headers: headers,
        };

        return this.http.get<IDashboardMenu[]>(this.sharePointApi + 'GetByTitle(\'FNZ_Management_Dashboard_Menu\')/items', options).pipe(
            map((dashboardMenus: IDashboardMenu[]) => { debugger; return dashboardMenus }),
            retry(3),
            catchError(this.handleError)
        )
    }

    put(dashboardMenu: IDashboardMenu): Observable<IDashboardMenu[]> {
        return this.http.put<IDashboardMenu[]>(this.mockDbUrl, dashboardMenu).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    post(dashboardMenu: IDashboardMenu): Observable<IDashboardMenu[]> {
        return this.http.post<IDashboardMenu[]>(this.mockDbUrl, dashboardMenu).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    delete(menuId: number): Observable<never> {
        return this.http.delete(`${this.mockDbUrl}/${menuId}`).pipe(
            map((never: never) => never),
            retry(3),
            catchError(this.handleError)
        );
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

    private getRequestDigest(): Observable<IFormDigest> {
        const headers: HttpHeaders = new HttpHeaders();
        headers.append('Accept', 'application/json;odata=nometadata');
        const options = {
            headers: headers,
        };

        return this.http.post(this.sharePointApi + 'contextinfo', options).pipe(
            map((data: IFormDigest) => data),
            retry(3),
            catchError(this.handleError)
        ).subscribe((formDigest: IFormDigest) => { this.formDigest = formDigest; });
    }
}
