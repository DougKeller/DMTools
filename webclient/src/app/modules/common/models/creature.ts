import { CreatureType } from '@dm/common/models/creature_type';

export class Creature {
  creatureType: CreatureType;
  hitpoints: number;
  id: number;

  constructor(creatureType: CreatureType, hitpoints: number, id: number) {
    this.creatureType = creatureType;
    this.hitpoints = hitpoints;
    this.id = id;
  }

  percentHealth(): number {
    return Math.floor(this.hitpoints * 100.0 / this.creatureType.hitpoints);
  }
}
