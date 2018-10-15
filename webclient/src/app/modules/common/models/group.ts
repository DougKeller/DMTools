import { CreatureType } from '@dm/common/models/creature_type';
import { Creature } from '@dm/common/interfaces/creature';

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
    for (var i = 0; i < this.quantity; i += 1) {
      let id = i + 1;
      this.creatures.push({
        creatureType: this.creatureType,
        hitpoints: this.creatureType.hitpoints,
        id: id
      });
    }
  }
}
