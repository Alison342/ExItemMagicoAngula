import { Component, Input } from '@angular/core';
import { ItemMagico } from '../../models/item-magico.model';

@Component({
  selector: 'app-card-item-magico',
  standalone: true,
  imports: [],
  templateUrl: './card-item-magico.component.html',
  styleUrl: './card-item-magico.component.css'
})
export class CardItemMagicoComponent {
  @Input() item!: ItemMagico;
}
