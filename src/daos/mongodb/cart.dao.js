import MongoDao from "./mongo.dao.js";
import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB extends MongoDao {
  constructor() {
    super(CartModel);
  }

  // Método para crear un carrito vacío
  async create(data = { user: null, products: [] }) {
    console.log("Datos para crear el carrito:", data); // Verificar datos de creación de carrito
    return await this.model.create(data);
  }

  // Obtener el carrito de un usuario específico
  async getByUserId(userId) {
    return await this.model
      .findOne({ user: userId })
      .populate("products.product")
      .populate("user"); // Añade esta línea
  }

  // Método para obtener un carrito por su ID y popular los productos
  async getById(id) {
    try {
      return await this.model.findById(id).populate("products.product");
    } catch (error) {
      throw new Error(error);
    }
  }

  // Método para agregar un producto al carrito
  async addProdToCart(cartId, prodId) {
    try {
      const existProdInCart = await this.existProdInCart(cartId, prodId);
      if (existProdInCart) {
        return await this.model.findOneAndUpdate(
          { _id: cartId, "products.product": prodId },
          {
            $set: {
              "products.$.quantity": existProdInCart.products[0].quantity + 1,
            },
          },
          { new: true }
        );
      } else {
        return await this.model.findByIdAndUpdate(
          cartId,
          { $push: { products: { product: prodId } } },
          { new: true }
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // Método para verificar si un producto ya está en el carrito
  async existProdInCart(cartId, prodId) {
    try {
      return await this.model.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  // Método para remover un producto específico del carrito
  async removeProdToCart(cartId, prodId) {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: prodId } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  // Método para actualizar la cantidad de un producto en el carrito
  async updateProdQuantityToCart(cartId, prodId, quantity) {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cartId, "products.product": prodId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  // Método para vaciar el carrito
  async clearCart(cartId) {
    try {
      return await this.model.findByIdAndUpdate(
        cartId,
        { $set: { products: [] } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
