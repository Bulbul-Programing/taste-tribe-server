import { userModel } from "../modules/user/user.model"

export const isUserExist = async (email : string) => {
    const result = await userModel.findOne({email}).select('+password')
    return result 
}