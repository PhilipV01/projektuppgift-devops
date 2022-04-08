const passwordEncryptor = require('./passwordEncryptor');
const acl = require('./acl');
const specialRestRoutes = require('./special-rest-routes.js');
const userTable = 'customers';
const passwordField = 'password';
const userRoleField = 'userRole';// REST ROUTE: db-info
webServer.get('/api/db-info', (req, res) =>
  res.json({ tablesInDb, viewsInDb })
);

// REST ROUTE: GET many/all
let getMany = (req, res) => {
  // example of query params: ?order=name,-age&limit=10&offset=20
  // translates to ORDER BY name, age DESC LIMIT 10 OFFSET 20
  let orderBy = !req.query.order ? '' : 'ORDER BY ' +
    (req.query.order || '').split(',')
      .map(x => x[0] === '-' ? x.slice(1) + ' DESC' : x)
      .join(', ');
  let limit = !req.query.limit ? '' :
    'LIMIT ' + req.query.limit;
  let offset = !req.query.limit || !req.query.offset ? '' :
    'OFFSET ' + req.query.offset;
  // run query and return result  
  runQuery(req, res, `
    SELECT *
    FROM ${req.params.table}
    ${req.body.where ? 'WHERE ' + req.body.where : ''}
    ${orderBy} ${limit} ${offset}
  `);
};
webServer.get('/api/:table', getMany);
// Special route that allows full WHERE clauses
// (might be dangerous from a security perspective)
settings.allowWherePosts
  && webServer.post('/api/where/:table/', getMany);

// REST ROUTE: GET one
webServer.get('/api/:table/:id', (req, res) => {
  // run query
  runQuery(req, res, `
    SELECT *
    FROM ${req.params.table}   
    WHERE id = :id
  `, { id: req.params.id }, true
  );
});

// REST ROUTE: POST
webServer.post('/api/:table', (req, res) => {
  // do not allow id to be set manually
  delete req.body.id;
  // run query and return result
  runQuery(req, res, `
    INSERT INTO ${req.params.table} (${Object.keys(req.body)})     
    VALUES (${Object.keys(req.body).map(x => ':' + x)})
  `, req.body
  );
});

// REST ROUTE: PUT (and PATCH - alias in our case)
// Note: PUT are PATCH are used interchangably
// in many REST-api:s
let putOrPatch = (req, res) => {
  // run query and return result
  runQuery(req, res, `
    UPDATE ${req.params.table} 
    SET ${Object.keys(req.body).map(x => x + " = :" + x)}
    WHERE id = :id
  `, { ...req.body, id: req.params.id }
  );
};
webServer.put('/api/:table/:id', putOrPatch);
webServer.patch('/api/:table/:id', putOrPatch);

// REST ROUTE: DELETE
webServer.delete('/api/:table/:id', (req, res) => {
  // run query and return result
  runQuery(req, res, `
    DELETE FROM ${req.params.table} 
    WHERE id = :id
  `, { id: req.params.id }
  );
});

// no such route / 404
webServer.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'No such route.' });
});

// handle errors with faulty json bodies etc...
// (might hide runtime errors - 
//  in that casecomment out while developing)
webServer.use((error, req, res, next) => {
  // remove some unnecessary keys from error
  error = error && {
    ...error,
    statusCode: undefined,
    expose: undefined
  };
  // send error if there is an error
  error ?
    res.status(error.status || 500).json({ error }) : next();
});