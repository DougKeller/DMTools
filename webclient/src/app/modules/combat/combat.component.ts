import { Component } from '@angular/core';
import { EnemyType } from '@dm/common/models/enemy_type';
import { PlayerType } from '@dm/common/models/player_type';
import { CreatureType } from '@dm/common/models/creature_type';
import { Group } from '@dm/common/interfaces/group';
import { forkJoin } from 'rxjs';

import { EnemyTypeService } from '@dm/common/services/enemy_type.service';
import { PlayerTypeService } from '@dm/common/services/player_type.service';

import { Encounter } from '@dm/common/models/encounter';

@Component({
  selector: 'dm-combat',
  templateUrl: './combat.component.html'
})
export class CombatComponent {
  players: PlayerType[] = [];
  enemies: EnemyType[] = [];
  encounter?: Encounter;

  constructor(
    private enemyTypeService: EnemyTypeService,
    private playerTypeService: PlayerTypeService
  ) {}

  buildEncounter(): void {
    const groups: Group[] = [];

    const addGroup = (creatureType: CreatureType, quantity: number) => {
      groups.push({
        creatureType,
        quantity
      });
    };

    this.players.forEach(playerType => addGroup(playerType, 1));
    addGroup(this.enemies[304], 20);
    addGroup(this.enemies[307], 5);
    this.encounter = new Encounter(groups);
    this.encounter.resetAll();
  }

  ngOnInit(): void {
    const observables = [
      this.playerTypeService.getPlayerTypes(),
      this.enemyTypeService.getEnemyTypes()
    ];

    forkJoin(observables).subscribe((content) => {
      this.players = content[0];
      this.enemies = content[1];
      this.buildEncounter();
    });
  }
}
