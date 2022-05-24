import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { StatusCodes } from "http-status-codes";

const UserDeleteValidation = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        userId: Joi.number().required()
    })

    const validation = schema.validate(req.params)
    if( validation.error ){
        const errors = validation.error.details.map(detail=>detail.message)
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors
        })
    }
    next()
}

export default UserDeleteValidation