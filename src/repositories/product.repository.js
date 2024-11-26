import ProductDaoMongo from "../daos/mongodb/product.dao.js";

const productDao = new ProductDaoMongo();

export default class ProductRepository {
  async getAllProducts() {
    return await productDao.getAll();
  }

  async getProductById(id) {
    return await productDao.getById(id);
  }

  async createProduct(productData) {
    return await productDao.create(productData);
  }

  async updateProduct(id, productData) {
    return await productDao.update(id, productData);
  }

  async deleteProduct(id) {
    return await productDao.delete(id);
  }
}
