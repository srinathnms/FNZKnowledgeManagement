import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IModalDialog } from 'src/app/model/modal-dialog';
import { MenuContentTypes } from 'src/app/model/enum/menuContentTypes';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  menuContentType: MenuContentTypes;

  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: IModalDialog) {
    dialogRef.disableClose = true;
    this.menuContentType = data.menuContentType;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
