import { CreatureType } from '@dm/common/models/creature_type';
import { Group } from '@dm/common/models/group';
import { Creature } from '@dm/common/models/creature';

export class Encounter {
  groups: Group[];

  constructor() {
    this.groups = [];
  }

  reset(): void {
    this.groups.forEach((group) => group.reset());
  }

  addGroup(creatureType: CreatureType, quantity: number): void {
    this.groups.push(new Group(creatureType, quantity));
  }

  get creatures(): Creature[] {
    let creatures: Creature[] = [];

    this.groups.forEach((group) => {
      creatures = creatures.concat(group.creatures);
    });

    return creatures;
  }
}
