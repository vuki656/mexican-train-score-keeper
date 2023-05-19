import { z } from 'zod'

const NANOID_MIN_LENGTH = 21

const playerValidation = z.object({
    id: z
        .string()
        .min(NANOID_MIN_LENGTH),
    name: z
        .string()
        .min(1, 'Required'),
})

export const newGameValidation = z.object({
    players: z.array(playerValidation),
})

