import { z } from 'zod'

import {
    NANOID_MAX_LENGTH,
    NANOID_MIN_LENGTH,
    ROUND_AMOUNT,
} from './constants'

export const nanoidValidation = z
    .string()
    .min(NANOID_MIN_LENGTH)
    .max(NANOID_MAX_LENGTH)

const roundValidation = z.object({
    points: z
        .number()
        .nonnegative(),
    number: z
        .number()
        .nonnegative()
        .max(ROUND_AMOUNT),
})

export const playerValidation = z.object({
    id: nanoidValidation,
    name: z
        .string()
        .min(1, 'Required'),
    rounds: z.array(roundValidation),
})
