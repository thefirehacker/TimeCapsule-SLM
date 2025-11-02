scheduler.development.js:14 [Violation] 'message' handler took 170ms
scheduler.development.js:14 [Violation] 'message' handler took 161ms
EnhancedLearningGraph.tsx:2092 🎯 Node drop detected - chapter added, triggering delayed unified save
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 448-cwwcryaxtk
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
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:2104
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 449-ktmnkmqudj
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 449-ktmnkmqudj)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 0, chapterCount: 1, nodeCount: 0, edgeCount: 0, frameIds: Array(0), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 449-ktmnkmqudj
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
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:165
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 450-ktmnkmqudj
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 450-ktmnkmqudj)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T16:38:29.458Z'}
EnhancedLearningGraph.tsx:2092 🎯 Node drop detected - concept added, triggering delayed unified save
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 450-ktmnkmqudj
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
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:2104
setTimeout
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:2095
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 451-ktmnkmqudj
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 451-ktmnkmqudj)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:527 🔒 PRIORITY SAVE: Completed with result: {success: true}
FrameGraphIntegration.tsx:831 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762101506810_i2cxdv3w6_0_node_1762101509678_7a6cewtf5_1_1762101512174_qq20n0ch3', originalLength: 90, generatedDocId: 'conn-kdfmtn', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:872 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
react-dom-client.development.js:16378 [Violation] 'mouseup' handler took 182ms
FrameGraphIntegration.tsx:885 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762101506810_i2cxdv3w6_0_node_1762101509678_7a6cewtf5_1_1762101512174_qq20n0ch3', documentId: 'conn-kdfmtn', idLength: 11}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 0, chapterCount: 1, nodeCount: 0, edgeCount: 1, frameIds: Array(0), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 451-ktmnkmqudj
EnhancedLearningGraph.tsx:1829 🎯 Connection created, triggering unified save with fresh state: {edgeId: 'edge_node_1762101506810_i2cxdv3w6_0_node_1762101509678_7a6cewtf5_1_1762101512174_qq20n0ch3', source: 'node_1762101506810_i2cxdv3w6_0', target: 'node_1762101509678_7a6cewtf5_1', totalEdges: 2, isAttachment: false}
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
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:1778
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 452-ktmnkmqudj
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 452-ktmnkmqudj)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T16:38:32.613Z'}
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 0, chapterCount: 1, nodeCount: 2, edgeCount: 2, frameIds: Array(0), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 452-ktmnkmqudj
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
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:165
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 453-ktmnkmqudj
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 453-ktmnkmqudj)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:615 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T16:38:34.848Z'}
react-dom-client.development.js:16378 [Violation] 'click' handler took 204ms
scheduler.development.js:14 [Violation] 'message' handler took 150ms
scheduler.development.js:14 [Violation] 'message' handler took 152ms
scheduler.development.js:14 [Violation] 'message' handler took 189ms
scheduler.development.js:14 [Violation] 'message' handler took 159ms
hot-reloader-client.js:197 [Fast Refresh] rebuilding
scheduler.development.js:14 [Violation] 'message' handler took 150ms
scheduler.development.js:14 [Violation] 'message' handler took 179ms
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
webpack.js?v=1762101493420:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/f7611e5e5e7eae5f.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1762101493420:1367
Promise.then
hotCheck @ webpack.js?v=1762101493420:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
webpack.js?v=1762101493420:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/8a8a6fb650ad7abb.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1762101493420:1367
Promise.then
hotCheck @ webpack.js?v=1762101493420:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleApplyUpdates @ hot-reloader-client.js:123
eval @ hot-reloader-client.js:143
report-hmr-latency.js:14 [Fast Refresh] done in 1161ms
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
useUnifiedStorage.ts:579 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 0, chapterCount: 1, nodeCount: 2, edgeCount: 1, frameIds: Array(0), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 453-ktmnkmqudj
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
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:165
 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-chapters: 454-ktmnkmqudj
 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 454-ktmnkmqudj)
 ✅ Unified save completed successfully
 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T16:38:49.411Z'}
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 151ms
Navigated to http://localhost:3000/ai-frames
 📱 Device Info Collected: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', platform: 'MacIntel', vendor: 'Google Inc.', language: 'en-US', languages: Array(4), …}
 🌍 Location Info Collected: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US'}
 📊 GA4 Environment Variables Debug: {measurementId: 'G-V1B8R98P79', anonymizeIp: false, debugMode: false, siteName: 'TimeCapsule- SLM', siteUrl: 'http://localhost:3000', …}
 -------------- RxDB dev-mode warning -------------------------------
you are seeing this because you use the RxDB dev-mode plugin https://rxdb.info/dev-mode.html?console=dev-mode 
This is great in development mode, because it will run many checks to ensure
that you use RxDB correct. If you see this in production mode,
you did something wrong because the dev-mode plugin will decrease the performance.

🤗 Hint: To get the most out of RxDB, check out the Premium Plugins
to get access to faster storages and more professional features: https://rxdb.info/premium/?console=dev-mode 

You can disable this warning by calling disableWarnings() from the dev-mode plugin.
---------------------------------------------------------------------
overrideMethod @ installHook.js:1
init @ webpack-internal:///…ev-mode/index.js:73
addRxPlugin @ webpack-internal:///…st/esm/plugin.js:75
eval @ webpack-internal:///…e/VectorStore.ts:29
(app-pages-browser)/./src/components/VectorStore/VectorStore.ts @ layout.js:7809
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
fn @ webpack.js?v=1762101535297:369
eval @ webpack-internal:///…toreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7842
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
fn @ webpack.js?v=1762101535297:369
Promise.then
eval @ webpack-internal:///…7D&server=false!:11
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false! @ layout.js:4998
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
__webpack_exec__ @ layout.js:8073
(anonymous) @ layout.js:8074
__webpack_require__.O @ webpack.js?v=1762101535297:84
(anonymous) @ layout.js:8075
webpackJsonpCallback @ webpack.js?v=1762101535297:1388
(anonymous) @ layout.js:9
 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.168289483575514, longitude: 72.84652374710157, …}
 📂 Starting unified load...
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
 🧠 Xenova environment configured for CDN loading
 🔧 DocumentProcessor constructor called (new architecture)
 🧠 Starting immediate background Xenova download...
 🧠 Starting immediate Xenova download in background...
 🔄 Initializing web worker (attempt 1/3)...
 🔧 Initializing DocumentProcessor with immediate download architecture...
 🔧 Initializing text processing worker...
 📚 Creating RxDB database...
 ✅ Loaded from localStorage: 0 frames
 ✅ Loaded from localStorage: 0 frames
 ⚠️ No matching frame found for node node_1762101506810_i2cxdv3w6_0 with frameId: undefined
overrideMethod @ installHook.js:1
useUnifiedStorage.useCallback[loadAll] @ webpack-internal:///…ifiedStorage.ts:865
useUnifiedStorage.useCallback[loadAll] @ webpack-internal:///…ifiedStorage.ts:833
await in useUnifiedStorage.useCallback[loadAll]
useUnifiedStorage.useEffect.initializeData @ webpack-internal:///…fiedStorage.ts:1166
useUnifiedStorage.useEffect @ webpack-internal:///…fiedStorage.ts:1170
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:23055
runWithFiberInDEV @ webpack-internal:///….development.js:845
commitHookEffectListMount @ webpack-internal:///…evelopment.js:11978
commitHookPassiveMountEffects @ webpack-internal:///…evelopment.js:12099
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13929
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13941
flushPassiveEffects @ webpack-internal:///…evelopment.js:15869
eval @ webpack-internal:///…evelopment.js:15505
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<AIFramesPage>
exports.jsx @ webpack-internal:///….development.js:339
ClientPageRoot @ webpack-internal:///…s/client-page.js:20
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10505
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopConcurrentByScheduler @ webpack-internal:///…evelopment.js:15252
renderRootConcurrent @ webpack-internal:///…evelopment.js:15227
performWorkOnRoot @ webpack-internal:///…evelopment.js:14525
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
"use client"
eval @ webpack-internal:///…development.js:2354
initializeModelChunk @ webpack-internal:///…development.js:1054
resolveModelChunk @ webpack-internal:///…development.js:1031
resolveModel @ webpack-internal:///…development.js:1599
processFullStringRow @ webpack-internal:///…development.js:2288
processFullBinaryRow @ webpack-internal:///…development.js:2233
progress @ webpack-internal:///…development.js:2479
"use server"
ResponseInstance @ webpack-internal:///…development.js:1587
createResponseFromOptions @ webpack-internal:///…development.js:2396
exports.createFromReadableStream @ webpack-internal:///…development.js:2717
eval @ webpack-internal:///…nt/app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1762101535297:160
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
fn @ webpack.js?v=1762101535297:369
eval @ webpack-internal:///…/app-next-dev.js:11
eval @ webpack-internal:///…app-bootstrap.js:62
loadScriptsInSequence @ webpack-internal:///…app-bootstrap.js:23
appBootstrap @ webpack-internal:///…app-bootstrap.js:56
eval @ webpack-internal:///…/app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1762101535297:182
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
__webpack_exec__ @ main-app.js?v=1762101535297:2824
(anonymous) @ main-app.js?v=1762101535297:2825
webpackJsonpCallback @ webpack.js?v=1762101535297:1388
(anonymous) @ main-app.js?v=1762101535297:9
 ⚠️ No matching frame found for node node_1762101509678_7a6cewtf5_1 with frameId: undefined
overrideMethod @ installHook.js:1
useUnifiedStorage.useCallback[loadAll] @ webpack-internal:///…ifiedStorage.ts:865
useUnifiedStorage.useCallback[loadAll] @ webpack-internal:///…ifiedStorage.ts:833
await in useUnifiedStorage.useCallback[loadAll]
useUnifiedStorage.useEffect.initializeData @ webpack-internal:///…fiedStorage.ts:1166
useUnifiedStorage.useEffect @ webpack-internal:///…fiedStorage.ts:1170
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:23055
runWithFiberInDEV @ webpack-internal:///….development.js:845
commitHookEffectListMount @ webpack-internal:///…evelopment.js:11978
commitHookPassiveMountEffects @ webpack-internal:///…evelopment.js:12099
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13929
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13941
flushPassiveEffects @ webpack-internal:///…evelopment.js:15869
eval @ webpack-internal:///…evelopment.js:15505
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<AIFramesPage>
exports.jsx @ webpack-internal:///….development.js:339
ClientPageRoot @ webpack-internal:///…s/client-page.js:20
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10505
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopConcurrentByScheduler @ webpack-internal:///…evelopment.js:15252
renderRootConcurrent @ webpack-internal:///…evelopment.js:15227
performWorkOnRoot @ webpack-internal:///…evelopment.js:14525
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
"use client"
eval @ webpack-internal:///…development.js:2354
initializeModelChunk @ webpack-internal:///…development.js:1054
resolveModelChunk @ webpack-internal:///…development.js:1031
resolveModel @ webpack-internal:///…development.js:1599
processFullStringRow @ webpack-internal:///…development.js:2288
processFullBinaryRow @ webpack-internal:///…development.js:2233
progress @ webpack-internal:///…development.js:2479
"use server"
ResponseInstance @ webpack-internal:///…development.js:1587
createResponseFromOptions @ webpack-internal:///…development.js:2396
exports.createFromReadableStream @ webpack-internal:///…development.js:2717
eval @ webpack-internal:///…nt/app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1762101535297:160
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
fn @ webpack.js?v=1762101535297:369
eval @ webpack-internal:///…/app-next-dev.js:11
eval @ webpack-internal:///…app-bootstrap.js:62
loadScriptsInSequence @ webpack-internal:///…app-bootstrap.js:23
appBootstrap @ webpack-internal:///…app-bootstrap.js:56
eval @ webpack-internal:///…/app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1762101535297:182
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
__webpack_exec__ @ main-app.js?v=1762101535297:2824
(anonymous) @ main-app.js?v=1762101535297:2825
webpackJsonpCallback @ webpack.js?v=1762101535297:1388
(anonymous) @ main-app.js?v=1762101535297:9
 ✅ Load completed: 0 frames
 ⚠️ No matching frame found for node node_1762101506810_i2cxdv3w6_0 with frameId: undefined
overrideMethod @ installHook.js:1
useUnifiedStorage.useCallback[loadAll] @ webpack-internal:///…ifiedStorage.ts:865
useUnifiedStorage.useCallback[loadAll] @ webpack-internal:///…ifiedStorage.ts:833
await in useUnifiedStorage.useCallback[loadAll]
AIFramesPage.useEffect.loadInitialData @ webpack-internal:///…frames/page.tsx:220
AIFramesPage.useEffect @ webpack-internal:///…frames/page.tsx:235
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:23055
runWithFiberInDEV @ webpack-internal:///….development.js:845
commitHookEffectListMount @ webpack-internal:///…evelopment.js:11978
commitHookPassiveMountEffects @ webpack-internal:///…evelopment.js:12099
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13929
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13941
flushPassiveEffects @ webpack-internal:///…evelopment.js:15869
eval @ webpack-internal:///…evelopment.js:15505
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<AIFramesPage>
exports.jsx @ webpack-internal:///….development.js:339
ClientPageRoot @ webpack-internal:///…s/client-page.js:20
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10505
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopConcurrentByScheduler @ webpack-internal:///…evelopment.js:15252
renderRootConcurrent @ webpack-internal:///…evelopment.js:15227
performWorkOnRoot @ webpack-internal:///…evelopment.js:14525
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
"use client"
eval @ webpack-internal:///…development.js:2354
initializeModelChunk @ webpack-internal:///…development.js:1054
resolveModelChunk @ webpack-internal:///…development.js:1031
resolveModel @ webpack-internal:///…development.js:1599
processFullStringRow @ webpack-internal:///…development.js:2288
processFullBinaryRow @ webpack-internal:///…development.js:2233
progress @ webpack-internal:///…development.js:2479
"use server"
ResponseInstance @ webpack-internal:///…development.js:1587
createResponseFromOptions @ webpack-internal:///…development.js:2396
exports.createFromReadableStream @ webpack-internal:///…development.js:2717
eval @ webpack-internal:///…nt/app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1762101535297:160
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
fn @ webpack.js?v=1762101535297:369
eval @ webpack-internal:///…/app-next-dev.js:11
eval @ webpack-internal:///…app-bootstrap.js:62
loadScriptsInSequence @ webpack-internal:///…app-bootstrap.js:23
appBootstrap @ webpack-internal:///…app-bootstrap.js:56
eval @ webpack-internal:///…/app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1762101535297:182
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
__webpack_exec__ @ main-app.js?v=1762101535297:2824
(anonymous) @ main-app.js?v=1762101535297:2825
webpackJsonpCallback @ webpack.js?v=1762101535297:1388
(anonymous) @ main-app.js?v=1762101535297:9
 ⚠️ No matching frame found for node node_1762101509678_7a6cewtf5_1 with frameId: undefined
overrideMethod @ installHook.js:1
useUnifiedStorage.useCallback[loadAll] @ webpack-internal:///…ifiedStorage.ts:865
useUnifiedStorage.useCallback[loadAll] @ webpack-internal:///…ifiedStorage.ts:833
await in useUnifiedStorage.useCallback[loadAll]
AIFramesPage.useEffect.loadInitialData @ webpack-internal:///…frames/page.tsx:220
AIFramesPage.useEffect @ webpack-internal:///…frames/page.tsx:235
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:23055
runWithFiberInDEV @ webpack-internal:///….development.js:845
commitHookEffectListMount @ webpack-internal:///…evelopment.js:11978
commitHookPassiveMountEffects @ webpack-internal:///…evelopment.js:12099
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13929
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13941
flushPassiveEffects @ webpack-internal:///…evelopment.js:15869
eval @ webpack-internal:///…evelopment.js:15505
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<AIFramesPage>
exports.jsx @ webpack-internal:///….development.js:339
ClientPageRoot @ webpack-internal:///…s/client-page.js:20
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10505
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopConcurrentByScheduler @ webpack-internal:///…evelopment.js:15252
renderRootConcurrent @ webpack-internal:///…evelopment.js:15227
performWorkOnRoot @ webpack-internal:///…evelopment.js:14525
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
"use client"
eval @ webpack-internal:///…development.js:2354
initializeModelChunk @ webpack-internal:///…development.js:1054
resolveModelChunk @ webpack-internal:///…development.js:1031
resolveModel @ webpack-internal:///…development.js:1599
processFullStringRow @ webpack-internal:///…development.js:2288
processFullBinaryRow @ webpack-internal:///…development.js:2233
progress @ webpack-internal:///…development.js:2479
"use server"
ResponseInstance @ webpack-internal:///…development.js:1587
createResponseFromOptions @ webpack-internal:///…development.js:2396
exports.createFromReadableStream @ webpack-internal:///…development.js:2717
eval @ webpack-internal:///…nt/app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1762101535297:160
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
fn @ webpack.js?v=1762101535297:369
eval @ webpack-internal:///…/app-next-dev.js:11
eval @ webpack-internal:///…app-bootstrap.js:62
loadScriptsInSequence @ webpack-internal:///…app-bootstrap.js:23
appBootstrap @ webpack-internal:///…app-bootstrap.js:56
eval @ webpack-internal:///…/app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1762101535297:182
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
__webpack_exec__ @ main-app.js?v=1762101535297:2824
(anonymous) @ main-app.js?v=1762101535297:2825
webpackJsonpCallback @ webpack.js?v=1762101535297:1388
(anonymous) @ main-app.js?v=1762101535297:9
 ✅ Load completed: 0 frames
 ✅ Unified storage load completed successfully
 ✅ Initial data loading complete
 -------------- RxDB Open Core RxStorage -------------------------------
You are using the free Dexie.js based RxStorage implementation from RxDB https://rxdb.info/rx-storage-dexie.html?console=dexie 
While this is a great option, we want to let you know that there are faster storage solutions available in our premium plugins.
For professional users and production environments, we highly recommend considering these premium options to enhance performance and reliability.
 https://rxdb.info/premium/?console=dexie 
If you already purchased premium access you can disable this log by calling the setPremiumFlag() function from rxdb-premium/plugins/shared.
---------------------------------------------------------------------
overrideMethod @ installHook.js:1
bulkWrite @ webpack-internal:///…nstance-dexie.js:44
await in bulkWrite
instance.bulkWrite @ webpack-internal:///…lugin-helpers.js:90
eval @ webpack-internal:///…orage-helper.js:478
wrapCall @ webpack-internal:///…dist/es/index.js:76
lockedRun @ webpack-internal:///…/rx-database.js:327
bulkWrite @ webpack-internal:///…orage-helper.js:478
ensureStorageTokenDocumentExists @ webpack-internal:///…ternal-store.js:156
RxDatabaseBase @ webpack-internal:///…/rx-database.js:131
eval @ webpack-internal:///…/rx-database.js:548
await in eval
createRxDatabase @ webpack-internal:///…/rx-database.js:564
init @ webpack-internal:///…/VectorStore.ts:276
VectorStoreProvider.useCallback[initializeVectorStore] @ webpack-internal:///…toreProvider.tsx:64
VectorStoreProvider.useEffect @ webpack-internal:///…oreProvider.tsx:121
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:23055
runWithFiberInDEV @ webpack-internal:///….development.js:845
commitHookEffectListMount @ webpack-internal:///…evelopment.js:11978
commitHookPassiveMountEffects @ webpack-internal:///…evelopment.js:12099
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13929
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13941
flushPassiveEffects @ webpack-internal:///…evelopment.js:15869
eval @ webpack-internal:///…evelopment.js:15505
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
"use client"
RootLayout @ rsc://React/Server/w…p/layout.tsx?12:247
eval @ webpack-internal:///…development.js:2355
initializeModelChunk @ webpack-internal:///…development.js:1054
getOutlinedModel @ webpack-internal:///…development.js:1327
parseModelString @ webpack-internal:///…development.js:1540
eval @ webpack-internal:///…development.js:2294
initializeModelChunk @ webpack-internal:///…development.js:1054
resolveModelChunk @ webpack-internal:///…development.js:1031
resolveModel @ webpack-internal:///…development.js:1599
processFullStringRow @ webpack-internal:///…development.js:2288
processFullBinaryRow @ webpack-internal:///…development.js:2233
progress @ webpack-internal:///…development.js:2479
<RootLayout>
buildFakeTask @ webpack-internal:///…development.js:2040
initializeFakeTask @ webpack-internal:///…development.js:2027
resolveDebugInfo @ webpack-internal:///…development.js:2063
processFullStringRow @ webpack-internal:///…development.js:2261
processFullBinaryRow @ webpack-internal:///…development.js:2233
progress @ webpack-internal:///…development.js:2479
"use server"
ResponseInstance @ webpack-internal:///…development.js:1587
createResponseFromOptions @ webpack-internal:///…development.js:2396
exports.createFromReadableStream @ webpack-internal:///…development.js:2717
eval @ webpack-internal:///…nt/app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1762101535297:160
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
fn @ webpack.js?v=1762101535297:369
eval @ webpack-internal:///…/app-next-dev.js:11
eval @ webpack-internal:///…app-bootstrap.js:62
loadScriptsInSequence @ webpack-internal:///…app-bootstrap.js:23
appBootstrap @ webpack-internal:///…app-bootstrap.js:56
eval @ webpack-internal:///…/app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1762101535297:182
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
__webpack_exec__ @ main-app.js?v=1762101535297:2824
(anonymous) @ main-app.js?v=1762101535297:2825
webpackJsonpCallback @ webpack.js?v=1762101535297:1388
(anonymous) @ main-app.js?v=1762101535297:9
 📄 Creating documents collection...
 Image with src "/Media/TimeCapsule_04.png" has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes
overrideMethod @ installHook.js:1
warnOnce @ webpack-internal:///…ils/warn-once.js:16
eval @ webpack-internal:///…age-component.js:89
Promise.then
handleLoading @ webpack-internal:///…age-component.js:36
eval @ webpack-internal:///…ge-component.js:153
applyRef @ webpack-internal:///…se-merged-ref.js:49
eval @ webpack-internal:///…se-merged-ref.js:39
commitAttachRef @ webpack-internal:///…evelopment.js:12246
runWithFiberInDEV @ webpack-internal:///….development.js:845
safelyAttachRef @ webpack-internal:///…evelopment.js:12264
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12805
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12803
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12803
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12803
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12803
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12803
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12803
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12803
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12803
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12692
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12692
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12692
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12803
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12803
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12692
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12692
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12692
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12692
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12687
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12867
recursivelyTraverseLayoutEffects @ webpack-internal:///…evelopment.js:13673
commitLayoutEffectOnFiber @ webpack-internal:///…evelopment.js:12769
flushLayoutEffects @ webpack-internal:///…evelopment.js:15687
commitRoot @ webpack-internal:///…evelopment.js:15528
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<img>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…ge-component.js:166
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateForwardRef @ webpack-internal:///…development.js:8679
beginWork @ webpack-internal:///…evelopment.js:10895
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopConcurrentByScheduler @ webpack-internal:///…evelopment.js:15252
renderRootConcurrent @ webpack-internal:///…evelopment.js:15227
performWorkOnRoot @ webpack-internal:///…evelopment.js:14525
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…ge-component.js:281
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateForwardRef @ webpack-internal:///…development.js:8679
beginWork @ webpack-internal:///…evelopment.js:10895
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopConcurrentByScheduler @ webpack-internal:///…evelopment.js:15252
renderRootConcurrent @ webpack-internal:///…evelopment.js:15227
performWorkOnRoot @ webpack-internal:///…evelopment.js:14525
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef>
exports.jsxDEV @ webpack-internal:///….development.js:346
Navbar @ webpack-internal:///…s/ui/navbar.tsx:112
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopConcurrentByScheduler @ webpack-internal:///…evelopment.js:15252
renderRootConcurrent @ webpack-internal:///…evelopment.js:15227
performWorkOnRoot @ webpack-internal:///…evelopment.js:14525
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<Navbar>
exports.jsxDEV @ webpack-internal:///….development.js:346
AIFramesLayout @ webpack-internal:///…rames/layout.tsx:14
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopConcurrentByScheduler @ webpack-internal:///…evelopment.js:15252
renderRootConcurrent @ webpack-internal:///…evelopment.js:15227
performWorkOnRoot @ webpack-internal:///…evelopment.js:14525
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<AIFramesLayout>
exports.jsx @ webpack-internal:///….development.js:339
ClientSegmentRoot @ webpack-internal:///…lient-segment.js:18
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10505
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopConcurrentByScheduler @ webpack-internal:///…evelopment.js:15252
renderRootConcurrent @ webpack-internal:///…evelopment.js:15227
performWorkOnRoot @ webpack-internal:///…evelopment.js:14525
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
"use client"
eval @ webpack-internal:///…development.js:2354
initializeModelChunk @ webpack-internal:///…development.js:1054
resolveModelChunk @ webpack-internal:///…development.js:1031
resolveModel @ webpack-internal:///…development.js:1599
processFullStringRow @ webpack-internal:///…development.js:2288
processFullBinaryRow @ webpack-internal:///…development.js:2233
progress @ webpack-internal:///…development.js:2479
"use server"
ResponseInstance @ webpack-internal:///…development.js:1587
createResponseFromOptions @ webpack-internal:///…development.js:2396
exports.createFromReadableStream @ webpack-internal:///…development.js:2717
eval @ webpack-internal:///…nt/app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1762101535297:160
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
fn @ webpack.js?v=1762101535297:369
eval @ webpack-internal:///…/app-next-dev.js:11
eval @ webpack-internal:///…app-bootstrap.js:62
loadScriptsInSequence @ webpack-internal:///…app-bootstrap.js:23
appBootstrap @ webpack-internal:///…app-bootstrap.js:56
eval @ webpack-internal:///…/app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1762101535297:182
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
__webpack_exec__ @ main-app.js?v=1762101535297:2824
(anonymous) @ main-app.js?v=1762101535297:2825
webpackJsonpCallback @ webpack.js?v=1762101535297:1388
(anonymous) @ main-app.js?v=1762101535297:9
 🔧 Text processing worker loaded successfully
 🔧 Initializing text processing worker...
 ✅ Text processing worker initialized successfully
 ⏭️ Skipping auto-init for /ai-frames: {isInitialized: false, isInitializing: true, attemptedBefore: true, singletonInitialized: false}
 ✅ Text processing worker ready
 ✅ DocumentProcessor initialization complete (embeddings will load when needed)
 ✅ Web worker initialized successfully
 🧠 Starting Xenova embedding service download...
 🧠 Starting Xenova embedding service initialization...
 ✅ Loading model (checking cache)...
 📦 Loading Xenova/bge-small-en-v1.5 model from Hugging Face CDN...
 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ webpack-internal:///…th/lib/client.js:44
getSession @ webpack-internal:///…t-auth/react.js:123
SessionProvider.useEffect @ webpack-internal:///…t-auth/react.js:289
SessionProvider.useEffect @ webpack-internal:///…t-auth/react.js:317
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:23055
runWithFiberInDEV @ webpack-internal:///….development.js:845
commitHookEffectListMount @ webpack-internal:///…evelopment.js:11978
commitHookPassiveMountEffects @ webpack-internal:///…evelopment.js:12099
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13929
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13941
flushPassiveEffects @ webpack-internal:///…evelopment.js:15869
eval @ webpack-internal:///…evelopment.js:15505
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<SessionProvider>
exports.jsxDEV @ webpack-internal:///….development.js:346
SessionProvider @ webpack-internal:///…sionProvider.tsx:11
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10505
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopConcurrentByScheduler @ webpack-internal:///…evelopment.js:15252
renderRootConcurrent @ webpack-internal:///…evelopment.js:15227
performWorkOnRoot @ webpack-internal:///…evelopment.js:14525
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
"use client"
RootLayout @ rsc://React/Server/w…p/layout.tsx?10:253
eval @ webpack-internal:///…development.js:2355
initializeModelChunk @ webpack-internal:///…development.js:1054
getOutlinedModel @ webpack-internal:///…development.js:1327
parseModelString @ webpack-internal:///…development.js:1540
eval @ webpack-internal:///…development.js:2294
initializeModelChunk @ webpack-internal:///…development.js:1054
resolveModelChunk @ webpack-internal:///…development.js:1031
resolveModel @ webpack-internal:///…development.js:1599
processFullStringRow @ webpack-internal:///…development.js:2288
processFullBinaryRow @ webpack-internal:///…development.js:2233
progress @ webpack-internal:///…development.js:2479
<RootLayout>
buildFakeTask @ webpack-internal:///…development.js:2040
initializeFakeTask @ webpack-internal:///…development.js:2027
resolveDebugInfo @ webpack-internal:///…development.js:2063
processFullStringRow @ webpack-internal:///…development.js:2261
processFullBinaryRow @ webpack-internal:///…development.js:2233
progress @ webpack-internal:///…development.js:2479
"use server"
ResponseInstance @ webpack-internal:///…development.js:1587
createResponseFromOptions @ webpack-internal:///…development.js:2396
exports.createFromReadableStream @ webpack-internal:///…development.js:2717
eval @ webpack-internal:///…nt/app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1762101535297:160
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
fn @ webpack.js?v=1762101535297:369
eval @ webpack-internal:///…/app-next-dev.js:11
eval @ webpack-internal:///…app-bootstrap.js:62
loadScriptsInSequence @ webpack-internal:///…app-bootstrap.js:23
appBootstrap @ webpack-internal:///…app-bootstrap.js:56
eval @ webpack-internal:///…/app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1762101535297:182
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
__webpack_exec__ @ main-app.js?v=1762101535297:2824
(anonymous) @ main-app.js?v=1762101535297:2825
webpackJsonpCallback @ webpack.js?v=1762101535297:1388
(anonymous) @ main-app.js?v=1762101535297:9
 Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.
overrideMethod @ installHook.js:1
DescriptionWarning.useEffect @ webpack-internal:///…/dist/index.mjs:477
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:23055
runWithFiberInDEV @ webpack-internal:///….development.js:845
commitHookEffectListMount @ webpack-internal:///…evelopment.js:11978
commitHookPassiveMountEffects @ webpack-internal:///…evelopment.js:12099
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13929
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13941
flushPassiveEffects @ webpack-internal:///…evelopment.js:15869
flushPendingEffects @ webpack-internal:///…evelopment.js:15830
flushSpawnedWork @ webpack-internal:///…evelopment.js:15796
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<DescriptionWarning>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…/dist/index.mjs:352
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateForwardRef @ webpack-internal:///…development.js:8679
beginWork @ webpack-internal:///…evelopment.js:10895
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…/dist/index.mjs:252
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateForwardRef @ webpack-internal:///…development.js:8679
beginWork @ webpack-internal:///…evelopment.js:10895
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef>
exports.jsx @ webpack-internal:///….development.js:339
DialogContent @ webpack-internal:///…/dist/index.mjs:220
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateForwardRef @ webpack-internal:///…development.js:8679
beginWork @ webpack-internal:///…evelopment.js:10895
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<DialogContent>
exports.jsxDEV @ webpack-internal:///….development.js:346
DialogContent @ webpack-internal:///…ts/ui/dialog.tsx:96
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<DialogContent>
exports.jsxDEV @ webpack-internal:///….development.js:346
VectorStoreInitModal @ webpack-internal:///…reInitModal.tsx:172
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<VectorStoreInitModal>
exports.jsxDEV @ webpack-internal:///….development.js:346
AIFramesPage @ webpack-internal:///…rames/page.tsx:1597
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<AIFramesPage>
exports.jsx @ webpack-internal:///….development.js:339
ClientPageRoot @ webpack-internal:///…s/client-page.js:20
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10505
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopConcurrentByScheduler @ webpack-internal:///…evelopment.js:15252
renderRootConcurrent @ webpack-internal:///…evelopment.js:15227
performWorkOnRoot @ webpack-internal:///…evelopment.js:14525
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
"use client"
eval @ webpack-internal:///…development.js:2354
initializeModelChunk @ webpack-internal:///…development.js:1054
resolveModelChunk @ webpack-internal:///…development.js:1031
resolveModel @ webpack-internal:///…development.js:1599
processFullStringRow @ webpack-internal:///…development.js:2288
processFullBinaryRow @ webpack-internal:///…development.js:2233
progress @ webpack-internal:///…development.js:2479
"use server"
ResponseInstance @ webpack-internal:///…development.js:1587
createResponseFromOptions @ webpack-internal:///…development.js:2396
exports.createFromReadableStream @ webpack-internal:///…development.js:2717
eval @ webpack-internal:///…nt/app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1762101535297:160
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
fn @ webpack.js?v=1762101535297:369
eval @ webpack-internal:///…/app-next-dev.js:11
eval @ webpack-internal:///…app-bootstrap.js:62
loadScriptsInSequence @ webpack-internal:///…app-bootstrap.js:23
appBootstrap @ webpack-internal:///…app-bootstrap.js:56
eval @ webpack-internal:///…/app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1762101535297:182
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
__webpack_exec__ @ main-app.js?v=1762101535297:2824
(anonymous) @ main-app.js?v=1762101535297:2825
webpackJsonpCallback @ webpack.js?v=1762101535297:1388
(anonymous) @ main-app.js?v=1762101535297:9
 Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.
overrideMethod @ installHook.js:1
DescriptionWarning.useEffect @ webpack-internal:///…/dist/index.mjs:477
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:23055
runWithFiberInDEV @ webpack-internal:///….development.js:845
commitHookEffectListMount @ webpack-internal:///…evelopment.js:11978
commitHookPassiveMountEffects @ webpack-internal:///…evelopment.js:12099
reconnectPassiveEffects @ webpack-internal:///…evelopment.js:14097
recursivelyTraverseReconnectPassiveEffects @ webpack-internal:///…evelopment.js:14068
reconnectPassiveEffects @ webpack-internal:///…evelopment.js:14144
recursivelyTraverseReconnectPassiveEffects @ webpack-internal:///…evelopment.js:14068
reconnectPassiveEffects @ webpack-internal:///…evelopment.js:14090
recursivelyTraverseReconnectPassiveEffects @ webpack-internal:///…evelopment.js:14068
reconnectPassiveEffects @ webpack-internal:///…evelopment.js:14090
recursivelyTraverseReconnectPassiveEffects @ webpack-internal:///…evelopment.js:14068
reconnectPassiveEffects @ webpack-internal:///…evelopment.js:14090
recursivelyTraverseReconnectPassiveEffects @ webpack-internal:///…evelopment.js:14068
reconnectPassiveEffects @ webpack-internal:///…evelopment.js:14090
recursivelyTraverseReconnectPassiveEffects @ webpack-internal:///…evelopment.js:14068
reconnectPassiveEffects @ webpack-internal:///…evelopment.js:14090
recursivelyTraverseReconnectPassiveEffects @ webpack-internal:///…evelopment.js:14068
reconnectPassiveEffects @ webpack-internal:///…evelopment.js:14090
recursivelyTraverseReconnectPassiveEffects @ webpack-internal:///…evelopment.js:14068
reconnectPassiveEffects @ webpack-internal:///…evelopment.js:14090
recursivelyTraverseReconnectPassiveEffects @ webpack-internal:///…evelopment.js:14068
reconnectPassiveEffects @ webpack-internal:///…evelopment.js:14144
doubleInvokeEffectsOnFiber @ webpack-internal:///…evelopment.js:16100
runWithFiberInDEV @ webpack-internal:///….development.js:848
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16060
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16067
commitDoubleInvokeEffectsInDEV @ webpack-internal:///…evelopment.js:16109
flushPassiveEffects @ webpack-internal:///…evelopment.js:15879
flushPendingEffects @ webpack-internal:///…evelopment.js:15830
flushSpawnedWork @ webpack-internal:///…evelopment.js:15796
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<DescriptionWarning>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…/dist/index.mjs:352
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateForwardRef @ webpack-internal:///…development.js:8679
beginWork @ webpack-internal:///…evelopment.js:10895
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…/dist/index.mjs:252
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateForwardRef @ webpack-internal:///…development.js:8679
beginWork @ webpack-internal:///…evelopment.js:10895
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef>
exports.jsx @ webpack-internal:///….development.js:339
DialogContent @ webpack-internal:///…/dist/index.mjs:220
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateForwardRef @ webpack-internal:///…development.js:8679
beginWork @ webpack-internal:///…evelopment.js:10895
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<DialogContent>
exports.jsxDEV @ webpack-internal:///….development.js:346
DialogContent @ webpack-internal:///…ts/ui/dialog.tsx:96
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<DialogContent>
exports.jsxDEV @ webpack-internal:///….development.js:346
VectorStoreInitModal @ webpack-internal:///…reInitModal.tsx:172
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<VectorStoreInitModal>
exports.jsxDEV @ webpack-internal:///….development.js:346
AIFramesPage @ webpack-internal:///…rames/page.tsx:1597
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<AIFramesPage>
exports.jsx @ webpack-internal:///….development.js:339
ClientPageRoot @ webpack-internal:///…s/client-page.js:20
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10505
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopConcurrentByScheduler @ webpack-internal:///…evelopment.js:15252
renderRootConcurrent @ webpack-internal:///…evelopment.js:15227
performWorkOnRoot @ webpack-internal:///…evelopment.js:14525
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
"use client"
eval @ webpack-internal:///…development.js:2354
initializeModelChunk @ webpack-internal:///…development.js:1054
resolveModelChunk @ webpack-internal:///…development.js:1031
resolveModel @ webpack-internal:///…development.js:1599
processFullStringRow @ webpack-internal:///…development.js:2288
processFullBinaryRow @ webpack-internal:///…development.js:2233
progress @ webpack-internal:///…development.js:2479
"use server"
ResponseInstance @ webpack-internal:///…development.js:1587
createResponseFromOptions @ webpack-internal:///…development.js:2396
exports.createFromReadableStream @ webpack-internal:///…development.js:2717
eval @ webpack-internal:///…nt/app-index.js:132
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1762101535297:160
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
fn @ webpack.js?v=1762101535297:369
eval @ webpack-internal:///…/app-next-dev.js:11
eval @ webpack-internal:///…app-bootstrap.js:62
loadScriptsInSequence @ webpack-internal:///…app-bootstrap.js:23
appBootstrap @ webpack-internal:///…app-bootstrap.js:56
eval @ webpack-internal:///…/app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1762101535297:182
options.factory @ webpack.js?v=1762101535297:712
__webpack_require__ @ webpack.js?v=1762101535297:37
__webpack_exec__ @ main-app.js?v=1762101535297:2824
(anonymous) @ main-app.js?v=1762101535297:2825
webpackJsonpCallback @ webpack.js?v=1762101535297:1388
(anonymous) @ main-app.js?v=1762101535297:9
 ⏳ Analytics: Skipping page tracking - no consent or not initialized
 ✅ RxDB Vector Store initialized successfully
 🧠 Xenova download running in background...
 ✅ VectorStoreProvider: Singleton VectorStore initialized successfully
 🗂️ Initializing GraphStorageManager with VectorStore backend...
 ✅ GraphStorageManager initialized successfully
 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 0, hasUnifiedMethods: true}
 ⏭️ Skipping auto-init for /ai-frames: {isInitialized: true, isInitializing: false, attemptedBefore: true, singletonInitialized: true}
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 244ms
 📋 Syncing metadata with vector store...
 🔄 Starting enhanced metadata sync to Knowledge Base... {bubblSpacesCount: 1, timeCapslesCount: 1, vectorStoreStatus: {…}}
 📝 Syncing BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1761329323527kw)
 🗑️ Deleting document: bubblspace-bubbl-1761329323527kw (attempt 1/5)
 ✅ Managers initialized successfully
 Unable to determine content-length from response headers. Will expand buffer when needed.
overrideMethod @ installHook.js:1
readResponse @ webpack-internal:///…rc/utils/hub.js:607
getModelFile @ webpack-internal:///…rc/utils/hub.js:536
 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 0, chapterCount: 1, nodeCount: 2, edgeCount: 1, frameIds: Array(0), …}
 💾 Starting unified save...
 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ webpack-internal:///…th/lib/client.js:44
getSession @ webpack-internal:///…t-auth/react.js:123
SessionProvider.useEffect @ webpack-internal:///…t-auth/react.js:289
SessionProvider.useEffect.handle @ webpack-internal:///…t-auth/react.js:332
 ⚠️ IndexedDB save failed: 
overrideMethod @ installHook.js:1
saveToIndexedDB @ webpack-internal:///…ifiedStorage.ts:382
await in saveToIndexedDB
saveAll @ webpack-internal:///…nifiedStorage.ts:38
useUnifiedStorage.useCallback[queueBackgroundSave] @ webpack-internal:///…ifiedStorage.ts:668
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleForceSaveEvent @ webpack-internal:///…fiedStorage.ts:1362
EnhancedLearningGraph.useEffect @ webpack-internal:///…arningGraph.tsx:749
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:23055
runWithFiberInDEV @ webpack-internal:///….development.js:845
commitHookEffectListMount @ webpack-internal:///…evelopment.js:11978
commitHookPassiveMountEffects @ webpack-internal:///…evelopment.js:12099
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13929
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13932
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13922
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:14048
recursivelyTraversePassiveMountEffects @ webpack-internal:///…evelopment.js:13902
commitPassiveMountOnFiber @ webpack-internal:///…evelopment.js:13941
flushPassiveEffects @ webpack-internal:///…evelopment.js:15869
flushPendingEffects @ webpack-internal:///…evelopment.js:15830
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16362
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
 📋 Retrieved latest revision for bubblspace-bubbl-1761329323527kw: 143-ktmnkmqudj
 📋 Document bubblspace-bubbl-1761329323527kw found with revision: 143-ktmnkmqudj
 📋 Retrieved latest revision for aiframe-chapters: 454-ktmnkmqudj
 ✅ Document deleted successfully: bubblspace-bubbl-1761329323527kw
 🗑️ Deleted old BubblSpace document: bubblspace-bubbl-1761329323527kw
 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-chapters: 455-ruadykudln
 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 455-ruadykudln)
 ✅ Unified save completed successfully
 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T16:38:57.544Z'}
 ✅ Model loaded from cache instantly
 📊 Xenova progress: Embedding model ready (100%)
 ✅ EmbeddingService initialized successfully
 ✅ Xenova embedding service ready
 ✅ Immediate background download completed
 ✅ Xenova model loaded from cache - all features ready
 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
 🔄 Bypassing duplicate detection for metadata update: BubblSpace: My BubblSpace
 ✅ Document inserted: bubblspace-bubbl-1761329323527kw
 🔍 Verifying document persistence: bubblspace-bubbl-1761329323527kw (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for bubblspace-bubbl-1761329323527kw: 145-ruadykudln
 ✅ Document persistence verified: BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1761329323527kw, Rev: 145-ruadykudln)
 ✅ BubblSpace synced to Knowledge Base: My BubblSpace
 ✅ BubblSpace persistence verified: My BubblSpace
 📝 Syncing TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-176132932352815)
 🗑️ Deleting document: timecapsule-TC-176132932352815 (attempt 1/5)
 📋 Retrieved latest revision for timecapsule-TC-176132932352815: 143-ktmnkmqudj
 📋 Document timecapsule-TC-176132932352815 found with revision: 143-ktmnkmqudj
 ✅ Document deleted successfully: timecapsule-TC-176132932352815
 🗑️ Deleted old TimeCapsule document: timecapsule-TC-176132932352815
 🔄 Bypassing duplicate detection for metadata update: TimeCapsule: Untitled TimeCapsule
 📋 Found 0 existing TimeCapsule documents for timeCapsuleId: TC-176132932352815
 📋 TimeCapsule document operation: {id: 'timecapsule-TC-176132932352815', title: 'TimeCapsule: Untitled TimeCapsule', source: 'metadata', timeCapsuleId: 'TC-176132932352815', name: 'Untitled TimeCapsule', …}
 ✅ Document inserted: timecapsule-TC-176132932352815
 🔍 Verifying document persistence: timecapsule-TC-176132932352815 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for timecapsule-TC-176132932352815: 145-ruadykudln
 ✅ Document persistence verified: TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-176132932352815, Rev: 145-ruadykudln)
 ✅ TimeCapsule synced to Knowledge Base: Untitled TimeCapsule
 ✅ TimeCapsule persistence verified: Untitled TimeCapsule
 ✅ All metadata synced to Knowledge Base successfully {syncedBubblSpaces: 1, syncedTimeCapsules: 1, totalItems: 2}
 ✅ Metadata synced with vector store
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 167ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 150ms
 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 0, chapterCount: 1, nodeCount: 2, edgeCount: 1, frameIds: Array(0), …}
 💾 Starting unified save...
 📋 Retrieved latest revision for aiframe-chapters: 455-ruadykudln
 ⚠️ IndexedDB save failed: 
overrideMethod @ installHook.js:1
saveToIndexedDB @ webpack-internal:///…ifiedStorage.ts:382
await in saveToIndexedDB
saveAll @ webpack-internal:///…nifiedStorage.ts:38
useUnifiedStorage.useCallback[queueBackgroundSave] @ webpack-internal:///…ifiedStorage.ts:668
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ webpack-internal:///…fiedStorage.ts:1291
EnhancedLearningGraph.useCallback[handleNodesChange] @ webpack-internal:///…arningGraph.tsx:143
setTimeout
EnhancedLearningGraph.useCallback[handleNodesChange] @ webpack-internal:///…arningGraph.tsx:140
triggerNodeChanges @ webpack-internal:///…t/esm/index.js:5054
updateNodePositions @ webpack-internal:///…t/esm/index.js:5042
eval @ webpack-internal:///…t/esm/index.js:2246
call @ webpack-internal:///…/src/dispatch.js:61
gesture @ webpack-internal:///…rag/src/drag.js:159
mouseupped @ webpack-internal:///…drag/src/drag.js:89
eval @ webpack-internal:///…c/selection/on.js:7
 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-chapters: 456-ruadykudln
 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 456-ruadykudln)
 ✅ Unified save completed successfully
 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-02T16:39:02.712Z'}
