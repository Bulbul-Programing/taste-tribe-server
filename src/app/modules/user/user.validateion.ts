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

const addFollowerValidationSchema = z.object({
    body: z.object({
        followerId: z.string({ required_error: 'followerId is required', invalid_type_error: 'followerId must be a string' }).regex(/^[a-f\d]{24}$/i, { message: "Invalid ObjectId", }),
        userId: z.string({ required_error: 'UserId is required', invalid_type_error: 'UserId must be a string' }).regex(/^[a-f\d]{24}$/i, { message: "Invalid ObjectId", })
    })
})

export const userValidationSchema = {
    createUserValidationSchema,
    updateUserValidationSchema,
    addFollowerValidationSchema
}