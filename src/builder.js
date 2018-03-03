"use strict";
// The video for this file:
// https://youtu.be/pLoNMD0rqjI
Object.defineProperty(exports, "__esModule", { value: true });
var DoughType;
(function (DoughType) {
    DoughType[DoughType["HEALTHY"] = 0] = "HEALTHY";
})(DoughType = exports.DoughType || (exports.DoughType = {}));
var Topping;
(function (Topping) {
    Topping[Topping["CHEESE"] = 0] = "CHEESE";
})(Topping = exports.Topping || (exports.Topping = {}));
class PizzaBuilder {
    constructor() {
        this.toppings = [];
    }
    setNumberOfSlices(numberOfSlices) {
        this.numberOfSlices = numberOfSlices;
        return this;
    }
    setIsThin(isThin) {
        this.isThin = isThin;
        return this;
    }
    setDoughType(doughType) {
        this.doughType = doughType;
        return this;
    }
    addTopping(topping) {
        this.toppings.push(topping);
        return this;
    }
    build() {
        if (this.isThin === undefined)
            this.isThin = false;
        if (this.numberOfSlices === undefined)
            this.numberOfSlices = 8;
        if (this.doughType === undefined)
            throw new Error('Dough type must be set');
        if (this.toppings.length < 1)
            this.toppings.push(Topping.CHEESE);
        return {
            numberOfSlices: this.numberOfSlices,
            isThin: this.isThin,
            toppings: this.toppings,
            doughType: this.doughType
        };
    }
}
exports.PizzaBuilder = PizzaBuilder;
const pizza = new PizzaBuilder()
    .setIsThin(true)
    .setNumberOfSlices(6)
    .setDoughType(DoughType.HEALTHY)
    .addTopping(Topping.CHEESE)
    .build();
