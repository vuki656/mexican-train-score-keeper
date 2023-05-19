import { z } from 'zod'

import { ROUND_AMOUNT } from '@/shared/constants'
import { nanoidValidation } from '@/shared/validation'

const roundValidation = z.object({
    points: z
        .number()
        .nonnegative(),
    roundNumber: z
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

export const newGameValidation = z.object({
    players: z.array(playerValidation),
})

