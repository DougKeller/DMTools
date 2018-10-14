import { Creature } from '@dm/common/models/creature';
import { Player } from '@dm/common/models/player';
import { Enemy } from '@dm/common/models/enemy';
import { Group } from '@dm/common/interfaces/group';

export class Encounter {
  groups: Group[];

  constructor(groups: Group[]) {
    this.groups = groups;
    this.groups.forEach((group) => {
      if (!group.hitpoints) {
        group.hitpoints = new Array(group.quantity);
      }
    });
  }

  reset(group: Group): void {
    if (!group.hitpoints) {
      group.hitpoints = [];
    }

    for(let i = 0; i < group.quantity; i += 1) {
      group.hitpoints[0] = group.creature.hitpoints;
    }
  }

  resetAll(): void {
    this.groups.forEach(this.reset);
  }
}
