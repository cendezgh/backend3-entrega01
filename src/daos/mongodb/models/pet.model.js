import { Schema, model } from "mongoose";

export const petCollectionName = "pets";

export const petSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Cat', 'Dog'], required: true }
});

export const PetModel = model(petCollectionName, petSchema);