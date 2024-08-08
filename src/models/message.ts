

// @Entity({ name: 'responses' })
// export class Responses extends ExtendedBaseEntity {
// 	@Column({ nullable: true })
// 	prompt: string;

// 	@Column({ nullable: false })
// 	response: string;

// 	@ManyToOne(() => Conversations, (conversation) => conversation.responses)
// 	conversation: Conversations;

// 	@Column({ nullable: true })
// 	image: string;
// }

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Chat } from './chat';
import ExtendedBaseEntity from './base.entity';


@Entity({ name: 'messages' })
export class Message extends ExtendedBaseEntity {
    @PrimaryGeneratedColumn()
    messageId: number;

    @ManyToOne(() => Chat, (chat) => chat.messages)
    chatId: Chat;

    // @Column('text')
    // content: string;

	@Column({ nullable: true })
	prompt: string;

}

