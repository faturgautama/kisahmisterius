import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogModel } from '../../model/blog.model';

@Component({
    selector: 'app-blog-cards',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './blog-cards.component.html',
    styleUrl: './blog-cards.component.scss'
})
export class BlogCardsComponent implements OnInit {

    @Input('props') props!: BlogModel.IBlog;

    @Output('onClick') onClick = new EventEmitter<BlogModel.IBlog>();

    constructor() { }

    ngOnInit(): void {

    }

    handleClick(data: BlogModel.IBlog) {
        this.onClick.emit(data);
    }
}
