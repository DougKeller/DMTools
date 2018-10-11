import { Component } from '@angular/core';
import { Enemy } from '@dm/common/models/enemy';

interface Group {
  count: number,
  rollType: string,
  enemy: Enemy,
  hitpoints: object
};

interface Encounter {
  players: object[],
  enemies: Group[]
}

@Component({
  selector: 'dm-combat',
  templateUrl: './combat.component.html'
})
export class CombatComponent { }
