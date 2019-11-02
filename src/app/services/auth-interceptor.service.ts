import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IUserClaims } from 'src/app/model/user';
import { AuthService } from './auth.service';
import { SpinnerService } from '../core/spinner/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    requestCount = 0;
    constructor(private authService: AuthService, private spinnerService: SpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser: IUserClaims;
        this.authService.currentUser.subscribe((userClaim: IUserClaims) => currentUser = userClaim);
        const headers: HttpHeaders = new HttpHeaders().set('Accept', 'application/json;odata=nometadata');
        if (currentUser && currentUser.FormDigestValue) {
            headers.append('Content-type', 'application/json;odata=verbose')
                .append('X-RequestDigest', currentUser.FormDigestValue);
        }
        request = request.clone({ headers });
        this.incrementRequest();
        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.decrementRequest();
            }
            return event;
        }), catchError((error: HttpErrorResponse) => {
            this.decrementRequest();
            return throwError(error);
        }));
    }

    private incrementRequest(): void {
        this.requestCount++;
        this.spinnerService.showSpinnerSubject.next(this.requestCount);
    }

    private decrementRequest(): void {
        this.requestCount--;
        this.spinnerService.showSpinnerSubject.next(this.requestCount);
    }
}
