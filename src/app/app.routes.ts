import { Routes } from '@angular/router';
import { PersonagemComponent } from './components/personagem/cadastro/personagem.component';
import { ItemMagicoComponent } from './components/item-magico/cadastro/item-magico.component';

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
