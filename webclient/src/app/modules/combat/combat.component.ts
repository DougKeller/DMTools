import { Component } from '@angular/core';
import { CreatureType } from '@dm/common/models/creature_type';
import { Group } from '@dm/common/models/group';
import { forkJoin } from 'rxjs';

import { EnemyTypeService } from '@dm/common/services/enemy_type.service';
import { PlayerTypeService } from '@dm/common/services/player_type.service';

import { Encounter } from '@dm/common/models/encounter';

@Component({
  selector: 'dm-combat',
  templateUrl: './combat.component.html'
})
export class CombatComponent {
  playerTypes: CreatureType[] = [];
  enemyTypes: CreatureType[] = [];
  encounter?: Encounter;

  constructor(
    private enemyTypeService: EnemyTypeService,
    private playerTypeService: PlayerTypeService
  ) {}

  buildEncounter(): void {
    this.encounter = new Encounter();
    this.encounter.addGroup(this.enemyTypes[304], 5);
    this.encounter.addGroup(this.enemyTypes[307], 3);
    this.encounter.addGroup(this.playerTypes[0], 1);
    this.encounter.addGroup(this.playerTypes[1], 1);
    this.encounter.reset();
  }

  ngOnInit(): void {
    const observables = [
      this.playerTypeService.getPlayerTypes(),
      this.enemyTypeService.getEnemyTypes()
    ];

    forkJoin(observables).subscribe((content) => {
      this.playerTypes = content[0];
      this.enemyTypes = content[1];
      this.buildEncounter();
    });
  }
}
