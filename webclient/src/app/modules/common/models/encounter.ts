import { Creature } from '@dm/common/models/creature';
import { Player } from '@dm/common/models/player';
import { Enemy } from '@dm/common/models/enemy';
import { Group } from '@dm/common/interfaces/group';
import { CreatureStatus } from '@dm/common/interfaces/creature_status';

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
    group.hitpoints = [];

    for(let i = 0; i < group.quantity; i += 1) {
      group.hitpoints.push(group.creature.hitpoints);
    }
  }

  resetAll(): void {
    this.groups.forEach(this.reset);
  }

  get creatureStatuses(): CreatureStatus[] {
    let creatureStatuses: CreatureStatus[] = [];

    this.groups.forEach((group) => {
      if (!group.hitpoints) {
        return;
      }

      for (var i = 0; i < group.quantity; i += 1) {
        creatureStatuses.push({
          creature: group.creature,
          hitpoints: group.hitpoints[i],
          id: i + 1
        })
      }
    });

    console.log(creatureStatuses);

    return creatureStatuses;
  }
}
