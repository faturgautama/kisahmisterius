import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
            .getRequest(`${environment.webApiUrl}/blog.json`)
            .pipe(
                map((obj: any) =>
                    Object.entries(obj).map(([key, val]) => ({
                        ...val as any,
                        id_blog: key
                    }))
                )
            )
    }

    create(payload: any): Observable<any> {
        return this._httpService.postRequest(`${environment.webApiUrl}/blog.json`, payload)
    }

    update(payload: any): Observable<any> {
        return this._httpService.putRequest(`${environment.webApiUrl}/blog/${payload.id_blog}.json`, payload)
    }

    delete(id_blog: any): Observable<any> {
        return this._httpService.deleteRequest(`${environment.webApiUrl}/blog/${id_blog}.json`)
    }
}
