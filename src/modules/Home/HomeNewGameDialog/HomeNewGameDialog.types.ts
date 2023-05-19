import type { z } from 'zod'

import type {
    newGameValidation,
    playerValidation,
} from './HomeNewGameDialog.validation'

export type NewGameFormValue = z.infer<typeof newGameValidation>

export type PlayerType = z.infer<typeof playerValidation>
