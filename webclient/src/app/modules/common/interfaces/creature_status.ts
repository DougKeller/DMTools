import { CreatureType } from '@dm/common/models/creature_type';

export interface CreatureStatus {
  creatureType: CreatureType;
  hitpoints: number;
  id: number;
}
