import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss',
})
export class DialogConfirmComponent {
  readonly dialogRef = inject(MatDialogRef<DialogConfirmComponent>);

  onSimClick(): void {
    this.dialogRef.close(true);
  }

  onCancelarClick(): void {
    this.dialogRef.close();
  }
}
