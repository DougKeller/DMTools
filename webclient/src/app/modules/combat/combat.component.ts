import { Component } from '@angular/core';
import { Enemy } from '@dm/common/models/enemy';
import { Player } from '@dm/common/models/player';
import { Creature } from '@dm/common/models/creature';
import { Group } from '@dm/common/interfaces/group';
import { forkJoin } from 'rxjs';

import { EnemyService } from '@dm/common/services/enemy.service';
import { PlayerService } from '@dm/common/services/player.service';

import { Encounter } from '@dm/common/models/encounter';

@Component({
  selector: 'dm-combat',
  templateUrl: './combat.component.html'
})
export class CombatComponent {
  players: Player[] = [];
  enemies: Enemy[] = [];
  encounter?: Encounter;

  constructor(
    private enemyService: EnemyService,
    private playerService: PlayerService
  ) {}

  buildEncounter(): void {
    const groups: Group[] = [];

    const addGroup = (creature: Creature, quantity: number) => {
      groups.push({
        creature,
        quantity
      });
    };

    this.players.forEach(player => addGroup(player, 1));
    addGroup(this.enemies[0], 5);
    addGroup(this.enemies[1], 3);
    addGroup(this.enemies[2], 1);
    addGroup(this.enemies[3], 1);
    this.encounter = new Encounter(groups);
    this.encounter.resetAll();
  }

  ngOnInit(): void {
    const observables = [
      this.playerService.getPlayers(),
      this.enemyService.getEnemies()
    ];

    forkJoin(observables).subscribe((content) => {
      this.players = content[0];
      this.enemies = content[1];
      this.buildEncounter();
    });
  }
}
