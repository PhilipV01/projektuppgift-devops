const { expect } = require('@jest/globals');

const Product = require('../frontend/Product.js');

describe('Test the Product class', () => {

  test('An id not equal to a number should fail for Product constructor', () => {

    expect(() => {
      new Product('xa', 'X', 200, 'description');
    }).toThrow();

    expect(() => {
      new Product(true, 'X', 200, 'description');
    }).toThrow();

  })
  
});