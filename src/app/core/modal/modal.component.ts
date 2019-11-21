import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IModalDialog } from 'src/app/model/modal-dialog';
import { IDocument } from 'src/app/model/document';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  isDocument: boolean;
  isGraph: boolean;
  pdfSrc = '/assets/FNZSharepointcontent.pdf';
  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: IModalDialog) {
    debugger;
    this.isDocument = data.menuContentType === 'Document';
    this.isGraph = data.menuContentType === 'Graph';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
