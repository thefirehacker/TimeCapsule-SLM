/**
 * AgentCallManager - Manages agent call limits and user approval system
 * Tracks up to 25 agent calls with user approval required every 10 calls
 */

export interface AgentCall {
  id: string;
  agentId: string;
  callType: 'rag_query' | 'planning' | 'execution' | 'formatting';
  timestamp: Date;
  sessionId: string;
  tokensUsed?: number;
  duration?: number;
  success: boolean;
  metadata?: any;
}

export interface CallApprovalRequest {
  currentCalls: number;
  maxCalls: number;
  remainingCalls: number;
  sessionId: string;
  recentCalls: AgentCall[];
  estimatedAdditionalCalls: number;
}

export type ApprovalCallback = (request: CallApprovalRequest) => Promise<boolean>;

export class AgentCallManager {
  private calls: Map<string, AgentCall[]> = new Map(); // sessionId -> calls
  private readonly MAX_CALLS = 25;
  private readonly APPROVAL_THRESHOLD = 10;
  private approvalCallback: ApprovalCallback | null = null;
  private currentSessionId: string | null = null;

  constructor() {
    console.log('🎛️ AgentCallManager initialized with limits:', {
      maxCalls: this.MAX_CALLS,
      approvalThreshold: this.APPROVAL_THRESHOLD
    });
  }

  /**
   * Set the callback function for user approval requests
   */
  setApprovalCallback(callback: ApprovalCallback): void {
    this.approvalCallback = callback;
  }

  /**
   * Start a new session
   */
  startSession(sessionId: string): void {
    this.currentSessionId = sessionId;
    if (!this.calls.has(sessionId)) {
      this.calls.set(sessionId, []);
      console.log(`🎬 AgentCallManager: Started new session ${sessionId}`);
    }
  }

  /**
   * Track a new agent call
   */
  async trackCall(
    agentId: string,
    callType: AgentCall['callType'],
    metadata?: any
  ): Promise<boolean> {
    if (!this.currentSessionId) {
      throw new Error('No active session. Call startSession() first.');
    }

    const sessionCalls = this.calls.get(this.currentSessionId) || [];
    const currentCallCount = sessionCalls.length;

    // Check if we need user approval (every 10 calls)
    if (currentCallCount > 0 && currentCallCount % this.APPROVAL_THRESHOLD === 0) {
      const approved = await this.requestUserApproval();
      if (!approved) {
        console.log(`❌ AgentCallManager: User denied approval at call ${currentCallCount}`);
        return false;
      }
    }

    // Check maximum call limit
    if (currentCallCount >= this.MAX_CALLS) {
      console.warn(`🚫 AgentCallManager: Maximum calls (${this.MAX_CALLS}) reached for session ${this.currentSessionId}`);
      return false;
    }

    // Create and track the call
    const call: AgentCall = {
      id: `${this.currentSessionId}_call_${currentCallCount + 1}`,
      agentId,
      callType,
      timestamp: new Date(),
      sessionId: this.currentSessionId,
      success: true,
      metadata
    };

    sessionCalls.push(call);
    this.calls.set(this.currentSessionId, sessionCalls);

    console.log(`📞 AgentCallManager: Tracked call ${call.id}`, {
      agentId,
      callType,
      callNumber: currentCallCount + 1,
      remaining: this.MAX_CALLS - (currentCallCount + 1)
    });

    return true;
  }

  /**
   * Update call with completion data
   */
  updateCall(callId: string, updates: Partial<AgentCall>): void {
    if (!this.currentSessionId) return;

    const sessionCalls = this.calls.get(this.currentSessionId) || [];
    const callIndex = sessionCalls.findIndex(call => call.id === callId);
    
    if (callIndex !== -1) {
      sessionCalls[callIndex] = { ...sessionCalls[callIndex], ...updates };
      console.log(`🔄 AgentCallManager: Updated call ${callId}`, updates);
    }
  }

  /**
   * Get current call count for session
   */
  getCurrentCallCount(sessionId?: string | null): number {
    const targetSession = sessionId || this.currentSessionId;
    if (!targetSession) return 0;
    
    return this.calls.get(targetSession)?.length || 0;
  }

  /**
   * Get remaining calls for session
   */
  getRemainingCalls(sessionId?: string | null): number {
    const currentCount = this.getCurrentCallCount(sessionId);
    return Math.max(0, this.MAX_CALLS - currentCount);
  }

  /**
   * Check if more calls are allowed
   */
  canMakeMoreCalls(sessionId?: string | null): boolean {
    return this.getRemainingCalls(sessionId) > 0;
  }

  /**
   * Get call statistics for session
   */
  getCallStats(sessionId?: string | null): {
    totalCalls: number;
    remainingCalls: number;
    callsByType: Record<string, number>;
    callsByAgent: Record<string, number>;
    averageDuration: number;
    totalTokens: number;
  } {
    const targetSession = sessionId || this.currentSessionId;
    const sessionCalls = targetSession ? this.calls.get(targetSession) || [] : [];

    const callsByType: Record<string, number> = {};
    const callsByAgent: Record<string, number> = {};
    let totalDuration = 0;
    let totalTokens = 0;
    let callsWithDuration = 0;

    sessionCalls.forEach(call => {
      // Count by type
      callsByType[call.callType] = (callsByType[call.callType] || 0) + 1;
      
      // Count by agent
      callsByAgent[call.agentId] = (callsByAgent[call.agentId] || 0) + 1;
      
      // Sum duration and tokens
      if (call.duration) {
        totalDuration += call.duration;
        callsWithDuration++;
      }
      if (call.tokensUsed) {
        totalTokens += call.tokensUsed;
      }
    });

    return {
      totalCalls: sessionCalls.length,
      remainingCalls: this.getRemainingCalls(targetSession),
      callsByType,
      callsByAgent,
      averageDuration: callsWithDuration > 0 ? totalDuration / callsWithDuration : 0,
      totalTokens
    };
  }

  /**
   * Request user approval for additional calls
   */
  private async requestUserApproval(): Promise<boolean> {
    if (!this.approvalCallback || !this.currentSessionId) {
      console.warn('⚠️ AgentCallManager: No approval callback set, defaulting to approved');
      return true;
    }

    const sessionCalls = this.calls.get(this.currentSessionId) || [];
    const request: CallApprovalRequest = {
      currentCalls: sessionCalls.length,
      maxCalls: this.MAX_CALLS,
      remainingCalls: this.getRemainingCalls(),
      sessionId: this.currentSessionId,
      recentCalls: sessionCalls.slice(-5), // Last 5 calls
      estimatedAdditionalCalls: Math.min(this.APPROVAL_THRESHOLD, this.getRemainingCalls())
    };

    console.log('🤔 AgentCallManager: Requesting user approval...', request);

    try {
      const approved = await this.approvalCallback(request);
      console.log(`${approved ? '✅' : '❌'} AgentCallManager: User approval result: ${approved}`);
      return approved;
    } catch (error) {
      console.error('❌ AgentCallManager: Approval callback failed:', error);
      return false;
    }
  }

  /**
   * Get calls for a specific session
   */
  getSessionCalls(sessionId: string): AgentCall[] {
    return this.calls.get(sessionId) || [];
  }

  /**
   * Clear calls for a session
   */
  clearSession(sessionId: string): void {
    this.calls.delete(sessionId);
    if (this.currentSessionId === sessionId) {
      this.currentSessionId = null;
    }
    console.log(`🧹 AgentCallManager: Cleared session ${sessionId}`);
  }

  /**
   * Get all sessions
   */
  getAllSessions(): string[] {
    return Array.from(this.calls.keys());
  }

  /**
   * Export call data for analysis
   */
  exportCallData(): Record<string, AgentCall[]> {
    const data: Record<string, AgentCall[]> = {};
    this.calls.forEach((calls, sessionId) => {
      data[sessionId] = calls;
    });
    return data;
  }
} 