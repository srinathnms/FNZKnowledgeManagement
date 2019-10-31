import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, animateChild, query, stagger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { IDashboardMenu } from '../../model/dashboard';
import { IModalDialog } from '../../model/modal-dialog';
import { DashboardService } from '../../service/dashboard.service';
import { ModalComponent } from '../../shared/modal/modal.component';

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
        this.dashboardMainMenus = this.dashboardMenus && this.dashboardMenus.filter(c => c.parentId === 0);
      });
  }

  ngOnInit(): void {
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.dashboardMainMenus, event.previousIndex, event.currentIndex);
  // }

  onMenuClick(dashboardMenu: IDashboardMenu): void {
    if (this.selectedMenuId === dashboardMenu.id) {
      this.selectedMenuId = null;
      this.selectedSubMenuId = null;
      return;
    }
    this.selectedMenuId = dashboardMenu.id;
  }

  onSubMenuClick(dashboardSubMenu: IDashboardMenu): void {
    this.selectedSubMenuId = dashboardSubMenu.id;
    const modalDialogData = {
      header: dashboardSubMenu.menuName,
      content: this.dashboardMainMenus,
      footer: "Close",
      // menuList: this.dashboardMainMenus,
      // document: { documentPath: "https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.docx", viewer: 'google' }
    } as IModalDialog
    this.openDialog(modalDialogData);
  }

  getSubMenus(dashboardMenu: IDashboardMenu): IDashboardMenu[] {
    const subMenus = this.dashboardMenus && this.dashboardMenus.filter(c => c.parentId === dashboardMenu.id);
    return subMenus;
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
    const menu = { menuName: 'Test', parentId: 0 } as IDashboardMenu;
    this.dashboardService.post(menu).subscribe();
  }

  onMenuRemove(dashboardMenu: IDashboardMenu) {
    this.dashboardService.delete(dashboardMenu.id).subscribe();
  }
}
