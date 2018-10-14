import { CreatureType } from '@dm/common/models/creature_type';
import { PlayerType } from '@dm/common/models/player_type';
import { EnemyType } from '@dm/common/models/enemy_type';
import { Group } from '@dm/common/interfaces/group';
import { Creature } from '@dm/common/interfaces/creature';

export class Encounter {
  groups: Group[];
  creatures: Creature[];

  constructor(groups: Group[]) {
    this.groups = groups;
    this.creatures = [];
  }

  resetAll(): void {
    this.creatures = [];
    this.groups.forEach((group) => {
      for (var i = 0; i < group.quantity; i += 1) {
        this.creatures.push({
          creatureType: group.creatureType,
          hitpoints: group.creatureType.hitpoints,
          id: i + 1
        })
      }
    });
  }
}
