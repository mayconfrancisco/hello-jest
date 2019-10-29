import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';

// nome da fabrica, model e corpo de como gerar
// para documentacao do Faker procure Faker Node
factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
