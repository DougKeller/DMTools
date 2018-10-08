import { Component } from '@angular/core';
import { Dice } from '@dm/common/models/dice';
import { ROLL_TYPES } from '@dm/constants/roll_types';

interface Results {
  hit: {
    normal: number;
    critical: number,
    total: number
  },
  miss: {
    normal: number,
    critical: number,
    total: number
  }
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

  reset(): void {
    this.results = null;
    this.modifier = 0;
    this.quantity = 1;
    this.armorClass = 15;
    this.rollType = this.rollTypesConstant.NORMAL;
  }

  ngOnInit(): void {
    this.reset();
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
      hit: {
        normal: 0,
        critical: 0,
        total: 0
      },
      miss: {
        normal: 0,
        critical: 0,
        total: 0
      }
    };

    for (let i = 0; i < this.quantity; i += 1) {
      let roll = this.rollWithType(this.rollType);
      let criticallyHit = roll === 20;
      let criticallyMiss = roll === 1;
      let hit = criticallyHit || !criticallyMiss && (roll + this.modifier) >= this.armorClass;

      if (hit) {
        this.results.hit.total += 1;
        if (criticallyHit) {
          this.results.hit.critical += 1;
        } else {
          this.results.hit.normal += 1;
        }
      } else {
        this.results.miss.total += 1;
        if (criticallyMiss) {
          this.results.miss.critical += 1;
        } else {
          this.results.miss.normal += 1;
        }
      }
    }
  }
}
