import { Creature } from '@dm/common/models/creature';

export class Enemy extends Creature {
  copy(): Enemy {
    return new Enemy(this.params);
  }
}
