import { z } from 'zod'

import {
    nanoidValidation,
    playerValidation
} from '@/shared/validation'

export const gameValidation = z.object({
    createdAt: z.string(),
    id: nanoidValidation,
    players: z.array(playerValidation),
})

export const gamesValidation = z.array(gameValidation)
