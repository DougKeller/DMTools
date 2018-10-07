import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CombatComponent } from '@dm/combat/combat.component';
import { EncounterComponent } from '@dm/combat/encounter/encounter.component';
import { EncounterFormComponent } from '@dm/combat/encounter/form/form.component';
import { AttackComponent } from '@dm/combat/attack/attack.component';
import { AttackFormComponent } from '@dm/combat/attack/form/form.component';
import { InitiativeComponent } from '@dm/combat/initiative/initiative.component';
import { SidebarComponent } from '@dm/combat/sidebar/sidebar.component';
import { SavingThrowComponent } from '@dm/combat/saving_throw/saving_throw.component';
import { SavingThrowFormComponent } from '@dm/combat/saving_throw/form/form.component';
import { SavingThrowResultComponent } from '@dm/combat/saving_throw/result/result.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    CombatComponent,
    EncounterComponent,
    EncounterFormComponent,
    AttackComponent,
    AttackFormComponent,
    InitiativeComponent,
    SidebarComponent,
    SavingThrowComponent,
    SavingThrowFormComponent,
    SavingThrowResultComponent
  ],
  exports: [CombatComponent]
})
export class CombatModule { }
