import { z } from "zod";

export const formInputSchema = z.object({
    cardHolderName: z.string().min(1, 'Name cannot be empty'),
    cardNumber: z.string().min(1, { message: 'Card Number cannot be empty' }).length(19, { message: 'Wrong format, 16 digits are required' }),
    cardExpiryMonth: z.number({ invalid_type_error: 'Month cannot be empty' }).min(1, { message: 'Invalid month' }).max(12, { message: 'Invalid month' }),
    cardExpiryYear: z.number({ invalid_type_error: 'Year cannot be empty' }).min(0, { message: 'Invalid year' }).max(99, { message: 'Invalid year' }),
    cardCVC: z.string().length(3, { message: "Invalid format, 3 digits required" } )
});

export type FormInputs = z.infer<typeof formInputSchema>;