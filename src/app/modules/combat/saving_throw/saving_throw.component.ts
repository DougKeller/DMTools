import { Component } from '@angular/core';
import { Monster } from '@dm/common/models/monster';
import { MonsterService } from '@dm/common/services/monster.service';
import { ABILITIES } from '@dm/constants/abilities';
import { SavingThrowResultComponent } from '@dm/combat/saving_throw/result/result.component';

@Component({
  selector: 'dm-combat-saving-throw',
  templateUrl: './saving_throw.component.html'
})
export class SavingThrowComponent {
  options: Object;

  private resultsView: SavingThrowResultComponent;

  ngOnInit(): void {
    this.options = {
      savingThrow: 15,
      ability: ABILITIES[0],
      groups: []
    };
  }
}
