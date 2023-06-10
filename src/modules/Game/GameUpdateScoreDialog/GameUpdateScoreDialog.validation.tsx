import { z } from "zod";

export const updateGameScoreValidation = z.object({
    score: z
        .number()
        .int()
        .max(144, "Can't be more than 144")
})
