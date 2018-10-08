import { Component } from '@angular/core';

interface Group {
  count: number,
  rollType: string,
  monster: Monster
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
