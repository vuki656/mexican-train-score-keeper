import { z } from 'zod'

import { playerValidation } from '@/shared/validation'

export const newGameValidation = z.object({
    players: z.array(playerValidation),
})

