import http from 'node:http';
import { URL } from 'node:url';

import { bodyParser } from './utils/bodyParser.mjs';
import { routes } from './routes.mjs';

const server = http.createServer((req, res) => {
  const parseUrl = new URL(`http://localhost:3333${req.url}`);
  console.log(`Request method: ${req.method} | Endpoint: ${parseUrl.pathname}`);

  let { pathname } = parseUrl;
  let id = null;

  const splitEndpoint = pathname.split('/').filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }
 
  const route = routes.find((routeObj) => 
    routeObj.endpoint === pathname && routeObj.method === req.method
  );

  if (route) {
    req.query = Object.fromEntries(parseUrl.searchParams);
    req.params = { id };

    res.send = (statusCode, body) => {
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(body));
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      bodyParser(req, () => route.handler(req, res));
    } else {
      route.handler(req, res);
    }
  } else {
    res.send(404, `Cannot ${req.method} ${parseUrl.pathname}`);
  }

});

server.listen(3333, () => 
  console.log('🔥 Server is running on http://localhost:3333')
);