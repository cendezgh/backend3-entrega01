import dotenv from 'dotenv';
dotenv.config();
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "./passport/jwt.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./db/connection.js";
import MainRouter from "./routes/index.js";
import "./daos/mongodb/models/cart.model.js";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.config.js'; 

const mainRouter = new MainRouter();

const app = express();

app
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(morgan("dev"))
  .use(cookieParser())
  .use("/api", mainRouter.getRouter())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  .use(errorHandler);

initMongoDB()
  .then(() => console.log("base de datos conectada"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server OK PORT: ${PORT}`)); 

export default server;
export { PORT };