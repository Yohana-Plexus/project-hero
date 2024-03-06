import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogConfirm } from '../../models/generic-dialog-params';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.sass',
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirm,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  close(action: boolean): void {
    this.dialogRef.close(action);
  }
}
