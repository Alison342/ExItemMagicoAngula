import { Routes } from '@angular/router';
import { PersonagemComponent } from './components/personagem/personagem.component';
import { ItemMagicoComponent } from './components/item-magico/item-magico.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'personagem',
        pathMatch: 'full'
    },
    {
        path: 'personagem',
        component: PersonagemComponent
    },
    {
        path: 'item-magico',
        component: ItemMagicoComponent
    }
];
