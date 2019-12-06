import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IModalDialog } from 'src/app/model/modal-dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  isDocument: boolean;
  isGraph: boolean;
  isTeamView: boolean;
  isGlossary: boolean;

  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: IModalDialog) {
    this.isDocument = data.menuContentType === 'Document';
    this.isGraph = data.menuContentType === 'Graph';
    this.isTeamView = data.header === 'Team View';
    this.isGlossary = data.menuContentType === 'Glossary';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
