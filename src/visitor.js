// The video for this file:
// https://youtu.be/iueor-qViR4
class RegularItem {
    constructor(price) {
        this.price = price;
    }
    accept(visitor) {
        visitor.visitRegular(this);
    }
}
class GiftItem {
    constructor(minimalPriceForGift, originalPrice) {
        this.minimalPriceForGift = minimalPriceForGift;
        this.originalPrice = originalPrice;
    }
    accept(visitor) {
        visitor.visitGift(this);
    }
}
class DiscountItem {
    constructor(originalPrice, discount) {
        this.originalPrice = originalPrice;
        this.discount = discount;
    }
    accept(visitor) {
        visitor.visitDiscount(this);
    }
}
const items = [
    new RegularItem(10),
    new GiftItem(11, 3),
    new DiscountItem(4, 2)
];
console.log('Price', calculateTotalPriceNaive(items)); //12
console.log('discount', calculateDiscountNaive(items)); //5
function calculateTotalPriceNaive(items) {
    let price = 0;
    items.forEach(item => {
        if (item instanceof RegularItem) {
            price += item.price;
        }
        else if (item instanceof DiscountItem) {
            price += item.originalPrice - item.discount;
        }
    });
    return price;
}
function calculateDiscountNaive(items) {
    const price = calculateTotalPriceNaive(items);
    let discout = 0;
    items.forEach(item => {
        if (item instanceof DiscountItem) {
            discout += item.discount;
        }
        else if (item instanceof GiftItem &&
            price >= item.minimalPriceForGift) {
            discout += item.originalPrice;
        }
    });
    return discout;
}
class TotalPriceVisitor {
    constructor() {
        this.price = 0;
    }
    calcualte(items) {
        items.forEach(_ => _.accept(this));
    }
    visitRegular(item) {
        this.price += item.price;
    }
    visitGift(item) {
    }
    visitDiscount(item) {
        this.price +=
            item.originalPrice - item.discount;
    }
}
function calculateTotalPrice(items) {
    const visitor = new TotalPriceVisitor();
    visitor.calcualte(items);
    return visitor.price;
}
class DiscountVisitor {
    constructor() {
        this.price = 0;
        this.discount = 0;
    }
    calcualte(items) {
        this.price = calculateTotalPrice(items);
        items.forEach(_ => _.accept(this));
    }
    visitRegular(item) {
    }
    visitGift(item) {
        if (this.price >= item.minimalPriceForGift) {
            this.discount += item.originalPrice;
        }
    }
    visitDiscount(item) {
        this.discount += item.discount;
    }
}
function calculateDiscount(items) {
    const visitor = new DiscountVisitor();
    visitor.calcualte(items);
    return visitor.discount;
}
console.log('Price visitor', calculateTotalPrice(items)); //12
console.log('discount visitor', calculateDiscount(items)); //5
