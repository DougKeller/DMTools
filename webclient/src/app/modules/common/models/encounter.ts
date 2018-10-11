import { Creature } from '@dm/common/models/creature';
import { Player } from '@dm/common/models/player';
import { Enemy } from '@dm/common/models/enemy';

export class Encounter {
  creatures: Array<Creature>;

  constructor(params: { players: Player[], enemies: Enemy[] }) {
    this.creatures = [].concat(params.players).concat(params.enemies);
  }

  players(): Player[] {
    let players = [];
    this.creatures.forEach(c => {
      if (c instanceof Player) {
        players.push(c)
      }
    });
    return players;
  }
}
