import { z } from "zod";
import { playerValidation } from "./validation";

export type PlayerType = z.infer<typeof playerValidation>
