import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';
import { CreatureType } from '@dm/common/models/creature_type';
import { PlayerType } from '@dm/common/models/player_type';
import { Dice } from '@dm/common/models/dice';
import { Ability } from '@dm/constants/ability';
import { Group } from '@dm/common/models/group';

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
    const modifier: number = group.creatureType.modifier(Ability.Dexterity);
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
    this.rolls = this.rolls.sort((a, b) => {
      if (a.sum === b.sum) {
        let modA = a.group.creatureType.modifier(Ability.Dexterity);
        let modB = b.group.creatureType.modifier(Ability.Dexterity);
        return modB - modA;
      }

      return b.sum - a.sum;
    });
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

  randomizeRolls(): void {
    this.rolls.forEach((roll) => {
      let mods = [-2, -2, -1, -1, 0, 0, 0, 1, 1, 2, 2];
      if (roll.modifier >= 0) {
        let m = roll.modifier;
        let i = 0;
        while (m > 0) {
          mods[i] += Math.floor(m / 2);
          m -= 1;
          i += 1;
        }
      } else {
        let m = roll.modifier;
        let i = 10;
        while (m < 0) {
          mods[i] += Math.floor(m / 2);
          m += 1;
          i -= 1;
        }
      }
      let index = Math.floor(Math.random() * 11);
      roll.base += mods[index];
      roll.base = Math.min(roll.base, 20);
      roll.base = Math.max(roll.base, 1);
      roll.sum = roll.base + roll.modifier;
    });
  }

  nextTurn(): void {
    this.currentRollIndex += 1;

    if (this.currentRollIndex >= this.rolls.length) {
      this.currentRollIndex = 0;
      this.randomizeRolls();
      this.setTurnOrder();
    }
  }

  isPlayerType(creatureType: CreatureType): boolean {
    return creatureType instanceof PlayerType;
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

    return Math.round(index / this.rolls.length * 6.0);
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
