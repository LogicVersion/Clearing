import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  constructor() {}

  // intercept(
  //   request: HttpRequest<unknown>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<unknown>> {
  //   return next.handle(request);
  // }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }
    const cachedResponse = this.cache.get(request.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
          this.cache.set(request.url, response);
        }
      })
    );
  }
  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //   const httpRequest = req.clone({
  //     headers: new HttpHeaders({
  //       'Cache-Control': 'no-cache',
  //       Pragma: 'no-cache',
  //       Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
  //     }),
  //   });

  //   return next.handle(httpRequest);
  // }
}
