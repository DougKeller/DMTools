import { CreatureType } from '@dm/common/models/creature_type';

export interface Group {
  creatureType: CreatureType;
  quantity: number
}
