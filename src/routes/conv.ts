import { Router } from 'express';
import { textPromptSchema } from '../validationSchema/text-prompt';
import { validateData } from '../middleware/validationMiddleware';
import { startConversation, continueConversation } from '../controllers/conversation';

const conversationRouter = Router();

conversationRouter.post('/start-conversation', validateData(textPromptSchema), startConversation);
conversationRouter.post('/continue-conversation?:id', validateData(textPromptSchema), continueConversation);

export { conversationRouter };
