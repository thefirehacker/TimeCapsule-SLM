unifiedStorage.ts:130 📂 Starting unified load...
page.tsx:344 🔄 Loading initial data with unified storage...
unifiedStorage.ts:130 📂 Starting unified load...
page.tsx:440 🔧 AI-Frames unified storage interface updated: {hasVectorStore: false, vectorStoreInitialized: false, frameCount: 0, hasUnifiedMethods: true}
VectorStoreProvider.tsx:143 🚀 Auto-initializing VectorStore for route: /ai-frames
VectorStoreProvider.tsx:79 🚀 VectorStoreProvider: Creating new singleton VectorStore...
RAGTracker.ts:26 🔍 RAG Tracker initialized with config: {enableTracking: true, enableVisualization: true, enablePerformanceMetrics: true, enableQualityMetrics: false, maxQueryHistory: 1000, …}
VectorStore.ts:199 🗂️ VectorStore constructor called
VectorStore.ts:200 🔍 RAG Tracker initialized for VectorStore
VectorStore.ts:261 🗂️ Initializing RxDB Vector Store...
VectorStore.ts:264 🤖 Loading document processor and starting immediate Xenova download...
EmbeddingService.ts:35 🧠 Xenova environment configured for CDN loading
DocumentProcessor.ts:61 🔧 DocumentProcessor constructor called (new architecture)
VectorStore.ts:268 🧠 Starting immediate background Xenova download...
VectorStore.ts:2119 🧠 Starting immediate Xenova download in background...
VectorStore.ts:2136 🔄 Initializing web worker (attempt 1/3)...
DocumentProcessor.ts:72 🔧 Initializing DocumentProcessor with immediate download architecture...
DocumentProcessor.ts:95 🔧 Initializing text processing worker...
VectorStore.ts:313 📚 Creating RxDB database...
unifiedStorage.ts:130 📂 Starting unified load...
page.tsx:344 🔄 Loading initial data with unified storage...
unifiedStorage.ts:130 📂 Starting unified load...
VectorStoreProvider.tsx:146 ⏭️ Skipping auto-init for /ai-frames: {isInitialized: false, isInitializing: true, attemptedBefore: true, singletonInitialized: false}
VectorStore.ts:320 -------------- RxDB Open Core RxStorage -------------------------------
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
init @ VectorStore.ts:320
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
flushPendingEffects @ react-dom-client.development.js:15830
performSyncWorkOnRoot @ react-dom-client.development.js:16362
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
onUnsuspend @ react-dom-client.development.js:20546
VectorStore.ts:327 📄 Creating documents collection...
Analytics.tsx:39 ⏳ Analytics: Skipping page tracking - no consent or not initialized
embeddingWorker.js:487 🔧 Text processing worker loaded successfully
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
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<VectorStoreInitModal>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
AIFramesPage @ page.tsx:1701
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
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<VectorStoreInitModal>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
AIFramesPage @ page.tsx:1701
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
embeddingWorker.js:59 🔧 Initializing text processing worker...
embeddingWorker.js:73 ✅ Text processing worker initialized successfully
DocumentProcessor.ts:116 ✅ Text processing worker ready
DocumentProcessor.ts:125 ✅ DocumentProcessor initialization complete (embeddings will load when needed)
VectorStore.ts:2138 ✅ Web worker initialized successfully
VectorStore.ts:2156 🧠 Starting Xenova embedding service download...
EmbeddingService.ts:69 🧠 Starting Xenova embedding service initialization...
EmbeddingService.ts:77 ✅ Loading model (checking cache)...
EmbeddingService.ts:84 📦 Loading Xenova/bge-small-en-v1.5 model from Hugging Face CDN...
unifiedStorage.ts:158 📭 No data found in any storage
useUnifiedStorage.ts:896 📭 No data found during load
unifiedStorage.ts:158 📭 No data found in any storage
useUnifiedStorage.ts:896 📭 No data found during load
page.tsx:352 📭 No data found in unified storage
page.tsx:355 ✅ Initial data loading complete
unifiedStorage.ts:158 📭 No data found in any storage
useUnifiedStorage.ts:896 📭 No data found during load
unifiedStorage.ts:158 📭 No data found in any storage
useUnifiedStorage.ts:896 📭 No data found during load
page.tsx:352 📭 No data found in unified storage
page.tsx:355 ✅ Initial data loading complete
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
initializeXenovaService @ VectorStore.ts:2164
startImmediateBackgroundDownload @ VectorStore.ts:2125
await in startImmediateBackgroundDownload
init @ VectorStore.ts:277
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
flushPendingEffects @ react-dom-client.development.js:15830
performSyncWorkOnRoot @ react-dom-client.development.js:16362
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
onUnsuspend @ react-dom-client.development.js:20546
VectorStore.ts:493 ✅ RxDB Vector Store initialized successfully
VectorStore.ts:494 🧠 Xenova download running in background...
VectorStoreProvider.tsx:85 ✅ VectorStoreProvider: Singleton VectorStore initialized successfully
GraphStorageManager.ts:84 🗂️ Initializing GraphStorageManager with VectorStore backend...
GraphStorageManager.ts:86 ✅ GraphStorageManager initialized successfully
page.tsx:440 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 0, hasUnifiedMethods: true}
VectorStoreProvider.tsx:146 ⏭️ Skipping auto-init for /ai-frames: {isInitialized: true, isInitializing: false, attemptedBefore: true, singletonInitialized: true}
MetadataManager.ts:1022 📋 Syncing metadata with vector store...
MetadataManager.ts:611 🔄 Starting enhanced metadata sync to Knowledge Base... {bubblSpacesCount: 1, timeCapslesCount: 1, vectorStoreStatus: {…}}
MetadataManager.ts:628 📝 Syncing BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1762166245688iq)
VectorStore.ts:1008 🗑️ Deleting document: bubblspace-bubbl-1762166245688iq (attempt 1/5)
page.tsx:238 ✅ Managers initialized successfully
VectorStore.ts:1672 📋 Retrieved latest revision for bubblspace-bubbl-1762166245688iq: 639-nlkbpzzcxl
VectorStore.ts:1016 📋 Document bubblspace-bubbl-1762166245688iq found with revision: 639-nlkbpzzcxl
useDocuments.ts:73 📊 Document status updated: {documents: 30, totalSize: '4.1 MB', totalChunks: 3, totalVectors: 3, avgChunksPerDoc: '0.1', …}
VectorStore.ts:1020 ✅ Document deleted successfully: bubblspace-bubbl-1762166245688iq
MetadataManager.ts:634 🗑️ Deleted old BubblSpace document: bubblspace-bubbl-1762166245688iq
EmbeddingService.ts:129 ✅ Model loaded successfully
EmbeddingService.ts:147 ✅ Model loaded from cache instantly
VectorStore.ts:2170 📊 Xenova progress: Embedding model ready (100%)
EmbeddingService.ts:156 ✅ EmbeddingService initialized successfully
VectorStore.ts:2176 ✅ Xenova embedding service ready
VectorStore.ts:2127 ✅ Immediate background download completed
VectorStore.ts:286 ✅ Xenova model loaded from cache - all features ready
VectorStore.ts:295 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
VectorStore.ts:1877 🔄 Bypassing duplicate detection for metadata update: BubblSpace: My BubblSpace
VectorStore.ts:1814 ✅ Document inserted: bubblspace-bubbl-1762166245688iq
VectorStore.ts:2262 🔍 Verifying document persistence: bubblspace-bubbl-1762166245688iq (attempt 1/3)
VectorStore.ts:2307 💾 Database flush completed
VectorStore.ts:1672 📋 Retrieved latest revision for bubblspace-bubbl-1762166245688iq: 641-lochaysyer
VectorStore.ts:2275 ✅ Document persistence verified: BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1762166245688iq, Rev: 641-lochaysyer)
MetadataManager.ts:681 ✅ BubblSpace synced to Knowledge Base: My BubblSpace
MetadataManager.ts:686 ✅ BubblSpace persistence verified: My BubblSpace
MetadataManager.ts:715 📝 Syncing TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-1762166245689mq)
VectorStore.ts:1008 🗑️ Deleting document: timecapsule-TC-1762166245689mq (attempt 1/5)
VectorStore.ts:1672 📋 Retrieved latest revision for timecapsule-TC-1762166245689mq: 635-nlkbpzzcxl
VectorStore.ts:1016 📋 Document timecapsule-TC-1762166245689mq found with revision: 635-nlkbpzzcxl
VectorStore.ts:1020 ✅ Document deleted successfully: timecapsule-TC-1762166245689mq
MetadataManager.ts:721 🗑️ Deleted old TimeCapsule document: timecapsule-TC-1762166245689mq
scheduler.development.js:14 [Violation] 'message' handler took 172ms
VectorStore.ts:1877 🔄 Bypassing duplicate detection for metadata update: TimeCapsule: Untitled TimeCapsule
VectorStore.ts:1884 📋 Found 0 existing TimeCapsule documents for timeCapsuleId: TC-1762166245689mq
VectorStore.ts:1701 📋 TimeCapsule document operation: {id: 'timecapsule-TC-1762166245689mq', title: 'TimeCapsule: Untitled TimeCapsule', source: 'metadata', timeCapsuleId: 'TC-1762166245689mq', name: 'Untitled TimeCapsule', …}
VectorStore.ts:1814 ✅ Document inserted: timecapsule-TC-1762166245689mq
VectorStore.ts:2262 🔍 Verifying document persistence: timecapsule-TC-1762166245689mq (attempt 1/3)
VectorStore.ts:2307 💾 Database flush completed
VectorStore.ts:1672 📋 Retrieved latest revision for timecapsule-TC-1762166245689mq: 637-lochaysyer
VectorStore.ts:2275 ✅ Document persistence verified: TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-1762166245689mq, Rev: 637-lochaysyer)
MetadataManager.ts:772 ✅ TimeCapsule synced to Knowledge Base: Untitled TimeCapsule
MetadataManager.ts:777 ✅ TimeCapsule persistence verified: Untitled TimeCapsule
MetadataManager.ts:806 ✅ All metadata synced to Knowledge Base successfully {syncedBubblSpaces: 1, syncedTimeCapsules: 1, totalItems: 2}
MetadataManager.ts:1027 ✅ Metadata synced with vector store
scheduler.development.js:14 [Violation] 'message' handler took 190ms
scheduler.development.js:14 [Violation] 'message' handler took 197ms
page.tsx:440 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
react-dom-client.development.js:16378 [Violation] 'drop' handler took 331ms
FrameGraphIntegration.tsx:1054 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
FrameGraphIntegration.tsx:1066 ✅ Session document inserted successfully: {sessionId: 'session_1762450976193', documentId: 'sess-1762450976193-s3mss8'}
useUnifiedStorage.ts:1413 ⏸️ Skipping delayed save - background save already in progress
useUnifiedStorage.ts:617 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 0, edgeCount: 0, frameIds: Array(1), …}
unifiedStorage.ts:73 💾 Starting unified save... {skipVectorStore: false}
scheduler.development.js:14 [Violation] 'message' handler took 262ms
unifiedStorage.ts:547 ✅ IndexedDB save completed
VectorStore.ts:1612 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (inserted)
VectorStore.ts:2307 💾 Database flush completed
VectorStore.ts:2262 🔍 Verifying document persistence: aiframe-frame-1762450975776-hqljiz7cp (attempt 1/3)
VectorStore.ts:2307 💾 Database flush completed
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-frame-1762450975776-hqljiz7cp: 1-lochaysyer
VectorStore.ts:2275 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762450975776-hqljiz7cp, Rev: 1-lochaysyer)
FrameGraphIntegration.tsx:711 ✅ Frame synced to Knowledge Base successfully: {frameId: 'frame-1762450975776-hqljiz7cp', frameTitle: 'Frame 1', documentId: 'aiframe-frame-1762450975776-hqljiz7cp', source: 'FrameGraphIntegration'}
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-chapters: 1132-nlkbpzzcxl
VectorStore.ts:1608 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2262 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2307 💾 Database flush completed
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-chapters: 1133-lochaysyer
VectorStore.ts:2275 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 1133-lochaysyer)
unifiedStorage.ts:103 ✅ Unified save completed successfully
useUnifiedStorage.ts:655 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-06T17:42:56.666Z'}
page.tsx:440 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 2, hasUnifiedMethods: true}
react-dom-client.development.js:16378 [Violation] 'drop' handler took 308ms
scheduler.development.js:14 [Violation] 'message' handler took 163ms
useUnifiedStorage.ts:617 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 0, frameIds: Array(2), …}
unifiedStorage.ts:73 💾 Starting unified save... {skipVectorStore: false}
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-frame-1762450975776-hqljiz7cp: 1-lochaysyer
unifiedStorage.ts:547 ✅ IndexedDB save completed
VectorStore.ts:1608 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2262 🔍 Verifying document persistence: aiframe-frame-1762450975776-hqljiz7cp (attempt 1/3)
VectorStore.ts:2307 💾 Database flush completed
VectorStore.ts:1612 📊 Synced frame AI-Frame [2]: Frame 2 to Knowledge Base (inserted)
VectorStore.ts:2307 💾 Database flush completed
VectorStore.ts:2262 🔍 Verifying document persistence: aiframe-frame-1762450978173-kt4srg9py (attempt 1/3)
VectorStore.ts:2307 💾 Database flush completed
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-frame-1762450975776-hqljiz7cp: 2-lochaysyer
VectorStore.ts:2275 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762450975776-hqljiz7cp, Rev: 2-lochaysyer)
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-frame-1762450978173-kt4srg9py: 1-lochaysyer
VectorStore.ts:2275 ✅ Document persistence verified: AI-Frame [2]: Frame 2 (ID: aiframe-frame-1762450978173-kt4srg9py, Rev: 1-lochaysyer)
FrameGraphIntegration.tsx:711 ✅ Frame synced to Knowledge Base successfully: {frameId: 'frame-1762450978173-kt4srg9py', frameTitle: 'Frame 2', documentId: 'aiframe-frame-1762450978173-kt4srg9py', source: 'FrameGraphIntegration'}
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-chapters: 1133-lochaysyer
VectorStore.ts:1608 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2262 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2307 💾 Database flush completed
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-chapters: 1134-lochaysyer
VectorStore.ts:2275 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 1134-lochaysyer)
unifiedStorage.ts:103 ✅ Unified save completed successfully
useUnifiedStorage.ts:655 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-06T17:42:58.815Z'}
scheduler.development.js:14 [Violation] 'message' handler took 181ms
scheduler.development.js:14 [Violation] 'message' handler took 187ms
scheduler.development.js:14 [Violation] 'message' handler took 170ms
FrameGraphIntegration.tsx:1112 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762450975776_7aqx3exmu_0_node_1762450978173_0ivdyb0b2_1_1762450982103_ukil8q5ne', originalLength: 90, generatedDocId: 'conn-hhydvz', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:1153 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
react-dom-client.development.js:16378 [Violation] 'mouseup' handler took 225ms
FrameGraphIntegration.tsx:1166 ✅ Connection inserted successfully: {connectionId: 'edge_node_1762450975776_7aqx3exmu_0_node_1762450978173_0ivdyb0b2_1_1762450982103_ukil8q5ne', documentId: 'conn-hhydvz', idLength: 11}
useUnifiedStorage.ts:617 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 1, frameIds: Array(2), …}
unifiedStorage.ts:73 💾 Starting unified save... {skipVectorStore: true}
unifiedStorage.ts:547 ✅ IndexedDB save completed
unifiedStorage.ts:103 ✅ Unified save completed successfully
useUnifiedStorage.ts:655 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-06T17:43:02.402Z'}
scheduler.development.js:14 [Violation] 'message' handler took 193ms
scheduler.development.js:14 [Violation] 'message' handler took 191ms
useUnifiedStorage.ts:617 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 2, frameIds: Array(2), …}
unifiedStorage.ts:73 💾 Starting unified save... {skipVectorStore: true}
unifiedStorage.ts:547 ✅ IndexedDB save completed
unifiedStorage.ts:103 ✅ Unified save completed successfully
useUnifiedStorage.ts:655 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-06T17:43:04.322Z'}
page.tsx:1649 🔍 CRITICAL: Frame index change called: {oldIndex: 0, newIndex: 1, frameCount: 2, stackTrace: '    at onFrameIndexChange (webpack-internal:///(ap…es-browser)/./src/app/ai-frames/page.tsx:1906:67)'}
page.tsx:1649 🔍 CRITICAL: Frame index change called: {oldIndex: 0, newIndex: 1, frameCount: 2, stackTrace: '    at onFrameIndexChange (webpack-internal:///(ap…es-browser)/./src/app/ai-frames/page.tsx:1906:67)'}
page.tsx:1649 🔍 CRITICAL: Frame index change called: {oldIndex: 0, newIndex: 1, frameCount: 2, stackTrace: '    at onFrameIndexChange (webpack-internal:///(ap…es-browser)/./src/app/ai-frames/page.tsx:1906:67)'}
scheduler.development.js:14 [Violation] 'message' handler took 152ms
page.tsx:1649 🔍 CRITICAL: Frame index change called: {oldIndex: 0, newIndex: 1, frameCount: 2, stackTrace: '    at onFrameIndexChange (webpack-internal:///(ap…es-browser)/./src/app/ai-frames/page.tsx:1906:67)'}
scheduler.development.js:14 [Violation] 'message' handler took 162ms
scheduler.development.js:14 [Violation] 'message' handler took 156ms
FrameGraphIntegration.tsx:1112 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1762450975776_7aqx3exmu_0_node_1762450978173_0ivdyb0b2_1_1762450982103_ukil8q5ne', originalLength: 90, generatedDocId: 'conn-hhydvz', generatedLength: 11, schemaCompliant: true}
VectorStore.ts:1008 🗑️ Deleting document: conn-hhydvz (attempt 1/5)
useUnifiedStorage.ts:1459 🗑️ Frame deletion event detected: {frameId: 'frame-1762450978173-kt4srg9py', deletedFrameIds: Array(1)}
VectorStore.ts:1008 🗑️ Deleting document: aiframe-frame-1762450978173-kt4srg9py (attempt 1/5)
page.tsx:1649 🔍 CRITICAL: Frame index change called: {oldIndex: 1, newIndex: 0, frameCount: 1, stackTrace: '    at onFrameIndexChange (webpack-internal:///(ap…es-browser)/./src/app/ai-frames/page.tsx:1906:67)'}
page.tsx:440 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
useUnifiedStorage.ts:1459 🗑️ Frame deletion event detected: {frameId: 'frame-1762450978173-kt4srg9py', deletedFrameIds: Array(1)}
react-dom-client.development.js:16378 [Violation] 'keydown' handler took 384ms
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-frame-1762450978173-kt4srg9py: 1-lochaysyer
VectorStore.ts:1016 📋 Document aiframe-frame-1762450978173-kt4srg9py found with revision: 1-lochaysyer
useUnifiedStorage.ts:617 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(1), …}
unifiedStorage.ts:73 💾 Starting unified save... {skipVectorStore: true}
VectorStore.ts:1024 ⚠️ Document not found: conn-hhydvz
overrideMethod @ hook.js:608
performDocumentDeletion @ VectorStore.ts:1024
FrameGraphIntegration.tsx:1179 🗑️ Connection document deleted: {connectionId: 'edge_node_1762450975776_7aqx3exmu_0_node_1762450978173_0ivdyb0b2_1_1762450982103_ukil8q5ne', documentId: 'conn-hhydvz', retriesRemaining: 2}
scheduler.development.js:14 [Violation] 'message' handler took 233ms
scheduler.development.js:14 [Violation] 'message' handler took 214ms
unifiedStorage.ts:547 ✅ IndexedDB save completed
unifiedStorage.ts:103 ✅ Unified save completed successfully
useUnifiedStorage.ts:655 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-06T17:43:08.402Z'}
VectorStore.ts:1020 ✅ Document deleted successfully: aiframe-frame-1762450978173-kt4srg9py
useUnifiedStorage.ts:617 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 0, edgeCount: 0, frameIds: Array(1), …}
unifiedStorage.ts:73 💾 Starting unified save... {skipVectorStore: false}
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-frame-1762450975776-hqljiz7cp: 2-lochaysyer
unifiedStorage.ts:547 ✅ IndexedDB save completed
VectorStore.ts:1608 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2262 🔍 Verifying document persistence: aiframe-frame-1762450975776-hqljiz7cp (attempt 1/3)
VectorStore.ts:2307 💾 Database flush completed
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-frame-1762450975776-hqljiz7cp: 3-lochaysyer
VectorStore.ts:2275 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1762450975776-hqljiz7cp, Rev: 3-lochaysyer)
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-chapters: 1134-lochaysyer
VectorStore.ts:1608 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2262 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2307 💾 Database flush completed
VectorStore.ts:1672 📋 Retrieved latest revision for aiframe-chapters: 1135-lochaysyer
VectorStore.ts:2275 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 1135-lochaysyer)
unifiedStorage.ts:103 ✅ Unified save completed successfully
useUnifiedStorage.ts:655 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-06T17:43:08.615Z'}
scheduler.development.js:14 [Violation] 'message' handler took 189ms
scheduler.development.js:14 [Violation] 'message' handler took 165ms
