 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5860v898116370za200zd898116370&_p=1754586125747&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528501~104573694~104684208~104684211~104948813~105087538~105087540~105103161~105103163~105113531&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=6&sid=1754585496&sct=18&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&_et=2416&tfd=209554".
Yc @ js:242
zm @ js:431
cN @ js:910
(anonymous) @ js:918
k.flush @ js:934
(anonymous) @ js:947
(anonymous) @ js:882
(anonymous) @ js:881
Navigated to http://localhost:3000/deep-research
analytics.ts:160 📱 Device Info Collected: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', platform: 'MacIntel', vendor: 'Google Inc.', language: 'en-US', languages: Array(4), …}
analytics.ts:177 [Violation] Only request geolocation information in response to a user gesture.
collectLocationInfo @ analytics.ts:177
Analytics @ analytics.ts:75
eval @ analytics.ts:556
(app-pages-browser)/./src/lib/analytics.ts @ layout.js:7974
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
fn @ webpack.js?v=1754586329046:369
eval @ Analytics.tsx:10
(app-pages-browser)/./src/components/analytics/Analytics.tsx @ layout.js:7820
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
fn @ webpack.js?v=1754586329046:369
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
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
fn @ webpack.js?v=1754586329046:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7842
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
fn @ webpack.js?v=1754586329046:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false!:11
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false! @ layout.js:4998
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
__webpack_exec__ @ layout.js:8073
(anonymous) @ layout.js:8074
__webpack_require__.O @ webpack.js?v=1754586329046:84
(anonymous) @ layout.js:8075
webpackJsonpCallback @ webpack.js?v=1754586329046:1388
(anonymous) @ layout.js:9
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.168438227865323, longitude: 72.84665833089697, …}
EmbeddingService.ts:35 🧠 Xenova environment configured for CDN loading
VectorStoreProvider.tsx:143 🚀 Auto-initializing VectorStore for route: /deep-research
VectorStoreProvider.tsx:79 🚀 VectorStoreProvider: Creating new singleton VectorStore...
RAGTracker.ts:26 🔍 RAG Tracker initialized with config: {enableTracking: true, enableVisualization: true, enablePerformanceMetrics: true, enableQualityMetrics: false, maxQueryHistory: 1000, …}
VectorStore.ts:188 🗂️ VectorStore constructor called
VectorStore.ts:189 🔍 RAG Tracker initialized for VectorStore
VectorStore.ts:250 🗂️ Initializing RxDB Vector Store...
VectorStore.ts:253 🤖 Loading document processor and starting immediate Xenova download...
DocumentProcessor.ts:61 🔧 DocumentProcessor constructor called (new architecture)
VectorStore.ts:257 🧠 Starting immediate background Xenova download...
VectorStore.ts:1510 🧠 Starting immediate Xenova download in background...
VectorStore.ts:1527 🔄 Initializing web worker (attempt 1/3)...
DocumentProcessor.ts:72 🔧 Initializing DocumentProcessor with immediate download architecture...
DocumentProcessor.ts:95 🔧 Initializing text processing worker...
VectorStore.ts:303 📚 Creating RxDB database...
analytics.ts:271 📊 GA4: Initializing Google Analytics 4...
VectorStoreProvider.tsx:146 ⏭️ Skipping auto-init for /deep-research: {isInitialized: false, isInitializing: true, attemptedBefore: true, singletonInitialized: false}
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
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<VectorStoreInitModal>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DeepResearchComponent @ DeepResearchApp.tsx:361
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
<DeepResearchComponent>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DeepResearchPage @ page.tsx:6
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
<DeepResearchPage>
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754586329046:160
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
fn @ webpack.js?v=1754586329046:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754586329046:182
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
__webpack_exec__ @ main-app.js?v=1754586329046:2824
(anonymous) @ main-app.js?v=1754586329046:2825
webpackJsonpCallback @ webpack.js?v=1754586329046:1388
(anonymous) @ main-app.js?v=1754586329046:9
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
performSyncWorkOnRoot @ react-dom-client.development.js:16365
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
<VectorStoreInitModal>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DeepResearchComponent @ DeepResearchApp.tsx:361
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
<DeepResearchComponent>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
DeepResearchPage @ page.tsx:6
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
<DeepResearchPage>
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754586329046:160
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
fn @ webpack.js?v=1754586329046:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754586329046:182
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
__webpack_exec__ @ main-app.js?v=1754586329046:2824
(anonymous) @ main-app.js?v=1754586329046:2825
webpackJsonpCallback @ webpack.js?v=1754586329046:1388
(anonymous) @ main-app.js?v=1754586329046:9
scheduler.development.js:14 [Violation] 'message' handler took 301ms
VectorStore.ts:310 -------------- RxDB Open Core RxStorage -------------------------------
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
init @ VectorStore.ts:310
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754586329046:160
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
fn @ webpack.js?v=1754586329046:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754586329046:182
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
__webpack_exec__ @ main-app.js?v=1754586329046:2824
(anonymous) @ main-app.js?v=1754586329046:2825
webpackJsonpCallback @ webpack.js?v=1754586329046:1388
(anonymous) @ main-app.js?v=1754586329046:9
VectorStore.ts:317 📄 Creating documents collection...
Analytics.tsx:39 ⏳ Analytics: Skipping page tracking - no consent or not initialized
embeddingWorker.js:231 🔧 Text processing worker loaded successfully
analytics.ts:305 ✅ GA4: Successfully initialized with enhanced tracking
Analytics.tsx:20 ✅ Analytics: GA4 initialized with user consent
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754586329046:160
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
fn @ webpack.js?v=1754586329046:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754586329046:182
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
__webpack_exec__ @ main-app.js?v=1754586329046:2824
(anonymous) @ main-app.js?v=1754586329046:2825
webpackJsonpCallback @ webpack.js?v=1754586329046:1388
(anonymous) @ main-app.js?v=1754586329046:9
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754586329046:160
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
fn @ webpack.js?v=1754586329046:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754586329046:182
options.factory @ webpack.js?v=1754586329046:712
__webpack_require__ @ webpack.js?v=1754586329046:37
__webpack_exec__ @ main-app.js?v=1754586329046:2824
(anonymous) @ main-app.js?v=1754586329046:2825
webpackJsonpCallback @ webpack.js?v=1754586329046:1388
(anonymous) @ main-app.js?v=1754586329046:9
embeddingWorker.js:59 🔧 Initializing text processing worker...
embeddingWorker.js:73 ✅ Text processing worker initialized successfully
DocumentProcessor.ts:116 ✅ Text processing worker ready
DocumentProcessor.ts:125 ✅ DocumentProcessor initialization complete (embeddings will load when needed)
VectorStore.ts:1529 ✅ Web worker initialized successfully
VectorStore.ts:1547 🧠 Starting Xenova embedding service download...
EmbeddingService.ts:69 🧠 Starting Xenova embedding service initialization...
EmbeddingService.ts:77 ✅ Loading model (checking cache)...
EmbeddingService.ts:84 📦 Loading Xenova/all-MiniLM-L6-v2 model from Hugging Face CDN...
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
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5860v898116370za200zd898116370&_p=1754586333207&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104573694~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=1&sid=1754585496&sct=18&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=4234".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
(anonymous) @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:915
(anonymous) @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:930
vn @ js?id=G-V1B8R98P79:448
Bp @ js?id=G-V1B8R98P79:468
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:662
Promise.then
gz @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:946
v @ js?id=G-V1B8R98P79:487
En @ js?id=G-V1B8R98P79:450
er @ js?id=G-V1B8R98P79:487
(anonymous) @ js?id=G-V1B8R98P79:491
(anonymous) @ js?id=G-V1B8R98P79:489
Wq @ js?id=G-V1B8R98P79:484
event @ js?id=G-V1B8R98P79:751
VD @ js?id=G-V1B8R98P79:757
(anonymous) @ js?id=G-V1B8R98P79:763
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
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5860v898116370za200zd898116370&_p=1754586333207&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104573694~104684208~104684211~104948813~105087538~105087540~105103161~105103163&sr=2240x1260&cid=2050444394.1754292465&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&sid=1754585496&sct=18&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-07T17%3A05%3A33.217Z&epn.page_duration=2&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x633&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&_et=1&tfd=4238".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
(anonymous) @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:915
(anonymous) @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:930
vn @ js?id=G-V1B8R98P79:448
Bp @ js?id=G-V1B8R98P79:468
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:662
gz @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:946
v @ js?id=G-V1B8R98P79:487
En @ js?id=G-V1B8R98P79:450
er @ js?id=G-V1B8R98P79:487
(anonymous) @ js?id=G-V1B8R98P79:491
(anonymous) @ js?id=G-V1B8R98P79:489
Wq @ js?id=G-V1B8R98P79:484
event @ js?id=G-V1B8R98P79:751
VD @ js?id=G-V1B8R98P79:757
(anonymous) @ js?id=G-V1B8R98P79:763
RD @ js?id=G-V1B8R98P79:763
ZD @ js?id=G-V1B8R98P79:763
kJ @ js?id=G-V1B8R98P79:854
fJ @ js?id=G-V1B8R98P79:853
(anonymous) @ js?id=G-V1B8R98P79:857
setTimeout
Qc @ js?id=G-V1B8R98P79:239
nJ @ js?id=G-V1B8R98P79:857
(anonymous) @ js?id=G-V1B8R98P79:351
(anonymous) @ js?id=G-V1B8R98P79:254
Ya @ js?id=G-V1B8R98P79:218
(anonymous) @ js?id=G-V1B8R98P79:256
Rd @ js?id=G-V1B8R98P79:271
(anonymous) @ js?id=G-V1B8R98P79:254
Ya @ js?id=G-V1B8R98P79:218
Xa @ js?id=G-V1B8R98P79:217
(anonymous) @ js?id=G-V1B8R98P79:278
(anonymous) @ js?id=G-V1B8R98P79:254
Ya @ js?id=G-V1B8R98P79:218
(anonymous) @ js?id=G-V1B8R98P79:220
bf @ js?id=G-V1B8R98P79:289
(anonymous) @ js?id=G-V1B8R98P79:788
$f @ js?id=G-V1B8R98P79:304
e @ js?id=G-V1B8R98P79:733
XC @ js?id=G-V1B8R98P79:734
aD @ js?id=G-V1B8R98P79:739
VD @ js?id=G-V1B8R98P79:758
(anonymous) @ js?id=G-V1B8R98P79:763
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
analytics.ts:363 📊 GA4: Page view tracked - DeepResearch-TimeCapsule
Analytics.tsx:69 📊 Analytics: Tracked page view - DeepResearch-TimeCapsule (/deep-research)
useOllamaConnection.ts:132 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ useOllamaConnection.ts:132
useOllamaConnection.useCallback[connect] @ useOllamaConnection.ts:226
useOllamaConnection.useEffect.autoReconnect @ useOllamaConnection.ts:578
useOllamaConnection.ts:174 ✅ Ollama connection test passed, sorted models: (6) ['gemma3n:e2b', 'hf.co/bubblspace/Timecapsule2.7B-g3n-mix-match-gguf:latest', 'llama3.1:8b', 'llama3.2:1b', 'qwen3:0.6b', 'tinyllama:1.1b']
VectorStore.ts:381 ✅ RxDB Vector Store initialized successfully
VectorStore.ts:382 🧠 Xenova download running in background...
VectorStoreProvider.tsx:85 ✅ VectorStoreProvider: Singleton VectorStore initialized successfully
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
initializeXenovaService @ VectorStore.ts:1555
startImmediateBackgroundDownload @ VectorStore.ts:1516
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5860v898116370za200zd898116370&_p=1754586333207&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104573694~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=3&sid=1754585496&sct=18&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=scroll&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&epn.percent_scrolled=90&_et=3&tfd=4425".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
(anonymous) @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:915
(anonymous) @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:930
vn @ js?id=G-V1B8R98P79:448
Bp @ js?id=G-V1B8R98P79:468
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:662
gz @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:946
v @ js?id=G-V1B8R98P79:487
En @ js?id=G-V1B8R98P79:450
er @ js?id=G-V1B8R98P79:487
(anonymous) @ js?id=G-V1B8R98P79:491
(anonymous) @ js?id=G-V1B8R98P79:489
Wq @ js?id=G-V1B8R98P79:484
event @ js?id=G-V1B8R98P79:751
VD @ js?id=G-V1B8R98P79:757
(anonymous) @ js?id=G-V1B8R98P79:763
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
VectorStoreProvider.tsx:146 ⏭️ Skipping auto-init for /deep-research: {isInitialized: true, isInitializing: false, attemptedBefore: true, singletonInitialized: true}
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5860v898116370za200zd898116370&_p=1754586333207&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104573694~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&dt=DeepResearch-TimeCapsule&dl=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&sid=1754585496&sct=18&seg=1&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=research&ep.page_type=application&ep.pathname=%2Fdeep-research&ep.consent_analytics=true&ep.consent_functional=true&_et=177&tfd=4433".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
(anonymous) @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:915
(anonymous) @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:930
vn @ js?id=G-V1B8R98P79:448
Bp @ js?id=G-V1B8R98P79:468
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:662
gz @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:946
v @ js?id=G-V1B8R98P79:487
En @ js?id=G-V1B8R98P79:450
er @ js?id=G-V1B8R98P79:487
(anonymous) @ js?id=G-V1B8R98P79:491
(anonymous) @ js?id=G-V1B8R98P79:489
Wq @ js?id=G-V1B8R98P79:484
event @ js?id=G-V1B8R98P79:751
VD @ js?id=G-V1B8R98P79:757
(anonymous) @ js?id=G-V1B8R98P79:763
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
useDocuments.ts:72 📊 Document status updated: {documents: 2, totalSize: '1.5 MB', totalChunks: 20, totalVectors: 20, avgChunksPerDoc: '10.0', …}
EmbeddingService.ts:129 ✅ Model loaded successfully
EmbeddingService.ts:147 ✅ Model loaded from cache instantly
VectorStore.ts:1561 📊 Xenova progress: Embedding model ready (100%)
EmbeddingService.ts:156 ✅ EmbeddingService initialized successfully
VectorStore.ts:1567 ✅ Xenova embedding service ready
VectorStore.ts:1518 ✅ Immediate background download completed
VectorStore.ts:275 ✅ Xenova model loaded from cache - all features ready
VectorStore.ts:284 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5860v898116370za200zd898116370&_p=1754586333207&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104573694~104684208~104684211~104948813~105087538~105087540~105103161~105103163&sr=2240x1260&cid=2050444394.1754292465&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=5&sid=1754585496&sct=18&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-07T17%3A05%3A33.430Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x633&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&_et=3&tfd=9435".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
(anonymous) @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:915
useOllamaConnection.ts:278 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[connect] @ useOllamaConnection.ts:278
await in useOllamaConnection.useCallback[connect]
useOllamaConnection.useEffect.autoReconnect @ useOllamaConnection.ts:578
prompt-input.tsx:481 🔍 Submit context check: {enableRAG: true, webSearchEnabled: true, webSearchConfigured: true, hasRAGSearch: true, hasWebSearch: true}
prompt-input.tsx:502 🧠 Skipping initial RAG search for deep-research - Master Orchestrator will handle DataInspector magic filtering
prompt-input.tsx:507 🔍 Performing web search...
UnifiedWebSearchService.ts:78 🌐 Unified web search for: "give me the best project by Rutwik" with provider: firecrawl
UnifiedWebSearchService.ts:85 🔥 Performing Firecrawl search...
FirecrawlService.ts:103 🔥 Firecrawl service initialized successfully
FirecrawlService.ts:134 🔍 Searching web for: "give me the best project by Rutwik"
FirecrawlService.ts:149 🔍 Raw search results: 5 results found
FirecrawlService.ts:374 🌐 Scraping content from: https://www.rutwik.dev/
FirecrawlService.ts:137 XHR finished loading: POST "https://api.firecrawl.dev/v1/search".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
postRequest @ index.js:746
search @ index.js:171
searchWeb @ FirecrawlService.ts:137
await in searchWeb
searchWeb @ UnifiedWebSearchService.ts:86
useResearch.useCallback[performWebSearch] @ useResearch.ts:356
handleWebSearch @ DeepResearchApp.tsx:202
handleSubmitWithContext @ prompt-input.tsx:510
handleKeyDown @ prompt-input.tsx:471
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
FirecrawlService.ts:384 ❌ Failed to scrape https://www.rutwik.dev/
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
scrapeUrl @ FirecrawlService.ts:384
FirecrawlService.ts:215 ⚠️ Using search data only for: Rutwik Patel (https://www.rutwik.dev/)
FirecrawlService.ts:374 🌐 Scraping content from: https://www.rutvikbhatt.com/
FirecrawlService.ts:377 XHR finished loading: POST "https://api.firecrawl.dev/v1/scrape".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
await in searchWeb
searchWeb @ UnifiedWebSearchService.ts:86
useResearch.useCallback[performWebSearch] @ useResearch.ts:356
handleWebSearch @ DeepResearchApp.tsx:202
handleSubmitWithContext @ prompt-input.tsx:510
handleKeyDown @ prompt-input.tsx:471
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
FirecrawlService.ts:377  POST https://api.firecrawl.dev/v1/scrape 408 (Request Timeout)
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
FirecrawlService.ts:453 ❌ Scraping failed for https://www.rutvikbhatt.com/: Failed to scrape URL. Status code: 408. Error: Request timed out
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
scrapeUrl @ FirecrawlService.ts:453
FirecrawlService.ts:215 ⚠️ Using search data only for: Rutvik Bhatt - Technologist & Engineering Leader (https://www.rutvikbhatt.com/)
FirecrawlService.ts:174 ⚠️ Skipping scrape for unsupported domain: www.instagram.com
FirecrawlService.ts:215 ⚠️ Using search data only for: Managing this really special project for @kommuneity ... - Instagram (https://www.instagram.com/p/DAG0yk1SGN3/?hl=en)
FirecrawlService.ts:374 🌐 Scraping content from: https://blogs.perficient.com/author/rsurjuse/
FirecrawlService.ts:377 XHR failed loading: POST "https://api.firecrawl.dev/v1/scrape".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
FirecrawlService.ts:384 ❌ Failed to scrape https://blogs.perficient.com/author/rsurjuse/
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
scrapeUrl @ FirecrawlService.ts:384
FirecrawlService.ts:215 ⚠️ Using search data only for: Rutwik Surjuse, Author at Perficient Blogs (https://blogs.perficient.com/author/rsurjuse/)
FirecrawlService.ts:174 ⚠️ Skipping scrape for unsupported domain: www.facebook.com
FirecrawlService.ts:215 ⚠️ Using search data only for: Rutwik Pathare - Facebook (https://www.facebook.com/p/Rutwik-Pathare-100064193674431/)
FirecrawlService.ts:256 🌐 Web search completed in 2061ms: {query: 'give me the best project by Rutwik', resultsFound: 5, domains: Array(5), avgRelevance: '0.029', rawResults: 5}
UnifiedWebSearchService.ts:112 🔥 Firecrawl search completed: 5 results
UnifiedWebSearchService.ts:175 🌐 Unified web search completed in 24648ms: {query: 'give me the best project by Rutwik', resultsFound: 5, providers: Array(1), domains: Array(5), avgRelevance: '0.029'}avgRelevance: "0.029"domains: (5) ['www.rutwik.dev', 'www.instagram.com', 'blogs.perficient.com', 'www.facebook.com', 'www.rutvikbhatt.com']providers: ['firecrawl']query: "give me the best project by Rutwik"resultsFound: 5[[Prototype]]: Object
useResearch.ts:362 🌐 Web Search completed: 5 results found
useResearch.ts:938 🔬 Starting intelligent research for: "give me the best project by Rutwik"
ResearchOrchestrator.ts:104 🔬 Starting research for: "give me the best project by Rutwik"
ResearchOrchestrator.ts:110 🎯 DataInspector Architecture: Getting document metadata for intelligent filtering
ResearchOrchestrator.ts:114 📊 Retrieved 2 documents (20 total chunks) - DataInspector will sample and filter
ResearchOrchestrator.ts:1410 🧠 Master Orchestrator eligibility: RAG sources: true, Substantial content: true
ResearchOrchestrator.ts:138 🧠 MASTER ORCHESTRATOR: Bypassing traditional pipeline entirely - using intelligent tool orchestration
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:964 📋 Adding new step: master_orchestrator_1754586379015_1_6c0z3
ResearchOrchestrator.ts:1420 🧠 Master Orchestrator: Starting with intelligent document analysis for "give me the best project by Rutwik"
ResearchOrchestrator.ts:1421 📊 Found 2 sources for DataInspector magic filtering
AgentRegistry.ts:21 📝 Registered agent: QueryPlanner - Expands queries based on intent and domain understanding
AgentRegistry.ts:21 📝 Registered agent: DataInspector - Analyzes RAG chunks to understand data structure and quality
AgentRegistry.ts:21 📝 Registered agent: PlanningAgent - Creates intelligent execution strategies based on document analysis and query requirements
AgentRegistry.ts:21 📝 Registered agent: PatternGenerator - Creates extraction strategies based on data inspection
AgentRegistry.ts:21 📝 Registered agent: Extractor - Executes extraction using generated patterns
AgentRegistry.ts:21 📝 Registered agent: WebSearchAgent - Expands knowledge base using intelligent web search when local data is insufficient
AgentRegistry.ts:21 📝 Registered agent: Synthesizer - Consolidates extracted data into a coherent answer
ResearchOrchestrator.ts:1554 🧠 Calling Master Orchestrator.research() with 2 found sources for intelligent analysis
Orchestrator.ts:126 🧠 Master LLM Orchestrator starting for: "give me the best project by Rutwik"
Orchestrator.ts:154 🎯 Master LLM analyzing situation and planning tool calls...
Orchestrator.ts:162 🔄 Master LLM Iteration 1: Answer the user's query: "give me the best project by Rutwik"
FirecrawlService.ts:377 XHR finished loading: POST "https://api.firecrawl.dev/v1/scrape".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5860v898116370za200zd898116370&_p=1754586333207&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104573694~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=6&sid=1754585496&sct=18&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=45653&tfd=55091".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
(anonymous) @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:915
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:165
research @ Orchestrator.ts:137
executeMasterOrchestrator @ ResearchOrchestrator.ts:1555
executeResearch @ ResearchOrchestrator.ts:153
await in executeResearch
useResearch.useCallback[performIntelligentResearch] @ useResearch.ts:988
handleSubmit @ ResearchOutput.tsx:807
handleSubmitWithContext @ prompt-input.tsx:525
Orchestrator.ts:316 🧠 Master LLM Decision Response (609 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: The goal is to find the "best project by Rutwik". To do this, we need to analyze the available documents to identify those authored or related to Rutwik. DataInspector is the most appropriate tool to filter the documents based on this criteria.
NEXT_GOAAL: Analyze the 2 available documents to identify those authored or related to Rutwik.

ACTION: COMplete
REASONIING: DataInspector will return a filtered set of documents containing information...
Orchestrator.ts:534 🔍 PARSING DEBUG: Full response (609 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: The goal is to find the "best project by Rutwik". To do this, we need to analyze the available documents to identify those authored or related to Rutwik. DataInspector is the most appropriate tool to filter the documents based on this criteria.
NEXT_GOAAL: Analyze the 2 available documents to identify those authored or related to Rutwik.

ACTION: COMplete
REASONIING: DataInspector will return a filtered set of documents containing information about Rutwik's projects.
NEXT_GOAAL: Proceed to the next step, which is planning the execution strategy.




Orchestrator.ts:547 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:550 🎯 PARSED TOOL_NAME (FIRST): DataInspector
Orchestrator.ts:559 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:566 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataInspector
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataInspector', reasoning: 'Need to call DataInspector to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: DataInspector - Need to call DataInspector to progress toward the goal
Orchestrator.ts:683 🔍 PLAN-GUIDED VALIDATION: DataInspector
Orchestrator.ts:684 📋 Current agents called: []
Orchestrator.ts:685 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:999 ✅ Agent execution validated: DataInspector always allowed as first agent
Orchestrator.ts:1031 🔧 Executing tool: DataInspector (original: DataInspector)
ResearchOrchestrator.ts:1429 🚀 Master Orchestrator Agent started: DataInspector (DataInspector)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754586379015_1_6c0z3_in_progress
DataInspectorAgent.ts:49 🔎 DataInspector: Received document metadata - performing multi-document sampling and analysis
DataInspectorAgent.ts:1078 🧠 DataInspector Magic: Starting multi-document sampling and filtering
DataInspectorAgent.ts:1090 📋 Found 2 documents to analyze: (2) ['Rutwik_resume.pdf', 'www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf']
DataInspectorAgent.ts:1115 🔍 Analyzing 2 documents for relevance BEFORE sampling
DataInspectorAgent.ts:121 🔍 Multi-document analysis: 2 documents detected
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
performMultiDocumentAnalysis @ DataInspectorAgent.ts:161
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:1132
process @ DataInspectorAgent.ts:50
executeToolCall @ Orchestrator.ts:1042
masterLLMOrchestration @ Orchestrator.ts:194
DataInspectorAgent.ts:162 🤖 Multi-document analysis: Here's an analysis of the documents and a structured answer to the critical questions, following the provided rules and guidelines:

**1. DOCUMENT TYPES:**

*   **DOCUMENT 1 (Rutwik_resume.pdf):** Likely a Resume/CV. This is indicated by the filename and the fact that it's about Rutwik.
*   **DOCUME
DataInspectorAgent.ts:342 🧠 DataInspector analyzing 2 documents with pure LLM intelligence
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
analyzeDocumentIntelligently @ DataInspectorAgent.ts:460
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:353
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:275
performMultiDocumentAnalysis @ DataInspectorAgent.ts:165
DataInspectorAgent.ts:463 🧠 DataInspector Document 1 LLM Response: TYPE: Resume
ENTITY: Rutwik Shinde
RELLEVANT: YES
REASON: The document is titled "Rutwik_resume.pdf" and contains the name "Rutwik Shinde" in the document metadata. The query asks about "Rutwik's project," and the document is about Rutwik, making the document relevant to the query.
...
DataInspectorAgent.ts:617 🔧 DataInspector: Fixed typo "RELLEVANT" → "RELEVANT" for value: "YES"
DataInspectorAgent.ts:472 🔍 DataInspector Document 1 Parsed: {docType: 'Resume', primaryEntity: 'Rutwik Shinde', relevantText: 'YES', reasoning: 'The document is titled "Rutwik_resume.pdf" and con…s the name "Rutwik Shinde" in the document met...'}
DataInspectorAgent.ts:515 🔍 RELEVANCE DEBUG: Query person: "rutwik", Entity words: [rutwik, shinde]
DataInspectorAgent.ts:479 🔍 RELEVANCE ANALYSIS: Text="YES", Entity="Rutwik Shinde", Query="give me the best project by Rutwik" → Result: true
DataInspectorAgent.ts:355 🔍 Document 1 intelligent analysis: {docType: 'Resume', primaryEntity: 'Rutwik Shinde', isRelevant: true, reasoning: 'The document is titled "Rutwik_resume.pdf" and con…s the name "Rutwik Shinde" in the document met...'}
DataInspectorAgent.ts:364 ✅ Including relevant document: Resume (Rutwik Shinde)
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
discoverContentAreas @ DataInspectorAgent.ts:702
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:371
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
discoverEntitiesIntelligently @ DataInspectorAgent.ts:658
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:374
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
discoverDocumentRole @ DataInspectorAgent.ts:759
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:377
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
analyzeDocumentIntelligently @ DataInspectorAgent.ts:460
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:353
DataInspectorAgent.ts:463 🧠 DataInspector Document 2 LLM Response: TYPE: Worklog
ENTITY: Tyler Romero
RELEVANT: YES
REASON: The document title includes "Tyler Romero" and the file name suggests it's a worklog related to a project Tyler Romero worked on. The query asks about Rutwik's project, but the document is about Tyler Romero's work.
...
DataInspectorAgent.ts:472 🔍 DataInspector Document 2 Parsed: {docType: 'Worklog', primaryEntity: 'Tyler Romero', relevantText: 'YES', reasoning: `The document title includes "Tyler Romero" and the…e name suggests it's a worklog related to a pr...`}
DataInspectorAgent.ts:515 🔍 RELEVANCE DEBUG: Query person: "rutwik", Entity words: [tyler, romero]
DataInspectorAgent.ts:521 ⚠️ RELEVANCE OVERRIDE: LLM said YES but entity "Tyler Romero" doesn't match query person "rutwik"
overrideMethod @ hook.js:608
determineRelevance @ DataInspectorAgent.ts:521
analyzeDocumentIntelligently @ DataInspectorAgent.ts:477
DataInspectorAgent.ts:479 🔍 RELEVANCE ANALYSIS: Text="YES", Entity="Tyler Romero", Query="give me the best project by Rutwik" → Result: false
DataInspectorAgent.ts:355 🔍 Document 2 intelligent analysis: {docType: 'Worklog', primaryEntity: 'Tyler Romero', isRelevant: false, reasoning: `The document title includes "Tyler Romero" and the…e name suggests it's a worklog related to a pr...`}
DataInspectorAgent.ts:390 ⏭️ Skipping irrelevant document: Worklog (Tyler Romero) - The document title includes "Tyler Romero" and the...
DataInspectorAgent.ts:394 📊 Document filtering: 2 total → 1 relevant
DataInspectorAgent.ts:291 📋 Multi-Document Analysis: 1 documents with 0 relationships
DataInspectorAgent.ts:322 🚨 CROSS-CONTAMINATION PREVENTION: Filtered RAG chunks from 2 to 0 (removed 2 irrelevant chunks)
DataInspectorAgent.ts:1142 📊 Relevance analysis: 1 relevant out of 2 total documents
DataInspectorAgent.ts:1145 🔍 Sampling real chunks from 1 RELEVANT documents only
DataInspectorAgent.ts:1211 ✅ Sampled 2 real chunks from "Rutwik_resume.pdf" (2 total chunks)
DataInspectorAgent.ts:1166 ⏭️ Skipping chunk sampling for irrelevant document: www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf
DataInspectorAgent.ts:1246 ✅ Sampled chunks from 1 RELEVANT documents only
DataInspectorAgent.ts:1250 🔄 Replacing 0 document metadata with 2 relevant chunks (NO CONTAMINATION)
Orchestrator.ts:1046 ✅ Tool DataInspector completed in 105024ms
ResearchOrchestrator.ts:1501 ✅ Master Orchestrator Agent completed: DataInspector
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754586379015_1_6c0z3_in_progress
Orchestrator.ts:162 🔄 Master LLM Iteration 2: Answer the user's query: "give me the best project by Rutwik"
hot-reloader-client.js:197 [Fast Refresh] rebuilding
scheduler.development.js:14 [Violation] 'message' handler took 210ms
scheduler.development.js:14 [Violation] 'message' handler took 224ms
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754586329046:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/f245afb8e797ac15.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754586329046:1367
Promise.then
hotCheck @ webpack.js?v=1754586329046:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 403ms
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
webpack.js?v=1754586329046:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/0ac3db76f67eda29.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754586329046:1367
Promise.then
hotCheck @ webpack.js?v=1754586329046:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1356ms
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:165
Orchestrator.ts:316 🧠 Master LLM Decision Response (601 chars): To call a tool:
ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The goal is to find the "best project by Rutwik". We need a plan to efficiently analyze the available documents to identify relevant projects and determine which one is the "best". The PlanningAgent will create an execution strategy to guide the subsequent steps.
NEXT_GOAAL: Create an execution plan to find the best project by Rutwik.

To complete:
ACTION: COMplete
REASONING: The PlanningAgent will provide a plan. We need to e...
Orchestrator.ts:534 🔍 PARSING DEBUG: Full response (601 chars): To call a tool:
ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The goal is to find the "best project by Rutwik". We need a plan to efficiently analyze the available documents to identify relevant projects and determine which one is the "best". The PlanningAgent will create an execution strategy to guide the subsequent steps.
NEXT_GOAAL: Create an execution plan to find the best project by Rutwik.

To complete:
ACTION: COMplete
REASONING: The PlanningAgent will provide a plan. We need to execute this plan to find the best project.
NEXT_GOAL: Execute the plan created by the PlanningAgent.

Orchestrator.ts:547 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:550 🎯 PARSED TOOL_NAME (FIRST): PlanningAgent
Orchestrator.ts:559 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:566 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PlanningAgent
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PlanningAgent', reasoning: 'Need to call PlanningAgent to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: PlanningAgent - Need to call PlanningAgent to progress toward the goal
Orchestrator.ts:683 🔍 PLAN-GUIDED VALIDATION: PlanningAgent
Orchestrator.ts:684 📋 Current agents called: [DataInspector]
Orchestrator.ts:685 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:999 ✅ Agent execution validated: PlanningAgent execution is contextually appropriate
Orchestrator.ts:1031 🔧 Executing tool: PlanningAgent (original: PlanningAgent)
ResearchOrchestrator.ts:1429 🚀 Master Orchestrator Agent started: PlanningAgent (PlanningAgent)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754586379015_1_6c0z3_in_progress
PlanningAgent.ts:41 🎯 PlanningAgent: Creating intelligent execution strategy for "give me the best project by Rutwik"
PlanningAgent.ts:45 📊 Situation Analysis: {hasDocuments: true, documentCount: 2, hasDocumentAnalysis: true, relevantDocuments: 1, documentTypes: Array(1), …}
inpage.js:12 [Violation] 'setTimeout' handler took 51ms
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754586329046:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/a2069108446d666f.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754586329046:1367
Promise.then
hotCheck @ webpack.js?v=1754586329046:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 3101ms
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
hot-reloader-client.js:197 [Fast Refresh] rebuilding
scheduler.development.js:14 [Violation] 'message' handler took 241ms
webpack.js?v=1754586329046:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/7690c675b74913c0.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754586329046:1367
Promise.then
hotCheck @ webpack.js?v=1754586329046:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 3287ms
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
scheduler.development.js:14 [Violation] 'message' handler took 279ms
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
createExecutionPlan @ PlanningAgent.ts:143
process @ PlanningAgent.ts:48
executeToolCall @ Orchestrator.ts:1042
masterLLMOrchestration @ Orchestrator.ts:194
PlanningAgent.ts:249 🔄 PlanningAgent parsing attempt 1/4
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:319 🔧 Array element separation fixes applied
PlanningAgent.ts:269 ✅ Successfully parsed execution plan on attempt 1
PlanningAgent.ts:146 🎯 Generated execution plan: {strategy: 'The primary strategy is to extract relevant inform…ill be ranked based on the information extracted.', stepCount: 4, confidence: 0.9}
PlanningAgent.ts:60 ✅ Execution plan created: The primary strategy is to extract relevant information from the provided resume(s) and synthesize it into a structured response identifying the best project by Rutwik. If the initial extraction is insufficient, a web search will be employed to augment the data.  The synthesized output will be ranked based on the information extracted.
Orchestrator.ts:1046 ✅ Tool PlanningAgent completed in 48529ms
ResearchOrchestrator.ts:1501 ✅ Master Orchestrator Agent completed: PlanningAgent
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754586379015_1_6c0z3_in_progress
Orchestrator.ts:162 🔄 Master LLM Iteration 3: Answer the user's query: "give me the best project by Rutwik"
Orchestrator.ts:61 📋 Following execution plan: Next step is PatternGenerator - Generate regex patterns to extract relevant information from the resume documents (Name, Date, Author, File name, Content, Project titles, descriptions, and any other relevant details).
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:165
Orchestrator.ts:316 🧠 Master LLM Decision Response (325 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REASONING: The PlanningAgent has outlined the next step as generating regex patterns for data extraction. This is a crucial step to enable reliable data extraction from the documents.
NEXT_GOAAL: Generate regex patterns to extract relevant information from the resume documents.

Orchestrator.ts:534 🔍 PARSING DEBUG: Full response (325 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REASONING: The PlanningAgent has outlined the next step as generating regex patterns for data extraction. This is a crucial step to enable reliable data extraction from the documents.
NEXT_GOAAL: Generate regex patterns to extract relevant information from the resume documents.

Orchestrator.ts:547 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:550 🎯 PARSED TOOL_NAME (FIRST): PatternGenerator
Orchestrator.ts:559 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:566 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PatternGenerator
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PatternGenerator', reasoning: 'Need to call PatternGenerator to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: PatternGenerator - Need to call PatternGenerator to progress toward the goal
Orchestrator.ts:683 🔍 PLAN-GUIDED VALIDATION: PatternGenerator
Orchestrator.ts:684 📋 Current agents called: [DataInspector, PlanningAgent]
Orchestrator.ts:685 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:932 ✅ PatternGenerator validated against execution plan - prerequisites met
Orchestrator.ts:999 ✅ Agent execution validated: PatternGenerator execution follows planned sequence - step 1 of 4
Orchestrator.ts:1031 🔧 Executing tool: PatternGenerator (original: PatternGenerator)
ResearchOrchestrator.ts:1429 🚀 Master Orchestrator Agent started: PatternGenerator (PatternGenerator)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754586379015_1_6c0z3_in_progress
PatternGeneratorAgent.ts:24 🎯 PatternGenerator: Creating extraction strategies
PatternGeneratorAgent.ts:27 📋 DEBUG - Existing patterns before PatternGenerator: {count: 1, patterns: Array(1), hasSharedKnowledge: true}
PatternGeneratorAgent.ts:40 🧠 PatternGenerator: Generating dynamic regex patterns via LLM analysis
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
generateStrategiesWithLLM @ PatternGeneratorAgent.ts:67
process @ PatternGeneratorAgent.ts:34
executeToolCall @ Orchestrator.ts:1042
masterLLMOrchestration @ Orchestrator.ts:194
PatternGeneratorAgent.ts:68 🎯 LLM regex generation response: REGEX_PATTERNS:
- - /Rutwik/gi
- - /developed/gi
- - /frontend/gi
PatternGeneratorAgent.ts:425 🔍 Starting triple-tier pattern parsing from LLM response (65 chars)
PatternGeneratorAgent.ts:463 🔍 Found REGEX_PATTERNS section: "- - /Rutwik/gi
- - /developed/gi
- - /frontend/gi..."
PatternGeneratorAgent.ts:567 🧪 Normalizing pattern: "/Rutwik/gi"
PatternGeneratorAgent.ts:571 ✅ Already normalized: /Rutwik/gi
PatternGeneratorAgent.ts:567 🧪 Normalizing pattern: "/developed/gi"
PatternGeneratorAgent.ts:571 ✅ Already normalized: /developed/gi
PatternGeneratorAgent.ts:567 🧪 Normalizing pattern: "/frontend/gi"
PatternGeneratorAgent.ts:571 ✅ Already normalized: /frontend/gi
PatternGeneratorAgent.ts:430 ✅ Tier 1 SUCCESS: Found 3 patterns in structured format
PatternGeneratorAgent.ts:74 ✅ Generated 3 dynamic regex patterns: (3) ['/Rutwik/gi', '/developed/gi', '/frontend/gi']
PatternGeneratorAgent.ts:94 ✅ DEBUG - Patterns after PatternGenerator: {previousCount: 1, newCount: 3, totalCount: 4}
Orchestrator.ts:1046 ✅ Tool PatternGenerator completed in 5218ms
ResearchOrchestrator.ts:1501 ✅ Master Orchestrator Agent completed: PatternGenerator
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754586379015_1_6c0z3_in_progress
Orchestrator.ts:162 🔄 Master LLM Iteration 4: Answer the user's query: "give me the best project by Rutwik"
Orchestrator.ts:61 📋 Following execution plan: Next step is Extractor - Extract data from the resume documents using the generated regex patterns.
scheduler.development.js:14 [Violation] 'message' handler took 190ms
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:165
Orchestrator.ts:316 🧠 Master LLM Decision Response (281 chars): ACTION: CALL_TOOL
TOOL_NAME: Extractor
REAASONING: The PatternGenerator has created 4 regex patterns. The Extractor tool is needed to extract data from the resume documents using these patterns.
NEXT_GOAL: Extract data from the resume documents using the generated regex patterns.

Orchestrator.ts:534 🔍 PARSING DEBUG: Full response (281 chars): ACTION: CALL_TOOL
TOOL_NAME: Extractor
REAASONING: The PatternGenerator has created 4 regex patterns. The Extractor tool is needed to extract data from the resume documents using these patterns.
NEXT_GOAL: Extract data from the resume documents using the generated regex patterns.

Orchestrator.ts:547 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:550 🎯 PARSED TOOL_NAME (FIRST): Extractor
Orchestrator.ts:559 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:566 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=Extractor
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'Extractor', reasoning: 'Need to call Extractor to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: Extractor - Need to call Extractor to progress toward the goal
Orchestrator.ts:683 🔍 PLAN-GUIDED VALIDATION: Extractor
Orchestrator.ts:684 📋 Current agents called: [DataInspector, PlanningAgent, PatternGenerator]
Orchestrator.ts:685 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:932 ✅ Extractor validated against execution plan - prerequisites met
Orchestrator.ts:999 ✅ Agent execution validated: Extractor execution follows planned sequence - step 2 of 4
Orchestrator.ts:1031 🔧 Executing tool: Extractor (original: Extractor)
ResearchOrchestrator.ts:1429 🚀 Master Orchestrator Agent started: Extractor (Extractor)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754586379015_1_6c0z3_in_progress
ExtractionAgent.ts:28 ⛏️ Extractor: Processing 2 chunks
ExtractionAgent.ts:49 🔍 Pattern Analysis: 3 regex patterns, 1 descriptor patterns
ExtractionAgent.ts:52 🎯 Using REGEX MODE: Found 3 regex patterns from PatternGenerator
ExtractionAgent.ts:53 📋 Regex patterns: /Rutwik/gi, /developed/gi, /frontend/gi
ExtractionAgent.ts:790 🎯 Starting REGEX extraction with 3 patterns
ExtractionAgent.ts:796 📊 Processing 2 chunks with 3 regex patterns
ExtractionAgent.ts:801 🔍 Applying pattern: /Rutwik/gi
ExtractionAgent.ts:841 ✅ Pattern "/Rutwik/gi" found 4 matches
ExtractionAgent.ts:801 🔍 Applying pattern: /developed/gi
ExtractionAgent.ts:841 ✅ Pattern "/developed/gi" found 5 matches
ExtractionAgent.ts:801 🔍 Applying pattern: /frontend/gi
ExtractionAgent.ts:841 ✅ Pattern "/frontend/gi" found 1 matches
ExtractionAgent.ts:848 🎯 REGEX extraction complete: 10 items extracted
ExtractionAgent.ts:141 📊 Extraction Statistics:
ExtractionAgent.ts:142 - Total extracted: 10
ExtractionAgent.ts:143 - After deduplication: 3
ExtractionAgent.ts:144 - Items with time values: 0
ExtractionAgent.ts:145 - Table rows: 0
ExtractionAgent.ts:146 - Current records: 0
ExtractionAgent.ts:149 📈 Item types:
ExtractionAgent.ts:151   - unknown: 3
ExtractionAgent.ts:121 ✅ Extraction complete: 3 items found
Orchestrator.ts:1046 ✅ Tool Extractor completed in 2ms
ResearchOrchestrator.ts:1501 ✅ Master Orchestrator Agent completed: Extractor
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754586379015_1_6c0z3_in_progress
Orchestrator.ts:162 🔄 Master LLM Iteration 5: Answer the user's query: "give me the best project by Rutwik"
Orchestrator.ts:61 📋 Following execution plan: Next step is Synthesizer - Synthesize the extracted data to identify the best project by Rutwik. This involves analyzing the project descriptions, dates, and other relevant information to determine which project is the most significant or impactful.
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:165
Orchestrator.ts:316 🧠 Master LLM Decision Response (550 chars): ACTION: CALL_TOOL
TOOL_NAME: Synthesizer
REASONING: The current execution plan dictates that the next step is to synthesize the extracted data to identify the best project by Rutwik. This involves analyzing the project descriptions, dates, and other relevant information to determine which project is the most significant or impactful.
NEXT_GOAL: Synthesize the extracted data to identify the best project by Rutwik.

ACTION: COMplete
REASONING: The Syntheizer tool will perform the data synthesis.
N...
Orchestrator.ts:534 🔍 PARSING DEBUG: Full response (550 chars): ACTION: CALL_TOOL
TOOL_NAME: Synthesizer
REASONING: The current execution plan dictates that the next step is to synthesize the extracted data to identify the best project by Rutwik. This involves analyzing the project descriptions, dates, and other relevant information to determine which project is the most significant or impactful.
NEXT_GOAL: Synthesize the extracted data to identify the best project by Rutwik.

ACTION: COMplete
REASONING: The Syntheizer tool will perform the data synthesis.
NEXT_GOAL: Finalize the answer to the user's query.
Orchestrator.ts:547 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:550 🎯 PARSED TOOL_NAME (FIRST): Synthesizer
Orchestrator.ts:559 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:566 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=Synthesizer
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'Synthesizer', reasoning: 'Need to call Synthesizer to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: Synthesizer - Need to call Synthesizer to progress toward the goal
Orchestrator.ts:683 🔍 PLAN-GUIDED VALIDATION: Synthesizer
Orchestrator.ts:684 📋 Current agents called: [DataInspector, PlanningAgent, PatternGenerator, Extractor]
Orchestrator.ts:685 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:809 🎯 Validating Synthesizer prerequisites - checking data availability
Orchestrator.ts:811 📊 Has extracted data: true
Orchestrator.ts:932 ✅ Synthesizer validated against execution plan - prerequisites met
Orchestrator.ts:999 ✅ Agent execution validated: Synthesizer execution follows planned sequence - step 3 of 4
Orchestrator.ts:1031 🔧 Executing tool: Synthesizer (original: Synthesizer)
ResearchOrchestrator.ts:1429 🚀 Master Orchestrator Agent started: Synthesizer (Synthesizer)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754586379015_1_6c0z3_in_progress
SynthesisAgent.ts:62 📝 Synthesizer: Creating final answer from 3 items
SynthesisAgent.ts:63    Sources: 2 RAG chunks, 0 Web sources
SynthesisAgent.ts:67 ⏱️ Time-based items received: 0
SynthesisAgent.ts:1058 🧹 Starting content cleaning and deduplication for 3 items
SynthesisAgent.ts:1082 🧹 After content cleaning: 3 items (removed 0 malformed)
SynthesisAgent.ts:1133 🧹 After deduplication: 3 items (removed 0 duplicates)
SynthesisAgent.ts:100 🧹 After cleaning: 3 items remain
SynthesisAgent.ts:1318 📊 Found 0 table items out of 3 total
scheduler.development.js:14 [Violation] 'message' handler took 196ms
hot-reloader-client.js:197 [Fast Refresh] rebuilding
scheduler.development.js:14 [Violation] 'message' handler took 159ms
webpack.js?v=1754586329046:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/bd850b1da4c7ccdf.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754586329046:1367
Promise.then
hotCheck @ webpack.js?v=1754586329046:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 2437ms
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
inpage.js:12 [Violation] 'setTimeout' handler took 73ms
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
groupAndRankItems @ SynthesisAgent.ts:1348
process @ SynthesisAgent.ts:111
executeToolCall @ Orchestrator.ts:1042
masterLLMOrchestration @ Orchestrator.ts:194
SynthesisAgent.ts:1349 🤖 LLM grouping analysis: Okay, let's analyze the provided items and address the user query.

**Analysis of Items:**

1. **Distinct Entries:**
   * **Item 1: Developed:** This likely represents a stage of a project, a skill, o
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
classifyItemsWithLLM @ SynthesisAgent.ts:186
process @ SynthesisAgent.ts:114
SynthesisAgent.ts:187 🤖 LLM classification response: Okay, based on the provided items and the prompt "give me the best project by Rutwik," here's a breakdown of each item's category, with explanations focusing on understanding the document context:

**
deep-research:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1754586518559 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
scheduler.development.js:14 [Violation] 'message' handler took 241ms
scheduler.development.js:14 [Violation] 'message' handler took 182ms
scheduler.development.js:14 [Violation] 'message' handler took 235ms
deep-research:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1754586518559 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
generateSynthesisApproach @ SynthesisAgent.ts:575
createUniversalSynthesisPrompt @ SynthesisAgent.ts:491
createAdaptiveSynthesisPrompt @ SynthesisAgent.ts:347
createAdaptiveSynthesisPromptWithReasoning @ SynthesisAgent.ts:298
generateDeepResearchReportWithReasoning @ SynthesisAgent.ts:259
process @ SynthesisAgent.ts:117
responseCompletion.ts:40 🔄 Generation attempt 1 for prompt length: 12384
deep-research:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1754586518559 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
deep-research:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1754586518559 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
scheduler.development.js:14 [Violation] 'message' handler took 210ms
scheduler.development.js:14 [Violation] 'message' handler took 216ms
scheduler.development.js:14 [Violation] 'message' handler took 201ms
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
response.maxRetries @ SynthesisAgent.ts:264
generateWithCompletion @ responseCompletion.ts:47
generateDeepResearchReportWithReasoning @ SynthesisAgent.ts:262
SynthesisAgent.ts:276 🧹 Sanitized synthesis with reasoning: <reasoning>
My reasoning process involves a structured approach to analyze the provided multi-agent research summary and extracted data. I'll follow the outlined format template, ensuring each section
SynthesisAgent.ts:1556 🧹 CLEANING FINAL ANSWER: Input length 8498, has <think>: false, has <reasoning>: false
SynthesisAgent.ts:1600 🧹 CLEANED FINAL ANSWER: Output length 8496, preview: "## Executive Summary
Rutwik's research portfolio demonstrates a consistent focus on data analysis an..."
SynthesisAgent.ts:158 ✅ Synthesis complete: 8498 characters
Orchestrator.ts:1046 ✅ Tool Synthesizer completed in 326495ms
ResearchOrchestrator.ts:1501 ✅ Master Orchestrator Agent completed: Synthesizer
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754586379015_1_6c0z3_in_progress
Orchestrator.ts:162 🔄 Master LLM Iteration 6: Answer the user's query: "give me the best project by Rutwik"
Orchestrator.ts:61 📋 Following execution plan: Next step is WebSearchAgent - Perform a web search for 'Rutwik projects' or related keywords to gather additional information about Rutwik's projects that are not present in the provided documents.
Orchestrator.ts:316 🧠 Master LLM Decision Response (508 chars): ACTION: CALL_TOOL
TOOL_NAME: WebSearchAgent
REASONING: The current data is limited and doesn't provide a comprehensive view of Rutwik's projects. A web search for "Rutwik projects" or related keywords is needed to gather additional information and potentially reveal projects not explicitly mentioned in the provided documents.
NEXT_GOAAL: Perform a web search for 'Rutwik projects' or related keywords to gather additional information about Rutwik's projects that are not present in the provided doc...
Orchestrator.ts:534 🔍 PARSING DEBUG: Full response (508 chars): ACTION: CALL_TOOL
TOOL_NAME: WebSearchAgent
REASONING: The current data is limited and doesn't provide a comprehensive view of Rutwik's projects. A web search for "Rutwik projects" or related keywords is needed to gather additional information and potentially reveal projects not explicitly mentioned in the provided documents.
NEXT_GOAAL: Perform a web search for 'Rutwik projects' or related keywords to gather additional information about Rutwik's projects that are not present in the provided documents.

useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:165
Orchestrator.ts:547 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:550 🎯 PARSED TOOL_NAME (FIRST): WebSearchAgent
Orchestrator.ts:559 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:566 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=WebSearchAgent
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'WebSearchAgent', reasoning: 'Need to call WebSearchAgent to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: WebSearchAgent - Need to call WebSearchAgent to progress toward the goal
Orchestrator.ts:683 🔍 PLAN-GUIDED VALIDATION: WebSearchAgent
Orchestrator.ts:684 📋 Current agents called: [DataInspector, PlanningAgent, PatternGenerator, Extractor, Synthesizer]
Orchestrator.ts:685 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:867 📝 WebSearchAgent has no critical prerequisites
Orchestrator.ts:932 ✅ WebSearchAgent validated against execution plan - prerequisites met
Orchestrator.ts:999 ✅ Agent execution validated: WebSearchAgent execution follows planned sequence - step 4 of 4
Orchestrator.ts:1031 🔧 Executing tool: WebSearchAgent (original: WebSearchAgent)
ResearchOrchestrator.ts:1429 🚀 Master Orchestrator Agent started: WebSearchAgent (WebSearchAgent)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754586379015_1_6c0z3_in_progress
WebSearchAgent.ts:35 🌐 WebSearchAgent: Expanding knowledge base for "give me the best project by Rutwik"
WebSearchAgent.ts:45 🔍 Web search needed: Execution plan recommends web search
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
createSearchStrategy @ WebSearchAgent.ts:173
process @ WebSearchAgent.ts:48
executeToolCall @ Orchestrator.ts:1042
masterLLMOrchestration @ Orchestrator.ts:194
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:319 🔧 Array element separation fixes applied
WebSearchAgent.ts:176 🎯 Generated search strategy with 5 queries
WebSearchAgent.ts:49 📋 Search strategy: {searchQueries: Array(5), targetSites: Array(6), expectedContentTypes: Array(6), maxResults: 15, reasoning: "This strategy prioritizes direct searches for 'Rut…ion, including code, descriptions, and summaries."}
WebSearchAgent.ts:215 🔍 WebSearch executing 5 queries...
WebSearchAgent.ts:226 🌐 Executing Firecrawl search: "Rutwik projects"
FirecrawlService.ts:134 🔍 Searching web for: "Rutwik projects"
FirecrawlService.ts:149 🔍 Raw search results: 3 results found
FirecrawlService.ts:374 🌐 Scraping content from: https://www.rithwikprojects.com/
FirecrawlService.ts:137 XHR finished loading: POST "https://api.firecrawl.dev/v1/search".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
postRequest @ index.js:746
search @ index.js:171
searchWeb @ FirecrawlService.ts:137
executeWebSearch @ WebSearchAgent.ts:228
process @ WebSearchAgent.ts:52
FirecrawlService.ts:377  POST https://api.firecrawl.dev/v1/scrape 500 (Internal Server Error)
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
await in searchWeb
executeWebSearch @ WebSearchAgent.ts:228
process @ WebSearchAgent.ts:52
FirecrawlService.ts:453 ❌ Scraping failed for https://www.rithwikprojects.com/: Failed to scrape URL. Status code: 500. Error: (Internal server error) - Operation timed out
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
scrapeUrl @ FirecrawlService.ts:453
FirecrawlService.ts:215 ⚠️ Using search data only for: Rithwik Projects – Leading Infrastructure development Company (https://www.rithwikprojects.com/)
FirecrawlService.ts:174 ⚠️ Skipping scrape for unsupported domain: www.instagram.com
FirecrawlService.ts:215 ⚠️ Using search data only for: Rithwik Projects Private Limited (@rithwikprojectspvtltd) - Instagram (https://www.instagram.com/rithwikprojectspvtltd/?hl=en)
FirecrawlService.ts:174 ⚠️ Skipping scrape for unsupported domain: in.linkedin.com
FirecrawlService.ts:215 ⚠️ Using search data only for: Rithwik Projects Pvt Ltd. - LinkedIn (https://in.linkedin.com/company/rithwik-projects-pvt-ltd-)
FirecrawlService.ts:256 🌐 Web search completed in 1990ms: {query: 'Rutwik projects', resultsFound: 3, domains: Array(3), avgRelevance: '0.067', rawResults: 3}
WebSearchAgent.ts:257 ✅ Found 3 results for "Rutwik projects"
WebSearchAgent.ts:226 🌐 Executing Firecrawl search: "Rutwik portfolio"
FirecrawlService.ts:134 🔍 Searching web for: "Rutwik portfolio"
FirecrawlService.ts:377 XHR failed loading: POST "https://api.firecrawl.dev/v1/scrape".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
await in searchWeb
executeWebSearch @ WebSearchAgent.ts:228
process @ WebSearchAgent.ts:52
scheduler.development.js:14 [Violation] 'message' handler took 318ms
FirecrawlService.ts:149 🔍 Raw search results: 3 results found
FirecrawlService.ts:374 🌐 Scraping content from: https://rutwikk.com/
FirecrawlService.ts:137 XHR finished loading: POST "https://api.firecrawl.dev/v1/search".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
postRequest @ index.js:746
search @ index.js:171
searchWeb @ FirecrawlService.ts:137
executeWebSearch @ WebSearchAgent.ts:228
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
FirecrawlService.ts:377  POST https://api.firecrawl.dev/v1/scrape 408 (Request Timeout)
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
await in searchWeb
executeWebSearch @ WebSearchAgent.ts:228
FirecrawlService.ts:453 ❌ Scraping failed for https://rutwikk.com/: Failed to scrape URL. Status code: 408. Error: Request timed out
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
scrapeUrl @ FirecrawlService.ts:453
FirecrawlService.ts:215 ⚠️ Using search data only for: Rutwik's Portfolio (https://rutwikk.com/)
FirecrawlService.ts:374 🌐 Scraping content from: https://www.rutwikpatel.com/
FirecrawlService.ts:377 XHR failed loading: POST "https://api.firecrawl.dev/v1/scrape".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
await in searchWeb
executeWebSearch @ WebSearchAgent.ts:228
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
FirecrawlService.ts:377  POST https://api.firecrawl.dev/v1/scrape 500 (Internal Server Error)
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
FirecrawlService.ts:453 ❌ Scraping failed for https://www.rutwikpatel.com/: Failed to scrape URL. Status code: 500. Error: (Internal server error) - Operation timed out
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
scrapeUrl @ FirecrawlService.ts:453
FirecrawlService.ts:215 ⚠️ Using search data only for: Rutwik Portfolio (https://www.rutwikpatel.com/)
FirecrawlService.ts:374 🌐 Scraping content from: https://rutvikjoglekar.github.io/
FirecrawlService.ts:377 XHR failed loading: POST "https://api.firecrawl.dev/v1/scrape".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
FirecrawlService.ts:377  POST https://api.firecrawl.dev/v1/scrape 500 (Internal Server Error)
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
FirecrawlService.ts:453 ❌ Scraping failed for https://rutvikjoglekar.github.io/: Failed to scrape URL. Status code: 500. Error: (Internal server error) - Operation timed out
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
scrapeUrl @ FirecrawlService.ts:453
FirecrawlService.ts:215 ⚠️ Using search data only for: Rutvik's portfolio (https://rutvikjoglekar.github.io/)
FirecrawlService.ts:256 🌐 Web search completed in 1322ms: {query: 'Rutwik portfolio', resultsFound: 3, domains: Array(3), avgRelevance: '0.017', rawResults: 3}
WebSearchAgent.ts:257 ✅ Found 3 results for "Rutwik portfolio"
WebSearchAgent.ts:226 🌐 Executing Firecrawl search: "Rutwik GitHub"
FirecrawlService.ts:134 🔍 Searching web for: "Rutwik GitHub"
FirecrawlService.ts:377 XHR failed loading: POST "https://api.firecrawl.dev/v1/scrape".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
FirecrawlService.ts:149 🔍 Raw search results: 3 results found
FirecrawlService.ts:176 ⚠️ Rate-limited domain github.com, attempting with caution
FirecrawlService.ts:374 🌐 Scraping content from: https://github.com/rutwik-kumbhar
FirecrawlService.ts:137 XHR finished loading: POST "https://api.firecrawl.dev/v1/search".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
postRequest @ index.js:746
search @ index.js:171
searchWeb @ FirecrawlService.ts:137
executeWebSearch @ WebSearchAgent.ts:228
FirecrawlService.ts:384 ❌ Failed to scrape https://github.com/rutwik-kumbhar
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
scrapeUrl @ FirecrawlService.ts:384
FirecrawlService.ts:215 ⚠️ Using search data only for: rutwik-kumbhar (https://github.com/rutwik-kumbhar)
FirecrawlService.ts:176 ⚠️ Rate-limited domain github.com, attempting with caution
FirecrawlService.ts:374 🌐 Scraping content from: https://github.com/Rutwik1000
FirecrawlService.ts:377 XHR finished loading: POST "https://api.firecrawl.dev/v1/scrape".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:178
await in searchWeb
executeWebSearch @ WebSearchAgent.ts:228
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
FirecrawlService.ts:384 ❌ Failed to scrape https://github.com/Rutwik1000
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
scrapeUrl @ FirecrawlService.ts:384
FirecrawlService.ts:215 ⚠️ Using search data only for: Rutwik Ingale Rutwik1000 (https://github.com/Rutwik1000)
FirecrawlService.ts:176 ⚠️ Rate-limited domain github.com, attempting with caution
FirecrawlService.ts:374 🌐 Scraping content from: https://github.com/Ru7w1k
FirecrawlService.ts:377 XHR finished loading: POST "https://api.firecrawl.dev/v1/scrape".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:178
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
FirecrawlService.ts:384 ❌ Failed to scrape https://github.com/Ru7w1k
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
scrapeUrl @ FirecrawlService.ts:384
FirecrawlService.ts:215 ⚠️ Using search data only for: Rutwik Choughule Ru7w1k (https://github.com/Ru7w1k)
FirecrawlService.ts:256 🌐 Web search completed in 1536ms: {query: 'Rutwik GitHub', resultsFound: 3, domains: Array(1), avgRelevance: '0.017', rawResults: 3}
WebSearchAgent.ts:257 ✅ Found 3 results for "Rutwik GitHub"
WebSearchAgent.ts:226 🌐 Executing Firecrawl search: "Rutwik best project"
FirecrawlService.ts:134 🔍 Searching web for: "Rutwik best project"
FirecrawlService.ts:377 XHR finished loading: POST "https://api.firecrawl.dev/v1/scrape".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:178
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
FirecrawlService.ts:149 🔍 Raw search results: 3 results found
FirecrawlService.ts:174 ⚠️ Skipping scrape for unsupported domain: www.instagram.com
FirecrawlService.ts:215 ⚠️ Using search data only for: Rutwik Deshpande | Managing this really special project for @ ... (https://www.instagram.com/rutwicked/p/DAG0yk1SGN3/?locale=us&hl=am-et)
FirecrawlService.ts:174 ⚠️ Skipping scrape for unsupported domain: www.linkedin.com
FirecrawlService.ts:215 ⚠️ Using search data only for: Rutwik Rath - The Home Depot (https://www.linkedin.com/in/rutwikrath)
FirecrawlService.ts:374 🌐 Scraping content from: https://www.rutwikdev.com/
FirecrawlService.ts:137 XHR finished loading: POST "https://api.firecrawl.dev/v1/search".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
postRequest @ index.js:746
search @ index.js:171
searchWeb @ FirecrawlService.ts:137
executeWebSearch @ WebSearchAgent.ts:228
FirecrawlService.ts:384 ❌ Failed to scrape https://www.rutwikdev.com/
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
scrapeUrl @ FirecrawlService.ts:384
FirecrawlService.ts:215 ⚠️ Using search data only for: Rutwik Butani - Full Stack Developer (https://www.rutwikdev.com/)
FirecrawlService.ts:256 🌐 Web search completed in 1385ms: {query: 'Rutwik best project', resultsFound: 3, domains: Array(3), avgRelevance: '0.022', rawResults: 3}
WebSearchAgent.ts:257 ✅ Found 3 results for "Rutwik best project"
WebSearchAgent.ts:226 🌐 Executing Firecrawl search: "Rutwik [project area, e.g., machine learning, web development] projects"
FirecrawlService.ts:134 🔍 Searching web for: "Rutwik [project area, e.g., machine learning, web development] projects"
FirecrawlService.ts:377 XHR finished loading: POST "https://api.firecrawl.dev/v1/scrape".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
await in searchWeb
executeWebSearch @ WebSearchAgent.ts:228
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
FirecrawlService.ts:149 🔍 Raw search results: 3 results found
FirecrawlService.ts:174 ⚠️ Skipping scrape for unsupported domain: www.linkedin.com
FirecrawlService.ts:218 ❌ Failed to process https://www.linkedin.com/posts/rutwik-kute_throwback-internshipexperience-projectengineer-activity-7286947108811661313-DkBg: Invalid regular expression: /[project/g: Unterminated character class
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
searchWeb @ FirecrawlService.ts:218
await in searchWeb
executeWebSearch @ WebSearchAgent.ts:228
FirecrawlService.ts:174 ⚠️ Skipping scrape for unsupported domain: www.linkedin.com
FirecrawlService.ts:218 ❌ Failed to process https://www.linkedin.com/posts/rutvik-jathar-17a36b294_nlp-chatbot-machinelearning-activity-7221501426336747520-6GAK: Invalid regular expression: /[project/g: Unterminated character class
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
searchWeb @ FirecrawlService.ts:218
await in searchWeb
executeWebSearch @ WebSearchAgent.ts:228
FirecrawlService.ts:374 🌐 Scraping content from: https://www.geeksforgeeks.org/web-development-projects/
FirecrawlService.ts:137 XHR finished loading: POST "https://api.firecrawl.dev/v1/search".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
postRequest @ index.js:746
search @ index.js:171
searchWeb @ FirecrawlService.ts:137
executeWebSearch @ WebSearchAgent.ts:228
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
FirecrawlService.ts:384 ❌ Failed to scrape https://www.geeksforgeeks.org/web-development-projects/
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
scrapeUrl @ FirecrawlService.ts:384
FirecrawlService.ts:218 ❌ Failed to process https://www.geeksforgeeks.org/web-development-projects/: Invalid regular expression: /[project/g: Unterminated character class
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
searchWeb @ FirecrawlService.ts:218
FirecrawlService.ts:256 🌐 Web search completed in 1346ms: {query: 'Rutwik [project area, e.g., machine learning, web ...', resultsFound: 0, domains: Array(2), avgRelevance: '0.000', rawResults: 3}
WebSearchAgent.ts:257 ✅ Found 0 results for "Rutwik [project area, e.g., machine learning, web development] projects"
WebSearchAgent.ts:264 🌐 Web search completed: 12 web chunks added
WebSearchAgent.ts:74 ✅ Web search completed: 12 new sources added
Orchestrator.ts:1046 ✅ Tool WebSearchAgent completed in 95203ms
ResearchOrchestrator.ts:1501 ✅ Master Orchestrator Agent completed: WebSearchAgent
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754586379015_1_6c0z3
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754586379015_1_6c0z3_in_progress
Orchestrator.ts:162 🔄 Master LLM Iteration 7: Answer the user's query: "give me the best project by Rutwik"
FirecrawlService.ts:377 XHR finished loading: POST "https://api.firecrawl.dev/v1/scrape".
dispatchXhrRequest @ xhr.js:209
xhr @ xhr.js:29
dispatchRequest @ dispatchRequest.js:61
_request @ Axios.js:199
request @ Axios.js:52
httpMethod @ Axios.js:238
wrap @ bind.js:9
scrapeUrl @ index.js:105
scrapeUrl @ FirecrawlService.ts:377
searchWeb @ FirecrawlService.ts:181
await in searchWeb
executeWebSearch @ WebSearchAgent.ts:228
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
stack-frame.js:78 Fetch finished loading: POST "http://localhost:3000/__nextjs_original-stack-frames".
getOriginalStackFrames @ stack-frame.js:78
eval @ get-error-by-type.js:63
createMemoizedPromise @ get-error-by-type.js:96
getErrorByType @ get-error-by-type.js:62
eval @ render-error.js:78
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
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:165
Orchestrator.ts:316 🧠 Master LLM Decision Response (651 chars): ACTION: CALL_TOOL
TOOL_NAME: WebSearchAgent
REAASONING: The current data extracted and analyzed might not contain information about the "best project" by Rutwik. WebSearchAgent can expand the knowledge base by searching for relevant information online, such as articles, interviews, or project repositories related to Rutwik's work.
NEXT_GOAL: Find information about Rutwik's best project through web search.

ACTION: COMplete
REASONING: The WebSearchAgent will provide information about Rutwik's pro...
Orchestrator.ts:534 🔍 PARSING DEBUG: Full response (651 chars): ACTION: CALL_TOOL
TOOL_NAME: WebSearchAgent
REAASONING: The current data extracted and analyzed might not contain information about the "best project" by Rutwik. WebSearchAgent can expand the knowledge base by searching for relevant information online, such as articles, interviews, or project repositories related to Rutwik's work.
NEXT_GOAL: Find information about Rutwik's best project through web search.

ACTION: COMplete
REASONING: The WebSearchAgent will provide information about Rutwik's projects. The Synthiesizer will then be used to synthesize the information and provide the final answer.
NEXT_GOAL: Provide the final answer to the user.

Orchestrator.ts:547 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:550 🎯 PARSED TOOL_NAME (FIRST): WebSearchAgent
Orchestrator.ts:559 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:566 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=WebSearchAgent
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'WebSearchAgent', reasoning: 'Need to call WebSearchAgent to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: WebSearchAgent - Need to call WebSearchAgent to progress toward the goal
Orchestrator.ts:683 🔍 PLAN-GUIDED VALIDATION: WebSearchAgent
Orchestrator.ts:684 📋 Current agents called: [DataInspector, PlanningAgent, PatternGenerator, Extractor, Synthesizer, WebSearchAgent]
Orchestrator.ts:685 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:867 📝 WebSearchAgent has no critical prerequisites
Orchestrator.ts:932 ✅ WebSearchAgent validated against execution plan - prerequisites met
Orchestrator.ts:999 ✅ Agent execution validated: WebSearchAgent execution follows planned sequence - step 4 of 4
Orchestrator.ts:1026 ⚠️ Agent WebSearchAgent already called, skipping to prevent redundant processing
overrideMethod @ hook.js:608
executeToolCall @ Orchestrator.ts:1026
masterLLMOrchestration @ Orchestrator.ts:194
Orchestrator.ts:162 🔄 Master LLM Iteration 8: Answer the user's query: "give me the best project by Rutwik"
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:165
Orchestrator.ts:316 🧠 Master LLM Decision Response (776 chars): ACTION: CALL_TOOL
TOOL_NAME: WebSearchAgent
REAASONING: The current data includes 14 chunks, but the goal is to find the "best project by Rutwik." This requires external information beyond the provided documents. WebSearchAgent can be used to search for publicly available information about Rutwik's projects, such as websites, articles, or repositories, to determine which project is considered the "best."
NEXT_GOAL: Find publicly available information about Rutwik's projects to identify the "best...
Orchestrator.ts:534 🔍 PARSING DEBUG: Full response (776 chars): ACTION: CALL_TOOL
TOOL_NAME: WebSearchAgent
REAASONING: The current data includes 14 chunks, but the goal is to find the "best project by Rutwik." This requires external information beyond the provided documents. WebSearchAgent can be used to search for publicly available information about Rutwik's projects, such as websites, articles, or repositories, to determine which project is considered the "best."
NEXT_GOAL: Find publicly available information about Rutwik's projects to identify the "best" one.

ACTION: COMplete
REASONING: The WebSearchAgent will provide external data. The Synthesizer will then be used to synthesize the information and provide a final answer to the user.
NEXT_GOAL: Synthesize the information from the WebSearchAgent to provide a final answer.

Orchestrator.ts:547 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:550 🎯 PARSED TOOL_NAME (FIRST): WebSearchAgent
Orchestrator.ts:559 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:566 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=WebSearchAgent
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'WebSearchAgent', reasoning: 'Need to call WebSearchAgent to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: WebSearchAgent - Need to call WebSearchAgent to progress toward the goal
Orchestrator.ts:683 🔍 PLAN-GUIDED VALIDATION: WebSearchAgent
Orchestrator.ts:684 📋 Current agents called: [DataInspector, PlanningAgent, PatternGenerator, Extractor, Synthesizer, WebSearchAgent]
Orchestrator.ts:685 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:867 📝 WebSearchAgent has no critical prerequisites
Orchestrator.ts:932 ✅ WebSearchAgent validated against execution plan - prerequisites met
Orchestrator.ts:999 ✅ Agent execution validated: WebSearchAgent execution follows planned sequence - step 4 of 4
Orchestrator.ts:1026 ⚠️ Agent WebSearchAgent already called, skipping to prevent redundant processing
overrideMethod @ hook.js:608
executeToolCall @ Orchestrator.ts:1026
masterLLMOrchestration @ Orchestrator.ts:194
Orchestrator.ts:162 🔄 Master LLM Iteration 9: Answer the user's query: "give me the best project by Rutwik"
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:165
Orchestrator.ts:316 🧠 Master LLM Decision Response (314 chars): ACTION: CALL_TOOL
TOOL_NAME: WebSearchAgent
REAASONING: The current data includes 14 chunks, but we need to determine the "best project" by Rutwik. This requires external information about Rutwik's projects, which is best obtained through a web search.
NEXT_GOAL: Find information about Rutwik's projects online.


Orchestrator.ts:534 🔍 PARSING DEBUG: Full response (314 chars): ACTION: CALL_TOOL
TOOL_NAME: WebSearchAgent
REAASONING: The current data includes 14 chunks, but we need to determine the "best project" by Rutwik. This requires external information about Rutwik's projects, which is best obtained through a web search.
NEXT_GOAL: Find information about Rutwik's projects online.


Orchestrator.ts:547 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:550 🎯 PARSED TOOL_NAME (FIRST): WebSearchAgent
Orchestrator.ts:559 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:566 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=WebSearchAgent
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'WebSearchAgent', reasoning: 'Need to call WebSearchAgent to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: WebSearchAgent - Need to call WebSearchAgent to progress toward the goal
Orchestrator.ts:683 🔍 PLAN-GUIDED VALIDATION: WebSearchAgent
Orchestrator.ts:684 📋 Current agents called: [DataInspector, PlanningAgent, PatternGenerator, Extractor, Synthesizer, WebSearchAgent]
Orchestrator.ts:685 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:867 📝 WebSearchAgent has no critical prerequisites
Orchestrator.ts:932 ✅ WebSearchAgent validated against execution plan - prerequisites met
Orchestrator.ts:999 ✅ Agent execution validated: WebSearchAgent execution follows planned sequence - step 4 of 4
Orchestrator.ts:1026 ⚠️ Agent WebSearchAgent already called, skipping to prevent redundant processing
overrideMethod @ hook.js:608
executeToolCall @ Orchestrator.ts:1026
masterLLMOrchestration @ Orchestrator.ts:194
Orchestrator.ts:162 🔄 Master LLM Iteration 10: Answer the user's query: "give me the best project by Rutwik"
Orchestrator.ts:316 🧠 Master LLM Decision Response (695 chars): ACTION: CALL_TOOL
TOOL_NAME: WebSearchAgent
REAASONING: The goal is to find the "best project by Rutwik". The current data includes extracted data and patterns, but it doesn't directly provide a list of Rutwik's projects or a ranking of them. WebSearchAgent can be used to search for information about Rutwik's projects online, potentially yielding a list or ranking that can be used to formulate a response.
NEXT_GOAL: Retrieve a list or ranked list of Rutwik's projects from the web.

ACTION: COMpl...
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:165
Orchestrator.ts:534 🔍 PARSING DEBUG: Full response (695 chars): ACTION: CALL_TOOL
TOOL_NAME: WebSearchAgent
REAASONING: The goal is to find the "best project by Rutwik". The current data includes extracted data and patterns, but it doesn't directly provide a list of Rutwik's projects or a ranking of them. WebSearchAgent can be used to search for information about Rutwik's projects online, potentially yielding a list or ranking that can be used to formulate a response.
NEXT_GOAL: Retrieve a list or ranked list of Rutwik's projects from the web.

ACTION: COMplete
REASONING: The WebSearchAgent will return data that needs to be processed and synthesized.
NEXT_GOAL: Synthesize the retrieved data into a coherent and informative answer to the user's query.
Orchestrator.ts:547 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:550 🎯 PARSED TOOL_NAME (FIRST): WebSearchAgent
Orchestrator.ts:559 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:566 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=WebSearchAgent
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'WebSearchAgent', reasoning: 'Need to call WebSearchAgent to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: WebSearchAgent - Need to call WebSearchAgent to progress toward the goal
Orchestrator.ts:683 🔍 PLAN-GUIDED VALIDATION: WebSearchAgent
Orchestrator.ts:684 📋 Current agents called: [DataInspector, PlanningAgent, PatternGenerator, Extractor, Synthesizer, WebSearchAgent]
Orchestrator.ts:685 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:867 📝 WebSearchAgent has no critical prerequisites
Orchestrator.ts:932 ✅ WebSearchAgent validated against execution plan - prerequisites met
 ✅ Agent execution validated: WebSearchAgent execution follows planned sequence - step 4 of 4
 ⚠️ Agent WebSearchAgent already called, skipping to prevent redundant processing
overrideMethod @ installHook.js:1
executeToolCall @ webpack-internal:///…Orchestrator.ts:818
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:132
 ⚠️ Master LLM reached maximum iterations (10)
overrideMethod @ installHook.js:1
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:150
 📝 Master Orchestrator final result: {hasAnswer: true, answerLength: 8496, preview: "## Executive Summary\nRutwik's research portfolio demonstrates a consistent focus on data analysis an"}
 ✅ Master Orchestrator generated answer with 6 agent calls
 📋 Step update: synthesis - completed - ID: master_orchestrator_1754586379015_1_6c0z3
 📋 Adding new step: master_orchestrator_1754586379015_1_6c0z3
 🚫 Preventing duplicate step addition: master_orchestrator_1754586379015_1_6c0z3
 ✅ Intelligent research completed: {steps: 1, sources: 2, confidence: 1, processingTime: 739739}
 🚫 Preventing duplicate step addition: master_orchestrator_1754586379015_1_6c0z3
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 397ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 167ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 264ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 152ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 159ms
deep-research:1 Uncaught (in promise) 
deep-research:1 Uncaught (in promise) 
deep-research:1 Uncaught (in promise) 
deep-research:1 Uncaught (in promise) 
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 174ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 173ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 159ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 172ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 156ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 198ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 209ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 179ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 175ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 179ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 178ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 178ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 167ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 175ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 175ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 173ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 170ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 168ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 180ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 173ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 165ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 164ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 159ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 151ms
deep-research:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1754586518559 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
deep-research:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1754586518559 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 201ms
