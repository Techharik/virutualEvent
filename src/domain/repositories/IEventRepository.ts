import { EventEntity } from "../entities/EventEntityType";
import { UpdateEventDTO } from "../validators/dto/eventDTO";


export interface IEventRepository {
    create(data: EventEntity): Promise<EventEntity>,
    findAll(): Promise<EventEntity[]>,
    findSingle(id: string): Promise<EventEntity | null>,
    update(id: string, data: UpdateEventDTO): Promise<EventEntity>,
    delete(id: string): Promise<void>,
    registerParticipant(eventId: string, userId: string): Promise<EventEntity>
}