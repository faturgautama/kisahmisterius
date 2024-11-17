import { Routes } from "@angular/router";

export const adminRoutes: Routes = [
    {
        path: 'login',
        loadComponent: async () => (await import('./authentication/authentication.component')).AuthenticationComponent
    },
    {
        path: 'beranda',
        loadComponent: async () => (await import('./home/home.component')).HomeComponent
    },
];