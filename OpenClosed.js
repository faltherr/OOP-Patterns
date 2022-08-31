// Open Closed Principle
// Objects are open for extension but closed for modification
// Extension means that a class inherits fields and methods from another class then adds additional functionality

// A mock enum
let Color = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue',
})

// A mock enum
let Size = Object.freeze({
    small: 'small',
    medium: 'medium',
    large: 'large',
})

class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}


// Modifications to this class (Like adding another method) may have unintended consequences
class ProductFilter_StateSpaceExplosion {
    filterByColor(products, color) {
        return products.filter(p => p.color ===color)
    }
    filterBySize(products, size) {
        return products.filter(p => p.size ===size)
    }
    filterBySizeAndColor(products, size, color) {
        return products.filter(p => p.size === size && p.color === color)
    }
    // ^^^ This is an example of the state space explosion
}

// The Specification Pattern
// A separate class would be responsible for each type of filtering <-- "Specification"
// If you need a new specification (Filtering behavior in this example) you do not modify an existing class you just make a new class
// "Separation of concerns" Each thing you want to filter on is a separate class
class ColorSpecification {
    constructor(color) {
        this.color = color;
    }
    isSatisfied(item) { // This will specify that the item passed in is the correct type
        return item.color === this.color
    }
}

class SizeSpecification {
    constructor(size) {
        this.size = size;
    }
    isSatisfied(item) { // This will specify that the item passed in is the correct type
        return item.size === this.size
    }
}

// A combinator is a specification which combines other specifications
class AndSpecification {
    constructor(...specs)
    {
        this.specs = specs;
    }

    isSatisfied(item){
        return this.specs.every(x => x.isSatisfied(item))
    }
}

let apple = new Product('Apple', Color.green, Size.small)
let tree = new Product('Tree', Color.green, Size.large)
let house = new Product('House', Color.blue, Size.large)

let products = [apple, tree, house]

let pf_sse = new ProductFilter_StateSpaceExplosion();
console.log(`Green products (old):`)

for (let p of pf_sse.filterByColor(products, Color.green)) {
    console.log(` * ${p.name} is green`)
}

class ProductFilter {
    filter(items, spec) {
        return items.filter(x => spec.isSatisfied(x))
    }
}

let pf = new ProductFilter();
console.log(`Green products (new)`)
for (let p of pf.filter(products, new ColorSpecification(Color.green))) {
    console.log(` * ${p.name} is green`)
}

// A combinator is a specification which combines other combinations
console.log(`Large and Green Products`)
let spec = new AndSpecification(new ColorSpecification(Color.green), new SizeSpecification(Size.large))
for (let p of pf.filter(products, spec)) {
    console.log(` * ${p.name} is green and large`)
}
