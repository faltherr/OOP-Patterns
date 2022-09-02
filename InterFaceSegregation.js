class Document {

}

// Abstract class
// Make it so the class cannot be constructed
// Look at the constructor name and throw an error if the class is attempted to be instantiated

class Machine {
    constructor() {
        if (this.constructor.name === 'Machine') {
            throw new Error ('Machine is abstract')
        }
    }
    // Define the interface 
    print(doc) {

    }
    fax(doc) {

    }
    scan(doc) {

    }
}

// If you want to extend the machine you need to override all the things
class MultiFunctionPrinter extends Machine {
    print(doc) {
        // Print something
        // super.print(doc);
    }
    fax(doc) {
        // super.fax(doc);
    }
    scan(doc) {
        // super.scan(doc);
    }
    
}

class NotImplementedError extends Error {
    constructor(name)
    {
        let msg = `${name} is not implemented`
        super(msg)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotImplementedError)
        }
    }
}

// Using this interface the user has to remove the method it does not want to implement OR it has to throw an error
class OldFashionPrinter extends Machine {
    print(doc) {
        // Print something
    }
    fax(doc) {
        // Old fashion printer does not know how to do this
    }
    scan(doc) {
        // Old fashion printer does not know how to do this
        throw new NotImplementedError('OldFashionPrinter.scan')
    }
}

let printer = new OldFashionPrinter();
printer.scan()

// Interface Segregation Principle (ISP)
// Split up interfaces into different parts so that consumers do not implement more than they need

class Printer {
    // This constructor ensures the class is abstract
    constructor() {
        if (this.constructor.name === 'Printer') {
            throw new Error ('Printer is abstract')
        }
    }
    print() {
        
    }
}

class Scanner {
    // This constructor ensures the class is abstract
    constructor() {
        if (this.constructor.name === 'Scanner') {
            throw new Error ('Scanner is abstract')
        }
    }
    //Interface definition
    scan() {

    }
}

// Multiple inheritance
class Photocopier {
    print() {}
    scan() {}
}