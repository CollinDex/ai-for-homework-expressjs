import { Router } from 'express';
import { newChat } from '../controllers/chat.controller';

const chatRoute= Router();

chatRoute.post('/chatti', newChat); // Create a new chat
// router.post('/message', sendMessage); // Send a message
// router.get('/:chatId/messages', getMessages); // Get messages for a chat

export { chatRoute };
