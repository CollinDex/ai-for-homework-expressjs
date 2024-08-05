import {
  HttpError,
} from "../middleware";

export class TextService  {

  public async generateSolution(input) {
    try {
        const data = input;
      return {
        data: data,
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
