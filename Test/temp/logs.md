page.tsx:1613 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1613
 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1764009330055&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1860015090.1764008661&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=6&tag_exp=102015666~103116026~103200004~104527906~104528501~104684208~104684211~105391252~115583767~115616985~115938465~115938468~116184927~116184929~116217636~116217638&sid=1764054354&sct=2&seg=0&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&_et=2457&tfd=8769471".
bd @ js:277
Cl @ js:443
SN @ js:970
(anonymous) @ js:977
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
options.factory @ webpack.js?v=1764054362449:712
__webpack_require__ @ webpack.js?v=1764054362449:37
fn @ webpack.js?v=1764054362449:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7248
options.factory @ webpack.js?v=1764054362449:712
__webpack_require__ @ webpack.js?v=1764054362449:37
fn @ webpack.js?v=1764054362449:369
eval @ ClientAppProviders.tsx:8
(app-pages-browser)/./src/components/providers/ClientAppProviders.tsx @ layout.js:7226
options.factory @ webpack.js?v=1764054362449:712
__webpack_require__ @ webpack.js?v=1764054362449:37
fn @ webpack.js?v=1764054362449:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FClientAppProviders.tsx%22%2C%22ids%22%3A%5B%22ClientAppProviders%22%5D%7D&server=false!:5
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FClientAppProviders.tsx%22%2C%22ids%22%3A%5B%22ClientAppProviders%22%5D%7D&server=false! @ layout.js:4591
options.factory @ webpack.js?v=1764054362449:712
__webpack_require__ @ webpack.js?v=1764054362449:37
__webpack_exec__ @ layout.js:7424
(anonymous) @ layout.js:7425
__webpack_require__.O @ webpack.js?v=1764054362449:84
(anonymous) @ layout.js:7426
webpackJsonpCallback @ webpack.js?v=1764054362449:1388
(anonymous) @ layout.js:9
analytics.ts:160 📱 Device Info Collected: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', platform: 'MacIntel', vendor: 'Google Inc.', language: 'en-US', languages: Array(4), …}
analytics.ts:193 🌍 Location Info Collected: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US'}
analytics.ts:79 📊 GA4 Environment Variables Debug: {measurementId: 'G-V1B8R98P79', anonymizeIp: false, debugMode: false, siteName: 'TimeCapsule- SLM', siteUrl: 'http://localhost:3000', …}
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.16836955638583, longitude: 72.8464444081081, …}
unifiedStorage.ts:132 📂 Starting unified load...
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: null, sessionsCount: 0, sessionsList: Array(0)}
page.tsx:1674 🔄 Loading initial data with unified storage...
unifiedStorage.ts:132 📂 Starting unified load...
page.tsx:1775 🔧 AI-Frames unified storage interface updated: {hasVectorStore: false, vectorStoreInitialized: false, frameCount: 0, hasUnifiedMethods: true}
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
scheduler.development.js:14 [Violation] 'message' handler took 182ms
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
page.tsx:1613 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1613
AIFramesPage.useEffect @ page.tsx:1657
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
unifiedStorage.ts:160 📭 No data found in any storage
useUnifiedStorage.ts:991 📭 No data found during load
unifiedStorage.ts:160 📭 No data found in any storage
useUnifiedStorage.ts:991 📭 No data found during load
page.tsx:1682 📭 No data found in unified storage
page.tsx:1685 ✅ Initial data loading complete
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:624 ✅ RxDB Vector Store initialized successfully
VectorStore.ts:625 🧠 Xenova download running in background...
VectorStoreProvider.tsx:85 ✅ VectorStoreProvider: Singleton VectorStore initialized successfully
VectorStoreProvider.tsx:96 🔧 VectorStore exposed globally on window.vectorStore for testing
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":true,"handleEdgesChangeChanged":true,"handleNodesDeleteChanged":true,"onConnectChanged":true,"onEdgesDeleteChanged":true,"onDropChanged":true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 1
useAIProviders.ts:232 🔄 aiProviders object updated
sessionStore.ts:32 📦 SessionStore initialized
useTimeCapsule.ts:36 🎯 TimeCapsuleStore initialized
GraphStorageManager.ts:84 🗂️ Initializing GraphStorageManager with VectorStore backend...
GraphStorageManager.ts:86 ✅ GraphStorageManager initialized successfully
page.tsx:1775 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 0, hasUnifiedMethods: true}
VectorStoreProvider.tsx:153 ⏭️ Skipping auto-init for /ai-frames: {isInitialized: true, isInitializing: false, attemptedBefore: false, singletonInitialized: true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 2
MetadataManager.ts:948 🔄 Force syncing metadata to Knowledge Base...
MetadataManager.ts:611 🔄 Starting enhanced metadata sync to Knowledge Base... {bubblSpacesCount: 1, timeCapslesCount: 0, vectorStoreStatus: {…}}
MetadataManager.ts:628 📝 Syncing BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1764054367585yf)
VectorStore.ts:1282 🗑️ Deleting document: bubblspace-bubbl-1764054367585yf (attempt 1/5)
MetadataManager.ts:948 🔄 Force syncing metadata to Knowledge Base...
MetadataManager.ts:611 🔄 Starting enhanced metadata sync to Knowledge Base... {bubblSpacesCount: 1, timeCapslesCount: 1, vectorStoreStatus: {…}}
MetadataManager.ts:628 📝 Syncing BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1764054367585yf)
MetadataManager.ts:75 ✅ Created default BubblSpace "My BubblSpace" and TimeCapsule "Untitled TimeCapsule"
MetadataManager.ts:1022 📋 Syncing metadata with vector store...
MetadataManager.ts:611 🔄 Starting enhanced metadata sync to Knowledge Base... {bubblSpacesCount: 1, timeCapslesCount: 1, vectorStoreStatus: {…}}
MetadataManager.ts:628 📝 Syncing BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1764054367585yf)
page.tsx:1496 ✅ Managers initialized successfully
Analytics.tsx:42 ⏳ Analytics: Skipping page tracking - no consent or not initialized
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 3
timeCapsuleStore.ts:83 📋 Listed 0 TimeCapsules
useTimeCapsule.ts:57 🆕 Creating default TimeCapsule...
useDocuments.ts:78 📊 Document status updated: {documents: 0, totalSize: '0 B', totalChunks: 0, totalVectors: 0, avgChunksPerDoc: 0, …}
sessionStore.ts:130 📋 Loaded 0 sessions
useAIFlowBuilder.ts:874 📋 Loaded 0 sessions from KB
sessionStore.ts:130 📋 Loaded 0 sessions
installHook.js:1 ⚠️ Document not found: bubblspace-bubbl-1764054367585yf
overrideMethod @ installHook.js:1
performDocumentDeletion @ VectorStore.ts:1303
await in performDocumentDeletion
eval @ VectorStore.ts:1271
executeOperation @ VectorStore.ts:324
queueOperation @ VectorStore.ts:293
deleteDocument @ VectorStore.ts:1269
saveMetadataToVectorStore @ MetadataManager.ts:633
forceSyncToVectorStore @ MetadataManager.ts:949
createBubblSpace @ MetadataManager.ts:122
createDefaultBubblSpace @ MetadataManager.ts:57
initializeStorage @ MetadataManager.ts:43
await in initializeStorage
MetadataManager @ MetadataManager.ts:28
getMetadataManager @ MetadataManager.ts:1308
AIFramesPage.useEffect.initializeManagers @ page.tsx:1493
AIFramesPage.useEffect @ page.tsx:1505
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
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
MetadataManager.ts:634 🗑️ Deleted old BubblSpace document: bubblspace-bubbl-1764054367585yf
MetadataManager.ts:634 🗑️ Deleted old BubblSpace document: bubblspace-bubbl-1764054367585yf
MetadataManager.ts:634 🗑️ Deleted old BubblSpace document: bubblspace-bubbl-1764054367585yf
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: null, sessionsCount: 0, sessionsList: Array(0)}
VectorStore.ts:1940 📊 Synced frame My First Project to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: timecapsule_1764054367615_ah2ez6vjj (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for timecapsule_1764054367615_ah2ez6vjj: 1-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: My First Project (ID: timecapsule_1764054367615_ah2ez6vjj, Rev: 1-cwyakxjrax)
timeCapsuleStore.ts:50 ✅ TimeCapsule created: {id: 'timecapsule_1764054367615_ah2ez6vjj', name: 'My First Project'}
useTimeCapsule.ts:67 ✅ Default TimeCapsule created: timecapsule_1764054367615_ah2ez6vjj
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:2205 🔄 Bypassing duplicate detection for metadata update: BubblSpace: My BubblSpace
VectorStore.ts:2142 ✅ Document inserted: bubblspace-bubbl-1764054367585yf
VectorStore.ts:2634 🔍 Verifying document persistence: bubblspace-bubbl-1764054367585yf (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for bubblspace-bubbl-1764054367585yf: 1-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1764054367585yf, Rev: 1-cwyakxjrax)
MetadataManager.ts:681 ✅ BubblSpace synced to Knowledge Base: My BubblSpace
MetadataManager.ts:681 ✅ BubblSpace synced to Knowledge Base: My BubblSpace
MetadataManager.ts:681 ✅ BubblSpace synced to Knowledge Base: My BubblSpace
MetadataManager.ts:686 ✅ BubblSpace persistence verified: My BubblSpace
MetadataManager.ts:806 ✅ All metadata synced to Knowledge Base successfully {syncedBubblSpaces: 1, syncedTimeCapsules: 0, totalItems: 1}
MetadataManager.ts:686 ✅ BubblSpace persistence verified: My BubblSpace
MetadataManager.ts:715 📝 Syncing TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-1764054367587pf)
VectorStore.ts:1282 🗑️ Deleting document: timecapsule-TC-1764054367587pf (attempt 1/5)
MetadataManager.ts:686 ✅ BubblSpace persistence verified: My BubblSpace
MetadataManager.ts:715 📝 Syncing TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-1764054367587pf)
MetadataManager.ts:953 ✅ Force metadata sync completed successfully
MetadataManager.ts:124 ✅ BubblSpace immediately synced to Knowledge Base: My BubblSpace
installHook.js:1 ⚠️ Document not found: timecapsule-TC-1764054367587pf
overrideMethod @ installHook.js:1
performDocumentDeletion @ VectorStore.ts:1303
await in performDocumentDeletion
eval @ VectorStore.ts:1271
executeOperation @ VectorStore.ts:324
queueOperation @ VectorStore.ts:293
deleteDocument @ VectorStore.ts:1269
saveMetadataToVectorStore @ MetadataManager.ts:720
await in saveMetadataToVectorStore
forceSyncToVectorStore @ MetadataManager.ts:949
createTimeCapsule @ MetadataManager.ts:302
createDefaultBubblSpace @ MetadataManager.ts:65
initializeStorage @ MetadataManager.ts:43
await in initializeStorage
MetadataManager @ MetadataManager.ts:28
getMetadataManager @ MetadataManager.ts:1308
AIFramesPage.useEffect.initializeManagers @ page.tsx:1493
AIFramesPage.useEffect @ page.tsx:1505
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
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
MetadataManager.ts:721 🗑️ Deleted old TimeCapsule document: timecapsule-TC-1764054367587pf
MetadataManager.ts:721 🗑️ Deleted old TimeCapsule document: timecapsule-TC-1764054367587pf
VectorStore.ts:2205 🔄 Bypassing duplicate detection for metadata update: TimeCapsule: Untitled TimeCapsule
VectorStore.ts:2212 📋 Found 0 existing TimeCapsule documents for timeCapsuleId: TC-1764054367587pf
VectorStore.ts:2029 📋 TimeCapsule document operation: {id: 'timecapsule-TC-1764054367587pf', title: 'TimeCapsule: Untitled TimeCapsule', source: 'metadata', timeCapsuleId: 'TC-1764054367587pf', name: 'Untitled TimeCapsule', …}
VectorStore.ts:2142 ✅ Document inserted: timecapsule-TC-1764054367587pf
VectorStore.ts:2634 🔍 Verifying document persistence: timecapsule-TC-1764054367587pf (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for timecapsule-TC-1764054367587pf: 1-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-1764054367587pf, Rev: 1-cwyakxjrax)
MetadataManager.ts:772 ✅ TimeCapsule synced to Knowledge Base: Untitled TimeCapsule
MetadataManager.ts:772 ✅ TimeCapsule synced to Knowledge Base: Untitled TimeCapsule
MetadataManager.ts:777 ✅ TimeCapsule persistence verified: Untitled TimeCapsule
MetadataManager.ts:806 ✅ All metadata synced to Knowledge Base successfully {syncedBubblSpaces: 1, syncedTimeCapsules: 1, totalItems: 2}
MetadataManager.ts:777 ✅ TimeCapsule persistence verified: Untitled TimeCapsule
MetadataManager.ts:806 ✅ All metadata synced to Knowledge Base successfully {syncedBubblSpaces: 1, syncedTimeCapsules: 1, totalItems: 2}
MetadataManager.ts:953 ✅ Force metadata sync completed successfully
MetadataManager.ts:1027 ✅ Metadata synced with vector store
MetadataManager.ts:304 ✅ TimeCapsule immediately synced to Knowledge Base: Untitled TimeCapsule
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
useAIProviders.ts:232 🔄 aiProviders object updated
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
useAIProviders.ts:232 🔄 aiProviders object updated
analytics.ts:271 📊 GA4: Initializing Google Analytics 4...
Analytics.tsx:42 ⏳ Analytics: Skipping page tracking - no consent or not initialized
analytics.ts:305 ✅ GA4: Successfully initialized with enhanced tracking
Analytics.tsx:23 ✅ Analytics: GA4 initialized with user consent
analytics.ts:363 📊 GA4: Page view tracked - AI-Frames
Analytics.tsx:72 📊 Analytics: Tracked page view - AI-Frames (/ai-frames)
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1764054370387&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=11398970.1764054370&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=3&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~115583767~115938465~115938469~116184927~116184929~116217636~116217638&dt=AI-Frames&dl=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&sid=1764054370&sct=1&seg=1&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=learning&ep.page_type=interactive&ep.pathname=%2Fai-frames&ep.consent_analytics=true&ep.consent_functional=true&_et=102&tfd=8092".
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
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1764054370387&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=11398970.1764054370&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_s=1&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~115583767~115938465~115938469~116184927~116184929~116217636~116217638&sid=1764054370&sct=1&seg=0&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=7983".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:443
SN @ js?id=G-V1B8R98P79:970
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
config @ js?id=G-V1B8R98P79:771
qB @ js?id=G-V1B8R98P79:780
b.push @ js?id=G-V1B8R98P79:786
window.gtag @ analytics.ts:279
initializeGA4 @ analytics.ts:284
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
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1764054370387&gcd=13l3l3l3l1l1&npa=0&dma=0&sr=2240x1260&cid=11398970.1764054370&ul=en-us&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~115583767~115938465~115938469~116184927~116184929~116217636~116217638&sid=1764054370&sct=1&seg=0&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-11-25T07%3A06%3A10.393Z&epn.page_duration=4&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=142.0.0.0&ep.viewport_size=2240x880&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=53&_et=4&tfd=8090".
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
EnhancedLearningGraph.tsx:3184 🎯 Dispatching ensure-manual-session event for frame drop
page.tsx:2040 🔍 Checking for manual session... {activeSessionId: null, sessionsCount: 0}
page.tsx:2050 🆕 Auto-creating manual session for frame drop
useAIFlowBuilder.ts:934 🎬 [SESSION] Creating new manual session...
useAIFlowBuilder.ts:940 📦 [SESSION] New session object created: {id: 'manual_1764054371722_bja4p7tv0', name: 'Manual Session', source: 'manual', timeCapsuleId: 'timecapsule_1764054367615_ah2ez6vjj'}
page.tsx:883 🧹 Graph reset: cleared nodes and edges
useAIFlowBuilder.ts:967 🧹 [SESSION] Cleared graph display for new session
useAIFlowBuilder.ts:994 💾 [SESSION] Saving new session to VectorStore...
useAIFlowBuilder.ts:1002 ✅ [SESSION] Session creation complete. Returning session ID: manual_1764054371722_bja4p7tv0
page.tsx:2055 ✅ Manual session created: manual_1764054371722_bja4p7tv0
DualPaneFrameView.tsx:165 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 1}
page.tsx:1921 🔧 handleFramesChange: Merged 1 new frames with 0 existing frames {totalAfterMerge: 1, activeTimeCapsuleId: 'timecapsule_1764054367615_ah2ez6vjj', activeSessionId: null, framesWithBoth: 0}
useAIFlowBuilder.ts:958 🎯 [SESSION] Setting active session ID: null -> manual_1764054371722_bja4p7tv0
useAIFlowBuilder.ts:958 🎯 [SESSION] Setting active session ID: null -> manual_1764054371722_bja4p7tv0
useAIFlowBuilder.ts:953 📋 [SESSION] Updating sessions array: 0 -> 1
useAIFlowBuilder.ts:953 📋 [SESSION] Updating sessions array: 0 -> 1
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":true,"handleEdgesChangeChanged":true,"handleNodesDeleteChanged":true,"onConnectChanged":true,"onEdgesDeleteChanged":true,"onDropChanged":true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 4
useAIProviders.ts:232 🔄 aiProviders object updated
useAIFlowBuilder.ts:1377 💾 Persisting active session ID to localStorage: manual_1764054371722_bja4p7tv0
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'manual_1764054371722_bja4p7tv0', sessionsCount: 1, sessionsList: Array(1)}
page.tsx:1775 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
page.tsx:2085 🔧 Found 1 orphaned frames, assigning to session manual_1764054371722_bja4p7tv0
page.tsx:2094 ✅ Assigned sessionId to 1 orphaned frames
useAIFlowBuilder.ts:1324 📊 Updating session frame count: 1 frames for session manual_1764054371722_bja4p7tv0
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 5
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'drop' handler took 182ms
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 6
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7271
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:298
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
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<NodeRenderer>
exports.jsx @ react-jsx-runtime.development.js:339
GraphViewComponent @ index.js:4740
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
updateMemoComponent @ react-dom-client.development.js:8719
beginWork @ react-dom-client.development.js:10984
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<GraphView>
exports.jsx @ react-jsx-runtime.development.js:339
ReactFlow @ index.js:5365
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
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<ForwardRef(ReactFlow)>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedLearningGraph @ EnhancedLearningGraph.tsx:3757
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
<EnhancedLearningGraph>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DualPaneFrameView @ DualPaneFrameView.tsx:1292
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
<DualPaneFrameView>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
FrameGraphIntegration @ FrameGraphIntegration.tsx:1907
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
<FrameGraphIntegration>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
AIFramesPage @ page.tsx:3865
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
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7275
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:298
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
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<NodeRenderer>
exports.jsx @ react-jsx-runtime.development.js:339
GraphViewComponent @ index.js:4740
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
updateMemoComponent @ react-dom-client.development.js:8719
beginWork @ react-dom-client.development.js:10984
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<GraphView>
exports.jsx @ react-jsx-runtime.development.js:339
ReactFlow @ index.js:5365
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
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<ForwardRef(ReactFlow)>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedLearningGraph @ EnhancedLearningGraph.tsx:3757
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
<EnhancedLearningGraph>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DualPaneFrameView @ DualPaneFrameView.tsx:1292
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
<DualPaneFrameView>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
FrameGraphIntegration @ FrameGraphIntegration.tsx:1907
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
<FrameGraphIntegration>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
AIFramesPage @ page.tsx:3865
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
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7271
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:328
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
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<NodeRenderer>
exports.jsx @ react-jsx-runtime.development.js:339
GraphViewComponent @ index.js:4740
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
updateMemoComponent @ react-dom-client.development.js:8719
beginWork @ react-dom-client.development.js:10984
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<GraphView>
exports.jsx @ react-jsx-runtime.development.js:339
ReactFlow @ index.js:5365
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
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<ForwardRef(ReactFlow)>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedLearningGraph @ EnhancedLearningGraph.tsx:3757
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
<EnhancedLearningGraph>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DualPaneFrameView @ DualPaneFrameView.tsx:1292
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
<DualPaneFrameView>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
FrameGraphIntegration @ FrameGraphIntegration.tsx:1907
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
<FrameGraphIntegration>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
AIFramesPage @ page.tsx:3865
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
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7275
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:328
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
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<NodeRenderer>
exports.jsx @ react-jsx-runtime.development.js:339
GraphViewComponent @ index.js:4740
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
updateMemoComponent @ react-dom-client.development.js:8719
beginWork @ react-dom-client.development.js:10984
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<GraphView>
exports.jsx @ react-jsx-runtime.development.js:339
ReactFlow @ index.js:5365
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
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
<ForwardRef(ReactFlow)>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedLearningGraph @ EnhancedLearningGraph.tsx:3757
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
<EnhancedLearningGraph>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DualPaneFrameView @ DualPaneFrameView.tsx:1292
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
<DualPaneFrameView>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
FrameGraphIntegration @ FrameGraphIntegration.tsx:1907
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
<FrameGraphIntegration>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
AIFramesPage @ page.tsx:3865
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
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 7
useUnifiedStorage.ts:714 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 0, edgeCount: 0, frameIds: Array(1), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: true}
useUnifiedStorage.ts:1558 ⏸️ Skipping delayed save - background save already in progress
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 8
useAIProviders.ts:232 🔄 aiProviders object updated
unifiedStorage.ts:553 ✅ IndexedDB save completed
unifiedStorage.ts:104 ✅ Unified save completed successfully
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:1940 📊 Synced frame Manual Session to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: session_manual_1764054371722_bja4p7tv0 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2142 ✅ Document inserted: frames_session_1764054367571_0f47of9zd
VectorStore.ts:2634 🔍 Verifying document persistence: frames_session_1764054367571_0f47of9zd (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for session_manual_1764054371722_bja4p7tv0: 1-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: Manual Session (ID: session_manual_1764054371722_bja4p7tv0, Rev: 1-cwyakxjrax)
sessionStore.ts:76 💾 Session saved: Manual Session (manual_1764054371722_bja4p7tv0)
sessionStore.ts:76 💾 Session saved: Manual Session (manual_1764054371722_bja4p7tv0)
useAIFlowBuilder.ts:996 ✅ [SESSION] New session saved to VectorStore
useAIFlowBuilder.ts:1343 ✅ Session metadata updated with 1 frames
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'manual_1764054371722_bja4p7tv0', sessionsCount: 1, sessionsList: Array(1)}
VectorStore.ts:2000 📋 Retrieved latest revision for frames_session_1764054367571_0f47of9zd: 1-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: Frame Sequence - 1 frames (ID: frames_session_1764054367571_0f47of9zd, Rev: 1-cwyakxjrax)
FrameGraphIntegration.tsx:1117 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
VectorStore.ts:2142 ✅ Document inserted: sess-1764054372352-py6jre
VectorStore.ts:2634 🔍 Verifying document persistence: sess-1764054372352-py6jre (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for sess-1764054372352-py6jre: 1-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frames Session (ID: sess-1764054372352-py6jre, Rev: 1-cwyakxjrax)
FrameGraphIntegration.tsx:1129 ✅ Session document inserted successfully: {sessionId: 'session_1764054372352', documentId: 'sess-1764054372352-py6jre'}
useUnifiedStorage.ts:747 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-25T07:06:12.414Z'}
useAIProviders.ts:232 🔄 aiProviders object updated
hot-reloader-client.js:197 [Fast Refresh] rebuilding
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:743
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useCallback[updateGraphState] @ useUnifiedStorage.ts:1221
AIFramesPage.useCallback[triggerGraphReset] @ page.tsx:882
useAIFlowBuilder.useCallback[createNewSession] @ useAIFlowBuilder.ts:966
AIFramesPage.useCallback[ensureManualSession] @ page.tsx:2051
AIFramesPage.useEffect.handleEnsureManualSession @ page.tsx:2066
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:3185
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
webpack.js?v=1764054362449:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/3f4596a30b817fdc.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764054362449:1367
Promise.then
hotCheck @ webpack.js?v=1764054362449:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
webpack.js?v=1764054362449:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/df331da96e7ba1b0.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764054362449:1367
Promise.then
hotCheck @ webpack.js?v=1764054362449:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleApplyUpdates @ hot-reloader-client.js:123
eval @ hot-reloader-client.js:143
Promise.then
tryApplyUpdatesWebpack @ hot-reloader-client.js:142
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 917ms
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
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 9
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 10
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 11
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 12
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 13
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 14
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 15
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 16
page.tsx:1613 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1613
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 17
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:714 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(1), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: true}
unifiedStorage.ts:553 ✅ IndexedDB save completed
unifiedStorage.ts:104 ✅ Unified save completed successfully
useUnifiedStorage.ts:747 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-25T07:06:15.377Z'}
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:743
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1476
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:279
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1764054370387&gcd=13l3l3l3l1l1&npa=0&dma=0&sr=2240x1260&cid=11398970.1764054370&ul=en-us&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~115583767~115938465~115938469~116184927~116184929~116217636~116217638&sid=1764054370&sct=1&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-11-25T07%3A06%3A10.510Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=142.0.0.0&ep.viewport_size=2240x880&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=53&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&_et=1&tfd=13094".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:443
SN @ js?id=G-V1B8R98P79:970
k.flush @ js?id=G-V1B8R98P79:977
(anonymous) @ js?id=G-V1B8R98P79:974
webpack.js?v=1764054362449:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/42eb9049ce3b32c9.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764054362449:1367
Promise.then
hotCheck @ webpack.js?v=1764054362449:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 363ms
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
EnhancedAIFrameNode.tsx:70 🎯 SAVE ATTEMPT: {frameId: 'frame-1764054371721-i7mam3mp2', hasOnFrameUpdate: true, editData: {…}, willEmitEvent: true}
useUnifiedStorage.ts:1358 🎯 FRAME EDIT DEBUG: {frameId: 'frame-1764054371721-i7mam3mp2', frameData: {…}, currentFrames: Array(1), eventType: 'graph-frame-edited'}
DualPaneFrameView.tsx:165 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 1}
page.tsx:1921 🔧 handleFramesChange: Merged 1 new frames with 1 existing frames {totalAfterMerge: 1, activeTimeCapsuleId: 'timecapsule_1764054367615_ah2ez6vjj', activeSessionId: 'manual_1764054371722_bja4p7tv0', framesWithBoth: 1}
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 18
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 19
react-dom-client.development.js:16378 [Violation] 'click' handler took 154ms
EnhancedAIFrameNode.tsx:114 ✏️ Enhanced AI Frame Node: Frame edit event emitted: {frameId: 'frame-1764054371721-i7mam3mp2', title: 'f1'}
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 20
useUnifiedStorage.ts:714 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(1), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
unifiedStorage.ts:553 ✅ IndexedDB save completed
VectorStore.ts:1940 📊 Synced frame AI-Frame: f1 to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame-1764054371721-i7mam3mp2 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764054371721-i7mam3mp2: 1-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: f1 (ID: aiframe-frame-1764054371721-i7mam3mp2, Rev: 1-cwyakxjrax)
VectorStore.ts:1940 📊 Synced frame AI-Frame Chapters to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 1-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 1-cwyakxjrax)
unifiedStorage.ts:104 ✅ Unified save completed successfully
hot-reloader-client.js:197 [Fast Refresh] rebuilding
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:743
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleFrameEditedEvent @ useUnifiedStorage.ts:1394
EnhancedAIFrameNode.useCallback[handleSave] @ EnhancedAIFrameNode.tsx:100
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
useUnifiedStorage.ts:747 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-25T07:06:19.511Z'}
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1764054362449:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/6e2a18776d5601ae.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764054362449:1367
Promise.then
hotCheck @ webpack.js?v=1764054362449:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 412ms
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
page.tsx:1613 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1613
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 202ms
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) <input data-slot=​"input" class=​"file:​text-foreground placeholder:​text-muted-foreground selection:​bg-primary selection:​text-primary-foreground dark:​bg-input/​30 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow]​ outline-none file:​inline-flex file:​h-7 file:​border-0 file:​bg-transparent file:​text-sm file:​font-medium disabled:​pointer-events-none disabled:​cursor-not-allowed disabled:​opacity-50 md:​text-sm focus-visible:​border-ring focus-visible:​ring-ring/​50 focus-visible:​ring-[3px]​ aria-invalid:​ring-destructive/​20 dark:​aria-invalid:​ring-destructive/​40 aria-invalid:​border-destructive bg-white border-slate-300" placeholder=​"sk-or-v1-..." type=​"password" value>​flex
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) <input data-slot=​"input" class=​"file:​text-foreground placeholder:​text-muted-foreground selection:​bg-primary selection:​text-primary-foreground dark:​bg-input/​30 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow]​ outline-none file:​inline-flex file:​h-7 file:​border-0 file:​bg-transparent file:​text-sm file:​font-medium disabled:​pointer-events-none disabled:​cursor-not-allowed disabled:​opacity-50 md:​text-sm focus-visible:​border-ring focus-visible:​ring-ring/​50 focus-visible:​ring-[3px]​ aria-invalid:​ring-destructive/​20 dark:​aria-invalid:​ring-destructive/​40 aria-invalid:​border-destructive bg-white border-slate-300" placeholder=​"firecrawl_live_..." type=​"password" value>​flex
page.tsx:1613 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1613
useAIFlowBuilder.ts:934 🎬 [SESSION] Creating new manual session...
useAIFlowBuilder.ts:940 📦 [SESSION] New session object created: {id: 'manual_1764054394850_8s7wuxv8a', name: 'Manual Session 25/11/2025, 12:36:34', source: 'manual', timeCapsuleId: 'timecapsule_1764054367615_ah2ez6vjj'}
page.tsx:883 🧹 Graph reset: cleared nodes and edges
useAIFlowBuilder.ts:967 🧹 [SESSION] Cleared graph display for new session
useAIFlowBuilder.ts:994 💾 [SESSION] Saving new session to VectorStore...
useAIFlowBuilder.ts:1002 ✅ [SESSION] Session creation complete. Returning session ID: manual_1764054394850_8s7wuxv8a
useAIFlowBuilder.ts:958 🎯 [SESSION] Setting active session ID: manual_1764054371722_bja4p7tv0 -> manual_1764054394850_8s7wuxv8a
useAIFlowBuilder.ts:958 🎯 [SESSION] Setting active session ID: manual_1764054371722_bja4p7tv0 -> manual_1764054394850_8s7wuxv8a
useAIFlowBuilder.ts:953 📋 [SESSION] Updating sessions array: 1 -> 2
useAIFlowBuilder.ts:953 📋 [SESSION] Updating sessions array: 1 -> 2
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":true,"handleEdgesChangeChanged":true,"handleNodesDeleteChanged":true,"onConnectChanged":true,"onEdgesDeleteChanged":true,"onDropChanged":true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 21
useAIProviders.ts:232 🔄 aiProviders object updated
useAIFlowBuilder.ts:1377 💾 Persisting active session ID to localStorage: manual_1764054394850_8s7wuxv8a
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'manual_1764054394850_8s7wuxv8a', sessionsCount: 2, sessionsList: Array(2)}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 22
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 310ms
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 23
VectorStore.ts:1940 📊 Synced frame Manual Session 25/11/2025, 12:36:34 to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: session_manual_1764054394850_8s7wuxv8a (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for session_manual_1764054394850_8s7wuxv8a: 1-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: Manual Session 25/11/2025, 12:36:34 (ID: session_manual_1764054394850_8s7wuxv8a, Rev: 1-cwyakxjrax)
sessionStore.ts:76 💾 Session saved: Manual Session 25/11/2025, 12:36:34 (manual_1764054394850_8s7wuxv8a)
useAIFlowBuilder.ts:996 ✅ [SESSION] New session saved to VectorStore
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1613 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1613
EnhancedLearningGraph.tsx:3184 🎯 Dispatching ensure-manual-session event for frame drop
page.tsx:2040 🔍 Checking for manual session... {activeSessionId: 'manual_1764054394850_8s7wuxv8a', sessionsCount: 2}
page.tsx:2059 ✅ Using existing manual session: manual_1764054394850_8s7wuxv8a
DualPaneFrameView.tsx:165 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 1}
page.tsx:1921 🔧 handleFramesChange: Merged 1 new frames with 1 existing frames {totalAfterMerge: 2, activeTimeCapsuleId: 'timecapsule_1764054367615_ah2ez6vjj', activeSessionId: 'manual_1764054394850_8s7wuxv8a', framesWithBoth: 2}
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 24
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1775 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 2, hasUnifiedMethods: true}
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7271
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:298
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
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7275
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:298
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
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7271
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:328
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
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7275
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:328
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
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 25
react-dom-client.development.js:16378 [Violation] 'drop' handler took 178ms
FrameGraphIntegration.tsx:1117 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
FrameGraphIntegration.tsx:1129 ✅ Session document inserted successfully: {sessionId: 'session_1764054399452', documentId: 'sess-1764054399452-bn182c'}
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 26
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'setTimeout' handler took 73ms
useUnifiedStorage.ts:714 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(2), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764054371721-i7mam3mp2: 1-cwyakxjrax
unifiedStorage.ts:553 ✅ IndexedDB save completed
VectorStore.ts:1936 📊 Synced frame AI-Frame: f1 to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame-1764054371721-i7mam3mp2 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764054371721-i7mam3mp2: 2-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: f1 (ID: aiframe-frame-1764054371721-i7mam3mp2, Rev: 2-cwyakxjrax)
VectorStore.ts:1940 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame-1764054399269-bv93d7alp (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764054399269-bv93d7alp: 1-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1764054399269-bv93d7alp, Rev: 1-cwyakxjrax)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 1-cwyakxjrax
VectorStore.ts:1936 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 2-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 2-cwyakxjrax)
unifiedStorage.ts:104 ✅ Unified save completed successfully
useUnifiedStorage.ts:747 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-25T07:06:39.838Z'}
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:743
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1569
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:3236
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1764054362449:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/d243734feca89317.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764054362449:1367
Promise.then
hotCheck @ webpack.js?v=1764054362449:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 372ms
fetch-server-response.js:163 Fetch failed loading: GET "http://localhost:3000/ai-frames?_rsc=18lmo".
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
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 27
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 28
EnhancedAIFrameNode.tsx:70 🎯 SAVE ATTEMPT: {frameId: 'frame-1764054399269-bv93d7alp', hasOnFrameUpdate: true, editData: {…}, willEmitEvent: true}
useUnifiedStorage.ts:1358 🎯 FRAME EDIT DEBUG: {frameId: 'frame-1764054399269-bv93d7alp', frameData: {…}, currentFrames: Array(2), eventType: 'graph-frame-edited'}
DualPaneFrameView.tsx:165 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 1}
page.tsx:1921 🔧 handleFramesChange: Merged 1 new frames with 2 existing frames {totalAfterMerge: 2, activeTimeCapsuleId: 'timecapsule_1764054367615_ah2ez6vjj', activeSessionId: 'manual_1764054394850_8s7wuxv8a', framesWithBoth: 2}
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 29
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 30
EnhancedAIFrameNode.tsx:114 ✏️ Enhanced AI Frame Node: Frame edit event emitted: {frameId: 'frame-1764054399269-bv93d7alp', title: 'f2'}
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 31
useUnifiedStorage.ts:714 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(2), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764054371721-i7mam3mp2: 2-cwyakxjrax
unifiedStorage.ts:553 ✅ IndexedDB save completed
VectorStore.ts:1936 📊 Synced frame AI-Frame: f1 to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame-1764054371721-i7mam3mp2 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764054371721-i7mam3mp2: 3-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: f1 (ID: aiframe-frame-1764054371721-i7mam3mp2, Rev: 3-cwyakxjrax)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764054399269-bv93d7alp: 1-cwyakxjrax
VectorStore.ts:1936 📊 Synced frame AI-Frame: f2 to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame-1764054399269-bv93d7alp (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764054399269-bv93d7alp: 2-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: f2 (ID: aiframe-frame-1764054399269-bv93d7alp, Rev: 2-cwyakxjrax)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 2-cwyakxjrax
VectorStore.ts:1936 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 3-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 3-cwyakxjrax)
unifiedStorage.ts:104 ✅ Unified save completed successfully
useUnifiedStorage.ts:747 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-25T07:06:45.143Z'}
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:743
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleFrameEditedEvent @ useUnifiedStorage.ts:1394
EnhancedAIFrameNode.useCallback[handleSave] @ EnhancedAIFrameNode.tsx:100
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1764054362449:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/e9af6e5d2f3d6525.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764054362449:1367
Promise.then
hotCheck @ webpack.js?v=1764054362449:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 337ms
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
page.tsx:1613 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1613
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 195ms
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) <input data-slot=​"input" class=​"file:​text-foreground placeholder:​text-muted-foreground selection:​bg-primary selection:​text-primary-foreground dark:​bg-input/​30 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow]​ outline-none file:​inline-flex file:​h-7 file:​border-0 file:​bg-transparent file:​text-sm file:​font-medium disabled:​pointer-events-none disabled:​cursor-not-allowed disabled:​opacity-50 md:​text-sm focus-visible:​border-ring focus-visible:​ring-ring/​50 focus-visible:​ring-[3px]​ aria-invalid:​ring-destructive/​20 dark:​aria-invalid:​ring-destructive/​40 aria-invalid:​border-destructive bg-white border-slate-300" placeholder=​"sk-or-v1-..." type=​"password" value>​flex
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) <input data-slot=​"input" class=​"file:​text-foreground placeholder:​text-muted-foreground selection:​bg-primary selection:​text-primary-foreground dark:​bg-input/​30 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow]​ outline-none file:​inline-flex file:​h-7 file:​border-0 file:​bg-transparent file:​text-sm file:​font-medium disabled:​pointer-events-none disabled:​cursor-not-allowed disabled:​opacity-50 md:​text-sm focus-visible:​border-ring focus-visible:​ring-ring/​50 focus-visible:​ring-[3px]​ aria-invalid:​ring-destructive/​20 dark:​aria-invalid:​ring-destructive/​40 aria-invalid:​border-destructive bg-white border-slate-300" placeholder=​"firecrawl_live_..." type=​"password" value>​flex
page.tsx:1613 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1613
VectorStore.ts:2000 📋 Retrieved latest revision for session_manual_1764054394850_8s7wuxv8a: 1-cwyakxjrax
VectorStore.ts:1936 📊 Synced frame Manual Session 25/11/2025, 12:36:34 to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: session_manual_1764054394850_8s7wuxv8a (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for session_manual_1764054394850_8s7wuxv8a: 2-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: Manual Session 25/11/2025, 12:36:34 (ID: session_manual_1764054394850_8s7wuxv8a, Rev: 2-cwyakxjrax)
sessionStore.ts:76 💾 Session saved: Manual Session 25/11/2025, 12:36:34 (manual_1764054394850_8s7wuxv8a)
sessionStore.ts:98 📂 Session loaded: Manual Session (manual_1764054371722_bja4p7tv0)
page.tsx:883 🧹 Graph reset: cleared nodes and edges
useAIFlowBuilder.ts:1098 🧹 Cleared graph UI for session switch
useAIFlowBuilder.ts:1120 📊 No graph state to restore for session manual_1764054371722_bja4p7tv0
useAIFlowBuilder.ts:1143 🔄 Switched to session: Manual Session (ID: manual_1764054371722_bja4p7tv0)
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":true,"handleEdgesChangeChanged":true,"handleNodesDeleteChanged":true,"onConnectChanged":true,"onEdgesDeleteChanged":true,"onDropChanged":true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 32
useAIProviders.ts:232 🔄 aiProviders object updated
useAIFlowBuilder.ts:1377 💾 Persisting active session ID to localStorage: manual_1764054371722_bja4p7tv0
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'manual_1764054371722_bja4p7tv0', sessionsCount: 2, sessionsList: Array(2)}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 33
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 34
useAIProviders.ts:232 🔄 aiProviders object updated
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7271
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10556
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:298
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
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
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
<NodeRenderer>
exports.jsx @ react-jsx-runtime.development.js:339
GraphViewComponent @ index.js:4740
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
updateMemoComponent @ react-dom-client.development.js:8719
beginWork @ react-dom-client.development.js:10984
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<GraphView>
exports.jsx @ react-jsx-runtime.development.js:339
ReactFlow @ index.js:5365
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
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<ForwardRef(ReactFlow)>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedLearningGraph @ EnhancedLearningGraph.tsx:3757
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
<EnhancedLearningGraph>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DualPaneFrameView @ DualPaneFrameView.tsx:1292
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
<DualPaneFrameView>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
FrameGraphIntegration @ FrameGraphIntegration.tsx:1907
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
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7275
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10556
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:298
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
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
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
<NodeRenderer>
exports.jsx @ react-jsx-runtime.development.js:339
GraphViewComponent @ index.js:4740
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
updateMemoComponent @ react-dom-client.development.js:8719
beginWork @ react-dom-client.development.js:10984
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<GraphView>
exports.jsx @ react-jsx-runtime.development.js:339
ReactFlow @ index.js:5365
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
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<ForwardRef(ReactFlow)>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedLearningGraph @ EnhancedLearningGraph.tsx:3757
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
<EnhancedLearningGraph>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DualPaneFrameView @ DualPaneFrameView.tsx:1292
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
<DualPaneFrameView>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
FrameGraphIntegration @ FrameGraphIntegration.tsx:1907
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
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7271
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10556
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:328
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
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
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
<NodeRenderer>
exports.jsx @ react-jsx-runtime.development.js:339
GraphViewComponent @ index.js:4740
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
updateMemoComponent @ react-dom-client.development.js:8719
beginWork @ react-dom-client.development.js:10984
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<GraphView>
exports.jsx @ react-jsx-runtime.development.js:339
ReactFlow @ index.js:5365
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
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<ForwardRef(ReactFlow)>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedLearningGraph @ EnhancedLearningGraph.tsx:3757
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
<EnhancedLearningGraph>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DualPaneFrameView @ DualPaneFrameView.tsx:1292
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
<DualPaneFrameView>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
FrameGraphIntegration @ FrameGraphIntegration.tsx:1907
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
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7275
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
updateFunctionComponent @ react-dom-client.development.js:8931
beginWork @ react-dom-client.development.js:10556
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:328
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
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
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
<NodeRenderer>
exports.jsx @ react-jsx-runtime.development.js:339
GraphViewComponent @ index.js:4740
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
updateMemoComponent @ react-dom-client.development.js:8719
beginWork @ react-dom-client.development.js:10984
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<GraphView>
exports.jsx @ react-jsx-runtime.development.js:339
ReactFlow @ index.js:5365
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
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<ForwardRef(ReactFlow)>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedLearningGraph @ EnhancedLearningGraph.tsx:3757
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
<EnhancedLearningGraph>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DualPaneFrameView @ DualPaneFrameView.tsx:1292
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
<DualPaneFrameView>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
FrameGraphIntegration @ FrameGraphIntegration.tsx:1907
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
scheduler.development.js:14 [Violation] 'message' handler took 383ms
FrameGraphIntegration.tsx:1117 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
FrameGraphIntegration.tsx:1129 ✅ Session document inserted successfully: {sessionId: 'session_1764054421350', documentId: 'sess-1764054421350-v57lrv'}
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 35
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 36
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1613 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1613
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 37
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 38
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 39
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 40
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 41
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 42
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 43
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 44
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 45
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 46
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 47
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 48
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 49
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 50
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 51
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:714 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(2), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: true}
unifiedStorage.ts:553 ✅ IndexedDB save completed
unifiedStorage.ts:104 ✅ Unified save completed successfully
useUnifiedStorage.ts:747 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-25T07:07:07.154Z'}
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:743
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1476
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:279
setTimeout
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:277
triggerNodeChanges @ index.js:5054
updateNodePositions @ index.js:5042
eval @ index.js:2246
call @ dispatch.js:61
gesture @ drag.js:159
mouseupped @ drag.js:89
eval @ on.js:7
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1764054362449:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/7c563d0737e1f969.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764054362449:1367
Promise.then
hotCheck @ webpack.js?v=1764054362449:553
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
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 52
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 53
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 54
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 55
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 56
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 57
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 58
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 59
EnhancedLearningGraph.tsx:3184 🎯 Dispatching ensure-manual-session event for frame drop
page.tsx:2040 🔍 Checking for manual session... {activeSessionId: 'manual_1764054371722_bja4p7tv0', sessionsCount: 2}
page.tsx:2059 ✅ Using existing manual session: manual_1764054371722_bja4p7tv0
DualPaneFrameView.tsx:165 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 2}
page.tsx:1921 🔧 handleFramesChange: Merged 2 new frames with 2 existing frames {totalAfterMerge: 3, activeTimeCapsuleId: 'timecapsule_1764054367615_ah2ez6vjj', activeSessionId: 'manual_1764054371722_bja4p7tv0', framesWithBoth: 3}
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 60
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1775 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 3, hasUnifiedMethods: true}
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7271
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:298
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
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7275
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:298
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
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7271
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:328
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
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
installHook.js:1 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ index.js:986
EditorInstanceManager @ index.js:961
eval @ index.js:1167
mountStateImpl @ react-dom-client.development.js:7275
mountState @ react-dom-client.development.js:7292
useState @ react-dom-client.development.js:23291
exports.useState @ react.development.js:1231
useEditor @ index.js:1167
RichTextEditor @ rich-text-editor.tsx:115
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooks @ react-dom-client.development.js:6667
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
<RichTextEditor>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:328
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
<EnhancedAIFrameNode>
exports.jsx @ react-jsx-runtime.development.js:339
NodeWrapper @ index.js:3131
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
<NodeWrapper>
exports.jsx @ react-jsx-runtime.development.js:339
eval @ index.js:3203
NodeRendererComponent @ index.js:3178
react-stack-bottom-frame @ react-dom-client.development.js:22974
renderWithHooksAgain @ react-dom-client.development.js:6767
renderWithHooks @ react-dom-client.development.js:6679
updateFunctionComponent @ react-dom-client.development.js:8931
updateSimpleMemoComponent @ react-dom-client.development.js:8786
beginWork @ react-dom-client.development.js:10992
runWithFiberInDEV @ react-dom-client.development.js:845
performUnitOfWork @ react-dom-client.development.js:15258
workLoopSync @ react-dom-client.development.js:15078
renderRootSync @ react-dom-client.development.js:15058
performWorkOnRoot @ react-dom-client.development.js:14526
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
processRootScheduleInMicrotask @ react-dom-client.development.js:16250
eval @ react-dom-client.development.js:16384
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 61
react-dom-client.development.js:16378 [Violation] 'drop' handler took 159ms
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 62
useUnifiedStorage.ts:714 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(2), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: true}
useUnifiedStorage.ts:1558 ⏸️ Skipping delayed save - background save already in progress
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1775 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 2, hasUnifiedMethods: true}
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'setTimeout' handler took 78ms
unifiedStorage.ts:553 ✅ IndexedDB save completed
unifiedStorage.ts:104 ✅ Unified save completed successfully
useUnifiedStorage.ts:747 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-25T07:07:10.023Z'}
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:743
useAIProviders.ts:232 🔄 aiProviders object updated
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1764054362449:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/f18abe6ba7b7bfdb.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764054362449:1367
Promise.then
hotCheck @ webpack.js?v=1764054362449:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 410ms
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
page.tsx:1613 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1613
EnhancedLearningGraph.tsx:2704 🔗 onConnect triggered: {source: 'node_1764054421146_vh72g5rjc_4', target: 'node_1764054429612_iwipd4fpz_5', sourceHandle: 'frame-sequence-out', targetHandle: 'chapter-frame-in'}
EnhancedLearningGraph.tsx:2888 📤 Emitting graph-connection-added event: {edgeId: 'edge|node_1764054421146_vh72g5rjc_4|node_1764054429612_iwipd4fpz_5|1764054431316_cbk4kwwwm', source: 'node_1764054421146_vh72g5rjc_4', target: 'node_1764054429612_iwipd4fpz_5'}
useUnifiedStorage.ts:1574 📥 handleGraphConnectionEvent received: {eventType: 'graph-connection-added', hasConnection: true}
useUnifiedStorage.ts:1406 📥 handleConnectionChangedEvent received: {connectionType: 'added', hasConnectionData: true}
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 63
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:714 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 1, frameIds: Array(2), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: true}
unifiedStorage.ts:553 ✅ IndexedDB save completed
unifiedStorage.ts:104 ✅ Unified save completed successfully
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:743
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphConnectionEvent @ useUnifiedStorage.ts:1598
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:2889
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
useUnifiedStorage.ts:747 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-25T07:07:11.509Z'}
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:2933 📤 Emitting graph-state-changed event (edge-added): {edgeId: 'edge|node_1764054421146_vh72g5rjc_4|node_1764054429612_iwipd4fpz_5|1764054431316_cbk4kwwwm', totalEdges: 2}
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1764054362449:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/637457f20236689f.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764054362449:1367
Promise.then
hotCheck @ webpack.js?v=1764054362449:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 435ms
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
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 64
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 65
EnhancedAIFrameNode.tsx:70 🎯 SAVE ATTEMPT: {frameId: 'frame-1764054429612-u638vntrt', hasOnFrameUpdate: true, editData: {…}, willEmitEvent: true}
useUnifiedStorage.ts:1358 🎯 FRAME EDIT DEBUG: {frameId: 'frame-1764054429612-u638vntrt', frameData: {…}, currentFrames: Array(2), eventType: 'graph-frame-edited'}
DualPaneFrameView.tsx:165 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 1}
page.tsx:1921 🔧 handleFramesChange: Merged 1 new frames with 2 existing frames {totalAfterMerge: 2, activeTimeCapsuleId: 'timecapsule_1764054367615_ah2ez6vjj', activeSessionId: 'manual_1764054371722_bja4p7tv0', framesWithBoth: 2}
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 66
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 67
react-dom-client.development.js:16378 [Violation] 'click' handler took 173ms
EnhancedAIFrameNode.tsx:114 ✏️ Enhanced AI Frame Node: Frame edit event emitted: {frameId: 'frame-1764054429612-u638vntrt', title: 'f44'}
useUnifiedStorage.ts:714 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 2, chapterCount: 0, nodeCount: 2, edgeCount: 2, frameIds: Array(2), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764054371721-i7mam3mp2: 3-cwyakxjrax
unifiedStorage.ts:553 ✅ IndexedDB save completed
VectorStore.ts:1936 📊 Synced frame AI-Frame: f1 to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame-1764054371721-i7mam3mp2 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764054371721-i7mam3mp2: 4-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: f1 (ID: aiframe-frame-1764054371721-i7mam3mp2, Rev: 4-cwyakxjrax)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764054399269-bv93d7alp: 2-cwyakxjrax
VectorStore.ts:1936 📊 Synced frame AI-Frame: f2 to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame-1764054399269-bv93d7alp (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764054399269-bv93d7alp: 3-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: f2 (ID: aiframe-frame-1764054399269-bv93d7alp, Rev: 3-cwyakxjrax)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 3-cwyakxjrax
VectorStore.ts:1936 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 4-cwyakxjrax
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 4-cwyakxjrax)
unifiedStorage.ts:104 ✅ Unified save completed successfully
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
useUnifiedStorage.ts:747 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-25T07:07:16.857Z'}
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1764054362449:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/4ac66b65e9bf0333.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764054362449:1367
Promise.then
hotCheck @ webpack.js?v=1764054362449:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 604ms
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
page.tsx:1613 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1613
page.tsx:1613 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1613
