import { Router } from 'express';
import { passportCall } from "../passport/passportCall.js";
import { createResponse } from "../utils/utils.js";
import UserDTO from "../dto/user.dto.js";

const router = Router();

router.get('/current', passportCall('current'), (req, res) => {
  if (!req.user) {
    return createResponse(req, res, 401, null, { msg: 'Unauthorized' });
  }
  const userDTO = new UserDTO(req.user);
  return createResponse(req, res, 200, userDTO);
});

export default router;
