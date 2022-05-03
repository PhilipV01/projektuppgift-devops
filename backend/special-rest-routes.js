const passwordEncryptor = require('./passwordEncryptor');

module.exports = function (app, runQuery, db) {

  app.post('/api/place-my-order', (req, res) => {

    // get the id of the logged in user
    let userId = req.session.user?.id;

    // Read the request.body
    // expect to be an array of objects
    // where each object has the form
    // { productId: x, quantity: y }
    let orderRows = req.body

    if(!(orderRows instanceof Array)) {
      res.json({ _error: 'The request should be an array!' });
      return;
    }

    let result = runQuery('place-my-order', req, null, { userId },
      'INSERT INTO orders (userId) VALUES (:userId)'
    );

    let orderId = result.lastInsertRowid;

    for(let orderRow of orderRows) {
      runQuery('place-my-order', req, null, { ...orderRow, orderId },
      ` INSERT INTO orderRows (orderId, productId, quantity)
        VALUES (:orderId, :productId, :quantity)`);
    }

    res.json({orderId, status: 'Created the order'});

    /*runQuery('place-my-order', req, res, { customerId: userId }, `
      SELECT * FROM orderDetails WHERE customerId = :customerId
    `);*/
    


  });
}