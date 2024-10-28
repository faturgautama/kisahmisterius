import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    Blog$ = new BehaviorSubject<any>([]);

    constructor(
        private _httpService: HttpService
    ) { }

    getAll(): Observable<any> {
        return this._httpService
            .getRequest(`${environment.webApiUrl}/blog/GetAll`)
            .pipe(
                tap((result) => {
                    this.Blog$.next(result.data)
                })
            )
    }

    create(payload: any): Observable<any> {
        return this._httpService.postRequest(`${environment.webApiUrl}/blog/Create`, payload)
    }

    update(payload: any): Observable<any> {
        return this._httpService.putRequest(`${environment.webApiUrl}/blog/Update`, payload)
    }

    delete(id_blog: any): Observable<any> {
        return this._httpService.putRequest(`${environment.webApiUrl}/blog/Delete/${id_blog}`, null)
    }
}
