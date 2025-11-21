 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1763729338971&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=368304457.1763727821&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=6&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~115583767~115938465~115938469~116184927~116184929~116217636~116217638&sid=1763727821&sct=1&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&_et=50979&tfd=998020".
bd @ js:277
Cl @ js:443
SN @ js:970
k.flush @ js:977
k.flush @ js:993
(anonymous) @ js:1004
(anonymous) @ js:942
(anonymous) @ js:941
Navigated to http://localhost:3000/ai-frames
installHook.js:1 -------------- RxDB dev-mode warning -------------------------------
you are seeing this because you use the RxDB dev-mode plugin https://rxdb.info/dev-mode.html?console=dev-mode 
This is great in development mode, because it will run many checks to ensure
that you use RxDB correct. If you see this in production mode,
you did something wrong because the dev-mode plugin will decrease the performance.

🤗 Hint: To get the most out of RxDB, check out the Premium Plugins
to get access to faster storages and more professional features: https://rxdb.info/premium/?console=dev-mode 

You can disable this warning by calling disableWarnings() from the dev-mode plugin.
---------------------------------------------------------------------
overrideMethod @ installHook.js:1
init @ index.js:73
addRxPlugin @ plugin.js:75
eval @ VectorStore.ts:23
(app-pages-browser)/./src/components/VectorStore/VectorStore.ts @ layout.js:7215
options.factory @ webpack.js?v=1763730319684:712
__webpack_require__ @ webpack.js?v=1763730319684:37
fn @ webpack.js?v=1763730319684:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7248
options.factory @ webpack.js?v=1763730319684:712
__webpack_require__ @ webpack.js?v=1763730319684:37
fn @ webpack.js?v=1763730319684:369
eval @ ClientAppProviders.tsx:8
(app-pages-browser)/./src/components/providers/ClientAppProviders.tsx @ layout.js:7226
options.factory @ webpack.js?v=1763730319684:712
__webpack_require__ @ webpack.js?v=1763730319684:37
fn @ webpack.js?v=1763730319684:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FClientAppProviders.tsx%22%2C%22ids%22%3A%5B%22ClientAppProviders%22%5D%7D&server=false!:5
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FClientAppProviders.tsx%22%2C%22ids%22%3A%5B%22ClientAppProviders%22%5D%7D&server=false! @ layout.js:4591
options.factory @ webpack.js?v=1763730319684:712
__webpack_require__ @ webpack.js?v=1763730319684:37
__webpack_exec__ @ layout.js:7424
(anonymous) @ layout.js:7425
__webpack_require__.O @ webpack.js?v=1763730319684:84
(anonymous) @ layout.js:7426
webpackJsonpCallback @ webpack.js?v=1763730319684:1388
(anonymous) @ layout.js:9
analytics.ts:160 📱 Device Info Collected: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', platform: 'MacIntel', vendor: 'Google Inc.', language: 'en-US', languages: Array(4), …}
analytics.ts:193 🌍 Location Info Collected: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US'}
analytics.ts:79 📊 GA4 Environment Variables Debug: {measurementId: 'G-V1B8R98P79', anonymizeIp: false, debugMode: false, siteName: 'TimeCapsule- SLM', siteUrl: 'http://localhost:3000', …}
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.16843776175941, longitude: 72.84656576574318, …}
unifiedStorage.ts:132 📂 Starting unified load...
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: null, sessionsCount: 0, sessionsList: Array(0)}
page.tsx:1579 🔄 Loading initial data with unified storage...
unifiedStorage.ts:132 📂 Starting unified load...
page.tsx:1661 🔧 AI-Frames unified storage interface updated: {hasVectorStore: false, vectorStoreInitialized: false, frameCount: 0, hasUnifiedMethods: true}
VectorStoreProvider.tsx:150 🚀 Auto-initializing VectorStore for route: /ai-frames
VectorStoreProvider.tsx:79 🚀 VectorStoreProvider: Creating new singleton VectorStore...
RAGTracker.ts:26 🔍 RAG Tracker initialized with config: {enableTracking: true, enableVisualization: true, enablePerformanceMetrics: true, enableQualityMetrics: false, maxQueryHistory: 1000, …}
VectorStore.ts:226 🗂️ VectorStore constructor called
VectorStore.ts:227 🔍 RAG Tracker initialized for VectorStore
VectorStore.ts:339 🗂️ Initializing RxDB Vector Store...
VectorStore.ts:342 🤖 Loading document processor...
EmbeddingService.ts:35 🧠 Xenova environment configured for bundled embeddings
DocumentProcessor.ts:66 🔧 DocumentProcessor constructor called (new architecture)
VectorStore.ts:349 ⏸️ Skipping automatic embedding download; will initialize when first needed.
VectorStore.ts:354 📚 Creating RxDB database...
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStoreProvider.tsx:153 ⏭️ Skipping auto-init for /ai-frames: {isInitialized: false, isInitializing: true, attemptedBefore: true, singletonInitialized: false}
scheduler.development.js:14 [Violation] 'message' handler took 173ms
installHook.js:1 -------------- RxDB Open Core RxStorage -------------------------------
You are using the free Dexie.js based RxStorage implementation from RxDB https://rxdb.info/rx-storage-dexie.html?console=dexie 
While this is a great option, we want to let you know that there are faster storage solutions available in our premium plugins.
For professional users and production environments, we highly recommend considering these premium options to enhance performance and reliability.
 https://rxdb.info/premium/?console=dexie 
If you already purchased premium access you can disable this log by calling the setPremiumFlag() function from rxdb-premium/plugins/shared.
---------------------------------------------------------------------
overrideMethod @ installHook.js:1
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
init @ VectorStore.ts:361
VectorStoreProvider.useCallback[initializeVectorStore] @ VectorStoreProvider.tsx:84
VectorStoreProvider.useEffect @ VectorStoreProvider.tsx:151
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
<VectorStoreProvider>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
ClientAppProviders @ ClientAppProviders.tsx:22
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
VectorStore.ts:368 📄 Creating documents collection...
installHook.js:1 Image with src "/Media/TimeCapsule_04.png" has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes
overrideMethod @ installHook.js:1
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
Navbar @ navbar.tsx:70
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
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
AIFramesPage.useEffect @ page.tsx:1562
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1763730319684:160
options.factory @ webpack.js?v=1763730319684:712
__webpack_require__ @ webpack.js?v=1763730319684:37
fn @ webpack.js?v=1763730319684:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1763730319684:182
options.factory @ webpack.js?v=1763730319684:712
__webpack_require__ @ webpack.js?v=1763730319684:37
__webpack_exec__ @ main-app.js?v=1763730319684:2824
(anonymous) @ main-app.js?v=1763730319684:2825
webpackJsonpCallback @ webpack.js?v=1763730319684:1388
(anonymous) @ main-app.js?v=1763730319684:9
useAIProviders.ts:232 🔄 aiProviders object updated
unifiedStorage.ts:160 📭 No data found in any storage
useUnifiedStorage.ts:984 📭 No data found during load
unifiedStorage.ts:160 📭 No data found in any storage
useUnifiedStorage.ts:984 📭 No data found during load
page.tsx:1587 📭 No data found in unified storage
page.tsx:1590 ✅ Initial data loading complete
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:624 ✅ RxDB Vector Store initialized successfully
VectorStore.ts:625 🧠 Xenova download running in background...
VectorStoreProvider.tsx:85 ✅ VectorStoreProvider: Singleton VectorStore initialized successfully
VectorStoreProvider.tsx:96 🔧 VectorStore exposed globally on window.vectorStore for testing
EnhancedLearningGraph.tsx:3720 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":true,"handleEdgesChangeChanged":true,"handleNodesDeleteChanged":true,"onConnectChanged":true,"onEdgesDeleteChanged":true,"onDropChanged":true}
EnhancedLearningGraph.tsx:3732 EnhancedLearningGraph rerender: 1
useAIProviders.ts:232 🔄 aiProviders object updated
sessionStore.ts:32 📦 SessionStore initialized
GraphStorageManager.ts:84 🗂️ Initializing GraphStorageManager with VectorStore backend...
GraphStorageManager.ts:86 ✅ GraphStorageManager initialized successfully
page.tsx:1661 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 0, hasUnifiedMethods: true}
VectorStoreProvider.tsx:153 ⏭️ Skipping auto-init for /ai-frames: {isInitialized: true, isInitializing: false, attemptedBefore: false, singletonInitialized: true}
EnhancedLearningGraph.tsx:3732 EnhancedLearningGraph rerender: 2
MetadataManager.ts:1022 📋 Syncing metadata with vector store...
MetadataManager.ts:611 🔄 Starting enhanced metadata sync to Knowledge Base... {bubblSpacesCount: 1, timeCapslesCount: 1, vectorStoreStatus: {…}}
MetadataManager.ts:628 📝 Syncing BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1763727818961b6)
VectorStore.ts:1282 🗑️ Deleting document: bubblspace-bubbl-1763727818961b6 (attempt 1/5)
page.tsx:1401 ✅ Managers initialized successfully
useAIProviders.ts:232 🔄 aiProviders object updated
useOpenRouterConnection.ts:198 Fetch finished loading: GET "https://openrouter.ai/api/v1/models".
useOpenRouterConnection.useCallback[validateApiKey] @ useOpenRouterConnection.ts:198
useOpenRouterConnection.useEffect @ useOpenRouterConnection.ts:163
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1763730319684:160
options.factory @ webpack.js?v=1763730319684:712
__webpack_require__ @ webpack.js?v=1763730319684:37
fn @ webpack.js?v=1763730319684:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1763730319684:182
options.factory @ webpack.js?v=1763730319684:712
__webpack_require__ @ webpack.js?v=1763730319684:37
__webpack_exec__ @ main-app.js?v=1763730319684:2824
(anonymous) @ main-app.js?v=1763730319684:2825
webpackJsonpCallback @ webpack.js?v=1763730319684:1388
(anonymous) @ main-app.js?v=1763730319684:9
EnhancedLearningGraph.tsx:3720 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":true}
EnhancedLearningGraph.tsx:3732 EnhancedLearningGraph rerender: 3
VectorStore.ts:2000 📋 Retrieved latest revision for bubblspace-bubbl-1763727818961b6: 3-fmrfkejcnh
VectorStore.ts:1291 📋 Document bubblspace-bubbl-1763727818961b6 found with revision: 3-fmrfkejcnh
useAIProviders.ts:232 🔄 aiProviders object updated
useDocuments.ts:78 📊 Document status updated: {documents: 8, totalSize: '1.5 MB', totalChunks: 31, totalVectors: 29, avgChunksPerDoc: '3.9', …}
sessionStore.ts:129 📋 Loaded 1 sessions
useAIFlowBuilder.ts:790 📋 Loaded 1 sessions from KB
useAIFlowBuilder.ts:795 🔄 Restoring active session from localStorage: ai-flow_1763729348176_4tytx2t7u
sessionStore.ts:129 📋 Loaded 1 sessions
useAIProviders.ts:232 🔄 aiProviders object updated
useAIFlowBuilder.ts:1140 💾 Persisting active session ID to localStorage: ai-flow_1763729348176_4tytx2t7u
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'ai-flow_1763729348176_4tytx2t7u', sessionsCount: 1, sessionsList: Array(1)}
VectorStore.ts:1295 ✅ Document deleted successfully: bubblspace-bubbl-1763727818961b6
useAIProviders.ts:232 🔄 aiProviders object updated
MetadataManager.ts:634 🗑️ Deleted old BubblSpace document: bubblspace-bubbl-1763727818961b6
VectorStore.ts:2205 🔄 Bypassing duplicate detection for metadata update: BubblSpace: My BubblSpace
VectorStore.ts:2142 ✅ Document inserted: bubblspace-bubbl-1763727818961b6
VectorStore.ts:2634 🔍 Verifying document persistence: bubblspace-bubbl-1763727818961b6 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for bubblspace-bubbl-1763727818961b6: 5-gvswskhojb
VectorStore.ts:2647 ✅ Document persistence verified: BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1763727818961b6, Rev: 5-gvswskhojb)
MetadataManager.ts:681 ✅ BubblSpace synced to Knowledge Base: My BubblSpace
MetadataManager.ts:686 ✅ BubblSpace persistence verified: My BubblSpace
MetadataManager.ts:715 📝 Syncing TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-176372781896257)
VectorStore.ts:1282 🗑️ Deleting document: timecapsule-TC-176372781896257 (attempt 1/5)
VectorStore.ts:2000 📋 Retrieved latest revision for timecapsule-TC-176372781896257: 3-fmrfkejcnh
VectorStore.ts:1291 📋 Document timecapsule-TC-176372781896257 found with revision: 3-fmrfkejcnh
VectorStore.ts:1295 ✅ Document deleted successfully: timecapsule-TC-176372781896257
MetadataManager.ts:721 🗑️ Deleted old TimeCapsule document: timecapsule-TC-176372781896257
VectorStore.ts:2205 🔄 Bypassing duplicate detection for metadata update: TimeCapsule: Untitled TimeCapsule
VectorStore.ts:2212 📋 Found 0 existing TimeCapsule documents for timeCapsuleId: TC-176372781896257
VectorStore.ts:2029 📋 TimeCapsule document operation: {id: 'timecapsule-TC-176372781896257', title: 'TimeCapsule: Untitled TimeCapsule', source: 'metadata', timeCapsuleId: 'TC-176372781896257', name: 'Untitled TimeCapsule', …}
VectorStore.ts:2142 ✅ Document inserted: timecapsule-TC-176372781896257
VectorStore.ts:2634 🔍 Verifying document persistence: timecapsule-TC-176372781896257 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for timecapsule-TC-176372781896257: 5-gvswskhojb
VectorStore.ts:2647 ✅ Document persistence verified: TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-176372781896257, Rev: 5-gvswskhojb)
MetadataManager.ts:772 ✅ TimeCapsule synced to Knowledge Base: Untitled TimeCapsule
MetadataManager.ts:777 ✅ TimeCapsule persistence verified: Untitled TimeCapsule
MetadataManager.ts:806 ✅ All metadata synced to Knowledge Base successfully {syncedBubblSpaces: 1, syncedTimeCapsules: 1, totalItems: 2}
MetadataManager.ts:1027 ✅ Metadata synced with vector store
useAIProviders.ts:232 🔄 aiProviders object updated
analytics.ts:271 📊 GA4: Initializing Google Analytics 4...
Analytics.tsx:42 ⏳ Analytics: Skipping page tracking - no consent or not initialized
analytics.ts:305 ✅ GA4: Successfully initialized with enhanced tracking
Analytics.tsx:23 ✅ Analytics: GA4 initialized with user consent
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1h1v898116370za200zd898116370&_p=1763730333389&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=368304457.1763727821&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=1&tag_exp=103116026~103200004~104527907~104528501~104684208~104684211~105391252~115583767~115938466~115938469~116184927~116184929~116217636~116217638&sid=1763727821&sct=1&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=13748".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:443
SN @ js?id=G-V1B8R98P79:970
k.flush @ js?id=G-V1B8R98P79:977
k.Pb @ js?id=G-V1B8R98P79:974
k.add @ js?id=G-V1B8R98P79:977
k.Pm @ js?id=G-V1B8R98P79:992
k.Kr @ js?id=G-V1B8R98P79:992
(anonymous) @ js?id=G-V1B8R98P79:989
Wl @ js?id=G-V1B8R98P79:454
Vn @ js?id=G-V1B8R98P79:473
(anonymous) @ js?id=G-V1B8R98P79:989
c @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:920
Promise.then
CJ @ js?id=G-V1B8R98P79:920
k.Jr @ js?id=G-V1B8R98P79:989
b @ js?id=G-V1B8R98P79:1003
v @ js?id=G-V1B8R98P79:497
em @ js?id=G-V1B8R98P79:456
Yp @ js?id=G-V1B8R98P79:497
Xp.flush @ js?id=G-V1B8R98P79:501
Xp.push @ js?id=G-V1B8R98P79:499
Pp @ js?id=G-V1B8R98P79:494
event @ js?id=G-V1B8R98P79:774
qB @ js?id=G-V1B8R98P79:780
b.push @ js?id=G-V1B8R98P79:786
window.gtag @ analytics.ts:279
trackEvent @ analytics.ts:384
initializeGA4 @ analytics.ts:308
await in initializeGA4
Analytics.useEffect.initializeAnalytics @ Analytics.tsx:21
Analytics.useEffect @ Analytics.tsx:35
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14019
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13992
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
analytics.ts:363 📊 GA4: Page view tracked - AI-Frames
Analytics.tsx:72 📊 Analytics: Tracked page view - AI-Frames (/ai-frames)
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1h1v898116370za200zd898116370&_p=1763730333389&gcd=13l3l3l3l1l1&npa=0&dma=0&sr=2240x1260&cid=368304457.1763727821&ul=en-us&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&tag_exp=103116026~103200004~104527907~104528501~104684208~104684211~105391252~115583767~115938466~115938469~116184927~116184929~116217636~116217638&sid=1763727821&sct=1&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-11-21T13%3A05%3A33.397Z&epn.page_duration=4&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=142.0.0.0&ep.viewport_size=2240x845&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&_et=2&tfd=13857".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:443
SN @ js?id=G-V1B8R98P79:970
k.flush @ js?id=G-V1B8R98P79:977
k.Pb @ js?id=G-V1B8R98P79:974
k.add @ js?id=G-V1B8R98P79:977
k.Pm @ js?id=G-V1B8R98P79:992
k.Kr @ js?id=G-V1B8R98P79:992
(anonymous) @ js?id=G-V1B8R98P79:989
Wl @ js?id=G-V1B8R98P79:454
Vn @ js?id=G-V1B8R98P79:473
(anonymous) @ js?id=G-V1B8R98P79:989
c @ js?id=G-V1B8R98P79:919
CJ @ js?id=G-V1B8R98P79:919
k.Jr @ js?id=G-V1B8R98P79:989
b @ js?id=G-V1B8R98P79:1003
v @ js?id=G-V1B8R98P79:497
em @ js?id=G-V1B8R98P79:456
Yp @ js?id=G-V1B8R98P79:497
Xp.flush @ js?id=G-V1B8R98P79:501
Xp.push @ js?id=G-V1B8R98P79:499
Pp @ js?id=G-V1B8R98P79:494
event @ js?id=G-V1B8R98P79:774
qB @ js?id=G-V1B8R98P79:780
b.push @ js?id=G-V1B8R98P79:786
window.gtag @ analytics.ts:279
trackPageView @ analytics.ts:356
Analytics.useEffect.trackPageView @ Analytics.tsx:61
setTimeout
Analytics.useEffect @ Analytics.tsx:76
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14019
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13992
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
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1h1v898116370za200zd898116370&_p=1763730333389&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=368304457.1763727821&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=3&tag_exp=103116026~103200004~104527907~104528501~104684208~104684211~105391252~115583767~115938466~115938469~116184927~116184929~116217636~116217638&dt=AI-Frames&dl=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&sid=1763727821&sct=1&seg=1&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=learning&ep.page_type=interactive&ep.pathname=%2Fai-frames&ep.consent_analytics=true&ep.consent_functional=true&_et=106&tfd=13859".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:443
SN @ js?id=G-V1B8R98P79:970
k.flush @ js?id=G-V1B8R98P79:977
k.Pb @ js?id=G-V1B8R98P79:974
k.add @ js?id=G-V1B8R98P79:977
k.Pm @ js?id=G-V1B8R98P79:992
k.Kr @ js?id=G-V1B8R98P79:992
(anonymous) @ js?id=G-V1B8R98P79:989
Wl @ js?id=G-V1B8R98P79:454
Vn @ js?id=G-V1B8R98P79:473
(anonymous) @ js?id=G-V1B8R98P79:989
c @ js?id=G-V1B8R98P79:919
CJ @ js?id=G-V1B8R98P79:919
k.Jr @ js?id=G-V1B8R98P79:989
b @ js?id=G-V1B8R98P79:1003
v @ js?id=G-V1B8R98P79:497
em @ js?id=G-V1B8R98P79:456
Yp @ js?id=G-V1B8R98P79:497
Xp.flush @ js?id=G-V1B8R98P79:501
Xp.push @ js?id=G-V1B8R98P79:499
Pp @ js?id=G-V1B8R98P79:494
event @ js?id=G-V1B8R98P79:774
qB @ js?id=G-V1B8R98P79:780
b.push @ js?id=G-V1B8R98P79:786
window.gtag @ analytics.ts:279
trackEvent @ analytics.ts:384
trackEngagement @ analytics.ts:500
Analytics.useEffect.trackPageView @ Analytics.tsx:70
setTimeout
Analytics.useEffect @ Analytics.tsx:76
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14019
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13992
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
beginWork @ react-dom-client.development.js:10556
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopConcurrentByScheduler @ react-dom-client.development.js:15252
renderRootConcurrent @ react-dom-client.development.js:15227
performWorkOnRoot @ react-dom-client.development.js:14525
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<SessionProvider>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
ClientAppProviders @ ClientAppProviders.tsx:29
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
RootLayout @ layout.tsx:173
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1763730319684:160
options.factory @ webpack.js?v=1763730319684:712
__webpack_require__ @ webpack.js?v=1763730319684:37
fn @ webpack.js?v=1763730319684:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1763730319684:182
options.factory @ webpack.js?v=1763730319684:712
__webpack_require__ @ webpack.js?v=1763730319684:37
__webpack_exec__ @ main-app.js?v=1763730319684:2824
(anonymous) @ main-app.js?v=1763730319684:2825
webpackJsonpCallback @ webpack.js?v=1763730319684:1388
(anonymous) @ main-app.js?v=1763730319684:9
useAIProviders.ts:232 🔄 aiProviders object updated
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 199ms
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) <input data-slot=​"input" class=​"file:​text-foreground placeholder:​text-muted-foreground selection:​bg-primary selection:​text-primary-foreground dark:​bg-input/​30 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow]​ outline-none file:​inline-flex file:​h-7 file:​border-0 file:​bg-transparent file:​text-sm file:​font-medium disabled:​pointer-events-none disabled:​cursor-not-allowed disabled:​opacity-50 md:​text-sm focus-visible:​border-ring focus-visible:​ring-ring/​50 focus-visible:​ring-[3px]​ aria-invalid:​ring-destructive/​20 dark:​aria-invalid:​ring-destructive/​40 aria-invalid:​border-destructive bg-white border-slate-300" placeholder=​"sk-or-v1-..." type=​"password" value>​flex
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) <input data-slot=​"input" class=​"file:​text-foreground placeholder:​text-muted-foreground selection:​bg-primary selection:​text-primary-foreground dark:​bg-input/​30 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow]​ outline-none file:​inline-flex file:​h-7 file:​border-0 file:​bg-transparent file:​text-sm file:​font-medium disabled:​pointer-events-none disabled:​cursor-not-allowed disabled:​opacity-50 md:​text-sm focus-visible:​border-ring focus-visible:​ring-ring/​50 focus-visible:​ring-[3px]​ aria-invalid:​ring-destructive/​20 dark:​aria-invalid:​ring-destructive/​40 aria-invalid:​border-destructive bg-white border-slate-300" placeholder=​"firecrawl_live_..." type=​"password" value>​flex
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1h1v898116370za200zd898116370&_p=1763730333389&gcd=13l3l3l3l1l1&npa=0&dma=0&sr=2240x1260&cid=368304457.1763727821&ul=en-us&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&tag_exp=103116026~103200004~104527907~104528501~104684208~104684211~105391252~115583767~115938466~115938469~116184927~116184929~116217636~116217638&sid=1763727821&sct=1&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-11-21T13%3A05%3A33.520Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=142.0.0.0&ep.viewport_size=2240x845&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&_et=1&tfd=18860".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:443
SN @ js?id=G-V1B8R98P79:970
k.flush @ js?id=G-V1B8R98P79:977
(anonymous) @ js?id=G-V1B8R98P79:974
setTimeout
k.Pb @ js?id=G-V1B8R98P79:974
k.add @ js?id=G-V1B8R98P79:977
k.Pm @ js?id=G-V1B8R98P79:992
k.Kr @ js?id=G-V1B8R98P79:992
(anonymous) @ js?id=G-V1B8R98P79:989
Wl @ js?id=G-V1B8R98P79:454
Vn @ js?id=G-V1B8R98P79:473
(anonymous) @ js?id=G-V1B8R98P79:989
c @ js?id=G-V1B8R98P79:919
CJ @ js?id=G-V1B8R98P79:919
k.Jr @ js?id=G-V1B8R98P79:989
b @ js?id=G-V1B8R98P79:1003
v @ js?id=G-V1B8R98P79:497
em @ js?id=G-V1B8R98P79:456
Yp @ js?id=G-V1B8R98P79:497
Xp.flush @ js?id=G-V1B8R98P79:501
Xp.push @ js?id=G-V1B8R98P79:499
Pp @ js?id=G-V1B8R98P79:494
event @ js?id=G-V1B8R98P79:774
qB @ js?id=G-V1B8R98P79:780
b.push @ js?id=G-V1B8R98P79:786
window.gtag @ analytics.ts:279
trackEvent @ analytics.ts:384
trackEngagement @ analytics.ts:500
Analytics.useEffect.trackPageView @ Analytics.tsx:70
setTimeout
Analytics.useEffect @ Analytics.tsx:76
react-stack-bottom-frame @ react-dom-client.development.js:23055
runWithFiberInDEV @ react-dom-client.development.js:845
commitHookEffectListMount @ react-dom-client.development.js:11978
commitHookPassiveMountEffects @ react-dom-client.development.js:12099
commitPassiveMountOnFiber @ react-dom-client.development.js:13929
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13922
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:14019
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:13902
commitPassiveMountOnFiber @ react-dom-client.development.js:13992
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
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'pointerup' handler took 165ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
[Violation] 'input' handler took 162ms
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useAIProviders.ts:232 🔄 aiProviders object updated
[Violation] 'input' handler took 163ms
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
[Violation] 'input' handler took 173ms
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
[Violation] 'input' handler took 166ms
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
[Violation] 'input' handler took 164ms
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
[Violation] 'input' handler took 151ms
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useAIFlowBuilder.ts:1881 🚀 TimeCapsule Version 4.8.5_010 - AI Flow Builder Starting
useAIFlowBuilder.ts:1882 ✅ Fix 1: DataInspector trust LLM decisions (semantic override fix)
useAIFlowBuilder.ts:1883 ✅ Fix 2: PatternGenerator fail-fast validation (no garbage extraction)
useAIFlowBuilder.ts:1884 ✅ Fix 3: SelectTrigger infinite re-render fix (stable callbacks + stable values)
useAIFlowBuilder.ts:1885 ✅ Fix 4: DataInspector parsing improvements (methods, filename, JSON)
useAIFlowBuilder.ts:1886 ✅ Fix 5: Multi-line list parsing (preserve newlines in methods/concepts)
useAIFlowBuilder.ts:1931 📂 Using existing AI Flow session: AI Flow: using ddp pdf file build a lesson plan for me on d
Orchestrator.ts:476 🧠 Master LLM Orchestrator starting for: "using ddp pdf file build a lesson plan for me on distributed training on llms "
Orchestrator.ts:479 🚀 TimeCapsule Version 4.8.5_010 - Master Orchestrator
Orchestrator.ts:480 ✅ Micro-session architecture enabled (60 iterations, per-agent limits)
Orchestrator.ts:481 ✅ PatternGenerator validation: Fail-fast if no documents available
Orchestrator.ts:482 ✅ Plan-aware sequencing with intelligent validation
Orchestrator.ts:497 🎯 Master Orchestrator: Discovering documents for query "using ddp pdf file build a lesson plan for me on distributed training on llms "
Orchestrator.ts:533 🔍 Discovering documents for query: "using ddp pdf file build a lesson plan for me on distributed training on llms "
VectorStore.ts:1116 🔍 getDocumentMetadata: Filtering for document types [userdocs]
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 168ms
VectorStore.ts:1178 🔍 getDocumentMetadata: Retrieved 1 documents (filtered for: userdocs)
Orchestrator.ts:537 📚 Found 1 user documents
Orchestrator.ts:564 ✅ Master Orchestrator: Prepared 1 document metadata for DataInspector analysis
Orchestrator.ts:900 🎯 Master LLM analyzing situation and planning tool calls...
Orchestrator.ts:3047 ❌ No extracted data found in any location
Orchestrator.ts:997 🎯 Starting micro-session: "Analyze document structure and relevance"
Orchestrator.ts:3047 ❌ No extracted data found in any location
Orchestrator.ts:916 🔄 Master LLM Iteration 1: Analyze document structure and relevance
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1958
makeMasterLLMDecision @ Orchestrator.ts:1375
masterLLMOrchestration @ Orchestrator.ts:918
research @ Orchestrator.ts:510
await in research
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:1987
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
Orchestrator.ts:1378 🧠 Master LLM Decision Response (488 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: No agents have been called yet, and the mandatory execution order requires starting with DataInspector to analyze and filter the 1 pre-loaded document chunk for structure and relevance. This is essential to identify relevant content before planning or extraction, ensuring the pipeline proceeds with targeted data.
NEXT_GOAL: Obtain a filtered and analyzed view of the document's structure and relevance to inform subsequent planning.
Orchestrator.ts:1698 🔍 PARSING DEBUG: Full response (488 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: No agents have been called yet, and the mandatory execution order requires starting with DataInspector to analyze and filter the 1 pre-loaded document chunk for structure and relevance. This is essential to identify relevant content before planning or extraction, ensuring the pipeline proceeds with targeted data.
NEXT_GOAL: Obtain a filtered and analyzed view of the document's structure and relevance to inform subsequent planning.
Orchestrator.ts:1711 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1714 🎯 PARSED TOOL_NAME (FIRST): DataInspector
Orchestrator.ts:1723 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1730 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataInspector
Orchestrator.ts:1381 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataInspector', reasoning: 'Need to call DataInspector to progress toward the goal'}
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "DataInspector"
Orchestrator.ts:2936 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "DataInspector"
Orchestrator.ts:2936 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "DataInspector"
Orchestrator.ts:2936 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
Orchestrator.ts:1855 🔍 PLAN-GUIDED VALIDATION: DataInspector
Orchestrator.ts:1856 📋 Agent Status: No agents called yet
Orchestrator.ts:1857 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:2428 ✅ Agent execution validated: DataInspector always allowed as first agent
Orchestrator.ts:2552 🔧 Executing tool: DataInspector (original: DataInspector)
Orchestrator.ts:2563 ⏳ [orch-1763730371748-9t6s] Starting DataInspector - waiting for completion...
DataInspectorAgent.ts:97 🚀 TimeCapsule Version 4.8.5_010 - DataInspector Agent (Root Cause Fixes Applied)
DataInspectorAgent.ts:98 ✅ Fix 1: Format-agnostic technical terms parsing (newlines + commas)
DataInspectorAgent.ts:99 ✅ Fix 2: Filename metadata preservation from VectorStore
DataInspectorAgent.ts:100 ✅ Fix 3: Simplified JSON prompt structure
DataInspectorAgent.ts:101 ✅ Fix 4: Preserve newlines in multi-line lists (methods/concepts parsing)
DataInspectorAgent.ts:120 🔎 DataInspector: Received document metadata - performing multi-document sampling and analysis
DataInspectorAgent.ts:2231 📋 Found 1 documents to analyze: ['thefirehacker-github-io-til-ddp-python-basics-html.pdf']
DataInspectorAgent.ts:2296 🔍 Sampling real chunks from 1 documents for intelligent analysis
DataInspectorAgent.ts:2326 🔍 Sampling chunks from document 1/1: thefirehacker-github-io-til-ddp-python-basics-html.pdf
DataInspectorAgent.ts:2425 ✅ Sampled 9 real chunks from "thefirehacker-github-io-til-ddp-python-basics-html.pdf" (29 total chunks)
DataInspectorAgent.ts:2487 ✅ Sampled chunks from 1 documents with real content
DataInspectorAgent.ts:2492 🧠 Analyzing 1 documents with real sampled content for intelligent relevance decisions
DataInspectorAgent.ts:449 🔍 Multi-document analysis: 1 documents detected
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 154ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
hot-reloader-client.js:197 [Fast Refresh] rebuilding
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
webpack.js?v=1763730319684:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/96ec7d956977c86f.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763730319684:1367
Promise.then
hotCheck @ webpack.js?v=1763730319684:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1802ms
webpack.js?v=1763730319684:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/846866ad264a2852.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763730319684:1367
Promise.then
hotCheck @ webpack.js?v=1763730319684:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleApplyUpdates @ hot-reloader-client.js:123
eval @ hot-reloader-client.js:143
Promise.then
tryApplyUpdatesWebpack @ hot-reloader-client.js:142
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
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
useAIProviders.ts:232 🔄 aiProviders object updated
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1958
eval @ index.ts:86
performMultiDocumentAnalysis @ DataInspectorAgent.ts:507
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:2495
await in performDocumentMetadataAnalysis
processNormally @ DataInspectorAgent.ts:130
await in processNormally
process @ FeedbackAwareAgent.ts:211
executeToolCall @ Orchestrator.ts:2564
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1066
masterLLMOrchestration @ Orchestrator.ts:943
await in masterLLMOrchestration
research @ Orchestrator.ts:510
await in research
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:1987
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
DataInspectorAgent.ts:508 🤖 Multi-document analysis: # Multi-Document Analysis Report

## 1. DOCUMENT TYPES

**Document 1 (doc_1763727842606_o8x3hf2kg)**: 
- **Type**: Technical Tutorial/Educational Blog Post
- **Format**: Structured teaching material with table of contents
- **Topic**: Distributed Data Parallel (DDP) training for machine learning mod
DataInspectorAgent.ts:770 🧠 DataInspector analyzing 1 documents with pure LLM intelligence
DataInspectorAgent.ts:980 🔍 DEBUG DataInspector Document 1 Sample Content: {chunksCount: 9, sampleLength: 4780, firstChunkPreview: 'TL;DR\n\n Core Python patterns explained: Core Pyt…ints) into model-ready tensors in one elegant ...', hasActualContent: true, filename: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', …}
DataInspectorAgent.ts:1043 📤 DEBUG DataInspector Document 1 LLM Prompt: {promptLength: 6305, containsDocumentContent: true, contentSampleInPrompt: 'Analyze this document and determine its relevance …;DR\n\n Core Python patterns explained: Core P...'}
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 169ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
DataInspectorAgent.ts:1056 🧠 DataInspector Document 1 LLM Response: TYPE: Tutorial/Educational Document
MAIN_ENTITY: Distributed Data Parallel (DDP) training in PyTorch with Python patterns
RELEVANT: YES
REASON: Document directly covers DDP distributed training concepts, patterns, and implementation - perfect foundation for building a lesson plan on distributed LLM training.

METHODS:
set_seed()
all_reduce()
optimizer.step()
torch.manual_seed()
torch.cuda.manual_seed_all()
model.forward()
average_grads()
dictionary comprehension for tensor conversion
kwargs unpa...
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1958
eval @ index.ts:86
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1053
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:801
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
installHook.js:1 ⚠️ DataInspector: Failed to parse structured JSON response: Error: Invalid JSON after all extraction attempts
    at parseJsonWithResilience (responseCompletion.ts:262:11)
    at DataInspectorAgent.parseStructuredAnalysis (DataInspectorAgent.ts:1204:45)
    at DataInspectorAgent.analyzeDocumentIntelligently (DataInspectorAgent.ts:1061:31)
    at async DataInspectorAgent.parseMultiDocumentAnalysis (DataInspectorAgent.ts:801:27)
    at async DataInspectorAgent.updateContextFromMultiDocumentInspection (DataInspectorAgent.ts:671:32)
    at async DataInspectorAgent.performMultiDocumentAnalysis (DataInspectorAgent.ts:512:9)
    at async DataInspectorAgent.performDocumentMetadataAnalysis (DataInspectorAgent.ts:2495:5)
    at async DataInspectorAgent.processNormally (DataInspectorAgent.ts:130:7)
    at async Orchestrator.executeToolCall (Orchestrator.ts:2564:7)
    at async Orchestrator.executeToolCallWithMicroSession (Orchestrator.ts:1066:5)
    at async Orchestrator.masterLLMOrchestration (Orchestrator.ts:943:9)
    at async Orchestrator.research (Orchestrator.ts:510:5)
    at async useAIFlowBuilder.useCallback[planFlow] (useAIFlowBuilder.ts:1987:7)
overrideMethod @ installHook.js:1
parseStructuredAnalysis @ DataInspectorAgent.ts:1209
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1061
await in analyzeDocumentIntelligently
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:801
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
installHook.js:1 ⚠️ DataInspector: Structured JSON missing or invalid, falling back to regex extraction
overrideMethod @ installHook.js:1
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1063
await in analyzeDocumentIntelligently
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:801
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
DataInspectorAgent.ts:1263 🎯 DataInspector: Extracted MAIN_ENTITY: "Distributed Data Parallel (DDP) training in PyTorch with Python patterns"
installHook.js:1 ⚠️ DataInspector failed to extract CONCEPT_SYNTHESIS from response: "TYPE: Tutorial/Educational Document
MAIN_ENTITY: Distributed Data Parallel (DDP) training in PyTorch with Python patterns
RELEVANT: YES
REASON: Document directly covers DDP distributed training concep..."
overrideMethod @ installHook.js:1
extractValue @ DataInspectorAgent.ts:1358
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1081
await in analyzeDocumentIntelligently
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:801
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
DataInspectorAgent.ts:1285 🎯 DataInspector: Extracted RELEVANT: "YES"
DataInspectorAgent.ts:1152 🔍 DataInspector Document 1 Parsed: {docType: 'Tutorial/Educational Document MAINENTITY: Distribu…_states logits gradients SequenceClassifierOutput', mainEntity: 'Distributed Data Parallel (DDP) training in PyTorch with Python patterns', relevantText: 'YES', reasoning: 'Document directly covers DDP distributed training …epts, patterns, and implementation - perfect f...'}
DataInspectorAgent.ts:1164 🔍 COMPREHENSIVE ANALYSIS: Query="using ddp pdf file build a lesson plan for me on distributed training on llms ", Entity="Distributed Data Parallel (DDP) training in PyTorch with Python patterns" → Result: true
DataInspectorAgent.ts:807 🔍 Document 1 intelligent analysis: {docType: 'Tutorial/Educational Document MAINENTITY: Distribu…_states logits gradients SequenceClassifierOutput', primaryEntity: 'Distributed Data Parallel (DDP) training in PyTorch with Python patterns', isRelevant: true, reasoning: 'Document directly covers DDP distributed training …epts, patterns, and implementation - perfect f...'}
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 156ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1958
eval @ index.ts:86
discoverContentAreas @ DataInspectorAgent.ts:1606
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:818
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 182ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1958
eval @ index.ts:86
discoverEntitiesIntelligently @ DataInspectorAgent.ts:1559
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:821
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 160ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1958
eval @ index.ts:86
discoverDocumentRole @ DataInspectorAgent.ts:1680
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:824
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
DataInspectorAgent.ts:3446 ✅ LLM classified document as RELEVANT - validating with semantic analysis
DataInspectorAgent.ts:3479 ✅ LLM decision validated - semantic score acceptable (70%)
DataInspectorAgent.ts:838 ✅ Including relevant document: Tutorial/Educational Document MAINENTITY: Distributed Data Parallel (DDP) training in PyTorch with Python patterns RELEVANT: YES REASON: Document directly covers DDP distributed training concepts, patterns, and implementation - perfect foundation for building a lesson plan on distributed LLM training. METHODS: setseed() allreduce() optimizer.step() torch.manualseed() torch.cuda.manualseedall() model.forward() averagegrads() dictionary comprehension for tensor conversion kwargs unpacking () gradient averaging broadcast parameters CONCEPTS: Distributed Data Parallel (DDP) Model replicas synchronization Gradient averaging vs gradient summing Seeding for reproducibility Rank-based data distribution World size Lock-step training Tensor operations GPU tensor conversion Learning rate scaling Parameter broadcasting Autograd hooks Bucketing and overlap PEOPLE: [None explicitly mentioned] DATATYPES: PyTorch tensors Hugging Face datasets Python dictionaries inputids attentionmask labels hidden_states logits gradients SequenceClassifierOutput (LLM decision trusted (semantic validation: 70%) - Document directly covers DDP distributed training concepts, patterns, and implementation - perfect f)
DataInspectorAgent.ts:864 🎯 DataInspector: Stored concept synthesis for document doc_1763727842606_o8x3hf2kg
DataInspectorAgent.ts:895 📊 Document filtering: 1 total → 1 relevant
DataInspectorAgent.ts:691 📋 Multi-Document Analysis: 1 documents with 0 relationships
DataInspectorAgent.ts:747 ✅ DOCUMENT ANALYSIS: All 1 documents deemed relevant - no filtering applied
DataInspectorAgent.ts:2651 🧠 DataInspector: Extracting intelligence from concept synthesis
DataInspectorAgent.ts:2675 🔍 Processing concept synthesis for doc_1763727842606_o8x3hf2kg
DataInspectorAgent.ts:2689 ✅ Extracted from synthesis: 0 methods, 0 concepts, 0 data points
DataInspectorAgent.ts:2835 🔍 Additional intelligence from document content: 0 table entries
DataInspectorAgent.ts:2879 📊 Formatted 0 measurements for PatternGenerator
DataInspectorAgent.ts:2702 🎯 Intelligence extracted from concept synthesis: {methods: 0, concepts: 0, people: 0, data: 0, measurements: 0}
installHook.js:1 ⚠️ No actionable intelligence extracted from concept synthesis - PatternGenerator may need to analyze chunks directly
overrideMethod @ installHook.js:1
extractIntelligenceFromConceptSynthesis @ DataInspectorAgent.ts:2721
await in extractIntelligenceFromConceptSynthesis
performMultiDocumentAnalysis @ DataInspectorAgent.ts:519
DataInspectorAgent.ts:2579 🔬 DataInspector: Extracting query-relevant terms from 1 document for: "using ddp pdf file build a lesson plan for me on distributed training on llms "
useAIProviders.ts:232 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 154ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
eval @ webpack-internal:///…i-agent/index.ts:91
analyzeQueryForContentPrioritization @ webpack-internal:///…pectorAgent.ts:1984
buildQueryAwareContentSample @ webpack-internal:///…pectorAgent.ts:1961
extractQueryRelevantTerms @ webpack-internal:///…pectorAgent.ts:1614
performMultiDocumentAnalysis @ webpack-internal:///…spectorAgent.ts:283
 📊 Document 1: Sampling 5 of 9 chunks (56%)
 🔍 Content sample for technical extraction (2339 chars): --- DOCUMENT 1: doc_1763727842606_o8x3hf2kg ---
TL;DR

 Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists...
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 162ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
eval @ webpack-internal:///…i-agent/index.ts:91
extractQueryRelevantTerms @ webpack-internal:///…pectorAgent.ts:1620
await in extractQueryRelevantTerms
performMultiDocumentAnalysis @ webpack-internal:///…spectorAgent.ts:283
 🎯 Technical terms LLM response: Based on the user's query about building a lesson plan for distributed training on LLMs using the DDP PDF file, here are the relevant extracted terms:

METHODS: 
- DDP (Distributed Data Parallel)
- Dictionary comprehensions
- Kwargs unpacking (**)
- all_reduce (SUM)
- Seeding
- broadcast

CONCEPTS:
- Distributed training
- Model replicas
- GPU tensors
- Hugging Face datasets
- PyTorch tensor operations
- forward() method
- optimizer.step()
- world_size
- rank
- gradient synchronization

DATA_TYPES:
- Python dicts with lists and ints
- PyTorch tensors
- input_ids
- attention_mask
- labels
- batch

PEOPLE: [None mentioned in document]

**Key Lesson Plan Components from Document:**
1. Visual mental model of distributed training
2. Seeding: making model replicas identical
3. Two Python idioms (dictionary comprehensions, kwargs unpacking)
4. A tiny DDP wrapper (teaching version)
5. Minimal distributed training loop
6. Why broadcast at init if we already seed?
7. Common pitfalls & fixes
8. From toy to real DDP
9. Exercises (recommended)
10. Cheatsheet
11. Appendix: tiny utilities
 🔍 Parsing methods line: ""
 💾 Saving methods: "DDP (Distributed Data Parallel)
Dictionary comprehensions
Kwargs unpacking (**)
all_reduce (SUM)
See..."
 ✅ Parsed methods: 6 items (3) ['DDP (Distributed Data Parallel)', 'Dictionary comprehensions', 'Kwargs unpacking (**)']
 🔍 Parsing concepts line: ""
 💾 Saving concepts: "Distributed training
Model replicas
GPU tensors
Hugging Face datasets
PyTorch tensor operations
forw..."
 ✅ Parsed concepts: 10 items (3) ['Distributed training', 'Model replicas', 'GPU tensors']
 🔍 Parsing data line: ""
 💾 Saving data: "Python dicts with lists and ints
PyTorch tensors
input_ids
attention_mask
labels
batch..."
 ✅ Parsed data: 6 items (3) ['Python dicts with lists and ints', 'PyTorch tensors', 'input_ids']
 🔍 Parsing people line: "[None mentioned in document]"
 💾 Saving people: "[None mentioned in document]
*Key Lesson Plan Components from Document:**
1. Visual mental model of ..."
 🔍 Parsed technical terms: {methods: Array(6), concepts: Array(10), people: Array(0), data: Array(6)}
 ✅ Document insights stored in context.sharedKnowledge: {methods: 6, concepts: 10, people: 0, data: 6}
 📋 Extracted methods: (6) ['DDP (Distributed Data Parallel)', 'Dictionary comprehensions', 'Kwargs unpacking (**)', 'all_reduce (SUM)', 'Seeding', 'broadcast']
 📊 Relevance filtering: 1 relevant out of 1 total documents
 🔄 Replacing 1 document metadata with 9 relevant chunks from intelligent analysis
 ✅ [orch-1763730371748-9t6s] DataInspector process() completed - agent finished
 ✅ Tool DataInspector completed in 67994ms
 🔍 PlanningAgent consuming and validating DataInspector results using Claude Code-style logic
 🎯 PlanningAgent: Consuming and validating results from DataInspector
 🔍 PlanningAgent: Validating DataInspector results for query: "using ddp pdf file build a lesson plan for me on distributed training on llms "
 🔍 VALIDATION DEBUG: Testing query "using ddp pdf file build a lesson plan for me on distributed training on llms " against entity patterns
 🔍 VALIDATION DEBUG: Pattern /\b([A-Z][a-z]+)'s\s+(.+)/ → Match: null
 🔍 VALIDATION DEBUG: Pattern /from\s+([A-Z][a-z]+)'s\s+(.+)/ → Match: null
 🔍 VALIDATION DEBUG: Pattern /by\s+([A-Z][a-z]+)\b/ → Match: null
 🔍 VALIDATION DEBUG: Pattern /([A-Z][a-z]+)'s\s+(blog|work|project|research)/ → Match: null
 🔍 VALIDATION DEBUG: No entity ownership pattern found in query "using ddp pdf file build a lesson plan for me on distributed training on llms "
 ✅ VALIDATION SUCCESS: DataInspector results validated - Found relevant documents and extracted meaningful entities
 ✅ VALIDATION SUCCESS RESULT: {isValid: true, reason: 'DataInspector successfully analyzed 1 documents and extracted 5 entity categories'}
 ✅ DataInspector validation passed
 🔍 Quality assessment for DataInspector: acceptable
 🔍 DataInspector approved 1 documents - fetching ALL chunks
 📊 Approved documents: ['thefirehacker-github-io-til-ddp-python-basics-html.pdf']
 🔄 aiProviders object updated
 📚 Retrieved 1 documents of type: userdocs
 🔍 getAllChunks: Filtering for document types [userdocs]
 🔍 getAllChunks: Retrieved 29 chunks from 1 documents (filtered for: userdocs)
 📚 Total chunks in vector store: 29
 🎯 Filtered to 29 chunks from approved documents
 📊 Current context has 9 chunks
 📦 Expanded chunks: 9 → 29 (20 additional chunks for approved documents)
 🎯 Strategic validation checkpoint: DataInspector - running PlanningAgent validation
 🔍 PlanningAgent consuming DataInspector results for quality analysis...
 🎯 PlanningAgent: Consuming and validating results from [object Object]
 ℹ️ No specific validation for [object Object] - allowing to continue
 ✅ DataInspector results validated by PlanningAgent - quality acceptable
 🔄 aiProviders object updated
 ⏱️ Validation UI sync delay completed
 🧾 Micro-session "Analyze document structure and relevance" finished with status: completed
 ❌ No extracted data found in any location
 🎯 Starting micro-session: "Extract structured data using generated patterns"
 ❌ No extracted data found in any location
 🔄 Master LLM Iteration 2: Extract structured data using generated patterns
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
makeMasterLLMDecision @ webpack-internal:///…rchestrator.ts:1032
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:727
 🧠 Master LLM Decision Response (626 chars): ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The mandatory execution order requires calling PlanningAgent next after DataInspector to create an intelligent execution strategy, as Phase 2 (Planning) is ready but the execution plan is not yet created. This step is essential to define the strategy for pattern generation and data extraction without skipping prerequisites, ensuring the pipeline progresses correctly toward extracting structured data using generated patterns.
NEXT_GOAL: Obtain...
 🔍 PARSING DEBUG: Full response (626 chars): ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The mandatory execution order requires calling PlanningAgent next after DataInspector to create an intelligent execution strategy, as Phase 2 (Planning) is ready but the execution plan is not yet created. This step is essential to define the strategy for pattern generation and data extraction without skipping prerequisites, ensuring the pipeline progresses correctly toward extracting structured data using generated patterns.
NEXT_GOAL: Obtain a validated execution plan that outlines the steps for pattern generation and data extraction based on the document analysis.
 🎯 PARSED ACTION (FIRST): CALL_TOOL
 🎯 PARSED TOOL_NAME (FIRST): PlanningAgent
 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PlanningAgent
 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PlanningAgent', reasoning: 'Need to call PlanningAgent to progress toward the goal'}
 🔧 Attempting intelligent fallback for: "PlanningAgent"
 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
 🔧 Attempting intelligent fallback for: "PlanningAgent"
 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
 🔧 Attempting intelligent fallback for: "PlanningAgent"
 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
 🔍 PLAN-GUIDED VALIDATION: PlanningAgent
 📋 Agent Status: ✅ Completed: [DataInspector]
 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
 ✅ Agent execution validated: PlanningAgent execution is contextually appropriate
 🔧 Executing tool: PlanningAgent (original: PlanningAgent)
 ⏳ [orch-1763730371748-9t6s] Starting PlanningAgent - waiting for completion...
 🎯 PlanningAgent: Creating intelligent execution strategy for "using ddp pdf file build a lesson plan for me on distributed training on llms "
 📊 Situation Analysis: {hasDocuments: true, documentCount: 29, hasDocumentAnalysis: true, relevantDocuments: 1, documentTypes: Array(1), …}
 🎯 PlanningAgent: Creating extraction strategy from DataInspector analysis
 🧠 Document context analysis: {documentType: 'Method Paper', documentPurpose: 'Introduces new method/algorithm', isMethodPaper: true, isSurveyPaper: false, mainContribution: 'DDP (Distributed Data Parallel)', …}
 🔍 PlanningAgent: Analyzing query intent directly for "using ddp pdf file build a lesson plan for me on distributed training on llms "
 🎯 Direct intent analysis: No override needed, proceeding with normal flow
 🎯 Intelligent expectations: {shouldFindSpecificMethod: true, shouldFindComparisons: false, shouldInferFromContribution: true, expectedAnswerType: 'method_from_paper_contribution', contextualReasoning: "This appears to be a method paper introducing DDP … should reference this paper's main contribution."}
 🎯 PlanningAgent: Assessing document-section relevance to query: "using ddp pdf file build a lesson plan for me on distributed training on llms "
 🧠 Method paper detected: Focusing on main contribution "DDP (Distributed Data Parallel)"
 🎯 Dynamic extraction targets based on analysis: (8) ['content', 'methods', 'concepts', 'data', 'primary_focus', 'methodpaper', 'findspecificmethod', 'inferfromcontribution']
 ✅ Created extraction strategy: {documentType: 'Method Paper', queryIntent: 'method_from_paper_contribution', contentAreas: 0, patternCategories: 4, extractionTargets: 8, …}
 ✅ Created extraction strategy with 4 pattern categories
 🔍 PlanningAgent: Validating DataInspector classifications against query
 🔍 PlanningAgent: Validating DataInspector document selections against query
 🎯 Query constraints for validation: {}
 
🔍 Validating document 1: "thefirehacker-github-io-til-ddp-python-basics-html.pdf"
 📊 Document analysis - Type: Tutorial/Educational Document MAINENTITY: Distributed Data Parallel (DDP) training in PyTorch with Python patterns RELEVANT: YES REASON: Document directly covers DDP distributed training concepts, patterns, and implementation - perfect foundation for building a lesson plan on distributed LLM training. METHODS: setseed() allreduce() optimizer.step() torch.manualseed() torch.cuda.manualseedall() model.forward() averagegrads() dictionary comprehension for tensor conversion kwargs unpacking () gradient averaging broadcast parameters CONCEPTS: Distributed Data Parallel (DDP) Model replicas synchronization Gradient averaging vs gradient summing Seeding for reproducibility Rank-based data distribution World size Lock-step training Tensor operations GPU tensor conversion Learning rate scaling Parameter broadcasting Autograd hooks Bucketing and overlap PEOPLE: [None explicitly mentioned] DATATYPES: PyTorch tensors Hugging Face datasets Python dictionaries inputids attentionmask labels hidden_states logits gradients SequenceClassifierOutput, Primary: Distributed Data Parallel (DDP) training in PyTorch with Python patterns
 ✅ Document 1 validation passed: Document meets all query constraints
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 152ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 ⏰ Auto-saving session (2-minute interval)...
 📋 Retrieved latest revision for session_ai-flow_1763729348176_4tytx2t7u: 8-fmrfkejcnh
 📊 Synced frame AI Flow: using ddp pdf file build a lesson plan for me on d to Knowledge Base (updated)
 🔍 Verifying document persistence: session_ai-flow_1763729348176_4tytx2t7u (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for session_ai-flow_1763729348176_4tytx2t7u: 9-gvswskhojb
 ✅ Document persistence verified: AI Flow: using ddp pdf file build a lesson plan for me on d (ID: session_ai-flow_1763729348176_4tytx2t7u, Rev: 9-gvswskhojb)
 💾 Session saved: AI Flow: using ddp pdf file build a lesson plan for me on d (ai-flow_1763729348176_4tytx2t7u)
 🔄 aiProviders object updated
 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'ai-flow_1763729348176_4tytx2t7u', sessionsCount: 1, sessionsList: Array(1)}
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 156ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 🔄 PlanningAgent parsing attempt 1/4
 ✅ Successfully parsed execution plan on attempt 1
 🎯 Generated execution plan: {strategy: 'Direct synthesis approach leveraging the available…eeding pattern-based extraction or web expansion.', stepCount: 4, confidence: 0.92}
 ✅ Execution plan created: Direct synthesis approach leveraging the available DDP tutorial document to construct a comprehensive lesson plan on distributed LLM training. The plan will extract key concepts, code patterns, and pedagogical structure from the document, then organize them into a teaching framework with learning objectives, modules, hands-on exercises, and assessments. Since the document contains tutorial content with step-by-step explanations, code snippets, and conceptual frameworks, we can transform this into an educational lesson plan without needing pattern-based extraction or web expansion.
 ✅ [orch-1763730371748-9t6s] PlanningAgent process() completed - agent finished
 ✅ Tool PlanningAgent completed in 23293ms
 🔍 Quality assessment for PlanningAgent: acceptable
 ❌ No extracted data found in any location
 🔄 Master LLM Iteration 3: Extract structured data using generated patterns
 🔧 Attempting intelligent fallback for: "DataInspector"
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
eval @ webpack-internal:///…i-agent/index.ts:91
createExecutionPlan @ webpack-internal:///…PlanningAgent.ts:99
await in createExecutionPlan
process @ webpack-internal:///…PlanningAgent.ts:55
await in process
executeToolCall @ webpack-internal:///…rchestrator.ts:2091
await in executeToolCall
executeToolCallWithMicroSession @ webpack-internal:///…Orchestrator.ts:863
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:749
 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "Extractor"
 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
 🔧 Attempting intelligent fallback for: "ResponseFormatter"
 🎯 Mapping ResponseFormatter → ResponseFormatter (semantic similarity)
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 160ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
makeMasterLLMDecision @ webpack-internal:///…rchestrator.ts:1032
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:727
 🧠 Master LLM Decision Response (739 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REASONING: The mandatory execution order requires calling PatternGenerator next after DataInspector and PlanningAgent, as patterns are not yet generated (Patterns Generated: NOT DONE ❌) and data extraction depends on it. This step identifies patterns and performs integrated extraction for structured data, preventing sequencing violations and ensuring the pipeline progresses correctly toward synthesis. Despite conflicting pipeline progress indicators,...
 🔍 PARSING DEBUG: Full response (739 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REASONING: The mandatory execution order requires calling PatternGenerator next after DataInspector and PlanningAgent, as patterns are not yet generated (Patterns Generated: NOT DONE ❌) and data extraction depends on it. This step identifies patterns and performs integrated extraction for structured data, preventing sequencing violations and ensuring the pipeline progresses correctly toward synthesis. Despite conflicting pipeline progress indicators, the critical sequencing rules prohibit skipping to SynthesisCoordinator.
NEXT_GOAL: Generate content-aware patterns from the available documents to extract structured data on DDP concepts, enabling subsequent synthesis into a lesson plan.
 🎯 PARSED ACTION (FIRST): CALL_TOOL
 🎯 PARSED TOOL_NAME (FIRST): PatternGenerator
 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PatternGenerator
 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PatternGenerator', reasoning: 'Need to call PatternGenerator to progress toward the goal'}
 🔧 Attempting intelligent fallback for: "PatternGenerator"
 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
 🔧 Attempting intelligent fallback for: "PatternGenerator"
 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
 🔧 Attempting intelligent fallback for: "PatternGenerator"
 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
 🔍 PLAN-GUIDED VALIDATION: PatternGenerator
 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent]
 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
 🔧 Attempting intelligent fallback for: "DataInspector"
 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "Extractor"
 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
 🔧 Attempting intelligent fallback for: "ResponseFormatter"
 🎯 Mapping ResponseFormatter → ResponseFormatter (semantic similarity)
 🤔 PatternGenerator not explicitly in execution plan - validating as intelligent addition
 🧠 Validating intelligent addition: PatternGenerator
 📋 Original plan: [DataInspector, SynthesisCoordinator, Extractor, ResponseFormatter]
 ✅ Agent execution validated: PatternGenerator can improve extraction quality - intelligent addition
 🔧 Executing tool: PatternGenerator (original: PatternGenerator)
 ⏳ [orch-1763730371748-9t6s] Starting PatternGenerator - waiting for completion...
 🎯 PatternGenerator: Creating extraction strategies
 📋 DEBUG - Existing patterns before PatternGenerator: {count: 1, patterns: Array(1), hasSharedKnowledge: true}
 🧠 PatternGenerator: Generating dynamic patterns via LLM analysis
 ✅ Using PlanningAgent extraction strategy: {documentType: 'Method Paper', queryIntent: 'method_from_paper_contribution', patternCategories: 4, availableStrategies: 1}
 🎯 PatternGenerator: Generating focused patterns (3 regex + 1 semantic)
 ✅ Generated 2 focused patterns: (2) ['Method extraction using DataInspector intelligence', 'Tutorial/Educational Document MAINENTITY: Distribu…el (DDP) training in PyTorch with Python patterns']
 🎯 Running focused extraction: 1 regex patterns + 0 semantic patterns
 ✅ Regex extraction: Found 14 items
 🔄 After deduplication: 14 unique items
 ✅ PatternGenerator: Extracted 14 items with focused patterns
 🔍 DEBUG PatternGenerator measurements check: {hasSharedKnowledge: true, hasDocumentInsights: true, hasMeasurements: true, measurementsLength: 0, measurementsType: 'object'}
 🔍 PatternGenerator: No measurements from DataInspector - analyzing ALL chunks with content-grounded approach
 📊 Analyzing 29 chunks for comprehensive measurement discovery (Claude Code style)
 📊 PatternGenerator: Discovered 109 measurements from complete dataset analysis
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*todevice)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*buf)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*s)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*for)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*enforcebroadcast)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*\s*\/\s*worldsize)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*visual)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*seeding)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*two)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*a)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*minimal)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*why)/gi found 0 matches
 🔍 Pattern validation: 0/12 patterns passed validation
 ✅ Induced 0 measurement families from document (style=dot, hits=109)
 🎯 PatternGenerator: Running immediate extraction with 2 generated patterns
 🎯 Running focused extraction: 1 regex patterns + 0 semantic patterns
 ✅ Regex extraction: Found 14 items
 🔄 After deduplication: 14 unique items
 ✅ PatternGenerator: Extracted 14 items immediately
 ✅ [orch-1763730371748-9t6s] PatternGenerator process() completed - agent finished
 ✅ Tool PatternGenerator completed in 46ms
 🔍 PlanningAgent consuming and validating PatternGenerator results using Claude Code-style logic
 🎯 PlanningAgent: Consuming and validating results from PatternGenerator
 🔍 PlanningAgent: Deep validation of PatternGenerator results for query: "using ddp pdf file build a lesson plan for me on distributed training on llms "
 ✅ PatternGenerator results validated: 2 content-grounded patterns for query intent
 ✅ PatternGenerator validation passed
 🔍 Quality assessment for PatternGenerator: acceptable
 ⚡ Strategic validation: Skipping validation for PatternGenerator (not a strategic checkpoint)
 ✅ Found 14 items in context.extractedData.raw
 ✅ PatternGenerator micro-session goal achieved: patterns + extraction complete
 🧾 Micro-session "Extract structured data using generated patterns" finished with status: completed
 ✅ Found 14 items in context.extractedData.raw
 🎯 Starting micro-session: "Synthesize findings into final response"
 ✅ Found 14 items in context.extractedData.raw
 🔄 Master LLM Iteration 4: Synthesize findings into final response
 🔧 Attempting intelligent fallback for: "DataInspector"
 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "Extractor"
 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
 🔧 Attempting intelligent fallback for: "ResponseFormatter"
 🎯 Mapping ResponseFormatter → ResponseFormatter (semantic similarity)
 🔄 aiProviders object updated
 🔄 aiProviders object updated
webpack-internal:///…evelopment.js:16378 [Violation] 'click' handler took 208ms
 🧠 Master LLM Decision Response (703 chars): ACTION: CALL_TOOL
TOOL_NAME: SynthesisCoordinator
REASONING: The pipeline is at Phase 5: Synthesis, with all prerequisites completed (DataInspector, PlanningAgent, PatternGenerator with integrated extraction). DataAnalyzer is bypassed due to the filtering bug, so SynthesisCoordinator is the next logical step to assemble the raw extracted data and patterns into a comprehensive lesson plan structure, organizing DDP concepts into teachable modules with learning objectives, breakdowns, timelines, pr...
 🔍 PARSING DEBUG: Full response (703 chars): ACTION: CALL_TOOL
TOOL_NAME: SynthesisCoordinator
REASONING: The pipeline is at Phase 5: Synthesis, with all prerequisites completed (DataInspector, PlanningAgent, PatternGenerator with integrated extraction). DataAnalyzer is bypassed due to the filtering bug, so SynthesisCoordinator is the next logical step to assemble the raw extracted data and patterns into a comprehensive lesson plan structure, organizing DDP concepts into teachable modules with learning objectives, breakdowns, timelines, prerequisites, labs, and assessments, directly advancing toward the final response.
NEXT_GOAL: Generate a synthesized lesson plan from the extracted DDP content, ready for formatting into the final answer.
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
makeMasterLLMDecision @ webpack-internal:///…rchestrator.ts:1032
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:727
 🎯 PARSED ACTION (FIRST): CALL_TOOL
 🎯 PARSED TOOL_NAME (FIRST): SynthesisCoordinator
 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=SynthesisCoordinator
 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'SynthesisCoordinator', reasoning: 'Need to call SynthesisCoordinator to progress toward the goal'}
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔍 PLAN-GUIDED VALIDATION: SynthesisCoordinator
 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent, PatternGenerator]
 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
 ⚠️ PLAN-AWARE SEQUENCING WARNING: Critical prerequisite required: Extractor must run before SynthesisCoordinator
overrideMethod @ installHook.js:1
executeToolCall @ webpack-internal:///…rchestrator.ts:1947
executeToolCallWithMicroSession @ webpack-internal:///…Orchestrator.ts:863
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:749
 💡 Suggestion: Call Extractor before SynthesisCoordinator
overrideMethod @ installHook.js:1
executeToolCall @ webpack-internal:///…rchestrator.ts:1949
executeToolCallWithMicroSession @ webpack-internal:///…Orchestrator.ts:863
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:749
 📊 Micro-session status:
   - Extraction completed: true
   - Synthesis completed: false
 ✅ Found 14 items in context.extractedData.raw
   - Has extracted data: true
   - Completed sessions: Analyze document structure and relevance, Extract structured data using generated patterns
 🔧 Attempting intelligent fallback for: "Extractor"
 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
 🔄 Auto-enforcing pipeline: running Extractor before SynthesisCoordinator
 🔧 Attempting intelligent fallback for: "Extractor"
 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
 🔧 Attempting intelligent fallback for: "Extractor"
 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
 🔍 PLAN-GUIDED VALIDATION: Extractor
 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent, PatternGenerator]
 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
 🔧 Attempting intelligent fallback for: "DataInspector"
 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "Extractor"
 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
 🔧 Attempting intelligent fallback for: "DataInspector"
 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🎯 Validating Extractor prerequisites - checking PatternGenerator dependency
 📊 PatternGenerator called: true
 ⚡ Allowing Extractor to skip optional prerequisites: [SynthesisCoordinator]
 ✅ Extractor validated against execution plan - prerequisites met
 ✅ Agent execution validated: Extractor execution follows planned sequence - step 3 of 4
 🚫 SKIPPING REDUNDANT EXTRACTOR: PatternGenerator already extracted 14 items
 ✅ Using PatternGenerator's extracted data to prevent overwriting good results
 ✅ Extractor completed - re-evaluating SynthesisCoordinator
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔍 PLAN-GUIDED VALIDATION: SynthesisCoordinator
 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent, PatternGenerator, Extractor]
 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
 ✅ Found 14 items in context.extractedData.raw
 ✅ Extraction prerequisite satisfied: 14 items extracted
 🔧 Attempting intelligent fallback for: "DataInspector"
 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "DataInspector"
 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
 🎯 Validating SynthesisCoordinator prerequisites - checking extraction completion
 ✅ Extraction micro-session completed - SynthesisCoordinator can proceed
 📊 Has extracted data: true
 ✅ SynthesisCoordinator will work directly with 14 extracted items (DataAnalyzer bypassed)
 ✅ SynthesisCoordinator validated against execution plan - prerequisites met
 ✅ Agent execution validated: SynthesisCoordinator execution follows planned sequence - step 2 of 4
 🔧 Executing tool: SynthesisCoordinator (original: SynthesisCoordinator)
 ⏳ [orch-1763730371748-9t6s] Starting SynthesisCoordinator - waiting for completion...
 🎯 SynthesisCoordinator: Using extracted data (14 items)
 🔍 DEBUG: First data item structure: {
  "content": " Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists, ints) into model-ready tensors in one elegant line — {k: torch.tensor(v).to(device) for k, v in item.items()}",
  "value": " Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists, ints) into model-ready tensors in one elegant line — {k: torch.tensor(v).to(device) for k, v in item.items()}",
  "unit": "",
  "context": "TL;DR\n\n Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists, ints) into model-ready tensors in one elegant line — {k: torch.tensor(v).to(device) for k, v in item.items()}\n\nconverts Hugging Face dataset samples to GPU ten",
  "confidence": 0.9,
  "sourceChunkId": "chunk_0",
  "sourceDocument": "thefirehacker-github-io-til-ddp-python-basics-html.pdf",
  "metadata": {
    "method": "regex",
    "type": "pattern_generated",
    "pattern": "/([^\\n]*(?:DDP \\(Distributed Data Parallel\\)|Dictionary comprehensions|Kwargs unpacking \\(\\*\\*\\)|all_reduce \\(SUM\\)|Seeding)[^\\n]*)/gi",
    "description": "Method extraction using DataInspector intelligence"
  }
}
 🔍 DEBUG: All data items count: 14
 🔍 DEBUG Item 1: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 2: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 3: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 4: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 5: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 6: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 7: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 8: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 9: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 10: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 11: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 12: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 13: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 14: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🎯 SynthesisCoordinator: Assembling final report from 0 sections
 🎯 SynthesisCoordinator: Generating query-focused report for: "using ddp pdf file build a lesson plan for me on distributed training on llms "
 🎯 Ranked 14 data items by query relevance
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 1: {content: '12) Quick Reference: Gradient sync patterns DDP from Scratch: a learner-friendly guide Learn why dic', value: '12) Quick Reference: Gradient sync patterns DDP fr…equivalent in distributed training. Plus: build a', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 100}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 2: {content: 'TL;DR 0) Visual mental model of distributed training 1) Seeding: making model replicas identical 2) ', value: 'TL;DR 0) Visual mental model of distributed traini…d? 6) Common pitfalls & fixes 7) From toy to real', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 90}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 3: {content: '# In your entry point (each process runs this): set_seed(43) # must happen BEFORE model creation mod', value: '# In your entry point (each process runs this): se… the model doesn’t retroactively change weights."', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 4: {content: 'would either error or require slow implicit conversion on each forward pass. For large datasetslarge', value: 'would either error or require slow implicit conver…he entire dict in memory). A better approach uses', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 5: {content: 'implementation detail that ensures correctness. In Mini DDP , we make this synchronization explicit ', value: "implementation detail that ensures correctness. In…0_buf, src=0) # everyone receives rank0's tens or", source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 6: {content: ' Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Diction', value: ' Core Python patterns explained: Core Python pat…ch.tensor(v).to(device) for k, v in item.items()}', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 7: {content: 'AUTHOR PUBLISHED THE FIRE HACKERTHE FIRE HACKER Home Blog Today I Learned About Me   1) Seeding: m', value: 'AUTHOR PUBLISHED THE FIRE HACKERTHE FIRE HACKER Ho…W’}, averaging grads is meaningless. We seed each', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 8: {content: 'Why this transformation is essential:Why this transformation is essential: Hugging Face datasets ret', value: 'Why this transformation is essential:Why this tran… grads) │ divide by world_size │ optimizer.step()', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 9: {content: 'initialization: 1. enforce_broadcast=Falseenforce_broadcast=False (default) (default): Verifies Veri', value: 'initialization: 1. enforce_broadcast=Falseenforce_… responsible for ensuring equality (via seeding),', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 10: {content: 'and the wrapper checks that you did it correctly. 2. enforce_broadcast=Trueenforce_broadcast=True : ', value: 'and the wrapper checks that you did it correctly. …ed or parameters diverged, everyone gets rank 0’s', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 208ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
eval @ webpack-internal:///…i-agent/index.ts:91
generateQueryFocusedReport @ webpack-internal:///…isCoordinator.ts:94
assembleReport @ webpack-internal:///…isCoordinator.ts:77
process @ webpack-internal:///…isCoordinator.ts:49
await in process
executeToolCall @ webpack-internal:///…rchestrator.ts:2091
await in executeToolCall
executeToolCall @ webpack-internal:///…rchestrator.ts:1968
await in executeToolCall
executeToolCallWithMicroSession @ webpack-internal:///…Orchestrator.ts:863
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:749
 ✅ [orch-1763730371748-9t6s] SynthesisCoordinator process() completed - agent finished
 ✅ Tool SynthesisCoordinator completed in 28642ms
 🔍 PlanningAgent consuming and validating SynthesisCoordinator results using Claude Code-style logic
 🎯 PlanningAgent: Consuming and validating results from SynthesisCoordinator
 🔍 PlanningAgent: Validating SynthesisCoordinator results for hallucination detection
 ❌ SynthesisCoordinator validation failed: No synthesis result available
 🔄 PlanningAgent: Triggering intelligent replanning - rerun_synthesis
 📝 Reason: No synthesis result available
 🎯 Specific guidance: Ensure SynthesisCoordinator has access to extracted data before synthesis
 ✅ Replanning request created with session-specific guidance: {target: 'PatternGenerator', guidance: 'Ensure SynthesisCoordinator has access to extracted data before synthesis', priority: 'general_improvement', sessionContext: {…}}
 🔍 Quality assessment for SynthesisCoordinator: replan_required
 ⚠️ Result quality insufficient: PlanningAgent identified quality issues requiring replanning
 🔄 Attempting intelligent retry for SynthesisCoordinator
 🔄 Intelligent retry #1 for SynthesisCoordinator: Use corrective guidance from replanning requests
 🔄 Replanning context: rerun_synthesis - No synthesis result available
 🎯 Specific corrective guidance: Ensure SynthesisCoordinator has access to extracted data before synthesis
 🎯 Executing SynthesisCoordinator retry with applied corrective guidance
 🎯 SynthesisCoordinator: Using extracted data (14 items)
 🔍 DEBUG: First data item structure: {
  "content": " Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists, ints) into model-ready tensors in one elegant line — {k: torch.tensor(v).to(device) for k, v in item.items()}",
  "value": " Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists, ints) into model-ready tensors in one elegant line — {k: torch.tensor(v).to(device) for k, v in item.items()}",
  "unit": "",
  "context": "TL;DR\n\n Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists, ints) into model-ready tensors in one elegant line — {k: torch.tensor(v).to(device) for k, v in item.items()}\n\nconverts Hugging Face dataset samples to GPU ten",
  "confidence": 0.9,
  "sourceChunkId": "chunk_0",
  "sourceDocument": "thefirehacker-github-io-til-ddp-python-basics-html.pdf",
  "metadata": {
    "method": "regex",
    "type": "pattern_generated",
    "pattern": "/([^\\n]*(?:DDP \\(Distributed Data Parallel\\)|Dictionary comprehensions|Kwargs unpacking \\(\\*\\*\\)|all_reduce \\(SUM\\)|Seeding)[^\\n]*)/gi",
    "description": "Method extraction using DataInspector intelligence"
  }
}
 🔍 DEBUG: All data items count: 14
 🔍 DEBUG Item 1: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 2: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 3: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 4: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 5: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 6: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 7: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 8: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 9: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 10: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 11: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 12: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 13: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 14: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🎯 SynthesisCoordinator: Assembling final report from 0 sections
 🎯 SynthesisCoordinator: Generating query-focused report for: "using ddp pdf file build a lesson plan for me on distributed training on llms "
 🎯 Ranked 14 data items by query relevance
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 1: {content: '12) Quick Reference: Gradient sync patterns DDP from Scratch: a learner-friendly guide Learn why dic', value: '12) Quick Reference: Gradient sync patterns DDP fr…equivalent in distributed training. Plus: build a', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 100}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 2: {content: 'TL;DR 0) Visual mental model of distributed training 1) Seeding: making model replicas identical 2) ', value: 'TL;DR 0) Visual mental model of distributed traini…d? 6) Common pitfalls & fixes 7) From toy to real', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 90}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 3: {content: '# In your entry point (each process runs this): set_seed(43) # must happen BEFORE model creation mod', value: '# In your entry point (each process runs this): se… the model doesn’t retroactively change weights."', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 4: {content: 'would either error or require slow implicit conversion on each forward pass. For large datasetslarge', value: 'would either error or require slow implicit conver…he entire dict in memory). A better approach uses', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 5: {content: 'implementation detail that ensures correctness. In Mini DDP , we make this synchronization explicit ', value: "implementation detail that ensures correctness. In…0_buf, src=0) # everyone receives rank0's tens or", source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 6: {content: ' Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Diction', value: ' Core Python patterns explained: Core Python pat…ch.tensor(v).to(device) for k, v in item.items()}', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 7: {content: 'AUTHOR PUBLISHED THE FIRE HACKERTHE FIRE HACKER Home Blog Today I Learned About Me   1) Seeding: m', value: 'AUTHOR PUBLISHED THE FIRE HACKERTHE FIRE HACKER Ho…W’}, averaging grads is meaningless. We seed each', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 8: {content: 'Why this transformation is essential:Why this transformation is essential: Hugging Face datasets ret', value: 'Why this transformation is essential:Why this tran… grads) │ divide by world_size │ optimizer.step()', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 9: {content: 'initialization: 1. enforce_broadcast=Falseenforce_broadcast=False (default) (default): Verifies Veri', value: 'initialization: 1. enforce_broadcast=Falseenforce_… responsible for ensuring equality (via seeding),', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
 🔍 DEBUG Prompt Item 10: {content: 'and the wrapper checks that you did it correctly. 2. enforce_broadcast=Trueenforce_broadcast=True : ', value: 'and the wrapper checks that you did it correctly. …ed or parameters diverged, everyone gets rank 0’s', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 240ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
eval @ webpack-internal:///…i-agent/index.ts:91
generateQueryFocusedReport @ webpack-internal:///…isCoordinator.ts:94
assembleReport @ webpack-internal:///…isCoordinator.ts:77
process @ webpack-internal:///…isCoordinator.ts:49
await in process
performIntelligentRetry @ webpack-internal:///…rchestrator.ts:2846
await in performIntelligentRetry
executeToolCall @ webpack-internal:///…rchestrator.ts:2104
 ✅ Agent SynthesisCoordinator retry completed successfully with corrective guidance
 🎯 Strategic validation checkpoint: SynthesisCoordinator - running PlanningAgent validation
 🔍 PlanningAgent consuming SynthesisCoordinator results for quality analysis...
 🎯 PlanningAgent: Consuming and validating results from [object Object]
 ℹ️ No specific validation for [object Object] - allowing to continue
 ✅ SynthesisCoordinator results validated by PlanningAgent - quality acceptable
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 209ms
 ⏱️ Validation UI sync delay completed
 🧾 Micro-session "Synthesize findings into final response" finished with status: completed
 ✅ Found 14 items in context.extractedData.raw
 🎯 Starting micro-session: "Format and finalize response for delivery"
 ✅ Found 14 items in context.extractedData.raw
 ✅ All required pipeline stages completed - stopping orchestration
 🧾 Micro-session "Format and finalize response for delivery" finished with status: completed
 📝 Master Orchestrator final result: {hasAnswer: true, answerLength: 5211, preview: '# Lesson Plan: Distributed Training on LLMs using DDP\n\nBased on the DDP PDF file provided, here is a'}
 🔄 aiProviders object updated
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
process @ webpack-internal:///…ePlannerAgent.ts:24
await in process
useAIFlowBuilder.useCallback[planFlow] @ webpack-internal:///…FlowBuilder.ts:1623
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 214ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
process @ webpack-internal:///…eneratorAgent.ts:26
await in process
useAIFlowBuilder.useCallback[planFlow] @ webpack-internal:///…FlowBuilder.ts:1630
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 207ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 ⏰ Auto-saving session (2-minute interval)...
 📋 Retrieved latest revision for session_ai-flow_1763729348176_4tytx2t7u: 9-gvswskhojb
 📊 Synced frame AI Flow: using ddp pdf file build a lesson plan for me on d to Knowledge Base (updated)
 🔍 Verifying document persistence: session_ai-flow_1763729348176_4tytx2t7u (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for session_ai-flow_1763729348176_4tytx2t7u: 10-gvswskhojb
 ✅ Document persistence verified: AI Flow: using ddp pdf file build a lesson plan for me on d (ID: session_ai-flow_1763729348176_4tytx2t7u, Rev: 10-gvswskhojb)
 💾 Session saved: AI Flow: using ddp pdf file build a lesson plan for me on d (ai-flow_1763729348176_4tytx2t7u)
 🔄 aiProviders object updated
 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'ai-flow_1763729348176_4tytx2t7u', sessionsCount: 1, sessionsList: Array(1)}
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 203ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
process @ webpack-internal:///…eneratorAgent.ts:26
await in process
useAIFlowBuilder.useCallback[planFlow] @ webpack-internal:///…FlowBuilder.ts:1630
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 202ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
process @ webpack-internal:///…eneratorAgent.ts:26
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 217ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
process @ webpack-internal:///…eneratorAgent.ts:26
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 237ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
process @ webpack-internal:///…eneratorAgent.ts:26
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 211ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ webpack-internal:///…erConnection.ts:302
useAIProviders.useCallback[callLLM] @ webpack-internal:///…seAIProviders.ts:80
useAIFlowBuilder.useCallback[planFlow].llmBridge @ webpack-internal:///…FlowBuilder.ts:1582
process @ webpack-internal:///…eneratorAgent.ts:26
 🔬 DEBUG CHECKPOINT: Exported 6 frames to debug-frames-flowframegenerator-2025-11-21T13-11-01-719Z.json
 ⚠️ Validation warnings: {undefinedFrames: 0, missingTitle: 0, missingInformationText: 0, missingType: 0, missingOrder: 0}
 ✅ Filtered frames: 6 → 6 valid
 ⚠️ Document processor unavailable - storing virtual document without embeddings
overrideMethod @ installHook.js:1
addVirtualDocument @ webpack-internal:///…/VectorStore.ts:717
useAIFlowBuilder.useCallback[persistSessionToKnowledgeBase] @ webpack-internal:///…IFlowBuilder.ts:797
useAIFlowBuilder.useCallback[persistSessionState] @ webpack-internal:///…IFlowBuilder.ts:829
useAIFlowBuilder.useCallback[planFlow] @ webpack-internal:///…FlowBuilder.ts:1710
 🔄 aiProviders object updated
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 424ms
 🔄 aiProviders object updated
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 [Fast Refresh] rebuilding
ai-frames:1 Uncaught (in promise) 
ai-frames:1 Uncaught (in promise) 
ai-frames:1 Uncaught (in promise) 
ai-frames:1 Uncaught (in promise) 
 [Fast Refresh] rebuilding
 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/8671493ea045e1d8.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763730319684:1367
Promise.then
hotCheck @ webpack.js?v=1763730319684:553
tryApplyUpdatesWebpack @ webpack-internal:///…oader-client.js:132
handleHotUpdate @ webpack-internal:///…oader-client.js:170
processMessage @ webpack-internal:///…oader-client.js:249
handler @ webpack-internal:///…oader-client.js:473
 [Fast Refresh] done in 253ms
 Fetch failed loading: GET "http://localhost:3000/ai-frames?_rsc=18lmo".
createFetch @ webpack-internal:///…ver-response.js:163
fetchServerResponse @ webpack-internal:///…rver-response.js:98
hmrRefreshReducerImpl @ webpack-internal:///…fresh-reducer.js:34
clientReducer @ webpack-internal:///…outer-reducer.js:41
action @ webpack-internal:///…ter-instance.js:156
runAction @ webpack-internal:///…uter-instance.js:66
dispatchAction @ webpack-internal:///…ter-instance.js:120
dispatch @ webpack-internal:///…ter-instance.js:154
eval @ webpack-internal:///…-action-queue.js:55
startTransition @ webpack-internal:///…development.js:7843
dispatch @ webpack-internal:///…-action-queue.js:54
dispatchAppRouterAction @ webpack-internal:///…-action-queue.js:37
eval @ webpack-internal:///…ter-instance.js:274
exports.startTransition @ webpack-internal:///…development.js:1129
hmrRefresh @ webpack-internal:///…ter-instance.js:273
eval @ webpack-internal:///…oader-client.js:296
exports.startTransition @ webpack-internal:///…development.js:1129
processMessage @ webpack-internal:///…oader-client.js:295
handler @ webpack-internal:///…oader-client.js:473
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/d55f342fbe263a0f.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763730319684:1367
Promise.then
hotCheck @ webpack.js?v=1763730319684:553
tryApplyUpdatesWebpack @ webpack-internal:///…oader-client.js:132
handleHotUpdate @ webpack-internal:///…oader-client.js:170
processMessage @ webpack-internal:///…oader-client.js:249
handler @ webpack-internal:///…oader-client.js:473
 Fetch finished loading: GET "http://localhost:3000/ai-frames?_rsc=18lmo".
createFetch @ webpack-internal:///…ver-response.js:163
fetchServerResponse @ webpack-internal:///…rver-response.js:98
hmrRefreshReducerImpl @ webpack-internal:///…fresh-reducer.js:34
clientReducer @ webpack-internal:///…outer-reducer.js:41
action @ webpack-internal:///…ter-instance.js:156
runAction @ webpack-internal:///…uter-instance.js:66
dispatchAction @ webpack-internal:///…ter-instance.js:120
dispatch @ webpack-internal:///…ter-instance.js:154
eval @ webpack-internal:///…-action-queue.js:55
startTransition @ webpack-internal:///…development.js:7843
dispatch @ webpack-internal:///…-action-queue.js:54
dispatchAppRouterAction @ webpack-internal:///…-action-queue.js:37
eval @ webpack-internal:///…ter-instance.js:274
exports.startTransition @ webpack-internal:///…development.js:1129
hmrRefresh @ webpack-internal:///…ter-instance.js:273
eval @ webpack-internal:///…oader-client.js:296
exports.startTransition @ webpack-internal:///…development.js:1129
processMessage @ webpack-internal:///…oader-client.js:295
handler @ webpack-internal:///…oader-client.js:473
 [Fast Refresh] done in 530ms
 🔄 aiProviders object updated
[Violation] Forced reflow while executing JavaScript took 52ms
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1763730674393 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
 Unknown attachment type: "code", defaulting to text-attachment
overrideMethod @ installHook.js:1
normalizeAttachmentType @ webpack-internal:///…FlowBuilder.ts:1911
useAIFlowBuilder.useCallback[convertDraftToFrame] @ webpack-internal:///…FlowBuilder.ts:1940
useAIFlowBuilder.useCallback[acceptDrafts] @ webpack-internal:///…FlowBuilder.ts:2227
handleAcceptAll @ webpack-internal:///…uilderPanel.tsx:333
executeDispatch @ webpack-internal:///…evelopment.js:16502
runWithFiberInDEV @ webpack-internal:///….development.js:845
processDispatchQueue @ webpack-internal:///…evelopment.js:16552
eval @ webpack-internal:///…evelopment.js:17150
batchedUpdates$1 @ webpack-internal:///…development.js:3263
dispatchEventForPluginEventSystem @ webpack-internal:///…evelopment.js:16706
dispatchEvent @ webpack-internal:///…evelopment.js:20816
dispatchDiscreteEvent @ webpack-internal:///…evelopment.js:20784
 Unknown attachment type: "cheatsheet", defaulting to text-attachment
overrideMethod @ installHook.js:1
normalizeAttachmentType @ webpack-internal:///…FlowBuilder.ts:1911
useAIFlowBuilder.useCallback[convertDraftToFrame] @ webpack-internal:///…FlowBuilder.ts:1940
useAIFlowBuilder.useCallback[acceptDrafts] @ webpack-internal:///…FlowBuilder.ts:2227
handleAcceptAll @ webpack-internal:///…uilderPanel.tsx:333
executeDispatch @ webpack-internal:///…evelopment.js:16502
runWithFiberInDEV @ webpack-internal:///….development.js:845
processDispatchQueue @ webpack-internal:///…evelopment.js:16552
eval @ webpack-internal:///…evelopment.js:17150
batchedUpdates$1 @ webpack-internal:///…development.js:3263
dispatchEventForPluginEventSystem @ webpack-internal:///…evelopment.js:16706
dispatchEvent @ webpack-internal:///…evelopment.js:20816
dispatchDiscreteEvent @ webpack-internal:///…evelopment.js:20784
 📦 Accept All: Pushing 6 frames and 3 chapters
 📦 Frame IDs: (6) ['frame_1', 'frame_2', 'frame_3', 'frame_4', 'frame_5', 'frame_6']
 📦 Chapter frame mappings: (3) [{…}, {…}, {…}]
 No graph nodes to organize
 🔄 aiProviders object updated
 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 6, hasUnifiedMethods: true}
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 4
 🔄 aiProviders object updated
 🧪 Graph merge from initialGraphState {existingNodeCount: 12, incomingNodeIds: Array(9), appendedNodeIds: Array(9), skippedFrameIds: Array(0), skippedAttachmentIds: Array(0), …}
webpack-internal:///…evelopment.js:16378 [Violation] 'click' handler took 414ms
 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
 ✅ Session document inserted successfully: {sessionId: 'session_1763730679584', documentId: 'sess-1763730679584-lqryol'}
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 5
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 6
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 7
 🔄 aiProviders object updated
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 🧪 Graph merge from initialGraphState {existingNodeCount: 21, incomingNodeIds: Array(3), appendedNodeIds: Array(3), skippedFrameIds: Array(0), skippedAttachmentIds: Array(0), …}
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 8
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooks @ webpack-internal:///…development.js:6667
updateFunctionComponent @ webpack-internal:///…development.js:8931
beginWork @ webpack-internal:///…evelopment.js:10556
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ webpack-internal:///…st/esm/index.js:723
NodeWrapper @ webpack-internal:///…t/esm/index.js:2966
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
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 9
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 10
 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 6, chapterCount: 3, nodeCount: 24, edgeCount: 6, frameIds: Array(6), …}
 💾 Starting unified save... {skipVectorStore: false}
 🔄 aiProviders object updated
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 11
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 12
 ✅ IndexedDB save completed
 📊 Synced frame AI-Frame: This frame introduces Distributed Data Parallel (DDP) as a PyTorch technique for scaling LLM training across multiple GPUs through data sharding and gradient synchronization. to Knowledge Base (inserted)
 💾 Database flush completed
 🔍 Verifying document persistence: aiframe-frame_1 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-frame_1: 1-gvswskhojb
 ✅ Document persistence verified: AI-Frame: This frame introduces Distributed Data Parallel (DDP) as a PyTorch technique for scaling LLM training across multiple GPUs through data sharding and gradient synchronization. (ID: aiframe-frame_1, Rev: 1-gvswskhojb)
 📊 Synced frame AI-Frame: This frame visually explains DDP's parallel forward/backward passes and gradient averaging to build an intuitive mental model of multi-GPU training. to Knowledge Base (inserted)
 💾 Database flush completed
 🔍 Verifying document persistence: aiframe-frame_2 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-frame_2: 1-gvswskhojb
 ✅ Document persistence verified: AI-Frame: This frame visually explains DDP's parallel forward/backward passes and gradient averaging to build an intuitive mental model of multi-GPU training. (ID: aiframe-frame_2, Rev: 1-gvswskhojb)
 📊 Synced frame AI-Frame: This frame explains process seeding and parameter broadcasting to create identical model replicas in DDP, ensuring stable and reproducible distributed training. to Knowledge Base (inserted)
 💾 Database flush completed
 🔍 Verifying document persistence: aiframe-frame_3 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-frame_3: 1-gvswskhojb
 ✅ Document persistence verified: AI-Frame: This frame explains process seeding and parameter broadcasting to create identical model replicas in DDP, ensuring stable and reproducible distributed training. (ID: aiframe-frame_3, Rev: 1-gvswskhojb)
 📊 Synced frame AI-Frame: This frame teaches dictionary comprehensions for efficient tensor preparation and kwargs unpacking for streamlined Hugging Face model inputs in distributed LLM training. to Knowledge Base (inserted)
 💾 Database flush completed
 🔍 Verifying document persistence: aiframe-frame_4 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-frame_4: 1-gvswskhojb
 ✅ Document persistence verified: AI-Frame: This frame teaches dictionary comprehensions for efficient tensor preparation and kwargs unpacking for streamlined Hugging Face model inputs in distributed LLM training. (ID: aiframe-frame_4, Rev: 1-gvswskhojb)
 📊 Synced frame AI-Frame: Implement a minimal DDP wrapper using dist.all_reduce for gradient averaging and build a distributed training loop, understanding its equivalence to LR scaling. to Knowledge Base (inserted)
 💾 Database flush completed
 🔍 Verifying document persistence: aiframe-frame_5 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-frame_5: 1-gvswskhojb
 ✅ Document persistence verified: AI-Frame: Implement a minimal DDP wrapper using dist.all_reduce for gradient averaging and build a distributed training loop, understanding its equivalence to LR scaling. (ID: aiframe-frame_5, Rev: 1-gvswskhojb)
 📊 Synced frame AI-Frame: This frame uncovers common DDP pitfalls like seeding and gradient errors, offers practical fixes including broadcast at init, and bridges to PyTorch's real DDP for production LLM scaling. to Knowledge Base (inserted)
 💾 Database flush completed
 🔍 Verifying document persistence: aiframe-frame_6 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-frame_6: 1-gvswskhojb
 ✅ Document persistence verified: AI-Frame: This frame uncovers common DDP pitfalls like seeding and gradient errors, offers practical fixes including broadcast at init, and bridges to PyTorch's real DDP for production LLM scaling. (ID: aiframe-frame_6, Rev: 1-gvswskhojb)
 📋 Retrieved latest revision for aiframe-chapters: 4-fmrfkejcnh
 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-chapters: 5-gvswskhojb
 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 5-gvswskhojb)
 ✅ Unified save completed successfully
 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ webpack-internal:///…ifiedStorage.ts:591
saveAll @ webpack-internal:///…nifiedStorage.ts:56
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ webpack-internal:///…ifiedStorage.ts:805
 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-21T13:11:20.273Z'}
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 240ms
 [Fast Refresh] rebuilding
 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/c5de8f9ee0cd19fd.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763730319684:1367
Promise.then
hotCheck @ webpack.js?v=1763730319684:553
tryApplyUpdatesWebpack @ webpack-internal:///…oader-client.js:132
handleHotUpdate @ webpack-internal:///…oader-client.js:170
processMessage @ webpack-internal:///…oader-client.js:249
handler @ webpack-internal:///…oader-client.js:473
 [Fast Refresh] done in 236ms
 Fetch finished loading: GET "http://localhost:3000/ai-frames?_rsc=18lmo".
createFetch @ webpack-internal:///…ver-response.js:163
fetchServerResponse @ webpack-internal:///…rver-response.js:98
hmrRefreshReducerImpl @ webpack-internal:///…fresh-reducer.js:34
clientReducer @ webpack-internal:///…outer-reducer.js:41
action @ webpack-internal:///…ter-instance.js:156
runAction @ webpack-internal:///…uter-instance.js:66
dispatchAction @ webpack-internal:///…ter-instance.js:120
dispatch @ webpack-internal:///…ter-instance.js:154
eval @ webpack-internal:///…-action-queue.js:55
startTransition @ webpack-internal:///…development.js:7843
dispatch @ webpack-internal:///…-action-queue.js:54
dispatchAppRouterAction @ webpack-internal:///…-action-queue.js:37
eval @ webpack-internal:///…ter-instance.js:274
exports.startTransition @ webpack-internal:///…development.js:1129
hmrRefresh @ webpack-internal:///…ter-instance.js:273
eval @ webpack-internal:///…oader-client.js:296
exports.startTransition @ webpack-internal:///…development.js:1129
processMessage @ webpack-internal:///…oader-client.js:295
handler @ webpack-internal:///…oader-client.js:473
 🔄 aiProviders object updated
[Violation] Forced reflow while executing JavaScript took 52ms
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1763730674393 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
