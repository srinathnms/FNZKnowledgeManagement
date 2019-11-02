import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import { DashboardComponent } from './dashboard.component';
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
        RouterModule.forChild(routers)
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DashboardModule { }
