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
  MatBadgeModule,
} from '@angular/material';
// import { DragDropModule } from '@angular/cdk';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthInterceptor } from 'src/app/service/auth.service';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { DashboardService } from 'src/app/components/dashboard/dashboard.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';
import { SpinnerService } from 'src/app/core/spinner/spinner.service';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    DashboardComponent,
    ModalComponent,
    SpinnerComponent,
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
    MatBadgeModule,
    // DragDropModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    SpinnerService,
    DashboardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent
  ],
})
export class AppModule { }
