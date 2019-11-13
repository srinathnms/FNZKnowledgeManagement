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
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from 'src/app/services/auth-interceptor.service';
import { SafePipe } from 'src/app/core/safePipe/safe.pipe';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { CoreModule } from './core/core.module';
import { TeamViewComponent } from 'src/app/about/team-view/team-view.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ModalComponent,
    HeaderComponent,
    SafePipe,
    TeamViewComponent
  ],
  imports: [
    ChartsModule,
    FormsModule,
    // CoreModule,
    AppRoutingModule,
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
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,TeamViewComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
})
export class AppModule { }
