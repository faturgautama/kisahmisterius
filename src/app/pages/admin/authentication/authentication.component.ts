import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-authentication',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule
    ],
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Form: FormGroup

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _messageService: MessageService,
        private _authenticationService: AuthenticationService
    ) {
        this.Form = this._formBuilder.group({
            email: ['superadmin@email.com', [Validators.email, Validators.required]],
            password: ['Kisahmisterius2024_', [Validators.required]],
        })
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleLogin() {
        this._authenticationService
            .login(this.Form.value)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                console.log(result);

                if (result) {
                    localStorage.setItem('_KMUSER_', JSON.stringify(result));
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Login berhasil' });

                    setTimeout(() => {
                        this._router.navigateByUrl('/admin/beranda');
                    }, 1000);
                } else {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'error', summary: 'Oops', detail: 'Login gagal' });
                }
            })
    }
}
