import Controllers from "./class.controller.js";
import AdoptionService from "../services/adoption.services.js";
import { createResponse } from "../utils/utils.js";

const adoptionService = new AdoptionService();

export default class AdoptionController extends Controllers {
  constructor() {
    super(adoptionService);
  }
}