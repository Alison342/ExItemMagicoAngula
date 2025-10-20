import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Personagem } from '../../../models/personagem.model';
import { PersonagemService } from '../../../services/personagem/personagem.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPersonagemComponent } from '../dialog-personagem/dialog-personagem.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LucideAngularModule } from 'lucide-angular';
import { DialogConfirmComponent } from '../../ui/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-card-personagem',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LucideAngularModule,
  ],
  templateUrl: './card-personagem.component.html',
  styleUrl: './card-personagem.component.css',
})
export class CardPersonagemComponent {
  @Input() personagem!: Personagem;
  @Output() personagemExcluido = new EventEmitter<void>();
  constructor(public service: PersonagemService) {}
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPersonagemComponent, {
      data: {
        nome: this.personagem.nome,
        raca: this.personagem.raca,
        nivel: this.personagem.nivel,
        corFundo: this.personagem.corFundo,
        imagemUrl: this.personagem.imagemUrl,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const personagemToUpdate: Personagem = {
          id: this.personagem.id,
          ...result,
        };
        this.atualizarPersonagem(personagemToUpdate);
      }
    });
  }

  openDialogConfirm(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.excluirPersonagem();
      }
    });
  }

  excluirPersonagem() {
    this.service.deletar(this.personagem.id).subscribe({
      next: () => {
        alert('Excluído!');
        this.personagemExcluido.emit();
      },
      error: (err) => alert(err),
    });
  }

  atualizarPersonagem(personagemToUpdate: Personagem) {
    this.service
      .atualizar(personagemToUpdate.id, personagemToUpdate)
      .subscribe({
        next: () => {
          this.personagem = personagemToUpdate;
        },
        error: (err) => {
          console.error('Erro ao atualizar o personagem:', err);
        },
      });
  }
}
