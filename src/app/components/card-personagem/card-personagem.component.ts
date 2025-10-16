import { Component, Input } from '@angular/core';
import { Personagem } from '../../models/personagem.model';

@Component({
  selector: 'app-card-personagem',
  standalone: true,
  imports: [],
  templateUrl: './card-personagem.component.html',
  styleUrl: './card-personagem.component.css'
})
export class CardPersonagemComponent {
  @Input() personagem!: Personagem;
}
