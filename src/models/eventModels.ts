import { Schema, model, Document, Types } from "mongoose";

export interface IEvent extends Document {
    _id: Types.ObjectId;

    date: Date;
    time: string;
    description: string;
    participants?: Types.ObjectId[];
    organizerId: Types.ObjectId;
}

const eventSchema = new Schema<IEvent>(
    {
        date: { type: Date, required: true },
        time: { type: String, required: true },
        description: { type: String, required: true },
        participants: [{ type: Types.ObjectId, ref: 'User' }],
        organizerId: { type: Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

export const EventModel = model<IEvent>("Event", eventSchema);
