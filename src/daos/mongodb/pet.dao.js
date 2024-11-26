import MongoDao from "./mongo.dao.js";
import { PetModel } from "./models/pet.model.js";

export default class PetDaoMongo extends MongoDao {
  constructor() {
    super(PetModel);
  }
}
