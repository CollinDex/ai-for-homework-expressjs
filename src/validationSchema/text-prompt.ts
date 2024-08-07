import { z } from "zod";

const textPromptSchema = z.object({
    image: z.string().min(1, {message: "image_url cannot be empty"}).optional(),
    prompt: z.string().min(1, {message: "Prompt cannot be empty"})
});

export { textPromptSchema };