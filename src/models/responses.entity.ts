import ExtendedBaseEntity from './base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Conversations } from './conv';

@Entity({ name: 'responses' })
export class Responses extends ExtendedBaseEntity {
	@Column({ nullable: true })
	prompt: string;

	@Column({ nullable: false })
	response: string;

	@ManyToOne(() => Conversations, (conversation) => conversation.responses)
	conversation: Conversations;

	@Column({ nullable: true })
	image: string;
}
