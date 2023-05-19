import { z } from 'zod'

import { nanoidValidation } from '@/shared/validation'

export const playerValidation = z.object({
    id: nanoidValidation,
    name: z
        .string()
        .min(1, 'Required'),
})

export const newGameValidation = z.object({
    players: z.array(playerValidation),
})

