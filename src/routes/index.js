import { Router } from "express";
import productRouter from './product.router.js';
import userRouter from './user.router.js';
import cartRouter from './cart.router.js';
import sessionsRouter from './sessions.router.js';
import mocksRouter from './mocks.router.js';
import adoptionRouter from './adoption.router.js';

export default class MainRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.use('/products', productRouter);
    this.router.use('/users', userRouter);
    this.router.use('/carts', cartRouter);
    this.router.use('/sessions', sessionsRouter);
    this.router.use('/mocks', mocksRouter);
    this.router.use('/adoptions', adoptionRouter);
  }

  getRouter() {
    return this.router;
  }
}
