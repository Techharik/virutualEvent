import { Request, Response } from "express";
import { EventService } from "../services/eventServices";
import { ValidationError } from "utils/errorHandler";

export class EventController {
    constructor(private eventService: EventService) {

    }

    registerEvent = async (req: Request, res: Response) => {
        const body = req.body;
        const organizerId = req.user!.id;
        const event = await this.eventService.register(body, organizerId);
        res.status(201).json({
            status: "success",
            data: event
        })

    }

    getAllEvents = async (req: Request, res: Response) => {
        const events = await this.eventService.findAll()
        res.status(200).json({
            status: "success",
            data: events
        })
    }

    getEvent = async (req: Request, res: Response) => {
        const event = await this.eventService.findOne(req.params.id);
        res.status(200).json({
            status: "success",
            data: event
        })
    }
    updateEvent = async (req: Request, res: Response) => {
        const raw = req.body;
        const id = req.params.id;
        const userId = req.user?.id
        const updatedEvent = await this.eventService.update(id, raw, userId);
        res.status(200).json({
            status: "success",
            data: updatedEvent
        })
    }
    deleteEvent = async (req: Request, res: Response) => {
        const id = req.params.id;
        const userId = req.user?.id
        const deleteEvent = await this.eventService.delete(id, userId);
        res.status(200).json({
            status: 'success',
            data: deleteEvent
        })
    }
    registerParticipants = async (req: Request, res: Response) => {
        const { eventId } = req.body;

        if (!eventId) {
            throw new ValidationError("eventId is required");
        }

        const userId = req.user!.id;
        const userEmail = req.user!.email;

        const result = await this.eventService.registerForEvent(eventId, userId, userEmail);

        return res.status(200).json({
            status: "success",
            data: result
        });
    }


}