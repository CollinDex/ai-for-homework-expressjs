import { Router } from 'express';
import { textPromptSchema } from '../validationSchema/text-prompt';
import { validateData } from '../middleware/validationMiddleware';
//import { startConversation, continueConversation, getAllConversations } from '../controllers/conversation';
import { getTxtSolution } from "../controllers";

const conversationRouter = Router();

conversationRouter.post('/start-conversation', validateData(textPromptSchema), getTxtSolution);
conversationRouter.post('/continue-conversation?:id', validateData(textPromptSchema), getTxtSolution);
conversationRouter.get('/all-conversations', getTxtSolution); 
export { conversationRouter };







const textRoute= Router();

textRoute.post("/text", validateData(textPromptSchema), getTxtSolution);

export { textRoute };
