import { Ability } from '@dm/constants/ability';
import { CreatureParameters } from '@dm/common/interfaces/creature_parameters';

export abstract class Creature {
  params: CreatureParameters;
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

  constructor(params: CreatureParameters) {
    this.params = params;
    this.type = params.type;
    this.name = params.name;
    this.armorClass = params.armor_class;
    this.hitpoints = params.hit_points;
    this.strength = params.strength;
    this.dexterity = params.dexterity;
    this.constitution = params.constitution;
    this.intelligence = params.intelligence;
    this.wisdom = params.wisdom;
    this.charisma = params.charisma;
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

  skill(ability: Ability): number {
    switch (ability) {
    case Ability.Strength:
      return this.strength;
    case Ability.Dexterity:
      return this.dexterity;
    case Ability.Constitution:
      return this.constitution;
    case Ability.Wisdom:
      return this.wisdom;
    case Ability.Intelligence:
      return this.intelligence;
    case Ability.Charisma:
      return this.charisma;
    }
  }

  modifier(ability: Ability): number {
    const offset = this.skill(ability) - 10;
    return Math.floor(offset / 2);
  }
}
