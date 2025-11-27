import { IEvent } from "../../models/eventModels";
import { Events } from "../entities/Event";
import { EventEntity } from "../entities/EventEntityType";

export class EventMapper {
    static toEntity(doc: IEvent): EventEntity {
        return new Events(
            doc._id.toString(),
            doc.date,
            doc.time,
            doc.description,
            doc.participants,
            doc.organizerId
        );
    }

    static toEntities(docs: IEvent[]): EventEntity[] {
        return docs.map(EventMapper.toEntity);
    }
}