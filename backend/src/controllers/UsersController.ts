import { Request, Response } from "express"
import User from "../models/User"
import { StatusCodes } from "http-status-codes";
import Address from "../models/Address";
import sequelizeErrors from "../utils/sequelizeErrors";

class UserController{
    index = async (req: Request, res: Response) => {
        try {
            const users = await User.findAll({
                attributes: ["id", "firstname", "lastname", "email", "birthDate"],
                include: {
                    model: Address,
                    as: 'address',
                    attributes: ["id", "street", "city", "country", "postalCode"]
                }
            })
            res.status(StatusCodes.OK).json(users)
        } catch (error) {
            const errors = sequelizeErrors(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors})
        }
    }

    store = async (req: Request, res: Response) => {
        try {
            let user = await User.create(req.body, {
                include: {
                    model: Address,
                    as: 'address'
                }
            })
            user = user.toJSON()
            delete user.createdAt
            delete user.updatedAt
            res.status(StatusCodes.CREATED).json(user)
        } catch (error) {
            console.log(error)
            const errors = sequelizeErrors(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors})
        }
    }

    edit = async (req: Request, res: Response) => {
        try {
            const user = await User.findByPk(req.params.userId, {
                attributes: ["id", "firstname", "lastname", "email", "birthDate"],
                include: {
                    model: Address,
                    as: 'address',
                    attributes: ["id", "street", "city", "country", "postalcode"]
                }
            })
            if(!user){
                return res.status(StatusCodes.NOT_FOUND).send("User not found")
            }

            res.status(StatusCodes.OK).json(user)
        } catch (error) {
            const errors = sequelizeErrors(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors})
        }
    }


    update = async (req: Request, res: Response) => {
        try {
            let user = await User.findByPk(req.params.userId, {
                attributes: ["id"],
                include: {
                    model: Address,
                    as: 'address',
                    attributes: ["id"]
                }
            })
            if(!user){
                return res.status(StatusCodes.NOT_FOUND).send("User not found")
            }

            await User.update(req.body, {
                where: {
                    id: user.id
                }
            })

            const address = req.body.address
            delete req.body.address

            await Address.update(address, {
                where: {
                    id: user.address.id
                }
            })

            user = await User.findByPk(req.params.userId, {
                attributes: ["id", "firstname", "lastname", "email", "birthDate"],
                include: {
                    model: Address,
                    as: 'address',
                    attributes: ["id", "street", "city", "country", "postalcode"]
                }
            })
            res.status(StatusCodes.OK).json(user)
        } catch (error) {
            console.log(error)
            const errors = sequelizeErrors(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors})
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const user = await User.findByPk(req.params.userId)
            if(!user){
                return res.status(StatusCodes.NOT_FOUND).send("User not found")
            }
            await user.destroy()
            res.status(StatusCodes.OK).send("OK")
        } catch (error) {
            const errors = sequelizeErrors(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors})
        }
    }
}

export default new UserController