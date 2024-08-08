import { openai } from '../helpers/openai';
import AppDataSource from '../data-source';
import { Chat } from '../models';
import { HttpError } from '../middleware';
import { Repository } from 'typeorm';
import { Persona } from '../types';
import { generateChatHistory } from '../utils/generate-chat-history';

export class ChatService {
	private chatRepository: Repository<Chat>;

	constructor() {
		this.chatRepository = AppDataSource.getRepository(Chat);
	}

    public async createchat() {
        try {
            const newchat = await this.chatRepository.create(Chat);
    
            const chat = new Chat();

            await this.chatRepository.save(newchat);

            return {
                newchat,
                message: "chat created"
            };
                chat
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(error.status || 500, error.message || error);
        }
        

    }
	// public async generateSolution(prompt: string) {
	// 	try {
	// 		const previousMessages = await this.responseRepository.find({
	// 			order: { created_at: 'ASC' }
	// 		});

	// 		const chatHistory = generateChatHistory(previousMessages);

	// 		const completion = await openai.chat.completions.create({
	// 			model: 'openai/gpt-4o-mini',
	// 			messages: [
	// 				{ role: 'system', content: Persona.HELPING_TEACHER },
	// 				...chatHistory,
	// 				{ role: 'user', content: prompt }
	// 			]
	// 		});

	// 		const result = completion.choices[0].message;
	// 		const response = result.content;

	// 		if (response) {
	// 			const solution = this.responseRepository.create({ prompt, response });
	// 			await this.responseRepository.save(solution);
	// 		}

	// 		return {
	// 			data: result,
	// 			message: 'Succesful Response from TextService'
	// 		};
	// 	} catch (error) {
	// 		if (error instanceof HttpError) {
	// 			throw error;
	// 		}
	// 		throw new HttpError(error.status || 500, error.message || error);
	// 	}
	// }
}
