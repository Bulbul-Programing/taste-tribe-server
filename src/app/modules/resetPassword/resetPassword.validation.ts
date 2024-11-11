import { z } from 'zod';

const resetPassword = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }),
    })
});

const validateCode = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }),
        code: z.string({ required_error: "Code is required" }),
    })
});

export const resetPasswordValidationSchema = {
    resetPassword,
    validateCode
}
