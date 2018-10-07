import { Component } from '@angular/core';
import { Dice } from '@dm/common/models/dice';
import { ROLL_TYPES } from '@dm/constants/roll_types';

interface Results {
  hit: number;
  criticallyHit: number;
  miss: number;
  criticallyMiss: number;
}

@Component({
  selector: 'attack',
  templateUrl: './attack.component.html'
})
export class AttackComponent {
  modifier: number;
  quantity: number;
  armorClass: number;
  rollType: string;

  results: Results;

  rollTypesConstant = ROLL_TYPES;

  ngOnInit(): void {
    this.modifier = 0;
    this.quantity = 1;
    this.armorClass = 15;
    this.rollType = this.rollTypesConstant.NORMAL;
  }

  rollWithType(rollType: string): number {
    switch (rollType) {
    case ROLL_TYPES.NORMAL:
      return Dice.d20.roll();
    case ROLL_TYPES.ADVANTAGE:
      return Dice.d20.rollWithAdvantage();
    case ROLL_TYPES.DISADVANTAGE:
      return Dice.d20.rollWithDisadvantage();
    }
  }

  roll(): void {
    this.results = {
      hit: 0,
      criticallyHit: 0,
      miss: 0,
      criticallyMiss: 0
    };

    for (let i = 0; i < this.quantity; i += 1) {
      let roll = this.rollWithType(this.rollType);
      let criticallyHit = roll === 20;
      let criticallyMiss = roll === 1;
      let hit = criticallyHit || !criticallyMiss && (roll + this.modifier) >= this.armorClass;

      if (hit) {
        this.results.hit += 1;
      } else {
        this.results.miss += 1;
      }

      if (criticallyHit) {
        this.results.criticallyHit += 1;
      }
      if (criticallyMiss) {
        this.results.criticallyMiss += 1;
      }
    }
  }
}
