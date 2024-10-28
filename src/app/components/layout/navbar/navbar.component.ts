import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogCategoryService } from '../../../services/blog-category.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext'
import { DividerModule } from 'primeng/divider'

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        CommonModule,
        InputTextModule,
        DividerModule
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

    BlogCategory$ = this._blogCategoryService.BlogCategory$;

    Destroy$ = new Subject();

    constructor(
        private _blogCategoryService: BlogCategoryService
    ) { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
