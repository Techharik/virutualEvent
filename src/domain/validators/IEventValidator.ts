import { RegisterEventDTO, UpdateEventDTO } from "./dto/eventDTO";

export interface IEventValidator {
    registerEvent(data: any): RegisterEventDTO;
    updateEvent(data: any): UpdateEventDTO;
}