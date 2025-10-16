import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Personagem } from '../../models/personagem.model';
import { CardPersonagemComponent } from "../card-personagem/card-personagem.component";

@Component({
  selector: 'app-personagem',
  standalone: true,
  imports: [FormsModule, CommonModule, CardPersonagemComponent, MatInputModule, MatIconModule,
    MatButtonModule, MatFormFieldModule, MatDividerModule, MatSelectModule],
  templateUrl: './personagem.component.html',
  styleUrl: './personagem.component.css'
})
export class PersonagemComponent {
  novoPersonagem = {
    id: 0,
    nome: '',
    raca: '',
    nivel: 0,
    corFundo: '',
    imagemUrl: ''
  }

  personagens: Personagem[] = [];
  racas = ['Humano', 'Elfo', 'Anão', 'Orc', 'Goblin', 'Troll'];

  salvarPersonagem() {
    if (this.novoPersonagem.nome
      && this.novoPersonagem.raca
      && this.novoPersonagem.nivel
      && this.novoPersonagem.imagemUrl) {

      const novoId = this.personagens.length > 0
        ? Math.max(...this.personagens.map(item => item.id)) + 1
        : 1;

      const personagemToAdd = { ...this.novoPersonagem, id: novoId };
      this.personagens.push(personagemToAdd);

      this.novoPersonagem = { id: 0, nome: '', raca: '', nivel: 0, corFundo: '', imagemUrl: '' };
    } else {
      alert('Por favor, preencha todos os campos antes de adicionar o item.');
    }
  }
}
