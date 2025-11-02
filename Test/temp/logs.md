page.tsx:382 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
FrameGraphIntegration.tsx:1053 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
FrameGraphIntegration.tsx:1065 ✅ Session document inserted successfully: {sessionId: 'session_1762109011014', documentId: 'sess-1762109011014-p8zy2z'}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
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
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1975
VectorStore.ts:1521 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 1-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 1-gnrbwxidsy)
FrameGraphIntegration.tsx:710 ✅ Frame synced to Knowledge Base successfully: {frameId: 'frame-1762109010854-vls1yyru4', frameTitle: 'Frame 1', documentId: 'aiframe-frame-1762109010854-vls1yyru4', source: 'FrameGraphIntegration'}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 85-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 86-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 86-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
page.tsx:382 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 2, hasUnifiedMethods: true}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 1-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1975
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1521 📊 Synced frame AI-Frame [2]: Frame 2 to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 2-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 2-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 1-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame [2]: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 1-gnrbwxidsy)
FrameGraphIntegration.tsx:710 ✅ Frame synced to Knowledge Base successfully: {frameId: 'frame-1762109013269-g6w7jdsmg', frameTitle: 'Frame 2', documentId: 'aiframe-frame-1762109013269-g6w7jdsmg', source: 'FrameGraphIntegration'}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 86-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 87-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 87-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
FrameGraphIntegration.tsx:1111 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762109010854_mvv6o927c_4_node_1762109013269_x2rvennmc_5_1762109014973_fk7zeh3jd', originalLength: 90, generatedDocId: 'conn-43tocp', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:1152 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
FrameGraphIntegration.tsx:1165 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762109010854_mvv6o927c_4_node_1762109013269_x2rvennmc_5_1762109014973_fk7zeh3jd', documentId: 'conn-43tocp', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 1, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 2-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1680
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 3-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 3-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 1-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 2-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 2-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 87-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 88-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 88-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:35.544Z'}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 2, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 3-gnrbwxidsy
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
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 4-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 4-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 2-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 3-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 3-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 88-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 89-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 89-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:37.170Z'}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 1, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 4-gnrbwxidsy
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
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 5-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 5-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 3-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 4-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 4-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 89-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 90-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 90-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:40.941Z'}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 5-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1975
setTimeout
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1966
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 6-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 6-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 4-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 5-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 5-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 90-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 91-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 91-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
FrameGraphIntegration.tsx:1111 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762109021077_cihf5q0a9_6_node_1762109010854_mvv6o927c_4_1762109023073_hkd038ane', originalLength: 90, generatedDocId: 'conn-flod3y', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:1152 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
FrameGraphIntegration.tsx:1165 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762109021077_cihf5q0a9_6_node_1762109010854_mvv6o927c_4_1762109023073_hkd038ane', documentId: 'conn-flod3y', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 2, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 6-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1680
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 7-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 7-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 5-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 6-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 6-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 91-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 92-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 92-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:43.546Z'}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 7-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1975
setTimeout
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1966
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 8-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 8-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 6-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 7-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 7-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 92-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 93-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 93-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 1, nodeCount: 4, edgeCount: 2, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 8-gnrbwxidsy
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
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 9-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 9-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 7-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 8-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 8-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 93-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 94-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 94-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:49.711Z'}
FrameGraphIntegration.tsx:1111 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762109027265_5bvsi0b0n_8_node_1762109010854_mvv6o927c_4_1762109029955_vwcp587xb', originalLength: 90, generatedDocId: 'conn-dn2k43', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:1152 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
FrameGraphIntegration.tsx:1165 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762109027265_5bvsi0b0n_8_node_1762109010854_mvv6o927c_4_1762109029955_vwcp587xb', documentId: 'conn-dn2k43', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 1, nodeCount: 4, edgeCount: 3, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 9-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1680
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 10-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 10-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 8-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 9-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 9-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 94-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 95-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 95-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:50.236Z'}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 10-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1975
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 11-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 11-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 9-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 10-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 10-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 95-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 96-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 96-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
FrameGraphIntegration.tsx:1111 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762109027265_5bvsi0b0n_8_node_1762109032392_3tlxn14qf_9_1762109034868_3c8mcln10', originalLength: 90, generatedDocId: 'conn-vp1ajv', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:1152 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
FrameGraphIntegration.tsx:1165 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762109027265_5bvsi0b0n_8_node_1762109032392_3tlxn14qf_9_1762109034868_3c8mcln10', documentId: 'conn-vp1ajv', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 1, nodeCount: 4, edgeCount: 4, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 11-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1680
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 12-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 12-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 10-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 11-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 11-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 96-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 97-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 97-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:55.323Z'}
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1762108166507:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/a376bde473a32913.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1762108166507:1367
Promise.then
hotCheck @ webpack.js?v=1762108166507:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 707ms
fetch-server-response.js:163 Fetch finished loading: GET "http://localhost:3000/ai-frames?_rsc=18lmo".
createFetch @ fetch-server-response.js:163
fetchServerResponse @ fetch-server-response.js:98
hmrRefreshReducerImpl @ hmr-refresh-reducer.js:34
clientReducer @ router-reducer.js:41
action @ app-router-instance.js:156
runAction @ app-router-instance.js:66
dispatchAction @ app-router-instance.js:120
dispatch @ app-router-instance.js:154
eval @ use-action-queue.js:55
startTransition @ react-dom-client.development.js:7843
dispatch @ use-action-queue.js:54
dispatchAppRouterAction @ use-action-queue.js:37
eval @ app-router-instance.js:274
exports.startTransition @ react.development.js:1129
hmrRefresh @ app-router-instance.js:273
eval @ hot-reloader-client.js:296
exports.startTransition @ react.development.js:1129
processMessage @ hot-reloader-client.js:295
handler @ hot-reloader-client.js:473
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ webpack-internal:///…th/lib/client.js:44
getSession @ webpack-internal:///…t-auth/react.js:123
SessionProvider.useEffect @ webpack-internal:///…t-auth/react.js:289
SessionProvider.useEffect.handle @ webpack-internal:///…t-auth/react.js:332
 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ webpack-internal:///…th/lib/client.js:44
getSession @ webpack-internal:///…t-auth/react.js:123
SessionProvider.useEffect @ webpack-internal:///…t-auth/react.js:308
SessionProvider.useEffect.visibilityHandler @ webpack-internal:///…t-auth/react.js:359
 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ webpack-internal:///…th/lib/client.js:44
getSession @ webpack-internal:///…t-auth/react.js:123
SessionProvider.useEffect @ webpack-internal:///…t-auth/react.js:289
SessionProvider.useEffect.handle @ webpack-internal:///…t-auth/react.js:332
# after auto-layout
page.tsx:382 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
FrameGraphIntegration.tsx:1053 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
FrameGraphIntegration.tsx:1065 ✅ Session document inserted successfully: {sessionId: 'session_1762109011014', documentId: 'sess-1762109011014-p8zy2z'}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
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
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1975
VectorStore.ts:1521 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 1-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 1-gnrbwxidsy)
FrameGraphIntegration.tsx:710 ✅ Frame synced to Knowledge Base successfully: {frameId: 'frame-1762109010854-vls1yyru4', frameTitle: 'Frame 1', documentId: 'aiframe-frame-1762109010854-vls1yyru4', source: 'FrameGraphIntegration'}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 85-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 86-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 86-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
page.tsx:382 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 2, hasUnifiedMethods: true}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 1-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1975
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1521 📊 Synced frame AI-Frame [2]: Frame 2 to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 2-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 2-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 1-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame [2]: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 1-gnrbwxidsy)
FrameGraphIntegration.tsx:710 ✅ Frame synced to Knowledge Base successfully: {frameId: 'frame-1762109013269-g6w7jdsmg', frameTitle: 'Frame 2', documentId: 'aiframe-frame-1762109013269-g6w7jdsmg', source: 'FrameGraphIntegration'}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 86-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 87-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 87-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
FrameGraphIntegration.tsx:1111 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762109010854_mvv6o927c_4_node_1762109013269_x2rvennmc_5_1762109014973_fk7zeh3jd', originalLength: 90, generatedDocId: 'conn-43tocp', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:1152 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
FrameGraphIntegration.tsx:1165 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762109010854_mvv6o927c_4_node_1762109013269_x2rvennmc_5_1762109014973_fk7zeh3jd', documentId: 'conn-43tocp', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 1, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 2-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1680
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 3-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 3-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 1-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 2-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 2-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 87-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 88-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 88-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:35.544Z'}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 2, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 3-gnrbwxidsy
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
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 4-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 4-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 2-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 3-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 3-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 88-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 89-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 89-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:37.170Z'}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 1, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 4-gnrbwxidsy
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
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 5-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 5-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 3-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 4-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 4-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 89-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 90-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 90-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:40.941Z'}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 5-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1975
setTimeout
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1966
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 6-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 6-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 4-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 5-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 5-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 90-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 91-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 91-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
FrameGraphIntegration.tsx:1111 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762109021077_cihf5q0a9_6_node_1762109010854_mvv6o927c_4_1762109023073_hkd038ane', originalLength: 90, generatedDocId: 'conn-flod3y', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:1152 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
FrameGraphIntegration.tsx:1165 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762109021077_cihf5q0a9_6_node_1762109010854_mvv6o927c_4_1762109023073_hkd038ane', documentId: 'conn-flod3y', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 2, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 6-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1680
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 7-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 7-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 5-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 6-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 6-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 91-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 92-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 92-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:43.546Z'}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 7-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1975
setTimeout
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1966
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 8-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 8-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 6-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 7-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 7-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 92-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 93-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 93-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 1, nodeCount: 4, edgeCount: 2, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 8-gnrbwxidsy
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
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 9-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 9-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 7-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 8-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 8-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 93-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 94-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 94-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:49.711Z'}
FrameGraphIntegration.tsx:1111 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762109027265_5bvsi0b0n_8_node_1762109010854_mvv6o927c_4_1762109029955_vwcp587xb', originalLength: 90, generatedDocId: 'conn-dn2k43', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:1152 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
FrameGraphIntegration.tsx:1165 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762109027265_5bvsi0b0n_8_node_1762109010854_mvv6o927c_4_1762109029955_vwcp587xb', documentId: 'conn-dn2k43', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 1, nodeCount: 4, edgeCount: 3, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 9-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1680
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 10-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 10-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 8-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 9-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 9-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 94-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 95-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 95-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:50.236Z'}
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 10-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1975
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 11-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 11-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 9-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 10-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 10-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 95-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 96-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 96-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
FrameGraphIntegration.tsx:1111 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762109027265_5bvsi0b0n_8_node_1762109032392_3tlxn14qf_9_1762109034868_3c8mcln10', originalLength: 90, generatedDocId: 'conn-vp1ajv', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:1152 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
FrameGraphIntegration.tsx:1165 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762109027265_5bvsi0b0n_8_node_1762109032392_3tlxn14qf_9_1762109034868_3c8mcln10', documentId: 'conn-vp1ajv', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 1, nodeCount: 4, edgeCount: 4, frameIds: Array(2), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 11-gnrbwxidsy
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
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1680
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 12-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 12-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 10-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 11-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 11-gnrbwxidsy)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 96-gnrbwxidsy
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 97-gnrbwxidsy
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 97-gnrbwxidsy)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:43:55.323Z'}
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1762108166507:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/a376bde473a32913.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1762108166507:1367
Promise.then
hotCheck @ webpack.js?v=1762108166507:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 707ms
fetch-server-response.js:163 Fetch finished loading: GET "http://localhost:3000/ai-frames?_rsc=18lmo".
createFetch @ fetch-server-response.js:163
fetchServerResponse @ fetch-server-response.js:98
hmrRefreshReducerImpl @ hmr-refresh-reducer.js:34
clientReducer @ router-reducer.js:41
action @ app-router-instance.js:156
runAction @ app-router-instance.js:66
dispatchAction @ app-router-instance.js:120
dispatch @ app-router-instance.js:154
eval @ use-action-queue.js:55
startTransition @ react-dom-client.development.js:7843
dispatch @ use-action-queue.js:54
dispatchAppRouterAction @ use-action-queue.js:37
eval @ app-router-instance.js:274
exports.startTransition @ react.development.js:1129
hmrRefresh @ app-router-instance.js:273
eval @ hot-reloader-client.js:296
exports.startTransition @ react.development.js:1129
processMessage @ hot-reloader-client.js:295
handler @ hot-reloader-client.js:473
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1762108166507:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/ddbc14bb9b4614e3.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1762108166507:1367
Promise.then
hotCheck @ webpack.js?v=1762108166507:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 465ms
fetch-server-response.js:163 Fetch finished loading: GET "http://localhost:3000/ai-frames?_rsc=18lmo".
createFetch @ fetch-server-response.js:163
fetchServerResponse @ fetch-server-response.js:98
hmrRefreshReducerImpl @ hmr-refresh-reducer.js:34
clientReducer @ router-reducer.js:41
action @ app-router-instance.js:156
runAction @ app-router-instance.js:66
dispatchAction @ app-router-instance.js:120
dispatch @ app-router-instance.js:154
eval @ use-action-queue.js:55
startTransition @ react-dom-client.development.js:7843
dispatch @ use-action-queue.js:54
dispatchAppRouterAction @ use-action-queue.js:37
eval @ app-router-instance.js:274
exports.startTransition @ react.development.js:1129
hmrRefresh @ app-router-instance.js:273
eval @ hot-reloader-client.js:296
exports.startTransition @ react.development.js:1129
processMessage @ hot-reloader-client.js:295
handler @ hot-reloader-client.js:473
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1762108166507:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/18de84ea8460adb3.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1762108166507:1367
Promise.then
hotCheck @ webpack.js?v=1762108166507:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 326ms
fetch-server-response.js:163 Fetch finished loading: GET "http://localhost:3000/ai-frames?_rsc=18lmo".
createFetch @ fetch-server-response.js:163
fetchServerResponse @ fetch-server-response.js:98
hmrRefreshReducerImpl @ hmr-refresh-reducer.js:34
clientReducer @ router-reducer.js:41
action @ app-router-instance.js:156
runAction @ app-router-instance.js:66
dispatchAction @ app-router-instance.js:120
dispatch @ app-router-instance.js:154
eval @ use-action-queue.js:55
startTransition @ react-dom-client.development.js:7843
dispatch @ use-action-queue.js:54
dispatchAppRouterAction @ use-action-queue.js:37
eval @ app-router-instance.js:274
exports.startTransition @ react.development.js:1129
hmrRefresh @ app-router-instance.js:273
eval @ hot-reloader-client.js:296
exports.startTransition @ react.development.js:1129
processMessage @ hot-reloader-client.js:295
handler @ hot-reloader-client.js:473
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
FrameGraphIntegration.tsx:1218 🎨 Auto-layout: Organizing graph with 5 nodes
FrameGraphIntegration.tsx:122 🔍 Analyzing edges for attachments: {totalEdges: 4, attachmentNodeIds: Array(1), frameNodeIds: Array(2), edgeDetails: Array(4)}
FrameGraphIntegration.tsx:162 📊 Graph structure analysis: {chapters: 1, frames: 2, attachments: 1, concepts: 1, attachmentMapSize: 0, …}
FrameGraphIntegration.tsx:1253 ✅ Auto-layout: Graph organized successfully
 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 1, nodeCount: 5, edgeCount: 5, frameIds: Array(2), …}
 💾 Starting unified save...
 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 12-gnrbwxidsy
 🎨 React Flow: Auto-layout event received {reason: 'auto-layout', nodeCount: 5, timestamp: 1762109093305, graphState: {…}}
 🎨 React Flow: Applying auto-layout positions {nodeCount: 5, edgeCount: 4, source: 'event'}
 📡 Dispatched graph-layout-applied event
 ⚠️ IndexedDB save failed: 
overrideMethod @ installHook.js:1
saveToIndexedDB @ webpack-internal:///…ifiedStorage.ts:382
await in saveToIndexedDB
saveAll @ webpack-internal:///…nifiedStorage.ts:38
useUnifiedStorage.useCallback[queueBackgroundSave] @ webpack-internal:///…ifiedStorage.ts:668
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleForceSaveEvent @ webpack-internal:///…fiedStorage.ts:1362
FrameGraphIntegration.useCallback[organizeGraphLayout] @ webpack-internal:///…ntegration.tsx:1090
onClick @ webpack-internal:///…ntegration.tsx:1719
executeDispatch @ webpack-internal:///…evelopment.js:16502
runWithFiberInDEV @ webpack-internal:///….development.js:845
processDispatchQueue @ webpack-internal:///…evelopment.js:16552
eval @ webpack-internal:///…evelopment.js:17150
batchedUpdates$1 @ webpack-internal:///…development.js:3263
dispatchEventForPluginEventSystem @ webpack-internal:///…evelopment.js:16706
dispatchEvent @ webpack-internal:///…evelopment.js:20816
dispatchDiscreteEvent @ webpack-internal:///…evelopment.js:20784
 ✅ Auto-layout viewport updated
 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-frame-1762109010854-vls1yyru4 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-frame-1762109010854-vls1yyru4: 13-gnrbwxidsy
 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762109010854-vls1yyru4, Rev: 13-gnrbwxidsy)
 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 11-gnrbwxidsy
 📊 Synced frame AI-Frame: Frame 2 to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-frame-1762109013269-g6w7jdsmg (attempt 1/3)
 💾 Database flush completed
 💾 Saving frames to localStorage...
 ⚠️ VectorStore sync failed
overrideMethod @ installHook.js:1
handleSaveGraph @ webpack-internal:///…ntegration.tsx:1433
 📋 Retrieved latest revision for aiframe-frame-1762109013269-g6w7jdsmg: 12-gnrbwxidsy
 ✅ Document persistence verified: AI-Frame: Frame 2 (ID: aiframe-frame-1762109013269-g6w7jdsmg, Rev: 12-gnrbwxidsy)
 📋 Retrieved latest revision for aiframe-chapters: 97-gnrbwxidsy
 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-chapters: 98-gnrbwxidsy
 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 98-gnrbwxidsy)
 ✅ Unified save completed successfully
 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T18:44:53.799Z'}
webpack-internal:///…se-websocket.js:113 [Violation] 'setInterval' handler took 99ms
 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ webpack-internal:///…th/lib/client.js:44
getSession @ webpack-internal:///…t-auth/react.js:123
SessionProvider.useEffect @ webpack-internal:///…t-auth/react.js:308
SessionProvider.useEffect.visibilityHandler @ webpack-internal:///…t-auth/react.js:359
 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ webpack-internal:///…th/lib/client.js:44
getSession @ webpack-internal:///…t-auth/react.js:123
SessionProvider.useEffect @ webpack-internal:///…t-auth/react.js:289
SessionProvider.useEffect.handle @ webpack-internal:///…t-auth/react.js:332
