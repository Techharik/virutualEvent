import { Request, Response } from "express"
import { UserService } from "../services/userServices"


//using classbased DI here


export class userController {
    constructor(private userService: UserService) { }

    register = async (req: Request, res: Response) => {
        const result = await this.userService.register(req.body)
        res.status(201).json({ status: 'success', data: result })
    }
}