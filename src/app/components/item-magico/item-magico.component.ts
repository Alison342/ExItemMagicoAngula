import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ItemMagico } from '../../models/item-magico.model';
import { CardItemMagicoComponent } from "../card-item-magico/card-item-magico.component";

@Component({
  selector: 'app-item-magico',
  standalone: true,
  imports: [FormsModule, CommonModule, CardItemMagicoComponent, MatInputModule, MatIconModule,
    MatButtonModule, MatFormFieldModule, MatDividerModule, MatSelectModule],
  templateUrl: './item-magico.component.html',
  styleUrl: './item-magico.component.css'
})
export class ItemMagicoComponent {
  novoItem: ItemMagico = {
    id: 0,
    nome: '',
    tipo: '',
    poder: 0,
    imagemUrl: ''
  }

  tipos = ['Arma', 'Armadura', 'Poção', 'Anel', 'Amuleto', 'Pergaminho'];
  itens: ItemMagico[] = [];

  salvarItem() {
    if (this.novoItem.nome
      && this.novoItem.tipo
      && this.novoItem.poder
      && this.novoItem.imagemUrl) {

      const novoId = this.itens.length > 0
        ? Math.max(...this.itens.map(item => item.id)) + 1
        : 1;

      const itemToAdd = { ...this.novoItem, id: novoId };
      this.itens.push(itemToAdd);

      this.novoItem = { id: 0, nome: '', tipo: '', poder: 0, imagemUrl: '' };
    } else {
      alert('Por favor, preencha todos os campos antes de adicionar o item.');
    }
  }
}
