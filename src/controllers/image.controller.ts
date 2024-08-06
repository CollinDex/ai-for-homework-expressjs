import { NextFunction, Request, Response } from 'express';
import { ImageService } from '../services';
import { sendJsonResponse } from '../helpers';

const imageService = new ImageService();

const getImgSolution = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { image } = req.body; 
		const { data, message } = await imageService.generateSolution(image);
		sendJsonResponse(res, 200, message, { data });
	} catch (error) {
		next(error);
	}
};

export { getImgSolution };
