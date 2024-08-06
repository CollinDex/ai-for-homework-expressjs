import { Responses } from "../models";
import { Role } from "../types";

export const generateChatHistory = (chatHistory:Responses[]) => {
    const formattedMessages = chatHistory.flatMap(msg => [{ role: Role.USER, content: msg.prompt },{ role: Role.ASSITANT, content: msg.response }]);
    return formattedMessages;
};