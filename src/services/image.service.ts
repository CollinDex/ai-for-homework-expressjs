import { openai } from '../helpers/openai';
import AppDataSource from '../data-source';
import { Responses } from '../models';
import { HttpError } from '../middleware';
import { Repository } from 'typeorm';

export class ImageService {
	private responseRepository: Repository<Responses>;

	constructor() {
		this.responseRepository = AppDataSource.getRepository(Responses);
	}

	public async generateSolution(image: string, prompt:string) {
		console.log(image);
		try {
			const completion = await openai.chat.completions.create({
				model: 'openai/gpt-4o-mini',
				messages: [
					{
						role: 'user',
						content: [
							{
								"type": "text",
								"text": prompt
							  },
							{
								type: 'image_url',
								image_url: {
									url: image
								}
							}
						]
					}
				]
			});

			const result = completion.choices[0].message;

			const response = result.content;

			if (response) {
				const solution = this.responseRepository.create({ image, response });
				await this.responseRepository.save(solution);
			}

			return {
				data: result,
				message: 'Succesful Response from ImageService'
			};
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(error.status || 500, error.message || error);
		}
	}
}
