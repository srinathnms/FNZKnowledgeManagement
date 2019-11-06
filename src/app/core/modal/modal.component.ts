import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IModalDialog } from 'src/app/model/modal-dialog';
import { IDocument } from 'src/app/model/document';
import { IDashboardMenu } from 'src/app/model/dashboard';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: IModalDialog) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
