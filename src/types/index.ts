import { aiMentorPersona } from '../persona/ai-mentor';
import { generalTutorPersona } from '../persona/general-tutor';
import { understandingTeacherPersona } from '../persona/helper';
import { gradingAssistantTeacherPersona } from '../persona/teacher';

export enum Persona {
	AI_MENTOR = aiMentorPersona,
	GENERAL_TUTOR = generalTutorPersona,
	HELPING_TEACHER = understandingTeacherPersona,
	TEACHER_HELPER = gradingAssistantTeacherPersona
}

export enum Role {
	SYSTEM = 'system',
	USER = 'user',
	ASSITANT = 'assistant'
}

export interface UserHistory {
	id: string;
	prompt: string;
	response: string;
}
