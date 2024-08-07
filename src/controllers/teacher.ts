import { Request, Response, NextFunction } from 'express';
import { TeacherService } from '../services/teacher.service';
import { sendJsonResponse } from '../helpers';

const textService = new TeacherService();

const startTConversation = async (req: Request, res: Response, next: NextFunction) => {
	const { prompt } = req.body;

	try {
		const { data, message, conversationId } = await textService.generateSolution(prompt);
		const updatedData = { ...data, id: conversationId };
		sendJsonResponse(res, 200, message, updatedData);
	} catch (error) {
		next(error);
	}
};

const continueTConversation = async (req: Request, res: Response, next: NextFunction) => {
	const id = req.query.id as string;
	const { prompt } = req.body;

	try {
		const { data, message, conversationId } = await textService.generateSolution(prompt, id);
		const updatedData = { ...data, id: conversationId };
		sendJsonResponse(res, 200, message, updatedData);
	} catch (error) {
		next(error);
	}
};

// const getAllConversations = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		const conversations = await textService.getAllConversations();
// 		sendJsonResponse(res, 200, 'All conversations retrieved successfully', conversations);
// 	} catch (error) {
// 		next(error);
// 	}
// };

export { startTConversation, continueTConversation };
