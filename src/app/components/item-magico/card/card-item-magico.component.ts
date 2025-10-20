import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ItemMagico } from '../../../models/item-magico.model';
import { ItemMagicoService } from '../../../services/item-magico/item-magico.service';
import { DialogItemMagicoComponent } from '../dialog-item-magico/dialog-item-magico.component';
import { LucideAngularModule } from 'lucide-angular';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-card-item-magico',
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
  templateUrl: './card-item-magico.component.html',
  styleUrl: './card-item-magico.component.css',
})
export class CardItemMagicoComponent {
  @Input() item!: ItemMagico;
  @Output() itemExcluido = new EventEmitter<void>();
  constructor(public service: ItemMagicoService) {}
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogItemMagicoComponent, {
      data: {
        nome: this.item.nome,
        tipo: this.item.tipo,
        poder: this.item.poder,
        imagemUrl: this.item.imagemUrl,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const itemToUpdate: ItemMagico = {
          id: this.item.id,
          ...result,
        };
        this.atualizarItem(itemToUpdate);
      }
    });
  }

  openDialogConfirm(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.excluirItem();
      }
    });
  }

  excluirItem() {
    this.service.deletar(this.item.id).subscribe({
      next: () => {
        alert('Excluído!');
        this.itemExcluido.emit();
      },
      error: (err) => alert(err),
    });
  }

  atualizarItem(itemToUpdate: ItemMagico) {
    this.service.atualizar(itemToUpdate.id, itemToUpdate).subscribe({
      next: () => {
        this.item = itemToUpdate;
      },
      error: (err) => {
        console.error('Erro ao atualizar o item:', err);
      },
    });
  }
}
