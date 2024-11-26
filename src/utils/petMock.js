import { faker } from "@faker-js/faker";

export const generatePets = () => {
  const petType = faker.helpers.arrayElement(["Cat", "Dog"]); 

  return {
    name: faker.animal.petName(),
    type: petType,
  };
};