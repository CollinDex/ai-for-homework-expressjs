//  this is throwing error

// export class TextService {
// 	private responseRepository: Repository<Responses>;

// 	constructor() {
// 		this.responseRepository = AppDataSource.getRepository(Responses);
// 	}

// 	public async generateSolution(prompt: string, conversationId?: string, image?: string) {
// 		try {
// 			let previousMessages = [];

// 			if (conversationId) {
// 				// Find previous messages for the given conversation ID
// 				previousMessages = await this.responseRepository.find({
// 					where: { id: conversationId },
// 					order: { created_at: 'ASC' }
// 				});
// 			}

// 			const chatHistory = generateChatHistory(previousMessages);
// 			const messages = [
// 				{ role: 'system', content: Persona.AI_MENTOR },
// 				...chatHistory,
// 				{ role: 'user', content: prompt }
// 			];

// 			if (image) {
// 				messages.push({
// 					role: 'user',
// 					content: [
// 	{
// 		type: 'image_url',
// 		image_url: {
// 			url: image
// 		}
// 	}
// ]
// 				});
// 			}

// 			const completion = await openai.chat.completions.create({
// 				model: 'openai/gpt-4o-mini',
// 				messages: messages
// 			});

// 			const result = completion.choices[0].message;
// 			const response = result.content;

// 			if (response) {
// 				const solution = this.responseRepository.create({
// 					prompt,
// 					response,
// 					image: image || null,
// 					...(conversationId ? { id: conversationId } : {})
// 				});
// 				await this.responseRepository.save(solution);
// 			}

// 			return {
// 				data: result,
// 				message: 'Successful Response from TextService'
// 			};
// 		} catch (error) {
// 			if (error instanceof HttpError) {
// 				throw error;
// 			}
// 			throw new HttpError(error.status || 500, error.message || error);
// 		}
// 	}
// }

import { openai } from '../helpers/openai';
import AppDataSource from '../data-source';
import { Responses, Conversations } from '../models';
import { HttpError } from '../middleware';
import { Repository } from 'typeorm';
import { Persona } from '../types';
import { generateChatHistory } from '../utils/generate-chat-history';

export class TextService {
	private responseRepository: Repository<Responses>;
	private conversationRepository: Repository<Conversations>;

	constructor() {
		this.responseRepository = AppDataSource.getRepository(Responses);
		this.conversationRepository = AppDataSource.getRepository(Conversations);
	}

	public async generateSolution(prompt: string, conversationId?: string) {
		try {
			let previousMessages = [];
			let conversation: Conversations | undefined;

			if (conversationId) {
				conversation = await this.conversationRepository.findOne({
					where: { id: conversationId },
					relations: ['responses']
				});

				if (conversation) {
					// Ensure responses is initialized as an empty array if undefined
					previousMessages = conversation.responses || [];
				} else {
					throw new HttpError(404, 'Conversation not found');
				}
			} else {
				conversation = this.conversationRepository.create({ topic: prompt });
				await this.conversationRepository.save(conversation);
			}

			const chatHistory = generateChatHistory(previousMessages);

			const completion = await openai.chat.completions.create({
				model: 'openai/gpt-4o-mini',
				messages: [{ role: 'system', content: Persona.AI_MENTOR }, ...chatHistory, { role: 'user', content: prompt }]
			});

			const result = completion.choices[0].message;
			const response = result.content;

			if (response) {
				const responseEntity = this.responseRepository.create({
					prompt,
					response,
					conversation: conversation // Associate with conversation
				});
				await this.responseRepository.save(responseEntity);

				// Initialize responses array if not already present
				if (!conversation.responses) {
					conversation.responses = [];
				}

				// Add response to conversation
				conversation.responses.push(responseEntity);
				await this.conversationRepository.save(conversation);
			}

			return {
				data: result,
				message: 'Successful Response from TextService',
				conversationId: conversation?.id // Return the conversation ID
			};
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(error.status || 500, error.message || error);
		}
	}
	public async getAllConversations(): Promise<Conversations[]> {
		return await this.conversationRepository.find({ relations: ['responses'] });
	}
}
