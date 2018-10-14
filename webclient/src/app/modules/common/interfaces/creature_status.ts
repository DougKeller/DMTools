import { Creature } from '@dm/common/models/creature';

export interface CreatureStatus {
  creature: Creature;
  hitpoints: number;
  id: number;
}
