import { Schema, model } from "mongoose";

export const petCollectionName = "pets";

export const petSchema = new Schema({
  name: { type: String, required: true },
  adopted: { type: Boolean, default: false },
});

export const PetModel = model(petCollectionName, petSchema);
