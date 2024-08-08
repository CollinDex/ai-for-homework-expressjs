import { Router } from 'express';
import { textPromptSchema } from '../validationSchema/text-prompt';
import { validateData } from '../middleware/validationMiddleware';
import { getAllConversations } from '../controllers/conversation';
import { getTxtSolution } from "../controllers";

const conversationRouter = Router();

conversationRouter.post('/start-conversation', validateData(textPromptSchema), getTxtSolution);
conversationRouter.post('/continue-conversation?:id', validateData(textPromptSchema), getTxtSolution);
conversationRouter.get('/all-conversations', getAllConversations); 
export { conversationRouter };