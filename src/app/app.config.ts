import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  MAT_NATIVE_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getMaterialPaginatorTranslations } from './shared/utilities/material-paginator-translations';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { TransformDateService } from './shared/services/transform-date.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNativeDateAdapter(MAT_NATIVE_DATE_FORMATS),
    provideAnimationsAsync(),
    importProvidersFrom(
      ToastrModule.forRoot({
        preventDuplicates: true,
      })
    ),
    { provide: MatPaginatorIntl, useValue: getMaterialPaginatorTranslations() },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { maxWidth: '700px', width: '95vw', padding: '40px' },
    },
    { provide: LOCALE_ID, useValue: 'es' },
    provideHttpClient(),
    /* 
    TODO: Habilitar interceptores cuando se creen 
    withInterceptors([authInterceptor, notificationsInterceptor])
    */
    TransformDateService,
  ],
};
