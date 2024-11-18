import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogCategoryService } from '../../../services/blog-category.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext'
import { DividerModule } from 'primeng/divider'
import { BlogCategoryModel } from '../../../model/blog-category.model';
import { Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        CommonModule,
        InputTextModule,
        DividerModule,
        SidebarModule
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

    BlogCategory: BlogCategoryModel.IBlogCategory[] = [];

    Destroy$ = new Subject();

    ShowSidebar = false;

    constructor(
        private _router: Router,
        private _blogCategoryService: BlogCategoryService
    ) { }

    ngOnInit(): void {
        this.getAllBlogCategory();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAllBlogCategory() {
        this._blogCategoryService
            .getAll()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.BlogCategory = result;
            })
    }

    handleClickCategory(blog_category?: string) {
        if (this.ShowSidebar) {
            this.ShowSidebar = false;
        }

        if (blog_category) {
            this._router.navigateByUrl(`blogs/${blog_category.toLowerCase()}`);
        } else {
            this._router.navigateByUrl(``);
        }
    }
}
