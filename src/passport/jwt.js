import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import UserService from "../services/user.services.js";

const userService = new UserService();
const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = async (jwt_payload, done) => {
  if (!jwt_payload) return done(null, false, { messages: "User not found" });

  try {
    const user = await userService.getUserById(jwt_payload.userId);
    if (!user) return done(null, false, { message: "User does not exist" });
    
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

const cookieExtractor = (req) => {
  const token = req.cookies.token;
  console.log("cookie--->", token);
  return token;
};

const strategyConfigCookies = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: SECRET_KEY,
};

passport.use("current", new jwtStrategy(strategyConfigCookies, verifyToken));

export default passport;
