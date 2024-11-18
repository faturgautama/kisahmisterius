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
                map((obj: any) => {
                    let result = [];

                    if (obj) {
                        result = Object.entries(obj).map(([key, val]) => ({
                            ...val as any,
                            id_blog: key
                        }));

                    };

                    return result;
                })
            )
    }

    getBlog(blog_category?: string, title?: string): Observable<any> {
        return this._httpService
            .getRequest(`${environment.webApiUrl}/blog.json`)
            .pipe(
                map((obj: any) => {
                    let result = [];

                    if (obj) {
                        const data = Object.entries(obj).map(([key, val]) => ({
                            ...val as any,
                            id_blog: key
                        }));

                        if (!title && blog_category) {
                            result = [...data].filter((item: any) => {
                                return item.blog_category.toLowerCase() == blog_category.toLowerCase();
                            });
                        };

                        if (title && !blog_category) {
                            result = [...data].filter((item: any) => {
                                return item.title.toLowerCase().includes(title.toLowerCase());
                            });
                        };

                        if (!title && !blog_category) {
                            result = data;
                        }
                    };

                    return result;
                })
            )
    }

    getById(id: string): Observable<any> {
        return this._httpService.getRequest(`${environment.webApiUrl}/blog/${id}.json`);
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
