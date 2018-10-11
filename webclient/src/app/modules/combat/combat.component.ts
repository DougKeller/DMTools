import { Component } from '@angular/core';
import { Enemy } from '@dm/common/models/enemy';
import { Player } from '@dm/common/models/player';
import { forkJoin } from 'rxjs';

import { EnemyService } from '@dm/common/services/enemy.service';
import { PlayerService } from '@dm/common/services/player.service';

import { Encounter } from '@dm/common/models/encounter';

@Component({
  selector: 'dm-combat',
  templateUrl: './combat.component.html'
})
export class CombatComponent {
  players: Player[];
  enemies: Array<Enemy>;
  encounter: Encounter;

  constructor(
    private enemyService: EnemyService,
    private playerService: PlayerService
  ) {}

  buildEncounter(): void {
    this.encounter = new Encounter({
      players: this.players.slice(0, 1),
      enemies: [
        this.enemies[0].copy(),
        this.enemies[0].copy(),
        this.enemies[0].copy(),
        this.enemies[0].copy(),
        this.enemies[0].copy(),
        this.enemies[1].copy(),
        this.enemies[2].copy()
      ];
    });
  }

  ngOnInit(): void {
    let observables = [
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
