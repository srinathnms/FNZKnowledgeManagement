import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, animateChild, query, stagger } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IDashboardMenu } from 'src/app/model/dashboard';
import { IModalDialog } from 'src/app/model/modal-dialog';
import { DashboardService } from './dashboard.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { environment } from 'src/environments/environment';
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
  docUrl: string;

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) {
    this.dashboardService.get('DashboardMenus')
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
      return;
    }
    this.selectedMenuId = dashboardMenu.Id;
  }

  onSubMenuHover(dashboardSubMenu: IDashboardMenu): void {
    if (this.selectedSubMenuId === dashboardSubMenu.Id) {
      this.selectedSubMenuId = null;
      return;
    }
    this.selectedSubMenuId = dashboardSubMenu.Id;
  }

  onSubMenuClick(dashboardSubMenu: IDashboardMenu): void {
    const modalDialogData = {
      header: dashboardSubMenu.MenuName,
      footer: 'Close',
    } as IModalDialog;
    const hasAttachment = dashboardSubMenu.Attachments;
    if (hasAttachment) {
      const attachmentQuery = `(${dashboardSubMenu.Id})/AttachmentFiles`;
      this.dashboardService.getAttachment('DashboardMenus', attachmentQuery)
        .subscribe((document: IDocument) => {
          modalDialogData.content = {
            ServerRelativeUrl: `${environment.SHARE_POINT_URL}${document.ServerRelativeUrl}?web=1`
          } as IDocument;
          this.openDialog(modalDialogData);
        });
      return;
    }
    modalDialogData.content = this.dashboardMenus && this.dashboardMenus.filter(c => c.ParentId === dashboardSubMenu.Id);
    this.openDialog(modalDialogData);
  }

  getSubMenus(dashboardMenu: IDashboardMenu): IDashboardMenu[] {
    const subMenus = this.dashboardMenus && this.dashboardMenus.filter(c => c.ParentId === dashboardMenu.Id);
    return subMenus;
  }

  openDialog(modalDialogData: IModalDialog): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '90%',
      width: '90%',
      minHeight: '600px',
      data: modalDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedSubMenuId = null;
    });
  }

  onMenuAdd(): void {
    const menu = { MenuName: 'Test', ParentId: 0 } as IDashboardMenu;
  }

  onMenuRemove(dashboardMenu: IDashboardMenu) {
    // this.dashboardService.delete(dashboardMenu.id).subscribe();
  }
}
