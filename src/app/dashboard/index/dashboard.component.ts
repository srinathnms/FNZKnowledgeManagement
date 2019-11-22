import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, animateChild, query, stagger, state } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IDashboardMenu } from 'src/app/model/dashboard';
import { IModalDialog } from 'src/app/model/modal-dialog';
import { DashboardService } from '../dashboard.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { environment } from 'src/environments/environment';
import { IDocument } from '../../model/document';
import { ReturnStatement } from '@angular/compiler';
import { IFinance } from 'src/app/model/finance';

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
    ]),
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter',
          [style({ opacity: 0 }), stagger('0.20s', animate('0.20s ease-out', style({ opacity: 1 })))],
          { optional: true }
        ),
        query(':leave',
          animate('200ms', style({ opacity: 0 })),
          { optional: true }
        )
      ])
    ]),
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})

export class DashboardComponent implements OnInit {
  finance: IFinance[];
  flip = 'inactive';
  graphContent: Highcharts.SeriesOptionsType[];
  selectedMenu: IDashboardMenu;
  selectedSubMenuId: number;
  dashboardMainMenus: IDashboardMenu[];
  dashboardMenus: IDashboardMenu[];
  docUrl: string;
  pdfSrc = '/assets/FNZSharepointcontent.pdf';
  constructor(private dashboardService: DashboardService, public dialog: MatDialog) {
    this.dashboardService.get('DashboardMenus')
      .subscribe((data: IDashboardMenu[]) => {
        this.dashboardMenus = data;
        this.dashboardMenus.forEach(c => { c.Flip = 'inactive'; });
        this.dashboardMainMenus = this.dashboardMenus && this.dashboardMenus.filter(c => c.ParentId === 0);
      });
  }

  ngOnInit(): void {
  }

  onMenuClick(dashboardMenu: IDashboardMenu): void {
    if (this.selectedMenu) {
      this.dashboardMenus.forEach(c => { c.Flip = 'inactive'; });
      this.selectedMenu = dashboardMenu;
      this.toggleFlip(dashboardMenu);
      return;
    }
    this.selectedMenu = dashboardMenu;
    this.toggleFlip(this.selectedMenu);
  }

  toggleFlip(dashboardMenu: IDashboardMenu) {
    const selectedMenu = this.dashboardMenus.filter(c => c.Id === dashboardMenu.Id)[0];
    if (selectedMenu.Flip === 'inactive') {
      selectedMenu.Flip = 'active';
      return;
    }
    selectedMenu.Flip = 'inactive';
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
    if (dashboardSubMenu.MenuContentType === 'Document') {
      const attachmentQuery = `(${dashboardSubMenu.Id})/AttachmentFiles`;
      this.dashboardService.getAttachment('DashboardMenus', attachmentQuery)
        .subscribe((document: IDocument) => {
          const documentUrl = `${environment.SHARE_POINT_URL}${document.ServerRelativeUrl}`;
          this.dashboardService.getDocument(documentUrl).subscribe((fileUrl: string) => {
            modalDialogData.content = {
              ServerRelativeUrl: fileUrl
            } as IDocument;
            modalDialogData.menuContentType = 'Document';
            this.openDialog(modalDialogData);
          });
        });
      return;
    }
    if (dashboardSubMenu.MenuContentType === 'Graph') {
      // const query = `?$filter=Year eq ${2016}`;
      this.dashboardService.get('FinanceChart')
        .subscribe((data: IFinance[]) => {
          modalDialogData.content = data;
          modalDialogData.menuContentType = 'Graph';
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
      height: '91%',
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
