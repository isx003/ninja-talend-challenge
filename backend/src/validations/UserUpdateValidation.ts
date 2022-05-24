import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { StatusCodes } from "http-status-codes";

const UserUpdateValidation = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        userId: Joi.number().required(),
        firstname: Joi.string().regex(/^[a-zA-Z]*$/, 'only letters'),
        lastname: Joi.string().regex(/^[a-zA-Z]*$/, 'only letters'),
        email: Joi.string().email(),
        birthDate: Joi.string().regex(/^\d{4}[./-]\d{2}[./-]\d{2}$/, 'incorrect format'),
        address: {
            street: Joi.string().required(),
            city: Joi.string().required(),
            country: Joi.string().required(),
            postalcode: Joi.string().required()
        }
    })

    const data = {
        ...req.body,
        userId: req.params.userId
    }

    const validation = schema.validate(data)
    if( validation.error ){
        const errors = validation.error.details.map(detail=>detail.message)
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors
        })
    }
    next()
}

export default UserUpdateValidation