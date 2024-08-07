import { Router, Request, Response, NextFunction } from 'express';
import { TextService } from '../services/conv.service';

const router = Router();
const textService = new TextService();

router.post('/start-conversation', async (req: Request, res: Response, next: NextFunction) => {
	const { prompt } = req.body;

	try {
		const result = await textService.generateSolution(prompt);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

router.post('/continue-conversation/:id', async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const { prompt } = req.body;

	try {
		const result = await textService.generateSolution(prompt, id);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

export default router;
