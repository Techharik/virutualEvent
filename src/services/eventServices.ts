import { RegisterForEventDTO } from "domain/validators/dto/eventDTO";
import { Events } from "../domain/entities/Event";
import { IEventRepository } from "../domain/repositories/IEventRepository";
import { IEventValidator } from "../domain/validators/IEventValidator";
import { ConflictError, ForbiddenError, NotFoundError } from "../utils/errorHandler";

export class EventService {
    constructor(private validator: IEventValidator, private repo: IEventRepository) { }

    async register(data: any, organizerId: string) {
        //    validate the event input;
        const dto = this.validator.registerEvent(data);

        const event = new Events("", dto.date, dto.time, dto.description, dto.participants, organizerId);

        const result = this.repo.create(event);
        return result;
    }

    async findAll() {
        const result = this.repo.findAll();
        return result
    }
    async findOne(id: string) {
        const result = this.repo.findSingle(id);
        if (!result) {
            throw new NotFoundError("Event Not Exists")
        }
        return result
    }
    async update(id: string, data: any, userId: string) {
        //validate the data
        const dto = this.validator.updateEvent(data);
        const event = await this.repo.findSingle(id)
        if (!event) {
            throw new NotFoundError('Event id not found');
        }
        if (event.organizerId === userId) {
            throw new ForbiddenError("You are not allowed to update this event")
        }
        const result = this.repo.update(id, dto);
        return result
    }

    async delete(id: string, userId: string) {
        const event = await this.repo.findSingle(id)
        if (!event) {
            throw new NotFoundError('Event id not found');
        }
        if (event.organizerId === userId) {
            throw new ForbiddenError("You are not allowed to update this event")
        }
        const result = this.repo.delete(id);
        return result
    }

    async registerForEvent(eventId: string, userId: string) {
        const event = await this.repo.findSingle(eventId);
        if (!event) {
            throw new NotFoundError("Event not found");
        }
        if (event.organizerId === userId) {
            throw new ForbiddenError("Organizer cannot register for their own event");
        }
        if (event.participants.includes(userId)) {
            throw new ConflictError("User already registered for this event");
        }
        return await this.repo.registerParticipant(eventId, userId);
    }

}