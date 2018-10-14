import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';
import { Creature } from '@dm/common/models/creature';
import { Enemy } from '@dm/common/models/enemy';
import { CreatureStatus } from '@dm/common/interfaces/creature_status';

interface Cell {
  creature: Creature,
  quantity: number
};

@Component({
  selector: 'enemies',
  templateUrl: './enemies.component.html',
  styleUrls: ['./enemies.component.scss']
})
export class EnemiesComponent {
  @Input() encounter!: Encounter;

  showList: { [creatureName: string]: boolean } = {};

  enemyStatuses(targetCreature: Creature): CreatureStatus[] {
    let statuses: CreatureStatus[] = [];

    this.encounter.creatureStatuses.forEach((status) => {
      if (status.creature.name === targetCreature.name && status.hitpoints > 0) {
        statuses.push(status);
      }
    });

    return statuses;
  }

  typesOfEnemies(): Cell[] {
    let cells: Cell[] = [];

    this.encounter.creatureStatuses.forEach((status) => {
      let creatureIsEnemy = status.creature instanceof Enemy;
      if (status.hitpoints === 0 || !creatureIsEnemy) {
        return;
      }

      let done = false;
      cells.forEach((cell) => {
        if (cell.creature === status.creature) {
          done = true;
          cell.quantity += 1;
        }
      });
      if (!done) {
        cells.push({ creature: status.creature, quantity: 1 });
      }
    });

    return cells;
  }

  percentHealth(status: CreatureStatus): string {
    let current = status.hitpoints;
    let total = status.creature.hitpoints;
    return `${Math.floor(current * 100.0 / total)}%`;
  }

  toggleShow(creature: Creature): void {
    this.showList[creature.name] = !this.showList[creature.name];
  }

  show(creature: Creature): boolean {
    return this.showList[creature.name];
  }
}
