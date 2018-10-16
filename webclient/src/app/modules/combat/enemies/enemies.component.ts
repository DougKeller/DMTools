import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';
import { CreatureType } from '@dm/common/models/creature_type';
import { EnemyType } from '@dm/common/models/enemy_type';
import { Creature } from '@dm/common/interfaces/creature';
import { Group } from '@dm/common/models/group';

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

    this.encounter.creatures.forEach((creature) => {
      if (creature.creatureType.name === targetCreatureType.name && creature.hitpoints > 0) {
        creatures.push(creature);
      }
    });

    return creatures;
  }

  enemyGroups(): Group[] {
    let groups: Group[] = [];

    this.encounter.groups.forEach((group) => {
      if (group.creatureType instanceof EnemyType) {
        groups.push(group);
      }
    });

    return groups;
  }

  percentHealth(creature: Creature): string {
    let current = creature.hitpoints;
    let total = creature.creatureType.hitpoints;
    return `${Math.floor(current * 100.0 / total)}%`;
  }

  toggleShow(creatureType: CreatureType): void {
    this.showList[creatureType.name] = !this.showList[creatureType.name];
  }

  show(creatureType: CreatureType): boolean {
    return this.showList[creatureType.name];
  }
}
