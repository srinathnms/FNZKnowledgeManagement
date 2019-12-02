import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/services/auth-interceptor.service';
import { SafePipe } from './safePipe/safe.pipe';
import { GraphComponent } from './graph/graph.component';
import { FileTextPipe } from './fileText/file-text.pipe';
import { ContactsComponent } from '../contacts/contacts.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        MatDialogModule
    ],
    declarations: [
    ],
    entryComponents: [
        ContactsComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
    ]
})
export class CoreModule { }
