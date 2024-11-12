import { z } from 'zod';

const resetPasswordMailSend = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }),
    })
});
const resetPassword = z.object({
    body: z.object({
        password: z.string({ required_error: "Password is required" }),
        token: z.string({ required_error: "Token is required" })
    })
});

export const resetPasswordValidationSchema = {
    resetPasswordMailSend,
    resetPassword
}
