import { z } from 'zod';


export const registerEventSchema = z.object({
    date: z.coerce.date().min(new Date(), "Date must be today or later"),
    time: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:MM format"),
    description: z.string().min(12, "Minimum twelve characters required"),
    participants: z.array(z.string()).optional()

});


export const updateEventSchema = z.object({
    date: z.string().optional(),
    time: z.string().optional(),
    description: z.string().min(5).optional(),
    participants: z.array(z.string()).optional(),
    organizerId: z.string().optional()
});




export const registerForEventSchema = z.object({
    eventId: z.string().min(1),
});


// date: { type: String, required: true },
// time: { type: String, required: true },
// description: { type: String, required: true },
// participants: { type: [String], default: [] },
// organizerId: { type: String, required: true },