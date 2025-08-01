/**
 * Message Protocol for Inter-Agent Communication
 */

export interface Message {
  id: string;
  from: string;
  to: string | 'broadcast';
  timestamp: number;
  type: MessageType;
  priority: Priority;
  content: MessageContent;
  inReplyTo?: string;
}

export enum MessageType {
  INFO = 'info',
  REQUEST = 'request',
  RESPONSE = 'response',
  ERROR = 'error',
  UPDATE = 'update',
  COMPLETE = 'complete'
}

export enum Priority {
  LOW = 0,
  NORMAL = 1,
  HIGH = 2,
  CRITICAL = 3
}

export interface MessageContent {
  subject: string;
  body: string;
  data?: any;
  reasoning?: string;
}

export function createMessage(
  from: string,
  to: string | 'broadcast',
  type: MessageType,
  content: MessageContent,
  priority: Priority = Priority.NORMAL
): Message {
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    from,
    to,
    timestamp: Date.now(),
    type,
    priority,
    content
  };
}

// Export all types needed by other modules
export type { Message };