import { Creature } from '@dm/common/models/creature';

export interface Group {
  creature: Creature;
  quantity: number;
  hitpoints?: number[];
}
