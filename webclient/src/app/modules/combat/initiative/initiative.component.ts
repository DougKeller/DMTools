import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';
import { Creature } from '@dm/common/models/creature';
import { Player } from '@dm/common/models/player';
import { Dice } from '@dm/common/models/dice';
import { Ability } from '@dm/constants/ability';

interface Roll {
  base: number,
  sum: number,
  modifier: number,
  group
}

@Component({
  selector: 'initiative',
  templateUrl: './initiative.component.html'
})
export class InitiativeComponent {
  @Input() encounter: Encounter;

  rolls: Roll[];
  currentRollIndex: number;

  round: number;

  rollInitiativeForGroup(group): Roll {
    let base: number = Dice.d20.roll();
    let modifier: number = group.creature.modifier(Ability.Dexterity);
    let sum = base + modifier;

    return {
      base: base,
      sum: sum,
      modifier: modifier,
      group: group
    };
  }

  setTurnOrder(): void {
    this.round += 1;
    this.rolls = this.rolls.sort((a, b) => a.sum < b.sum);
    this.currentRollIndex = 0;
  }

  rollInitiative(): void {
    this.rolls = [];
    this.encounter.groups.forEach((group) => {
      this.rolls.push(this.rollInitiativeForGroup(group));
    });

    this.setTurnOrder();
  }

  ngOnInit(): void {
    this.round = 0;
    this.rollInitiative();
  }

  nextTurn(): void {
    this.currentRollIndex += 1;

    if (this.currentRollIndex >= this.rolls.length) {
      this.currentRollIndex = 0;
      this.setTurnOrder();
    }
  }

  isPlayer(creature: Creature): boolean {
    return creature instanceof Player;
  }

  displayFor(roll: Roll): string {
    let str = `${roll.sum} (${roll.base}`;
    if (roll.modifier >= 0) {
      str += `+${roll.modifier})`;
    } else {
      str += `${roll.modifier})`;
    }
    return str;
  }

  totalSeconds(): number {
    let index = (this.round - 1) * this.rolls.length + this.currentRollIndex;

    return Math.floor(index / this.rolls.length * 6.0);
  }

  timePassed(): string {
    let seconds = this.totalSeconds();
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    let str = `${minutes}:`;
    if (seconds < 10) {
      str += '0';
    }
    str += seconds;
    return str;
  }
}
