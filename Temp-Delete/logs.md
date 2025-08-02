scheduler.development.js:14 [Violation] 'message' handler took 156ms
Fetch failed loading: GET "http://localhost:3000/deep-research?_rsc=1kjzf".
 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754128922596&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=7&sid=1754127522&sct=5&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&_et=80470&tfd=378848".
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
analytics.ts:177 [Violation] Only request geolocation information in response to a user gesture.
collectLocationInfo @ analytics.ts:177
Analytics @ analytics.ts:75
eval @ analytics.ts:556
(app-pages-browser)/./src/lib/analytics.ts @ layout.js:7974
options.factory @ webpack.js?v=1754129294459:712
__webpack_require__ @ webpack.js?v=1754129294459:37
fn @ webpack.js?v=1754129294459:369
eval @ Analytics.tsx:10
(app-pages-browser)/./src/components/analytics/Analytics.tsx @ layout.js:7820
options.factory @ webpack.js?v=1754129294459:712
__webpack_require__ @ webpack.js?v=1754129294459:37
fn @ webpack.js?v=1754129294459:369
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
options.factory @ webpack.js?v=1754129294459:712
__webpack_require__ @ webpack.js?v=1754129294459:37
fn @ webpack.js?v=1754129294459:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7842
options.factory @ webpack.js?v=1754129294459:712
__webpack_require__ @ webpack.js?v=1754129294459:37
fn @ webpack.js?v=1754129294459:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false!:11
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false! @ layout.js:4998
options.factory @ webpack.js?v=1754129294459:712
__webpack_require__ @ webpack.js?v=1754129294459:37
__webpack_exec__ @ layout.js:8073
(anonymous) @ layout.js:8074
__webpack_require__.O @ webpack.js?v=1754129294459:84
(anonymous) @ layout.js:8075
webpackJsonpCallback @ webpack.js?v=1754129294459:1388
(anonymous) @ layout.js:9
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.16845378936265, longitude: 72.84642701441247, …}
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
scheduler.development.js:14 [Violation] 'message' handler took 295ms
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
analytics.ts:305 ✅ GA4: Successfully initialized with enhanced tracking
Analytics.tsx:20 ✅ Analytics: GA4 initialized with user consent
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
analytics.ts:363 📊 GA4: Page view tracked - DeepResearch-TimeCapsule
Analytics.tsx:69 📊 Analytics: Tracked page view - DeepResearch-TimeCapsule (/deep-research)
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754129300961&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=1&sid=1754127522&sct=5&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=6640".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
(anonymous) @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:916
(anonymous) @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:935
(anonymous) @ js?id=G-V1B8R98P79:935
(anonymous) @ js?id=G-V1B8R98P79:931
un @ js?id=G-V1B8R98P79:448
Ap @ js?id=G-V1B8R98P79:469
(anonymous) @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:662
Promise.then
fz @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:947
v @ js?id=G-V1B8R98P79:488
Dn @ js?id=G-V1B8R98P79:450
dr @ js?id=G-V1B8R98P79:488
(anonymous) @ js?id=G-V1B8R98P79:492
(anonymous) @ js?id=G-V1B8R98P79:490
Vq @ js?id=G-V1B8R98P79:485
event @ js?id=G-V1B8R98P79:752
WD @ js?id=G-V1B8R98P79:758
(anonymous) @ js?id=G-V1B8R98P79:764
window.gtag @ analytics.ts:279
trackEvent @ analytics.ts:384
initializeGA4 @ analytics.ts:308
await in initializeGA4
Analytics.useEffect.initializeAnalytics @ Analytics.tsx:18
Analytics.useEffect @ Analytics.tsx:32
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
await in startImmediateBackgroundDownload
init @ VectorStore.ts:256
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
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754129300961&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105087538~105087540~105103161~105103163&sr=2240x1260&cid=602849859.1754048070&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&sid=1754127522&sct=5&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-02T10%3A08%3A20.968Z&epn.page_duration=1&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x869&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&_et=1&tfd=6644".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
(anonymous) @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:916
(anonymous) @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:935
(anonymous) @ js?id=G-V1B8R98P79:935
(anonymous) @ js?id=G-V1B8R98P79:931
un @ js?id=G-V1B8R98P79:448
Ap @ js?id=G-V1B8R98P79:469
(anonymous) @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:662
fz @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:947
v @ js?id=G-V1B8R98P79:488
Dn @ js?id=G-V1B8R98P79:450
dr @ js?id=G-V1B8R98P79:488
(anonymous) @ js?id=G-V1B8R98P79:492
(anonymous) @ js?id=G-V1B8R98P79:490
Vq @ js?id=G-V1B8R98P79:485
event @ js?id=G-V1B8R98P79:752
WD @ js?id=G-V1B8R98P79:758
(anonymous) @ js?id=G-V1B8R98P79:764
SD @ js?id=G-V1B8R98P79:764
$D @ js?id=G-V1B8R98P79:764
mJ @ js?id=G-V1B8R98P79:855
hJ @ js?id=G-V1B8R98P79:854
(anonymous) @ js?id=G-V1B8R98P79:858
setTimeout
Qc @ js?id=G-V1B8R98P79:238
pJ @ js?id=G-V1B8R98P79:858
(anonymous) @ js?id=G-V1B8R98P79:349
(anonymous) @ js?id=G-V1B8R98P79:253
Ya @ js?id=G-V1B8R98P79:217
(anonymous) @ js?id=G-V1B8R98P79:255
Rd @ js?id=G-V1B8R98P79:270
(anonymous) @ js?id=G-V1B8R98P79:253
Ya @ js?id=G-V1B8R98P79:217
Xa @ js?id=G-V1B8R98P79:216
(anonymous) @ js?id=G-V1B8R98P79:277
(anonymous) @ js?id=G-V1B8R98P79:253
Ya @ js?id=G-V1B8R98P79:217
(anonymous) @ js?id=G-V1B8R98P79:219
bf @ js?id=G-V1B8R98P79:288
(anonymous) @ js?id=G-V1B8R98P79:789
$f @ js?id=G-V1B8R98P79:303
e @ js?id=G-V1B8R98P79:734
YC @ js?id=G-V1B8R98P79:735
bD @ js?id=G-V1B8R98P79:740
WD @ js?id=G-V1B8R98P79:759
(anonymous) @ js?id=G-V1B8R98P79:764
window.gtag @ analytics.ts:279
initializeGA4 @ analytics.ts:283
await in initializeGA4
Analytics.useEffect.initializeAnalytics @ Analytics.tsx:18
Analytics.useEffect @ Analytics.tsx:32
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
useDocuments.ts:72 📊 Document status updated: {documents: 1, totalSize: '1.5 MB', totalChunks: 18, totalVectors: 18, avgChunksPerDoc: '18.0', …}
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754129300961&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=3&sid=1754127522&sct=5&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=scroll&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&epn.percent_scrolled=90&_et=2&tfd=6769".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
(anonymous) @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:916
(anonymous) @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:935
(anonymous) @ js?id=G-V1B8R98P79:935
(anonymous) @ js?id=G-V1B8R98P79:931
un @ js?id=G-V1B8R98P79:448
Ap @ js?id=G-V1B8R98P79:469
(anonymous) @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:662
fz @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:947
v @ js?id=G-V1B8R98P79:488
Dn @ js?id=G-V1B8R98P79:450
dr @ js?id=G-V1B8R98P79:488
(anonymous) @ js?id=G-V1B8R98P79:492
(anonymous) @ js?id=G-V1B8R98P79:490
Vq @ js?id=G-V1B8R98P79:485
event @ js?id=G-V1B8R98P79:752
WD @ js?id=G-V1B8R98P79:758
(anonymous) @ js?id=G-V1B8R98P79:764
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
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754129300961&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&dt=DeepResearch-TimeCapsule&dl=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&sid=1754127522&sct=5&seg=1&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=research&ep.page_type=application&ep.pathname=%2Fdeep-research&ep.consent_analytics=true&ep.consent_functional=true&_et=121&tfd=6773".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
(anonymous) @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:916
(anonymous) @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:935
(anonymous) @ js?id=G-V1B8R98P79:935
(anonymous) @ js?id=G-V1B8R98P79:931
un @ js?id=G-V1B8R98P79:448
Ap @ js?id=G-V1B8R98P79:469
(anonymous) @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:662
fz @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:931
c @ js?id=G-V1B8R98P79:947
v @ js?id=G-V1B8R98P79:488
Dn @ js?id=G-V1B8R98P79:450
dr @ js?id=G-V1B8R98P79:488
(anonymous) @ js?id=G-V1B8R98P79:492
(anonymous) @ js?id=G-V1B8R98P79:490
Vq @ js?id=G-V1B8R98P79:485
event @ js?id=G-V1B8R98P79:752
WD @ js?id=G-V1B8R98P79:758
(anonymous) @ js?id=G-V1B8R98P79:764
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
EmbeddingService.ts:129 ✅ Model loaded successfully
EmbeddingService.ts:147 ✅ Model loaded from cache instantly
VectorStore.ts:1477 📊 Xenova progress: Embedding model ready (100%)
EmbeddingService.ts:156 ✅ EmbeddingService initialized successfully
VectorStore.ts:1483 ✅ Xenova embedding service ready
VectorStore.ts:1434 ✅ Immediate background download completed
VectorStore.ts:265 ✅ Xenova model loaded from cache - all features ready
VectorStore.ts:274 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754129294459:160
options.factory @ webpack.js?v=1754129294459:712
__webpack_require__ @ webpack.js?v=1754129294459:37
fn @ webpack.js?v=1754129294459:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754129294459:182
options.factory @ webpack.js?v=1754129294459:712
__webpack_require__ @ webpack.js?v=1754129294459:37
__webpack_exec__ @ main-app.js?v=1754129294459:2824
(anonymous) @ main-app.js?v=1754129294459:2825
webpackJsonpCallback @ webpack.js?v=1754129294459:1388
(anonymous) @ main-app.js?v=1754129294459:9
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754129294459:160
options.factory @ webpack.js?v=1754129294459:712
__webpack_require__ @ webpack.js?v=1754129294459:37
fn @ webpack.js?v=1754129294459:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754129294459:182
options.factory @ webpack.js?v=1754129294459:712
__webpack_require__ @ webpack.js?v=1754129294459:37
__webpack_exec__ @ main-app.js?v=1754129294459:2824
(anonymous) @ main-app.js?v=1754129294459:2825
webpackJsonpCallback @ webpack.js?v=1754129294459:1388
(anonymous) @ main-app.js?v=1754129294459:9
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
useOllamaConnection.ts:136 ✅ Ollama connection test passed, models: (4) ['tinyllama:1.1b', 'qwen3:0.6b', 'llama3.2:1b', 'llama3.1:8b']
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754129300961&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105087538~105087540~105103161~105103163&sr=2240x1260&cid=602849859.1754048070&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=5&sid=1754127522&sct=5&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-02T10%3A08%3A21.111Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x869&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&_et=2&tfd=11775".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
(anonymous) @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:916
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
RAGTracker.ts:71 🔍 RAG Query started: rag_1754129329069_rkwjwqnau - "give me top 3 speed run from tyler's blog..."
VectorStore.ts:743 🔍 RAG Query rag_1754129329069_rkwjwqnau: Searching for "give me top 3 speed run from tyler's blog" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (41 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 113ms
VectorStore.ts:751 🧠 RAG Query rag_1754129329069_rkwjwqnau: Generated embedding in 113ms
VectorStore.ts:758 📚 RAG Query rag_1754129329069_rkwjwqnau: Retrieved 1 documents in 1ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754129329069_rkwjwqnau - 15 results, avg similarity: 0.319, 115ms
VectorStore.ts:811 ✅ RAG Query rag_1754129329069_rkwjwqnau completed: {totalTime: '115ms', breakdown: {…}, results: '15/17 (filtered by limit)', avgSimilarity: '0.319', threshold: 0.1, …}
useResearch.ts:325 🔍 RAG Search completed: 1 documents found
prompt-input.tsx:514 🔍 Web search skipped: {webSearchEnabled: false, hasWebSearch: true, configured: true}
useResearch.ts:938 🔬 Starting intelligent research for: "give me top 3 speed run from tyler's blog"
ResearchOrchestrator.ts:104 🔬 Starting research for: "give me top 3 speed run from tyler's blog"
useResearch.ts:942 📋 Step update: analysis - in_progress - ID: analysis_1754129329241_1_c61b6918
useResearch.ts:964 📋 Adding new step: analysis_1754129329241_1_c61b6918
QueryIntelligenceService.ts:155 🧠 Analyzing query: "give me top 3 speed run from tyler's blog"
QueryIntelligenceService.ts:159 📋 Rule-based analysis: performance (0.8)
QueryIntelligenceService.ts:188 ✅ Query analysis complete: 8 queries in 1ms
useResearch.ts:942 📋 Step update: analysis - completed - ID: analysis_1754129329241_1_c61b6918
useResearch.ts:964 📋 Adding new step: analysis_1754129329241_1_c61b6918
ResearchSteps.tsx:505 🚫 Preventing duplicate step addition: analysis_1754129329241_1_c61b6918
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 338}
ResearchSteps.tsx:505 🚫 Preventing duplicate step addition: analysis_1754129329241_1_c61b6918
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754129300961&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=602849859.1754048070&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=6&sid=1754127522&sct=5&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=28182&tfd=39958".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
(anonymous) @ js?id=G-V1B8R98P79:919
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
planResearchStrategy @ ResearchOrchestrator.ts:251
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
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1298}
ResearchOrchestrator.ts:896 🔍 Parsing LLM response: <think>
Okay, let's see. The user wants the top 3 speed run from Tyler's blog, and they provided an example in JSON format. The example response starts with a type "rag_search" and reasoning. So my job is to create a similar structure.

First, I need to figure out what the query is asking. The user ...
 🧠 Found <think> tags, extracting JSON after </think>
 ✅ Extracted JSON after </think> tags
 ✅ Successfully parsed 1 valid steps
 🤖 LLM planned 1 research steps
 📋 Research plan: 1 steps planned
 📋 Step update: rag_search - in_progress - ID: rag_search_1754129335230_1_n5dcp
 📋 Adding new step: rag_search_1754129335230_1_n5dcp
 📚 Executing RAG search with 8 queries: (8) ['benchmark results', 'performance metrics', 'training speed', 'optimization results', 'execution time', 'throughput data', 'speed comparison', 'performance analysis']
 🔍 RAG Query started: rag_1754129335230_3r719kuh7 - "benchmark results..."
 🔍 RAG Query rag_1754129335230_3r719kuh7: Searching for "benchmark results" with threshold: 0.1
 🔍 Generating embedding for text (17 chars)...
 ✅ Generated embedding: 384 dimensions in 13ms
 🧠 RAG Query rag_1754129335230_3r719kuh7: Generated embedding in 13ms
 📚 RAG Query rag_1754129335230_3r719kuh7: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754129335230_3r719kuh7 - 10 results, avg similarity: 0.316, 13ms
 ✅ RAG Query rag_1754129335230_3r719kuh7 completed: {totalTime: '13ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.316', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754129335244_vskd46m7s - "performance metrics..."
 🔍 RAG Query rag_1754129335244_vskd46m7s: Searching for "performance metrics" with threshold: 0.1
 🔍 Generating embedding for text (19 chars)...
 ✅ Generated embedding: 384 dimensions in 12ms
 🧠 RAG Query rag_1754129335244_vskd46m7s: Generated embedding in 12ms
 📚 RAG Query rag_1754129335244_vskd46m7s: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754129335244_vskd46m7s - 10 results, avg similarity: 0.304, 12ms
 ✅ RAG Query rag_1754129335244_vskd46m7s completed: {totalTime: '12ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.304', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754129335256_mkzb0xlm3 - "training speed..."
 🔍 RAG Query rag_1754129335256_mkzb0xlm3: Searching for "training speed" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (14 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 9ms
VectorStore.ts:751 🧠 RAG Query rag_1754129335256_mkzb0xlm3: Generated embedding in 9ms
VectorStore.ts:758 📚 RAG Query rag_1754129335256_mkzb0xlm3: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754129335256_mkzb0xlm3 - 10 results, avg similarity: 0.361, 10ms
VectorStore.ts:811 ✅ RAG Query rag_1754129335256_mkzb0xlm3 completed: {totalTime: '10ms', breakdown: {…}, results: '10/16 (filtered by limit)', avgSimilarity: '0.361', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754129335266_0dxf7jtk3 - "optimization results..."
VectorStore.ts:743 🔍 RAG Query rag_1754129335266_0dxf7jtk3: Searching for "optimization results" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (20 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 11ms
VectorStore.ts:751 🧠 RAG Query rag_1754129335266_0dxf7jtk3: Generated embedding in 11ms
VectorStore.ts:758 📚 RAG Query rag_1754129335266_0dxf7jtk3: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754129335266_0dxf7jtk3 - 10 results, avg similarity: 0.278, 11ms
VectorStore.ts:811 ✅ RAG Query rag_1754129335266_0dxf7jtk3 completed: {totalTime: '11ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.278', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754129335277_zeqhl5eoc - "execution time..."
VectorStore.ts:743 🔍 RAG Query rag_1754129335277_zeqhl5eoc: Searching for "execution time" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (14 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 9ms
VectorStore.ts:751 🧠 RAG Query rag_1754129335277_zeqhl5eoc: Generated embedding in 9ms
VectorStore.ts:758 📚 RAG Query rag_1754129335277_zeqhl5eoc: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754129335277_zeqhl5eoc - 10 results, avg similarity: 0.279, 9ms
VectorStore.ts:811 ✅ RAG Query rag_1754129335277_zeqhl5eoc completed: {totalTime: '9ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.279', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754129335286_knkyll3jj - "throughput data..."
VectorStore.ts:743 🔍 RAG Query rag_1754129335286_knkyll3jj: Searching for "throughput data" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (15 chars)...
 ✅ Generated embedding: 384 dimensions in 11ms
 🧠 RAG Query rag_1754129335286_knkyll3jj: Generated embedding in 11ms
 📚 RAG Query rag_1754129335286_knkyll3jj: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754129335286_knkyll3jj - 10 results, avg similarity: 0.225, 11ms
 ✅ RAG Query rag_1754129335286_knkyll3jj completed: {totalTime: '11ms', breakdown: {…}, results: '10/15 (filtered by limit)', avgSimilarity: '0.225', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754129335297_drnsxfvm2 - "speed comparison..."
 🔍 RAG Query rag_1754129335297_drnsxfvm2: Searching for "speed comparison" with threshold: 0.1
 🔍 Generating embedding for text (16 chars)...
 ✅ Generated embedding: 384 dimensions in 10ms
 🧠 RAG Query rag_1754129335297_drnsxfvm2: Generated embedding in 10ms
 📚 RAG Query rag_1754129335297_drnsxfvm2: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754129335297_drnsxfvm2 - 10 results, avg similarity: 0.264, 10ms
 ✅ RAG Query rag_1754129335297_drnsxfvm2 completed: {totalTime: '10ms', breakdown: {…}, results: '10/16 (filtered by limit)', avgSimilarity: '0.264', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754129335307_k3izwdj91 - "performance analysis..."
VectorStore.ts:743 🔍 RAG Query rag_1754129335307_k3izwdj91: Searching for "performance analysis" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (20 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 10ms
VectorStore.ts:751 🧠 RAG Query rag_1754129335307_k3izwdj91: Generated embedding in 10ms
VectorStore.ts:758 📚 RAG Query rag_1754129335307_k3izwdj91: Retrieved 1 documents in 1ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754129335307_k3izwdj91 - 10 results, avg similarity: 0.288, 11ms
VectorStore.ts:811 ✅ RAG Query rag_1754129335307_k3izwdj91 completed: {totalTime: '11ms', breakdown: {…}, results: '10/17 (filtered by limit)', avgSimilarity: '0.288', threshold: 0.1, …}
ResearchOrchestrator.ts:438 📚 RAG search found 15 unique results from 8 queries
ResearchOrchestrator.ts:487 ✅ RAG search found 15 sources
useResearch.ts:942 📋 Step update: rag_search - completed - ID: rag_search_1754129335230_1_n5dcp
useResearch.ts:964 📋 Adding new step: rag_search_1754129335230_1_n5dcp
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754129335320_2_fd6ab321
useResearch.ts:964 📋 Adding new step: synthesis_1754129335320_2_fd6ab321
ResearchOrchestrator.ts:606 🤖 Using multi-agent system for intelligent extraction
AgentRegistry.ts:21 📝 Registered agent: QueryPlanner - Expands queries based on intent and domain understanding
AgentRegistry.ts:21 📝 Registered agent: DataInspector - Analyzes RAG chunks to understand data structure and quality
AgentRegistry.ts:21 📝 Registered agent: PatternGenerator - Creates extraction strategies based on data inspection
AgentRegistry.ts:21 📝 Registered agent: Extractor - Executes extraction using generated patterns
AgentRegistry.ts:21 📝 Registered agent: Synthesizer - Consolidates extracted data into a coherent answer
Orchestrator.ts:50 🎯 Orchestrator starting research for: "give me top 3 speed run from tyler's blog"
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 456}
ResearchSteps.tsx:505 🚫 Preventing duplicate step addition: rag_search_1754129335230_1_n5dcp
ResearchSteps.tsx:505 🚫 Preventing duplicate step addition: rag_search_1754129335230_1_n5dcp
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
synthesizeAnswer @ ResearchOrchestrator.ts:635
executeResearch @ ResearchOrchestrator.ts:157
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1107}
Orchestrator.ts:97 🤖 Query understanding: <think>
Okay, let's see. The user is asking for the top 3 speed runs from Tyler's blog. First, I need to break down the query into three parts as per their instructions.

1. What is the user looking f
Orchestrator.ts:131 🎯 Detected ranking query: "give me top 3 speed run from tyler's blog" (keywords found in response)
Orchestrator.ts:136 📊 Query type determined: ranking for "give me top 3 speed run from tyler's blog"
Orchestrator.ts:114 📊 Query analysis complete: {intent: 'User wants ranking about speed_runs', domain: 'speed_runs', requirements: Array(4), queryType: 'ranking'}
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1202}
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
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2260}
Orchestrator.ts:191 📚 RAG summary: <think>
Okay, let me start by understanding what the user is asking. They want a summary of the cont...
Orchestrator.ts:206 📋 Using optimized pipeline for small models: (4) ['DataInspector', 'PatternGenerator', 'Extractor', 'Synthesizer']
Orchestrator.ts:244 🤖 Executing agent: DataInspector (1/4)
ResearchOrchestrator.ts:615 🚀 Agent started: DataInspector (data_inspector)
ResearchOrchestrator.ts:618 📊 Agent progress: DataInspector - 10% (Initializing)
DataInspectorAgent.ts:24 🔎 DataInspector: Analyzing 15 chunks
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2951}
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
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2972}
DataInspectorAgent.ts:61 🤖 Data inspection: <think>
Okay, let's start by analyzing the user's query and the provided data samples. The user is asking for the top 3 speed run results from Tyler's blog.

First, looking at the data samples, sample 2 has content about Tyler's blog posts. It mentions Nano GPT Speedrun, the speed of training GPT-2 
DataInspectorAgent.ts:98 ✅ Generated 2 patterns from inspection
ResearchOrchestrator.ts:624 ✅ Agent completed: DataInspector
Orchestrator.ts:244 🤖 Executing agent: PatternGenerator (2/4)
ResearchOrchestrator.ts:615 🚀 Agent started: PatternGenerator (pattern_generator)
ResearchOrchestrator.ts:618 📊 Agent progress: PatternGenerator - 10% (Initializing)
PatternGeneratorAgent.ts:24 🎯 PatternGenerator: Creating extraction strategies
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 500}
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
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2443}
PatternGeneratorAgent.ts:49 🤖 Strategy generation: <think>
Okay, so the user wants to extract information about top 3 speed runs from a blog post, but they want to avoid performance metrics. Let me break this down.

First, what exactly should we look for? Well, the user mentioned "top 3 speed runs", so we need to identify the top three entries. But 
PatternGeneratorAgent.ts:87 ✅ Generated 2 extraction strategies
ResearchOrchestrator.ts:624 ✅ Agent completed: PatternGenerator
Orchestrator.ts:244 🤖 Executing agent: Extractor (3/4)
ResearchOrchestrator.ts:615 🚀 Agent started: Extractor (extraction)
ResearchOrchestrator.ts:618 📊 Agent progress: Extractor - 10% (Initializing)
ExtractionAgent.ts:24 ⛏️ Extractor: Processing 15 chunks
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2448}
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
extractFromBatch @ ExtractionAgent.ts:84
process @ ExtractionAgent.ts:38
executeAgentPipeline @ Orchestrator.ts:262
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2297}
ExtractionAgent.ts:85 🤖 LLM extraction response: <think>
Okay, let's see. The user wants the top 3 speed run results from Tyler's blog post. First, I need to read the given text carefully.

The text starts by mentioning effective training time reduction. Then there's a list of points: no gradient clipping, trapezoidal learning rate, and a lot of r
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2445}
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
extractFromBatch @ ExtractionAgent.ts:84
process @ ExtractionAgent.ts:38
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1624}
ExtractionAgent.ts:85 🤖 LLM extraction response: <think>
Okay, let me try to figure out what the user is asking for. The user says, "give me top 3 speed run from tyler's blog". The text provided is a blog post about various optimizations in training models. 

First, I need to look through the text and find any mention of speed runs or similar term
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2438}
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
extractFromBatch @ ExtractionAgent.ts:84
process @ ExtractionAgent.ts:38
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1756}
ExtractionAgent.ts:85 🤖 LLM extraction response: <think>
Okay, let's see. The user is asking for the top 3 speed run records from Tyler's blog. First, I need to look through the provided text and find any mentions of speed runs.

The text starts with several blog posts about Muon, mentioning that Keller Jordan's blog has a leaderboard. Then there'
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2442}
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
extractFromBatch @ ExtractionAgent.ts:84
process @ ExtractionAgent.ts:38
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1474}
ExtractionAgent.ts:85 🤖 LLM extraction response: <think>
Okay, let me try to figure this out. The user is asking for the top 3 speed runs from Tyler's blog. The text provided is a mix of various run times and some architectural changes. 

First, I need to look through the text for any mention of speed runs. The text has several parts with differen
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2449}
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
extractFromBatch @ ExtractionAgent.ts:84
process @ ExtractionAgent.ts:38
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 4214}
ExtractionAgent.ts:85 🤖 LLM extraction response: <think>
Okay, let me start by reading the user's request carefully. They want me to find the answer based on the given text. The user mentioned "top 3 speed run from tyler's blog" and the text provided is about training speedrun and some research papers. 

First, I need to scan through the text to i
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2442}
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
extractFromBatch @ ExtractionAgent.ts:84
process @ ExtractionAgent.ts:38
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1936}
ExtractionAgent.ts:85 🤖 LLM extraction response: <think>
Okay, let's see. The user is asking for the top 3 speed run records from Tyler's blog. First, I need to read the provided text carefully.

The text mentions several changes and their impact, like architectural changes, training tweaks, etc. There's a part that says "Run 1: 3.5 hours" and "co
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2436}
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
extractFromBatch @ ExtractionAgent.ts:84
process @ ExtractionAgent.ts:38
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1803}
ExtractionAgent.ts:85 🤖 LLM extraction response: <think>
Okay, let's see. The user wants the top 3 speed run records from the given text. First, I need to read through the text carefully.

The text has a list of authors and their works. I notice there's a mention of "Gemma 2: Improving Open Language Models..." and "Old Optimizer, New Norm: An Anth
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1638}
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
extractFromBatch @ ExtractionAgent.ts:84
process @ ExtractionAgent.ts:38
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1254}
ExtractionAgent.ts:85 🤖 LLM extraction response: <think>
Okay, let's see. The user wants to find what they're looking for based on the provided text. The user's query is "give me top 3 speed run from tyler's blog". First, I need to look through the text and find any mention of speed runs or related terms.

Looking at the text, there's a mention of
ExtractionAgent.ts:50 ✅ Extraction complete: 15 items found
ResearchOrchestrator.ts:624 ✅ Agent completed: Extractor
Orchestrator.ts:244 🤖 Executing agent: Synthesizer (4/4)
ResearchOrchestrator.ts:615 🚀 Agent started: Synthesizer (synthesis)
ResearchOrchestrator.ts:618 📊 Agent progress: Synthesizer - 10% (Initializing)
SynthesisAgent.ts:24 📝 Synthesizer: Creating final answer from 15 items
SynthesisAgent.ts:243 📊 Filtered items: 13 → 11 (removed 2 irrelevant)
SynthesisAgent.ts:43 ✅ Synthesis complete: 114 characters
ResearchOrchestrator.ts:624 ✅ Agent completed: Synthesizer
Orchestrator.ts:68 📝 Final synthesis: {hasAnswer: true, answerLength: 114, preview: 'Based on the search results, here are the top 3 speed runs:\n\n1. completed in 45 minutes\n2. 45 minute'}
ResearchOrchestrator.ts:641 ✅ Multi-agent system generated answer with 4 agent sub-steps
useResearch.ts:942 📋 Step update: synthesis - completed - ID: synthesis_1754129335320_2_fd6ab321
useResearch.ts:964 📋 Adding new step: synthesis_1754129335320_2_fd6ab321
ResearchSteps.tsx:505 🚫 Preventing duplicate step addition: synthesis_1754129335320_2_fd6ab321
ResearchOrchestrator.ts:196 ✅ Research completed: 3 steps, 15 sources, 137820ms
useResearch.ts:994 ✅ Intelligent research completed: {steps: 3, sources: 15, confidence: 0.5352170707171373, processingTime: 137820}
ResearchSteps.tsx:505 🚫 Preventing duplicate step addition: synthesis_1754129335320_2_fd6ab321
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
