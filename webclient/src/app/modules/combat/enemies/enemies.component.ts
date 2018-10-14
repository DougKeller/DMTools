import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';
import { Enemy } from '@dm/common/models/enemy';
import { CreatureStatus } from '@dm/common/interfaces/creature_status';

@Component({
  selector: 'enemies',
  templateUrl: './enemies.component.html'
})
export class EnemiesComponent {
  @Input() encounter!: Encounter;

  enemyStatuses(): CreatureStatus[] {
    let statuses: CreatureStatus[] = [];

    this.encounter.creatureStatuses.forEach((status) => {
      let creatureIsEnemy = status.creature instanceof Enemy;
      if (!creatureIsEnemy) {
        return;
      }

      statuses.push(status);
    });

    return statuses;
  }

  percentHealth(status: CreatureStatus): string {
    let current = status.hitpoints;
    let total = status.creature.hitpoints;
    return `${Math.floor(current * 100.0 / total)}%`;
  }
}
