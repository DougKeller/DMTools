import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ability } from '@dm/common/models/ability';
import { ABILITIES } from '@dm/constants/abilities';
import { ROLL_TYPES } from '@dm/constants/roll_types';
import { MonsterService } from '@dm/common/services/monster.service';
import { Monster } from '@dm/common/models/monster';

@Component({
  selector: 'dm-combat-saving-throw-form',
  templateUrl: './form.component.html'
})
export class SavingThrowFormComponent {
  @Input() options;
  @Output() roll: EventEmitter<any> = new EventEmitter<any>();
  abilities: Ability[] = ABILITIES;
  monsters: Monster[];

  rollTypesConstant = ROLL_TYPES;

  constructor(
    private monsterService: MonsterService
  ) {}

  ngOnInit(): void {
    this.monsterService.getMonsters().subscribe(m => {
      this.monsters = m
      this.addGroup();
    });
  }

  removeGroup(group: Object): void {
    let index = this.options.groups.indexOf(group);
    this.options.groups.splice(index, 1);
  }

  addGroup(): void {
    this.options.groups.push({
      count: null,
      rollType: ROLL_TYPES.NORMAL,
      monster: this.monsters[this.options.groups.length]
    });
  }

  submit(): void {
    this.roll.emit();
  }
}
