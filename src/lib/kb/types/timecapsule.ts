/**
 * TimeCapsule: A complete isolated project containing KB + AI Frames + Sessions + Metadata
 * 
 * Each TimeCapsule represents a separate workspace/project with complete data isolation
 */

export interface TimeCapsule {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  frameCount?: number; // Computed from frames with this timeCapsuleId
  documentCount?: number; // Computed from KB docs with this timeCapsuleId
  settings?: {
    defaultView?: 'graph' | 'split' | 'linear';
    theme?: string;
  };
}

export type TimeCapsuleCreateInput = Omit<TimeCapsule, 'id' | 'createdAt' | 'updatedAt' | 'frameCount' | 'documentCount'>;

export type TimeCapsuleUpdateInput = Partial<Omit<TimeCapsule, 'id' | 'createdAt'>>;

