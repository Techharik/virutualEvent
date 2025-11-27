import { z } from "zod";
import { registerEventSchema, registerForEventSchema, updateEventSchema } from "../../../schemaTypes/eventTypes";


export type RegisterEventDTO = z.infer<typeof registerEventSchema>
export type UpdateEventDTO = z.infer<typeof updateEventSchema>
export type RegisterForEventDTO = z.infer<typeof registerForEventSchema>