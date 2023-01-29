import { heroes as HEROES } from '../mocks/heroes.mjs';

let heroes = HEROES;

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

  createHero(req, res) {
    const { body } = req;

    const lastHero = heroes[heroes.length - 1].id;
    const newHero = { 
      id: lastHero + 1,
      name: body.name,
      publisher: body.publisher, 
    };

    heroes.push(newHero);

    res.send(201, newHero);
  }

  updateHero(req, res) {
    let { id } = req.params;
    const { name, publisher } =  req.body;
    
    id = Number(id);

    const heroExists = heroes.find((hero) => hero.id === id);

    if (!heroExists) {
      return res.send(400, { error: 'Hero not found' });
    }

    heroes.forEach((hero) => {
      if (hero.id === id) {
        hero.name = name;
        hero.publisher = publisher;
      }
    });

    res.send(200, { id, name, publisher });
  }

  deleteHero(req, res) {
    let { id } = req.params;
    id = Number(id);

    const heroFiltered = heroes.find((hero) => hero.id === id);

    if (!heroFiltered) {
      return res.send(400, { error: 'Hero not found!' });
    }

    heroes = heroes.filter((hero) => !(hero.id === heroFiltered.id));

    res.send(200, { deleted: true });
  }
}