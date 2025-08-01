/**
 * Message Bus for Inter-Agent Communication
 * 
 * Allows agents to communicate with each other during research.
 * Supports both direct messaging and broadcasting.
 */

import { Message, MessageType, createMessage, Priority } from '../interfaces/Message';
import { Agent } from '../interfaces/Agent';
import { ResearchContext } from '../interfaces/Context';

export type MessageHandler = (message: Message, context: ResearchContext) => Promise<void>;

export class MessageBus {
  private handlers: Map<string, MessageHandler[]> = new Map();
  private messageHistory: Message[] = [];
  private maxHistorySize = 1000;
  
  /**
   * Subscribe to messages of a specific type
   */
  subscribe(messageType: MessageType, handler: MessageHandler): void {
    const key = messageType.toString();
    if (!this.handlers.has(key)) {
      this.handlers.set(key, []);
    }
    this.handlers.get(key)!.push(handler);
  }
  
  /**
   * Subscribe an agent to specific message types
   */
  subscribeAgent(agent: Agent, messageTypes: MessageType[]): void {
    for (const type of messageTypes) {
      this.subscribe(type, async (message, context) => {
        // Only process if message is for this agent or broadcast
        if (message.to === agent.name || message.to === 'broadcast') {
          if (await agent.shouldActivate(context)) {
            console.log(`📨 ${agent.name} processing message from ${message.from}`);
            await agent.process(context);
          }
        }
      });
    }
  }
  
  /**
   * Send a message
   */
  async send(message: Message, context: ResearchContext): Promise<void> {
    // Add to history
    this.messageHistory.push(message);
    if (this.messageHistory.length > this.maxHistorySize) {
      this.messageHistory.shift();
    }
    
    // Add to context messages
    context.messages.push({
      from: message.from,
      to: message.to,
      timestamp: message.timestamp,
      type: message.type === MessageType.INFO ? 'info' : 
            message.type === MessageType.ERROR ? 'error' :
            message.type === MessageType.REQUEST ? 'request' : 'response',
      content: {
        message: message.content.subject,
        data: message.content.data
      }
    });
    
    // Notify handlers
    const handlers = this.handlers.get(message.type.toString()) || [];
    for (const handler of handlers) {
      try {
        await handler(message, context);
      } catch (error) {
        console.error(`❌ Error in message handler:`, error);
      }
    }
  }
  
  /**
   * Broadcast a message to all agents
   */
  async broadcast(
    from: string,
    type: MessageType,
    subject: string,
    body: string,
    data?: any,
    context?: ResearchContext
  ): Promise<void> {
    const message = createMessage(
      from,
      'broadcast',
      type,
      { subject, body, data },
      Priority.NORMAL
    );
    
    if (context) {
      await this.send(message, context);
    }
  }
  
  /**
   * Get message history
   */
  getHistory(): Message[] {
    return [...this.messageHistory];
  }
  
  /**
   * Clear message history
   */
  clearHistory(): void {
    this.messageHistory = [];
  }
}

// Singleton instance
export const messageBus = new MessageBus();