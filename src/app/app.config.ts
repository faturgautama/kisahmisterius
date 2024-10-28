import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        MessageService,
        CookieService,
    ]
};
