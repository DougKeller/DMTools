import { Creature } from '@dm/common/models/creature';
import { Player } from '@dm/common/models/player';
import { Enemy } from '@dm/common/models/enemy';
import { Group } from '@dm/common/interfaces/group';
import { CreatureStatus } from '@dm/common/interfaces/creature_status';

export class Encounter {
  groups: Group[];
  creatureStatuses: CreatureStatus[];

  constructor(groups: Group[]) {
    this.groups = groups;
    this.creatureStatuses = [];
  }

  resetAll(): void {
    this.creatureStatuses = [];
    this.groups.forEach((group) => {
      for (var i = 0; i < group.quantity; i += 1) {
        this.creatureStatuses.push({
          creature: group.creature,
          hitpoints: group.creature.hitpoints,
          id: i + 1
        })
      }
    });
  }
}
