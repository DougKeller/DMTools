import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';
import { Creature } from '@dm/common/models/creature';
import { Player } from '@dm/common/models/player';
import { Dice } from '@dm/common/models/dice';
import { Ability } from '@dm/constants/ability';
import { Group } from '@dm/common/interfaces/group';

interface Roll {
  base: number;
  sum: number;
  modifier: number;
  group: Group;
}

@Component({
  selector: 'initiative',
  templateUrl: './initiative.component.html'
})
export class InitiativeComponent {
  @Input() encounter!: Encounter;

  rolls: Roll[] = [];
  currentRollIndex: number = 0;
  round: number = 0;

  rollInitiativeForGroup(group: Group): Roll {
    const base: number = Dice.d20.roll();
    const modifier: number = group.creature.modifier(Ability.Dexterity);
    const sum = base + modifier;

    return {
      base,
      sum,
      modifier,
      group
    };
  }

  setTurnOrder(): void {
    this.round += 1;
    this.rolls = this.rolls.sort((a, b) => a.sum < b.sum ? 1 : -1);
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
    const index = (this.round - 1) * this.rolls.length + this.currentRollIndex;

    return Math.floor(index / this.rolls.length * 6.0);
  }

  timePassed(): string {
    let seconds = this.totalSeconds();
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    let str = `${minutes}:`;
    if (seconds < 10) {
      str += '0';
    }
    str += seconds;
    return str;
  }
}
