import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, // Asegúrate de que "users" esté en minúsculas si así lo tienes en UserModel
  products: [
    {
      _id: false,
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, default: 1 }
    }
  ]
});

export const CartModel = mongoose.model("carts", cartSchema); // Asegúrate de que esté en minúsculas si así lo usas en otros lugares
