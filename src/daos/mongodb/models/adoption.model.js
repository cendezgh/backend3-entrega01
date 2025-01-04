import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "pets", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  adoptionDate: { type: Date, required: true },
});

export const AdoptionModel = mongoose.model("adoptions", adoptionSchema);