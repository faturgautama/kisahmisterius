import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        // loadComponent: async () => (await import('./pages/beranda/beranda.component')).BerandaComponent
        loadChildren: async () => (await import('./pages/admin/admin.routes')).adminRoutes
    },
    {
        path: 'admin',
        loadChildren: async () => (await import('./pages/admin/admin.routes')).adminRoutes
    }
];
