import UserDaoMongo from "../daos/mongodb/user.dao.js";

const userDao = new UserDaoMongo();

export default class UserRepository {
  async getUserById(id) {
    return await userDao.getById(id);
  }

  async getUserByEmail(email) {
    return await userDao.getByEmail(email);
  }

  async createUser(userData) {
    return await userDao.create(userData);
  }

  async updateUser(id, userData) {
    return await userDao.update(id, userData);
  }
}
