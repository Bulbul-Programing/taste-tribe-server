import z from 'zod';

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'name is required', invalid_type_error: 'name must be a string' }),
        email: z.string({ required_error: 'email is required', invalid_type_error: 'email must be a string' }).email(),
        password: z.string({ required_error: 'password is required', invalid_type_error: 'password must be a string' }).min(6, 'password must be at least 6 characters'),
        role: z.enum(['user', 'admin'], { required_error: 'role is required' }),
        profilePicture: z.string({ required_error: 'Profile Photo is required', invalid_type_error: 'profile photo must be a string' }),
        premiumStatus: z.boolean(),
    })
})
const updateUserValidationSchema = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'name must be a string' }).optional(),
        email: z.string({ required_error: 'email is required', invalid_type_error: 'email must be a string' }).email(),
        currentPassword: z.string({ invalid_type_error: 'current must be a string' }).optional(),
        newPassword: z.string({ invalid_type_error: 'new password be a string' }).optional(),
        profilePicture: z.string({ invalid_type_error: 'profile photo must be a string' }).optional(),
    })
})

export const userValidationSchema = {
    createUserValidationSchema,
    updateUserValidationSchema
}