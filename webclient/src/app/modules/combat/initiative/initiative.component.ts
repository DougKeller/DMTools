import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';
import { Creature } from '@dm/common/models/creature';
import { Dice } from '@dm/common/models/dice';
import { Ability } from '@dm/constants/ability';

interface Roll {
  base: number,
  sum: number,
  modifier: number
}

@Component({
  selector: 'initiative',
  templateUrl: './initiative.component.html'
})
export class InitiativeComponent {
  @Input() encounter: Encounter;

  rolls: { [name: string]: Roll; };
  round: number;
  activeCreature: Creature;
  turnOrder: Creature[];

  jitter: number;

  groups: { [name: string]: number };

  rollInitiativeForCreature(creature: Creature): Roll {
    let base: number = Dice.d20.roll();
    let modifier: number = creature.modifier(Ability.Dexterity);
    let sum = base + modifier;

    return {
      base: base,
      sum: sum,
      modifier: modifier
    };
  }

  setTurnOrder(): Creature[] {
    this.turnOrder = [];
    this.groups = {};
    this.encounter.creatures.forEach(creature => {
      if (creature.hitpoints <= 0 && !this.isPlayer(creature)) {
        return;
      }

      this.groups[creature.name] = this.groups[creature.name] || 0;
      this.groups[creature.name] += 1;

      let index = 0;
      this.turnOrder.forEach(c => {
        if (this.rolls[c.name].sum > this.rolls[creature.name].sum) {
          index += 1;
        }
      });

      if (this.groups[creature.name] === 1) {
        this.turnOrder.splice(index, 0, creature);
      }
    });
  }

  rollInitiative(): void {
    this.round += 1;

    if (this.round === 1) {
      this.rolls = {};
      this.encounter.creatures.forEach(c => {
        if (this.rolls[c.name]) {
          return;
        }

        this.rolls[c.name] = this.rollInitiativeForCreature(c);
      });
    } else {
      Object.values(this.rolls).forEach(v => {
        v.base += Dice.d(this.jitter).roll();
        v.base -= Dice.d(this.jitter).roll();
        if (v.base >= 20) {
          v.base = 20;
        }
        if (v.base <= 1) {
          v.base = 1;
        }
        v.sum = v.base + v.modifier;
      });
    }

    this.setTurnOrder();

    this.activeCreature = this.turnOrder[0];
  }

  nextTurn(): void {
    let index = this.turnOrder.indexOf(this.activeCreature) + 1;
    if (index >= this.turnOrder.length) {
      this.rollInitiative();
    } else {
      this.activeCreature = this.turnOrder[index];
    }
  }

  ngOnInit(): void {
    this.round = 0;
    this.jitter = 3;
    this.rollInitiative();
  }

  isPlayer(creature: Creature): boolean {
    return this.encounter.players().includes(creature);
  }

  displayFor(roll: Roll): string {
    let str = `${roll.sum} (${roll.base}`;
    if (roll.modifier >= 0) {
      str += `+${roll.modifier})`;
    } else {
      str += `${roll.modifier})`;
    }
    return str;
  };
}
