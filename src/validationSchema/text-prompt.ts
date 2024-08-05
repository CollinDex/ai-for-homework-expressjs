import { z } from "zod";

const textPromptSchema = z.object({
    prompt: z.string().min(1, {message: "Prompt cannot be empty"})
});

export { textPromptSchema };