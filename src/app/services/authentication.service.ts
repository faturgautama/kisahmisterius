import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private _httpService: HttpService,
    ) { }

    login(payload: any) {
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxb1jXcBXQUlLPN3eO1GZ5GE1cerIUfVo";
        return this._httpService.postRequest(url, payload);
    }
}
