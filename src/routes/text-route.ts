import { Router } from "express";
import { getTxtSolution } from "../controllers";


const textRoute= Router();

textRoute.post("/text", getTxtSolution);

export { textRoute };
