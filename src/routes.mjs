import { HeroesController } from './controllers/HeroesController.mjs';

const heroesController = new HeroesController();

export const routes = [
  {
    endpoint: '/heroes',
    method: 'GET',
    handler: heroesController.list,
  },
  {
    endpoint: '/heroes/:id',
    method: 'GET',
    handler: heroesController.getHeroById,
  },
  {
    endpoint: '/heroes',
    method: 'POST',
    handler: heroesController.createHero,
  },
  {
    endpoint: '/heroes/:id',
    method: 'PUT',
    handler: heroesController.updateHero,
  },
  {
    endpoint: '/heroes/:id',
    method: 'DELETE',
    handler: heroesController.deleteHero,
  },
];