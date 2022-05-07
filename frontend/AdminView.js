class AdminView{
    constructor() { }
    
    async readDataFromDb() {
        // read the json data
        let rawData = await fetch('/api/products');
        // convert from json to a JavaScript data structure
        // data will be an array of generic objects
        let data = await rawData.json();

    }
}

/*Viewname 
 orderDetails: each products and price for orders 
 orderDetailSubTotal
 orderSums: total price for eahc order 
 totalOrderSumHist : total price and products list for each order
 
 
 
 */