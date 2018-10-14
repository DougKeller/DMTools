export class Dice {
  sides: number;

  constructor(sides: number) {
    this.sides = sides;
  }

  roll(): number {
    return Math.ceil(Math.random() * this.sides);
  }

  rollWithAdvantage(): number {
    const roll1 = this.roll();
    const roll2 = this.roll();

    return roll1 > roll2 ? roll1 : roll2;
  }

  rollWithDisadvantage(): number {
    const roll1 = this.roll();
    const roll2 = this.roll();

    return roll1 < roll2 ? roll1 : roll2;
  }

  static get d20(): Dice {
    return new Dice(20);
  }

  static d(s: number): Dice {
    return new Dice(s);
  }
}
