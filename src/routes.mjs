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
];