import { Ability } from '@dm/constants/ability';

export abstract class Creature {
  params;
  type: string;
  name: string;

  armorClass: number;
  hitpoints: number;

  strength: number;
  dexterity: number;
  constitution: number;
  wisdom: number;
  intelligence: number;
  charisma: number;

  constructor(params) {
    this.params = params;
    this.type = params.type;
    this.name = params.name;
    this.armorClass = params.armor_class;
    this.hitpoints = params.hit_points || 0;
    this.strength = params.strength || 0;
    this.dexterity = params.dexterity || 0;
    this.constitution = params.constitution || 0;
    this.intelligence = params.intelligence || 0;
    this.wisdom = params.wisdom || 0;
    this.charisma = params.charisma || 0;
  }

  abilityKey(ability: Ability): string {
    switch (ability) {
      case Ability.Strength:
        return 'strength';
      case Ability.Dexterity:
        return 'dexterity';
      case Ability.Constitution:
        return 'constitution';
      case Ability.Wisdom:
        return 'wisdom';
      case Ability.Intelligence:
        return 'intelligence';
      case Ability.Charisma:
        return 'charisma';
    }
  }

  modifier(ability: Ability): number {
    let key = this.abilityKey(ability);
    let offset = this[key] - 10;
    return Math.floor(offset / 2);
  }

  abstract copy();
};
