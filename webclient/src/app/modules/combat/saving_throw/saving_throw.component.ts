import { Component } from '@angular/core';
import { Enemy } from '@dm/common/models/enemy';
import { EnemyService } from '@dm/common/services/enemy.service';
import { Ability } from '@dm/common/models/ability';
import { ABILITIES } from '@dm/constants/abilities';
import { RollType } from '@dm/constants/roll_type';
import { Dice } from '@dm/common/models/dice';

interface Group {
  count: number,
  rollType: RollType,
  enemy: Enemy
};

interface SavingThrowOptions {
  savingThrow: RollType,
  ability: Ability,
  groups: Group[]
};

interface Roll {
  base: number,
  sum: number,
  succeeded: boolean
}

interface Result {
  enemy: Enemy,
  modifier: number,
  succeeded: number,
  failed: number,
  total: number,
  rolls: Roll[],
  expanded: boolean
}

interface Summary {
  succeeded: number,
  failed: number,
  results: Result[]
};

@Component({
  selector: 'saving-throw',
  templateUrl: './saving_throw.component.html'
})
export class SavingThrowComponent {
  abilities: ReadonlyArray<Ability> = ABILITIES;
  enemies: Enemy[];
  options: SavingThrowOptions;
  summary: Summary;

  rollType: RollType;
  rollTypeEnum = RollType;

  constructor(
    private enemyService: EnemyService
  ) {}

  reset(): void {
    this.summary = null;
    this.options = {
      savingThrow: 15,
      ability: ABILITIES[0],
      groups: []
    };

    this.enemyService.getEnemies().subscribe(m => {
      this.enemies = m;
      this.addGroup();
    });
  }

  ngOnInit(): void {
    this.reset();
  }

  addGroup(): void {
    this.options.groups.push({
      count: 0,
      rollType: RollType.Normal,
      enemy: this.enemies[this.options.groups.length]
    });
  }

  rollForType(rollType: RollType): number {
    switch (rollType) {
    case RollType.Normal:
      return Dice.d20.roll();
    case RollType.Advantage:
      return Dice.d20.rollWithAdvantage();
    case RollType.Disadvantage:
      return Dice.d20.rollWithDisadvantage();
    }
  }

  rollFor(group): void {
    let result: Result = {
      enemy: group.enemy,
      modifier: group.enemy.modifier(this.options.ability),
      succeeded: 0,
      failed: 0,
      total: group.count,
      rolls: [],
      expanded: false
    };

    for (var i = 0; i < group.count; i += 1) {
      let roll = this.rollForType(group.rollType);
      let rollWithModifier = roll + result.modifier;
      let succeeds = roll === 20 || roll !== -1 && rollWithModifier >= this.options.savingThrow;

      result.rolls.push({
        base: roll,
        sum: rollWithModifier,
        succeeded: succeeds
      });

      if (succeeds) {
        result.succeeded += 1;
        this.summary.succeeded += 1;
      } else {
        result.failed += 1;
        this.summary.failed += 1;
      }
    }

    this.summary.results.push(result);
  }

  perform(): void {
    this.summary = {
      succeeded: 0,
      failed: 0,
      results: []
    }
    this.options.groups.forEach(group => this.rollFor(group));
  }
}
