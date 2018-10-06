import { Component } from '@angular/core';
import { Dice } from '@dm/common/models/dice';
import { ROLL_TYPES } from '@dm/constants/roll_types';

@Component({
  selector: 'saving-throw-result',
  templateUrl: './result.component.html'
})
export class SavingThrowResultComponent {
  summary;

  rollForType(rollType): number {
    switch (rollType) {
    case ROLL_TYPES.NORMAL:
      return Dice.d20.roll();
    case ROLL_TYPES.ADVANTAGE:
      return Dice.d20.rollWithAdvantage();
    case ROLL_TYPES.DISADVANTAGE:
      return Dice.d20.rollWithDisadvantage();
    }
  }

  rollFor(group, options): void {
    let result = {
      monster: group.monster,
      modifier: group.monster.modifier(options.ability),
      succeeded: 0,
      failed: 0,
      total: group.count,
      rolls: [],
      expanded: false
    };

    for (var i = 0; i < group.count; i += 1) {
      let roll = this.rollForType(group.rollType);
      let rollWithModifier = roll + result.modifier;
      let succeeds = roll === 20 || roll !== -1 && rollWithModifier >= options.savingThrow;

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

  perform(options): void {
    this.summary = {
      succeeded: 0,
      failed: 0,
      results: []
    }
    options.groups.forEach(group => this.rollFor(group, options));
  }
}
