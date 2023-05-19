import type { z } from 'zod'

import type {
    gameValidation,
    newGameValidation
} from './HomeNewGameDialog.validation'

export type NewGameFormValue = z.infer<typeof newGameValidation>

export type GameType = z.infer<typeof gameValidation>
