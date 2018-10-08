import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CombatComponent } from '@dm/combat/combat.component';
import { AttackComponent } from '@dm/combat/attack/attack.component';
import { InitiativeComponent } from '@dm/combat/initiative/initiative.component';
import { EnemiesComponent } from '@dm/combat/enemies/enemies.component';
import { SavingThrowComponent } from '@dm/combat/saving_throw/saving_throw.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    CombatComponent,
    AttackComponent,
    InitiativeComponent,
    EnemiesComponent,
    SavingThrowComponent
  ],
  exports: [CombatComponent]
})
export class CombatModule { }
