import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, animateChild, query, stagger } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IDashboardMenu } from 'src/app/model/dashboard';
import { IModalDialog } from 'src/app/model/modal-dialog';
import { DashboardService } from './dashboard.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { environment } from 'src/environments/environment';
import { IJoiningFormalityMenu } from '../model/JoiningFormalityMenu';
import { IDocument } from '../model/document';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items',
          stagger(300, animateChild())
        ),
      ]),
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
      ]),
    ])
  ]
})

export class DashboardComponent implements OnInit {
  selectedMenuId: number;
  selectedSubMenuId: number;
  dashboardMainMenus: IDashboardMenu[];
  dashboardMenus: IDashboardMenu[];

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) {
    this.dashboardService.get()
      .subscribe((data: IDashboardMenu[]) => {
        this.dashboardMenus = data;
        this.dashboardMainMenus = this.dashboardMenus && this.dashboardMenus.filter(c => c.ParentId === 0);
      });
  }

  ngOnInit(): void {
  }

  onMenuClick(dashboardMenu: IDashboardMenu): void {
    if (this.selectedMenuId === dashboardMenu.Id) {
      this.selectedMenuId = null;
      this.selectedSubMenuId = null;
      return;
    }
    this.selectedMenuId = dashboardMenu.Id;
  }

  onSubMenuClick(dashboardSubMenu: IDashboardMenu): void {
    if (dashboardSubMenu.MenuName == "Workforce Joining Formality") {
      this.getJoiningFormalityMenus(dashboardSubMenu.MenuName);
      return;
    }
    this.selectedSubMenuId = dashboardSubMenu.Id;
    this.updateModalDialogDataModel(dashboardSubMenu.MenuName, {
      documentPath: `${environment.BASE_URL}/Shared/Documents/DashboardContent.pptx`,
      viewer: 'google'
    });
  }

  public getJoiningFormalityMenus(heading: string): void {
    this.dashboardService.getJoiningFormalityMenus()
      .subscribe((data: IJoiningFormalityMenu[]) => {
        this.updateModalDialogDataModel(heading, data);
      });
  }

  getSubMenus(dashboardMenu: IDashboardMenu): IDashboardMenu[] {
    const subMenus = this.dashboardMenus && this.dashboardMenus.filter(c => c.ParentId === dashboardMenu.Id);
    return subMenus;
  }

  updateModalDialogDataModel(heading: string, data: IJoiningFormalityMenu[] | IDocument): void {
    const modalDialogData = {
      header: heading,
      content: data,
      footer: 'Close',
    } as IModalDialog;
    this.openDialog(modalDialogData);
  }

  openDialog(modalDialogData: IModalDialog): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '80%',
      width: '80%',
      data: modalDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedSubMenuId = null;
    });
  }

  onMenuAdd(): void {
    const menu = { MenuName: 'Test', ParentId: 0 } as IDashboardMenu;
    // this.dashboardService.post(menu).subscribe();
  }

  onMenuRemove(dashboardMenu: IDashboardMenu) {
    // this.dashboardService.delete(dashboardMenu.id).subscribe();
  }
}
