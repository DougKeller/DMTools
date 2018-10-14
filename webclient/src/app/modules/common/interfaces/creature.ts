import { CreatureType } from '@dm/common/models/creature_type';

export interface Creature {
  creatureType: CreatureType;
  hitpoints: number;
  id: number;
}
