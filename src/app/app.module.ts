import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MatTooltipModule,
  MatButtonModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatListModule,
  MatChipsModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatFormFieldModule,
} from '@angular/material';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './service/loader.service';
import { LoaderInterceptor } from './service/loader.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardService } from '../app/service/dashboard.service';
import { ModalComponent } from './shared/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    DashboardComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxDocViewerModule,
    MatTooltipModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    LoaderService,
    DashboardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent
  ],
})
export class AppModule { }
