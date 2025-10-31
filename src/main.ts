import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { AuthInterceptor } from './app/core/service/interceptors/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ...(appConfig.providers || [])
  ]
}).catch(err => console.error('❌ Bootstrap failed:', err));
