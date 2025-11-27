import { Router } from "express";
import { ZodUserValidator } from "../domain/validators/zodUserValidator";
import { MongoUserRepository } from "../domain/repositories/Implementations/MongoUserRepository";
import { UserService } from "../services/userServices";
import { userController } from "../controllers/userControllers";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

// DI happening Here
const validator = new ZodUserValidator();
const repo = new MongoUserRepository();
const service = new UserService(validator, repo);
const controller = new userController(service);



router.post('/register', asyncHandler(controller.register));
router.post('/login', asyncHandler(controller.login));

export default router