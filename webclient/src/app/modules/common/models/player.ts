import { Creature } from '@dm/common/models/creature';

export class Player extends Creature {
  copy(): Player {
    return new Player(this.params);
  }
};
