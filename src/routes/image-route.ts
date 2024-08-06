import { Router } from "express";
import { getImgSolution } from "../controllers";
import { textPromptSchema } from "../validationSchema/text-prompt";
import { validateData } from "../middleware/validationMiddleware";

const imgRoute= Router();

imgRoute.post("/image", validateData(textPromptSchema), getImgSolution);

export { imgRoute };
