import { Ability } from '@dm/common/models/ability';

export class Monster {
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

  modifier(ability: Ability): number {
    let key = ability.name.toLowerCase();
    let offset = this[key] - 10;
    return Math.floor(offset / 2);
  }
};
