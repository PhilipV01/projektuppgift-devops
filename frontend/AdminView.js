class AdminView{
    constructor() { }
    viewName = orderDetails;
        
    async readDataFromDb(name) {
        name = viewName;
        // read the json data
        let rawData = await fetch('/api/'+ name);
        // convert from json to a JavaScript data structure
        // data will be an array of generic objects
        let data = await rawData.json();


    }
    render()
    
    //Function to click the button to see views 
    addAVButton() {
        listen('click', '.aVButton', event => {
            
        })
    }
}


/*Viewname 
 orderDetails: each products and price for orders 
 orderDetailSubTotal
 orderSums: total price for eahc order 
 totalOrderSumHist : total price and products list for each order

 
 
 */