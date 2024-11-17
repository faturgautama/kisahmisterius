import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { BlogCategoryService } from './services/blog-category.service';
import { BlogService } from './services/blog.service';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { LoadingComponent } from './components/loading/loading.component';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        HttpClientModule,
        ToastModule,
        ProgressBarModule,
        LoadingComponent,
    ],
    providers: [
        BlogService,
        BlogCategoryService,
        MessageService,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

    Destroy = new Subject();

    title = 'kisahmisterius';

    constructor(
        private _blogService: BlogService,
        private _blogCategoryService: BlogCategoryService,
    ) { }

    ngOnInit(): void {
        // AOS.init();
        // this.getAllData();
    }

    ngOnDestroy(): void {
        this.Destroy.next(0);
        this.Destroy.complete();
    }

    private getAllData() {
        this._blogService
            .getAll()
            .pipe(takeUntil(this.Destroy))
            .subscribe((result) => {
                console.log("blog =>", result.data);
            })

        this._blogCategoryService
            .getAll()
            .pipe(takeUntil(this.Destroy))
            .subscribe((result) => {
                console.log("blog category =>", result.data);
            })
    }
}
