import { NextFunction, Request, Response } from "express";
import { ChatService } from "../services";
import { sendJsonResponse2 } from "../helpers";

const chatService = new ChatService();

const newChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chat = await chatService.createchat();
      sendJsonResponse2(res, 200, chat );
    } catch (error) {
      next(error);
    }
};

export {newChat };