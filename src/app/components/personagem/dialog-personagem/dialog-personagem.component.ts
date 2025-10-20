import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

interface DialogDataPersonagem {
  nome: string;
  raca: string;
  nivel: number;
  corFundo: string;
  imagemUrl: string;
}

@Component({
  selector: 'app-dialog-personagem',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './dialog-personagem.component.html',
  styleUrl: './dialog-personagem.component.scss',
})
export class DialogPersonagemComponent {
  constructor() {}
  readonly dialogRef = inject(MatDialogRef<DialogPersonagemComponent>);
  readonly data = inject<DialogDataPersonagem>(MAT_DIALOG_DATA);
  racas = ['Humano', 'Elfo', 'Anão', 'Orc', 'Goblin', 'Troll'];

  onConfirmarClick(): void {
    this.dialogRef.close(this.data);
  }

  onCancelarClick(): void {
    this.dialogRef.close();
  }
}
