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

  rollNext(remaining: number): void {
    if (remaining <= 0) {
      this.rolling = false;
      return;
    }

    const roll = this.rollWithType(this.rollType);
    const criticallyHit = roll === 20;
    const criticallyMiss = roll === 1;
    const hit = criticallyHit || !criticallyMiss && (roll + this.modifier) >= this.armorClass;

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

    setTimeout(() => this.rollNext(remaining - 1));
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

    setTimeout(() => this.rollNext(this.quantity), 250);
  }
}
