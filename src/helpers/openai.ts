import OpenAI from 'openai';
import dotenv from 'dotenv';
import config from '../config';
dotenv.config();

export const openai = new OpenAI({
	baseURL: config.OPENROUTER_BASE_URL,
	apiKey: config.OPENROUTER_API_KEY,
	defaultHeaders: {
		'HTTP-Referer': config.SITE_URL, // Optional, for including your app on openrouter.ai rankings.
		'X-Title': config.SITE_NAME // Optional. Shows in rankings on openrouter.ai.
	}
});
