import { z } from 'zod'

import {
    NANOID_MAX_LENGTH,
    NANOID_MIN_LENGTH,
} from './constants'

export const nanoidValidation = z
    .string()
    .min(NANOID_MIN_LENGTH)
    .max(NANOID_MAX_LENGTH)
