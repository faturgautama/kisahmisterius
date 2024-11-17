import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpService } from '../../services/http.service';

@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [
        CommonModule,
        DialogModule,
        ProgressSpinnerModule
    ],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnDestroy {

    Destroy$ = new Subject();

    Visible = false;

    constructor(
        private _httpService: HttpService
    ) {
        this._httpService
            .ShowLoading$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.Visible = result;
            })
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

}
