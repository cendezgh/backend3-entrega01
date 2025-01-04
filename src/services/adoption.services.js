import Services from "./class.services.js";
import AdoptionDaoMongoDB from "../daos/mongodb/adoption.dao.js";

const adoptionDao = new AdoptionDaoMongoDB();

export default class AdoptionService extends Services {
  constructor() {
    super(adoptionDao);
  }
}