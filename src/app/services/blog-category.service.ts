import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class BlogCategoryService {

    BlogCategory$ = new BehaviorSubject<any>([]);

    constructor(
        private _httpService: HttpService
    ) { }

    getAll(): Observable<any> {
        return this._httpService
            .getRequest(`${environment.webApiUrl}/blog-category/GetAll`)
            .pipe(
                tap((result) => {
                    this.BlogCategory$.next(result.data)
                })
            )
    }

    create(payload: any): Observable<any> {
        return this._httpService.postRequest(`${environment.webApiUrl}/blog-category/Create`, payload)
    }

    update(payload: any): Observable<any> {
        return this._httpService.putRequest(`${environment.webApiUrl}/blog-category/Update`, payload)
    }

    delete(id_blog_category: any): Observable<any> {
        return this._httpService.putRequest(`${environment.webApiUrl}/blog-category/Delete/${id_blog_category}`, null)
    }
}
