require('./fakeDOM.js');

const { grabEl } = require('../frontend/helpers.js');

describe('Test grabEl', () => {

  test('Get the content of header tag is correct', () => {

    let content = grabEl('header').innerHTML.trim();

    expect(content).toBe(`<h1>🛒Our grocery shop</h1>
    <div class="navButtons">
      <button class="showCart">Show cart</button>
      <button class="login">Login</button>
      <button class="register">Register</button>
      <button class="logout">Logout</button>
    </div>`);

  });

})