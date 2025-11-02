scheduler.development.js:14 [Violation] 'message' handler took 182ms
scheduler.development.js:14 [Violation] 'message' handler took 169ms
page.tsx:382 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
react-dom-client.development.js:16378 [Violation] 'drop' handler took 208ms
FrameGraphIntegration.tsx:773 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
FrameGraphIntegration.tsx:785 ✅ Session document inserted successfully: {sessionId: 'session_1762103671666', documentId: 'sess-1762103671666-6zdif0'}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
scheduler.development.js:14 [Violation] 'message' handler took 218ms
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:526:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:526
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1315
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1938
VectorStore.ts:1521 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 1-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 1-mvxaxfczav)
FrameGraphIntegration.tsx:390 ✅ Frame synced to Knowledge Base successfully: {frameId: 'frame-1762103671408-0d1em34t0', frameTitle: 'Frame 1', documentId: 'aiframe-frame-1762103671408-0d1em34t0', source: 'FrameGraphIntegration'}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 503-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 504-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 504-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
scheduler.development.js:14 [Violation] 'message' handler took 158ms
scheduler.development.js:14 [Violation] 'message' handler took 195ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 1-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1232
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 2-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 2-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 504-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 505-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 505-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:14:34.338Z'}
page.tsx:382 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 2, hasUnifiedMethods: true}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 2-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:526:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:526
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1315
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1938
setTimeout
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1929
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1521 📊 Synced frame AI-Frame [2]: Frame 2 to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 3-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 3-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 1-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame [2]: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 1-mvxaxfczav)
FrameGraphIntegration.tsx:390 ✅ Frame synced to Knowledge Base successfully: {frameId: 'frame-1762103674506-hzpbbj7b4', frameTitle: 'Frame 2', documentId: 'aiframe-frame-1762103674506-hzpbbj7b4', source: 'FrameGraphIntegration'}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 505-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 506-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 506-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
FrameGraphIntegration.tsx:831 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762103671408_1gzye1u21_7_node_1762103674506_dd6mspn1k_8_1762103676552_y3x6ewj8z', originalLength: 90, generatedDocId: 'conn-rn2lxq', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:872 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
react-dom-client.development.js:16378 [Violation] 'mouseup' handler took 189ms
FrameGraphIntegration.tsx:885 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762103671408_1gzye1u21_7_node_1762103674506_dd6mspn1k_8_1762103676552_y3x6ewj8z', documentId: 'conn-rn2lxq', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 1, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 3-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphConnectionEvent @ useUnifiedStorage.ts:1343
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1643
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
scheduler.development.js:14 [Violation] 'message' handler took 162ms
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 4-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 4-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 1-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 2-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 2-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 506-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 507-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 507-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:14:37.090Z'}
scheduler.development.js:14 [Violation] 'message' handler took 198ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 2, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 4-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1232
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 5-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 5-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 2-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 3-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 3-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 507-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 508-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 508-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:14:39.506Z'}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 5-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:526:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:526
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1315
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1938
setTimeout
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1929
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 6-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 6-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 3-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 4-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 4-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 508-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 509-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 509-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
FrameGraphIntegration.tsx:831 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762103679673_a4g7qzbkf_9_node_1762103671408_1gzye1u21_7_1762103681241_zfah5cv2x', originalLength: 90, generatedDocId: 'conn-n0y8n2', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:872 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
react-dom-client.development.js:16378 [Violation] 'mouseup' handler took 227ms
FrameGraphIntegration.tsx:885 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762103679673_a4g7qzbkf_9_node_1762103671408_1gzye1u21_7_1762103681241_zfah5cv2x', documentId: 'conn-n0y8n2', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 1, nodeCount: 3, edgeCount: 2, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 6-mvxaxfczav
scheduler.development.js:14 [Violation] 'message' handler took 250ms
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphConnectionEvent @ useUnifiedStorage.ts:1343
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1643
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 7-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 7-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 4-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 5-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 5-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 509-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 510-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 510-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:14:41.891Z'}
scheduler.development.js:14 [Violation] 'message' handler took 207ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 1, nodeCount: 3, edgeCount: 3, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 7-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1232
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 8-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 8-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 5-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 6-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 6-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 510-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 511-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 511-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:14:44.188Z'}
scheduler.development.js:14 [Violation] 'message' handler took 192ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 1, nodeCount: 3, edgeCount: 2, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 8-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1232
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
page.tsx:382 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 3, hasUnifiedMethods: true}
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 9-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 9-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 6-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
useUnifiedStorage.ts:1306 ⏸️ Skipping delayed save - background save already in progress
VectorStore.ts:1521 📊 Synced frame AI-Frame [3]: Frame 3 to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 7-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 7-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 511-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 1-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame [3]: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 1-mvxaxfczav)
FrameGraphIntegration.tsx:390 ✅ Frame synced to Knowledge Base successfully: {frameId: 'frame-1762103686297-fftjng443', frameTitle: 'Frame 3', documentId: 'aiframe-frame-1762103686297-fftjng443', source: 'FrameGraphIntegration'}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 512-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 512-mvxaxfczav)
VectorStore.ts:917 🗑️ Deleting document: aiframe-frame-1762103686297-fftjng443 (attempt 1/5)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 1-mvxaxfczav
VectorStore.ts:925 📋 Document aiframe-frame-1762103686297-fftjng443 found with revision: 1-mvxaxfczav
VectorStore.ts:929 ✅ Document deleted successfully: aiframe-frame-1762103686297-fftjng443
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:14:46.492Z'}
scheduler.development.js:14 [Violation] 'message' handler took 218ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 3, chapterCount: 1, nodeCount: 4, edgeCount: 2, frameIds: Array(3), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 9-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1232
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
page.tsx:382 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 4, hasUnifiedMethods: true}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 10-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 10-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 7-mvxaxfczav
useUnifiedStorage.ts:1306 ⏸️ Skipping delayed save - background save already in progress
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1521 📊 Synced frame AI-Frame [4]: Frame 4 to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 8-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 8-mvxaxfczav)
VectorStore.ts:1521 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 1-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame [4]: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 1-mvxaxfczav)
FrameGraphIntegration.tsx:390 ✅ Frame synced to Knowledge Base successfully: {frameId: 'frame-1762103689106-srcd79h6a', frameTitle: 'Frame 4', documentId: 'aiframe-frame-1762103689106-srcd79h6a', source: 'FrameGraphIntegration'}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 3-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 3-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 512-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 513-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 513-mvxaxfczav)
VectorStore.ts:917 🗑️ Deleting document: aiframe-frame-1762103689106-srcd79h6a (attempt 1/5)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 1-mvxaxfczav
VectorStore.ts:925 📋 Document aiframe-frame-1762103689106-srcd79h6a found with revision: 1-mvxaxfczav
VectorStore.ts:929 ✅ Document deleted successfully: aiframe-frame-1762103689106-srcd79h6a
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:14:49.407Z'}
scheduler.development.js:14 [Violation] 'message' handler took 159ms
scheduler.development.js:14 [Violation] 'message' handler took 188ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 1, nodeCount: 5, edgeCount: 2, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 10-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1232
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 11-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 11-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 8-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
FrameGraphIntegration.tsx:831 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762103686297_8h6agobz7_10_node_1762103689106_4u7grrlxx_11_1762103694350_nm2pe2hnp', originalLength: 92, generatedDocId: 'conn-jtgzde', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:872 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
FrameGraphIntegration.tsx:885 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762103686297_8h6agobz7_10_node_1762103689106_4u7grrlxx_11_1762103694350_nm2pe2hnp', documentId: 'conn-jtgzde', idLength: 11}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 9-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 9-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 3-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 4-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 4-mvxaxfczav)
VectorStore.ts:1521 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 3-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 3-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 513-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 514-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 514-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:14:54.651Z'}
scheduler.development.js:14 [Violation] 'message' handler took 166ms
scheduler.development.js:14 [Violation] 'message' handler took 169ms
scheduler.development.js:14 [Violation] 'message' handler took 233ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 1, nodeCount: 5, edgeCount: 4, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 11-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1232
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 12-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 12-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 9-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 10-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 10-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 4-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 5-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 5-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 3-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 4-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 4-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 514-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 515-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 515-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:15:00.203Z'}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 12-mvxaxfczav
scheduler.development.js:14 [Violation] 'message' handler took 154ms
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:526:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:526
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1315
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1938
setTimeout
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1929
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 13-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 13-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 10-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 11-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 11-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 5-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 6-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 6-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 4-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 5-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 5-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 515-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 516-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 516-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
FrameGraphIntegration.tsx:831 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762103679673_a4g7qzbkf_9_node_1762103700436_5cvum7o0x_12_1762103702535_i8uxaqqys', originalLength: 91, generatedDocId: 'conn-y6vnml', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:872 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
react-dom-client.development.js:16378 [Violation] 'mouseup' handler took 213ms
FrameGraphIntegration.tsx:885 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762103679673_a4g7qzbkf_9_node_1762103700436_5cvum7o0x_12_1762103702535_i8uxaqqys', documentId: 'conn-y6vnml', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 1, nodeCount: 5, edgeCount: 4, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 13-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphConnectionEvent @ useUnifiedStorage.ts:1343
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1643
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 14-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 14-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 11-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 12-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 12-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 6-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 7-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 7-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 5-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 6-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 6-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 516-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 517-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 517-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:15:03.197Z'}
scheduler.development.js:14 [Violation] 'message' handler took 165ms
react-dom-client.development.js:16378 [Violation] 'click' handler took 238ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 1, nodeCount: 6, edgeCount: 4, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 14-mvxaxfczav
scheduler.development.js:14 [Violation] 'message' handler took 165ms
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1315
EnhancedLearningGraph.useCallback[handleConceptUpdate] @ EnhancedLearningGraph.tsx:1119
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 15-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 15-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 12-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 13-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 13-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 7-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 8-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 8-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 6-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 7-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 7-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 517-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 518-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 518-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:15:08.234Z'}
scheduler.development.js:14 [Violation] 'message' handler took 156ms
scheduler.development.js:14 [Violation] 'message' handler took 226ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 1, nodeCount: 6, edgeCount: 4, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 15-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1232
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 16-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 16-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 13-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 14-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 14-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 8-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 9-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 9-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 7-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 8-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 8-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 518-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 519-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 519-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:15:11.026Z'}
scheduler.development.js:14 [Violation] 'message' handler took 150ms
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 16-mvxaxfczav
scheduler.development.js:14 [Violation] 'message' handler took 156ms
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:526:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:526
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1315
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1938
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 17-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 17-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 14-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 15-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 15-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 9-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 10-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 10-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 8-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 9-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 9-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 519-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 520-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 520-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
scheduler.development.js:14 [Violation] 'message' handler took 195ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 1, nodeCount: 6, edgeCount: 4, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 17-mvxaxfczav
scheduler.development.js:14 [Violation] 'message' handler took 168ms
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 18-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 18-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 15-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 16-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 16-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 10-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 11-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 11-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 9-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
FrameGraphIntegration.tsx:831 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762103679673_a4g7qzbkf_9_node_1762103713278_jdkcq9p8a_13_1762103715884_z7zo7qs0q', originalLength: 91, generatedDocId: 'conn-pi3x4r', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:872 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
FrameGraphIntegration.tsx:885 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762103679673_a4g7qzbkf_9_node_1762103713278_jdkcq9p8a_13_1762103715884_z7zo7qs0q', documentId: 'conn-pi3x4r', idLength: 11}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 10-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 10-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 520-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 521-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 521-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:15:15.974Z'}
scheduler.development.js:14 [Violation] 'message' handler took 198ms
[Violation] Forced reflow while executing JavaScript took 37ms
scheduler.development.js:14 [Violation] 'message' handler took 163ms
scheduler.development.js:14 [Violation] 'message' handler took 162ms
react-dom-client.development.js:16378 [Violation] 'click' handler took 207ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 1, nodeCount: 7, edgeCount: 5, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 18-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1315
EnhancedLearningGraph.useCallback[handleConceptUpdate] @ EnhancedLearningGraph.tsx:1119
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 19-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 19-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 16-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 17-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 17-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 11-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 12-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 12-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 10-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 11-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 11-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 521-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 522-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 522-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:15:20.562Z'}
scheduler.development.js:14 [Violation] 'message' handler took 161ms
scheduler.development.js:14 [Violation] 'message' handler took 157ms
scheduler.development.js:14 [Violation] 'message' handler took 163ms
scheduler.development.js:14 [Violation] 'message' handler took 163ms
scheduler.development.js:14 [Violation] 'message' handler took 165ms
scheduler.development.js:14 [Violation] 'message' handler took 161ms
scheduler.development.js:14 [Violation] 'message' handler took 209ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 1, nodeCount: 7, edgeCount: 5, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 19-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
useUnifiedStorage.ts:1306 ⏸️ Skipping delayed save - background save already in progress
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 20-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 20-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 17-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 18-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 18-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 12-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 13-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 13-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 11-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 12-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 12-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 522-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 523-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 523-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:15:31.662Z'}
scheduler.development.js:14 [Violation] 'message' handler took 159ms
scheduler.development.js:14 [Violation] 'message' handler took 190ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 1, nodeCount: 7, edgeCount: 5, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 20-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1232
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
FrameGraphIntegration.tsx:831 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762103731333_4airxxcfu_14_node_1762103686297_8h6agobz7_10_1762103734825_fbiviy3g6', originalLength: 92, generatedDocId: 'conn-nofu01', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:872 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
FrameGraphIntegration.tsx:885 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762103731333_4airxxcfu_14_node_1762103686297_8h6agobz7_10_1762103734825_fbiviy3g6', documentId: 'conn-nofu01', idLength: 11}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 21-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 21-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 18-mvxaxfczav
scheduler.development.js:14 [Violation] 'message' handler took 178ms
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 19-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 19-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 13-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 14-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 14-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 12-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 13-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 13-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 523-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 524-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 524-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:15:35.434Z'}
scheduler.development.js:14 [Violation] 'message' handler took 168ms
scheduler.development.js:14 [Violation] 'message' handler took 156ms
scheduler.development.js:14 [Violation] 'message' handler took 160ms
scheduler.development.js:14 [Violation] 'message' handler took 159ms
scheduler.development.js:14 [Violation] 'message' handler took 160ms
scheduler.development.js:14 [Violation] 'message' handler took 227ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 1, nodeCount: 8, edgeCount: 7, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 21-mvxaxfczav
scheduler.development.js:14 [Violation] 'message' handler took 220ms
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1232
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 22-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 22-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 19-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 20-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 20-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 14-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 15-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 15-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 13-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 14-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 14-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 524-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 525-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 525-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:15:49.123Z'}
scheduler.development.js:14 [Violation] 'message' handler took 157ms
react-dom-client.development.js:16378 [Violation] 'click' handler took 192ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 2, nodeCount: 8, edgeCount: 6, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 22-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1315
EnhancedLearningGraph.useCallback[handleChapterUpdate] @ EnhancedLearningGraph.tsx:529
EnhancedLearningGraph.useCallback[onDrop].newNodeData @ EnhancedLearningGraph.tsx:1905
ChapterNode.useCallback[handleSave] @ ChapterNode.tsx:54
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 23-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 23-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 20-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 21-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 21-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 15-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 16-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 16-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 14-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 15-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 15-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 525-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 526-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 526-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:15:52.475Z'}
scheduler.development.js:14 [Violation] 'message' handler took 209ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 2, nodeCount: 8, edgeCount: 6, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 23-mvxaxfczav
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1232
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 24-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 24-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 21-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 22-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 22-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 16-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 17-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 17-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 15-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 16-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 16-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 526-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 527-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 527-mvxaxfczav)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:15:54.578Z'}
scheduler.development.js:14 [Violation] 'message' handler took 161ms
scheduler.development.js:14 [Violation] 'message' handler took 230ms
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 4, chapterCount: 2, nodeCount: 8, edgeCount: 6, frameIds: Array(4), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 24-mvxaxfczav
scheduler.development.js:14 [Violation] 'message' handler took 164ms
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:613:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:613
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1232
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103671408-0d1em34t0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103671408-0d1em34t0: 25-mvxaxfczav
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762103671408-0d1em34t0, Rev: 25-mvxaxfczav)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 22-mvxaxfczav
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762103674506-hzpbbj7b4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762103674506-hzpbbj7b4: 23-mvxaxfczav
 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762103674506-hzpbbj7b4, Rev: 23-mvxaxfczav)
 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 17-mvxaxfczav
 📊 Synced frame AI-Frame: Frame 3 to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-frame-1762103686297-fftjng443 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-frame-1762103686297-fftjng443: 18-mvxaxfczav
 ✅ Document persistence verified: AI-Frame: Frame 3 (ID: aiframe-frame-1762103686297-fftjng443, Rev: 18-mvxaxfczav)
 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 16-mvxaxfczav
 📊 Synced frame AI-Frame: Frame 4 to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-frame-1762103689106-srcd79h6a (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-frame-1762103689106-srcd79h6a: 17-mvxaxfczav
 ✅ Document persistence verified: AI-Frame: Frame 4 (ID: aiframe-frame-1762103689106-srcd79h6a, Rev: 17-mvxaxfczav)
 📋 Retrieved latest revision for aiframe-chapters: 527-mvxaxfczav
 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-chapters: 528-mvxaxfczav
 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 528-mvxaxfczav)
 ✅ Unified save completed successfully
 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T17:16:01.365Z'}
