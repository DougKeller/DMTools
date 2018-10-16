import { CreatureType } from '@dm/common/models/creature_type';
import { Creature } from '@dm/common/models/creature';

export class Group {
  creatureType: CreatureType;
  quantity: number;

  creatures: Creature[];

  constructor(creatureType: CreatureType, quantity: number) {
    this.creatureType = creatureType;
    this.quantity = quantity;
    this.creatures = [];
    this.reset();
  }

  reset(): void {
    this.creatures = [];
    for (var i = 0; i < this.quantity; i += 1) {
      let id = i + 1;
      let creature = new Creature(this.creatureType, this.creatureType.hitpoints, id)
      this.creatures.push(creature);
    }
  }

  livingCreatures(): Creature[] {
    let creatures: Creature[] = [];
    this.creatures.forEach((creature) => {
      if (creature.hitpoints > 0) {
        creatures.push(creature);
      }
    });
    return creatures;
  }
}
