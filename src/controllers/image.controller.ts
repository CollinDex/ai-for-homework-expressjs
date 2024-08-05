import { NextFunction, Request, Response } from 'express';
import { ImageService } from '../services';
import { sendJsonResponse } from '../helpers';

const imageService = new ImageService();

const getImgSolution = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { data, message } = await imageService.generateSolution(req.body.image);
		sendJsonResponse(res, 200, message, { data });
	} catch (error) {
		next(error);
	}
};

export { getImgSolution };
