EmbeddingService.ts:98 Fetch finished loading: GET "https://cas-bridge.xethub.hf.co/xet-bridge-us/6501d9c1e4d9d2d301d76685/43197c0772cd3622c3ff70f3b42c948d4e32cc3fec11f2022a705f1b8ca80152?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cas%2F20251024%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251024T161605Z&X-Amz-Expires=3600&X-Amz-Signature=5b83fcd2a057773bc7c798318a23a68b86c854ed26b63693710a845660bd7b4d&X-Amz-SignedHeaders=host&X-Xet-Cas-Uid=public&response-content-disposition=inline%3B+filename*%3DUTF-8%27%27model_quantized.onnx%3B+filename%3D%22model_quantized.onnx%22%3B&x-id=GetObject&Expires=1761326165&Policy=eyJTdGF0ZW1lbnQiOlt7IkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc2MTMyNjE2NX19LCJSZXNvdXJjZSI6Imh0dHBzOi8vY2FzLWJyaWRnZS54ZXRodWIuaGYuY28veGV0LWJyaWRnZS11cy82NTAxZDljMWU0ZDlkMmQzMDFkNzY2ODUvNDMxOTdjMDc3MmNkMzYyMmMzZmY3MGYzYjQyYzk0OGQ0ZTMyY2MzZmVjMTFmMjAyMmE3MDVmMWI4Y2E4MDE1MioifV19&Signature=Zkp6BmAjz-0DjwXvlDx1ZtyyHbn2595gmt2IIwRIkFpgpUX4HKKIvQiLzdIlaJqtXQGoASG4svjOdC5KtaWvG2F4OhFLh6yae5iLTTKk3VJ3Avn13%7E2FvL-brrqPotjjmcA92WYyW-AfOZJQmydTAlreugZafQRFtttvOh2iEfKlppY5GAbb8oGeURNCRj9KP2f05UQH1i-20Rqc-vesgsXAU86cRNCnJjy2hq9tG4O2jdeXGzBYIEUUksLM%7EtvPN2Ax-opy8ronKs1N27315SUj9BFKv-YRiyZ2aAgElWYqHdeRowuJ8S6sEivXLatCbfgbPAK2wVBBswOTChGlsw__&Key-Pair-Id=K2L8F4GPSG1IFC".
getFile @ hub.js:216
getModelFile @ hub.js:480
await in getModelFile
constructSession @ models.js:451
from_pretrained @ models.js:1123
from_pretrained @ models.js:5847
await in from_pretrained
loadItems @ pipelines.js:3261
pipeline @ pipelines.js:3209
performImmediateInitialization @ EmbeddingService.ts:98
init @ EmbeddingService.ts:58
initializeXenovaService @ VectorStore.ts:2073
startImmediateBackgroundDownload @ VectorStore.ts:2034
EmbeddingService.ts:147 ✅ Model loaded from cache instantly
VectorStore.ts:2079 📊 Xenova progress: Embedding model ready (100%)
EmbeddingService.ts:156 ✅ EmbeddingService initialized successfully
VectorStore.ts:2085 ✅ Xenova embedding service ready
VectorStore.ts:2036 ✅ Immediate background download completed
VectorStore.ts:284 ✅ Xenova model downloaded and cached - all features ready
VectorStore.ts:291 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
EnhancedLearningGraph.tsx:1600 🎯 Node drop detected - chapter added, triggering delayed unified save
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
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1253
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
VectorStore.ts:1521 📊 Synced frame AI-Frame Chapters to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 1-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 1-joslxzscsm)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 0, chapterCount: 1, nodeCount: 0, edgeCount: 0, frameIds: Array(0), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 1-joslxzscsm
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
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1170
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 2-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 2-joslxzscsm)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-24T16:16:18.768Z'}
EnhancedLearningGraph.tsx:1600 🎯 Node drop detected - aiframe added, triggering delayed unified save
EnhancedLearningGraph.tsx:1700 ✅ New frame created via drag-drop: {frameId: 'frame-1761322579914-ax9dtr4ls', title: 'Frame 1', totalFrames: 1}
page.tsx:374 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
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
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1253
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1612
VectorStore.ts:1723 ✅ Document inserted: frames_session_1761322565225_q12k6gkz3
VectorStore.ts:2171 🔍 Verifying document persistence: frames_session_1761322565225_q12k6gkz3 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1521 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (inserted)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761322579914-ax9dtr4ls (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for frames_session_1761322565225_q12k6gkz3: 1-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: Frame Sequence - 1 frames (ID: frames_session_1761322565225_q12k6gkz3, Rev: 1-joslxzscsm)
FrameGraphIntegration.tsx:784 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 1-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1761322579914-ax9dtr4ls, Rev: 1-joslxzscsm)
FrameGraphIntegration.tsx:381 ✅ Frame synced to Knowledge Base successfully: {frameId: 'frame-1761322579914-ax9dtr4ls', frameTitle: 'Frame 1', documentId: 'aiframe-frame-1761322579914-ax9dtr4ls', source: 'FrameGraphIntegration'}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 2-joslxzscsm
VectorStore.ts:1723 ✅ Document inserted: sess-1761322580330-pub0bg
VectorStore.ts:2171 🔍 Verifying document persistence: sess-1761322580330-pub0bg (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for sess-1761322580330-pub0bg: 1-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frames Session (ID: sess-1761322580330-pub0bg, Rev: 1-joslxzscsm)
FrameGraphIntegration.tsx:796 ✅ Session document inserted successfully: {sessionId: 'session_1761322580330', documentId: 'sess-1761322580330-pub0bg'}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 3-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 3-joslxzscsm)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
FrameGraphIntegration.tsx:842 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1761322576383_o77jyq464_0_node_1761322579914_e67b7ld0c_1_1761322583260_b1ogjqfbp', originalLength: 90, generatedDocId: 'conn-312jcq', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:883 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 1, nodeCount: 2, edgeCount: 1, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 1-joslxzscsm
EnhancedLearningGraph.tsx:1356 🎯 Connection created, triggering unified save with fresh state: {edgeId: 'edge_node_1761322576383_o77jyq464_0_node_1761322579914_e67b7ld0c_1_1761322583260_b1ogjqfbp', source: 'node_1761322576383_o77jyq464_0', target: 'node_1761322579914_e67b7ld0c_1', totalEdges: 2, isAttachment: false}
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
useUnifiedStorage.useEffect.handleGraphConnectionEvent @ useUnifiedStorage.ts:1281
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1305
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761322579914-ax9dtr4ls (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1723 ✅ Document inserted: conn-312jcq
VectorStore.ts:2171 🔍 Verifying document persistence: conn-312jcq (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 2-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1761322579914-ax9dtr4ls, Rev: 2-joslxzscsm)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 3-joslxzscsm
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for conn-312jcq: 1-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: Connection: New Chapter → New AI Frame (ID: conn-312jcq, Rev: 1-joslxzscsm)
FrameGraphIntegration.tsx:896 ✅ Connection inserted successfully: {connectionId: 'edge_node_1761322576383_o77jyq464_0_node_1761322579914_e67b7ld0c_1_1761322583260_b1ogjqfbp', documentId: 'conn-312jcq', idLength: 11}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 4-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 4-joslxzscsm)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-24T16:16:23.749Z'}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 1, nodeCount: 2, edgeCount: 1, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 2-joslxzscsm
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
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1170
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
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761322579914-ax9dtr4ls (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 3-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1761322579914-ax9dtr4ls, Rev: 3-joslxzscsm)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 4-joslxzscsm
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 5-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 5-joslxzscsm)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-24T16:16:25.188Z'}
EnhancedLearningGraph.tsx:1600 🎯 Node drop detected - video-attachment added, triggering delayed unified save
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 3-joslxzscsm
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
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1253
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
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761322579914-ax9dtr4ls (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 4-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1761322579914-ax9dtr4ls, Rev: 4-joslxzscsm)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 5-joslxzscsm
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 6-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 6-joslxzscsm)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 1, nodeCount: 2, edgeCount: 1, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 4-joslxzscsm
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
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1170
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:164
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761322579914-ax9dtr4ls (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 5-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1761322579914-ax9dtr4ls, Rev: 5-joslxzscsm)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 6-joslxzscsm
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
EnhancedLearningGraph.tsx:1227 🔗 Creating attachment connection: {sourceNode: 'video-attachment', targetFrameId: 'frame-1761322579914-ax9dtr4ls', attachmentType: 'video', attachmentData: {…}, sourceNodeVideoUrl: 'https://www.youtube.com/watch?v=po7doQNkhuU', …}
EnhancedLearningGraph.tsx:301 🎥 CRITICAL DEBUG: Video attachment data: {attachmentDataVideoUrl: 'https://www.youtube.com/watch?v=po7doQNkhuU', attachmentDataStartTime: 0, attachmentDataDuration: 300, videoUrlEmpty: false, videoUrlLength: 43}
EnhancedLearningGraph.tsx:326 🎥 CRITICAL DEBUG: Frame updated with video data: {frameId: 'frame-1761322579914-ax9dtr4ls', frameVideoUrl: '', frameStartTime: 0, frameDuration: 300, frameHasAttachment: true, …}
EnhancedLearningGraph.tsx:338 📊 ATTACHMENT DEBUG: Frame updated in array: {frameId: 'frame-1761322579914-ax9dtr4ls', totalFrames: 1, attachedFrame: {…}, attachmentPresent: true}
EnhancedLearningGraph.tsx:362 ✅ Enhanced: Content attached → Frame Navigation sync triggered: {frameId: 'frame-1761322579914-ax9dtr4ls', attachmentType: 'video', action: 'attached'}
FrameGraphIntegration.tsx:842 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1761322585663_f3er3pm1t_2_node_1761322579914_e67b7ld0c_1_1761322589860_nmwe53pub', originalLength: 90, generatedDocId: 'conn-xbhtm9', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:883 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 7-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 7-joslxzscsm)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-24T16:16:30.017Z'}
VectorStore.ts:1723 ✅ Document inserted: conn-xbhtm9
VectorStore.ts:2171 🔍 Verifying document persistence: conn-xbhtm9 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
EnhancedLearningGraph.tsx:1356 🎯 Connection created, triggering unified save with fresh state: {edgeId: 'edge_node_1761322585663_f3er3pm1t_2_node_1761322579914_e67b7ld0c_1_1761322589860_nmwe53pub', source: 'node_1761322585663_f3er3pm1t_2', target: 'node_1761322579914_e67b7ld0c_1', totalEdges: 3, isAttachment: true}
VectorStore.ts:1581 📋 Retrieved latest revision for conn-xbhtm9: 1-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: Connection: Video Content → New AI Frame (ID: conn-xbhtm9, Rev: 1-joslxzscsm)
FrameGraphIntegration.tsx:896 ✅ Connection inserted successfully: {connectionId: 'edge_node_1761322585663_f3er3pm1t_2_node_1761322579914_e67b7ld0c_1_1761322589860_nmwe53pub', documentId: 'conn-xbhtm9', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 1, nodeCount: 3, edgeCount: 3, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 5-joslxzscsm
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
useUnifiedStorage.useEffect.handleAttachmentChangedEvent @ useUnifiedStorage.ts:1210
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1333
setTimeout
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1324
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761322579914-ax9dtr4ls (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 6-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1761322579914-ax9dtr4ls, Rev: 6-joslxzscsm)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 7-joslxzscsm
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 8-joslxzscsm
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 8-joslxzscsm)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-24T16:16:30.278Z'}
base.js:8700 [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
aI.C @ base.js:8700
g.p.C @ base.js:12314
de @ base.js:3061
g.GH @ base.js:7444
g.h6 @ base.js:6459
gTS @ base.js:6348
g.p.init @ base.js:13030
g.TM.create @ base.js:13084
yl @ base.js:5339
g.vK @ base.js:7825
g.vK.create @ base.js:13528
a.G @ www-embed-player.js:2264
$D @ www-embed-player.js:2265
p.loadNewVideoConfig @ www-embed-player.js:2259
(anonymous) @ www-embed-player.js:2257
setTimeout
XD @ www-embed-player.js:2257
qE @ www-embed-player.js:2297
(anonymous) @ www-embed-player.js:2330
(anonymous) @ po7doQNkhuU?start=0:10
base.js:8700 [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
aI.C @ base.js:8700
g.p.C @ base.js:12314
de @ base.js:3061
g.GH @ base.js:7444
g.h6 @ base.js:6459
gTS @ base.js:6348
g.p.init @ base.js:13030
g.TM.create @ base.js:13084
yl @ base.js:5339
g.vK @ base.js:7825
g.vK.create @ base.js:13528
a.G @ www-embed-player.js:2264
$D @ www-embed-player.js:2265
p.loadNewVideoConfig @ www-embed-player.js:2259
(anonymous) @ www-embed-player.js:2257
setTimeout
XD @ www-embed-player.js:2257
qE @ www-embed-player.js:2297
(anonymous) @ www-embed-player.js:2330
(anonymous) @ po7doQNkhuU?start=0:10
base.js:8700 [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
aI.C @ base.js:8700
g.p.C @ base.js:12314
de @ base.js:3061
g.GH @ base.js:7444
YE @ base.js:1155
g.p.updateVideoData @ base.js:12847
g.h6 @ base.js:6463
gTS @ base.js:6348
g.p.init @ base.js:13030
g.TM.create @ base.js:13084
yl @ base.js:5339
g.vK @ base.js:7825
g.vK.create @ base.js:13528
a.G @ www-embed-player.js:2264
$D @ www-embed-player.js:2265
p.loadNewVideoConfig @ www-embed-player.js:2259
(anonymous) @ www-embed-player.js:2257
setTimeout
XD @ www-embed-player.js:2257
qE @ www-embed-player.js:2297
(anonymous) @ www-embed-player.js:2330
(anonymous) @ po7doQNkhuU?start=0:10
base.js:8700 [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
aI.C @ base.js:8700
g.p.C @ base.js:12314
de @ base.js:3061
g.GH @ base.js:7444
IB @ base.js:2655
g.h6 @ base.js:6463
gTS @ base.js:6348
g.p.init @ base.js:13030
g.TM.create @ base.js:13084
yl @ base.js:5339
g.vK @ base.js:7825
g.vK.create @ base.js:13528
a.G @ www-embed-player.js:2264
$D @ www-embed-player.js:2265
p.loadNewVideoConfig @ www-embed-player.js:2259
(anonymous) @ www-embed-player.js:2257
setTimeout
XD @ www-embed-player.js:2257
qE @ www-embed-player.js:2297
(anonymous) @ www-embed-player.js:2330
(anonymous) @ po7doQNkhuU?start=0:10
base.js:8700 [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
aI.C @ base.js:8700
g.p.C @ base.js:12314
de @ base.js:3061
g.GH @ base.js:7444
lY @ base.js:2891
gTS @ base.js:6353
g.p.init @ base.js:13030
g.TM.create @ base.js:13084
yl @ base.js:5339
g.vK @ base.js:7825
g.vK.create @ base.js:13528
a.G @ www-embed-player.js:2264
$D @ www-embed-player.js:2265
p.loadNewVideoConfig @ www-embed-player.js:2259
(anonymous) @ www-embed-player.js:2257
setTimeout
XD @ www-embed-player.js:2257
qE @ www-embed-player.js:2297
(anonymous) @ www-embed-player.js:2330
(anonymous) @ po7doQNkhuU?start=0:10
www-embed-player.js:2257 [Violation] 'setTimeout' handler took 67ms
base.js:923 [Violation] 'setTimeout' handler took 70ms
www-embed-player.js:1220 XHR finished loading: GET "https://googleads.g.doubleclick.net/pagead/id".
Kq @ www-embed-player.js:1220
Oq @ www-embed-player.js:1225
(anonymous) @ www-embed-player.js:1822
Fk @ www-embed-player.js:678
Ky @ www-embed-player.js:1819
Wp @ www-embed-player.js:1841
dz @ www-embed-player.js:1846
jA @ www-embed-player.js:1899
(anonymous) @ www-embed-player.js:2328
(anonymous) @ po7doQNkhuU?start=0:10
www-embed-player.js:1220 XHR finished loading: POST "https://www.youtube.com/youtubei/v1/log_event?alt=json".
Kq @ www-embed-player.js:1220
Oq @ www-embed-player.js:1225
fw @ www-embed-player.js:1635
(anonymous) @ www-embed-player.js:1542
Ea @ www-embed-player.js:37
Fa.next @ www-embed-player.js:38
b @ www-embed-player.js:42
Promise.then
f @ www-embed-player.js:44
(anonymous) @ www-embed-player.js:45
Ga @ www-embed-player.js:44
B @ www-embed-player.js:46
rv @ www-embed-player.js:1541
(anonymous) @ www-embed-player.js:1539
Ea @ www-embed-player.js:37
Fa.next @ www-embed-player.js:38
b @ www-embed-player.js:42
Promise.then
f @ www-embed-player.js:44
(anonymous) @ www-embed-player.js:45
Ga @ www-embed-player.js:44
B @ www-embed-player.js:46
(anonymous) @ www-embed-player.js:1539
Or @ www-embed-player.js:1295
Tr @ www-embed-player.js:1304
p.ag @ www-embed-player.js:1300
requestAnimationFrame
p.start @ www-embed-player.js:1305
p.Xa @ www-embed-player.js:1288
cs @ www-embed-player.js:1311
ns.Xa @ www-embed-player.js:1324
Ir.ra @ www-embed-player.js:1283
FE @ www-embed-player.js:2317
(anonymous) @ www-embed-player.js:2331
(anonymous) @ po7doQNkhuU?start=0:10
base.js:8434 XHR finished loading: POST "https://jnn-pa.googleapis.com/$rpc/google.internal.waa.v1.Waa/Create".
g.p.send @ base.js:8434
vGw @ base.js:975
(anonymous) @ base.js:5344
(anonymous) @ base.js:5344
Wtg @ base.js:5347
AWK.create @ base.js:8583
(anonymous) @ base.js:3349
vP @ base.js:236
next @ base.js:4444
(anonymous) @ base.js:1025
jiw @ base.js:1024
g.r @ base.js:4321
yxK @ base.js:3349
jgK @ base.js:2597
(anonymous) @ base.js:4144
vP @ base.js:236
next @ base.js:4444
G @ base.js:1023
Promise.then
t @ base.js:1024
(anonymous) @ base.js:1025
jiw @ base.js:1024
g.r @ base.js:4321
qQg @ base.js:4143
S7 @ base.js:401
DQC @ base.js:6948
MFR @ base.js:3391
ni @ base.js:3011
(anonymous) @ base.js:867
Or @ www-embed-player.js:1295
Tr @ www-embed-player.js:1304
p.xf @ www-embed-player.js:1297
requestIdleCallback
p.start @ www-embed-player.js:1305
Tr @ www-embed-player.js:1304
p.ag @ www-embed-player.js:1300
requestAnimationFrame
p.start @ www-embed-player.js:1305
p.Xa @ www-embed-player.js:1288
cs @ www-embed-player.js:1311
ns.Xa @ www-embed-player.js:1324
Ir.ra @ www-embed-player.js:1283
FE @ www-embed-player.js:2317
(anonymous) @ www-embed-player.js:2331
(anonymous) @ po7doQNkhuU?start=0:10
base.js:8434 XHR finished loading: POST "https://jnn-pa.googleapis.com/$rpc/google.internal.waa.v1.Waa/GenerateIT".
g.p.send @ base.js:8434
vGw @ base.js:975
(anonymous) @ base.js:5344
(anonymous) @ base.js:5344
Wtg @ base.js:5347
(anonymous) @ base.js:1034
vP @ base.js:236
next @ base.js:4444
(anonymous) @ base.js:1025
jiw @ base.js:1024
g.r @ base.js:4321
WMf @ base.js:1034
OXY @ base.js:598
(anonymous) @ base.js:1690
vP @ base.js:236
next @ base.js:4444
G @ base.js:1023
Promise.then
t @ base.js:1024
(anonymous) @ base.js:1025
jiw @ base.js:1024
g.r @ base.js:4321
MG @ base.js:1688
(anonymous) @ base.js:726
E.Yt @ base.js:415
nxC @ base.js:2179
(anonymous) @ base.js:4147
vP @ base.js:236
next @ base.js:4444
G @ base.js:1023
Promise.then
t @ base.js:1024
Promise.then
t @ base.js:1024
Promise.then
t @ base.js:1024
Promise.then
t @ base.js:1024
Promise.then
t @ base.js:1024
(anonymous) @ base.js:1025
jiw @ base.js:1024
g.r @ base.js:4321
qQg @ base.js:4143
S7 @ base.js:401
DQC @ base.js:6948
MFR @ base.js:3391
ni @ base.js:3011
(anonymous) @ base.js:867
Or @ www-embed-player.js:1295
Tr @ www-embed-player.js:1304
p.xf @ www-embed-player.js:1297
requestIdleCallback
p.start @ www-embed-player.js:1305
Tr @ www-embed-player.js:1304
p.ag @ www-embed-player.js:1300
requestAnimationFrame
p.start @ www-embed-player.js:1305
p.Xa @ www-embed-player.js:1288
cs @ www-embed-player.js:1311
ns.Xa @ www-embed-player.js:1324
Ir.ra @ www-embed-player.js:1283
FE @ www-embed-player.js:2317
(anonymous) @ www-embed-player.js:2331
(anonymous) @ po7doQNkhuU?start=0:10
www-embed-player.js:1220 XHR finished loading: POST "https://www.youtube.com/youtubei/v1/log_event?alt=json".
Kq @ www-embed-player.js:1220
Oq @ www-embed-player.js:1225
fw @ www-embed-player.js:1635
p.sendAndWrite @ www-embed-player.js:1538
ew.sendAndWrite @ www-embed-player.js:1630
e @ www-embed-player.js:1646
(anonymous) @ www-embed-player.js:1654
Promise.then
mv @ www-embed-player.js:1654
Wx @ www-embed-player.js:1762
Yx @ www-embed-player.js:1753
(anonymous) @ www-embed-player.js:1751
Fk @ www-embed-player.js:678
Sx @ www-embed-player.js:1751
c @ www-embed-player.js:1754
(anonymous) @ www-embed-player.js:1756
(anonymous) @ www-embed-player.js:1188
setTimeout
Aq @ www-embed-player.js:1209
Ux @ www-embed-player.js:1769
Vx @ www-embed-player.js:1756
Rx @ www-embed-player.js:1748
Lx @ www-embed-player.js:1746
ey @ www-embed-player.js:1777
zs @ www-embed-player.js:1778
QA.tick @ www-embed-player.js:1945
cB @ www-embed-player.js:1967
(anonymous) @ www-embed-player.js:1188
uB @ www-embed-player.js:1992
(anonymous) @ www-embed-player.js:1999
setTimeout
(anonymous) @ www-embed-player.js:1999
requestAnimationFrame
(anonymous) @ www-embed-player.js:1999
(anonymous) @ www-embed-player.js:1188
AB @ www-embed-player.js:1999
GE @ www-embed-player.js:2321
(anonymous) @ www-embed-player.js:2333
(anonymous) @ www-embed-player.js:1188
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
Navigated to http://localhost:3000/ai-frames
analytics.ts:160 📱 Device Info Collected: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', platform: 'MacIntel', vendor: 'Google Inc.', language: 'en-US', languages: Array(4), …}
analytics.ts:193 🌍 Location Info Collected: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US'}
analytics.ts:79 📊 GA4 Environment Variables Debug: {measurementId: 'G-V1B8R98P79', anonymizeIp: false, debugMode: false, siteName: 'TimeCapsule- SLM', siteUrl: 'http://localhost:3000', …}
VectorStore.ts:22 -------------- RxDB dev-mode warning -------------------------------
you are seeing this because you use the RxDB dev-mode plugin https://rxdb.info/dev-mode.html?console=dev-mode 
This is great in development mode, because it will run many checks to ensure
that you use RxDB correct. If you see this in production mode,
you did something wrong because the dev-mode plugin will decrease the performance.

🤗 Hint: To get the most out of RxDB, check out the Premium Plugins
to get access to faster storages and more professional features: https://rxdb.info/premium/?console=dev-mode 

You can disable this warning by calling disableWarnings() from the dev-mode plugin.
---------------------------------------------------------------------
overrideMethod @ hook.js:608
init @ index.js:73
addRxPlugin @ plugin.js:75
eval @ VectorStore.ts:22
(app-pages-browser)/./src/components/VectorStore/VectorStore.ts @ layout.js:7809
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
fn @ webpack.js?v=1761322622682:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7842
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
fn @ webpack.js?v=1761322622682:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false!:11
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false! @ layout.js:4998
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
__webpack_exec__ @ layout.js:8073
(anonymous) @ layout.js:8074
__webpack_require__.O @ webpack.js?v=1761322622682:84
(anonymous) @ layout.js:8075
webpackJsonpCallback @ webpack.js?v=1761322622682:1388
(anonymous) @ layout.js:9
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.16843543497877, longitude: 72.84661753031598, …}
unifiedStorage.ts:117 📂 Starting unified load...
 🔄 Loading initial data with unified storage...
 📂 Starting unified load...
 🔧 AI-Frames unified storage interface updated: {hasVectorStore: false, vectorStoreInitialized: false, frameCount: 0, hasUnifiedMethods: true}
 🚀 Auto-initializing VectorStore for route: /ai-frames
 🚀 VectorStoreProvider: Creating new singleton VectorStore...
 🔍 RAG Tracker initialized with config: {enableTracking: true, enableVisualization: true, enablePerformanceMetrics: true, enableQualityMetrics: false, maxQueryHistory: 1000, …}
 🗂️ VectorStore constructor called
 🔍 RAG Tracker initialized for VectorStore
 🗂️ Initializing RxDB Vector Store...
 🤖 Loading document processor and starting immediate Xenova download...
EmbeddingService.ts:35 🧠 Xenova environment configured for CDN loading
DocumentProcessor.ts:61 🔧 DocumentProcessor constructor called (new architecture)
VectorStore.ts:264 🧠 Starting immediate background Xenova download...
VectorStore.ts:2028 🧠 Starting immediate Xenova download in background...
VectorStore.ts:2045 🔄 Initializing web worker (attempt 1/3)...
DocumentProcessor.ts:72 🔧 Initializing DocumentProcessor with immediate download architecture...
DocumentProcessor.ts:95 🔧 Initializing text processing worker...
VectorStore.ts:309 📚 Creating RxDB database...
unifiedStorage.ts:122 ✅ Loaded from localStorage: 1 frames
unifiedStorage.ts:122 ✅ Loaded from localStorage: 1 frames
useUnifiedStorage.ts:826 ⚠️ No matching frame found for node node_1761322576383_o77jyq464_0 with frameId: undefined
overrideMethod @ hook.js:608
useUnifiedStorage.useCallback[loadAll] @ useUnifiedStorage.ts:826
useUnifiedStorage.useCallback[loadAll] @ useUnifiedStorage.ts:794
await in useUnifiedStorage.useCallback[loadAll]
useUnifiedStorage.useEffect.initializeData @ useUnifiedStorage.ts:1059
useUnifiedStorage.useEffect @ useUnifiedStorage.ts:1063
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13941
flushPassiveEffects @ react-dom-client.development.js:15869
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
<AIFramesPage>
exports.jsx @ react-jsx-runtime.development.js:339
ClientPageRoot @ client-page.js:20
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10505
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
"use client"
eval @ react-server-dom-webpack-client.browser.development.js:2354
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
resolveModelChunk @ react-server-dom-webpack-client.browser.development.js:1031
resolveModel @ react-server-dom-webpack-client.browser.development.js:1599
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2288
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
"use server"
ResponseInstance @ react-server-dom-webpack-client.browser.development.js:1587
createResponseFromOptions @ react-server-dom-webpack-client.browser.development.js:2396
exports.createFromReadableStream @ react-server-dom-webpack-client.browser.development.js:2717
eval @ app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1761322622682:160
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
fn @ webpack.js?v=1761322622682:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1761322622682:182
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
__webpack_exec__ @ main-app.js?v=1761322622682:2824
(anonymous) @ main-app.js?v=1761322622682:2825
webpackJsonpCallback @ webpack.js?v=1761322622682:1388
(anonymous) @ main-app.js?v=1761322622682:9
useUnifiedStorage.ts:826 ⚠️ No matching frame found for node node_1761322585663_f3er3pm1t_2 with frameId: undefined
overrideMethod @ hook.js:608
useUnifiedStorage.useCallback[loadAll] @ useUnifiedStorage.ts:826
useUnifiedStorage.useCallback[loadAll] @ useUnifiedStorage.ts:794
await in useUnifiedStorage.useCallback[loadAll]
useUnifiedStorage.useEffect.initializeData @ useUnifiedStorage.ts:1059
useUnifiedStorage.useEffect @ useUnifiedStorage.ts:1063
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13941
flushPassiveEffects @ react-dom-client.development.js:15869
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
<AIFramesPage>
exports.jsx @ react-jsx-runtime.development.js:339
ClientPageRoot @ client-page.js:20
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10505
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
"use client"
eval @ react-server-dom-webpack-client.browser.development.js:2354
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
resolveModelChunk @ react-server-dom-webpack-client.browser.development.js:1031
resolveModel @ react-server-dom-webpack-client.browser.development.js:1599
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2288
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
"use server"
ResponseInstance @ react-server-dom-webpack-client.browser.development.js:1587
createResponseFromOptions @ react-server-dom-webpack-client.browser.development.js:2396
exports.createFromReadableStream @ react-server-dom-webpack-client.browser.development.js:2717
eval @ app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1761322622682:160
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
fn @ webpack.js?v=1761322622682:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1761322622682:182
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
__webpack_exec__ @ main-app.js?v=1761322622682:2824
(anonymous) @ main-app.js?v=1761322622682:2825
webpackJsonpCallback @ webpack.js?v=1761322622682:1388
(anonymous) @ main-app.js?v=1761322622682:9
useUnifiedStorage.ts:839 ✅ Load completed: 1 frames
useUnifiedStorage.ts:826 ⚠️ No matching frame found for node node_1761322576383_o77jyq464_0 with frameId: undefined
overrideMethod @ hook.js:608
useUnifiedStorage.useCallback[loadAll] @ useUnifiedStorage.ts:826
useUnifiedStorage.useCallback[loadAll] @ useUnifiedStorage.ts:794
await in useUnifiedStorage.useCallback[loadAll]
AIFramesPage.useEffect.loadInitialData @ page.tsx:281
AIFramesPage.useEffect @ page.tsx:298
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13941
flushPassiveEffects @ react-dom-client.development.js:15869
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
<AIFramesPage>
exports.jsx @ react-jsx-runtime.development.js:339
ClientPageRoot @ client-page.js:20
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10505
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
"use client"
eval @ react-server-dom-webpack-client.browser.development.js:2354
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
resolveModelChunk @ react-server-dom-webpack-client.browser.development.js:1031
resolveModel @ react-server-dom-webpack-client.browser.development.js:1599
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2288
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
"use server"
ResponseInstance @ react-server-dom-webpack-client.browser.development.js:1587
createResponseFromOptions @ react-server-dom-webpack-client.browser.development.js:2396
exports.createFromReadableStream @ react-server-dom-webpack-client.browser.development.js:2717
eval @ app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1761322622682:160
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
fn @ webpack.js?v=1761322622682:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1761322622682:182
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
__webpack_exec__ @ main-app.js?v=1761322622682:2824
(anonymous) @ main-app.js?v=1761322622682:2825
webpackJsonpCallback @ webpack.js?v=1761322622682:1388
(anonymous) @ main-app.js?v=1761322622682:9
useUnifiedStorage.ts:826 ⚠️ No matching frame found for node node_1761322585663_f3er3pm1t_2 with frameId: undefined
overrideMethod @ hook.js:608
useUnifiedStorage.useCallback[loadAll] @ useUnifiedStorage.ts:826
useUnifiedStorage.useCallback[loadAll] @ useUnifiedStorage.ts:794
await in useUnifiedStorage.useCallback[loadAll]
AIFramesPage.useEffect.loadInitialData @ page.tsx:281
AIFramesPage.useEffect @ page.tsx:298
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13941
flushPassiveEffects @ react-dom-client.development.js:15869
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
<AIFramesPage>
exports.jsx @ react-jsx-runtime.development.js:339
ClientPageRoot @ client-page.js:20
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10505
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
"use client"
eval @ react-server-dom-webpack-client.browser.development.js:2354
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
resolveModelChunk @ react-server-dom-webpack-client.browser.development.js:1031
resolveModel @ react-server-dom-webpack-client.browser.development.js:1599
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2288
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
"use server"
ResponseInstance @ react-server-dom-webpack-client.browser.development.js:1587
createResponseFromOptions @ react-server-dom-webpack-client.browser.development.js:2396
exports.createFromReadableStream @ react-server-dom-webpack-client.browser.development.js:2717
eval @ app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1761322622682:160
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
fn @ webpack.js?v=1761322622682:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1761322622682:182
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
__webpack_exec__ @ main-app.js?v=1761322622682:2824
(anonymous) @ main-app.js?v=1761322622682:2825
webpackJsonpCallback @ webpack.js?v=1761322622682:1388
(anonymous) @ main-app.js?v=1761322622682:9
useUnifiedStorage.ts:839 ✅ Load completed: 1 frames
page.tsx:284 ✅ Unified storage load completed successfully
page.tsx:289 ✅ Initial data loading complete
VectorStore.ts:316 -------------- RxDB Open Core RxStorage -------------------------------
You are using the free Dexie.js based RxStorage implementation from RxDB https://rxdb.info/rx-storage-dexie.html?console=dexie 
While this is a great option, we want to let you know that there are faster storage solutions available in our premium plugins.
For professional users and production environments, we highly recommend considering these premium options to enhance performance and reliability.
 https://rxdb.info/premium/?console=dexie 
If you already purchased premium access you can disable this log by calling the setPremiumFlag() function from rxdb-premium/plugins/shared.
---------------------------------------------------------------------
overrideMethod @ hook.js:608
bulkWrite @ rx-storage-instance-dexie.js:44
await in bulkWrite
instance.bulkWrite @ plugin-helpers.js:90
eval @ rx-storage-helper.js:478
wrapCall @ index.js:76
lockedRun @ rx-database.js:327
bulkWrite @ rx-storage-helper.js:478
ensureStorageTokenDocumentExists @ rx-database-internal-store.js:156
RxDatabaseBase @ rx-database.js:131
eval @ rx-database.js:548
await in eval
createRxDatabase @ rx-database.js:564
init @ VectorStore.ts:316
VectorStoreProvider.useCallback[initializeVectorStore] @ VectorStoreProvider.tsx:84
VectorStoreProvider.useEffect @ VectorStoreProvider.tsx:144
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13941
flushPassiveEffects @ react-dom-client.development.js:15869
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
"use client"
RootLayout @ layout.tsx:165
eval @ react-server-dom-webpack-client.browser.development.js:2355
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
getOutlinedModel @ react-server-dom-webpack-client.browser.development.js:1327
parseModelString @ react-server-dom-webpack-client.browser.development.js:1540
eval @ react-server-dom-webpack-client.browser.development.js:2294
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
resolveModelChunk @ react-server-dom-webpack-client.browser.development.js:1031
resolveModel @ react-server-dom-webpack-client.browser.development.js:1599
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2288
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
<RootLayout>
buildFakeTask @ react-server-dom-webpack-client.browser.development.js:2040
initializeFakeTask @ react-server-dom-webpack-client.browser.development.js:2027
resolveDebugInfo @ react-server-dom-webpack-client.browser.development.js:2063
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2261
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
"use server"
ResponseInstance @ react-server-dom-webpack-client.browser.development.js:1587
createResponseFromOptions @ react-server-dom-webpack-client.browser.development.js:2396
exports.createFromReadableStream @ react-server-dom-webpack-client.browser.development.js:2717
eval @ app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1761322622682:160
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
fn @ webpack.js?v=1761322622682:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1761322622682:182
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
__webpack_exec__ @ main-app.js?v=1761322622682:2824
(anonymous) @ main-app.js?v=1761322622682:2825
webpackJsonpCallback @ webpack.js?v=1761322622682:1388
(anonymous) @ main-app.js?v=1761322622682:9
VectorStore.ts:323 📄 Creating documents collection...
navbar.tsx:72 Image with src "/Media/TimeCapsule_04.png" has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes
overrideMethod @ hook.js:608
warnOnce @ warn-once.js:16
eval @ image-component.js:89
Promise.then
handleLoading @ image-component.js:36
eval @ image-component.js:153
applyRef @ use-merged-ref.js:49
eval @ use-merged-ref.js:39
commitAttachRef @ react-dom-client.development.js:12246
runWithFiberInDEV @ react-dom-client.development.js:845
safelyAttachRef @ react-dom-client.development.js:12264
commitLayoutEffectOnFiber @ react-dom-client.development.js:12805
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12803
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12803
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12803
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12803
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12803
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12803
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12803
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12803
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12692
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12692
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12692
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12803
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12803
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12692
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12692
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12692
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12692
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12769
flushLayoutEffects @ react-dom-client.development.js:15687
commitRoot @ react-dom-client.development.js:15528
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<img>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ image-component.js:166
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateForwardRef @ react-dom-client.development.js:8679
beginWork @ react-dom-client.development.js:10895
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<ForwardRef>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ image-component.js:281
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateForwardRef @ react-dom-client.development.js:8679
beginWork @ react-dom-client.development.js:10895
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<ForwardRef>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
Navbar @ navbar.tsx:72
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10556
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<Navbar>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
AIFramesLayout @ layout.tsx:12
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10556
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<AIFramesLayout>
exports.jsx @ react-jsx-runtime.development.js:339
ClientSegmentRoot @ client-segment.js:18
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10505
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
"use client"
eval @ react-server-dom-webpack-client.browser.development.js:2354
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
resolveModelChunk @ react-server-dom-webpack-client.browser.development.js:1031
resolveModel @ react-server-dom-webpack-client.browser.development.js:1599
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2288
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
"use server"
ResponseInstance @ react-server-dom-webpack-client.browser.development.js:1587
createResponseFromOptions @ react-server-dom-webpack-client.browser.development.js:2396
exports.createFromReadableStream @ react-server-dom-webpack-client.browser.development.js:2717
eval @ app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1761322622682:160
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
fn @ webpack.js?v=1761322622682:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1761322622682:182
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
__webpack_exec__ @ main-app.js?v=1761322622682:2824
(anonymous) @ main-app.js?v=1761322622682:2825
webpackJsonpCallback @ webpack.js?v=1761322622682:1388
(anonymous) @ main-app.js?v=1761322622682:9
embeddingWorker.js:487 🔧 Text processing worker loaded successfully
embeddingWorker.js:59 🔧 Initializing text processing worker...
embeddingWorker.js:73 ✅ Text processing worker initialized successfully
page.tsx:374 🔧 AI-Frames unified storage interface updated: {hasVectorStore: false, vectorStoreInitialized: false, frameCount: 1, hasUnifiedMethods: true}
VectorStoreProvider.tsx:146 ⏭️ Skipping auto-init for /ai-frames: {isInitialized: false, isInitializing: true, attemptedBefore: true, singletonInitialized: false}
DocumentProcessor.ts:116 ✅ Text processing worker ready
DocumentProcessor.ts:125 ✅ DocumentProcessor initialization complete (embeddings will load when needed)
VectorStore.ts:2047 ✅ Web worker initialized successfully
VectorStore.ts:2065 🧠 Starting Xenova embedding service download...
EmbeddingService.ts:69 🧠 Starting Xenova embedding service initialization...
EmbeddingService.ts:77 ✅ Loading model (checking cache)...
EmbeddingService.ts:84 📦 Loading Xenova/bge-small-en-v1.5 model from Hugging Face CDN...
dialog.tsx:60 Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.
overrideMethod @ hook.js:608
DescriptionWarning.useEffect @ index.mjs:477
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13941
flushPassiveEffects @ react-dom-client.development.js:15869
flushPendingEffects @ react-dom-client.development.js:15830
flushSpawnedWork @ react-dom-client.development.js:15796
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<DescriptionWarning>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.mjs:352
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateForwardRef @ react-dom-client.development.js:8679
beginWork @ react-dom-client.development.js:10895
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<ForwardRef>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.mjs:252
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateForwardRef @ react-dom-client.development.js:8679
beginWork @ react-dom-client.development.js:10895
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<ForwardRef>
exports.jsx @ react-jsx-runtime.development.js:339
DialogContent @ index.mjs:220
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateForwardRef @ react-dom-client.development.js:8679
beginWork @ react-dom-client.development.js:10895
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<DialogContent>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DialogContent @ dialog.tsx:60
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10556
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<DialogContent>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
VectorStoreInitModal @ VectorStoreInitModal.tsx:137
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10556
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<VectorStoreInitModal>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
AIFramesPage @ page.tsx:1277
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10556
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<AIFramesPage>
exports.jsx @ react-jsx-runtime.development.js:339
ClientPageRoot @ client-page.js:20
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10505
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
"use client"
eval @ react-server-dom-webpack-client.browser.development.js:2354
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
resolveModelChunk @ react-server-dom-webpack-client.browser.development.js:1031
resolveModel @ react-server-dom-webpack-client.browser.development.js:1599
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2288
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
"use server"
ResponseInstance @ react-server-dom-webpack-client.browser.development.js:1587
createResponseFromOptions @ react-server-dom-webpack-client.browser.development.js:2396
exports.createFromReadableStream @ react-server-dom-webpack-client.browser.development.js:2717
eval @ app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1761322622682:160
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
fn @ webpack.js?v=1761322622682:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1761322622682:182
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
__webpack_exec__ @ main-app.js?v=1761322622682:2824
(anonymous) @ main-app.js?v=1761322622682:2825
webpackJsonpCallback @ webpack.js?v=1761322622682:1388
(anonymous) @ main-app.js?v=1761322622682:9
SessionProvider.tsx:11 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect @ react.js:317
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13941
flushPassiveEffects @ react-dom-client.development.js:15869
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
<SessionProvider>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
SessionProvider @ SessionProvider.tsx:11
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10505
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
"use client"
RootLayout @ layout.tsx:172
eval @ react-server-dom-webpack-client.browser.development.js:2355
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
getOutlinedModel @ react-server-dom-webpack-client.browser.development.js:1327
parseModelString @ react-server-dom-webpack-client.browser.development.js:1540
eval @ react-server-dom-webpack-client.browser.development.js:2294
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
resolveModelChunk @ react-server-dom-webpack-client.browser.development.js:1031
resolveModel @ react-server-dom-webpack-client.browser.development.js:1599
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2288
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
<RootLayout>
buildFakeTask @ react-server-dom-webpack-client.browser.development.js:2040
initializeFakeTask @ react-server-dom-webpack-client.browser.development.js:2027
resolveDebugInfo @ react-server-dom-webpack-client.browser.development.js:2063
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2261
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
"use server"
ResponseInstance @ react-server-dom-webpack-client.browser.development.js:1587
createResponseFromOptions @ react-server-dom-webpack-client.browser.development.js:2396
exports.createFromReadableStream @ react-server-dom-webpack-client.browser.development.js:2717
eval @ app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1761322622682:160
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
fn @ webpack.js?v=1761322622682:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1761322622682:182
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
__webpack_exec__ @ main-app.js?v=1761322622682:2824
(anonymous) @ main-app.js?v=1761322622682:2825
webpackJsonpCallback @ webpack.js?v=1761322622682:1388
(anonymous) @ main-app.js?v=1761322622682:9
dialog.tsx:60 Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.
overrideMethod @ hook.js:600
DescriptionWarning.useEffect @ index.mjs:477
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
reconnectPassiveEffects @ react-dom-client.development.js:14097
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14068
reconnectPassiveEffects @ react-dom-client.development.js:14144
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14068
reconnectPassiveEffects @ react-dom-client.development.js:14090
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14068
reconnectPassiveEffects @ react-dom-client.development.js:14090
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14068
reconnectPassiveEffects @ react-dom-client.development.js:14090
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14068
reconnectPassiveEffects @ react-dom-client.development.js:14090
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14068
reconnectPassiveEffects @ react-dom-client.development.js:14090
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14068
reconnectPassiveEffects @ react-dom-client.development.js:14090
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14068
reconnectPassiveEffects @ react-dom-client.development.js:14090
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14068
reconnectPassiveEffects @ react-dom-client.development.js:14144
doubleInvokeEffectsOnFiber @ react-dom-client.development.js:16100
runWithFiberInDEV @ react-dom-client.development.js:848
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16060
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16067
commitDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16109
flushPassiveEffects @ react-dom-client.development.js:15879
flushPendingEffects @ react-dom-client.development.js:15830
flushSpawnedWork @ react-dom-client.development.js:15796
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<DescriptionWarning>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.mjs:352
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateForwardRef @ react-dom-client.development.js:8679
beginWork @ react-dom-client.development.js:10895
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<ForwardRef>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.mjs:252
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateForwardRef @ react-dom-client.development.js:8679
beginWork @ react-dom-client.development.js:10895
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<ForwardRef>
exports.jsx @ react-jsx-runtime.development.js:339
DialogContent @ index.mjs:220
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateForwardRef @ react-dom-client.development.js:8679
beginWork @ react-dom-client.development.js:10895
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<DialogContent>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DialogContent @ dialog.tsx:60
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10556
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<DialogContent>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
VectorStoreInitModal @ VectorStoreInitModal.tsx:137
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10556
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<VectorStoreInitModal>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
AIFramesPage @ page.tsx:1277
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10556
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<AIFramesPage>
exports.jsx @ react-jsx-runtime.development.js:339
ClientPageRoot @ client-page.js:20
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10505
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
"use client"
eval @ react-server-dom-webpack-client.browser.development.js:2354
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
resolveModelChunk @ react-server-dom-webpack-client.browser.development.js:1031
resolveModel @ react-server-dom-webpack-client.browser.development.js:1599
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2288
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
"use server"
ResponseInstance @ react-server-dom-webpack-client.browser.development.js:1587
createResponseFromOptions @ react-server-dom-webpack-client.browser.development.js:2396
exports.createFromReadableStream @ react-server-dom-webpack-client.browser.development.js:2717
eval @ app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1761322622682:160
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
fn @ webpack.js?v=1761322622682:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1761322622682:182
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
__webpack_exec__ @ main-app.js?v=1761322622682:2824
(anonymous) @ main-app.js?v=1761322622682:2825
webpackJsonpCallback @ webpack.js?v=1761322622682:1388
(anonymous) @ main-app.js?v=1761322622682:9
Analytics.tsx:39 ⏳ Analytics: Skipping page tracking - no consent or not initialized
EmbeddingService.ts:98 Unable to determine content-length from response headers. Will expand buffer when needed.
overrideMethod @ hook.js:608
readResponse @ hub.js:607
getModelFile @ hub.js:536
await in getModelFile
getModelJSON @ hub.js:584
loadTokenizer @ tokenizers.js:106
from_pretrained @ tokenizers.js:4503
loadItems @ pipelines.js:3261
pipeline @ pipelines.js:3209
performImmediateInitialization @ EmbeddingService.ts:98
init @ EmbeddingService.ts:58
initializeXenovaService @ VectorStore.ts:2073
startImmediateBackgroundDownload @ VectorStore.ts:2034
await in startImmediateBackgroundDownload
init @ VectorStore.ts:273
VectorStoreProvider.useCallback[initializeVectorStore] @ VectorStoreProvider.tsx:84
VectorStoreProvider.useEffect @ VectorStoreProvider.tsx:144
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13941
flushPassiveEffects @ react-dom-client.development.js:15869
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
"use client"
RootLayout @ layout.tsx:165
eval @ react-server-dom-webpack-client.browser.development.js:2355
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
getOutlinedModel @ react-server-dom-webpack-client.browser.development.js:1327
parseModelString @ react-server-dom-webpack-client.browser.development.js:1540
eval @ react-server-dom-webpack-client.browser.development.js:2294
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1054
resolveModelChunk @ react-server-dom-webpack-client.browser.development.js:1031
resolveModel @ react-server-dom-webpack-client.browser.development.js:1599
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2288
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
<RootLayout>
buildFakeTask @ react-server-dom-webpack-client.browser.development.js:2040
initializeFakeTask @ react-server-dom-webpack-client.browser.development.js:2027
resolveDebugInfo @ react-server-dom-webpack-client.browser.development.js:2063
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2261
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2233
progress @ react-server-dom-webpack-client.browser.development.js:2479
"use server"
ResponseInstance @ react-server-dom-webpack-client.browser.development.js:1587
createResponseFromOptions @ react-server-dom-webpack-client.browser.development.js:2396
exports.createFromReadableStream @ react-server-dom-webpack-client.browser.development.js:2717
eval @ app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1761322622682:160
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
fn @ webpack.js?v=1761322622682:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1761322622682:182
options.factory @ webpack.js?v=1761322622682:712
__webpack_require__ @ webpack.js?v=1761322622682:37
__webpack_exec__ @ main-app.js?v=1761322622682:2824
(anonymous) @ main-app.js?v=1761322622682:2825
webpackJsonpCallback @ webpack.js?v=1761322622682:1388
(anonymous) @ main-app.js?v=1761322622682:9
VectorStore.ts:412 ✅ RxDB Vector Store initialized successfully
VectorStore.ts:413 🧠 Xenova download running in background...
VectorStoreProvider.tsx:85 ✅ VectorStoreProvider: Singleton VectorStore initialized successfully
GraphStorageManager.ts:84 🗂️ Initializing GraphStorageManager with VectorStore backend...
GraphStorageManager.ts:86 ✅ GraphStorageManager initialized successfully
page.tsx:374 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
VectorStoreProvider.tsx:146 ⏭️ Skipping auto-init for /ai-frames: {isInitialized: true, isInitializing: false, attemptedBefore: true, singletonInitialized: true}
scheduler.development.js:14 [Violation] 'message' handler took 257ms
MetadataManager.ts:1022 📋 Syncing metadata with vector store...
MetadataManager.ts:611 🔄 Starting enhanced metadata sync to Knowledge Base... {bubblSpacesCount: 1, timeCapslesCount: 1, vectorStoreStatus: {…}}
MetadataManager.ts:628 📝 Syncing BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1761322555715v6)
VectorStore.ts:917 🗑️ Deleting document: bubblspace-bubbl-1761322555715v6 (attempt 1/5)
page.tsx:221 ✅ Managers initialized successfully
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 1, nodeCount: 3, edgeCount: 2, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
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
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1253
EnhancedLearningGraph.useEffect @ EnhancedLearningGraph.tsx:696
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13932
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14048
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13941
flushPassiveEffects @ react-dom-client.development.js:15869
flushPendingEffects @ react-dom-client.development.js:15830
performSyncWorkOnRoot @ react-dom-client.development.js:16362
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
VectorStore.ts:1581 📋 Retrieved latest revision for bubblspace-bubbl-1761322555715v6: 3-joslxzscsm
VectorStore.ts:925 📋 Document bubblspace-bubbl-1761322555715v6 found with revision: 3-joslxzscsm
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 6-joslxzscsm
FrameGraphIntegration.tsx:784 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
FrameGraphIntegration.tsx:796 ✅ Session document inserted successfully: {sessionId: 'session_1761322624937', documentId: 'sess-1761322624937-uy9v2v'}
VectorStore.ts:929 ✅ Document deleted successfully: bubblspace-bubbl-1761322555715v6
MetadataManager.ts:634 🗑️ Deleted old BubblSpace document: bubblspace-bubbl-1761322555715v6
VectorStore.ts:1517 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761322579914-ax9dtr4ls (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
EmbeddingService.ts:147 ✅ Model loaded from cache instantly
VectorStore.ts:2079 📊 Xenova progress: Embedding model ready (100%)
EmbeddingService.ts:156 ✅ EmbeddingService initialized successfully
VectorStore.ts:2085 ✅ Xenova embedding service ready
VectorStore.ts:2036 ✅ Immediate background download completed
VectorStore.ts:282 ✅ Xenova model loaded from cache - all features ready
VectorStore.ts:291 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761322579914-ax9dtr4ls: 7-wjzuixezfz
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1761322579914-ax9dtr4ls, Rev: 7-wjzuixezfz)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 8-joslxzscsm
VectorStore.ts:1786 🔄 Bypassing duplicate detection for metadata update: BubblSpace: My BubblSpace
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1723 ✅ Document inserted: bubblspace-bubbl-1761322555715v6
VectorStore.ts:2171 🔍 Verifying document persistence: bubblspace-bubbl-1761322555715v6 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 9-wjzuixezfz
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 9-wjzuixezfz)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-24T16:17:05.336Z'}
VectorStore.ts:1581 📋 Retrieved latest revision for bubblspace-bubbl-1761322555715v6: 5-wjzuixezfz
VectorStore.ts:2184 ✅ Document persistence verified: BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1761322555715v6, Rev: 5-wjzuixezfz)
MetadataManager.ts:681 ✅ BubblSpace synced to Knowledge Base: My BubblSpace
MetadataManager.ts:686 ✅ BubblSpace persistence verified: My BubblSpace
MetadataManager.ts:715 📝 Syncing TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-1761322555716wd)
VectorStore.ts:917 🗑️ Deleting document: timecapsule-TC-1761322555716wd (attempt 1/5)
VectorStore.ts:1581 📋 Retrieved latest revision for timecapsule-TC-1761322555716wd: 3-joslxzscsm
VectorStore.ts:925 📋 Document timecapsule-TC-1761322555716wd found with revision: 3-joslxzscsm
VectorStore.ts:929 ✅ Document deleted successfully: timecapsule-TC-1761322555716wd
MetadataManager.ts:721 🗑️ Deleted old TimeCapsule document: timecapsule-TC-1761322555716wd
VectorStore.ts:1786 🔄 Bypassing duplicate detection for metadata update: TimeCapsule: Untitled TimeCapsule
VectorStore.ts:1793 📋 Found 0 existing TimeCapsule documents for timeCapsuleId: TC-1761322555716wd
VectorStore.ts:1610 📋 TimeCapsule document operation: {id: 'timecapsule-TC-1761322555716wd', title: 'TimeCapsule: Untitled TimeCapsule', source: 'metadata', timeCapsuleId: 'TC-1761322555716wd', name: 'Untitled TimeCapsule', …}
VectorStore.ts:1723 ✅ Document inserted: timecapsule-TC-1761322555716wd
VectorStore.ts:2171 🔍 Verifying document persistence: timecapsule-TC-1761322555716wd (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for timecapsule-TC-1761322555716wd: 5-wjzuixezfz
VectorStore.ts:2184 ✅ Document persistence verified: TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-1761322555716wd, Rev: 5-wjzuixezfz)
MetadataManager.ts:772 ✅ TimeCapsule synced to Knowledge Base: Untitled TimeCapsule
MetadataManager.ts:777 ✅ TimeCapsule persistence verified: Untitled TimeCapsule
MetadataManager.ts:806 ✅ All metadata synced to Knowledge Base successfully {syncedBubblSpaces: 1, syncedTimeCapsules: 1, totalItems: 2}
MetadataManager.ts:1027 ✅ Metadata synced with vector store
base.js:8700 [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
aI.C @ base.js:8700
g.p.C @ base.js:12314
de @ base.js:3061
g.GH @ base.js:7444
g.h6 @ base.js:6459
gTS @ base.js:6348
g.p.init @ base.js:13030
g.TM.create @ base.js:13084
yl @ base.js:5339
g.vK @ base.js:7825
g.vK.create @ base.js:13528
a.G @ www-embed-player.js:2264
$D @ www-embed-player.js:2265
p.loadNewVideoConfig @ www-embed-player.js:2259
(anonymous) @ www-embed-player.js:2257
setTimeout
XD @ www-embed-player.js:2257
qE @ www-embed-player.js:2297
(anonymous) @ www-embed-player.js:2330
(anonymous) @ po7doQNkhuU?start=0:10
base.js:8700 [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
aI.C @ base.js:8700
g.p.C @ base.js:12314
de @ base.js:3061
g.GH @ base.js:7444
g.h6 @ base.js:6459
gTS @ base.js:6348
g.p.init @ base.js:13030
g.TM.create @ base.js:13084
yl @ base.js:5339
g.vK @ base.js:7825
g.vK.create @ base.js:13528
a.G @ www-embed-player.js:2264
$D @ www-embed-player.js:2265
p.loadNewVideoConfig @ www-embed-player.js:2259
(anonymous) @ www-embed-player.js:2257
setTimeout
XD @ www-embed-player.js:2257
qE @ www-embed-player.js:2297
(anonymous) @ www-embed-player.js:2330
(anonymous) @ po7doQNkhuU?start=0:10
base.js:8700 [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
aI.C @ base.js:8700
g.p.C @ base.js:12314
de @ base.js:3061
g.GH @ base.js:7444
YE @ base.js:1155
g.p.updateVideoData @ base.js:12847
g.h6 @ base.js:6463
gTS @ base.js:6348
g.p.init @ base.js:13030
g.TM.create @ base.js:13084
yl @ base.js:5339
g.vK @ base.js:7825
g.vK.create @ base.js:13528
a.G @ www-embed-player.js:2264
$D @ www-embed-player.js:2265
p.loadNewVideoConfig @ www-embed-player.js:2259
(anonymous) @ www-embed-player.js:2257
setTimeout
XD @ www-embed-player.js:2257
qE @ www-embed-player.js:2297
(anonymous) @ www-embed-player.js:2330
(anonymous) @ po7doQNkhuU?start=0:10
base.js:8700 [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
aI.C @ base.js:8700
g.p.C @ base.js:12314
de @ base.js:3061
g.GH @ base.js:7444
IB @ base.js:2655
g.h6 @ base.js:6463
gTS @ base.js:6348
g.p.init @ base.js:13030
g.TM.create @ base.js:13084
yl @ base.js:5339
g.vK @ base.js:7825
g.vK.create @ base.js:13528
a.G @ www-embed-player.js:2264
$D @ www-embed-player.js:2265
p.loadNewVideoConfig @ www-embed-player.js:2259
(anonymous) @ www-embed-player.js:2257
setTimeout
XD @ www-embed-player.js:2257
qE @ www-embed-player.js:2297
(anonymous) @ www-embed-player.js:2330
(anonymous) @ po7doQNkhuU?start=0:10
base.js:8700 [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
aI.C @ base.js:8700
g.p.C @ base.js:12314
de @ base.js:3061
g.GH @ base.js:7444
lY @ base.js:2891
gTS @ base.js:6353
g.p.init @ base.js:13030
g.TM.create @ base.js:13084
yl @ base.js:5339
g.vK @ base.js:7825
g.vK.create @ base.js:13528
a.G @ www-embed-player.js:2264
$D @ www-embed-player.js:2265
p.loadNewVideoConfig @ www-embed-player.js:2259
(anonymous) @ www-embed-player.js:2257
setTimeout
XD @ www-embed-player.js:2257
qE @ www-embed-player.js:2297
(anonymous) @ www-embed-player.js:2330
(anonymous) @ po7doQNkhuU?start=0:10
base.js:923 [Violation] 'setTimeout' handler took 67ms
www-embed-player.js:1220 XHR finished loading: GET "https://googleads.g.doubleclick.net/pagead/id".
Kq @ www-embed-player.js:1220
Oq @ www-embed-player.js:1225
(anonymous) @ www-embed-player.js:1822
Fk @ www-embed-player.js:678
Ky @ www-embed-player.js:1819
Wp @ www-embed-player.js:1841
dz @ www-embed-player.js:1846
jA @ www-embed-player.js:1899
(anonymous) @ www-embed-player.js:2328
(anonymous) @ po7doQNkhuU?start=0:10
www-embed-player.js:1220 XHR finished loading: POST "https://www.youtube.com/youtubei/v1/log_event?alt=json".
Kq @ www-embed-player.js:1220
Oq @ www-embed-player.js:1225
fw @ www-embed-player.js:1635
(anonymous) @ www-embed-player.js:1542
Ea @ www-embed-player.js:37
Fa.next @ www-embed-player.js:38
b @ www-embed-player.js:42
Promise.then
f @ www-embed-player.js:44
(anonymous) @ www-embed-player.js:45
Ga @ www-embed-player.js:44
B @ www-embed-player.js:46
rv @ www-embed-player.js:1541
(anonymous) @ www-embed-player.js:1539
Ea @ www-embed-player.js:37
Fa.next @ www-embed-player.js:38
b @ www-embed-player.js:42
Promise.then
f @ www-embed-player.js:44
(anonymous) @ www-embed-player.js:45
Ga @ www-embed-player.js:44
B @ www-embed-player.js:46
(anonymous) @ www-embed-player.js:1539
Or @ www-embed-player.js:1295
Tr @ www-embed-player.js:1304
p.ag @ www-embed-player.js:1300
requestAnimationFrame
p.start @ www-embed-player.js:1305
p.Xa @ www-embed-player.js:1288
(anonymous) @ www-embed-player.js:1311
setTimeout
cs @ www-embed-player.js:1311
ns.Xa @ www-embed-player.js:1324
Ir.ra @ www-embed-player.js:1283
p.uc @ www-embed-player.js:1539
pv @ www-embed-player.js:1529
(anonymous) @ www-embed-player.js:1626
Promise.then
hw @ www-embed-player.js:1626
(anonymous) @ www-embed-player.js:1642
Ea @ www-embed-player.js:37
Fa.next @ www-embed-player.js:38
b @ www-embed-player.js:42
Promise.then
f @ www-embed-player.js:44
(anonymous) @ www-embed-player.js:45
Ga @ www-embed-player.js:44
B @ www-embed-player.js:46
nw @ www-embed-player.js:1642
FE @ www-embed-player.js:2317
(anonymous) @ www-embed-player.js:2331
(anonymous) @ po7doQNkhuU?start=0:10
base.js:8434 XHR finished loading: POST "https://jnn-pa.googleapis.com/$rpc/google.internal.waa.v1.Waa/Create".
g.p.send @ base.js:8434
vGw @ base.js:975
(anonymous) @ base.js:5344
(anonymous) @ base.js:5344
Wtg @ base.js:5347
AWK.create @ base.js:8583
(anonymous) @ base.js:3349
vP @ base.js:236
next @ base.js:4444
(anonymous) @ base.js:1025
jiw @ base.js:1024
g.r @ base.js:4321
yxK @ base.js:3349
jgK @ base.js:2597
(anonymous) @ base.js:4144
vP @ base.js:236
next @ base.js:4444
G @ base.js:1023
Promise.then
t @ base.js:1024
(anonymous) @ base.js:1025
jiw @ base.js:1024
g.r @ base.js:4321
qQg @ base.js:4143
S7 @ base.js:401
DQC @ base.js:6948
MFR @ base.js:3391
ni @ base.js:3011
(anonymous) @ base.js:867
Or @ www-embed-player.js:1295
Tr @ www-embed-player.js:1304
p.xf @ www-embed-player.js:1297
requestIdleCallback
p.start @ www-embed-player.js:1305
Tr @ www-embed-player.js:1304
p.ag @ www-embed-player.js:1300
requestAnimationFrame
p.start @ www-embed-player.js:1305
p.Xa @ www-embed-player.js:1288
(anonymous) @ www-embed-player.js:1311
setTimeout
cs @ www-embed-player.js:1311
ns.Xa @ www-embed-player.js:1324
Ir.ra @ www-embed-player.js:1283
p.uc @ www-embed-player.js:1539
pv @ www-embed-player.js:1529
(anonymous) @ www-embed-player.js:1626
Promise.then
hw @ www-embed-player.js:1626
(anonymous) @ www-embed-player.js:1642
Ea @ www-embed-player.js:37
Fa.next @ www-embed-player.js:38
b @ www-embed-player.js:42
Promise.then
f @ www-embed-player.js:44
(anonymous) @ www-embed-player.js:45
Ga @ www-embed-player.js:44
B @ www-embed-player.js:46
nw @ www-embed-player.js:1642
FE @ www-embed-player.js:2317
(anonymous) @ www-embed-player.js:2331
(anonymous) @ po7doQNkhuU?start=0:10
base.js:8434 XHR finished loading: POST "https://jnn-pa.googleapis.com/$rpc/google.internal.waa.v1.Waa/GenerateIT".
g.p.send @ base.js:8434
vGw @ base.js:975
(anonymous) @ base.js:5344
(anonymous) @ base.js:5344
Wtg @ base.js:5347
(anonymous) @ base.js:1034
vP @ base.js:236
next @ base.js:4444
(anonymous) @ base.js:1025
jiw @ base.js:1024
g.r @ base.js:4321
WMf @ base.js:1034
OXY @ base.js:598
(anonymous) @ base.js:1690
vP @ base.js:236
next @ base.js:4444
G @ base.js:1023
Promise.then
t @ base.js:1024
(anonymous) @ base.js:1025
jiw @ base.js:1024
g.r @ base.js:4321
MG @ base.js:1688
(anonymous) @ base.js:726
E.Yt @ base.js:415
nxC @ base.js:2179
(anonymous) @ base.js:4147
vP @ base.js:236
next @ base.js:4444
G @ base.js:1023
Promise.then
t @ base.js:1024
Promise.then
t @ base.js:1024
Promise.then
t @ base.js:1024
Promise.then
t @ base.js:1024
Promise.then
t @ base.js:1024
(anonymous) @ base.js:1025
jiw @ base.js:1024
g.r @ base.js:4321
qQg @ base.js:4143
S7 @ base.js:401
DQC @ base.js:6948
MFR @ base.js:3391
ni @ base.js:3011
(anonymous) @ base.js:867
Or @ www-embed-player.js:1295
Tr @ www-embed-player.js:1304
p.xf @ www-embed-player.js:1297
requestIdleCallback
p.start @ www-embed-player.js:1305
Tr @ www-embed-player.js:1304
p.ag @ www-embed-player.js:1300
requestAnimationFrame
p.start @ www-embed-player.js:1305
p.Xa @ www-embed-player.js:1288
(anonymous) @ www-embed-player.js:1311
setTimeout
cs @ www-embed-player.js:1311
ns.Xa @ www-embed-player.js:1324
Ir.ra @ www-embed-player.js:1283
p.uc @ www-embed-player.js:1539
pv @ www-embed-player.js:1529
(anonymous) @ www-embed-player.js:1626
Promise.then
hw @ www-embed-player.js:1626
(anonymous) @ www-embed-player.js:1642
Ea @ www-embed-player.js:37
Fa.next @ www-embed-player.js:38
b @ www-embed-player.js:42
Promise.then
f @ www-embed-player.js:44
(anonymous) @ www-embed-player.js:45
Ga @ www-embed-player.js:44
B @ www-embed-player.js:46
nw @ www-embed-player.js:1642
FE @ www-embed-player.js:2317
(anonymous) @ www-embed-player.js:2331
(anonymous) @ po7doQNkhuU?start=0:10
www-embed-player.js:1220 XHR finished loading: POST "https://www.youtube.com/youtubei/v1/log_event?alt=json".
Kq @ www-embed-player.js:1220
Oq @ www-embed-player.js:1225
fw @ www-embed-player.js:1635
p.sendAndWrite @ www-embed-player.js:1538
ew.sendAndWrite @ www-embed-player.js:1630
e @ www-embed-player.js:1646
(anonymous) @ www-embed-player.js:1654
Promise.then
mv @ www-embed-player.js:1654
Wx @ www-embed-player.js:1762
Yx @ www-embed-player.js:1753
(anonymous) @ www-embed-player.js:1751
Fk @ www-embed-player.js:678
Sx @ www-embed-player.js:1751
c @ www-embed-player.js:1754
(anonymous) @ www-embed-player.js:1756
(anonymous) @ www-embed-player.js:1188
setTimeout
Aq @ www-embed-player.js:1209
Ux @ www-embed-player.js:1769
Vx @ www-embed-player.js:1756
Rx @ www-embed-player.js:1748
Lx @ www-embed-player.js:1746
ey @ www-embed-player.js:1777
zs @ www-embed-player.js:1778
QA.tick @ www-embed-player.js:1945
cB @ www-embed-player.js:1967
(anonymous) @ www-embed-player.js:1188
uB @ www-embed-player.js:1992
(anonymous) @ www-embed-player.js:1999
setTimeout
(anonymous) @ www-embed-player.js:1999
requestAnimationFrame
(anonymous) @ www-embed-player.js:1999
(anonymous) @ www-embed-player.js:1188
AB @ www-embed-player.js:1999
GE @ www-embed-player.js:2321
(anonymous) @ www-embed-player.js:2333
(anonymous) @ www-embed-player.js:1188
useUnifiedStorage.ts:1035 🗑️ Clearing all storage...
unifiedStorage.ts:568 🧹 Storage cleanup completed
page.tsx:398 🗑️ All frames cleared
page.tsx:374 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 0, hasUnifiedMethods: true}
useUnifiedStorage.ts:1045 ✅ All storage cleared successfully
