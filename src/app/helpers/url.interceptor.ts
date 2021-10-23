import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiUrl = 'https://www.quandl.com/api/v3/datasets/WIKI/';
        request = request.clone({
            url: apiUrl + request.url
        });
        return next.handle(request);
    }
}
