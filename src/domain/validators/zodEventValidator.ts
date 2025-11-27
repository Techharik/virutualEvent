import { registerEventSchema, updateEventSchema } from "../../schemaTypes/eventTypes";
import { ValidationError } from "../../utils/errorHandler";
import { RegisterEventDTO, UpdateEventDTO } from "./dto/eventDTO";
import { IEventValidator } from "./IEventValidator";

export class ZodEventValidator implements IEventValidator {
    registerEvent(data: any): RegisterEventDTO {
        const result = registerEventSchema.safeParse(data);
        if (!result.success) {
            const msg = result.error.issues[0].message
            throw new ValidationError(msg)
        }
        return result.data
    }
    updateEvent(data: any): UpdateEventDTO {
        const parsed = updateEventSchema.safeParse(data);

        if (!parsed.success) {
            const msg = parsed.error.issues[0].message

            throw new ValidationError(msg);
        }

        const dto = parsed.data;
        return dto
    }
}