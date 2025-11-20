 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1h1v898116370za200zd898116370&_p=1763641550736&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=992738249.1763586559&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=6&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~115583767~115938466~115938468~116184927~116184929~116217636~116217638&sid=1763645150&sct=5&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&_et=29987&tfd=587003".
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
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
fn @ webpack.js?v=1763645291290:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7248
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
fn @ webpack.js?v=1763645291290:369
eval @ ClientAppProviders.tsx:8
(app-pages-browser)/./src/components/providers/ClientAppProviders.tsx @ layout.js:7226
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
fn @ webpack.js?v=1763645291290:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FClientAppProviders.tsx%22%2C%22ids%22%3A%5B%22ClientAppProviders%22%5D%7D&server=false!:5
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FClientAppProviders.tsx%22%2C%22ids%22%3A%5B%22ClientAppProviders%22%5D%7D&server=false! @ layout.js:4591
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
__webpack_exec__ @ layout.js:7424
(anonymous) @ layout.js:7425
__webpack_require__.O @ webpack.js?v=1763645291290:84
(anonymous) @ layout.js:7426
webpackJsonpCallback @ webpack.js?v=1763645291290:1388
(anonymous) @ layout.js:9
analytics.ts:160 📱 Device Info Collected: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', platform: 'MacIntel', vendor: 'Google Inc.', language: 'en-US', languages: Array(4), …}
analytics.ts:177 [Violation] Only request geolocation information in response to a user gesture.
collectLocationInfo @ analytics.ts:177
Analytics @ analytics.ts:75
eval @ analytics.ts:556
(app-pages-browser)/./src/lib/analytics.ts @ page.js:13558
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
fn @ webpack.js?v=1763645291290:369
eval @ Analytics.tsx:10
(app-pages-browser)/./src/components/analytics/Analytics.tsx @ page.js:13217
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
fn @ webpack.js?v=1763645291290:369
eval @ page.tsx:35
(app-pages-browser)/./src/app/ai-frames/page.tsx @ page.js:12876
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
fn @ webpack.js?v=1763645291290:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fai-frames%2Fpage.tsx%22%2C%22ids%22%3A%5B%5D%7D&server=false!:1
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fai-frames%2Fpage.tsx%22%2C%22ids%22%3A%5B%5D%7D&server=false! @ page.js:9135
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
__webpack_exec__ @ page.js:13954
(anonymous) @ page.js:13955
__webpack_require__.O @ webpack.js?v=1763645291290:84
(anonymous) @ page.js:13956
webpackJsonpCallback @ webpack.js?v=1763645291290:1388
(anonymous) @ page.js:9
analytics.ts:193 🌍 Location Info Collected: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US'}
analytics.ts:79 📊 GA4 Environment Variables Debug: {measurementId: 'G-V1B8R98P79', anonymizeIp: false, debugMode: false, siteName: 'TimeCapsule- SLM', siteUrl: 'http://localhost:3000', …}
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.168483326739462, longitude: 72.84659916927124, …}
unifiedStorage.ts:132 📂 Starting unified load...
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1470 🔄 Loading initial data with unified storage...
unifiedStorage.ts:132 📂 Starting unified load...
page.tsx:1552 🔧 AI-Frames unified storage interface updated: {hasVectorStore: false, vectorStoreInitialized: false, frameCount: 0, hasUnifiedMethods: true}
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
scheduler.development.js:14 [Violation] 'message' handler took 160ms
unifiedStorage.ts:137 ✅ Loaded from localStorage: 2 frames, 2 nodes
unifiedStorage.ts:137 ✅ Loaded from localStorage: 2 frames, 2 nodes
useUnifiedStorage.ts:952 ✅ Node node_1763645158029_2wqp8eivx_0 already in sync with frame data
useUnifiedStorage.ts:952 ✅ Node node_1763645161524_elbt0jn31_1 already in sync with frame data
useUnifiedStorage.ts:968 ✅ Load completed: 2 frames
useUnifiedStorage.ts:952 ✅ Node node_1763645158029_2wqp8eivx_0 already in sync with frame data
useUnifiedStorage.ts:952 ✅ Node node_1763645161524_elbt0jn31_1 already in sync with frame data
useUnifiedStorage.ts:968 ✅ Load completed: 2 frames
page.tsx:1476 ✅ Unified storage load completed successfully
page.tsx:1481 ✅ Initial data loading complete
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
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1552 🔧 AI-Frames unified storage interface updated: {hasVectorStore: false, vectorStoreInitialized: false, frameCount: 2, hasUnifiedMethods: true}
analytics.ts:271 📊 GA4: Initializing Google Analytics 4...
VectorStore.ts:612 ✅ RxDB Vector Store initialized successfully
VectorStore.ts:613 🧠 Xenova download running in background...
VectorStoreProvider.tsx:85 ✅ VectorStoreProvider: Singleton VectorStore initialized successfully
VectorStoreProvider.tsx:96 🔧 VectorStore exposed globally on window.vectorStore for testing
EnhancedLearningGraph.tsx:3688 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":true,"handleEdgesChangeChanged":true,"handleNodesDeleteChanged":true,"onConnectChanged":true,"onEdgesDeleteChanged":true,"onDropChanged":true}
EnhancedLearningGraph.tsx:3700 EnhancedLearningGraph rerender: 1
useAIProviders.ts:232 🔄 aiProviders object updated
sessionStore.ts:32 📦 SessionStore initialized
GraphStorageManager.ts:84 🗂️ Initializing GraphStorageManager with VectorStore backend...
GraphStorageManager.ts:86 ✅ GraphStorageManager initialized successfully
page.tsx:1552 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 2, hasUnifiedMethods: true}
VectorStoreProvider.tsx:153 ⏭️ Skipping auto-init for /ai-frames: {isInitialized: true, isInitializing: false, attemptedBefore: false, singletonInitialized: true}
EnhancedLearningGraph.tsx:3700 EnhancedLearningGraph rerender: 2
MetadataManager.ts:1022 📋 Syncing metadata with vector store...
MetadataManager.ts:611 🔄 Starting enhanced metadata sync to Knowledge Base... {bubblSpacesCount: 1, timeCapslesCount: 1, vectorStoreStatus: {…}}
MetadataManager.ts:628 📝 Syncing BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1763586530245c6)
VectorStore.ts:1270 🗑️ Deleting document: bubblspace-bubbl-1763586530245c6 (attempt 1/5)
page.tsx:1292 ✅ Managers initialized successfully
useAIProviders.ts:232 🔄 aiProviders object updated
Analytics.tsx:42 ⏳ Analytics: Skipping page tracking - no consent or not initialized
EnhancedLearningGraph.tsx:3688 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":true}
EnhancedLearningGraph.tsx:3700 EnhancedLearningGraph rerender: 3
VectorStore.ts:1988 📋 Retrieved latest revision for bubblspace-bubbl-1763586530245c6: 137-jaymvusqhf
VectorStore.ts:1279 📋 Document bubblspace-bubbl-1763586530245c6 found with revision: 137-jaymvusqhf
useDocuments.ts:78 📊 Document status updated: {documents: 10, totalSize: '1.5 MB', totalChunks: 30, totalVectors: 29, avgChunksPerDoc: '3.0', …}
sessionStore.ts:117 📋 Loaded 0 sessions
useAIFlowBuilder.ts:796 📋 Loaded 0 sessions from KB
sessionStore.ts:117 📋 Loaded 0 sessions
FrameGraphIntegration.tsx:1117 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
FrameGraphIntegration.tsx:1129 ✅ Session document inserted successfully: {sessionId: 'session_1763645295889', documentId: 'sess-1763645295888-6zoi1k'}
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:1283 ✅ Document deleted successfully: bubblspace-bubbl-1763586530245c6
MetadataManager.ts:634 🗑️ Deleted old BubblSpace document: bubblspace-bubbl-1763586530245c6
VectorStore.ts:2193 🔄 Bypassing duplicate detection for metadata update: BubblSpace: My BubblSpace
VectorStore.ts:2130 ✅ Document inserted: bubblspace-bubbl-1763586530245c6
VectorStore.ts:2622 🔍 Verifying document persistence: bubblspace-bubbl-1763586530245c6 (attempt 1/3)
VectorStore.ts:2667 💾 Database flush completed
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1763645291290:160
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
fn @ webpack.js?v=1763645291290:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1763645291290:182
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
__webpack_exec__ @ main-app.js?v=1763645291290:2824
(anonymous) @ main-app.js?v=1763645291290:2825
webpackJsonpCallback @ webpack.js?v=1763645291290:1388
(anonymous) @ main-app.js?v=1763645291290:9
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:1988 📋 Retrieved latest revision for bubblspace-bubbl-1763586530245c6: 139-ibhqzxglsd
VectorStore.ts:2635 ✅ Document persistence verified: BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1763586530245c6, Rev: 139-ibhqzxglsd)
MetadataManager.ts:681 ✅ BubblSpace synced to Knowledge Base: My BubblSpace
MetadataManager.ts:686 ✅ BubblSpace persistence verified: My BubblSpace
MetadataManager.ts:715 📝 Syncing TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-1763586530247iu)
VectorStore.ts:1270 🗑️ Deleting document: timecapsule-TC-1763586530247iu (attempt 1/5)
VectorStore.ts:1988 📋 Retrieved latest revision for timecapsule-TC-1763586530247iu: 137-jaymvusqhf
VectorStore.ts:1279 📋 Document timecapsule-TC-1763586530247iu found with revision: 137-jaymvusqhf
VectorStore.ts:1283 ✅ Document deleted successfully: timecapsule-TC-1763586530247iu
MetadataManager.ts:721 🗑️ Deleted old TimeCapsule document: timecapsule-TC-1763586530247iu
analytics.ts:305 ✅ GA4: Successfully initialized with enhanced tracking
Analytics.tsx:23 ✅ Analytics: GA4 initialized with user consent
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bj0h2v898116370za200zd898116370&_p=1763645296216&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=992738249.1763586559&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=1&tag_exp=103116026~103200004~104527907~104528501~104684208~104684211~115497441~115583767~115616986~115938466~115938469~116184927~116184929~116217636~116217638~116514483&sid=1763645150&sct=5&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=4988".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:445
TN @ js?id=G-V1B8R98P79:973
k.flush @ js?id=G-V1B8R98P79:980
k.Pb @ js?id=G-V1B8R98P79:977
k.add @ js?id=G-V1B8R98P79:980
k.Pm @ js?id=G-V1B8R98P79:995
k.Kr @ js?id=G-V1B8R98P79:995
(anonymous) @ js?id=G-V1B8R98P79:992
Wl @ js?id=G-V1B8R98P79:456
Vn @ js?id=G-V1B8R98P79:475
(anonymous) @ js?id=G-V1B8R98P79:992
c @ js?id=G-V1B8R98P79:921
(anonymous) @ js?id=G-V1B8R98P79:922
Promise.then
CJ @ js?id=G-V1B8R98P79:922
k.Jr @ js?id=G-V1B8R98P79:992
b @ js?id=G-V1B8R98P79:1006
v @ js?id=G-V1B8R98P79:499
em @ js?id=G-V1B8R98P79:458
Yp @ js?id=G-V1B8R98P79:499
Xp.flush @ js?id=G-V1B8R98P79:503
Xp.push @ js?id=G-V1B8R98P79:501
Pp @ js?id=G-V1B8R98P79:496
event @ js?id=G-V1B8R98P79:776
qB @ js?id=G-V1B8R98P79:782
b.push @ js?id=G-V1B8R98P79:788
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
VectorStore.ts:2193 🔄 Bypassing duplicate detection for metadata update: TimeCapsule: Untitled TimeCapsule
VectorStore.ts:2200 📋 Found 0 existing TimeCapsule documents for timeCapsuleId: TC-1763586530247iu
VectorStore.ts:2017 📋 TimeCapsule document operation: {id: 'timecapsule-TC-1763586530247iu', title: 'TimeCapsule: Untitled TimeCapsule', source: 'metadata', timeCapsuleId: 'TC-1763586530247iu', name: 'Untitled TimeCapsule', …}
VectorStore.ts:2130 ✅ Document inserted: timecapsule-TC-1763586530247iu
VectorStore.ts:2622 🔍 Verifying document persistence: timecapsule-TC-1763586530247iu (attempt 1/3)
VectorStore.ts:2667 💾 Database flush completed
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bj0h2v898116370za200zd898116370&_p=1763645296216&gcd=13l3l3l3l1l1&npa=0&dma=0&sr=2240x1260&cid=992738249.1763586559&ul=en-us&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&tag_exp=103116026~103200004~104527907~104528501~104684208~104684211~115497441~115583767~115616986~115938466~115938469~116184927~116184929~116217636~116217638~116514483&sid=1763645150&sct=5&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-11-20T13%3A28%3A16.224Z&epn.page_duration=1&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=142.0.0.0&ep.viewport_size=2240x834&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&_et=1&tfd=5094".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:445
TN @ js?id=G-V1B8R98P79:973
k.flush @ js?id=G-V1B8R98P79:980
k.Pb @ js?id=G-V1B8R98P79:977
k.add @ js?id=G-V1B8R98P79:980
k.Pm @ js?id=G-V1B8R98P79:995
k.Kr @ js?id=G-V1B8R98P79:995
(anonymous) @ js?id=G-V1B8R98P79:992
Wl @ js?id=G-V1B8R98P79:456
Vn @ js?id=G-V1B8R98P79:475
(anonymous) @ js?id=G-V1B8R98P79:992
c @ js?id=G-V1B8R98P79:921
CJ @ js?id=G-V1B8R98P79:921
k.Jr @ js?id=G-V1B8R98P79:992
b @ js?id=G-V1B8R98P79:1006
v @ js?id=G-V1B8R98P79:499
em @ js?id=G-V1B8R98P79:458
Yp @ js?id=G-V1B8R98P79:499
Xp.flush @ js?id=G-V1B8R98P79:503
Xp.push @ js?id=G-V1B8R98P79:501
Pp @ js?id=G-V1B8R98P79:496
event @ js?id=G-V1B8R98P79:776
qB @ js?id=G-V1B8R98P79:782
b.push @ js?id=G-V1B8R98P79:788
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
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bj0h2v898116370za200zd898116370&_p=1763645296216&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=992738249.1763586559&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=3&tag_exp=103116026~103200004~104527907~104528501~104684208~104684211~115497441~115583767~115616986~115938466~115938469~116184927~116184929~116217636~116217638~116514483&dt=AI-Frames&dl=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&sid=1763645150&sct=5&seg=1&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=learning&ep.page_type=interactive&ep.pathname=%2Fai-frames&ep.consent_analytics=true&ep.consent_functional=true&_et=105&tfd=5097".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:445
TN @ js?id=G-V1B8R98P79:973
k.flush @ js?id=G-V1B8R98P79:980
k.Pb @ js?id=G-V1B8R98P79:977
k.add @ js?id=G-V1B8R98P79:980
k.Pm @ js?id=G-V1B8R98P79:995
k.Kr @ js?id=G-V1B8R98P79:995
(anonymous) @ js?id=G-V1B8R98P79:992
Wl @ js?id=G-V1B8R98P79:456
Vn @ js?id=G-V1B8R98P79:475
(anonymous) @ js?id=G-V1B8R98P79:992
c @ js?id=G-V1B8R98P79:921
CJ @ js?id=G-V1B8R98P79:921
k.Jr @ js?id=G-V1B8R98P79:992
b @ js?id=G-V1B8R98P79:1006
v @ js?id=G-V1B8R98P79:499
em @ js?id=G-V1B8R98P79:458
Yp @ js?id=G-V1B8R98P79:499
Xp.flush @ js?id=G-V1B8R98P79:503
Xp.push @ js?id=G-V1B8R98P79:501
Pp @ js?id=G-V1B8R98P79:496
event @ js?id=G-V1B8R98P79:776
qB @ js?id=G-V1B8R98P79:782
b.push @ js?id=G-V1B8R98P79:788
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
page.tsx:1409 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1409
AIFramesPage.useEffect @ page.tsx:1453
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1763645291290:160
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
fn @ webpack.js?v=1763645291290:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1763645291290:182
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
__webpack_exec__ @ main-app.js?v=1763645291290:2824
(anonymous) @ main-app.js?v=1763645291290:2825
webpackJsonpCallback @ webpack.js?v=1763645291290:1388
(anonymous) @ main-app.js?v=1763645291290:9
VectorStore.ts:1988 📋 Retrieved latest revision for timecapsule-TC-1763586530247iu: 139-ibhqzxglsd
VectorStore.ts:2635 ✅ Document persistence verified: TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-1763586530247iu, Rev: 139-ibhqzxglsd)
MetadataManager.ts:772 ✅ TimeCapsule synced to Knowledge Base: Untitled TimeCapsule
MetadataManager.ts:777 ✅ TimeCapsule persistence verified: Untitled TimeCapsule
MetadataManager.ts:806 ✅ All metadata synced to Knowledge Base successfully {syncedBubblSpaces: 1, syncedTimeCapsules: 1, totalItems: 2}
MetadataManager.ts:1027 ✅ Metadata synced with vector store
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1763645291290:160
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
fn @ webpack.js?v=1763645291290:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1763645291290:182
options.factory @ webpack.js?v=1763645291290:712
__webpack_require__ @ webpack.js?v=1763645291290:37
__webpack_exec__ @ main-app.js?v=1763645291290:2824
(anonymous) @ main-app.js?v=1763645291290:2825
webpackJsonpCallback @ webpack.js?v=1763645291290:1388
(anonymous) @ main-app.js?v=1763645291290:9
useAIProviders.ts:232 🔄 aiProviders object updated
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
useAIProviders.ts:232 🔄 aiProviders object updated
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bj0h2v898116370za200zd898116370&_p=1763645296216&gcd=13l3l3l3l1l1&npa=0&dma=0&sr=2240x1260&cid=992738249.1763586559&ul=en-us&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&tag_exp=103116026~103200004~104527907~104528501~104684208~104684211~115497441~115583767~115616986~115938466~115938469~116184927~116184929~116217636~116217638~116514483&sid=1763645150&sct=5&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-11-20T13%3A28%3A16.341Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=142.0.0.0&ep.viewport_size=2240x834&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&_et=1&tfd=10100".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:445
TN @ js?id=G-V1B8R98P79:973
k.flush @ js?id=G-V1B8R98P79:980
(anonymous) @ js?id=G-V1B8R98P79:977
page.tsx:1409 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1409
page.tsx:1409 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1409
page.tsx:1409 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1409
EnhancedLearningGraph.tsx:3688 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3700 EnhancedLearningGraph rerender: 4
page.tsx:3371 🔍 CRITICAL: Frame index change called: {oldIndex: 0, newIndex: 1, frameCount: 2, stackTrace: '    at onFrameIndexChange (webpack-internal:///(ap…es-browser)/./src/app/ai-frames/page.tsx:3279:79)'}
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:1567 📥 handleGraphConnectionEvent received: {eventType: 'graph-connection-removed', hasConnection: true}
useUnifiedStorage.ts:1574 ⏭️ Skipping edge removal in graph-connection-event (handled by onEdgesDelete)
useUnifiedStorage.ts:1399 📥 handleConnectionChangedEvent received: {connectionType: 'removed', hasConnectionData: true}
useUnifiedStorage.ts:1405 ⏭️ Skipping edge removal in connection-changed-event (handled by onEdgesDelete)
DualPaneFrameView.tsx:164 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 1}
EnhancedLearningGraph.tsx:3688 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3700 EnhancedLearningGraph rerender: 5
page.tsx:3371 🔍 CRITICAL: Frame index change called: {oldIndex: 1, newIndex: 0, frameCount: 1, stackTrace: '    at onFrameIndexChange (webpack-internal:///(ap…es-browser)/./src/app/ai-frames/page.tsx:3279:79)'}
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1552 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:1599 🗑️ Frame deletion event detected: {frameId: 'frame-1763645161524-z2o6qm8u4', deletedFrameIds: Array(1)}
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:707 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(1), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
VectorStore.ts:1988 📋 Retrieved latest revision for aiframe-frame-1763645158030-hpciy7ag0: 2-jaymvusqhf
unifiedStorage.ts:553 ✅ IndexedDB save completed
VectorStore.ts:1924 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (updated)
VectorStore.ts:2622 🔍 Verifying document persistence: aiframe-frame-1763645158030-hpciy7ag0 (attempt 1/3)
VectorStore.ts:2667 💾 Database flush completed
VectorStore.ts:1988 📋 Retrieved latest revision for aiframe-frame-1763645158030-hpciy7ag0: 3-ibhqzxglsd
VectorStore.ts:2635 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1763645158030-hpciy7ag0, Rev: 3-ibhqzxglsd)
VectorStore.ts:1988 📋 Retrieved latest revision for aiframe-chapters: 74-jaymvusqhf
VectorStore.ts:1924 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2622 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2667 💾 Database flush completed
VectorStore.ts:1988 📋 Retrieved latest revision for aiframe-chapters: 75-ibhqzxglsd
VectorStore.ts:2635 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 75-ibhqzxglsd)
VectorStore.ts:1270 🗑️ Deleting document: aiframe-frame-1763645161524-z2o6qm8u4 (attempt 1/5)
VectorStore.ts:1988 📋 Retrieved latest revision for aiframe-frame-1763645161524-z2o6qm8u4: 1-jaymvusqhf
VectorStore.ts:1279 📋 Document aiframe-frame-1763645161524-z2o6qm8u4 found with revision: 1-jaymvusqhf
VectorStore.ts:1283 ✅ Document deleted successfully: aiframe-frame-1763645161524-z2o6qm8u4
unifiedStorage.ts:104 ✅ Unified save completed successfully
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:736
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleFrameDeletionEvent @ useUnifiedStorage.ts:1624
EnhancedLearningGraph.useCallback[handleNodesDelete] @ EnhancedLearningGraph.tsx:399
useUnifiedStorage.ts:740 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-20T13:28:46.129Z'}
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1763645291290:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/4ade77130a6d99e7.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763645291290:1367
Promise.then
hotCheck @ webpack.js?v=1763645291290:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
webpack.js?v=1763645291290:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/26e53d55c6910e19.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763645291290:1367
Promise.then
hotCheck @ webpack.js?v=1763645291290:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleApplyUpdates @ hot-reloader-client.js:123
eval @ hot-reloader-client.js:143
Promise.then
tryApplyUpdatesWebpack @ hot-reloader-client.js:142
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 641ms
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
page.tsx:1409 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1409
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:741
 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bj0h2v898116370za200zd898116370&_p=1763645296216&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=992738249.1763586559&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=5&tag_exp=103116026~103200004~104527907~104528501~104684208~104684211~115497441~115583767~115616986~115938466~115938469~116184927~116184929~116217636~116217638~116514483&sid=1763645150&sct=5&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=scroll&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&epn.percent_scrolled=90&_et=17427&tfd=44868".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:445
TN @ js?id=G-V1B8R98P79:973
k.flush @ js?id=G-V1B8R98P79:980
(anonymous) @ js?id=G-V1B8R98P79:977
setTimeout
k.Pb @ js?id=G-V1B8R98P79:977
k.add @ js?id=G-V1B8R98P79:980
k.Pm @ js?id=G-V1B8R98P79:995
k.Kr @ js?id=G-V1B8R98P79:995
(anonymous) @ js?id=G-V1B8R98P79:992
Wl @ js?id=G-V1B8R98P79:456
Vn @ js?id=G-V1B8R98P79:475
(anonymous) @ js?id=G-V1B8R98P79:992
c @ js?id=G-V1B8R98P79:921
CJ @ js?id=G-V1B8R98P79:921
k.Jr @ js?id=G-V1B8R98P79:992
b @ js?id=G-V1B8R98P79:1006
v @ js?id=G-V1B8R98P79:499
em @ js?id=G-V1B8R98P79:458
Yp @ js?id=G-V1B8R98P79:499
Xp.flush @ js?id=G-V1B8R98P79:503
Xp.push @ js?id=G-V1B8R98P79:501
Pp @ js?id=G-V1B8R98P79:496
event @ js?id=G-V1B8R98P79:776
qB @ js?id=G-V1B8R98P79:782
b.push @ js?id=G-V1B8R98P79:788
mB @ js?id=G-V1B8R98P79:789
uB @ js?id=G-V1B8R98P79:789
cI @ js?id=G-V1B8R98P79:891
YH @ js?id=G-V1B8R98P79:890
a @ js?id=G-V1B8R98P79:889
