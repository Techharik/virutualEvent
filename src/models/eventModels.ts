import { Schema, model, Document, Types } from "mongoose";

export interface IEvent extends Document {
    _id: Types.ObjectId;

    date: Date;
    time: string;
    description: string;
    participants: string[];
    organizerId: string;
}

const eventSchema = new Schema<IEvent>(
    {
        date: { type: Date, required: true },
        time: { type: String, required: true },
        description: { type: String, required: true },
        participants: { type: [String], default: [] },
        organizerId: { type: String, required: true },
    },
    { timestamps: true }
);

export const EventModel = model<IEvent>("Event", eventSchema);
