import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

export interface PopupData {
  label: string;
  text: string;
}

@Component({
  selector: 'popup-modal',
  templateUrl: './popup-modal.component.html',
  entryComponents: []
})

export class PopupModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
