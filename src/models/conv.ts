import { Entity, Column, OneToMany } from 'typeorm';
import { Responses } from './responses.entity';
import ExtendedBaseEntity from './base.entity';

@Entity()
export class Conversations extends ExtendedBaseEntity {
	@Column()
	topic: string;

	@OneToMany(() => Responses, (response) => response.conversation)
	responses: Responses[];
}
