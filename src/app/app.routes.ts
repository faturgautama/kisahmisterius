import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: async () => (await import('./pages/beranda/beranda.component')).BerandaComponent
    },
    {
        path: 'blogs/:blog_category',
        loadComponent: async () => (await import('./pages/beranda/beranda.component')).BerandaComponent
    },
    {
        path: 'blog/:id',
        loadComponent: async () => (await import('./pages/detail-blog/detail-blog.component')).DetailBlogComponent
    },
    {
        path: 'admin',
        loadChildren: async () => (await import('./pages/admin/admin.routes')).adminRoutes
    }
];
