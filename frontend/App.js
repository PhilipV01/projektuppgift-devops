class App {

    constructor() {
      this.start();
    }
  
    async start() {
  
      // check if the user is logged in
      let rawResult = await fetch('/api/login');
      let result = await rawResult.json();
  
      // if we are logged in replace the register and login button
      // with name + a logout button
      if (!result._error) {
        grabEl('.login').style.display = 'none';
        grabEl('.register').style.display = 'none';
        grabEl('.logout').style.display = 'inline';
        grabEl('.logout').innerHTML += ' ' + result.email;
      }
  
      grabEl('body').innerHTML +=
        '<div class="overlay"></div>' +
        LoginAndRegister.renderRegistrationForm() +
        LoginAndRegister.renderLoginForm();
      this.productList = new ProductList();
      this.addNavButtonEvents();
    }
  
    addNavButtonEvents() {
      listen('click', '.showCart', () => {
        let shoppingCart = grabEl('.shoppingCart')
        if (!shoppingCart) {
          alert('Buy something!');
          return;
        }
        shoppingCart.style.display = 'block';
      });
  
      listen('click', '.closeCart', () => {
        grabEl('.shoppingCart').style.display = 'none';
      });

      listen('click', '.emptyCart', () => {
        // reloads the page to empty cart--need method to actually remove
        location.reload();
        alert('You have removed your selected items');
      });

      listen('click', '.checkoutOrder', () => {
        // need to add method for checkout button found in ShoppingCart.js
      });
  
      listen('click', '.register', () => {
        grabEl('.overlay').style.display = 'block';
        grabEl('.registerModal').style.display = 'block';
      });
  
  
      listen('click', '.login', () => {
        grabEl('.overlay').style.display = 'block';
        grabEl('.loginModal').style.display = 'block';
      });
  
      listen('click', '.logout', async () => {
        // logout
        await fetch('/api/login', { method: 'DELETE' });
        // reload the page
        location.reload();
      });
  
      listen('click', '.closeRegisterModal', () => {
        grabEl('.overlay').style.display = 'none';
        grabEl('.registerModal').style.display = 'none';
      });
  
      listen('click', '.closeLoginModal', () => {
        grabEl('.overlay').style.display = 'none';
        grabEl('.loginModal').style.display = 'none';
      });
      //Empty the cart
      listen('click', '.emptyCart',()=>{
        this.productList=[]
      })
      //Send the order 
      //listen ('click','.checkoutOrder', ()=>{});
  
      LoginAndRegister.addEvents();
  
    }
}  