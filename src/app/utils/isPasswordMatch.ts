import bcrypt from 'bcrypt';

export const isPasswordMatched = async(plainPassword : string, hasPassword : string) => {
    return await bcrypt.compare(plainPassword, hasPassword)
}