import { Router } from "express";
import { faker } from "@faker-js/faker";
import { generateUser } from "../utils/userMock.js";
import { generatePets } from "../utils/petMock.js";
import ProductService from "../services/product.services.js";
import UserService from "../services/user.services.js";
import PetService from "../services/pet.services.js";

const productService = new ProductService();
const userService = new UserService();
const petService = new PetService();

const router = Router();

router.get('/mockingproducts', (req, res) => {
  const products = Array.from({ length: 100 }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.datatype.number({ min: 1, max: 100 }),
  }));
  res.json({ status: "success", payload: products });
});

router.get('/mockingusers', (req, res) => {
  const users = Array.from({ length: 50 }, () => generateUser());
  res.json({ status: "success", payload: users });
});

router.get('/mockingpets', (req, res) => {
  try {
    const pets = Array.from({ length: 100 }, () => ({
      name: faker.animal.type(),
      adopted: faker.datatype.boolean(),
    }));
    res.json({ status: "success", payload: pets });
  } catch (error) {
    console.error("Error en /mockingpets:", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.put('/mockingpets/:id/adopt', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPet = await petService.adoptPet(id);

    if (!updatedPet) {
      return res.status(404).json({ status: "error", message: "Mascota no encontrada" });
    }

    res.json({ status: "success", payload: updatedPet });
  } catch (error) {
    console.error("Error en /mockingpets/:id/adopt:", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post('/generateData', async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      return res.status(400).json({ status: "error", message: "Parámetros 'users' y 'pets' son requeridos" });
    }

    const newUsers = [];
    for (let i = 0; i < users; i++) {
      const user = generateUser();
      const createdUser = await userService.create(user);
      newUsers.push(createdUser);
    }

    const newPets = [];
    for (let i = 0; i < pets; i++) {
      const pet = generatePets();
      const createdPet = await petService.create(pet);
      newPets.push(createdPet);
    }

    res.json({ status: "success", users: newUsers, pets: newPets });
  } catch (error) {
    console.error("Error en /generateData:", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
