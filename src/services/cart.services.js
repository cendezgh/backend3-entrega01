import Services from "./class.services.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
import TicketDaoMongoDB from "../daos/mongodb/ticket.dao.js";

const productDao = new ProductDaoMongoDB();
const cartDao = new CartDaoMongoDB();
const ticketDao = new TicketDaoMongoDB();

export default class CartService extends Services {
  constructor() {
    super(cartDao);
  }

  // Obtener el carrito por ID de usuario o crear uno nuevo si no existe
  async getOrCreateCartByUserId(userId) {
    console.log("userId recibido en getOrCreateCartByUserId:", userId);
  
    let userCart = await this.dao.getByUserId(userId);
    if (!userCart) {
      console.log("No existe carrito para el usuario, creando nuevo carrito...");
      userCart = await this.dao.create({ user: userId, products: [] });
    }
    return userCart;
  }

  // Agregar un producto al carrito del usuario
  async addProdToCart(userId, prodId) {
    console.log("userId en addProdToCart:", userId);
    const userCart = await this.getOrCreateCartByUserId(userId);
    return await this.dao.addProdToCart(userCart._id, prodId);
  }

  // Remover producto del carrito
  async removeProdToCart(cartId, prodId) {
    const existCart = await this.getById(cartId);
    if (!existCart) return null;

    const existProdInCart = await this.dao.existProdInCart(cartId, prodId);
    if (!existProdInCart) return null;

    return await this.dao.removeProdToCart(cartId, prodId);
  }

  // Actualizar cantidad de producto en el carrito
  async updateProdQuantityToCart(cartId, prodId, quantity) {
    const existCart = await this.getById(cartId);
    if (!existCart) return null;

    const existProdInCart = await this.dao.existProdInCart(cartId, prodId);
    if (!existProdInCart) return null;

    return await this.dao.updateProdQuantityToCart(cartId, prodId, quantity);
  }

  // Limpiar el carrito
  async clearCart(cartId) {
    const existCart = await this.getById(cartId);
    if (!existCart) return null;

    return await this.dao.clearCart(cartId);
  }

  // Procesar la compra y generar un ticket
  async purchaseCart(userId) {
    const cart = await this.getOrCreateCartByUserId(userId);
    if (!cart) return { error: "Carrito no encontrado" };

    if (!cart.user || !cart.user.email) {
      throw new Error("El carrito no tiene un usuario válido con email");
    }

    const unavailableProducts = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await productDao.getById(item.product);
      if (product && product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await productDao.update(product._id, { stock: product.stock });
        totalAmount += product.price * item.quantity;
      } else {
        unavailableProducts.push(item.product);
      }
    }

    if (totalAmount > 0) {
      const ticketData = {
        code: `TCKT-${Date.now()}`,
        amount: totalAmount,
        purchaser: cart.user.email,
        purchase_datetime: new Date(),
      };
      await ticketDao.createTicket(ticketData);
    }

    await this.update(cart._id, {
      products: cart.products.filter((item) =>
        unavailableProducts.includes(item.product)
      ),
    });

    return { ticketAmount: totalAmount, unavailableProducts };
  }
}
