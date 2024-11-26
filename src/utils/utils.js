import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

import bcryptjs from "bcryptjs";

export const createHash = (password) =>
    bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

export const isValidPassword = (password, user) =>
    bcryptjs.compareSync(password, user.password);


export const createResponse = (req, res, statusCode, data, error = null) => {
    return res.status(statusCode).json({
        data,
        status: statusCode,
        error,
        path: req.url,
    });
};

import { faker } from '@faker-js/faker';

export const generateProducts = () => {  // <-- Función añadida
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 0, max: 100 }),
        code: faker.string.alphanumeric({ length: 10 }),
    };
};