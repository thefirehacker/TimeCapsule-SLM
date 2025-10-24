analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.168446773469668, longitude: 72.84655175460107, …}
EnhancedLearningGraph.tsx:1600 🎯 Node drop detected - aiframe added, triggering delayed unified save
EnhancedLearningGraph.tsx:1700 ✅ New frame created via drag-drop: {frameId: 'frame-1761310512558-eugsocfd0', title: 'Frame 1', totalFrames: 1}
EnhancedLearningGraph.tsx:1084 ✅ SYNC FIX: Node synchronization completed with updated frame data
page.tsx:373 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
useUnifiedStorage.ts:1161 ⏸️ Skipping delayed save - background save already in progress
useUnifiedStorage.ts:569 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 0, edgeCount: 0, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:603:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:603
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useCallback[updateFrames] @ useUnifiedStorage.ts:893
AIFramesPage.useCallback[handleFramesChange] @ page.tsx:461
FrameGraphIntegration.useCallback[handleFramesChangeWithRealTimeSync] @ FrameGraphIntegration.tsx:459
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1678
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:1723 ✅ Document inserted: frames_session_1761310507340_l70ys2mhe
VectorStore.ts:2171 🔍 Verifying document persistence: frames_session_1761310507340_l70ys2mhe (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for frames_session_1761310507340_l70ys2mhe: 1-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: Frame Sequence - 1 frames (ID: frames_session_1761310507340_l70ys2mhe, Rev: 1-ebgvqyzafi)
FrameGraphIntegration.tsx:784 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
VectorStore.ts:1521 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761310512558-eugsocfd0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1723 ✅ Document inserted: sess-1761310512848-zd1dut
VectorStore.ts:2171 🔍 Verifying document persistence: sess-1761310512848-zd1dut (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761310512558-eugsocfd0: 1-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1761310512558-eugsocfd0, Rev: 1-ebgvqyzafi)
FrameGraphIntegration.tsx:381 ✅ Frame synced to Knowledge Base successfully: {frameId: 'frame-1761310512558-eugsocfd0', frameTitle: 'Frame 1', documentId: 'aiframe-frame-1761310512558-eugsocfd0', source: 'FrameGraphIntegration'}
VectorStore.ts:1521 📊 Synced frame AI-Frame Chapters to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for sess-1761310512848-zd1dut: 1-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frames Session (ID: sess-1761310512848-zd1dut, Rev: 1-ebgvqyzafi)
FrameGraphIntegration.tsx:796 ✅ Session document inserted successfully: {sessionId: 'session_1761310512848', documentId: 'sess-1761310512848-zd1dut'}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 1-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 1-ebgvqyzafi)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:605 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-24T12:55:12.981Z'}
useUnifiedStorage.ts:569 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761310512558-eugsocfd0: 1-ebgvqyzafi
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:603:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:603
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1091
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
setTimeout
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:162
triggerNodeChanges @ index.js:5054
updateNodePositions @ index.js:5042
eval @ index.js:2246
call @ dispatch.js:61
gesture @ drag.js:159
mouseupped @ drag.js:89
eval @ on.js:7
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761310512558-eugsocfd0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761310512558-eugsocfd0: 2-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1761310512558-eugsocfd0, Rev: 2-ebgvqyzafi)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 1-ebgvqyzafi
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 2-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 2-ebgvqyzafi)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:605 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-24T12:55:16.310Z'}
EnhancedLearningGraph.tsx:1600 🎯 Node drop detected - video-attachment added, triggering delayed unified save
useUnifiedStorage.ts:488 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761310512558-eugsocfd0: 2-ebgvqyzafi
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:516:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:516
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1170
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1612
setTimeout
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1603
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761310512558-eugsocfd0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761310512558-eugsocfd0: 3-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1761310512558-eugsocfd0, Rev: 3-ebgvqyzafi)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 2-ebgvqyzafi
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 3-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 3-ebgvqyzafi)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:517 🔒 PRIORITY SAVE: Completed with result: {success: true}
EnhancedLearningGraph.tsx:1227 🔗 Creating attachment connection: {sourceNode: 'video-attachment', targetFrameId: 'frame-1761310512558-eugsocfd0', attachmentType: 'video', attachmentData: {…}, sourceNodeVideoUrl: 'https://www.youtube.com/watch?v=po7doQNkhuU', …}
EnhancedLearningGraph.tsx:301 🎥 CRITICAL DEBUG: Video attachment data: {attachmentDataVideoUrl: 'https://www.youtube.com/watch?v=po7doQNkhuU', attachmentDataStartTime: 0, attachmentDataDuration: 300, videoUrlEmpty: false, videoUrlLength: 43}
EnhancedLearningGraph.tsx:326 🎥 CRITICAL DEBUG: Frame updated with video data: {frameId: 'frame-1761310512558-eugsocfd0', frameVideoUrl: '', frameStartTime: 0, frameDuration: 300, frameHasAttachment: true, …}
EnhancedLearningGraph.tsx:338 📊 ATTACHMENT DEBUG: Frame updated in array: {frameId: 'frame-1761310512558-eugsocfd0', totalFrames: 1, attachedFrame: {…}, attachmentPresent: true}
EnhancedLearningGraph.tsx:362 ✅ Enhanced: Content attached → Frame Navigation sync triggered: {frameId: 'frame-1761310512558-eugsocfd0', attachmentType: 'video', action: 'attached'}
FrameGraphIntegration.tsx:842 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1761310516975_8x2j2mry8_1_node_1761310512558_ihtgylxge_0_1761310518738_0aqnpguf5', originalLength: 90, generatedDocId: 'conn-j2omxy', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:883 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
useUnifiedStorage.ts:569 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 1, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761310512558-eugsocfd0: 3-ebgvqyzafi
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:603:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:603
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphConnectionEvent @ useUnifiedStorage.ts:1198
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1305
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761310512558-eugsocfd0 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1723 ✅ Document inserted: conn-j2omxy
VectorStore.ts:2171 🔍 Verifying document persistence: conn-j2omxy (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
EnhancedLearningGraph.tsx:1356 🎯 Connection created, triggering unified save with fresh state: {edgeId: 'edge_node_1761310516975_8x2j2mry8_1_node_1761310512558_ihtgylxge_0_1761310518738_0aqnpguf5', source: 'node_1761310516975_8x2j2mry8_1', target: 'node_1761310512558_ihtgylxge_0', totalEdges: 2, isAttachment: true}
page.tsx:373 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 0, hasUnifiedMethods: true}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761310512558-eugsocfd0: 4-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1761310512558-eugsocfd0, Rev: 4-ebgvqyzafi)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 3-ebgvqyzafi
VectorStore.ts:1581 📋 Retrieved latest revision for conn-j2omxy: 1-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: Connection: Video Content → Frame 1 (ID: conn-j2omxy, Rev: 1-ebgvqyzafi)
FrameGraphIntegration.tsx:896 ✅ Connection inserted successfully: {connectionId: 'edge_node_1761310516975_8x2j2mry8_1_node_1761310512558_ihtgylxge_0_1761310518738_0aqnpguf5', documentId: 'conn-j2omxy', idLength: 11}
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 4-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 4-ebgvqyzafi)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:605 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-24T12:55:19.086Z'}
useUnifiedStorage.ts:569 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 0, chapterCount: 0, nodeCount: 2, edgeCount: 2, frameIds: Array(0), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 4-ebgvqyzafi
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:603:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:603
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1091
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 5-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 5-ebgvqyzafi)
VectorStore.ts:917 🗑️ Deleting document: aiframe-frame-1761310512558-eugsocfd0 (attempt 1/5)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761310512558-eugsocfd0: 4-ebgvqyzafi
VectorStore.ts:925 📋 Document aiframe-frame-1761310512558-eugsocfd0 found with revision: 4-ebgvqyzafi
VectorStore.ts:929 ✅ Document deleted successfully: aiframe-frame-1761310512558-eugsocfd0
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:605 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-24T12:55:20.657Z'}
useUnifiedStorage.ts:569 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 0, chapterCount: 0, nodeCount: 2, edgeCount: 1, frameIds: Array(0), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 5-ebgvqyzafi
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:603:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:603
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1091
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 6-ebgvqyzafi
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 6-ebgvqyzafi)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:605 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-24T12:55:25.554Z'}
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
