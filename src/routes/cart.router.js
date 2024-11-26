import { Router } from "express";
import CartController from '../controllers/cart.controller.js';
import { checkRole } from "../middlewares/checkRole.js";
import { passportCall } from "../passport/passportCall.js";

const controller = new CartController();
const router = Router();

// Rutas del carrito
router.get("/", [passportCall('current'), checkRole('admin')], controller.getAll);
router.get("/:id", [passportCall('current')], controller.getById);
router.post("/", [passportCall('current'), checkRole('admin')], controller.create);
router.put("/:id", [passportCall('current'), checkRole('admin')], controller.update);
router.delete("/:id", [passportCall('current'), checkRole('admin')], controller.delete);

// Rutas de productos en el carrito
router.post("/products/:idProd", [passportCall('current'), checkRole('user')], controller.addProdToCart);
router.delete("/:idCart/products/:idProd", [passportCall('current'), checkRole('user')], controller.removeProdToCart);
router.put("/:idCart/products/:idProd", [passportCall('current'), checkRole('user')], controller.updateProdQuantityToCart);
router.delete("/clear/:idCart", [passportCall('current'), checkRole('user')], controller.clearCart);

// Ruta para finalizar la compra
router.post("/:cid/purchase", [passportCall('current'), checkRole('user')], controller.purchase);

export default router;
