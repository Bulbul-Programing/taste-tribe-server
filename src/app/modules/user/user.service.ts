import { TUser } from "./user.interface";
import { userModel } from "./user.model";

const createNewUserIntoDB = async(payload : TUser) => {
    const createUser = await userModel.create(payload);
    const userData = await userModel.findById(createUser._id).select({password : 0})
    return userData;
}

export const userService = {
    createNewUserIntoDB
}