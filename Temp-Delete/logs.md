🔗 Creating attachment connection: {sourceNode: 'video-attachment', targetFrameId: 'frame-1753055256930-146c950fk', attachmentType: 'video', attachmentData: {…}, sourceNodeVideoUrl: 'https://www.youtube.com/watch?v=po7doQNkhuU', …}
EnhancedLearningGraph.tsx:287 🎥 CRITICAL DEBUG: Video attachment data: {attachmentDataVideoUrl: 'https://www.youtube.com/watch?v=po7doQNkhuU', attachmentDataStartTime: 0, attachmentDataDuration: 300, videoUrlEmpty: false, videoUrlLength: 43}
EnhancedLearningGraph.tsx:312 🎥 CRITICAL DEBUG: Frame updated with video data: {frameId: 'frame-1753055256930-146c950fk', frameVideoUrl: '', frameStartTime: 0, frameDuration: 300, frameHasAttachment: true, …}
EnhancedLearningGraph.tsx:324 📊 ATTACHMENT DEBUG: Frame updated in array: {frameId: 'frame-1753055256930-146c950fk', totalFrames: 3, attachedFrame: {…}, attachmentPresent: true}
EnhancedLearningGraph.tsx:357 ✅ Enhanced: Content attached → Frame Navigation sync triggered: {frameId: 'frame-1753055256930-146c950fk', attachmentType: 'video', action: 'attached'}
FrameGraphIntegration.tsx:834 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1753055652083_i1eqkpt5d_1_node_1753055256930_02pjncco6_0_1753055870255_mf1grw44j', originalLength: 90, generatedDocId: 'conn-gig4e3', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:875 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
page.tsx:598 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 0, hasUnifiedMethods: true}
FrameGraphIntegration.tsx:888 ✅ Connection inserted successfully: {connectionId: 'edge_node_1753055652083_i1eqkpt5d_1_node_1753055256930_02pjncco6_0_1753055870255_mf1grw44j', documentId: 'conn-gig4e3', idLength: 11}
useUnifiedStorage.ts:178 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 3, nodeCount: 3, frameIds: Array(3), timestamp: '2025-07-20T23:57:50.454Z'}
unifiedStorage.ts:64 💾 Starting unified save...
VectorStore.ts:971 📋 Retrieved latest revision for aiframe-frame-1753055256930-146c950fk: 53-lenvezwacg
unifiedStorage.ts:378 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:367:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:73:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:185:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:378
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:76
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:185
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleAttachmentChangedEvent @ useUnifiedStorage.ts:638
EnhancedLearningGraph.useCallback[handleAttachContent] @ EnhancedLearningGraph.tsx:348
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:814
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505Understand this warning
EnhancedLearningGraph.tsx:875 🎯 Connection created, triggering unified save: {edgeId: 'edge_node_1753055652083_i1eqkpt5d_1_node_1753055256930_02pjncco6_0_1753055870255_mf1grw44j', source: 'node_1753055652083_i1eqkpt5d_1', target: 'node_1753055256930_02pjncco6_0'}
VectorStore.ts:907 📊 Synced frame AI-Frame: f1 to Knowledge Base (updated)
VectorStore.ts:1559 🔍 Verifying document persistence: aiframe-frame-1753055256930-146c950fk (attempt 1/3)
VectorStore.ts:1604 💾 Database flush completed
VectorStore.ts:971 📋 Retrieved latest revision for aiframe-frame-1753055256930-146c950fk: 54-tquetrieja
VectorStore.ts:1572 ✅ Document persistence verified: AI-Frame: f1 (ID: aiframe-frame-1753055256930-146c950fk, Rev: 54-tquetrieja)
VectorStore.ts:971 📋 Retrieved latest revision for aiframe-frame-1753055259753-h701xqyda: 52-lenvezwacg
VectorStore.ts:907 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:1559 🔍 Verifying document persistence: aiframe-frame-1753055259753-h701xqyda (attempt 1/3)
VectorStore.ts:1604 💾 Database flush completed
VectorStore.ts:971 📋 Retrieved latest revision for aiframe-frame-1753055259753-h701xqyda: 53-tquetrieja
VectorStore.ts:1572 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1753055259753-h701xqyda, Rev: 53-tquetrieja)
VectorStore.ts:971 📋 Retrieved latest revision for aiframe-frame-1753055422959-x48udqwzv: 22-lenvezwacg
VectorStore.ts:907 📊 Synced frame AI-Frame: f2 to Knowledge Base (updated)
VectorStore.ts:1559 🔍 Verifying document persistence: aiframe-frame-1753055422959-x48udqwzv (attempt 1/3)
VectorStore.ts:1604 💾 Database flush completed
VectorStore.ts:971 📋 Retrieved latest revision for aiframe-frame-1753055422959-x48udqwzv: 23-tquetrieja
VectorStore.ts:1572 ✅ Document persistence verified: AI-Frame: f2 (ID: aiframe-frame-1753055422959-x48udqwzv, Rev: 23-tquetrieja)
unifiedStorage.ts:86 ✅ Unified save completed successfully
useUnifiedStorage.ts:187 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-07-20T23:57:50.765Z'}