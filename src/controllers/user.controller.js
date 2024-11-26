import Controllers from "./class.controller.js";
import UserService from '../services/user.services.js';
import { createResponse } from "../utils.js";

const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }

  register = async(req, res, next) => {
    try {
      const data = await this.service.register(req.body);
      if (!data) {
        return createResponse(req, res, 400, null, { msg: "User already exists" });
      }
      return createResponse(req, res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userExist = await this.service.dao.getByEmail(email);
      if (!userExist) {
        return createResponse(req, res, 404, null, { msg: "User does not exist" });
      }
      const token = await this.service.login(req.body);
      if (!token) {
        return createResponse(req, res, 401, null, { msg: "Invalid credentials" });
      }
      res.cookie('token', token, { httpOnly: true });
      return createResponse(req, res, 200, token);
    } catch (error) {
      next(error);
    }
  };

  profile = async(req, res, next) => {
    try {
      if (!req.user) {
        return createResponse(req, res, 401, null, { msg: 'Unauthorized' });
      }
      const user = await this.service.getUserById(req.user.userId);
      return createResponse(req, res, 200, user);
    } catch (error) {
      next(error);
    }
  };
}
