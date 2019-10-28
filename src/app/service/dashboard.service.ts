import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { IDashboardMenu } from '../model/dashboard';

@Injectable()
export class DashboardService {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = '/GetByTitle(\'FNZ_Management_Dashboard_Menu\')/items';
    }

    get(): Observable<IDashboardMenu[]> {
        const requestUrl = this.getUrl(this.baseUrl);
        return this.http.get<IDashboardMenu[]>(requestUrl);
    }

    private getUrl(url: string) {
        return environment.API_URL + url;
    }
}
