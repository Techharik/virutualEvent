import { EventEntity } from "./EventEntityType";



export class Events implements EventEntity {
    constructor(
        public id: string,
        public date: Date,
        public time: string,
        public description: string,
        public participants: string[],
        public organizerId: string
    ) { }
    registerUser(userId: string) {
        if (this.participants.includes(userId)) {
            throw new Error("User already registered for this event");
        }
        this.participants.push(userId);
    }

}