import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastModule,
        ProgressBarModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

    title = 'kisahmisterius';

    constructor() { }

    ngOnInit(): void {
        AOS.init();
    }

    ngOnDestroy(): void {

    }
}
