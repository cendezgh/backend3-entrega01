import MongoDao from "./mongo.dao.js";
import { AdoptionModel } from "./models/adoption.model.js";

export default class AdoptionDaoMongoDB extends MongoDao {
  constructor() {
    super(AdoptionModel);
  }
}