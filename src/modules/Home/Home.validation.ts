import { z } from 'zod'

const playerValidation = z.object({
    name: z.string(),
})

const gameValidation = z.object({
    createdAt: z.date(),
    players: z.array(playerValidation),
})

export const gamesValidation = z.array(gameValidation)
