// The video for this file:
// https://youtu.be/iueor-qViR4

class RegularItem {
    constructor(public price: number) {
    }

    public accept(visitor: ItemsVisitor): void {
        visitor.visitRegular(this);
    }
}
class GiftItem {
    constructor(public minimalPriceForGift: number,
        public originalPrice: number) {
    }

    public accept(visitor: ItemsVisitor): void {
        visitor.visitGift(this);
    }
}
class DiscountItem {
    constructor(public originalPrice: number,
        public discount: number) {
    }

    public accept(visitor: ItemsVisitor): void {
        visitor.visitDiscount(this);
    }
}

const items = [
    new RegularItem(10),
    new GiftItem(11, 3),
    new DiscountItem(4, 2)
];
console.log('Price', calculateTotalPriceNaive(items));//12
console.log('discount', calculateDiscountNaive(items));//5

type Item = RegularItem | GiftItem | DiscountItem;

function calculateTotalPriceNaive(items: Item[]): number {
    let price: number = 0;
    items.forEach(item => {
        if (item instanceof RegularItem) {
            price += item.price;
        } else if (item instanceof DiscountItem) {
            price += item.originalPrice - item.discount;
        }
    });

    return price;
}

function calculateDiscountNaive(items: Item[]): number {
    const price: number =
        calculateTotalPriceNaive(items);

    let discout = 0;
    items.forEach(item => {
        if (item instanceof DiscountItem) {
            discout += item.discount;
        } else if (item instanceof GiftItem &&
            price >= item.minimalPriceForGift) {
            discout += item.originalPrice;
        }
    })

    return discout;
}

interface ItemsVisitor {
    visitRegular(item: RegularItem): void;
    visitGift(item: GiftItem): void;
    visitDiscount(item: DiscountItem): void;
}

class TotalPriceVisitor implements ItemsVisitor {
    public price: number;
    constructor(){
        this.price = 0;
    }

    public calcualte(items: Item[]): void {
        items.forEach(_ => _.accept(this));
    }

    public visitRegular(item: RegularItem): void {
        this.price += item.price;
    }
    public visitGift(item: GiftItem): void{ 
    }
    public visitDiscount(item: DiscountItem): void{
        this.price += 
            item.originalPrice - item.discount;
    }
}

function calculateTotalPrice(items: Item[]): number {
    const visitor = new TotalPriceVisitor();
    visitor.calcualte(items);

    return visitor.price;
}

class DiscountVisitor implements ItemsVisitor {
    private price: number;
    public discount: number;
    constructor(){
        this.price = 0;
        this.discount = 0;
    }

    public calcualte(items: Item[]): void {
        this.price = calculateTotalPrice(items);
        items.forEach(_ => _.accept(this));
    }

    public visitRegular(item: RegularItem): void {
    }
    public visitGift(item: GiftItem): void{ 
        if (this.price >= item.minimalPriceForGift){
            this.discount += item.originalPrice;
        }
    }
    public visitDiscount(item: DiscountItem): void{
        this.discount += item.discount;
    }
}

function calculateDiscount(items: Item[]){
    const visitor = new DiscountVisitor();
    visitor.calcualte(items);
    return visitor.discount;
}

console.log('Price visitor', calculateTotalPrice(items));//12
console.log('discount visitor', calculateDiscount(items));//5
