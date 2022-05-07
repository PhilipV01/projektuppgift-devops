class orderSums{
    constructor(id, time, userId, email, firstName, lastName, total) {
        this.id = id;
        this.time = time;
        this.userId = userId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.total = total;
        this.getOrderDetails();
    }
    
    async getOrderDetails() {
        // read the json data of chosen view 
        let rawData = await fetch('/api/orderDetails');
        //check if the user is authorised (admin?)
        if (!acl(viewName, req)) {
            alert("You're not allowed to access here!");
            location.reload();
        }
        //if admin can get data
        let data = await rawData.json();
        this.columns = [];
        for (let row of data) {
            let aRow = new orderSums(row.id, row.time, row.userId, row.email,
                row.firstName, row.lastName, row.total);
            this.columns.push(aRow);
            this.addEventListner();
        }
    }
    
    orderSumsrender() {
        for (let column of this.columns) {
            html = '<div>' +
                column.orederSumsEachrender() + '</div>'
        }
        return html;
    }

    orderSumsEachrender() {
        return `<p>order nr:${this.id}</p>
        <p> ${ this.time}</p>
        <p> ${ this.userId }</p>
        <p> ${ this.email }</p>
        <p> ${ this.firstName }</p>
        <p> ${ this.lastName }</p>
        <p> ${ this.total}</p>
        `
    }

    addEventListner() {
        listen('click', '.orderSums', () => {
           // let clickedElement = event.target.closest('option')
            //orderSumsrender().style.display = 'block';
            grabEl('main').innerHTML = this.orderSumsrender() + `
            <button class="backButton">
            Back to product list
            </button>`;
        });
    }
    
}