import { openai } from "../helpers/openai";
import AppDataSource from "../data-source";
import { Responses } from "../models";
import {  HttpError } from "../middleware";
import { Repository } from "typeorm";


export class TextService  {
  private responseRepository: Repository<Responses>;
  
  constructor() {
    this.responseRepository = AppDataSource.getRepository(Responses);
  }

  public async generateSolution(prompt: string) {
    try {
        const completion = await openai.chat.completions.create({
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "user", content: prompt }
          ],
        });

        const result = completion.choices[0].message;
        const response = result.content;

        if (result.content) {
          const solution = this.responseRepository.create({ prompt, response });
          await this.responseRepository.save(solution);
        }

      return {
        data: result,
        message: "Succesful Response from TextService",
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(error.status || 500, error.message || error);
    }
  }
}
