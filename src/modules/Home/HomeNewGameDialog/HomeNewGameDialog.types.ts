import type { z } from 'zod'

import type { newGameValidation } from './HomeNewGameDialog.validation'

export type NewGameFormValue = z.infer<typeof newGameValidation>
