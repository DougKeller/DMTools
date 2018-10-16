import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';
import { Ability } from '@dm/constants/ability';
import { RollType } from '@dm/constants/roll_type';
import { Group } from '@dm/common/models/group';

@Component({
  selector: 'saving-throw',
  templateUrl: './saving_throw.component.html'
})
export class SavingThrowComponent {
  @Input() encounter!: Encounter;

  savingThrow!: number;
  ability!: Ability;
  counts: { [groupId: number]: number } = {};
  rollTypes: { [groupId: number]: RollType } = {};

  Ability = Ability;
  RollType = RollType;

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    this.savingThrow = 15;
    this.ability = Ability.Dexterity;

    this.encounter.groups.forEach((group) => {
      this.counts[group.id] = 0;
      this.rollTypes[group.id] = RollType.Normal;
    });
  }

  perform(): void {

  }
}
