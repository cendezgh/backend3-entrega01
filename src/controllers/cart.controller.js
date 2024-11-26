import Controllers from "./class.controller.js";
import CartService from '../services/cart.services.js';
import { createResponse } from "../utils.js";

const cartService = new CartService();

export default class CartController extends Controllers {
  constructor() {
    super(cartService);
  }

  // Método para agregar un producto al carrito
  addProdToCart = async (req, res, next) => {
    try {
      const userId = req.user._id;
      console.log("userId en el controlador addProdToCart:", userId);
  
      const { idProd } = req.params;
      const newProdToUserCart = await this.service.addProdToCart(userId, idProd);
  
      if (!newProdToUserCart) {
        return createResponse(req, res, 404, { msg: "Error adding product to cart" });
      }
      return createResponse(req, res, 200, newProdToUserCart);
    } catch (error) {
      next(error);
    }
  };

  // Método para eliminar un producto del carrito
  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToUserCart = await this.service.removeProdToCart(idCart, idProd);

      if (!delProdToUserCart) {
        return createResponse(req, res, 404, { msg: "Cart or product not found" });
      }
      return createResponse(req, res, 200, { msg: `Product ${idProd} removed from cart` });
    } catch (error) {
      next(error);
    }
  };

  // Método para actualizar la cantidad de un producto en el carrito
  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;

      const updatedCart = await this.service.updateProdQuantityToCart(idCart, idProd, quantity);

      if (!updatedCart) {
        return createResponse(req, res, 404, { msg: "Cart or product not found" });
      }
      return createResponse(req, res, 200, updatedCart);
    } catch (error) {
      next(error);
    }
  };

  // Método para vaciar el carrito
  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearedCart = await this.service.clearCart(idCart);

      if (!clearedCart) {
        return createResponse(req, res, 404, { msg: "Cart not found" });
      }
      return createResponse(req, res, 200, { msg: "Cart cleared successfully" });
    } catch (error) {
      next(error);
    }
  };

  // Método para finalizar la compra y generar el ticket
  purchase = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const result = await this.service.purchaseCart(userId);
      if (result.error) {
        return createResponse(req, res, 404, { msg: result.error });
      }
      return createResponse(req, res, 200, result);
    } catch (error) {
      next(error);
    }
  };
}
