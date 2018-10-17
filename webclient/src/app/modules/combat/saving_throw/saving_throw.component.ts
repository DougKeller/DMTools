import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';
import { Ability } from '@dm/constants/ability';
import { RollType } from '@dm/constants/roll_type';
import { Group } from '@dm/common/models/group';
import { Dice } from '@dm/common/models/dice';

type GroupMappings = {
  [groupId: number]: Group;
};

type GroupCounts = {
  [groupId: number]: number;
};

type GroupRollTypes = {
  [groupId: number]: RollType;
};

type GroupResults = {
  [groupId: number]: {
    succeeded: number;
    failed: number;
    total: number;
  };
};

@Component({
  selector: 'saving-throw',
  templateUrl: './saving_throw.component.html'
})
export class SavingThrowComponent {
  @Input() encounter!: Encounter;

  savingThrow!: number;
  ability!: Ability;

  mappings: GroupMappings = {};
  counts: GroupCounts = {};
  rollTypes: GroupRollTypes = {};
  results: GroupResults = {};

  performed: boolean = false;
  rolling: boolean = false;

  Ability = Ability;
  RollType = RollType;

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    this.savingThrow = 15;
    this.ability = Ability.Dexterity;

    this.encounter.groups.forEach((group) => {
      this.mappings[group.id] = group;
      this.counts[group.id] = 0;
      this.rollTypes[group.id] = RollType.Normal;
    });

    this.performed = false;
  }

  decrementCount(group: Group) {
    this.counts[group.id] -= 1;
    this.counts[group.id] = Math.max(this.counts[group.id], 0);
  }

  incrementCount(group: Group) {
    this.counts[group.id] += 1;
    this.counts[group.id] = Math.min(this.counts[group.id], group.livingCreatures().length);
  }

  rollD20(rolltype: RollType) {
    switch (rolltype) {
    case RollType.Normal:
      return Dice.d20.roll();
    case RollType.Advantage:
      return Dice.d20.rollWithAdvantage();
    case RollType.Disadvantage:
      return Dice.d20.rollWithDisadvantage();
    }
  }

  rollForGroup(group: Group, results: GroupResults) {
    for (var i = 0; i < this.counts[group.id]; i += 1) {
      let rollType = this.rollTypes[group.id];
      let base = this.rollD20(rollType);
      let modifier = group.creatureType.modifier(this.ability);

      this.results[group.id].total += 1;

      if (base === 20 || (base !== 1 && (base + modifier) >= this.savingThrow)) {
        this.results[group.id].succeeded += 1;
      } else {
        this.results[group.id].failed += 1;
      }
    }
  }

  perform(): void {
    this.performed = true;
    this.rolling = true;

    this.results = {};
    this.encounter.groups.forEach((group) => {
      if (!this.counts[group.id]) {
        return;
      }

      this.results[group.id] = {
        succeeded: 0,
        failed: 0,
        total: 0
      };
    });

    setTimeout(() => {
      this.encounter.groups.forEach((group) => {
        this.rollForGroup(group, this.results)
      });
      this.rolling = false;
    }, 250);
  }

  groupIds(): number[] {
    let ids: number[] = [];
    this.encounter.groups.forEach((group) => {
      if (this.results[group.id]) {
        ids.push(group.id);
      }
    });
    return ids;
  }
}
