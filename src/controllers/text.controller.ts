import { NextFunction, Request, Response } from "express";
import { TextService } from "../services";
import { sendJsonResponse } from "../helpers";

const textService = new TextService();

const getTxtSolution = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { prompt } = req.body; 
      const { data, message } = await textService.generateSolution(prompt);
      sendJsonResponse(res, 200, message, data );
    } catch (error) {
      next(error);
    }
};

export { getTxtSolution };