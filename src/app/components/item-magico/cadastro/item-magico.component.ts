import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ItemMagico } from '../../../models/item-magico.model';
import { CardItemMagicoComponent } from '../card/card-item-magico.component';
import { ItemMagicoService } from '../../../services/item-magico/item-magico.service';

@Component({
  selector: 'app-item-magico',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CardItemMagicoComponent,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSelectModule,
  ],
  templateUrl: './item-magico.component.html',
  styleUrl: './item-magico.component.css',
})
export class ItemMagicoComponent {
  novoItem: ItemMagico = {
    id: '',
    nome: '',
    tipo: '',
    poder: 0,
    imagemUrl: '',
  };

  tipos = ['Arma', 'Armadura', 'Poção', 'Anel', 'Amuleto', 'Pergaminho'];
  itens: ItemMagico[] = [];
  carregando: boolean = true;
  erro: string | null = null;
  filtroNome: string = '';

  constructor(private service: ItemMagicoService) {}

  ngOnInit(): void {
    this.buscarItens();
  }

  buscarItens() {
    this.service.listar().subscribe({
      next: (dados) => {
        this.itens = dados;
        this.carregando = false;
      },
      error: (err) => {
        (this.erro = err.message), (this.carregando = false);
      },
    });
  }

  salvarItem() {
    if (
      this.novoItem.nome &&
      this.novoItem.tipo &&
      this.novoItem.poder &&
      this.novoItem.imagemUrl
    ) {
      const novoId =
        this.itens.length > 0
          ? Math.max(...this.itens.map((item) => Number.parseInt(item.id))) + 1
          : 1;

      const itemToAdd = { ...this.novoItem, id: novoId.toString() };

      this.service.salvar(itemToAdd).subscribe({
        next: () => {
          this.buscarItens();
        },
        error: (err) => {
          (this.erro = err.message), (this.carregando = false);
        },
      });

      this.novoItem = { id: '', nome: '', tipo: '', poder: 0, imagemUrl: '' };
    } else {
      alert('Por favor, preencha todos os campos antes de adicionar o item.');
    }
  }

  itensFiltrados(): ItemMagico[] {
    if (!this.filtroNome) return this.itens;
    const nomeLower = this.filtroNome.toLowerCase();
    return this.itens.filter((item) =>
      item.nome.toLowerCase().includes(nomeLower)
    );
  }
}
