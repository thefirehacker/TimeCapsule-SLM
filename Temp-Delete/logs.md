  Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754222953017&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=7&sid=1754221605&sct=10&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&_et=133103&tfd=1425531".
Yc @ js:241
ym @ js:431
dN @ js:911
k.flush @ js:919
k.flush @ js:935
(anonymous) @ js:948
(anonymous) @ js:883
(anonymous) @ js:882
Fetch failed loading: GET "http://localhost:3000/deep-research?_rsc=1kjzf".
Navigated to http://localhost:3000/deep-research
analytics.ts:160 📱 Device Info Collected: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', platform: 'MacIntel', vendor: 'Google Inc.', language: 'en-US', languages: Array(4), …}
analytics.ts:177 [Violation] Only request geolocation information in response to a user gesture.
collectLocationInfo @ analytics.ts:177
Analytics @ analytics.ts:75
eval @ analytics.ts:556
(app-pages-browser)/./src/lib/analytics.ts @ layout.js:7974
options.factory @ webpack.js?v=1754224369509:712
__webpack_require__ @ webpack.js?v=1754224369509:37
fn @ webpack.js?v=1754224369509:369
eval @ Analytics.tsx:10
(app-pages-browser)/./src/components/analytics/Analytics.tsx @ layout.js:7820
options.factory @ webpack.js?v=1754224369509:712
__webpack_require__ @ webpack.js?v=1754224369509:37
fn @ webpack.js?v=1754224369509:369
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
options.factory @ webpack.js?v=1754224369509:712
__webpack_require__ @ webpack.js?v=1754224369509:37
fn @ webpack.js?v=1754224369509:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7842
options.factory @ webpack.js?v=1754224369509:712
__webpack_require__ @ webpack.js?v=1754224369509:37
fn @ webpack.js?v=1754224369509:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false!:11
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false! @ layout.js:4998
options.factory @ webpack.js?v=1754224369509:712
__webpack_require__ @ webpack.js?v=1754224369509:37
__webpack_exec__ @ layout.js:8073
(anonymous) @ layout.js:8074
__webpack_require__.O @ webpack.js?v=1754224369509:84
(anonymous) @ layout.js:8075
webpackJsonpCallback @ webpack.js?v=1754224369509:1388
(anonymous) @ layout.js:9
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.168422867825374, longitude: 72.84641346100935, …}
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
scheduler.development.js:14 [Violation] 'message' handler took 339ms
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
VectorStore.ts:307 📄 Creating documents collection...
Analytics.tsx:39 ⏳ Analytics: Skipping page tracking - no consent or not initialized
embeddingWorker.js:231 🔧 Text processing worker loaded successfully
embeddingWorker.js:59 🔧 Initializing text processing worker...
embeddingWorker.js:73 ✅ Text processing worker initialized successfully
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
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754224381031&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105033766~105033768~105087538~105087540~105103161~105103163~105113531&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=1&sid=1754221605&sct=10&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=12229".
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
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754224381031&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105033766~105033768~105087538~105087540~105103161~105103163~105113531&sr=2240x1260&cid=602849859.1754048070&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&sid=1754221605&sct=10&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-03T12%3A33%3A01.039Z&epn.page_duration=2&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x789&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&_et=1&tfd=12234".
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
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754224381031&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105033766~105033768~105087538~105087540~105103161~105103163~105113531&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=3&sid=1754221605&sct=10&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=scroll&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&epn.percent_scrolled=90&_et=3&tfd=12502".
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
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754224381031&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105033766~105033768~105087538~105087540~105103161~105103163~105113531&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&dt=DeepResearch-TimeCapsule&dl=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&sid=1754221605&sct=10&seg=1&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=research&ep.page_type=application&ep.pathname=%2Fdeep-research&ep.consent_analytics=true&ep.consent_functional=true&_et=250&tfd=12506".
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
useOllamaConnection.ts:94 🔍 Testing Ollama connection at: http://localhost:11434
useOllamaConnection.ts:136 ✅ Ollama connection test passed, models: (4) ['tinyllama:1.1b', 'qwen3:0.6b', 'llama3.2:1b', 'llama3.1:8b']
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
<button>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
Button @ button.tsx:51
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
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<Button>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
OllamaConnectionModal @ OllamaConnectionModal.tsx:346
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
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754224369509:160
options.factory @ webpack.js?v=1754224369509:712
__webpack_require__ @ webpack.js?v=1754224369509:37
fn @ webpack.js?v=1754224369509:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754224369509:182
options.factory @ webpack.js?v=1754224369509:712
__webpack_require__ @ webpack.js?v=1754224369509:37
__webpack_exec__ @ main-app.js?v=1754224369509:2824
(anonymous) @ main-app.js?v=1754224369509:2825
webpackJsonpCallback @ webpack.js?v=1754224369509:1388
(anonymous) @ main-app.js?v=1754224369509:9
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754224369509:160
options.factory @ webpack.js?v=1754224369509:712
__webpack_require__ @ webpack.js?v=1754224369509:37
fn @ webpack.js?v=1754224369509:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754224369509:182
options.factory @ webpack.js?v=1754224369509:712
__webpack_require__ @ webpack.js?v=1754224369509:37
__webpack_exec__ @ main-app.js?v=1754224369509:2824
(anonymous) @ main-app.js?v=1754224369509:2825
webpackJsonpCallback @ webpack.js?v=1754224369509:1388
(anonymous) @ main-app.js?v=1754224369509:9
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
useOllamaConnection.ts:176 🔌 Starting Ollama connection process... {baseURL: 'http://localhost:11434', model: 'qwen3:0.6b'}
useOllamaConnection.ts:94 🔍 Testing Ollama connection at: http://localhost:11434
useOllamaConnection.ts:109 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ useOllamaConnection.ts:109
useOllamaConnection.useCallback[connect] @ useOllamaConnection.ts:192
handleOllamaConnect @ DeepResearchApp.tsx:200
handleConnect @ OllamaConnectionModal.tsx:152
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
useOllamaConnection.ts:136 ✅ Ollama connection test passed, models: (4) ['tinyllama:1.1b', 'qwen3:0.6b', 'llama3.2:1b', 'llama3.1:8b']
useOllamaConnection.ts:211 🤖 Creating Ollama client... {baseURL: 'http://localhost:11434', selectedModel: 'qwen3:0.6b'}
useOllamaConnection.ts:235 ✅ Ollama client created successfully
useOllamaConnection.ts:239 🧪 Testing content generation...
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754224381031&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105033766~105033768~105087538~105087540~105103161~105103163~105113531&sr=2240x1260&cid=602849859.1754048070&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=5&sid=1754221605&sct=10&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-03T12%3A33%3A01.331Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x789&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&_et=2&tfd=17512".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
k.flush @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:916
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
handleOllamaConnect @ DeepResearchApp.tsx:200
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
RAGTracker.ts:71 🔍 RAG Query started: rag_1754224405982_ibs8a46g6 - "give me top 3 speed runs from Tyler's blog..."
VectorStore.ts:743 🔍 RAG Query rag_1754224405982_ibs8a46g6: Searching for "give me top 3 speed runs from Tyler's blog" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (42 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 132ms
VectorStore.ts:751 🧠 RAG Query rag_1754224405982_ibs8a46g6: Generated embedding in 133ms
VectorStore.ts:758 📚 RAG Query rag_1754224405982_ibs8a46g6: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754224405982_ibs8a46g6 - 15 results, avg similarity: 0.342, 134ms
VectorStore.ts:811 ✅ RAG Query rag_1754224405982_ibs8a46g6 completed: {totalTime: '134ms', breakdown: {…}, results: '15/17 (filtered by limit)', avgSimilarity: '0.342', threshold: 0.1, …}
useResearch.ts:325 🔍 RAG Search completed: 1 documents found
prompt-input.tsx:514 🔍 Web search skipped: {webSearchEnabled: false, hasWebSearch: true, configured: true}
useResearch.ts:938 🔬 Starting intelligent research for: "give me top 3 speed runs from Tyler's blog"
ResearchOrchestrator.ts:104 🔬 Starting research for: "give me top 3 speed runs from Tyler's blog"
useResearch.ts:942 📋 Step update: analysis - in_progress - ID: analysis_1754224406173_1_48e0d0b8
useResearch.ts:964 📋 Adding new step: analysis_1754224406173_1_48e0d0b8
QueryIntelligenceService.ts:155 🧠 Analyzing query: "give me top 3 speed runs from Tyler's blog"
QueryIntelligenceService.ts:159 📋 Rule-based analysis: performance (0.8)
QueryIntelligenceService.ts:188 ✅ Query analysis complete: 8 queries in 0ms
useResearch.ts:942 📋 Step update: analysis - completed - ID: analysis_1754224406173_1_48e0d0b8
useResearch.ts:964 📋 Adding new step: analysis_1754224406173_1_48e0d0b8
ResearchSteps.tsx:505 🚫 Preventing duplicate step addition: analysis_1754224406173_1_48e0d0b8
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 339}
ResearchSteps.tsx:505 🚫 Preventing duplicate step addition: analysis_1754224406173_1_48e0d0b8
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1171}
ResearchOrchestrator.ts:1030 🔍 Parsing LLM response: <think>
Okay, the user is asking for the top 3 speed runs from Tyler's blog. Let me start by understanding the query. They want three specific entries related to speed runs from Tyler's blog. The available tool is rag_search, so I need to use that. 

First, I should check if there's a way to directl...
ResearchOrchestrator.ts:1036 🧠 Found <think> tags, extracting JSON after </think>
ResearchOrchestrator.ts:1040 ✅ Extracted JSON after </think> tags
ResearchOrchestrator.ts:1081 ✅ Successfully parsed 1 valid steps
ResearchOrchestrator.ts:261 🤖 LLM planned 1 research steps
ResearchOrchestrator.ts:124 📋 Research plan: 1 steps planned
useResearch.ts:942 📋 Step update: rag_search - in_progress - ID: rag_search_1754224411157_1_nozro
useResearch.ts:964 📋 Adding new step: rag_search_1754224411157_1_nozro
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
planResearchStrategy @ ResearchOrchestrator.ts:258
executeResearch @ ResearchOrchestrator.ts:123
await in executeResearch
useResearch.useCallback[performIntelligentResearch] @ useResearch.ts:988
handleSubmit @ ResearchOutput.tsx:803
handleSubmitWithContext @ prompt-input.tsx:522
await in handleSubmitWithContext
handleKeyDown @ prompt-input.tsx:471
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
ResearchOrchestrator.ts:419 📚 Executing RAG search with 8 queries: (8) ['benchmark results', 'performance metrics', 'training speed', 'optimization results', 'execution time', 'throughput data', 'speed comparison', 'performance analysis']
RAGTracker.ts:71 🔍 RAG Query started: rag_1754224411158_kc9hi1qvf - "benchmark results..."
VectorStore.ts:743 🔍 RAG Query rag_1754224411158_kc9hi1qvf: Searching for "benchmark results" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (17 chars)...
 ✅ Generated embedding: 384 dimensions in 12ms
 🧠 RAG Query rag_1754224411158_kc9hi1qvf: Generated embedding in 12ms
 📚 RAG Query rag_1754224411158_kc9hi1qvf: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754224411158_kc9hi1qvf - 10 results, avg similarity: 0.316, 12ms
 ✅ RAG Query rag_1754224411158_kc9hi1qvf completed: {totalTime: '12ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.316', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754224411170_j6h711eo5 - "performance metrics..."
VectorStore.ts:743 🔍 RAG Query rag_1754224411170_j6h711eo5: Searching for "performance metrics" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (19 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 12ms
VectorStore.ts:751 🧠 RAG Query rag_1754224411170_j6h711eo5: Generated embedding in 12ms
VectorStore.ts:758 📚 RAG Query rag_1754224411170_j6h711eo5: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754224411170_j6h711eo5 - 10 results, avg similarity: 0.304, 12ms
VectorStore.ts:811 ✅ RAG Query rag_1754224411170_j6h711eo5 completed: {totalTime: '12ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.304', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754224411182_xgg8kl4be - "training speed..."
VectorStore.ts:743 🔍 RAG Query rag_1754224411182_xgg8kl4be: Searching for "training speed" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (14 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 10ms
VectorStore.ts:751 🧠 RAG Query rag_1754224411182_xgg8kl4be: Generated embedding in 11ms
VectorStore.ts:758 📚 RAG Query rag_1754224411182_xgg8kl4be: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754224411182_xgg8kl4be - 10 results, avg similarity: 0.361, 11ms
VectorStore.ts:811 ✅ RAG Query rag_1754224411182_xgg8kl4be completed: {totalTime: '11ms', breakdown: {…}, results: '10/16 (filtered by limit)', avgSimilarity: '0.361', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754224411193_imszplhuv - "optimization results..."
VectorStore.ts:743 🔍 RAG Query rag_1754224411193_imszplhuv: Searching for "optimization results" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (20 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 13ms
VectorStore.ts:751 🧠 RAG Query rag_1754224411193_imszplhuv: Generated embedding in 13ms
VectorStore.ts:758 📚 RAG Query rag_1754224411193_imszplhuv: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754224411193_imszplhuv - 10 results, avg similarity: 0.278, 14ms
VectorStore.ts:811 ✅ RAG Query rag_1754224411193_imszplhuv completed: {totalTime: '14ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.278', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754224411207_s05l6o62s - "execution time..."
VectorStore.ts:743 🔍 RAG Query rag_1754224411207_s05l6o62s: Searching for "execution time" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (14 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 10ms
VectorStore.ts:751 🧠 RAG Query rag_1754224411207_s05l6o62s: Generated embedding in 10ms
VectorStore.ts:758 📚 RAG Query rag_1754224411207_s05l6o62s: Retrieved 1 documents in 1ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754224411207_s05l6o62s - 10 results, avg similarity: 0.279, 11ms
VectorStore.ts:811 ✅ RAG Query rag_1754224411207_s05l6o62s completed: {totalTime: '11ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.279', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754224411218_vcgomofch - "throughput data..."
VectorStore.ts:743 🔍 RAG Query rag_1754224411218_vcgomofch: Searching for "throughput data" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (15 chars)...
 ✅ Generated embedding: 384 dimensions in 15ms
 🧠 RAG Query rag_1754224411218_vcgomofch: Generated embedding in 15ms
 📚 RAG Query rag_1754224411218_vcgomofch: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754224411218_vcgomofch - 10 results, avg similarity: 0.225, 15ms
VectorStore.ts:811 ✅ RAG Query rag_1754224411218_vcgomofch completed: {totalTime: '15ms', breakdown: {…}, results: '10/15 (filtered by limit)', avgSimilarity: '0.225', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754224411233_2ii13dvgn - "speed comparison..."
VectorStore.ts:743 🔍 RAG Query rag_1754224411233_2ii13dvgn: Searching for "speed comparison" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (16 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 9ms
VectorStore.ts:751 🧠 RAG Query rag_1754224411233_2ii13dvgn: Generated embedding in 9ms
VectorStore.ts:758 📚 RAG Query rag_1754224411233_2ii13dvgn: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754224411233_2ii13dvgn - 10 results, avg similarity: 0.264, 9ms
VectorStore.ts:811 ✅ RAG Query rag_1754224411233_2ii13dvgn completed: {totalTime: '9ms', breakdown: {…}, results: '10/16 (filtered by limit)', avgSimilarity: '0.264', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754224411243_qmleozw8e - "performance analysis..."
VectorStore.ts:743 🔍 RAG Query rag_1754224411243_qmleozw8e: Searching for "performance analysis" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (20 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 8ms
VectorStore.ts:751 🧠 RAG Query rag_1754224411243_qmleozw8e: Generated embedding in 9ms
VectorStore.ts:758 📚 RAG Query rag_1754224411243_qmleozw8e: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754224411243_qmleozw8e - 10 results, avg similarity: 0.288, 9ms
VectorStore.ts:811 ✅ RAG Query rag_1754224411243_qmleozw8e completed: {totalTime: '9ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.288', threshold: 0.1, …}
ResearchOrchestrator.ts:445 📚 RAG search found 15 unique results from 8 queries
ResearchOrchestrator.ts:494 ✅ RAG search found 15 sources
useResearch.ts:942 📋 Step update: rag_search - completed - ID: rag_search_1754224411157_1_nozro
useResearch.ts:964 📋 Adding new step: rag_search_1754224411157_1_nozro
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:964 📋 Adding new step: synthesis_1754224411253_2_ea7b4a14
ResearchOrchestrator.ts:613 🤖 Using multi-agent system for intelligent extraction
AgentRegistry.ts:21 📝 Registered agent: QueryPlanner - Expands queries based on intent and domain understanding
AgentRegistry.ts:21 📝 Registered agent: DataInspector - Analyzes RAG chunks to understand data structure and quality
AgentRegistry.ts:21 📝 Registered agent: PatternGenerator - Creates extraction strategies based on data inspection
AgentRegistry.ts:21 📝 Registered agent: Extractor - Executes extraction using generated patterns
AgentRegistry.ts:21 📝 Registered agent: Synthesizer - Consolidates extracted data into a coherent answer
Orchestrator.ts:50 🎯 Orchestrator starting research for: "give me top 3 speed runs from Tyler's blog"
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 457}
ResearchSteps.tsx:505 🚫 Preventing duplicate step addition: rag_search_1754224411157_1_nozro
ResearchSteps.tsx:505 🚫 Preventing duplicate step addition: rag_search_1754224411157_1_nozro
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754224381031&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105033766~105033768~105087538~105087540~105103161~105103163~105113531&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=6&sid=1754221605&sct=10&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=24893&tfd=42483".
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
analyzeQuery @ Orchestrator.ts:96
research @ Orchestrator.ts:56
synthesizeAnswer @ ResearchOrchestrator.ts:769
executeResearch @ ResearchOrchestrator.ts:160
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1080}
Orchestrator.ts:97 🤖 Query understanding: <think>
Okay, let's break down the user's query. They want the top 3 speed runs from Tyler's blog. First, I need to identify the key elements. The user is specifically asking for speed runs, so the ma
Orchestrator.ts:131 🎯 Detected ranking query: "give me top 3 speed runs from Tyler's blog" (keywords found in response)
Orchestrator.ts:136 📊 Query type determined: ranking for "give me top 3 speed runs from Tyler's blog"
Orchestrator.ts:114 📊 Query analysis complete: {intent: 'User wants ranking about speed_runs', domain: 'speed_runs', requirements: Array(4), queryType: 'ranking'}
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1203}
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
summarizeRAGResults @ Orchestrator.ts:190
research @ Orchestrator.ts:59
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1501}
Orchestrator.ts:191 📚 RAG summary: <think>
Okay, let's start by looking at the user's query. They want a summary of three different chu...
Orchestrator.ts:206 📋 Using optimized pipeline for small models: (4) ['DataInspector', 'PatternGenerator', 'Extractor', 'Synthesizer']
Orchestrator.ts:244 🤖 Executing agent: DataInspector (1/4)
ResearchOrchestrator.ts:622 🚀 Agent started: DataInspector (data_inspector)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
ResearchOrchestrator.ts:665 📊 Agent progress: DataInspector - 10% (Initializing)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
DataInspectorAgent.ts:24 🔎 DataInspector: Analyzing 15 chunks
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2952}
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
inspectWithLLM @ DataInspectorAgent.ts:60
process @ DataInspectorAgent.ts:32
executeAgentPipeline @ Orchestrator.ts:262
research @ Orchestrator.ts:65
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2297}
DataInspectorAgent.ts:61 🤖 Data inspection: <think>
Okay, let me break down the user's query and the data samples provided.

First, the user's question is asking for the top 3 speed runs from Tyler's blog. The data samples are all blog posts. Sample 1 is a detailed blog post about training effectiveness and hyperparameters. Sample 2 mentions 
DataInspectorAgent.ts:99 ✅ Generated 2 patterns from inspection
Orchestrator.ts:269 🔍 Agent DataInspector reasoning length: 2297
Orchestrator.ts:273 🧠 Thinking extraction for DataInspector: {hasThinking: true, thinkingLength: 1365, reasoningSnippet: "<think>\nOkay, let me break down the user's query a…er's blog. The data samples are all blog posts. S"}
Orchestrator.ts:290 ✅ Setting thinking for DataInspector: {thinkingContentLength: 1365, summaryLength: 103}
ResearchOrchestrator.ts:693 🧠 Agent thinking: DataInspector
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
ResearchOrchestrator.ts:712 ✅ Agent completed: DataInspector
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
Orchestrator.ts:244 🤖 Executing agent: PatternGenerator (2/4)
ResearchOrchestrator.ts:622 🚀 Agent started: PatternGenerator (pattern_generator)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
ResearchOrchestrator.ts:665 📊 Agent progress: PatternGenerator - 10% (Initializing)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
PatternGeneratorAgent.ts:24 🎯 PatternGenerator: Creating extraction strategies
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 501}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent DataInspector thinking data: {hasThinking: true, thinkingContentLength: 1365, summaryLength: 103, thinkingPreview: "Okay, let me break down the user's query and the data samples provided.\n\nFirst, the user's question "}
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
generateStrategiesWithLLM @ PatternGeneratorAgent.ts:48
process @ PatternGeneratorAgent.ts:27
executeAgentPipeline @ Orchestrator.ts:262
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1498}
PatternGeneratorAgent.ts:49 🤖 Strategy generation: <think>
Okay, let's tackle this. The user wants to find the top 3 speed runs from Tyler's blog, but the data includes completion times and performance metrics. The task is to create specific extraction strategies with clear questions.

First, for what to look for, I need to focus on completion times
PatternGeneratorAgent.ts:90 ✅ Generated 2 extraction strategies
Orchestrator.ts:269 🔍 Agent PatternGenerator reasoning length: 1498
Orchestrator.ts:273 🧠 Thinking extraction for PatternGenerator: {hasThinking: true, thinkingLength: 794, reasoningSnippet: "<think>\nOkay, let's tackle this. The user wants to…metrics. The task is to create specific extractio"}
Orchestrator.ts:290 ✅ Setting thinking for PatternGenerator: {thinkingContentLength: 794, summaryLength: 103}
ResearchOrchestrator.ts:693 🧠 Agent thinking: PatternGenerator
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
ResearchOrchestrator.ts:712 ✅ Agent completed: PatternGenerator
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
Orchestrator.ts:244 🤖 Executing agent: Extractor (3/4)
ResearchOrchestrator.ts:622 🚀 Agent started: Extractor (extraction)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
ResearchOrchestrator.ts:665 📊 Agent progress: Extractor - 10% (Initializing)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
ExtractionAgent.ts:26 ⛏️ Extractor: Processing 15 chunks
ExtractionAgent.ts:58 📊 Processing batch 1/8 (chunks 1-2 of 15)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2590}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent PatternGenerator thinking data: {hasThinking: true, thinkingContentLength: 794, summaryLength: 103, thinkingPreview: "Okay, let's tackle this. The user wants to find the top 3 speed runs from Tyler's blog, but the data"}
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
extractFromBatch @ ExtractionAgent.ts:211
process @ ExtractionAgent.ts:60
executeAgentPipeline @ Orchestrator.ts:262
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2582}
ExtractionAgent.ts:212 🤖 LLM extraction response: <think>
Okay, let me start by reading the user's query and the text they provided. The user wants me to extract all the data from the text, following specific rules. The text is about Tyler's blog posts related to speed runs and GPT-2 training.

First, I need to check if there are any tables or stru
ExtractionAgent.ts:58 📊 Processing batch 2/8 (chunks 3-4 of 15)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2587}
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
extractFromBatch @ ExtractionAgent.ts:211
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 3328}
ExtractionAgent.ts:212 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all the data from the given text. First, I need to check the rules they provided. They mentioned extracting every piece of data, especially time values, numbers, records, and entries in tables. Also, I should format it exactly like the examples g
ExtractionAgent.ts:58 📊 Processing batch 3/8 (chunks 5-6 of 15)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2580}
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
extractFromBatch @ ExtractionAgent.ts:211
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1737}
ExtractionAgent.ts:212 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all the data from the given text. First, I need to read through the text carefully. The text is about Muon blog posts and some speedrunning information. The main points seem to be the leaderboard details and some technical info.

Starting with th
ExtractionAgent.ts:58 📊 Processing batch 4/8 (chunks 7-8 of 15)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2584}
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
extractFromBatch @ ExtractionAgent.ts:211
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 3068}
ExtractionAgent.ts:212 🤖 LLM extraction response: <think>
Okay, let me start by looking at the user's query and the text they provided. The user wants me to extract all the data from the given text, specifically the top 3 speed runs from Tyler's blog.

First, I need to check the text for any mentions of Tyler's blog and the time values. The text is
ExtractionAgent.ts:58 📊 Processing batch 5/8 (chunks 9-10 of 15)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2591}
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
extractFromBatch @ ExtractionAgent.ts:211
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1714}
ExtractionAgent.ts:212 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all data from the provided text. The text is a bit long, so I need to go through it carefully. The main points are about training steps, time values, and some technical terms like logit soft-capping.

First, looking at the text, there's a mention
ExtractionAgent.ts:58 📊 Processing batch 6/8 (chunks 11-12 of 15)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2584}
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
extractFromBatch @ ExtractionAgent.ts:211
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1963}
ExtractionAgent.ts:212 🤖 LLM extraction response: <think>
Okay, let me start by looking at the user's query and the text provided. The user wants me to extract all the data from the text, specifically from the part that talks about speed runs and Tyler's blog. The text is a mix of technical information about a model's performance and some architect
ExtractionAgent.ts:58 📊 Processing batch 7/8 (chunks 13-14 of 15)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2578}
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
extractFromBatch @ ExtractionAgent.ts:211
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 4033}
ExtractionAgent.ts:212 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all the data from the provided text. The text is a mix of different entries. First, I need to parse through it carefully.

Looking at the first part, there's a list of people like Joelle Barral, Zoubin Ghahramani, etc. Each has a "view online" en
ExtractionAgent.ts:58 📊 Processing batch 8/8 (chunks 15-15 of 15)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1780}
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
extractFromBatch @ ExtractionAgent.ts:211
process @ ExtractionAgent.ts:60
 ✅ Content generated successfully {responseLength: 1544}
 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all the data from the given text. The text is about improving the sequence length in their dataset and the two improvements made. The user query was about top 3 speed runs from Tyler's blog, but the text provided seems to be about dataset improve
 📊 Extraction Statistics:
 - Total extracted: 42
 - After deduplication: 26
ExtractionAgent.ts:109 - Items with time values: 22
ExtractionAgent.ts:110 - Table rows: 4
ExtractionAgent.ts:111 - Current records: 2
ExtractionAgent.ts:114 📈 Item types:
ExtractionAgent.ts:116   - current_record: 2
ExtractionAgent.ts:116   - table_row: 4
ExtractionAgent.ts:116   - time_data: 17
ExtractionAgent.ts:116   - list_item: 3
ExtractionAgent.ts:126 🔍 Sample time items:
ExtractionAgent.ts:128   - Current speed run record → 3.14 minutes
ExtractionAgent.ts:128   - Entry 1: Initial baseline → 8.13 hours
ExtractionAgent.ts:128   - Entry 2: Architectural changes → 7.51 hours
ExtractionAgent.ts:86 ✅ Extraction complete: 26 items found
Orchestrator.ts:269 🔍 Agent Extractor reasoning length: 1134
Orchestrator.ts:273 🧠 Thinking extraction for Extractor: {hasThinking: false, thinkingLength: 0, reasoningSnippet: '📊 Starting extraction process for 15 chunks...\n\n\uD83C…tanding\n- Looking for: User wants ranking about s'}
Orchestrator.ts:297 ❌ No thinking found for Extractor, reasoning starts with: 📊 Starting extraction process for 15 chunks...

🎯 Extraction Strategy:
- Processing in batches of 
ResearchOrchestrator.ts:712 ✅ Agent completed: Extractor
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
Orchestrator.ts:244 🤖 Executing agent: Synthesizer (4/4)
ResearchOrchestrator.ts:622 🚀 Agent started: Synthesizer (synthesis)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
ResearchOrchestrator.ts:665 📊 Agent progress: Synthesizer - 10% (Initializing)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
SynthesisAgent.ts:51 📝 Synthesizer: Creating final answer from 26 items
SynthesisAgent.ts:691 🧹 Starting content cleaning and deduplication for 26 items
SynthesisAgent.ts:715 🧹 After content cleaning: 26 items (removed 0 malformed)
SynthesisAgent.ts:763 🗑️ Removing duplicate: "Current speed run record..." (similar to existing)
SynthesisAgent.ts:767 🧹 After deduplication: 25 items (removed 1 duplicates)
SynthesisAgent.ts:68 🧹 After cleaning: 25 items remain
SynthesisAgent.ts:951 📊 Found 4 table items out of 25 total
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 892}
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
groupAndRankItems @ SynthesisAgent.ts:981
process @ SynthesisAgent.ts:79
executeAgentPipeline @ Orchestrator.ts:262
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 3295}
SynthesisAgent.ts:982 🤖 LLM grouping analysis: <think>
Okay, let me try to figure this out. The user wants me to group the extracted items intelligently based on the three criteria provided. First, I need to understand the items mentioned and thei
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1256}
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
classifyItemsWithLLM @ SynthesisAgent.ts:146
process @ SynthesisAgent.ts:82
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2826}
SynthesisAgent.ts:147 🤖 LLM classification response: <think>
Okay, let's start by understanding the user's request. They want me to classify each item as either a current record/achievement, historical data, or other relevant context, based on the given
SynthesisAgent.ts:938 📊 Minimal filtering: 4 → 4 (kept 100%)
SynthesisAgent.ts:109 ✅ Synthesis complete: 2261 characters
Orchestrator.ts:269 🔍 Agent Synthesizer reasoning length: 405
Orchestrator.ts:273 🧠 Thinking extraction for Synthesizer: {hasThinking: false, thinkingLength: 0, reasoningSnippet: '✅ Synthesis Complete!\n\n📊 Report Statistics:\n- Cri… 2261 characters\n\n🎯 The research report includes'}
Orchestrator.ts:297 ❌ No thinking found for Synthesizer, reasoning starts with: ✅ Synthesis Complete!

📊 Report Statistics:
- Critical findings identified: 3
- Total data points a
ResearchOrchestrator.ts:712 ✅ Agent completed: Synthesizer
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754224411253_2_ea7b4a14_in_progress
Orchestrator.ts:68 📝 Final synthesis: {hasAnswer: true, answerLength: 2261, preview: `## 🎯 Critical Information\n\n**Query**: "give me top 3 speed runs from Tyler's blog"\n**Found**: 3 rel`}
ResearchOrchestrator.ts:775 ✅ Multi-agent system generated answer with 4 agent sub-steps
useResearch.ts:942 📋 Step update: synthesis - completed - ID: synthesis_1754224411253_2_ea7b4a14
useResearch.ts:964 📋 Adding new step: synthesis_1754224411253_2_ea7b4a14
ResearchSteps.tsx:505 🚫 Preventing duplicate step addition: synthesis_1754224411253_2_ea7b4a14
ResearchOrchestrator.ts:203 ✅ Research completed: 3 steps, 15 sources, 197947ms
useResearch.ts:994 ✅ Intelligent research completed: {steps: 3, sources: 15, confidence: 0.5352170707171373, processingTime: 197947}
ResearchSteps.tsx:505 🚫 Preventing duplicate step addition: synthesis_1754224411253_2_ea7b4a14
PerplexityStyleResearch.tsx:198 🎭 UI - Agent DataInspector thinking data: {hasThinking: true, thinkingContentLength: 1365, summaryLength: 103, thinkingPreview: "Okay, let me break down the user's query and the data samples provided.\n\nFirst, the user's question "}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent PatternGenerator thinking data: {hasThinking: true, thinkingContentLength: 794, summaryLength: 103, thinkingPreview: "Okay, let's tackle this. The user wants to find the top 3 speed runs from Tyler's blog, but the data"}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent DataInspector thinking data: {hasThinking: true, thinkingContentLength: 1365, summaryLength: 103, thinkingPreview: "Okay, let me break down the user's query and the data samples provided.\n\nFirst, the user's question "}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent PatternGenerator thinking data: {hasThinking: true, thinkingContentLength: 794, summaryLength: 103, thinkingPreview: "Okay, let's tackle this. The user wants to find the top 3 speed runs from Tyler's blog, but the data"}
scheduler.development.js:14 [Violation] 'message' handler took 180ms
scheduler.development.js:14 [Violation] 'message' handler took 152ms
hot-reloader-client.js:197 [Fast Refresh] rebuilding
scheduler.development.js:14 [Violation] 'message' handler took 155ms
scheduler.development.js:14 [Violation] 'message' handler took 201ms
scheduler.development.js:14 [Violation] 'message' handler took 448ms
webpack.js?v=1754224369509:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/13d7f1abf429f1cd.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754224369509:1367
Promise.then
hotCheck @ webpack.js?v=1754224369509:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
scheduler.development.js:14 [Violation] 'message' handler took 158ms
webpack.js?v=1754224369509:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/0f0f67bdf79fef8f.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754224369509:1367
Promise.then
hotCheck @ webpack.js?v=1754224369509:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleApplyUpdates @ hot-reloader-client.js:123
eval @ hot-reloader-client.js:143
Promise.then
tryApplyUpdatesWebpack @ hot-reloader-client.js:142
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 7129ms
fetch-server-response.js:163 Fetch finished loading: GET "http://localhost:3000/deep-research?_rsc=1kjzf".
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
