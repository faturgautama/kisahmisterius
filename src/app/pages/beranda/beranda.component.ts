import { Component, OnDestroy, OnInit } from '@angular/core';
import { LandingComponent } from "../../components/layout/landing/landing.component";
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from '../../services/blog.service';

@Component({
    selector: 'app-beranda',
    standalone: true,
    imports: [LandingComponent],
    templateUrl: './beranda.component.html',
    styleUrl: './beranda.component.scss'
})
export class BerandaComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Blog$ = this._blogService
        .Blog$
        .pipe(takeUntil(this.Destroy$));

    constructor(
        private _blogService: BlogService
    ) { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
