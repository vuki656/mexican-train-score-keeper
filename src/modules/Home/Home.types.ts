import type { z } from 'zod'

import type { gameValidation } from './Home.validation'

export type GameType = z.infer<typeof gameValidation>
