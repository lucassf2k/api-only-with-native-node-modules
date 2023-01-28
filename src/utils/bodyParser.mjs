export function bodyParser(req) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    body = JSON.parse(body);
    req.body = body;
  });
}