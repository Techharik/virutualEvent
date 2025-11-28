import { Request, Response } from "express";
import { EventService } from "../services/eventServices";
import { ValidationError } from "utils/errorHandler";

export class EventController {
    constructor(private eventService: EventService) {

    }

    async registerEvent(req: Request, res: Response) {
        const body = req.body;
        const organizerId = req.user!.id;
        const event = this.eventService.register(body, organizerId);
        res.status(201).json({
            status: "success",
            data: event
        })

    }

    async getAllEvents(req: Request, res: Response) {
        const events = this.eventService.findAll()
        res.status(200).json({
            status: "success",
            data: events
        })
    }

    async getEvent(req: Request, res: Response) {
        const event = this.eventService.findOne(req.params.id);
        res.status(200).json({
            status: "success",
            data: event
        })
    }
    async updateEvent(req: Request, res: Response) {
        const raw = req.body();
        const id = req.params.id;
        const userId = req.user?.id
        const updatedEvent = this.eventService.update(id, raw, userId);
        res.status(200).json({
            status: "success",
            data: updatedEvent
        })
    }
    async deleteEvent(req: Request, res: Response) {
        const id = req.params.id;
        const userId = req.user?.id
        const deleteEvent = this.eventService.delete(id, userId);
        res.status(200).json({
            status: 'success',
            data: deleteEvent
        })
    }
    async registerParticipants(req: Request, res: Response) {
        const { eventId } = req.body;

        if (!eventId) {
            throw new ValidationError("eventId is required");
        }

        const userId = req.user!.id;

        const result = await this.eventService.registerForEvent(eventId, userId);

        return res.status(200).json({
            status: "success",
            data: result
        });
    }


}