 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754074871996&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=7&sid=1754059539&sct=3&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2F&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&_et=75971&tfd=1001046".
Yc @ js:241
ym @ js:431
dN @ js:911
k.flush @ js:919
k.flush @ js:935
(anonymous) @ js:948
(anonymous) @ js:883
(anonymous) @ js:882
Navigated to http://localhost:3000/deep-research
analytics.ts:160 📱 Device Info Collected: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', platform: 'MacIntel', vendor: 'Google Inc.', language: 'en-US', languages: Array(4), …}
analytics.ts:193 🌍 Location Info Collected: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US'}
analytics.ts:79 📊 GA4 Environment Variables Debug: {measurementId: 'G-V1B8R98P79', anonymizeIp: false, debugMode: false, siteName: 'TimeCapsule- SLM', siteUrl: 'http://localhost:3000', …}
VectorStore.ts:19 -------------- RxDB dev-mode warning -------------------------------
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
eval @ VectorStore.ts:19
(app-pages-browser)/./src/components/VectorStore/VectorStore.ts @ layout.js:7809
options.factory @ webpack.js?v=1754075863992:712
__webpack_require__ @ webpack.js?v=1754075863992:37
fn @ webpack.js?v=1754075863992:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7842
options.factory @ webpack.js?v=1754075863992:712
__webpack_require__ @ webpack.js?v=1754075863992:37
fn @ webpack.js?v=1754075863992:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false!:11
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false! @ layout.js:4998
options.factory @ webpack.js?v=1754075863992:712
__webpack_require__ @ webpack.js?v=1754075863992:37
__webpack_exec__ @ layout.js:8073
(anonymous) @ layout.js:8074
__webpack_require__.O @ webpack.js?v=1754075863992:84
(anonymous) @ layout.js:8075
webpackJsonpCallback @ webpack.js?v=1754075863992:1388
(anonymous) @ layout.js:9
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.168423384313183, longitude: 72.84642872951332, …}
useOllamaConnection.ts:62 📝 Loading saved Ollama config: {baseURL: 'http://localhost:11434', selectedModel: 'qwen3:0.6b'}
VectorStoreProvider.tsx:143 🚀 Auto-initializing VectorStore for route: /deep-research
VectorStoreProvider.tsx:79 🚀 VectorStoreProvider: Creating new singleton VectorStore...
RAGTracker.ts:26 🔍 RAG Tracker initialized with config: {enableTracking: true, enableVisualization: true, enablePerformanceMetrics: true, enableQualityMetrics: false, maxQueryHistory: 1000, …}
VectorStore.ts:178 🗂️ VectorStore constructor called
VectorStore.ts:179 🔍 RAG Tracker initialized for VectorStore
VectorStore.ts:240 🗂️ Initializing RxDB Vector Store...
VectorStore.ts:243 🤖 Loading document processor and starting immediate Xenova download...
EmbeddingService.ts:35 🧠 Xenova environment configured for CDN loading
DocumentProcessor.ts:61 🔧 DocumentProcessor constructor called (new architecture)
VectorStore.ts:247 🧠 Starting immediate background Xenova download...
VectorStore.ts:1426 🧠 Starting immediate Xenova download in background...
VectorStore.ts:1443 🔄 Initializing web worker (attempt 1/3)...
DocumentProcessor.ts:72 🔧 Initializing DocumentProcessor with immediate download architecture...
DocumentProcessor.ts:95 🔧 Initializing text processing worker...
VectorStore.ts:293 📚 Creating RxDB database...
analytics.ts:271 📊 GA4: Initializing Google Analytics 4...
VectorStoreProvider.tsx:146 ⏭️ Skipping auto-init for /deep-research: {isInitialized: false, isInitializing: true, attemptedBefore: true, singletonInitialized: false}
scheduler.development.js:14 [Violation] 'message' handler took 266ms
VectorStore.ts:300 -------------- RxDB Open Core RxStorage -------------------------------
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
init @ VectorStore.ts:300
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
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754075863992:160
options.factory @ webpack.js?v=1754075863992:712
__webpack_require__ @ webpack.js?v=1754075863992:37
fn @ webpack.js?v=1754075863992:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754075863992:182
options.factory @ webpack.js?v=1754075863992:712
__webpack_require__ @ webpack.js?v=1754075863992:37
__webpack_exec__ @ main-app.js?v=1754075863992:2824
(anonymous) @ main-app.js?v=1754075863992:2825
webpackJsonpCallback @ webpack.js?v=1754075863992:1388
(anonymous) @ main-app.js?v=1754075863992:9
VectorStore.ts:307 📄 Creating documents collection...
Analytics.tsx:39 ⏳ Analytics: Skipping page tracking - no consent or not initialized
embeddingWorker.js:231 🔧 Text processing worker loaded successfully
embeddingWorker.js:59 🔧 Initializing text processing worker...
embeddingWorker.js:73 ✅ Text processing worker initialized successfully
hook.js:608 ./src/lib/multi-agent/index.ts
export 'Agent' (reexported as 'Agent') was not found in './interfaces/Agent' (possible exports: BaseAgent)
overrideMethod @ hook.js:608
processMessage @ hot-reloader-client.js:240
handler @ hot-reloader-client.js:473
hook.js:608 ./src/lib/multi-agent/index.ts
export 'ResearchContext' (reexported as 'ResearchContext') was not found in './interfaces/Context' (possible exports: createInitialContext)
overrideMethod @ hook.js:608
processMessage @ hot-reloader-client.js:240
handler @ hot-reloader-client.js:473
hook.js:608 ./src/lib/multi-agent/index.ts
export 'Message' (reexported as 'Message') was not found in './interfaces/Message' (possible exports: MessageType, Priority, createMessage)
overrideMethod @ hook.js:608
processMessage @ hot-reloader-client.js:240
handler @ hot-reloader-client.js:473
DocumentProcessor.ts:116 ✅ Text processing worker ready
DocumentProcessor.ts:125 ✅ DocumentProcessor initialization complete (embeddings will load when needed)
VectorStore.ts:1445 ✅ Web worker initialized successfully
VectorStore.ts:1463 🧠 Starting Xenova embedding service download...
EmbeddingService.ts:69 🧠 Starting Xenova embedding service initialization...
EmbeddingService.ts:77 ✅ Loading model (checking cache)...
EmbeddingService.ts:84 📦 Loading Xenova/all-MiniLM-L6-v2 model from Hugging Face CDN...
VectorStore.ts:371 ✅ RxDB Vector Store initialized successfully
VectorStore.ts:372 🧠 Xenova download running in background...
VectorStoreProvider.tsx:85 ✅ VectorStoreProvider: Singleton VectorStore initialized successfully
VectorStoreProvider.tsx:146 ⏭️ Skipping auto-init for /deep-research: {isInitialized: true, isInitializing: false, attemptedBefore: true, singletonInitialized: true}
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
initializeXenovaService @ VectorStore.ts:1471
startImmediateBackgroundDownload @ VectorStore.ts:1432
useDocuments.ts:72 📊 Document status updated: {documents: 1, totalSize: '1.5 MB', totalChunks: 18, totalVectors: 18, avgChunksPerDoc: '18.0', …}
analytics.ts:305 ✅ GA4: Successfully initialized with enhanced tracking
Analytics.tsx:20 ✅ Analytics: GA4 initialized with user consent
EmbeddingService.ts:129 ✅ Model loaded successfully
EmbeddingService.ts:147 ✅ Model loaded from cache instantly
VectorStore.ts:1477 📊 Xenova progress: Embedding model ready (100%)
EmbeddingService.ts:156 ✅ EmbeddingService initialized successfully
VectorStore.ts:1483 ✅ Xenova embedding service ready
VectorStore.ts:1434 ✅ Immediate background download completed
VectorStore.ts:265 ✅ Xenova model loaded from cache - all features ready
VectorStore.ts:274 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
analytics.ts:363 📊 GA4: Page view tracked - DeepResearch-TimeCapsule
Analytics.tsx:69 📊 Analytics: Tracked page view - DeepResearch-TimeCapsule (/deep-research)
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754075873305&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~102015666~103116026~103200004~103233427~104684208~104684211~104948813~105033763~105033765~105087538~105087540~105103161~105103163&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=1&sid=1754059539&sct=3&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2F&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=9422".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
k.flush @ js?id=G-V1B8R98P79:919
k.Kb @ js?id=G-V1B8R98P79:916
k.add @ js?id=G-V1B8R98P79:919
k.Jl @ js?id=G-V1B8R98P79:935
k.bq @ js?id=G-V1B8R98P79:935
(anonymous) @ js?id=G-V1B8R98P79:931
un @ js?id=G-V1B8R98P79:448
Ap @ js?id=G-V1B8R98P79:469
(anonymous) @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:662
Promise.then
fz @ js?id=G-V1B8R98P79:662
k.aq @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:947
v @ js?id=G-V1B8R98P79:488
Dn @ js?id=G-V1B8R98P79:450
dr @ js?id=G-V1B8R98P79:488
cr.flush @ js?id=G-V1B8R98P79:492
cr.push @ js?id=G-V1B8R98P79:490
Vq @ js?id=G-V1B8R98P79:485
event @ js?id=G-V1B8R98P79:752
WD @ js?id=G-V1B8R98P79:758
ZD.b.push @ js?id=G-V1B8R98P79:764
window.gtag @ analytics.ts:279
trackEvent @ analytics.ts:384
initializeGA4 @ analytics.ts:308
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754075873305&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~102015666~103116026~103200004~103233427~104684208~104684211~104948813~105033763~105033765~105087538~105087540~105103161~105103163&sr=2240x1260&cid=602849859.1754048070&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&sid=1754059539&sct=3&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2F&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-01T19%3A17%3A53.316Z&epn.page_duration=2&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x844&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&_et=1&tfd=9426".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
k.flush @ js?id=G-V1B8R98P79:919
k.Kb @ js?id=G-V1B8R98P79:916
k.add @ js?id=G-V1B8R98P79:919
k.Jl @ js?id=G-V1B8R98P79:935
k.bq @ js?id=G-V1B8R98P79:935
(anonymous) @ js?id=G-V1B8R98P79:931
un @ js?id=G-V1B8R98P79:448
Ap @ js?id=G-V1B8R98P79:469
(anonymous) @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:662
fz @ js?id=G-V1B8R98P79:662
k.aq @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:947
v @ js?id=G-V1B8R98P79:488
Dn @ js?id=G-V1B8R98P79:450
dr @ js?id=G-V1B8R98P79:488
cr.flush @ js?id=G-V1B8R98P79:492
cr.push @ js?id=G-V1B8R98P79:490
Vq @ js?id=G-V1B8R98P79:485
event @ js?id=G-V1B8R98P79:752
WD @ js?id=G-V1B8R98P79:758
ZD.b.push @ js?id=G-V1B8R98P79:764
SD @ js?id=G-V1B8R98P79:764
$D @ js?id=G-V1B8R98P79:764
mJ @ js?id=G-V1B8R98P79:855
hJ @ js?id=G-V1B8R98P79:854
(anonymous) @ js?id=G-V1B8R98P79:858
setTimeout
Qc @ js?id=G-V1B8R98P79:238
pJ @ js?id=G-V1B8R98P79:858
(anonymous) @ js?id=G-V1B8R98P79:349
k.invoke @ js?id=G-V1B8R98P79:253
Ya @ js?id=G-V1B8R98P79:217
vd.evaluate @ js?id=G-V1B8R98P79:255
Rd @ js?id=G-V1B8R98P79:270
k.invoke @ js?id=G-V1B8R98P79:253
Ya @ js?id=G-V1B8R98P79:217
Xa @ js?id=G-V1B8R98P79:216
(anonymous) @ js?id=G-V1B8R98P79:277
k.invoke @ js?id=G-V1B8R98P79:253
Ya @ js?id=G-V1B8R98P79:217
k.Zn @ js?id=G-V1B8R98P79:219
bf @ js?id=G-V1B8R98P79:288
(anonymous) @ js?id=G-V1B8R98P79:789
$f @ js?id=G-V1B8R98P79:303
e @ js?id=G-V1B8R98P79:734
YC @ js?id=G-V1B8R98P79:735
bD @ js?id=G-V1B8R98P79:740
WD @ js?id=G-V1B8R98P79:759
ZD.b.push @ js?id=G-V1B8R98P79:764
window.gtag @ analytics.ts:279
initializeGA4 @ analytics.ts:283
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754075873305&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~102015666~103116026~103200004~103233427~104684208~104684211~104948813~105033763~105033765~105087538~105087540~105103161~105103163&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=3&sid=1754059539&sct=3&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2F&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=scroll&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&epn.percent_scrolled=90&_et=2&tfd=9752".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
k.flush @ js?id=G-V1B8R98P79:919
k.Kb @ js?id=G-V1B8R98P79:916
k.add @ js?id=G-V1B8R98P79:919
k.Jl @ js?id=G-V1B8R98P79:935
k.bq @ js?id=G-V1B8R98P79:935
(anonymous) @ js?id=G-V1B8R98P79:931
un @ js?id=G-V1B8R98P79:448
Ap @ js?id=G-V1B8R98P79:469
(anonymous) @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:662
fz @ js?id=G-V1B8R98P79:662
k.aq @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:947
v @ js?id=G-V1B8R98P79:488
Dn @ js?id=G-V1B8R98P79:450
dr @ js?id=G-V1B8R98P79:488
cr.flush @ js?id=G-V1B8R98P79:492
cr.push @ js?id=G-V1B8R98P79:490
Vq @ js?id=G-V1B8R98P79:485
event @ js?id=G-V1B8R98P79:752
WD @ js?id=G-V1B8R98P79:758
ZD.b.push @ js?id=G-V1B8R98P79:764
window.gtag @ analytics.ts:279
trackPageView @ analytics.ts:356
Analytics.useEffect.trackPageView @ Analytics.tsx:58
setTimeout
Analytics.useEffect @ Analytics.tsx:73
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
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754075873305&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~102015666~103116026~103200004~103233427~104684208~104684211~104948813~105033763~105033765~105087538~105087540~105103161~105103163&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&dt=DeepResearch-TimeCapsule&dl=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&sid=1754059539&sct=3&seg=1&dr=http%3A%2F%2Flocalhost%3A3000%2F&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=research&ep.page_type=application&ep.pathname=%2Fdeep-research&ep.consent_analytics=true&ep.consent_functional=true&_et=318&tfd=9756".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
k.flush @ js?id=G-V1B8R98P79:919
k.Kb @ js?id=G-V1B8R98P79:916
k.add @ js?id=G-V1B8R98P79:919
k.Jl @ js?id=G-V1B8R98P79:935
k.bq @ js?id=G-V1B8R98P79:935
(anonymous) @ js?id=G-V1B8R98P79:931
un @ js?id=G-V1B8R98P79:448
Ap @ js?id=G-V1B8R98P79:469
(anonymous) @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:662
fz @ js?id=G-V1B8R98P79:662
k.aq @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:947
v @ js?id=G-V1B8R98P79:488
Dn @ js?id=G-V1B8R98P79:450
dr @ js?id=G-V1B8R98P79:488
cr.flush @ js?id=G-V1B8R98P79:492
cr.push @ js?id=G-V1B8R98P79:490
Vq @ js?id=G-V1B8R98P79:485
event @ js?id=G-V1B8R98P79:752
WD @ js?id=G-V1B8R98P79:758
ZD.b.push @ js?id=G-V1B8R98P79:764
window.gtag @ analytics.ts:279
trackEvent @ analytics.ts:384
trackEngagement @ analytics.ts:500
Analytics.useEffect.trackPageView @ Analytics.tsx:67
setTimeout
Analytics.useEffect @ Analytics.tsx:73
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
DeepResearchLayout @ layout.tsx:11
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
<DeepResearchLayout>
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754075863992:160
options.factory @ webpack.js?v=1754075863992:712
__webpack_require__ @ webpack.js?v=1754075863992:37
fn @ webpack.js?v=1754075863992:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754075863992:182
options.factory @ webpack.js?v=1754075863992:712
__webpack_require__ @ webpack.js?v=1754075863992:37
__webpack_exec__ @ main-app.js?v=1754075863992:2824
(anonymous) @ main-app.js?v=1754075863992:2825
webpackJsonpCallback @ webpack.js?v=1754075863992:1388
(anonymous) @ main-app.js?v=1754075863992:9
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
flushPendingEffects @ react-dom-client.development.js:15830
performSyncWorkOnRoot @ react-dom-client.development.js:16362
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754075863992:160
options.factory @ webpack.js?v=1754075863992:712
__webpack_require__ @ webpack.js?v=1754075863992:37
fn @ webpack.js?v=1754075863992:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754075863992:182
options.factory @ webpack.js?v=1754075863992:712
__webpack_require__ @ webpack.js?v=1754075863992:37
__webpack_exec__ @ main-app.js?v=1754075863992:2824
(anonymous) @ main-app.js?v=1754075863992:2825
webpackJsonpCallback @ webpack.js?v=1754075863992:1388
(anonymous) @ main-app.js?v=1754075863992:9
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754075873305&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~102015666~103116026~103200004~103233427~104684208~104684211~104948813~105033763~105033765~105087538~105087540~105103161~105103163&sr=2240x1260&cid=602849859.1754048070&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=5&sid=1754059539&sct=3&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2F&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-01T19%3A17%3A53.660Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x844&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&_et=2&tfd=14758".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
k.flush @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:916
useOllamaConnection.ts:94 🔍 Testing Ollama connection at: http://localhost:11434
useOllamaConnection.ts:109 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ useOllamaConnection.ts:109
handleTest @ OllamaConnectionModal.tsx:112
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
useOllamaConnection.ts:136 ✅ Ollama connection test passed, models: (4) ['tinyllama:1.1b', 'qwen3:0.6b', 'llama3.2:1b', 'llama3.1:8b']
useOllamaConnection.ts:176 🔌 Starting Ollama connection process... {baseURL: 'http://localhost:11434', model: 'qwen3:0.6b'}
useOllamaConnection.ts:94 🔍 Testing Ollama connection at: http://localhost:11434
useOllamaConnection.ts:136 ✅ Ollama connection test passed, models: (4) ['tinyllama:1.1b', 'qwen3:0.6b', 'llama3.2:1b', 'llama3.1:8b']
useOllamaConnection.ts:109 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ useOllamaConnection.ts:109
useOllamaConnection.useCallback[connect] @ useOllamaConnection.ts:192
handleOllamaConnect @ DeepResearchApp.tsx:183
handleConnect @ OllamaConnectionModal.tsx:152
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
useOllamaConnection.ts:211 🤖 Creating Ollama client... {baseURL: 'http://localhost:11434', selectedModel: 'qwen3:0.6b'}
useOllamaConnection.ts:235 ✅ Ollama client created successfully
useOllamaConnection.ts:239 🧪 Testing content generation...
useOllamaConnection.ts:247 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[connect] @ useOllamaConnection.ts:247
await in useOllamaConnection.useCallback[connect]
handleOllamaConnect @ DeepResearchApp.tsx:183
handleConnect @ OllamaConnectionModal.tsx:152
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
useOllamaConnection.ts:258 ✅ Test generation successful: <think>
Okay, the user wants me to say "Connection test successful" to confirm. Let me
useOllamaConnection.ts:285 ✅ Successfully connected to Ollama with model: qwen3:0.6b
prompt-input.tsx:481 🔍 Submit context check: {enableRAG: true, webSearchEnabled: false, webSearchConfigured: true, hasRAGSearch: true, hasWebSearch: true}
prompt-input.tsx:491 🔍 Performing RAG search...
RAGTracker.ts:71 🔍 RAG Query started: rag_1754075886347_i6cfsi1vp - "give me top 3 runs from Tyler's blog..."
VectorStore.ts:743 🔍 RAG Query rag_1754075886347_i6cfsi1vp: Searching for "give me top 3 runs from Tyler's blog" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (36 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 116ms
VectorStore.ts:751 🧠 RAG Query rag_1754075886347_i6cfsi1vp: Generated embedding in 117ms
VectorStore.ts:758 📚 RAG Query rag_1754075886347_i6cfsi1vp: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754075886347_i6cfsi1vp - 15 results, avg similarity: 0.268, 118ms
VectorStore.ts:811 ✅ RAG Query rag_1754075886347_i6cfsi1vp completed: {totalTime: '118ms', breakdown: {…}, results: '15/18 (filtered by limit)', avgSimilarity: '0.268', threshold: 0.1, …}
useResearch.ts:325 🔍 RAG Search completed: 1 documents found
prompt-input.tsx:514 🔍 Web search skipped: {webSearchEnabled: false, hasWebSearch: true, configured: true}
useResearch.ts:938 🔬 Starting intelligent research for: "give me top 3 runs from Tyler's blog"
ResearchOrchestrator.ts:98 🔬 Starting research for: "give me top 3 runs from Tyler's blog"
useResearch.ts:942 📋 Step update: analysis - in_progress - ID: analysis_1754075886512_1_8bd3a3c0
useResearch.ts:964 📋 Adding new step: analysis_1754075886512_1_8bd3a3c0
QueryIntelligenceService.ts:155 🧠 Analyzing query: "give me top 3 runs from Tyler's blog"
QueryIntelligenceService.ts:159 📋 Rule-based analysis: performance (0.8)
QueryIntelligenceService.ts:188 ✅ Query analysis complete: 8 queries in 0ms
useResearch.ts:942 📋 Step update: analysis - completed - ID: analysis_1754075886512_1_8bd3a3c0
useResearch.ts:964 📋 Adding new step: analysis_1754075886512_1_8bd3a3c0
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 333}
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
planResearchStrategy @ ResearchOrchestrator.ts:238
executeResearch @ ResearchOrchestrator.ts:117
await in executeResearch
useResearch.useCallback[performIntelligentResearch] @ useResearch.ts:988
handleSubmit @ ResearchOutput.tsx:802
handleSubmitWithContext @ prompt-input.tsx:522
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1184}
 🔍 Parsing LLM response: <think>
Okay, the user is asking for the top 3 runs from Tyler's blog. Let me think about how to approach this. First, I need to check if there's any data available in the provided system or knowledge base. The user mentioned using the available "rag_search" method, so I should perform a rag search ...
 🧠 Found <think> tags, extracting JSON after </think>
 ✅ Extracted JSON after </think> tags
 ✅ Successfully parsed 1 valid steps
 🤖 LLM planned 1 research steps
 📋 Research plan: 1 steps planned
 📋 Step update: rag_search - in_progress - ID: rag_search_1754075890996_1_spplj
 📋 Adding new step: rag_search_1754075890996_1_spplj
ResearchOrchestrator.ts:399 📚 Executing RAG search with 8 queries: (8) ['benchmark results', 'performance metrics', 'training speed', 'optimization results', 'execution time', 'throughput data', 'speed comparison', 'performance analysis']
RAGTracker.ts:71 🔍 RAG Query started: rag_1754075890996_y2h3hjryz - "benchmark results..."
VectorStore.ts:743 🔍 RAG Query rag_1754075890996_y2h3hjryz: Searching for "benchmark results" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (17 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 18ms
VectorStore.ts:751 🧠 RAG Query rag_1754075890996_y2h3hjryz: Generated embedding in 18ms
VectorStore.ts:758 📚 RAG Query rag_1754075890996_y2h3hjryz: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754075890996_y2h3hjryz - 10 results, avg similarity: 0.316, 18ms
VectorStore.ts:811 ✅ RAG Query rag_1754075890996_y2h3hjryz completed: {totalTime: '18ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.316', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754075891015_bo86cd2ys - "performance metrics..."
VectorStore.ts:743 🔍 RAG Query rag_1754075891015_bo86cd2ys: Searching for "performance metrics" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (19 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 14ms
VectorStore.ts:751 🧠 RAG Query rag_1754075891015_bo86cd2ys: Generated embedding in 14ms
VectorStore.ts:758 📚 RAG Query rag_1754075891015_bo86cd2ys: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754075891015_bo86cd2ys - 10 results, avg similarity: 0.304, 14ms
VectorStore.ts:811 ✅ RAG Query rag_1754075891015_bo86cd2ys completed: {totalTime: '14ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.304', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754075891029_gco01c990 - "training speed..."
VectorStore.ts:743 🔍 RAG Query rag_1754075891029_gco01c990: Searching for "training speed" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (14 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 10ms
VectorStore.ts:751 🧠 RAG Query rag_1754075891029_gco01c990: Generated embedding in 10ms
VectorStore.ts:758 📚 RAG Query rag_1754075891029_gco01c990: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754075891029_gco01c990 - 10 results, avg similarity: 0.361, 12ms
VectorStore.ts:811 ✅ RAG Query rag_1754075891029_gco01c990 completed: {totalTime: '12ms', breakdown: {…}, results: '10/16 (filtered by limit)', avgSimilarity: '0.361', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754075891041_4i99dqosc - "optimization results..."
VectorStore.ts:743 🔍 RAG Query rag_1754075891041_4i99dqosc: Searching for "optimization results" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (20 chars)...
 ✅ Generated embedding: 384 dimensions in 16ms
 🧠 RAG Query rag_1754075891041_4i99dqosc: Generated embedding in 16ms
 📚 RAG Query rag_1754075891041_4i99dqosc: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754075891041_4i99dqosc - 10 results, avg similarity: 0.278, 17ms
 ✅ RAG Query rag_1754075891041_4i99dqosc completed: {totalTime: '17ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.278', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754075891058_lww8poglg - "execution time..."
 🔍 RAG Query rag_1754075891058_lww8poglg: Searching for "execution time" with threshold: 0.1
 🔍 Generating embedding for text (14 chars)...
 ✅ Generated embedding: 384 dimensions in 9ms
 🧠 RAG Query rag_1754075891058_lww8poglg: Generated embedding in 9ms
 📚 RAG Query rag_1754075891058_lww8poglg: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754075891058_lww8poglg - 10 results, avg similarity: 0.279, 10ms
 ✅ RAG Query rag_1754075891058_lww8poglg completed: {totalTime: '10ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.279', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754075891068_7lrbgzj86 - "throughput data..."
 🔍 RAG Query rag_1754075891068_7lrbgzj86: Searching for "throughput data" with threshold: 0.1
 🔍 Generating embedding for text (15 chars)...
 ✅ Generated embedding: 384 dimensions in 10ms
 🧠 RAG Query rag_1754075891068_7lrbgzj86: Generated embedding in 10ms
 📚 RAG Query rag_1754075891068_7lrbgzj86: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754075891068_7lrbgzj86 - 10 results, avg similarity: 0.225, 10ms
 ✅ RAG Query rag_1754075891068_7lrbgzj86 completed: {totalTime: '10ms', breakdown: {…}, results: '10/15 (filtered by limit)', avgSimilarity: '0.225', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754075891078_yycv8rjm5 - "speed comparison..."
 🔍 RAG Query rag_1754075891078_yycv8rjm5: Searching for "speed comparison" with threshold: 0.1
 🔍 Generating embedding for text (16 chars)...
 ✅ Generated embedding: 384 dimensions in 9ms
VectorStore.ts:751 🧠 RAG Query rag_1754075891078_yycv8rjm5: Generated embedding in 9ms
VectorStore.ts:758 📚 RAG Query rag_1754075891078_yycv8rjm5: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754075891078_yycv8rjm5 - 10 results, avg similarity: 0.264, 9ms
VectorStore.ts:811 ✅ RAG Query rag_1754075891078_yycv8rjm5 completed: {totalTime: '9ms', breakdown: {…}, results: '10/16 (filtered by limit)', avgSimilarity: '0.264', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754075891087_cbfy426v7 - "performance analysis..."
VectorStore.ts:743 🔍 RAG Query rag_1754075891087_cbfy426v7: Searching for "performance analysis" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (20 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 8ms
VectorStore.ts:751 🧠 RAG Query rag_1754075891087_cbfy426v7: Generated embedding in 8ms
VectorStore.ts:758 📚 RAG Query rag_1754075891087_cbfy426v7: Retrieved 1 documents in 1ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754075891087_cbfy426v7 - 10 results, avg similarity: 0.288, 9ms
VectorStore.ts:811 ✅ RAG Query rag_1754075891087_cbfy426v7 completed: {totalTime: '9ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.288', threshold: 0.1, …}
ResearchOrchestrator.ts:425 📚 RAG search found 15 unique results from 8 queries
ResearchOrchestrator.ts:474 ✅ RAG search found 15 sources
useResearch.ts:942 📋 Step update: rag_search - completed - ID: rag_search_1754075890996_1_spplj
useResearch.ts:964 📋 Adding new step: rag_search_1754075890996_1_spplj
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754075891097_2_d34d25e6
useResearch.ts:964 📋 Adding new step: synthesis_1754075891097_2_d34d25e6
ResearchOrchestrator.ts:593 🤖 Using multi-agent system for intelligent extraction
AgentRegistry.ts:21 📝 Registered agent: QueryPlanner - Expands queries based on intent and domain understanding
AgentRegistry.ts:21 📝 Registered agent: DataInspector - Analyzes RAG chunks to understand data structure and quality
AgentRegistry.ts:21 📝 Registered agent: PatternGenerator - Creates extraction strategies based on data inspection
AgentRegistry.ts:21 📝 Registered agent: Extractor - Executes extraction using generated patterns
AgentRegistry.ts:21 📝 Registered agent: Synthesizer - Consolidates extracted data into a coherent answer
Orchestrator.ts:35 🎯 Orchestrator starting research for: "give me top 3 runs from Tyler's blog"
Orchestrator.ts:101 📊 Query analysis complete: {intent: 'Find ranking about performance', domain: 'performance', requirements: Array(2), queryType: 'ranking'}
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1197}
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754075873305&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~102015666~103116026~103200004~103233427~104684208~104684211~104948813~105033763~105033765~105087538~105087540~105103161~105103163&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=6&sid=1754059539&sct=3&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2F&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=12952&tfd=27711".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
k.flush @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:916
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
summarizeRAGResults @ Orchestrator.ts:129
research @ Orchestrator.ts:44
await in research
synthesizeAnswer @ ResearchOrchestrator.ts:600
executeResearch @ ResearchOrchestrator.ts:151
 ✅ Content generated successfully {responseLength: 2215}
 📚 RAG summary: <think>
Okay, let's start by understanding what the user is asking. They want a summary of the searc...
 📋 Using optimized pipeline for small models: (4) ['DataInspector', 'PatternGenerator', 'Extractor', 'Synthesizer']
 🤖 Executing agent: DataInspector
 🔎 DataInspector: Analyzing 15 chunks
 ✅ Data inspection complete: {hasNumbers: true, hasTimeUnits: true, hasPerformanceMetrics: true, hasLists: true}
 🤖 Executing agent: PatternGenerator
 🎯 PatternGenerator: Creating extraction strategies
 ✅ Generated 3 extraction patterns
 🤖 Executing agent: Extractor
 ⛏️ Extractor: Processing 15 chunks
 🔄 Using optimized extraction for small models
 🔄 Using pattern-based extraction optimized for small models
 ✅ Extracted 3 items using pattern matching
 🔄 Using optimized extraction for small models
 🔄 Using pattern-based extraction optimized for small models
 ✅ Extracted 4 items using pattern matching
ExtractionAgent.ts:83 🔄 Using optimized extraction for small models
ExtractionAgent.ts:91 🔄 Using pattern-based extraction optimized for small models
ExtractionAgent.ts:184 ✅ Extracted 3 items using pattern matching
ExtractionAgent.ts:83 🔄 Using optimized extraction for small models
ExtractionAgent.ts:91 🔄 Using pattern-based extraction optimized for small models
ExtractionAgent.ts:184 ✅ Extracted 4 items using pattern matching
ExtractionAgent.ts:83 🔄 Using optimized extraction for small models
ExtractionAgent.ts:91 🔄 Using pattern-based extraction optimized for small models
ExtractionAgent.ts:184 ✅ Extracted 5 items using pattern matching
ExtractionAgent.ts:83 🔄 Using optimized extraction for small models
ExtractionAgent.ts:91 🔄 Using pattern-based extraction optimized for small models
ExtractionAgent.ts:184 ✅ Extracted 5 items using pattern matching
ExtractionAgent.ts:83 🔄 Using optimized extraction for small models
ExtractionAgent.ts:91 🔄 Using pattern-based extraction optimized for small models
ExtractionAgent.ts:184 ✅ Extracted 0 items using pattern matching
ExtractionAgent.ts:83 🔄 Using optimized extraction for small models
ExtractionAgent.ts:91 🔄 Using pattern-based extraction optimized for small models
ExtractionAgent.ts:184 ✅ Extracted 1 items using pattern matching
ExtractionAgent.ts:50 ✅ Extraction complete: 25 items found
Orchestrator.ts:175 🤖 Executing agent: Synthesizer
SynthesisAgent.ts:24 📝 Synthesizer: Creating final answer from 25 items
SynthesisAgent.ts:43 ✅ Synthesis complete: 513 characters
Orchestrator.ts:53 📝 Final synthesis: {hasAnswer: true, answerLength: 513, preview: 'Based on the search results, here are the top 3 speed runs:\n\n1. 221k tokens/sec (221k tokens/sec)\n  '}
ResearchOrchestrator.ts:603 ✅ Multi-agent system generated answer
useResearch.ts:942 📋 Step update: synthesis - completed - ID: synthesis_1754075891097_2_d34d25e6
useResearch.ts:964 📋 Adding new step: synthesis_1754075891097_2_d34d25e6
ResearchOrchestrator.ts:183 ✅ Research completed: 3 steps, 15 sources, 13847ms
useResearch.ts:994 ✅ Intelligent research completed: {steps: 3, sources: 15, confidence: 0.5352170707171373, processingTime: 13847}
