import Services from "./class.services.js";
import PetDaoMongo from "../daos/mongodb/pet.dao.js";

const petDao = new PetDaoMongo();

export default class PetService extends Services {
  constructor() {
    super(petDao);
  }
}
