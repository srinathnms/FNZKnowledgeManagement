import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

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
    MatExpansionModule,
} from '@angular/material';

import { DashboardComponent } from './index/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routers: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
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
        MatExpansionModule,
        RouterModule.forChild(routers)
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        // Other providers suppressed
      ],
})
export class DashboardModule { }
