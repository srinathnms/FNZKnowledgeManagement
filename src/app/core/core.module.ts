import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/services/auth-interceptor.service';
import { SafePipe } from './safePipe/safe.pipe';
import { GraphComponent } from './graph/graph.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [SafePipe, GraphComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
    ]
})
export class CoreModule { }
