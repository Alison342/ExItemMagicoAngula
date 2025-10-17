import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DialogData } from '../card/card-item-magico.component';

@Component({
  selector: 'app-dialog-item-magico',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormField, MatLabel, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './dialog-item-magico.component.html',
  styleUrl: './dialog-item-magico.component.scss'
})
export class DialogItemMagicoComponent {
  constructor() { }
  readonly dialogRef = inject(MatDialogRef<DialogItemMagicoComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  tipos = ['Arma', 'Armadura', 'Poção', 'Anel', 'Amuleto', 'Pergaminho'];

  onCancelarClick(): void {
    this.dialogRef.close();
  }

  onConfirmarClick(): void {
    this.dialogRef.close(this.data);
  }
}
