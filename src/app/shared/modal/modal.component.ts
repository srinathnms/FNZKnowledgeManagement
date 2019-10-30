import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { IModalDialog } from '../../model/modal-dialog';
import { IDashboardMenu } from '../../model/dashboard';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: IModalDialog) {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
