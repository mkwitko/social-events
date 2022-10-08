import { MessageInt } from './message-int';

export interface ChatInt {
  id?: string;
  eventId?: string;
  users?: Array<string>;
  messages?: Array<MessageInt>;
  createdAt?: number;
  expiration?: number;
  newMessage?: number;
}
