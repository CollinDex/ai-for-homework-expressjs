import { Column, Entity } from 'typeorm';
import ExtendedBaseEntity from './base.entity';

@Entity({ name: 'responses' })
export class Responses extends ExtendedBaseEntity {
	@Column({ nullable: true })
	prompt: string;

	@Column({ nullable: false })
	response: string;

	@Column({ nullable: true })
	image: string;
}