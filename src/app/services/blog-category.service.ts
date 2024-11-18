import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
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
            .getRequest(`${environment.webApiUrl}/blogCategory.json`)
            .pipe(
                map((obj: any) => {
                    if (obj) {
                        return Object.entries(obj).map(([key, val]) => ({
                            ...val as any,
                            id_blog: key
                        }))
                    } else {
                        return [];
                    }
                })
            )
    }

    create(payload: any): Observable<any> {
        return this._httpService.postRequest(`${environment.webApiUrl}/blogCategory.json`, payload)
    }

    update(payload: any): Observable<any> {
        return this._httpService.putRequest(`${environment.webApiUrl}/blogCategory/${payload.id_blog_category}.json`, payload)
    }

    delete(id_blog_category: any): Observable<any> {
        return this._httpService.deleteRequest(`${environment.webApiUrl}/blogCategory/${id_blog_category}.json`)
    }
}
