// The video for this file:
// https://youtu.be/pLoNMD0rqjI

export enum DoughType{HEALTHY}
export enum Topping {CHEESE}
export interface Pizza {
  numberOfSlices: number;
  isThin: boolean;
  doughType: DoughType;
  toppings: Topping[];
}

export class PizzaBuilder {
  private numberOfSlices: number | undefined;
  private isThin: boolean | undefined;
  private doughType: DoughType | undefined;
  private toppings: Topping[] = [];

  public setNumberOfSlices(numberOfSlices: number): PizzaBuilder {
    this.numberOfSlices = numberOfSlices;
    return this;
  }
  public setIsThin(isThin: boolean): PizzaBuilder {
    this.isThin = isThin;
    return this;
  }
  public setDoughType(doughType: DoughType): PizzaBuilder {
    this.doughType = doughType;
    return this;
  }
  public addTopping(topping: Topping): PizzaBuilder {
    this.toppings.push(topping);
    return this;
  }
  public build() : Pizza {
    if (this.isThin === undefined) this.isThin = false;
    if (this.numberOfSlices === undefined) this.numberOfSlices = 8;
    if (this.doughType === undefined) throw new Error('Dough type must be set')
    if (this.toppings.length < 1) this.toppings.push(Topping.CHEESE);

    return {
      numberOfSlices: this.numberOfSlices,
      isThin: this.isThin,
      toppings: this.toppings,
      doughType: this.doughType
    }
  }
}

const pizza: Pizza = new PizzaBuilder()
 .setIsThin(true)
 .setNumberOfSlices(6)
 .setDoughType(DoughType.HEALTHY)
 .addTopping(Topping.CHEESE)
 .build();