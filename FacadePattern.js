// The facade pattern allows us to make a simplified interface for a complex underlying solution
// We create an interface that hides the complexity of the classes beneath it

class Generator
{
  generate(count)
  {
    let result = [];
    for (let i = 0; i < count; ++i)
      result.push(Math.floor((Math.random() * 6) + 1));
    return result;
  }
}

class Splitter
{
  split(array)
  {
    let result = [];

    let rowCount = array.length;
    let colCount = array[0].length;

    // get the rows
    for (let r = 0; r < rowCount; ++r)
    {
      let theRow = [];
      for (let c = 0; c < colCount; ++c)
        theRow.push(array[r][c]);
      result.push(theRow);
    }

    // get the columns
    for (let c = 0; c < colCount; ++c)
    {
      let theCol = [];
      for (let r = 0; r < rowCount; ++r)
        theCol.push(array[r][c]);
      result.push(theCol);
    }

    // now the diagonals
    let diag1 = [];
    let diag2 = [];
    for (let c = 0; c < colCount; ++c)
    {
      for (let r = 0; r < rowCount; ++r)
      {
        if (c === r)
          diag1.push(array[r][c]);
        let r2 = rowCount - r - 1;
        if (c === r2)
          diag2.push(array[r][c]);
      }
    }

    result.push(diag1);
    result.push(diag2);

    return result;
  }
}

class Verifier
{
  verify(array)
  {
    if (array.length < 1) return false;
    let adder = function(p, c)
    {
      return p + c;
    };
    let expected = array[0].reduce(adder);
    let ok = true;
    array.forEach(function (subarray) {
      if (subarray.reduce(adder) !== expected) {
        ok = false;
      }
    });
    return ok;
  }
}

// MagicSquareGenerator is the facade class which provides an easier to use interface to generate a perfect square
class MagicSquareGenerator
{
  // The facade is passed a reference to each element of the sub system
  // Using composition to access all of the methods of the sub classes
  constructor(generator = new Generator(), splitter = new Splitter(), verifier = new Verifier()){
    this.generator = generator;
    this.splitter = splitter;
    this.verifier = verifier;
  }
  // The generate method combines all of the methods within a single method to create a simplified function for making a perfect square
  generate(size)
  {
      let square;
      do {
        square = [];
        for (let i = 0; i < size; i++) {
            square.push(this.generator.generate(size));
        }
        console.log('square', square)
      } while (!this.verifier.verify(this.splitter.split(square)));
      return square
  }
}

const generateMagicSquare = new MagicSquareGenerator()

console.log(generateMagicSquare.generate(3))