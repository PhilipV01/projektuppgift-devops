const passwordEncryptor = require('./passwordEncryptor');
const acl = require('./acl');
const specialRestRoutes = require('./special-rest-routes.js');
const userTable = 'customers';
const passwordField = 'password';
const userRoleField = 'userRole';// REST ROUTE: db-info
webServer.get('/api/db-info', (req, res) =>
  res.json({ tablesInDb, viewsInDb })
);

let db; 

function runQuery(tableName, req, res, parameters, sqlForPreparedStatement, onlyOne = false) {

  if (!acl(tableName, req)) {
    res.status(405);
    res.json({ _error: 'Not allowed!' });
    return;
  }

  let result;
  try {
    let stmt = db.prepare(sqlForPreparedStatement);
    let method = sqlForPreparedStatement.trim().toLowerCase().indexOf('select') === 0 ?
      'all' : 'run';
    result = stmt[method](parameters);
  }
  catch (error) {
    result = { _error: error + '' };
  }
  if (onlyOne) { result = result[0]; }
  result = result || null;
  res.status(result ? (result._error ? 500 : 200) : 404);
  setTimeout(() => res.json(result), 1);
}


module.exports = function setupRESTapi(app, databaseConnection) {

  db = databaseConnection;

  let tablesAndViews = db.prepare(`
    SELECT name, type 
    FROM sqlite_schema
    WHERE 
      (type = 'table' OR type = 'view') 
      AND name NOT LIKE 'sqlite_%'
  `).all();

  app.get('/api/tablesAndViews', (req, res) => {
    if (!acl('tablesAndViews', req)) {
      res.status(405);
      res.json({ _error: 'Not allowed!' });
      return;
    }
    res.json(tablesAndViews);
  });

  for (let { name, type } of tablesAndViews) {

    app.get('/api/' + name, (req, res) => {
      runQuery(name, req, res, {}, `
        SELECT *
        FROM ${name}
      `);
    });


    app.get('/api/' + name + '/:id', (req, res) => {
      runQuery(name, req, res, req.params, `
        SELECT *
        FROM ${name}
        WHERE id = :id
      `, true);
    });

    if (type === 'view') {
      continue;
    }

    app.post('/api/' + name, (req, res) => {
      delete req.body.id;

      if (name === userTable) {
        req.body[userRoleField] = 'user';
        req.body[passwordField] =
          passwordEncryptor(req.body[passwordField]);
      }

      runQuery(name, req, res, req.body, `
        INSERT INTO ${name} (${Object.keys(req.body)})
        VALUES (${Object.keys(req.body).map(x => ':' + x)})
      `);
    });

    let putAndPatch = (req, res) => {

      if (name === userTable && req.body[passwordField]) {
        req.body[passwordField] =
          passwordEncryptor(req.body[passwordField]);
      }

      runQuery(name, req, res, { ...req.body, ...req.params }, `
        UPDATE ${name}
        SET ${Object.keys(req.body).map(x => x + ' = :' + x)}
        WHERE id = :id
      `);
    };


    app.put('/api/' + name + '/:id', putAndPatch);
    app.patch('/api/' + name + '/:id', putAndPatch);

    app.delete('/api/' + name + '/:id', (req, res) => {
      runQuery(name, req, res, req.params, `
        DELETE FROM ${name}
        WHERE id = :id
      `);
    });

  }

  specialRestRoutes(app, runQuery, db);

  app.all('/api/*', (req, res) => {
    res.status(404);
    res.json({ _error: 'No such route!' });
  });

  app.use((error, req, res, next) => {
    if (error) {
      let result = {
        _error: error + ''
      };
      res.json(result);
    }
    else {
      next();
    }
  });    

}
/*
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
});*/