global.listen = require( '../frontend/helpers.js').listen;
const { expect } = require('@jest/globals');
const ShoppingCart = require('../frontend/ShoppingCart.js');
const Product = require('../frontend/Product.js');

require('./fakeDOM.js')

let myShoppingCart = new ShoppingCart();

describe('Test the Shopppingcart class', ()=> {
    test('Test that product can be added to cart and then emptied', ()=> {
        expect(myShoppingCart.orderRows.length).toBe(0);
        let myProduct = new Product(2, 'product', 300, 'my product');
        myShoppingCart.add(2, myProduct);
        expect(myShoppingCart.orderRows.length).toBe(1);
        myShoppingCart.empty();
        expect(myShoppingCart.orderRows.length).toBe(0);
    });
});