import Controllers from "./class.controller.js";
import PetService from "../services/pet.services.js";

const petService = new PetService();

export default class PetController extends Controllers {
  constructor() {
    super(petService);
  }

  // Métodos adicionales para mascotas (si es necesario)
  async adoptPet(req, res, next) {
    try {
      const { id } = req.params;
      const pet = await this.service.adoptPet(id);

      if (!pet) {
        return res.status(404).json({ message: "Mascota no encontrada" });
      }

      res.json({ status: "success", payload: pet });
    } catch (error) {
      next(error);
    }
  }
}
