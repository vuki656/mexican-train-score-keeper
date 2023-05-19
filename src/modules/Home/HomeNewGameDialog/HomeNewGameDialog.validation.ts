import { z } from 'zod'

const NANOID_MIN_LENGTH = 21
const NANOID_MAX_LENGTH = 36

const nanoidValidation = z
    .string()
    .min(NANOID_MIN_LENGTH)
    .max(NANOID_MAX_LENGTH)

const playerValidation = z.object({
    id: nanoidValidation,
    name: z
        .string()
        .min(1, 'Required'),
})

export const newGameValidation = z.object({
    players: z.array(playerValidation),
})

const gameValidation = z.object({
    createdAt: z.string(),
    id: nanoidValidation,
    players: z.array(playerValidation),
})

export const gamesValidation = z.array(gameValidation)
