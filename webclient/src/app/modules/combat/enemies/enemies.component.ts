import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';
import { CreatureType } from '@dm/common/models/creature_type';
import { Creature } from '@dm/common/models/creature';
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

  showList: { [creatureTypeName: string]: boolean } = {};

  inputs: { [groupId: number]: { [creatureId: number]: string } } = {};

  ngOnInit(): void {
    this.encounter.groups.forEach((group) => {
      this.inputs[group.id] = {};

      group.creatures.forEach((creature) => {
        this.inputs[group.id][creature.id] = '';
      });
    });
  }

  groups(): Group[] {
    let groups: Group[] = [];

    this.encounter.groups.forEach((group) => {
      if (group.creatureType.isEnemy() && group.livingCreatures().length > 0) {
        groups.push(group);
      }
    });

    return groups;
  }

  enemies(targetCreatureType: CreatureType): Creature[] {
    let creatures: Creature[] = [];

    this.encounter.creatures.forEach((creature) => {
      if (creature.creatureType.name === targetCreatureType.name && creature.hitpoints > 0) {
        creatures.push(creature);
      }
    });

    return creatures;
  }

  healthbarStyle(creature: Creature): string {
    return `${creature.percentHealth()}%`;
  }

  toggleShow(creatureType: CreatureType): void {
    this.showList[creatureType.name] = !this.showList[creatureType.name];
  }

  show(creatureType: CreatureType): boolean {
    return this.showList[creatureType.name];
  }

  adjustHealth(enemy: Creature, amount?: string): void {
    if (!amount) {
      return;
    }

    let match = amount.match(/\+(\d+)/);
    if (match) {
      let amount: number = parseInt(match[1]);
      enemy.hitpoints += amount;
      enemy.hitpoints = Math.min(enemy.hitpoints, enemy.creatureType.hitpoints);
      return;
    }

    match = amount.match(/-(\d+)/);
    if (match) {
      let amount: number = parseInt(match[1]);
      enemy.hitpoints -= amount;
      enemy.hitpoints = Math.max(enemy.hitpoints, 0);
      return;
    }

    match = amount.match(/\d+/);
    if (match) {
      let amount: number = parseInt(match[0]);
      enemy.hitpoints = amount;
      enemy.hitpoints = Math.max(enemy.hitpoints, 0);
      enemy.hitpoints = Math.min(enemy.hitpoints, enemy.creatureType.hitpoints);
      return;
    }
  }

  stuff(enemy: Creature, event: MouseEvent): void {
    let progress = event.target;
    if (progress.classList.contains('progress-bar')) {
      progress = progress.parentElement;
    }

    let elementLeft = progress.getBoundingClientRect().left;
    let elementWidth = progress.getBoundingClientRect().width;
    let clickLeft = event.x;

    let pct = (clickLeft - elementLeft) / elementWidth;
    enemy.hitpoints = Math.round(pct * enemy.creatureType.hitpoints);
  }

}
