import { PlayerType } from "@/shared/types"
import { z } from "zod"
import { updateGameScoreValidation } from "./GameUpdateScoreDialog.validation"

export type GameUpdateScoreDialogProps = {
    player: PlayerType | null
    onClose: () => void
}

export type GameUpdateScoreForm = z.infer<typeof updateGameScoreValidation>
