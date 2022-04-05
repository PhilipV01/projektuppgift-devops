class Product {

  // In JS the constructor is named constructor
  // (not after the class name)
  constructor(id, name, price, description) {

    // it could be wist to have specifications
    // for a program where we EXPECT the program
    // to throw errors on bad input
    if (typeof id !== 'number') {
      throw (new Error('id must be a number'))
    }


    // transfer parameters to properties
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = 'https://source.unsplash.com/random/640x360/?'
      + name.split(' -')[0];
  }

  // A method that shows info about the product as html
  render() {
    let htmlDescription = '<p>' +
      this.description.replaceAll('\n\n', '</p><p>') + '</p>';
    // (why not just the number as id? because the id attribute
    // in html should start with a-z or A-Z according to specs)
    return `
      <div class="product" id="i${this.id}">
        <img src="${this.image}">
        <h3>${this.name}</h3>
        <div>${htmlDescription}</div>
         <p class="price">Price: ${this.price} kr</p>
      </div>
    `;
  }

  // A method that shows compact info about the product (in a list)
  renderInList() {
    return `
      <div class="productInList" id="i${this.id}">
        <img src="${this.image}">
        <h3>${this.name}</h3>
        <p class="price">Price: ${this.price} kr</p>
      </div>
    `;
  }

}

// For Jest - check if we are in a Node.js environment
// if so export the class for Jest
if (typeof module === 'object' && module.exports) {
  module.exports = Product;
}