global.listen = require( '../frontend/helpers.js').listen;
const { expect } = require('@jest/globals');

const Product = require('../frontend/Product.js');
require('./fakeDOM.js')

describe('Test the Product class', () => {

  test('Test that product is created correctly', () => {
    let myProduct = new Product(1, 'Broom', 299, 'Best broom')
    expect(myProduct.id).toBe(1);
    expect(myProduct.name).toBe('Broom');
    expect(myProduct.price).toBe(299);
    expect(myProduct.description).toBe('Best broom');
  });

  test('An id not equal to a number should fail for Product constructor', () => {

    expect(() => {
      new Product('xa', 'X', 200, 'description');
    }).toThrow();

    expect(() => {
      new Product(true, 'X', 200, 'description');
    }).toThrow();

  });
  
});