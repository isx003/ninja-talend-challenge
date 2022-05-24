import express from "express"
import UsersController from "../controllers/UsersController"
import UserDeleteValidation from "../validations/UserDeleteValidation"
import UserEditValidation from "../validations/UserEditValidation"
import UserStoreValidation from "../validations/UserStoreValidation"
import UserUpdateValidation from "../validations/UserUpdateValidation"

const router = express.Router()

const UserRouters = () => {
    router.get("/", UsersController.index)
    router.post("/", UserStoreValidation, UsersController.store)
    router.get("/:userId", UserEditValidation, UsersController.edit)
    router.put("/:userId", UserUpdateValidation, UsersController.update)
    router.delete("/:userId", UserDeleteValidation, UsersController.delete)
    return router
}

export default UserRouters