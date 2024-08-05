import { Router } from "express";
import { getImgSolution } from "../controllers";


const imgRoute= Router();

imgRoute.post("/image", getImgSolution);

export { imgRoute };
