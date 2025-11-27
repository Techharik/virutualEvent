// after validation returning shape
import { z } from "zod";
import { loginSchema, registerShema } from "../../../schemaTypes/userTypes";


export type RegisterDTO = z.infer<typeof registerShema>
export type LoginDTO = z.infer<typeof loginSchema>

