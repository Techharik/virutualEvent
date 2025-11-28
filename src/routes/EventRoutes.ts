import { Router } from "express"
import { EventController } from "../controllers/eventControllers";
import { MongoEventRepository } from "../domain/repositories/Implementations/MongoEventRepository";
import { ZodEventValidator } from "../domain/validators/zodEventValidator";
import { authMiddleware } from "../middlewares/auth";
import { EmailService } from "../services/EmailServices";
import { EventService } from "../services/eventServices";
import { asyncHandler } from "../utils/asyncHandler";



const router = Router();

// Di
const validator = new ZodEventValidator();
const repo = new MongoEventRepository();
const emailService = new EmailService()
const service = new EventService(validator, repo, emailService);
const controller = new EventController(service)

router.get('/', asyncHandler(controller.getAllEvents))
router.get('/:id', asyncHandler(controller.getEvent))
router.post('/register', authMiddleware, asyncHandler(controller.registerEvent))
router.put('/:id', authMiddleware, asyncHandler(controller.updateEvent))
router.delete('/:id', authMiddleware, asyncHandler(controller.deleteEvent))
router.post('/booking', authMiddleware, asyncHandler(controller.registerParticipants))


export default router;