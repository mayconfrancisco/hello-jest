import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/users', (req, resp) => {
  return resp.json({ id: 1 });
});

export default routes;
