import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: async () => (await import('./pages/beranda/beranda.component')).BerandaComponent
    }
];
