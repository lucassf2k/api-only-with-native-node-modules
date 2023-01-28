import { heroes } from '../mocks/heroes.mjs';

export class HeroesController {
  list(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(heroes));
  }
}