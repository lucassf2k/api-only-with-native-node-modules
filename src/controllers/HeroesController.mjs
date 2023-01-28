import { heroes } from '../mocks/heroes.mjs';

export class HeroesController {
  list(req, res) {
    const { order } = req.query;

    const sortedHeroes = heroes.sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : - 1;
      }

      return a.id > b.id ? 1 : - 1;
    });

    res.send(200, sortedHeroes);
  }

  getHeroById(req, res) {
    const { id } = req.params;

    const hero = heroes.find((hero) => hero.id === Number(id));

    if (!hero) {
      return res.send(400, { error: 'Hero not found' });
    } 

    res.send(200, hero);
  }
}