import { Component, OnDestroy, OnInit } from '@angular/core';
import { LandingComponent } from "../../components/layout/landing/landing.component";
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { BlogModel } from '../../model/blog.model';
import { BlogCardsComponent } from "../../components/blog-cards/blog-cards.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-beranda',
    standalone: true,
    imports: [
        CommonModule,
        LandingComponent,
        BlogCardsComponent,
        InputTextModule,
    ],
    templateUrl: './beranda.component.html',
    styleUrl: './beranda.component.scss'
})
export class BerandaComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Blog: BlogModel.IBlog[] = [];

    Params: string = "Misteri";

    constructor(
        private _router: Router,
        private _blogService: BlogService,
        private _activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.getAllBlog();

        this._activatedRoute
            .params
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (Object.keys(result).length) {
                    this.getBlog(result['blog_category'], "");
                    this.Params = result['blog_category'];
                }
            })
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAllBlog() {
        this._blogService
            .getAll()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.Blog = result;
            })
    }

    getBlog(blog_category?: string, title?: string) {
        this._blogService
            .getBlog(blog_category, title)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.Blog = result;
            })
    }

    handleClickBlog(args: any) {
        this._router.navigateByUrl(`/blog/${args.id_blog}`);
    }
}
