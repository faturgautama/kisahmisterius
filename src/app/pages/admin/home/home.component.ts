import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardComponent } from '../../../components/dashboard/dashboard.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TableModule } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from '../../../services/blog.service';
import { BlogCategoryService } from '../../../services/blog-category.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogCategoryModel } from '../../../model/blog-category.model';
import { BlogModel } from '../../../model/blog.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        DashboardComponent,
        ButtonModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        EditorModule,
        TableModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    PageState: 'category' | 'blog' = 'category';

    FormState: 'insert' | 'update' = 'insert';

    ShowDialogFormBlogCategory = false;
    FormBlogCategory: FormGroup;

    ShowDialogFormBlog = false;
    FormBlog: FormGroup;

    BlogCategoryDatasource: BlogCategoryModel.IBlogCategory[] = [];
    BlogDatasource: BlogModel.IBlog[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _blogService: BlogService,
        private _messageService: MessageService,
        private _blogCategoryService: BlogCategoryService,
    ) {
        this.FormBlogCategory = this._formBuilder.group({
            id_blog_category: ['', []],
            blog_category: ['', [Validators.required]],
        });

        this.FormBlog = this._formBuilder.group({
            id_blog: ['', []],
            id_blog_category: ['', []],
            blog_category: ['', []],
            title: ['', []],
            content: ['', []],
            image: ['', []],
            location: ['', []],
            created_at: ['', []],
            updated_at: ['', []],
            is_active: [true, []],
        });
    }

    ngOnInit(): void {
        this.getAllBlogCategory();
        this.getAllBlog();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete()
    }

    private getAllBlogCategory() {
        this._blogCategoryService
            .getAll()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                console.log("result =>", result);
                this.BlogCategoryDatasource = result;
            })
    }

    private getAllBlog() {
        this._blogService
            .getAll()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.BlogDatasource = result;
            })
    }

    private onResetForm() {
        this.FormState = 'insert';

        if (this.PageState == 'category') {
            this.ShowDialogFormBlogCategory = false;
        } else {
            this.ShowDialogFormBlog = false;
        }

        this.FormBlogCategory = this._formBuilder.group({
            id_blog_category: ['', []],
            blog_category: ['', [Validators.required]],
        });

        this.FormBlog = this._formBuilder.group({
            id_blog: ['', []],
            id_blog_category: ['', []],
            blog_category: ['', []],
            title: ['', []],
            content: ['', []],
            image: ['', []],
            location: ['', []],
            created_at: ['', []],
            updated_at: ['', []],
            is_active: [true, []],
        });
    }

    handleSaveBlogCategory(data: any) {
        this._blogCategoryService
            .create(data)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil disimpan' });
                    this.getAllBlogCategory();
                    this.onResetForm();
                }
            })
    }

    handleClickEditCategory(data: any) {
        this.FormBlogCategory.patchValue(data);
        this.FormState = 'update';
        setTimeout(() => {
            this.ShowDialogFormBlogCategory = true;
        }, 500);
    }

    handleUpdateBlogCategory(data: any) {
        this._blogCategoryService
            .update(data)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil diperbarui' });
                    this.getAllBlogCategory();
                    this.onResetForm();
                }
            })
    }

    handleDeleteBlogCategory(id_blog_category: string) {
        this._blogCategoryService
            .delete(id_blog_category)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this._messageService.clear();
                this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil dihapus' });
                this.getAllBlogCategory();
            })
    }

    handleSaveBlog(data: any) {
        this._blogService
            .create(data)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil disimpan' });
                    this.getAllBlog();
                    this.onResetForm();
                }
            })
    }

    handleClickEdit(data: any) {
        this.FormBlog.patchValue(data);
        this.FormState = 'update';
        setTimeout(() => {
            this.ShowDialogFormBlog = true;
        }, 500);
    }

    handleUpdateBlog(data: any) {
        this._blogService
            .update(data)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil diperbarui' });
                    this.getAllBlog();
                    this.onResetForm();
                }
            })
    }

    handleDeleteBlog(id_blog: string) {
        this._blogService
            .delete(id_blog)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this._messageService.clear();
                this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil dihapus' });
                this.getAllBlog();
            })
    }
}
