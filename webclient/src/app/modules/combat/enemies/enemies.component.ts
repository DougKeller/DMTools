import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';
import { CreatureType } from '@dm/common/models/creature_type';
import { EnemyType } from '@dm/common/models/enemy_type';
import { Creature } from '@dm/common/interfaces/creature';

interface Cell {
  creatureType: CreatureType,
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

  enemies(targetCreatureType: CreatureType): Creature[] {
    let creatures: Creature[] = [];

    this.encounter.creatures.forEach((status) => {
      if (status.creatureType.name === targetCreatureType.name && status.hitpoints > 0) {
        creatures.push(status);
      }
    });

    return creatures;
  }

  typesOfEnemies(): Cell[] {
    let cells: Cell[] = [];

    this.encounter.creatures.forEach((status) => {
      let creatureIsEnemyType = status.creatureType instanceof EnemyType;
      if (status.hitpoints === 0 || !creatureIsEnemyType) {
        return;
      }

      let done = false;
      cells.forEach((cell) => {
        if (cell.creatureType === status.creatureType) {
          done = true;
          cell.quantity += 1;
        }
      });
      if (!done) {
        cells.push({ creatureType: status.creatureType, quantity: 1 });
      }
    });

    return cells;
  }

  percentHealth(status: Creature): string {
    let current = status.hitpoints;
    let total = status.creatureType.hitpoints;
    return `${Math.floor(current * 100.0 / total)}%`;
  }

  toggleShow(creatureType: CreatureType): void {
    this.showList[creatureType.name] = !this.showList[creatureType.name];
  }

  show(creatureType: CreatureType): boolean {
    return this.showList[creatureType.name];
  }
}
