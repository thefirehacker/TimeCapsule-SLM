 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1764005565732&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=923490855.1764004571&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_s=5&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~105446120~115583767~115938466~115938469~116184927~116184929~116217636~116217638~116474638&sid=1764004570&sct=1&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&_et=1461&tfd=283059".
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
options.factory @ webpack.js?v=1764005840374:712
__webpack_require__ @ webpack.js?v=1764005840374:37
fn @ webpack.js?v=1764005840374:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7248
options.factory @ webpack.js?v=1764005840374:712
__webpack_require__ @ webpack.js?v=1764005840374:37
fn @ webpack.js?v=1764005840374:369
eval @ ClientAppProviders.tsx:8
(app-pages-browser)/./src/components/providers/ClientAppProviders.tsx @ layout.js:7226
options.factory @ webpack.js?v=1764005840374:712
__webpack_require__ @ webpack.js?v=1764005840374:37
fn @ webpack.js?v=1764005840374:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FClientAppProviders.tsx%22%2C%22ids%22%3A%5B%22ClientAppProviders%22%5D%7D&server=false!:5
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FClientAppProviders.tsx%22%2C%22ids%22%3A%5B%22ClientAppProviders%22%5D%7D&server=false! @ layout.js:4591
options.factory @ webpack.js?v=1764005840374:712
__webpack_require__ @ webpack.js?v=1764005840374:37
__webpack_exec__ @ layout.js:7424
(anonymous) @ layout.js:7425
__webpack_require__.O @ webpack.js?v=1764005840374:84
(anonymous) @ layout.js:7426
webpackJsonpCallback @ webpack.js?v=1764005840374:1388
(anonymous) @ layout.js:9
analytics.ts:160 📱 Device Info Collected: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', platform: 'MacIntel', vendor: 'Google Inc.', language: 'en-US', languages: Array(4), …}
analytics.ts:193 🌍 Location Info Collected: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US'}
analytics.ts:79 📊 GA4 Environment Variables Debug: {measurementId: 'G-V1B8R98P79', anonymizeIp: false, debugMode: false, siteName: 'TimeCapsule- SLM', siteUrl: 'http://localhost:3000', …}
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.168560426365698, longitude: 72.84642050898694, …}
unifiedStorage.ts:132 📂 Starting unified load...
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: null, sessionsCount: 0, sessionsList: Array(0)}
page.tsx:1658 🔄 Loading initial data with unified storage...
unifiedStorage.ts:132 📂 Starting unified load...
page.tsx:1759 🔧 AI-Frames unified storage interface updated: {hasVectorStore: false, vectorStoreInitialized: false, frameCount: 0, hasUnifiedMethods: true}
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
scheduler.development.js:14 [Violation] 'message' handler took 197ms
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
init @ webpack-internal:///…/VectorStore.ts:326
VectorStoreProvider.useCallback[initializeVectorStore] @ webpack-internal:///…toreProvider.tsx:64
VectorStoreProvider.useEffect @ webpack-internal:///…oreProvider.tsx:127
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
<VectorStoreProvider>
exports.jsxDEV @ webpack-internal:///….development.js:346
ClientAppProviders @ webpack-internal:///…AppProviders.tsx:34
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
RootLayout @ rsc://React/Server/w…p/layout.tsx?10:245
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1764005840374:160
options.factory @ webpack.js?v=1764005840374:712
__webpack_require__ @ webpack.js?v=1764005840374:37
fn @ webpack.js?v=1764005840374:369
eval @ webpack-internal:///…/app-next-dev.js:11
eval @ webpack-internal:///…app-bootstrap.js:62
loadScriptsInSequence @ webpack-internal:///…app-bootstrap.js:23
appBootstrap @ webpack-internal:///…app-bootstrap.js:56
eval @ webpack-internal:///…/app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1764005840374:182
options.factory @ webpack.js?v=1764005840374:712
__webpack_require__ @ webpack.js?v=1764005840374:37
__webpack_exec__ @ main-app.js?v=1764005840374:2824
(anonymous) @ main-app.js?v=1764005840374:2825
webpackJsonpCallback @ webpack.js?v=1764005840374:1388
(anonymous) @ main-app.js?v=1764005840374:9
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
Navbar @ webpack-internal:///…s/ui/navbar.tsx:104
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1764005840374:160
options.factory @ webpack.js?v=1764005840374:712
__webpack_require__ @ webpack.js?v=1764005840374:37
fn @ webpack.js?v=1764005840374:369
eval @ webpack-internal:///…/app-next-dev.js:11
eval @ webpack-internal:///…app-bootstrap.js:62
loadScriptsInSequence @ webpack-internal:///…app-bootstrap.js:23
appBootstrap @ webpack-internal:///…app-bootstrap.js:56
eval @ webpack-internal:///…/app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1764005840374:182
options.factory @ webpack.js?v=1764005840374:712
__webpack_require__ @ webpack.js?v=1764005840374:37
__webpack_exec__ @ main-app.js?v=1764005840374:2824
(anonymous) @ main-app.js?v=1764005840374:2825
webpackJsonpCallback @ webpack.js?v=1764005840374:1388
(anonymous) @ main-app.js?v=1764005840374:9
useAIProviders.ts:232 🔄 aiProviders object updated
unifiedStorage.ts:160 📭 No data found in any storage
useUnifiedStorage.ts:991 📭 No data found during load
unifiedStorage.ts:160 📭 No data found in any storage
useUnifiedStorage.ts:991 📭 No data found during load
page.tsx:1666 📭 No data found in unified storage
page.tsx:1669 ✅ Initial data loading complete
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1597 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1597
AIFramesPage.useEffect @ page.tsx:1641
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1764005840374:160
options.factory @ webpack.js?v=1764005840374:712
__webpack_require__ @ webpack.js?v=1764005840374:37
fn @ webpack.js?v=1764005840374:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1764005840374:182
options.factory @ webpack.js?v=1764005840374:712
__webpack_require__ @ webpack.js?v=1764005840374:37
__webpack_exec__ @ main-app.js?v=1764005840374:2824
(anonymous) @ main-app.js?v=1764005840374:2825
webpackJsonpCallback @ webpack.js?v=1764005840374:1388
(anonymous) @ main-app.js?v=1764005840374:9
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
page.tsx:1759 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 0, hasUnifiedMethods: true}
VectorStoreProvider.tsx:153 ⏭️ Skipping auto-init for /ai-frames: {isInitialized: true, isInitializing: false, attemptedBefore: false, singletonInitialized: true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 2
MetadataManager.ts:948 🔄 Force syncing metadata to Knowledge Base...
MetadataManager.ts:611 🔄 Starting enhanced metadata sync to Knowledge Base... {bubblSpacesCount: 1, timeCapslesCount: 0, vectorStoreStatus: {…}}
MetadataManager.ts:628 📝 Syncing BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1764005848471ih)
VectorStore.ts:1282 🗑️ Deleting document: bubblspace-bubbl-1764005848471ih (attempt 1/5)
MetadataManager.ts:948 🔄 Force syncing metadata to Knowledge Base...
MetadataManager.ts:611 🔄 Starting enhanced metadata sync to Knowledge Base... {bubblSpacesCount: 1, timeCapslesCount: 1, vectorStoreStatus: {…}}
MetadataManager.ts:628 📝 Syncing BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1764005848471ih)
MetadataManager.ts:75 ✅ Created default BubblSpace "My BubblSpace" and TimeCapsule "Untitled TimeCapsule"
MetadataManager.ts:1022 📋 Syncing metadata with vector store...
MetadataManager.ts:611 🔄 Starting enhanced metadata sync to Knowledge Base... {bubblSpacesCount: 1, timeCapslesCount: 1, vectorStoreStatus: {…}}
MetadataManager.ts:628 📝 Syncing BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1764005848471ih)
page.tsx:1480 ✅ Managers initialized successfully
useAIProviders.ts:232 🔄 aiProviders object updated
Analytics.tsx:42 ⏳ Analytics: Skipping page tracking - no consent or not initialized
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 3
timeCapsuleStore.ts:83 📋 Listed 0 TimeCapsules
useTimeCapsule.ts:57 🆕 Creating default TimeCapsule...
useDocuments.ts:78 📊 Document status updated: {documents: 0, totalSize: '0 B', totalChunks: 0, totalVectors: 0, avgChunksPerDoc: 0, …}
sessionStore.ts:130 📋 Loaded 0 sessions
useAIFlowBuilder.ts:871 📋 Loaded 0 sessions from KB
sessionStore.ts:130 📋 Loaded 0 sessions
installHook.js:1 ⚠️ Document not found: bubblspace-bubbl-1764005848471ih
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
AIFramesPage.useEffect.initializeManagers @ page.tsx:1477
AIFramesPage.useEffect @ page.tsx:1489
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
MetadataManager.ts:634 🗑️ Deleted old BubblSpace document: bubblspace-bubbl-1764005848471ih
MetadataManager.ts:634 🗑️ Deleted old BubblSpace document: bubblspace-bubbl-1764005848471ih
MetadataManager.ts:634 🗑️ Deleted old BubblSpace document: bubblspace-bubbl-1764005848471ih
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: null, sessionsCount: 0, sessionsList: Array(0)}
VectorStore.ts:1940 📊 Synced frame My First Project to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: timecapsule_1764005848504_umrbkqea8 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1764005840374:160
options.factory @ webpack.js?v=1764005840374:712
__webpack_require__ @ webpack.js?v=1764005840374:37
fn @ webpack.js?v=1764005840374:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1764005840374:182
options.factory @ webpack.js?v=1764005840374:712
__webpack_require__ @ webpack.js?v=1764005840374:37
__webpack_exec__ @ main-app.js?v=1764005840374:2824
(anonymous) @ main-app.js?v=1764005840374:2825
webpackJsonpCallback @ webpack.js?v=1764005840374:1388
(anonymous) @ main-app.js?v=1764005840374:9
useAIProviders.ts:232 🔄 aiProviders object updated
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
VectorStore.ts:2000 📋 Retrieved latest revision for timecapsule_1764005848504_umrbkqea8: 1-zqejeheqiv
VectorStore.ts:2647 ✅ Document persistence verified: My First Project (ID: timecapsule_1764005848504_umrbkqea8, Rev: 1-zqejeheqiv)
timeCapsuleStore.ts:50 ✅ TimeCapsule created: {id: 'timecapsule_1764005848504_umrbkqea8', name: 'My First Project'}
useTimeCapsule.ts:67 ✅ Default TimeCapsule created: timecapsule_1764005848504_umrbkqea8
VectorStore.ts:2205 🔄 Bypassing duplicate detection for metadata update: BubblSpace: My BubblSpace
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:2142 ✅ Document inserted: bubblspace-bubbl-1764005848471ih
VectorStore.ts:2634 🔍 Verifying document persistence: bubblspace-bubbl-1764005848471ih (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for bubblspace-bubbl-1764005848471ih: 1-zqejeheqiv
VectorStore.ts:2647 ✅ Document persistence verified: BubblSpace: My BubblSpace (ID: bubblspace-bubbl-1764005848471ih, Rev: 1-zqejeheqiv)
MetadataManager.ts:681 ✅ BubblSpace synced to Knowledge Base: My BubblSpace
MetadataManager.ts:681 ✅ BubblSpace synced to Knowledge Base: My BubblSpace
MetadataManager.ts:681 ✅ BubblSpace synced to Knowledge Base: My BubblSpace
MetadataManager.ts:686 ✅ BubblSpace persistence verified: My BubblSpace
MetadataManager.ts:806 ✅ All metadata synced to Knowledge Base successfully {syncedBubblSpaces: 1, syncedTimeCapsules: 0, totalItems: 1}
MetadataManager.ts:686 ✅ BubblSpace persistence verified: My BubblSpace
MetadataManager.ts:715 📝 Syncing TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-1764005848472fm)
VectorStore.ts:1282 🗑️ Deleting document: timecapsule-TC-1764005848472fm (attempt 1/5)
MetadataManager.ts:686 ✅ BubblSpace persistence verified: My BubblSpace
MetadataManager.ts:715 📝 Syncing TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-1764005848472fm)
MetadataManager.ts:953 ✅ Force metadata sync completed successfully
MetadataManager.ts:124 ✅ BubblSpace immediately synced to Knowledge Base: My BubblSpace
installHook.js:1 ⚠️ Document not found: timecapsule-TC-1764005848472fm
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
AIFramesPage.useEffect.initializeManagers @ page.tsx:1477
AIFramesPage.useEffect @ page.tsx:1489
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
MetadataManager.ts:721 🗑️ Deleted old TimeCapsule document: timecapsule-TC-1764005848472fm
MetadataManager.ts:721 🗑️ Deleted old TimeCapsule document: timecapsule-TC-1764005848472fm
VectorStore.ts:2205 🔄 Bypassing duplicate detection for metadata update: TimeCapsule: Untitled TimeCapsule
VectorStore.ts:2212 📋 Found 0 existing TimeCapsule documents for timeCapsuleId: TC-1764005848472fm
VectorStore.ts:2029 📋 TimeCapsule document operation: {id: 'timecapsule-TC-1764005848472fm', title: 'TimeCapsule: Untitled TimeCapsule', source: 'metadata', timeCapsuleId: 'TC-1764005848472fm', name: 'Untitled TimeCapsule', …}
VectorStore.ts:2142 ✅ Document inserted: timecapsule-TC-1764005848472fm
VectorStore.ts:2634 🔍 Verifying document persistence: timecapsule-TC-1764005848472fm (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for timecapsule-TC-1764005848472fm: 1-zqejeheqiv
VectorStore.ts:2647 ✅ Document persistence verified: TimeCapsule: Untitled TimeCapsule (ID: timecapsule-TC-1764005848472fm, Rev: 1-zqejeheqiv)
MetadataManager.ts:772 ✅ TimeCapsule synced to Knowledge Base: Untitled TimeCapsule
MetadataManager.ts:772 ✅ TimeCapsule synced to Knowledge Base: Untitled TimeCapsule
MetadataManager.ts:777 ✅ TimeCapsule persistence verified: Untitled TimeCapsule
MetadataManager.ts:806 ✅ All metadata synced to Knowledge Base successfully {syncedBubblSpaces: 1, syncedTimeCapsules: 1, totalItems: 2}
MetadataManager.ts:777 ✅ TimeCapsule persistence verified: Untitled TimeCapsule
MetadataManager.ts:806 ✅ All metadata synced to Knowledge Base successfully {syncedBubblSpaces: 1, syncedTimeCapsules: 1, totalItems: 2}
MetadataManager.ts:953 ✅ Force metadata sync completed successfully
MetadataManager.ts:1027 ✅ Metadata synced with vector store
MetadataManager.ts:304 ✅ TimeCapsule immediately synced to Knowledge Base: Untitled TimeCapsule
useAIProviders.ts:232 🔄 aiProviders object updated
analytics.ts:271 📊 GA4: Initializing Google Analytics 4...
analytics.ts:305 ✅ GA4: Successfully initialized with enhanced tracking
Analytics.tsx:23 ✅ Analytics: GA4 initialized with user consent
analytics.ts:363 📊 GA4: Page view tracked - AI-Frames
Analytics.tsx:72 📊 Analytics: Tracked page view - AI-Frames (/ai-frames)
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1764005852422&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1594054800.1764005852&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_s=1&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~115583767~115938465~115938469~116184927~116184929~116217636~116217638&sid=1764005852&sct=1&seg=0&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=12082".
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
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1764005852422&gcd=13l3l3l3l1l1&npa=0&dma=0&sr=2240x1260&cid=1594054800.1764005852&ul=en-us&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~115583767~115938465~115938469~116184927~116184929~116217636~116217638&sid=1764005852&sct=1&seg=0&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-11-24T17%3A37%3A32.430Z&epn.page_duration=5&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=142.0.0.0&ep.viewport_size=2240x806&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=60&_et=2&tfd=12190".
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
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1764005852422&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1594054800.1764005852&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=3&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~115583767~115938465~115938469~116184927~116184929~116217636~116217638&dt=AI-Frames&dl=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&sid=1764005852&sct=1&seg=1&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=learning&ep.page_type=interactive&ep.pathname=%2Fai-frames&ep.consent_analytics=true&ep.consent_functional=true&_et=104&tfd=12193".
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
page.tsx:1597 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1597
EnhancedLearningGraph.tsx:3184 🎯 Dispatching ensure-manual-session event for frame drop
page.tsx:2006 🔍 Checking for manual session... {activeSessionId: null, sessionsCount: 0}
page.tsx:2016 🆕 Auto-creating manual session for frame drop
useAIFlowBuilder.ts:931 🎬 [SESSION] Creating new manual session...
useAIFlowBuilder.ts:937 📦 [SESSION] New session object created: {id: 'manual_1764005855824_repklnk75', name: 'Manual Session', source: 'manual', timeCapsuleId: 'timecapsule_1764005848504_umrbkqea8'}
page.tsx:883 🧹 Graph reset: cleared nodes and edges
useAIFlowBuilder.ts:964 🧹 [SESSION] Cleared graph display for new session
useAIFlowBuilder.ts:991 💾 [SESSION] Saving new session to VectorStore...
useAIFlowBuilder.ts:999 ✅ [SESSION] Session creation complete. Returning session ID: manual_1764005855824_repklnk75
page.tsx:2021 ✅ Manual session created: manual_1764005855824_repklnk75
DualPaneFrameView.tsx:165 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 1}
page.tsx:1889 🔧 handleFramesChange: Assigned IDs to 1 frames {activeTimeCapsuleId: 'timecapsule_1764005848504_umrbkqea8', activeSessionId: null, framesWithBoth: 0}
useAIFlowBuilder.ts:955 🎯 [SESSION] Setting active session ID: null -> manual_1764005855824_repklnk75
useAIFlowBuilder.ts:955 🎯 [SESSION] Setting active session ID: null -> manual_1764005855824_repklnk75
useAIFlowBuilder.ts:950 📋 [SESSION] Updating sessions array: 0 -> 1
useAIFlowBuilder.ts:950 📋 [SESSION] Updating sessions array: 0 -> 1
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":true,"handleEdgesChangeChanged":true,"handleNodesDeleteChanged":true,"onConnectChanged":true,"onEdgesDeleteChanged":true,"onDropChanged":true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 4
useAIProviders.ts:232 🔄 aiProviders object updated
useAIFlowBuilder.ts:1323 💾 Persisting active session ID to localStorage: manual_1764005855824_repklnk75
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'manual_1764005855824_repklnk75', sessionsCount: 1, sessionsList: Array(1)}
page.tsx:1759 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
page.tsx:2051 🔧 Found 1 orphaned frames, assigning to session manual_1764005855824_repklnk75
page.tsx:2060 ✅ Assigned sessionId to 1 orphaned frames
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 5
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'drop' handler took 175ms
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
AIFramesPage @ page.tsx:3800
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
AIFramesPage @ page.tsx:3800
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
AIFramesPage @ page.tsx:3800
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
AIFramesPage @ page.tsx:3800
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
hot-reloader-client.js:197 [Fast Refresh] rebuilding
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:743
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:1940 📊 Synced frame Manual Session to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: session_manual_1764005855824_repklnk75 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
useUnifiedStorage.ts:747 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-24T17:37:36.338Z'}
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:2142 ✅ Document inserted: frames_session_1764005848441_bdbj3i0pr
VectorStore.ts:2634 🔍 Verifying document persistence: frames_session_1764005848441_bdbj3i0pr (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for session_manual_1764005855824_repklnk75: 1-zqejeheqiv
VectorStore.ts:2647 ✅ Document persistence verified: Manual Session (ID: session_manual_1764005855824_repklnk75, Rev: 1-zqejeheqiv)
sessionStore.ts:76 💾 Session saved: Manual Session (manual_1764005855824_repklnk75)
useAIFlowBuilder.ts:993 ✅ [SESSION] New session saved to VectorStore
VectorStore.ts:2000 📋 Retrieved latest revision for frames_session_1764005848441_bdbj3i0pr: 1-zqejeheqiv
VectorStore.ts:2647 ✅ Document persistence verified: Frame Sequence - 1 frames (ID: frames_session_1764005848441_bdbj3i0pr, Rev: 1-zqejeheqiv)
FrameGraphIntegration.tsx:1117 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
VectorStore.ts:2142 ✅ Document inserted: sess-1764005856403-yz1yle
VectorStore.ts:2634 🔍 Verifying document persistence: sess-1764005856403-yz1yle (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for sess-1764005856403-yz1yle: 1-zqejeheqiv
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frames Session (ID: sess-1764005856403-yz1yle, Rev: 1-zqejeheqiv)
FrameGraphIntegration.tsx:1129 ✅ Session document inserted successfully: {sessionId: 'session_1764005856403', documentId: 'sess-1764005856403-yz1yle'}
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1764005852422&gcd=13l3l3l3l1l1&npa=0&dma=0&sr=2240x1260&cid=1594054800.1764005852&ul=en-us&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~115583767~115938465~115938469~116184927~116184929~116217636~116217638&sid=1764005852&sct=1&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-11-24T17%3A37%3A32.547Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=142.0.0.0&ep.viewport_size=2240x806&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=60&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&_et=2&tfd=17194".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:443
SN @ js?id=G-V1B8R98P79:970
k.flush @ js?id=G-V1B8R98P79:977
(anonymous) @ js?id=G-V1B8R98P79:974
webpack.js?v=1764005840374:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/a29b9bdb8347dd3e.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764005840374:1367
Promise.then
hotCheck @ webpack.js?v=1764005840374:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
webpack.js?v=1764005840374:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/48c23870c6b3ab0a.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764005840374:1367
Promise.then
hotCheck @ webpack.js?v=1764005840374:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleApplyUpdates @ hot-reloader-client.js:123
eval @ hot-reloader-client.js:143
Promise.then
tryApplyUpdatesWebpack @ hot-reloader-client.js:142
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1409ms
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
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:714 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(1), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: true}
unifiedStorage.ts:553 ✅ IndexedDB save completed
unifiedStorage.ts:104 ✅ Unified save completed successfully
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
useUnifiedStorage.ts:747 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-24T17:37:41.378Z'}
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1764005840374:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/196fe8d7b26ae7ab.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764005840374:1367
Promise.then
hotCheck @ webpack.js?v=1764005840374:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 362ms
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
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 194ms
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) <input data-slot=​"input" class=​"file:​text-foreground placeholder:​text-muted-foreground selection:​bg-primary selection:​text-primary-foreground dark:​bg-input/​30 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow]​ outline-none file:​inline-flex file:​h-7 file:​border-0 file:​bg-transparent file:​text-sm file:​font-medium disabled:​pointer-events-none disabled:​cursor-not-allowed disabled:​opacity-50 md:​text-sm focus-visible:​border-ring focus-visible:​ring-ring/​50 focus-visible:​ring-[3px]​ aria-invalid:​ring-destructive/​20 dark:​aria-invalid:​ring-destructive/​40 aria-invalid:​border-destructive bg-white border-slate-300" placeholder=​"sk-or-v1-..." type=​"password" value>​flex
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) <input data-slot=​"input" class=​"file:​text-foreground placeholder:​text-muted-foreground selection:​bg-primary selection:​text-primary-foreground dark:​bg-input/​30 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow]​ outline-none file:​inline-flex file:​h-7 file:​border-0 file:​bg-transparent file:​text-sm file:​font-medium disabled:​pointer-events-none disabled:​cursor-not-allowed disabled:​opacity-50 md:​text-sm focus-visible:​border-ring focus-visible:​ring-ring/​50 focus-visible:​ring-[3px]​ aria-invalid:​ring-destructive/​20 dark:​aria-invalid:​ring-destructive/​40 aria-invalid:​border-destructive bg-white border-slate-300" placeholder=​"firecrawl_live_..." type=​"password" value>​flex
page.tsx:1597 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1597
useAIFlowBuilder.ts:931 🎬 [SESSION] Creating new manual session...
useAIFlowBuilder.ts:937 📦 [SESSION] New session object created: {id: 'manual_1764005866862_ueciee2w0', name: 'Manual Session 24/11/2025, 23:07:46', source: 'manual', timeCapsuleId: 'timecapsule_1764005848504_umrbkqea8'}
page.tsx:883 🧹 Graph reset: cleared nodes and edges
useAIFlowBuilder.ts:964 🧹 [SESSION] Cleared graph display for new session
useAIFlowBuilder.ts:991 💾 [SESSION] Saving new session to VectorStore...
useAIFlowBuilder.ts:999 ✅ [SESSION] Session creation complete. Returning session ID: manual_1764005866862_ueciee2w0
useAIFlowBuilder.ts:955 🎯 [SESSION] Setting active session ID: manual_1764005855824_repklnk75 -> manual_1764005866862_ueciee2w0
useAIFlowBuilder.ts:955 🎯 [SESSION] Setting active session ID: manual_1764005855824_repklnk75 -> manual_1764005866862_ueciee2w0
useAIFlowBuilder.ts:950 📋 [SESSION] Updating sessions array: 1 -> 2
useAIFlowBuilder.ts:950 📋 [SESSION] Updating sessions array: 1 -> 2
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":true,"handleEdgesChangeChanged":true,"handleNodesDeleteChanged":true,"onConnectChanged":true,"onEdgesDeleteChanged":true,"onDropChanged":true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 17
useAIProviders.ts:232 🔄 aiProviders object updated
useAIFlowBuilder.ts:1323 💾 Persisting active session ID to localStorage: manual_1764005866862_ueciee2w0
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'manual_1764005866862_ueciee2w0', sessionsCount: 2, sessionsList: Array(2)}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 18
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 327ms
EnhancedLearningGraph.tsx:3738 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":true}
EnhancedLearningGraph.tsx:3750 EnhancedLearningGraph rerender: 19
VectorStore.ts:1940 📊 Synced frame Manual Session 24/11/2025, 23:07:46 to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: session_manual_1764005866862_ueciee2w0 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for session_manual_1764005866862_ueciee2w0: 1-zqejeheqiv
VectorStore.ts:2647 ✅ Document persistence verified: Manual Session 24/11/2025, 23:07:46 (ID: session_manual_1764005866862_ueciee2w0, Rev: 1-zqejeheqiv)
sessionStore.ts:76 💾 Session saved: Manual Session 24/11/2025, 23:07:46 (manual_1764005866862_ueciee2w0)
useAIFlowBuilder.ts:993 ✅ [SESSION] New session saved to VectorStore
page.tsx:1597 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1597
useAIProviders.ts:232 🔄 aiProviders object updated
 🔄 aiProviders object updated
webpack-internal:///…evelopment.js:16378 [Violation] 'click' handler took 202ms
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) 
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) 
 📋 Retrieved latest revision for session_manual_1764005866862_ueciee2w0: 1-zqejeheqiv
 📊 Synced frame Manual Session 24/11/2025, 23:07:46 to Knowledge Base (updated)
 🔍 Verifying document persistence: session_manual_1764005866862_ueciee2w0 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for session_manual_1764005866862_ueciee2w0: 2-zqejeheqiv
 ✅ Document persistence verified: Manual Session 24/11/2025, 23:07:46 (ID: session_manual_1764005866862_ueciee2w0, Rev: 2-zqejeheqiv)
 💾 Session saved: Manual Session 24/11/2025, 23:07:46 (manual_1764005866862_ueciee2w0)
 📂 Session loaded: Manual Session (manual_1764005855824_repklnk75)
 🧹 Graph reset: cleared nodes and edges
 🧹 Cleared graph UI for session switch
 🔄 Switched to session: Manual Session (ID: manual_1764005855824_repklnk75)
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":true,"handleEdgesChangeChanged":true,"handleNodesDeleteChanged":true,"onConnectChanged":true,"onEdgesDeleteChanged":true,"onDropChanged":true}
 EnhancedLearningGraph rerender: 20
 🔄 aiProviders object updated
 💾 Persisting active session ID to localStorage: manual_1764005855824_repklnk75
 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'manual_1764005855824_repklnk75', sessionsCount: 2, sessionsList: Array(2)}
 EnhancedLearningGraph rerender: 21
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 22
 🔄 aiProviders object updated
 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ webpack-internal:///…t/dist/index.js:986
EditorInstanceManager @ webpack-internal:///…t/dist/index.js:961
eval @ webpack-internal:///…/dist/index.js:1167
mountStateImpl @ webpack-internal:///…development.js:7271
mountState @ webpack-internal:///…development.js:7292
useState @ webpack-internal:///…evelopment.js:23291
exports.useState @ webpack-internal:///…development.js:1231
useEditor @ webpack-internal:///…/dist/index.js:1167
RichTextEditor @ webpack-internal:///…text-editor.tsx:121
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<RichTextEditor>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:487
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<EnhancedAIFrameNode>
exports.jsx @ webpack-internal:///….development.js:339
NodeWrapper @ webpack-internal:///…t/esm/index.js:3131
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<NodeWrapper>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…t/esm/index.js:3203
NodeRendererComponent @ webpack-internal:///…t/esm/index.js:3178
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
beginWork @ webpack-internal:///…evelopment.js:10992
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
<NodeRenderer>
exports.jsx @ webpack-internal:///….development.js:339
GraphViewComponent @ webpack-internal:///…t/esm/index.js:4740
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
updateMemoComponent @ webpack-internal:///…development.js:8719
beginWork @ webpack-internal:///…evelopment.js:10984
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<GraphView>
exports.jsx @ webpack-internal:///….development.js:339
ReactFlow @ webpack-internal:///…t/esm/index.js:5365
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
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef(ReactFlow)>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedLearningGraph @ webpack-internal:///…rningGraph.tsx:3967
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
<EnhancedLearningGraph>
exports.jsxDEV @ webpack-internal:///….development.js:346
DualPaneFrameView @ webpack-internal:///…eFrameView.tsx:1529
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
<DualPaneFrameView>
exports.jsxDEV @ webpack-internal:///….development.js:346
FrameGraphIntegration @ webpack-internal:///…ntegration.tsx:1889
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
<FrameGraphIntegration>
exports.jsxDEV @ webpack-internal:///….development.js:346
AIFramesPage @ webpack-internal:///…rames/page.tsx:3804
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
 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ webpack-internal:///…t/dist/index.js:986
EditorInstanceManager @ webpack-internal:///…t/dist/index.js:961
eval @ webpack-internal:///…/dist/index.js:1167
mountStateImpl @ webpack-internal:///…development.js:7275
mountState @ webpack-internal:///…development.js:7292
useState @ webpack-internal:///…evelopment.js:23291
exports.useState @ webpack-internal:///…development.js:1231
useEditor @ webpack-internal:///…/dist/index.js:1167
RichTextEditor @ webpack-internal:///…text-editor.tsx:121
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<RichTextEditor>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:487
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<EnhancedAIFrameNode>
exports.jsx @ webpack-internal:///….development.js:339
NodeWrapper @ webpack-internal:///…t/esm/index.js:3131
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<NodeWrapper>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…t/esm/index.js:3203
NodeRendererComponent @ webpack-internal:///…t/esm/index.js:3178
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
beginWork @ webpack-internal:///…evelopment.js:10992
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
<NodeRenderer>
exports.jsx @ webpack-internal:///….development.js:339
GraphViewComponent @ webpack-internal:///…t/esm/index.js:4740
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
updateMemoComponent @ webpack-internal:///…development.js:8719
beginWork @ webpack-internal:///…evelopment.js:10984
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<GraphView>
exports.jsx @ webpack-internal:///….development.js:339
ReactFlow @ webpack-internal:///…t/esm/index.js:5365
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
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef(ReactFlow)>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedLearningGraph @ webpack-internal:///…rningGraph.tsx:3967
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
<EnhancedLearningGraph>
exports.jsxDEV @ webpack-internal:///….development.js:346
DualPaneFrameView @ webpack-internal:///…eFrameView.tsx:1529
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
<DualPaneFrameView>
exports.jsxDEV @ webpack-internal:///….development.js:346
FrameGraphIntegration @ webpack-internal:///…ntegration.tsx:1889
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
<FrameGraphIntegration>
exports.jsxDEV @ webpack-internal:///….development.js:346
AIFramesPage @ webpack-internal:///…rames/page.tsx:3804
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
 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ webpack-internal:///…t/dist/index.js:986
EditorInstanceManager @ webpack-internal:///…t/dist/index.js:961
eval @ webpack-internal:///…/dist/index.js:1167
mountStateImpl @ webpack-internal:///…development.js:7271
mountState @ webpack-internal:///…development.js:7292
useState @ webpack-internal:///…evelopment.js:23291
exports.useState @ webpack-internal:///…development.js:1231
useEditor @ webpack-internal:///…/dist/index.js:1167
RichTextEditor @ webpack-internal:///…text-editor.tsx:121
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<RichTextEditor>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:541
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<EnhancedAIFrameNode>
exports.jsx @ webpack-internal:///….development.js:339
NodeWrapper @ webpack-internal:///…t/esm/index.js:3131
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<NodeWrapper>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…t/esm/index.js:3203
NodeRendererComponent @ webpack-internal:///…t/esm/index.js:3178
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
beginWork @ webpack-internal:///…evelopment.js:10992
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
<NodeRenderer>
exports.jsx @ webpack-internal:///….development.js:339
GraphViewComponent @ webpack-internal:///…t/esm/index.js:4740
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
updateMemoComponent @ webpack-internal:///…development.js:8719
beginWork @ webpack-internal:///…evelopment.js:10984
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<GraphView>
exports.jsx @ webpack-internal:///….development.js:339
ReactFlow @ webpack-internal:///…t/esm/index.js:5365
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
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef(ReactFlow)>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedLearningGraph @ webpack-internal:///…rningGraph.tsx:3967
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
<EnhancedLearningGraph>
exports.jsxDEV @ webpack-internal:///….development.js:346
DualPaneFrameView @ webpack-internal:///…eFrameView.tsx:1529
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
<DualPaneFrameView>
exports.jsxDEV @ webpack-internal:///….development.js:346
FrameGraphIntegration @ webpack-internal:///…ntegration.tsx:1889
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
<FrameGraphIntegration>
exports.jsxDEV @ webpack-internal:///….development.js:346
AIFramesPage @ webpack-internal:///…rames/page.tsx:3804
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
 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ webpack-internal:///…t/dist/index.js:986
EditorInstanceManager @ webpack-internal:///…t/dist/index.js:961
eval @ webpack-internal:///…/dist/index.js:1167
mountStateImpl @ webpack-internal:///…development.js:7275
mountState @ webpack-internal:///…development.js:7292
useState @ webpack-internal:///…evelopment.js:23291
exports.useState @ webpack-internal:///…development.js:1231
useEditor @ webpack-internal:///…/dist/index.js:1167
RichTextEditor @ webpack-internal:///…text-editor.tsx:121
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<RichTextEditor>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:541
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<EnhancedAIFrameNode>
exports.jsx @ webpack-internal:///….development.js:339
NodeWrapper @ webpack-internal:///…t/esm/index.js:3131
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<NodeWrapper>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…t/esm/index.js:3203
NodeRendererComponent @ webpack-internal:///…t/esm/index.js:3178
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
beginWork @ webpack-internal:///…evelopment.js:10992
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
<NodeRenderer>
exports.jsx @ webpack-internal:///….development.js:339
GraphViewComponent @ webpack-internal:///…t/esm/index.js:4740
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
updateMemoComponent @ webpack-internal:///…development.js:8719
beginWork @ webpack-internal:///…evelopment.js:10984
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<GraphView>
exports.jsx @ webpack-internal:///….development.js:339
ReactFlow @ webpack-internal:///…t/esm/index.js:5365
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
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef(ReactFlow)>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedLearningGraph @ webpack-internal:///…rningGraph.tsx:3967
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
<EnhancedLearningGraph>
exports.jsxDEV @ webpack-internal:///….development.js:346
DualPaneFrameView @ webpack-internal:///…eFrameView.tsx:1529
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
<DualPaneFrameView>
exports.jsxDEV @ webpack-internal:///….development.js:346
FrameGraphIntegration @ webpack-internal:///…ntegration.tsx:1889
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
<FrameGraphIntegration>
exports.jsxDEV @ webpack-internal:///….development.js:346
AIFramesPage @ webpack-internal:///…rames/page.tsx:3804
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
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 357ms
 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
 ✅ Session document inserted successfully: {sessionId: 'session_1764005879808', documentId: 'sess-1764005879808-xwy2lz'}
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 23
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":true}
 EnhancedLearningGraph rerender: 24
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
 🔄 aiProviders object updated
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
 🔄 aiProviders object updated
webpack-internal:///…evelopment.js:16378 [Violation] 'click' handler took 205ms
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) 
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) 
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
 📋 Retrieved latest revision for session_manual_1764005855824_repklnk75: 1-zqejeheqiv
 📊 Synced frame Manual Session to Knowledge Base (updated)
 🔍 Verifying document persistence: session_manual_1764005855824_repklnk75 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for session_manual_1764005855824_repklnk75: 2-zqejeheqiv
 ✅ Document persistence verified: Manual Session (ID: session_manual_1764005855824_repklnk75, Rev: 2-zqejeheqiv)
 💾 Session saved: Manual Session (manual_1764005855824_repklnk75)
 📂 Session loaded: Manual Session 24/11/2025, 23:07:46 (manual_1764005866862_ueciee2w0)
 🧹 Graph reset: cleared nodes and edges
 🧹 Cleared graph UI for session switch
 🔄 Switched to session: Manual Session 24/11/2025, 23:07:46 (ID: manual_1764005866862_ueciee2w0)
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":true,"handleEdgesChangeChanged":true,"handleNodesDeleteChanged":true,"onConnectChanged":true,"onEdgesDeleteChanged":true,"onDropChanged":true}
 EnhancedLearningGraph rerender: 25
 🔄 aiProviders object updated
 💾 Persisting active session ID to localStorage: manual_1764005866862_ueciee2w0
 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'manual_1764005866862_ueciee2w0', sessionsCount: 2, sessionsList: Array(2)}
 EnhancedLearningGraph rerender: 26
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 421ms
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":true}
 EnhancedLearningGraph rerender: 27
 🔄 aiProviders object updated
 🎯 Dispatching ensure-manual-session event for frame drop
 🔍 Checking for manual session... {activeSessionId: 'manual_1764005866862_ueciee2w0', sessionsCount: 2}
 ✅ Using existing manual session: manual_1764005866862_ueciee2w0
 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 1}
 🔧 handleFramesChange: Assigned IDs to 1 frames {activeTimeCapsuleId: 'timecapsule_1764005848504_umrbkqea8', activeSessionId: 'manual_1764005866862_ueciee2w0', framesWithBoth: 1}
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 28
 🔄 aiProviders object updated
 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ webpack-internal:///…t/dist/index.js:986
EditorInstanceManager @ webpack-internal:///…t/dist/index.js:961
eval @ webpack-internal:///…/dist/index.js:1167
mountStateImpl @ webpack-internal:///…development.js:7271
mountState @ webpack-internal:///…development.js:7292
useState @ webpack-internal:///…evelopment.js:23291
exports.useState @ webpack-internal:///…development.js:1231
useEditor @ webpack-internal:///…/dist/index.js:1167
RichTextEditor @ webpack-internal:///…text-editor.tsx:121
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
<RichTextEditor>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:487
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
<EnhancedAIFrameNode>
exports.jsx @ webpack-internal:///….development.js:339
NodeWrapper @ webpack-internal:///…t/esm/index.js:3131
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
<NodeWrapper>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…t/esm/index.js:3203
NodeRendererComponent @ webpack-internal:///…t/esm/index.js:3178
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
beginWork @ webpack-internal:///…evelopment.js:10992
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ webpack-internal:///…t/dist/index.js:986
EditorInstanceManager @ webpack-internal:///…t/dist/index.js:961
eval @ webpack-internal:///…/dist/index.js:1167
mountStateImpl @ webpack-internal:///…development.js:7275
mountState @ webpack-internal:///…development.js:7292
useState @ webpack-internal:///…evelopment.js:23291
exports.useState @ webpack-internal:///…development.js:1231
useEditor @ webpack-internal:///…/dist/index.js:1167
RichTextEditor @ webpack-internal:///…text-editor.tsx:121
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
<RichTextEditor>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:487
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
<EnhancedAIFrameNode>
exports.jsx @ webpack-internal:///….development.js:339
NodeWrapper @ webpack-internal:///…t/esm/index.js:3131
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
<NodeWrapper>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…t/esm/index.js:3203
NodeRendererComponent @ webpack-internal:///…t/esm/index.js:3178
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
beginWork @ webpack-internal:///…evelopment.js:10992
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ webpack-internal:///…t/dist/index.js:986
EditorInstanceManager @ webpack-internal:///…t/dist/index.js:961
eval @ webpack-internal:///…/dist/index.js:1167
mountStateImpl @ webpack-internal:///…development.js:7271
mountState @ webpack-internal:///…development.js:7292
useState @ webpack-internal:///…evelopment.js:23291
exports.useState @ webpack-internal:///…development.js:1231
useEditor @ webpack-internal:///…/dist/index.js:1167
RichTextEditor @ webpack-internal:///…text-editor.tsx:121
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
<RichTextEditor>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:541
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
<EnhancedAIFrameNode>
exports.jsx @ webpack-internal:///….development.js:339
NodeWrapper @ webpack-internal:///…t/esm/index.js:3131
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
<NodeWrapper>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…t/esm/index.js:3203
NodeRendererComponent @ webpack-internal:///…t/esm/index.js:3178
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
beginWork @ webpack-internal:///…evelopment.js:10992
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performSyncWorkOnRoot @ webpack-internal:///…evelopment.js:16365
flushSyncWorkAcrossRoots_impl @ webpack-internal:///…evelopment.js:16211
processRootScheduleInMicrotask @ webpack-internal:///…evelopment.js:16250
eval @ webpack-internal:///…evelopment.js:16384
 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ webpack-internal:///…t/dist/index.js:986
EditorInstanceManager @ webpack-internal:///…t/dist/index.js:961
eval @ webpack-internal:///…/dist/index.js:1167
mountStateImpl @ webpack-internal:///…development.js:7275
mountState @ webpack-internal:///…development.js:7292
useState @ webpack-internal:///…evelopment.js:23291
exports.useState @ webpack-internal:///…development.js:1231
useEditor @ webpack-internal:///…/dist/index.js:1167
RichTextEditor @ webpack-internal:///…text-editor.tsx:121
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
<RichTextEditor>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:541
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
<EnhancedAIFrameNode>
exports.jsx @ webpack-internal:///….development.js:339
NodeWrapper @ webpack-internal:///…t/esm/index.js:3131
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
<NodeWrapper>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…t/esm/index.js:3203
NodeRendererComponent @ webpack-internal:///…t/esm/index.js:3178
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
beginWork @ webpack-internal:///…evelopment.js:10992
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
 EnhancedLearningGraph rerender: 29
webpack-internal:///…evelopment.js:16378 [Violation] 'drop' handler took 171ms
 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
 ✅ Session document inserted successfully: {sessionId: 'session_1764005925953', documentId: 'sess-1764005925953-5mlvg9'}
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 30
 🔄 aiProviders object updated
webpack-internal:///…evelopment.js:16378 [Violation] 'setTimeout' handler took 74ms
 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(1), …}
 💾 Starting unified save... {skipVectorStore: false}
 ✅ IndexedDB save completed
 📊 Synced frame AI-Frame: Frame 1 to Knowledge Base (inserted)
 💾 Database flush completed
 🔍 Verifying document persistence: aiframe-frame-1764005925775-yuz5v9kxx (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-frame-1764005925775-yuz5v9kxx: 1-zqejeheqiv
 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1764005925775-yuz5v9kxx, Rev: 1-zqejeheqiv)
 📊 Synced frame AI-Frame Chapters to Knowledge Base (inserted)
 💾 Database flush completed
 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-chapters: 1-zqejeheqiv
 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 1-zqejeheqiv)
 ✅ Unified save completed successfully
 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-24T17:38:46.273Z'}
 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ webpack-internal:///…ifiedStorage.ts:591
saveAll @ webpack-internal:///…nifiedStorage.ts:56
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ webpack-internal:///…ifiedStorage.ts:807
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleForceSaveEvent @ webpack-internal:///…fiedStorage.ts:1638
EnhancedLearningGraph.useCallback[onDrop] @ webpack-internal:///…rningGraph.tsx:3380
 [Fast Refresh] rebuilding
 🔄 aiProviders object updated
 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/da2550c6f0377e18.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764005840374:1367
Promise.then
hotCheck @ webpack.js?v=1764005840374:553
tryApplyUpdatesWebpack @ webpack-internal:///…oader-client.js:132
handleHotUpdate @ webpack-internal:///…oader-client.js:170
processMessage @ webpack-internal:///…oader-client.js:249
handler @ webpack-internal:///…oader-client.js:473
 [Fast Refresh] done in 1117ms
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
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 31
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 32
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
 🎯 SAVE ATTEMPT: {frameId: 'frame-1764005925775-yuz5v9kxx', hasOnFrameUpdate: true, editData: {…}, willEmitEvent: true}
 🎯 FRAME EDIT DEBUG: {frameId: 'frame-1764005925775-yuz5v9kxx', frameData: {…}, currentFrames: Array(1), eventType: 'graph-frame-edited'}
 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 1}
 🔧 handleFramesChange: Assigned IDs to 1 frames {activeTimeCapsuleId: 'timecapsule_1764005848504_umrbkqea8', activeSessionId: 'manual_1764005866862_ueciee2w0', framesWithBoth: 1}
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 33
 🔄 aiProviders object updated
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 34
 ✏️ Enhanced AI Frame Node: Frame edit event emitted: {frameId: 'frame-1764005925775-yuz5v9kxx', title: 'Frame02'}
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 35
 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 0, edgeCount: 0, frameIds: Array(1), …}
 💾 Starting unified save... {skipVectorStore: false}
 📋 Retrieved latest revision for aiframe-frame-1764005925775-yuz5v9kxx: 1-zqejeheqiv
 ✅ IndexedDB save completed
 📊 Synced frame AI-Frame: Frame02 to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-frame-1764005925775-yuz5v9kxx (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-frame-1764005925775-yuz5v9kxx: 2-zqejeheqiv
 ✅ Document persistence verified: AI-Frame: Frame02 (ID: aiframe-frame-1764005925775-yuz5v9kxx, Rev: 2-zqejeheqiv)
 📋 Retrieved latest revision for aiframe-chapters: 1-zqejeheqiv
 🔄 aiProviders object updated
 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-chapters: 2-zqejeheqiv
 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 2-zqejeheqiv)
 ✅ Unified save completed successfully
 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-24T17:38:55.278Z'}
 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ webpack-internal:///…ifiedStorage.ts:591
saveAll @ webpack-internal:///…nifiedStorage.ts:56
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ webpack-internal:///…ifiedStorage.ts:807
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleFrameEditedEvent @ webpack-internal:///…fiedStorage.ts:1459
EnhancedAIFrameNode.useCallback[handleSave] @ webpack-internal:///…AIFrameNode.tsx:128
executeDispatch @ webpack-internal:///…evelopment.js:16502
runWithFiberInDEV @ webpack-internal:///….development.js:845
processDispatchQueue @ webpack-internal:///…evelopment.js:16552
eval @ webpack-internal:///…evelopment.js:17150
batchedUpdates$1 @ webpack-internal:///…development.js:3263
dispatchEventForPluginEventSystem @ webpack-internal:///…evelopment.js:16706
dispatchEvent @ webpack-internal:///…evelopment.js:20816
dispatchDiscreteEvent @ webpack-internal:///…evelopment.js:20784
 [Fast Refresh] rebuilding
 🔄 aiProviders object updated
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/1d8176cf044d6cd6.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764005840374:1367
Promise.then
hotCheck @ webpack.js?v=1764005840374:553
tryApplyUpdatesWebpack @ webpack-internal:///…oader-client.js:132
handleHotUpdate @ webpack-internal:///…oader-client.js:170
processMessage @ webpack-internal:///…oader-client.js:249
handler @ webpack-internal:///…oader-client.js:473
 [Fast Refresh] done in 784ms
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
 🔄 aiProviders object updated
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
 🔄 aiProviders object updated
webpack-internal:///…evelopment.js:16378 [Violation] 'click' handler took 205ms
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) 
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) 
 📋 Retrieved latest revision for session_manual_1764005866862_ueciee2w0: 2-zqejeheqiv
 📊 Synced frame Manual Session 24/11/2025, 23:07:46 to Knowledge Base (updated)
 🔍 Verifying document persistence: session_manual_1764005866862_ueciee2w0 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for session_manual_1764005866862_ueciee2w0: 3-zqejeheqiv
 ✅ Document persistence verified: Manual Session 24/11/2025, 23:07:46 (ID: session_manual_1764005866862_ueciee2w0, Rev: 3-zqejeheqiv)
 💾 Session saved: Manual Session 24/11/2025, 23:07:46 (manual_1764005866862_ueciee2w0)
 📂 Session loaded: Manual Session (manual_1764005855824_repklnk75)
 🧹 Graph reset: cleared nodes and edges
 🧹 Cleared graph UI for session switch
 🔄 Switched to session: Manual Session (ID: manual_1764005855824_repklnk75)
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":true,"handleEdgesChangeChanged":true,"handleNodesDeleteChanged":true,"onConnectChanged":true,"onEdgesDeleteChanged":true,"onDropChanged":true}
 EnhancedLearningGraph rerender: 36
 🔄 aiProviders object updated
 💾 Persisting active session ID to localStorage: manual_1764005855824_repklnk75
 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'manual_1764005855824_repklnk75', sessionsCount: 2, sessionsList: Array(2)}
 EnhancedLearningGraph rerender: 37
 🔄 aiProviders object updated
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 324ms
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":true}
 EnhancedLearningGraph rerender: 38
 🔄 aiProviders object updated
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1764005852422&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1594054800.1764005852&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=5&tag_exp=103116026~103200004~104527907~104528500~104684208~104684211~115583767~115938465~115938469~116184927~116184929~116217636~116217638&sid=1764005852&sct=1&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=scroll&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&epn.percent_scrolled=90&_et=79865&tfd=118897".
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
mB @ js?id=G-V1B8R98P79:787
uB @ js?id=G-V1B8R98P79:787
cI @ js?id=G-V1B8R98P79:889
YH @ js?id=G-V1B8R98P79:888
a @ js?id=G-V1B8R98P79:887
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
 🔄 aiProviders object updated
webpack-internal:///…evelopment.js:16378 [Violation] 'click' handler took 231ms
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) 
ai-frames:1 [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) 
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
 📋 Retrieved latest revision for session_manual_1764005855824_repklnk75: 2-zqejeheqiv
 📊 Synced frame Manual Session to Knowledge Base (updated)
 🔍 Verifying document persistence: session_manual_1764005855824_repklnk75 (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for session_manual_1764005855824_repklnk75: 3-zqejeheqiv
 ✅ Document persistence verified: Manual Session (ID: session_manual_1764005855824_repklnk75, Rev: 3-zqejeheqiv)
 💾 Session saved: Manual Session (manual_1764005855824_repklnk75)
 📂 Session loaded: Manual Session 24/11/2025, 23:07:46 (manual_1764005866862_ueciee2w0)
 🧹 Graph reset: cleared nodes and edges
 🧹 Cleared graph UI for session switch
 🔄 Switched to session: Manual Session 24/11/2025, 23:07:46 (ID: manual_1764005866862_ueciee2w0)
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":true,"handleEdgesChangeChanged":true,"handleNodesDeleteChanged":true,"onConnectChanged":true,"onEdgesDeleteChanged":true,"onDropChanged":true}
 EnhancedLearningGraph rerender: 39
 🔄 aiProviders object updated
 💾 Persisting active session ID to localStorage: manual_1764005866862_ueciee2w0
 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'manual_1764005866862_ueciee2w0', sessionsCount: 2, sessionsList: Array(2)}
 EnhancedLearningGraph rerender: 40
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 41
 🔄 aiProviders object updated
 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ webpack-internal:///…t/dist/index.js:986
EditorInstanceManager @ webpack-internal:///…t/dist/index.js:961
eval @ webpack-internal:///…/dist/index.js:1167
mountStateImpl @ webpack-internal:///…development.js:7271
mountState @ webpack-internal:///…development.js:7292
useState @ webpack-internal:///…evelopment.js:23291
exports.useState @ webpack-internal:///…development.js:1231
useEditor @ webpack-internal:///…/dist/index.js:1167
RichTextEditor @ webpack-internal:///…text-editor.tsx:121
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<RichTextEditor>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:487
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<EnhancedAIFrameNode>
exports.jsx @ webpack-internal:///….development.js:339
NodeWrapper @ webpack-internal:///…t/esm/index.js:3131
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<NodeWrapper>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…t/esm/index.js:3203
NodeRendererComponent @ webpack-internal:///…t/esm/index.js:3178
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
beginWork @ webpack-internal:///…evelopment.js:10992
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
<NodeRenderer>
exports.jsx @ webpack-internal:///….development.js:339
GraphViewComponent @ webpack-internal:///…t/esm/index.js:4740
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
updateMemoComponent @ webpack-internal:///…development.js:8719
beginWork @ webpack-internal:///…evelopment.js:10984
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<GraphView>
exports.jsx @ webpack-internal:///….development.js:339
ReactFlow @ webpack-internal:///…t/esm/index.js:5365
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
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef(ReactFlow)>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedLearningGraph @ webpack-internal:///…rningGraph.tsx:3967
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
<EnhancedLearningGraph>
exports.jsxDEV @ webpack-internal:///….development.js:346
DualPaneFrameView @ webpack-internal:///…eFrameView.tsx:1529
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
<DualPaneFrameView>
exports.jsxDEV @ webpack-internal:///….development.js:346
FrameGraphIntegration @ webpack-internal:///…ntegration.tsx:1889
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
 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ webpack-internal:///…t/dist/index.js:986
EditorInstanceManager @ webpack-internal:///…t/dist/index.js:961
eval @ webpack-internal:///…/dist/index.js:1167
mountStateImpl @ webpack-internal:///…development.js:7275
mountState @ webpack-internal:///…development.js:7292
useState @ webpack-internal:///…evelopment.js:23291
exports.useState @ webpack-internal:///…development.js:1231
useEditor @ webpack-internal:///…/dist/index.js:1167
RichTextEditor @ webpack-internal:///…text-editor.tsx:121
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<RichTextEditor>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:487
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<EnhancedAIFrameNode>
exports.jsx @ webpack-internal:///….development.js:339
NodeWrapper @ webpack-internal:///…t/esm/index.js:3131
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<NodeWrapper>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…t/esm/index.js:3203
NodeRendererComponent @ webpack-internal:///…t/esm/index.js:3178
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
beginWork @ webpack-internal:///…evelopment.js:10992
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
<NodeRenderer>
exports.jsx @ webpack-internal:///….development.js:339
GraphViewComponent @ webpack-internal:///…t/esm/index.js:4740
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
updateMemoComponent @ webpack-internal:///…development.js:8719
beginWork @ webpack-internal:///…evelopment.js:10984
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<GraphView>
exports.jsx @ webpack-internal:///….development.js:339
ReactFlow @ webpack-internal:///…t/esm/index.js:5365
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
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef(ReactFlow)>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedLearningGraph @ webpack-internal:///…rningGraph.tsx:3967
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
<EnhancedLearningGraph>
exports.jsxDEV @ webpack-internal:///….development.js:346
DualPaneFrameView @ webpack-internal:///…eFrameView.tsx:1529
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
<DualPaneFrameView>
exports.jsxDEV @ webpack-internal:///….development.js:346
FrameGraphIntegration @ webpack-internal:///…ntegration.tsx:1889
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
 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ webpack-internal:///…t/dist/index.js:986
EditorInstanceManager @ webpack-internal:///…t/dist/index.js:961
eval @ webpack-internal:///…/dist/index.js:1167
mountStateImpl @ webpack-internal:///…development.js:7271
mountState @ webpack-internal:///…development.js:7292
useState @ webpack-internal:///…evelopment.js:23291
exports.useState @ webpack-internal:///…development.js:1231
useEditor @ webpack-internal:///…/dist/index.js:1167
RichTextEditor @ webpack-internal:///…text-editor.tsx:121
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<RichTextEditor>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:541
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<EnhancedAIFrameNode>
exports.jsx @ webpack-internal:///….development.js:339
NodeWrapper @ webpack-internal:///…t/esm/index.js:3131
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<NodeWrapper>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…t/esm/index.js:3203
NodeRendererComponent @ webpack-internal:///…t/esm/index.js:3178
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
beginWork @ webpack-internal:///…evelopment.js:10992
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
<NodeRenderer>
exports.jsx @ webpack-internal:///….development.js:339
GraphViewComponent @ webpack-internal:///…t/esm/index.js:4740
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
updateMemoComponent @ webpack-internal:///…development.js:8719
beginWork @ webpack-internal:///…evelopment.js:10984
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<GraphView>
exports.jsx @ webpack-internal:///….development.js:339
ReactFlow @ webpack-internal:///…t/esm/index.js:5365
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
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef(ReactFlow)>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedLearningGraph @ webpack-internal:///…rningGraph.tsx:3967
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
<EnhancedLearningGraph>
exports.jsxDEV @ webpack-internal:///….development.js:346
DualPaneFrameView @ webpack-internal:///…eFrameView.tsx:1529
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
<DualPaneFrameView>
exports.jsxDEV @ webpack-internal:///….development.js:346
FrameGraphIntegration @ webpack-internal:///…ntegration.tsx:1889
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
 Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
overrideMethod @ installHook.js:1
getInitialEditor @ webpack-internal:///…t/dist/index.js:986
EditorInstanceManager @ webpack-internal:///…t/dist/index.js:961
eval @ webpack-internal:///…/dist/index.js:1167
mountStateImpl @ webpack-internal:///…development.js:7275
mountState @ webpack-internal:///…development.js:7292
useState @ webpack-internal:///…evelopment.js:23291
exports.useState @ webpack-internal:///…development.js:1231
useEditor @ webpack-internal:///…/dist/index.js:1167
RichTextEditor @ webpack-internal:///…text-editor.tsx:121
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<RichTextEditor>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:541
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<EnhancedAIFrameNode>
exports.jsx @ webpack-internal:///….development.js:339
NodeWrapper @ webpack-internal:///…t/esm/index.js:3131
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
flushSpawnedWork @ webpack-internal:///…evelopment.js:15805
commitRoot @ webpack-internal:///…evelopment.js:15529
commitRootWhenReady @ webpack-internal:///…evelopment.js:14759
performWorkOnRoot @ webpack-internal:///…evelopment.js:14682
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<NodeWrapper>
exports.jsx @ webpack-internal:///….development.js:339
eval @ webpack-internal:///…t/esm/index.js:3203
NodeRendererComponent @ webpack-internal:///…t/esm/index.js:3178
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
beginWork @ webpack-internal:///…evelopment.js:10992
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
<NodeRenderer>
exports.jsx @ webpack-internal:///….development.js:339
GraphViewComponent @ webpack-internal:///…t/esm/index.js:4740
react-stack-bottom-frame @ webpack-internal:///…evelopment.js:22974
renderWithHooksAgain @ webpack-internal:///…development.js:6767
renderWithHooks @ webpack-internal:///…development.js:6679
updateFunctionComponent @ webpack-internal:///…development.js:8931
updateSimpleMemoComponent @ webpack-internal:///…development.js:8786
updateMemoComponent @ webpack-internal:///…development.js:8719
beginWork @ webpack-internal:///…evelopment.js:10984
runWithFiberInDEV @ webpack-internal:///….development.js:845
performUnitOfWork @ webpack-internal:///…evelopment.js:15258
workLoopSync @ webpack-internal:///…evelopment.js:15078
renderRootSync @ webpack-internal:///…evelopment.js:15058
performWorkOnRoot @ webpack-internal:///…evelopment.js:14526
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<GraphView>
exports.jsx @ webpack-internal:///….development.js:339
ReactFlow @ webpack-internal:///…t/esm/index.js:5365
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
performWorkOnRootViaSchedulerTask @ webpack-internal:///…evelopment.js:16350
performWorkUntilDeadline @ webpack-internal:///…r.development.js:45
<ForwardRef(ReactFlow)>
exports.jsxDEV @ webpack-internal:///….development.js:346
EnhancedLearningGraph @ webpack-internal:///…rningGraph.tsx:3967
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
<EnhancedLearningGraph>
exports.jsxDEV @ webpack-internal:///….development.js:346
DualPaneFrameView @ webpack-internal:///…eFrameView.tsx:1529
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
<DualPaneFrameView>
exports.jsxDEV @ webpack-internal:///….development.js:346
FrameGraphIntegration @ webpack-internal:///…ntegration.tsx:1889
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
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 339ms
 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
 ✅ Session document inserted successfully: {sessionId: 'session_1764005970941', documentId: 'sess-1764005970941-k7z55f'}
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 42
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":true}
 EnhancedLearningGraph rerender: 43
 🔄 aiProviders object updated
 🔄 aiProviders object updated
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:947
