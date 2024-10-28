import z from 'zod';

const createUserValidationSchema = z.object({
    body : z.object({
        name : z.string({required_error : 'name is required', invalid_type_error : 'name must be a string'}),
        email : z.string({required_error : 'email is required', invalid_type_error : 'email must be a string'}).email(),
        password : z.string({required_error : 'password is required', invalid_type_error : 'password must be a string'}).min(8, 'password must be at least 8 characters'),
        role : z.enum(['user', 'admin'], {required_error : 'role is required'}),
        profile_picture : z.string(),
        PremiumStatus : z.boolean(),
    })
})

export const userValidationSchema = {
    createUserValidationSchema
}