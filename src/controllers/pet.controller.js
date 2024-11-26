import Controllers from "./class.controller.js";
import PetService from "../services/pet.services.js";

const petService = new PetService();

export default class PetController extends Controllers {
  constructor() {
    super(petService);
  }  
}
