import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LandingComponent } from '../../components/layout/landing/landing.component';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { BlogModel } from '../../model/blog.model';
import { BlogService } from '../../services/blog.service';

@Component({
    selector: 'app-detail-blog',
    standalone: true,
    imports: [
        CommonModule,
        LandingComponent,
    ],
    templateUrl: './detail-blog.component.html',
    styleUrl: './detail-blog.component.scss'
})
export class DetailBlogComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Blog!: BlogModel.IBlog;

    OtherBlogs: BlogModel.IBlog[] = [];

    constructor(
        private _router: Router,
        private _blogService: BlogService,
        private _activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this._activatedRoute
            .params
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (Object.keys(result).length) {
                    this.getById(result['id']);
                    this.getAllBlog();
                }
            })
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getById(id: string) {
        this._blogService
            .getById(id)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.Blog = result;
            })
    }

    private getAllBlog() {
        this._blogService
            .getAll()
            .pipe(
                takeUntil(this.Destroy$),
                map((result) => {
                    return result.filter((item: any) => item.id_blog != this._activatedRoute.snapshot.params['id'])
                })
            )
            .subscribe((result) => {
                this.OtherBlogs = result;
            })
    }

    handleClickOtherBlog(args: any) {
        this._router.navigateByUrl(`blog/${args.id_blog}`);
    }
}
