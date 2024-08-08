

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Message } from './message';
import ExtendedBaseEntity from './base.entity';


@Entity()
export class Chat extends ExtendedBaseEntity {
    @PrimaryGeneratedColumn()
    chatId: number;

    @Column({ nullable: true })
    title: string; // Optional title for the chat

    @OneToMany(() => Message, (message) => message.chatId)
    messages: Message[];
}

