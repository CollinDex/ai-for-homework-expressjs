import {
  HttpError,
} from "../middleware";
import { openai } from "../helpers/openai";

export class TextService  {

  public async generateSolution(prompt: string) {
    try {
        const completion = await openai.chat.completions.create({
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "user", content: prompt }
          ],
        });

        const result = completion.choices[0].message;
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
