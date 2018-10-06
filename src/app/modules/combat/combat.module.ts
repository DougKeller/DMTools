import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CombatComponent } from '@dm/combat/combat.component';
import { InitiativeComponent } from '@dm/combat/initiative/initiative.component';
import { SidebarComponent } from '@dm/combat/sidebar/sidebar.component';
import { SavingThrowComponent } from '@dm/combat/saving_throw/saving_throw.component';
import { SavingThrowFormComponent } from '@dm/combat/saving_throw/form/form.component';
import { SavingThrowResultComponent } from '@dm/combat/saving_throw/result/result.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    CombatComponent,
    InitiativeComponent,
    SidebarComponent,
    SavingThrowComponent,
    SavingThrowFormComponent,
    SavingThrowResultComponent
  ],
  exports: [CombatComponent]
})
export class CombatModule { }
