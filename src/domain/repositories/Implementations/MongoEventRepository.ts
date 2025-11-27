import { EventModel } from "../../../models/eventModels";
import { NotFoundError } from "../../../utils/errorHandler";
import { Events } from "../../entities/Event";
import { EventEntity } from "../../entities/EventEntityType";
import { EventMapper } from "../../mapper/EventMapper";
import { UpdateEventDTO } from "../../validators/dto/eventDTO";
import { IEventRepository } from "../IEventRepository";


export class MongoEventRepository implements IEventRepository {
    async create(data: EventEntity): Promise<EventEntity> {
        const created = await EventModel.create({
            description: data.description,
            date: data.date,
            organizerId: data.organizerId,
            time: data.time,
            participants: data.participants
        })
        return new Events(created._id.toString(), created.date, created.time, created.description, created.participants, created.organizerId)
    }
    async findAll(): Promise<EventEntity[]> {
        const results = await EventModel.find().lean();
        return EventMapper.toEntities(results as any)
    }

    async findSingle(id: string) {
        const doc = await EventModel.findById(id)
        if (!doc) {
            return null
        }
        return new Events(doc._id.toString(), doc.date, doc.time, doc.description, doc.participants, doc.organizerId)
    }
    async update(id: string, data: UpdateEventDTO) {
        const updates: any = {};
        if (data.date) updates.date = data.date;
        if (data.time) updates.time = data.time;
        if (data.description) updates.description = data.description;
        if (data.participants) updates.participants = data.participants;
        if (data.organizerId) updates.organizerId = data.organizerId;

        const updated = await EventModel.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        if (!updated) {
            throw new NotFoundError("Event not found");
        }

        return new Events(
            updated._id.toString(),
            updated.date,
            updated.time,
            updated.description,
            updated.participants,
            updated.organizerId
        );
    }

    async delete(id: string): Promise<any> {
        const result = await EventModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundError("Event not found");
        }
        return { message: 'Deleted Successfully' };
    }
    async registerParticipant(eventId: string, userId: string) {
        const updated = await EventModel.findByIdAndUpdate(
            eventId,
            { $addToSet: { participants: userId } },
            { new: true }
        );

        if (!updated) throw new NotFoundError("Event not found");

        return EventMapper.toEntity(updated);
    }


}