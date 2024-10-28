import { Component } from '@angular/core';
import { LandingComponent } from "../../components/layout/landing/landing.component";

@Component({
    selector: 'app-beranda',
    standalone: true,
    imports: [LandingComponent],
    templateUrl: './beranda.component.html',
    styleUrl: './beranda.component.scss'
})
export class BerandaComponent {

}
