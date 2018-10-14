import { CreatureType } from '@dm/common/models/creature_type';
import { PlayerType } from '@dm/common/models/player_type';
import { EnemyType } from '@dm/common/models/enemy_type';
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
          creatureType: group.creatureType,
          hitpoints: group.creatureType.hitpoints,
          id: i + 1
        })
      }
    });
  }
}
