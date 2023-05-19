import { z } from 'zod'

import { playerValidation } from './HomeNewGameDialog'

import { nanoidValidation } from '@/shared/validation'

export const gameValidation = z.object({
    createdAt: z.string(),
    id: nanoidValidation,
    players: z.array(playerValidation),
})

export const gamesValidation = z.array(gameValidation)
