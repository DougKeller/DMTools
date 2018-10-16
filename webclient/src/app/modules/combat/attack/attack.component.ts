import { Component, Input } from '@angular/core';
import { Dice } from '@dm/common/models/dice';
import { RollType } from '@dm/constants/roll_type';

interface Results {
  hit: {
    normal: number;
    critical: number,
    total: number
  };
  miss: {
    normal: number,
    critical: number,
    total: number
  };
}

@Component({
  selector: 'attack',
  templateUrl: './attack.component.html'
})
export class AttackComponent {
  rollTypeEnum = RollType;

  modifier!: number;
  quantity!: number;
  armorClass!: number;
  rollType!: RollType;

  rolling: boolean = false;
  results?: Results;

  reset(): void {
    this.modifier = 0;
    this.quantity = 1;
    this.armorClass = 15;
    this.rollType = RollType.Normal;

    this.results = undefined;
  }

  ngOnInit(): void {
    this.reset();
  }

  rollWithType(rollType: RollType): number {
    switch (rollType) {
    case RollType.Normal:
      return Dice.d20.roll();
    case RollType.Advantage:
      return Dice.d20.rollWithAdvantage();
    case RollType.Disadvantage:
      return Dice.d20.rollWithDisadvantage();
    }
  }

  rollNext(remaining: number, results: Results): void {
    if (remaining <= 0) {
      this.rolling = false;
      return;
    }

    const roll = this.rollWithType(this.rollType);
    const criticallyHit = roll === 20;
    const criticallyMiss = roll === 1;
    const hit = criticallyHit || !criticallyMiss && (roll + this.modifier) >= this.armorClass;

    if (hit) {
      results.hit.total += 1;
      if (criticallyHit) {
        results.hit.critical += 1;
      } else {
        results.hit.normal += 1;
      }
    } else {
      results.miss.total += 1;
      if (criticallyMiss) {
        results.miss.critical += 1;
      } else {
        results.miss.normal += 1;
      }
    }

    setTimeout(() => this.rollNext(remaining - 1, results));
  }

  roll(): void {
    if (this.rolling) {
      return;
    }

    this.rolling = true;

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

    let results: Results = this.results;
    setTimeout(() => this.rollNext(this.quantity, results), 250);
  }
}
