import { aiMentorPersona } from "../persona/ai-mentor";
import { generalTutorPersona } from "../persona/general-tutor";

export enum Persona {
    AI_MENTOR = aiMentorPersona,
    GENERAL_TUTOR = generalTutorPersona 
}

export enum Role {
    SYSTEM = "system",
    USER = "user",
    ASSITANT = "assistant"
}

export interface UserHistory {
    id: string,
    prompt: string,
    response: string,
}