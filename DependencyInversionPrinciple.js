// Dependency Inversion Principle
// Defines a relationship between low level and high level modules
// High level modules (Research) should not depend on low level modules (Relationships_OLD) and instead should depend on abstractions
// You do not want the implementation details of the high level module to depend on the details of the low level module
// Abstractions meaning abstract classes or interfaces

let Relationship = Object.freeze({
    parent: 0,
    child: 1,
    sibling: 2
})

class Person {
    constructor(name) {
        this.name = name
    }
}

// Low-Level module (Close to the module)
// Store the relationships between people
class Relationships_OLD {
    constructor() {
        this.data = [];
    }
    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            type: Relationship.parent,
            to: child
        })
    }
}

// High level module
// Define the relationships between different people
class Research_OLD {
    constructor(relationships) {
        // find all children of john
        let relations = relationships.data
        for (let rel of relations.filter (r => 
            r.from.name === 'John' && r.type === Relationship.parent))
        {
            console.log(`John has a child named ${rel.to.name}`)
        }
    }
}

// How do we fix the dependency Issue?
// We define a class which pretends to define an interface for the things we want to do
// Define an interface for the kinds of actions we can perform on Relationship data
class RelationshipBrowser {
    constructor() {
        if (this.constructor.name === 'RelationshipBrowser') {
            throw new Error('RelationshipBrowser is abstract!')
        }
    }
    findAllChildrenOf(name) {

    }
}
class Relationships extends RelationshipBrowser {
    constructor() {
        super();
        this.data = [];
    }
    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            type: Relationship.parent,
            to: child
        })
    }
    findAllChildrenOf(name) {
        return this.data.filter(r => 
            r.from.name === name && r.type === Relationship.parent
        ).map(r => r.to)
    }
}


class Research {
    constructor(browser) {
        for (let p of browser.findAllChildrenOf('John')){
            console.log(`John has a child named ${p.name}`)
        }
    }
}

let parent = new Person('John')
let child1 = new Person('Chris')
let child2 = new Person('Matt')

let rels_OLD = new Relationships_OLD();
rels_OLD.addParentAndChild(parent, child1)
rels_OLD.addParentAndChild(parent, child2)

let rels = new Relationships();
rels.addParentAndChild(parent, child1)
rels.addParentAndChild(parent, child2)

new Research(rels)

// High level modules should not directly depend on low level modules
// Depend on abstractions (Abstract classes or interfaces)
