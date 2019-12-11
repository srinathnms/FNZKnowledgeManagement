import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseService } from '../services/base.service';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class HomeService extends BaseService {
    constructor(private http: HttpClient, authService: AuthService) {
        super(authService);
    }

    get(listName: string, query?: string): Observable<any> {
        let url = `${environment.API_URL}/lists/GetByTitle('${listName}')/items`;
        if (query) {
            url = `${environment.API_URL}/lists/GetByTitle('${listName}')/items${query}`;
        }
        return this.http.get<any>(url)
            .pipe(
                map((result: any) => result.value),
                retry(3),
                catchError(this.handleError)
            );
    }

    // Dummy data to work in local : Should be deleted once ready to deploy
    getFromMock(listName: string): Observable<any> {
        return this.http.get<any>(`http://localhost:3000/${listName}`)
            .pipe(
                map((dashboardMenus: any) => dashboardMenus),
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
    }
}
