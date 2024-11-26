import Services from "./class.services.js";
import PetDaoMongo from "../daos/mongodb/pet.dao.js";

const petDao = new PetDaoMongo();

export default class PetService extends Services {
  constructor() {
    super(petDao);
  }

  // Método adicional: Adoptar una mascota
  async adoptPet(id) {
    const pet = await this.dao.getById(id);

    if (!pet) {
      return null;
    }

    return await this.dao.update(id, { adopted: true });
  }
}
