const { expect } = require('@jest/globals');

const ShoppingCart = require('../frontend/ShoppingCart.js');
const Product = require('../frontend/Product.js');

describe('Test the ShoppinCart class', () => {

    test('After a product is added, size of cart should increase', () => {
        let myShoppingCart = new ShoppingCart();
        let myProduct = new Product(1, 'Broom', 299, 'Best broom');

        expect(ShoppingCart.orderRows.length()).toBe(0);

        ShoppingCart.add(1, myProduct)

        expect(ShoppingCart.orderRows.length()).toBe(1);
    })
});