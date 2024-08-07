import { Router } from "express";
import { getTxtSolution } from "../controllers";
import { textPromptSchema } from "../validationSchema/text-prompt";
import { validateData } from "../middleware/validationMiddleware";


const textRoute= Router();

textRoute.post("/text", validateData(textPromptSchema), getTxtSolution);

export { textRoute };
