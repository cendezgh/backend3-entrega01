import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";

const cartDao = new CartDaoMongoDB();

export default class CartRepository {
  async addProductToCart(cartId, productId) {
    return await cartDao.addProdToCart(cartId, productId);
  }
}