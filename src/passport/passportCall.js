import passport from 'passport';
import { createResponse } from '../utils.js';

export const passportCall = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                console.log("Autenticación fallida, usuario no encontrado");
                return createResponse(req, res, 401, null, info.messages ? info.messages : info.toString());
            }
            req.user = user;
            console.log("Usuario autenticado:", req.user);
            next();
        })(req, res, next);
    }
};
