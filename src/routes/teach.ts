import { Router } from 'express';
import { textPromptSchema } from '../validationSchema/text-prompt';
import { validateData } from '../middleware/validationMiddleware';
import { continueTConversation, startTConversation } from '../controllers';

const conversationTRouter = Router();

conversationTRouter.post('/start-conversation-teacher', validateData(textPromptSchema), startTConversation);
conversationTRouter.post('/continue-conversation-teacher?:id', validateData(textPromptSchema), continueTConversation);

export { conversationTRouter };
