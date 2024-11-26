import { faker } from '@faker-js/faker';

export const generatePets = () => {
  const genders = ['male', 'female'];
  const gender = faker.helpers.arrayElement(genders);
  const animal = faker.animal.type();

  return {
    name: faker.animal.catName(),
    species: animal,
    gender: gender,
    age: faker.number.int({ min: 0, max: 15 }),
    breed: faker.animal.dogBreed(), 
    adopted: faker.datatype.boolean(), 
  };
};