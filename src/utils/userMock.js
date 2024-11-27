import { faker } from '@faker-js/faker';
import { createHash } from './utils.js';

export const generateUser = () => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 65 }), 
    password: createHash('coder123'), 
    role: faker.helpers.arrayElement(['user', 'admin']),
    pets: [], 
  };
};