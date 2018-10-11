import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombatComponent} from '@dm/combat/combat.component';

const routes: Routes = [
  { path: '', redirectTo: '/combat', pathMatch: 'full' },
  { path: 'combat', component: CombatComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
