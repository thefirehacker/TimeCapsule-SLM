 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5811v898116370za200zd898116370&_p=1754407021036&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=9&sid=1754405068&sct=10&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2F&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&_et=263278&tfd=1020687".
Yc @ js:241
zm @ js:430
dN @ js:910
k.flush @ js:918
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
options.factory @ webpack.js?v=1754408033322:712
__webpack_require__ @ webpack.js?v=1754408033322:37
fn @ webpack.js?v=1754408033322:369
eval @ Analytics.tsx:10
(app-pages-browser)/./src/components/analytics/Analytics.tsx @ layout.js:7820
options.factory @ webpack.js?v=1754408033322:712
__webpack_require__ @ webpack.js?v=1754408033322:37
fn @ webpack.js?v=1754408033322:369
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
options.factory @ webpack.js?v=1754408033322:712
__webpack_require__ @ webpack.js?v=1754408033322:37
fn @ webpack.js?v=1754408033322:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7842
options.factory @ webpack.js?v=1754408033322:712
__webpack_require__ @ webpack.js?v=1754408033322:37
fn @ webpack.js?v=1754408033322:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false!:11
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false! @ layout.js:4998
options.factory @ webpack.js?v=1754408033322:712
__webpack_require__ @ webpack.js?v=1754408033322:37
__webpack_exec__ @ layout.js:8073
(anonymous) @ layout.js:8074
__webpack_require__.O @ webpack.js?v=1754408033322:84
(anonymous) @ layout.js:8075
webpackJsonpCallback @ webpack.js?v=1754408033322:1388
(anonymous) @ layout.js:9
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.168401754793, longitude: 72.84651895917412, …}
useOllamaConnection.ts:67 📝 Loading saved Ollama config: {baseURL: 'http://localhost:11434', selectedModel: 'qwen3:0.6b', lastConnected: '2025-08-05T15:17:10.736Z', version: '1.0'}
EmbeddingService.ts:35 🧠 Xenova environment configured for CDN loading
VectorStoreProvider.tsx:143 🚀 Auto-initializing VectorStore for route: /deep-research
VectorStoreProvider.tsx:79 🚀 VectorStoreProvider: Creating new singleton VectorStore...
RAGTracker.ts:26 🔍 RAG Tracker initialized with config: {enableTracking: true, enableVisualization: true, enablePerformanceMetrics: true, enableQualityMetrics: false, maxQueryHistory: 1000, …}
VectorStore.ts:178 🗂️ VectorStore constructor called
VectorStore.ts:179 🔍 RAG Tracker initialized for VectorStore
VectorStore.ts:240 🗂️ Initializing RxDB Vector Store...
VectorStore.ts:243 🤖 Loading document processor and starting immediate Xenova download...
DocumentProcessor.ts:61 🔧 DocumentProcessor constructor called (new architecture)
VectorStore.ts:247 🧠 Starting immediate background Xenova download...
VectorStore.ts:1471 🧠 Starting immediate Xenova download in background...
VectorStore.ts:1488 🔄 Initializing web worker (attempt 1/3)...
DocumentProcessor.ts:72 🔧 Initializing DocumentProcessor with immediate download architecture...
DocumentProcessor.ts:95 🔧 Initializing text processing worker...
VectorStore.ts:293 📚 Creating RxDB database...
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
scheduler.development.js:14 [Violation] 'message' handler took 336ms
hook.js:608 -------------- RxDB Open Core RxStorage -------------------------------
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
VectorStore.ts:307 📄 Creating documents collection...
Analytics.tsx:39 ⏳ Analytics: Skipping page tracking - no consent or not initialized
embeddingWorker.js:231 🔧 Text processing worker loaded successfully
embeddingWorker.js:59 🔧 Initializing text processing worker...
embeddingWorker.js:73 ✅ Text processing worker initialized successfully
DocumentProcessor.ts:116 ✅ Text processing worker ready
DocumentProcessor.ts:125 ✅ DocumentProcessor initialization complete (embeddings will load when needed)
VectorStore.ts:1490 ✅ Web worker initialized successfully
VectorStore.ts:1508 🧠 Starting Xenova embedding service download...
EmbeddingService.ts:69 🧠 Starting Xenova embedding service initialization...
EmbeddingService.ts:77 ✅ Loading model (checking cache)...
EmbeddingService.ts:84 📦 Loading Xenova/all-MiniLM-L6-v2 model from Hugging Face CDN...
useOllamaConnection.ts:616 🔄 Attempting auto-reconnection...
useOllamaConnection.ts:207 🔌 Starting Ollama connection process... {baseURL: 'http://localhost:11434', model: 'qwen3:0.6b'}
useOllamaConnection.ts:125 🔍 Testing Ollama connection at: http://localhost:11434
VectorStore.ts:371 ✅ RxDB Vector Store initialized successfully
VectorStore.ts:372 🧠 Xenova download running in background...
VectorStoreProvider.tsx:85 ✅ VectorStoreProvider: Singleton VectorStore initialized successfully
useOllamaConnection.ts:140 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ useOllamaConnection.ts:140
useOllamaConnection.useCallback[connect] @ useOllamaConnection.ts:223
useOllamaConnection.useEffect.autoReconnect @ useOllamaConnection.ts:623
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
initializeXenovaService @ VectorStore.ts:1516
startImmediateBackgroundDownload @ VectorStore.ts:1477
VectorStoreProvider.tsx:146 ⏭️ Skipping auto-init for /deep-research: {isInitialized: true, isInitializing: false, attemptedBefore: true, singletonInitialized: true}
useOllamaConnection.ts:167 ✅ Ollama connection test passed, models: (4) ['tinyllama:1.1b', 'qwen3:0.6b', 'llama3.2:1b', 'llama3.1:8b']
useOllamaConnection.ts:242 🤖 Creating Ollama client... {baseURL: 'http://localhost:11434', selectedModel: 'qwen3:0.6b'}
useOllamaConnection.ts:266 ✅ Ollama client created successfully
useOllamaConnection.ts:270 🧪 Testing content generation...
analytics.ts:305 ✅ GA4: Successfully initialized with enhanced tracking
Analytics.tsx:20 ✅ Analytics: GA4 initialized with user consent
useDocuments.ts:72 📊 Document status updated: {documents: 2, totalSize: '1.5 MB', totalChunks: 20, totalVectors: 20, avgChunksPerDoc: '10.0', …}
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5811v898116370za200zd898116370&_p=1754408038690&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528500~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=1&sid=1754405068&sct=10&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=5453".
Yc @ js?id=G-V1B8R98P79:241
zm @ js?id=G-V1B8R98P79:430
dN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
k.Kb @ js?id=G-V1B8R98P79:915
k.add @ js?id=G-V1B8R98P79:918
k.Kl @ js?id=G-V1B8R98P79:934
k.cq @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:930
vn @ js?id=G-V1B8R98P79:447
Bp @ js?id=G-V1B8R98P79:468
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:662
Promise.then
gz @ js?id=G-V1B8R98P79:662
k.bq @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:946
v @ js?id=G-V1B8R98P79:487
En @ js?id=G-V1B8R98P79:449
er @ js?id=G-V1B8R98P79:487
dr.flush @ js?id=G-V1B8R98P79:491
dr.push @ js?id=G-V1B8R98P79:489
Wq @ js?id=G-V1B8R98P79:484
event @ js?id=G-V1B8R98P79:751
VD @ js?id=G-V1B8R98P79:757
YD.b.push @ js?id=G-V1B8R98P79:763
window.gtag @ analytics.ts:279
trackEvent @ analytics.ts:384
initializeGA4 @ analytics.ts:308
analytics.ts:363 📊 GA4: Page view tracked - DeepResearch-TimeCapsule
Analytics.tsx:69 📊 Analytics: Tracked page view - DeepResearch-TimeCapsule (/deep-research)
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5811v898116370za200zd898116370&_p=1754408038690&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528500~104684208~104684211~104948813~105087538~105087540~105103161~105103163&sr=2240x1260&cid=2050444394.1754292465&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&sid=1754405068&sct=10&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-05T15%3A33%3A58.700Z&epn.page_duration=2&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x705&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&tfd=5457".
Yc @ js?id=G-V1B8R98P79:241
zm @ js?id=G-V1B8R98P79:430
dN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
k.Kb @ js?id=G-V1B8R98P79:915
k.add @ js?id=G-V1B8R98P79:918
k.Kl @ js?id=G-V1B8R98P79:934
k.cq @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:930
vn @ js?id=G-V1B8R98P79:447
Bp @ js?id=G-V1B8R98P79:468
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:662
gz @ js?id=G-V1B8R98P79:662
k.bq @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:946
v @ js?id=G-V1B8R98P79:487
En @ js?id=G-V1B8R98P79:449
er @ js?id=G-V1B8R98P79:487
dr.flush @ js?id=G-V1B8R98P79:491
dr.push @ js?id=G-V1B8R98P79:489
Wq @ js?id=G-V1B8R98P79:484
event @ js?id=G-V1B8R98P79:751
VD @ js?id=G-V1B8R98P79:757
YD.b.push @ js?id=G-V1B8R98P79:763
RD @ js?id=G-V1B8R98P79:763
ZD @ js?id=G-V1B8R98P79:763
lJ @ js?id=G-V1B8R98P79:854
gJ @ js?id=G-V1B8R98P79:853
(anonymous) @ js?id=G-V1B8R98P79:857
setTimeout
Qc @ js?id=G-V1B8R98P79:238
oJ @ js?id=G-V1B8R98P79:857
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
k.ao @ js?id=G-V1B8R98P79:219
bf @ js?id=G-V1B8R98P79:288
(anonymous) @ js?id=G-V1B8R98P79:788
$f @ js?id=G-V1B8R98P79:303
e @ js?id=G-V1B8R98P79:733
XC @ js?id=G-V1B8R98P79:734
aD @ js?id=G-V1B8R98P79:739
VD @ js?id=G-V1B8R98P79:758
YD.b.push @ js?id=G-V1B8R98P79:763
window.gtag @ analytics.ts:279
initializeGA4 @ analytics.ts:283
EmbeddingService.ts:129 ✅ Model loaded successfully
EmbeddingService.ts:147 ✅ Model loaded from cache instantly
VectorStore.ts:1522 📊 Xenova progress: Embedding model ready (100%)
EmbeddingService.ts:156 ✅ EmbeddingService initialized successfully
VectorStore.ts:1528 ✅ Xenova embedding service ready
VectorStore.ts:1479 ✅ Immediate background download completed
VectorStore.ts:265 ✅ Xenova model loaded from cache - all features ready
VectorStore.ts:274 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5811v898116370za200zd898116370&_p=1754408038690&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528500~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=3&sid=1754405068&sct=10&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=scroll&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&epn.percent_scrolled=90&tfd=5584".
Yc @ js?id=G-V1B8R98P79:241
zm @ js?id=G-V1B8R98P79:430
dN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
k.Kb @ js?id=G-V1B8R98P79:915
k.add @ js?id=G-V1B8R98P79:918
k.Kl @ js?id=G-V1B8R98P79:934
k.cq @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:930
vn @ js?id=G-V1B8R98P79:447
Bp @ js?id=G-V1B8R98P79:468
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:662
gz @ js?id=G-V1B8R98P79:662
k.bq @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:946
v @ js?id=G-V1B8R98P79:487
En @ js?id=G-V1B8R98P79:449
er @ js?id=G-V1B8R98P79:487
dr.flush @ js?id=G-V1B8R98P79:491
dr.push @ js?id=G-V1B8R98P79:489
Wq @ js?id=G-V1B8R98P79:484
event @ js?id=G-V1B8R98P79:751
VD @ js?id=G-V1B8R98P79:757
YD.b.push @ js?id=G-V1B8R98P79:763
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
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5811v898116370za200zd898116370&_p=1754408038690&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528500~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&dt=DeepResearch-TimeCapsule&dl=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&sid=1754405068&sct=10&seg=1&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=research&ep.page_type=application&ep.pathname=%2Fdeep-research&ep.consent_analytics=true&ep.consent_functional=true&tfd=5588".
Yc @ js?id=G-V1B8R98P79:241
zm @ js?id=G-V1B8R98P79:430
dN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
k.Kb @ js?id=G-V1B8R98P79:915
k.add @ js?id=G-V1B8R98P79:918
k.Kl @ js?id=G-V1B8R98P79:934
k.cq @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:930
vn @ js?id=G-V1B8R98P79:447
Bp @ js?id=G-V1B8R98P79:468
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:662
gz @ js?id=G-V1B8R98P79:662
k.bq @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:946
v @ js?id=G-V1B8R98P79:487
En @ js?id=G-V1B8R98P79:449
er @ js?id=G-V1B8R98P79:487
dr.flush @ js?id=G-V1B8R98P79:491
dr.push @ js?id=G-V1B8R98P79:489
Wq @ js?id=G-V1B8R98P79:484
event @ js?id=G-V1B8R98P79:751
VD @ js?id=G-V1B8R98P79:757
YD.b.push @ js?id=G-V1B8R98P79:763
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754408033322:160
options.factory @ webpack.js?v=1754408033322:712
__webpack_require__ @ webpack.js?v=1754408033322:37
fn @ webpack.js?v=1754408033322:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754408033322:182
options.factory @ webpack.js?v=1754408033322:712
__webpack_require__ @ webpack.js?v=1754408033322:37
__webpack_exec__ @ main-app.js?v=1754408033322:2824
(anonymous) @ main-app.js?v=1754408033322:2825
webpackJsonpCallback @ webpack.js?v=1754408033322:1388
(anonymous) @ main-app.js?v=1754408033322:9
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754408033322:160
options.factory @ webpack.js?v=1754408033322:712
__webpack_require__ @ webpack.js?v=1754408033322:37
fn @ webpack.js?v=1754408033322:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754408033322:182
options.factory @ webpack.js?v=1754408033322:712
__webpack_require__ @ webpack.js?v=1754408033322:37
__webpack_exec__ @ main-app.js?v=1754408033322:2824
(anonymous) @ main-app.js?v=1754408033322:2825
webpackJsonpCallback @ webpack.js?v=1754408033322:1388
(anonymous) @ main-app.js?v=1754408033322:9
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
useOllamaConnection.ts:289 ✅ Test generation successful: <think>
Okay, the user wants me to say "Connection test successful" to confirm. Let me
useOllamaConnection.ts:111 💾 Saved connection config: {baseURL: 'http://localhost:11434', selectedModel: 'qwen3:0.6b', lastConnected: '2025-08-05T15:34:01.395Z', version: '1.0'}
useOllamaConnection.ts:316 ✅ Successfully connected to Ollama with model: qwen3:0.6b
useOllamaConnection.ts:628 ✅ Auto-reconnection successful
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
useOllamaConnection.useEffect.autoReconnect @ useOllamaConnection.ts:623
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5811v898116370za200zd898116370&_p=1754408038690&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528500~104684208~104684211~104948813~105087538~105087540~105103161~105103163&sr=2240x1260&cid=2050444394.1754292465&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=5&sid=1754405068&sct=10&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-05T15%3A33%3A58.873Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x705&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&tfd=10597".
Yc @ js?id=G-V1B8R98P79:241
zm @ js?id=G-V1B8R98P79:430
dN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:915
prompt-input.tsx:481 🔍 Submit context check: {enableRAG: true, webSearchEnabled: false, webSearchConfigured: false, hasRAGSearch: true, hasWebSearch: true}
prompt-input.tsx:491 🔍 Performing RAG search...
RAGTracker.ts:71 🔍 RAG Query started: rag_1754408050807_gsswpsj2h - "tell me the best projects by Rutwik..."
VectorStore.ts:743 🔍 RAG Query rag_1754408050807_gsswpsj2h: Searching for "tell me the best projects by Rutwik" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (35 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 119ms
VectorStore.ts:751 🧠 RAG Query rag_1754408050807_gsswpsj2h: Generated embedding in 120ms
VectorStore.ts:758 📚 RAG Query rag_1754408050807_gsswpsj2h: Retrieved 2 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754408050807_gsswpsj2h - 15 results, avg similarity: 0.185, 121ms
VectorStore.ts:811 ✅ RAG Query rag_1754408050807_gsswpsj2h completed: {totalTime: '121ms', breakdown: {…}, results: '15/16 (filtered by limit)', avgSimilarity: '0.185', threshold: 0.1, …}
useResearch.ts:325 🔍 RAG Search completed: 2 documents found
prompt-input.tsx:514 🔍 Web search skipped: {webSearchEnabled: false, hasWebSearch: true, configured: false}
useResearch.ts:938 🔬 Starting intelligent research for: "tell me the best projects by Rutwik"
ResearchOrchestrator.ts:104 🔬 Starting research for: "tell me the best projects by Rutwik"
RAGTracker.ts:71 🔍 RAG Query started: rag_1754408050976_147gpoqal - "tell me the best projects by Rutwik..."
VectorStore.ts:743 🔍 RAG Query rag_1754408050976_147gpoqal: Searching for "tell me the best projects by Rutwik" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (35 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 43ms
VectorStore.ts:751 🧠 RAG Query rag_1754408050976_147gpoqal: Generated embedding in 44ms
VectorStore.ts:758 📚 RAG Query rag_1754408050976_147gpoqal: Retrieved 2 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754408050976_147gpoqal - 10 results, avg similarity: 0.212, 44ms
VectorStore.ts:811 ✅ RAG Query rag_1754408050976_147gpoqal completed: {totalTime: '44ms', breakdown: {…}, results: '10/16 (filtered by limit)', avgSimilarity: '0.212', threshold: 0.1, …}
ResearchOrchestrator.ts:1408 🧠 Master Orchestrator eligibility: RAG sources: true, Substantial content: true
ResearchOrchestrator.ts:132 🧠 MASTER ORCHESTRATOR: Bypassing traditional pipeline entirely - using intelligent tool orchestration
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754408051021_1_6ezcw
useResearch.ts:964 📋 Adding new step: master_orchestrator_1754408051021_1_6ezcw
ResearchOrchestrator.ts:1418 🧠 Master Orchestrator: Starting with PURE QUERY APPROACH for "tell me the best projects by Rutwik"
ResearchOrchestrator.ts:1419 🚨 ARCHITECTURE CHANGE: Ignoring 10 pre-found sources - Master Orchestrator will make its own decisions
AgentRegistry.ts:21 📝 Registered agent: QueryPlanner - Expands queries based on intent and domain understanding
AgentRegistry.ts:21 📝 Registered agent: DataInspector - Analyzes RAG chunks to understand data structure and quality
AgentRegistry.ts:21 📝 Registered agent: ChunkSelector - Queries RxDB embeddings using document intelligence for targeted chunk selection
AgentRegistry.ts:21 📝 Registered agent: PatternGenerator - Creates extraction strategies based on data inspection
AgentRegistry.ts:21 📝 Registered agent: Extractor - Executes extraction using generated patterns
AgentRegistry.ts:21 📝 Registered agent: Synthesizer - Consolidates extracted data into a coherent answer
ResearchOrchestrator.ts:1552 🧠 Calling Master Orchestrator.research() with PURE QUERY (no pre-found sources)
Orchestrator.ts:51 🧠 Master LLM Orchestrator starting for: "tell me the best projects by Rutwik"
Orchestrator.ts:74 🎯 Master LLM analyzing situation and planning tool calls...
Orchestrator.ts:82 🔄 Master LLM Iteration 1: Answer the user's query: "tell me the best projects by Rutwik"
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2133}
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 983}
Orchestrator.ts:168 🧠 Master LLM Decision Response (983 chars): <think>
Okay, let's see. The user is asking for the best projects by Rutwik. The current situation is that I need to figure out the next steps. First, I should check if there are any chunks loaded. But the available documents are zero chunks, so I must call ChunkSelector first.

The instructions say that if I have 0 chunks, I need to call ChunkSelector. Since there are none, the next step is to use that tool to find relevant documents. Once I get those documents, then I can move on to analyzing ...
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
makeMasterLLMDecision @ Orchestrator.ts:165
masterLLMOrchestration @ Orchestrator.ts:85
research @ Orchestrator.ts:57
executeMasterOrchestrator @ ResearchOrchestrator.ts:1553
executeResearch @ ResearchOrchestrator.ts:147
await in executeResearch
useResearch.useCallback[performIntelligentResearch] @ useResearch.ts:988
handleSubmit @ ResearchOutput.tsx:807
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
Orchestrator.ts:171 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'ChunkSelector', reasoning: 'Since there are no chunks loaded, I must first call ChunkSelector to search for relevant documents i'}
Orchestrator.ts:93 🔧 Master LLM calling tool: ChunkSelector - Since there are no chunks loaded, I must first call ChunkSelector to search for relevant documents in the knowledge base.
Orchestrator.ts:272 🔧 Executing tool: ChunkSelector (original: ChunkSelector)
ChunkSelectorAgent.ts:33 🔍 ChunkSelector: Using LLM-driven cursor-style chunk selection
ChunkSelectorAgent.ts:36 📋 DEBUG - ChunkSelector received context: {patternsCount: 0, patterns: Array(0), hasDocumentInsights: true, documentType: 'none', contentAreas: Array(0)}
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 432}
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5811v898116370za200zd898116370&_p=1754408038690&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528500~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=6&sid=1754405068&sct=10&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=8547&tfd=22758".
Yc @ js?id=G-V1B8R98P79:241
zm @ js?id=G-V1B8R98P79:430
dN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:915
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
generateSearchStrategyWithLLM @ ChunkSelectorAgent.ts:334
process @ ChunkSelectorAgent.ts:69
executeToolCall @ Orchestrator.ts:276
masterLLMOrchestration @ Orchestrator.ts:94
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1127}
ChunkSelectorAgent.ts:335 🔍 LLM search strategy response: <think>
Okay, let's see. The user wants to find the best projects by Rutwik based on the given query and document context. The document context says it's undefined, so maybe there's no specific inform
ChunkSelectorAgent.ts:72 🧠 LLM search strategy: Search for "best projects" and "Rutwik" directly in the query without additional filters.
ChunkSelectorAgent.ts:360 ⚡ Executing hybrid search strategy: Search for "best projects" and "Rutwik" directly in the query without additional filters.
ChunkSelectorAgent.ts:377 🔍 Executing Tier 2: Semantic search with query: "best projects, Rutwik"
RAGTracker.ts:71 🔍 RAG Query started: rag_1754408060240_6vmdbqtgo - "best projects, Rutwik..."
VectorStore.ts:743 🔍 RAG Query rag_1754408060240_6vmdbqtgo: Searching for "best projects, Rutwik" with threshold: 0.15
EmbeddingService.ts:177 🔍 Generating embedding for text (21 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 21ms
VectorStore.ts:751 🧠 RAG Query rag_1754408060240_6vmdbqtgo: Generated embedding in 21ms
VectorStore.ts:758 📚 RAG Query rag_1754408060240_6vmdbqtgo: Retrieved 2 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754408060240_6vmdbqtgo - 11 results, avg similarity: 0.215, 23ms
VectorStore.ts:811 ✅ RAG Query rag_1754408060240_6vmdbqtgo completed: {totalTime: '23ms', breakdown: {…}, results: '11/11 (filtered by limit)', avgSimilarity: '0.215', threshold: 0.15, …}
ChunkSelectorAgent.ts:423 🧠 LLM deciding between Semantic (11 found) results...
ChunkSelectorAgent.ts:432 📊 Only semantic results available, using 11 chunks
ChunkSelectorAgent.ts:411 ✅ LLM-driven search complete: 11 chunks selected from Semantic (11 found)
Orchestrator.ts:278 ✅ Tool ChunkSelector completed in 4514ms
Orchestrator.ts:82 🔄 Master LLM Iteration 2: Call DataInspector to analyze the documents' structure and content.
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2084}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
makeMasterLLMDecision @ Orchestrator.ts:165
masterLLMOrchestration @ Orchestrator.ts:85
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 952}
Orchestrator.ts:168 🧠 Master LLM Decision Response (952 chars): <think>
Okay, let's see. The user has 11 chunks loaded, and they need to analyze document structure and content. The current situation says that the Document Analysis is NOT DONE, so I need to start with DataInspector. Wait, but how do I know they need that first? Since the chunks are already available, maybe I should call DataInspector first. Because the user mentioned they need to analyze the documents. So the next step is to use DataInspector. Then after that, maybe generate patterns. Let me ...
Orchestrator.ts:171 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataInspector', reasoning: 'The current situation indicates readiness to analyze document structure and content, and there are 1'}
Orchestrator.ts:93 🔧 Master LLM calling tool: DataInspector - The current situation indicates readiness to analyze document structure and content, and there are 11 chunks available. The next logical step is to use DataInspector to understand the documents' content and structure.
Orchestrator.ts:272 🔧 Executing tool: DataInspector (original: DataInspector)
DataInspectorAgent.ts:31 🔎 DataInspector: Analyzing 11 sources (11 RAG, 0 Web)
DataInspectorAgent.ts:92 🔍 Multi-document analysis: 2 documents detected
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2961}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
performMultiDocumentAnalysis @ DataInspectorAgent.ts:132
inspectWithLLM @ DataInspectorAgent.ts:50
process @ DataInspectorAgent.ts:39
executeToolCall @ Orchestrator.ts:276
masterLLMOrchestration @ Orchestrator.ts:94
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 2704}
DataInspectorAgent.ts:133 🤖 Multi-document analysis: <think>
Okay, let's start by analyzing the user's query and the documents provided. The user wants to know the best projects by Rutwik. First, I need to determine the types of documents and identify the main entities.

Looking at DOCUMENT 1, which is a resume, there's Rutwik Shinde mentioned. The pr
DataInspectorAgent.ts:304 🧠 DataInspector analyzing 2 documents with pure LLM intelligence
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2262}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
analyzeDocumentIntelligently @ DataInspectorAgent.ts:419
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:315
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:246
performMultiDocumentAnalysis @ DataInspectorAgent.ts:136
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 897}
DataInspectorAgent.ts:317 🔍 Document 1 intelligent analysis: {docType: 'RESUME', primaryEntity: 'Rutwik Shinde', isRelevant: true, reasoning: "The document is a resume listing Rutwik's projects…rectly addressing the query about his best pro..."}
DataInspectorAgent.ts:326 ✅ Including relevant document: RESUME (Rutwik Shinde)
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 974}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
discoverContentAreas @ DataInspectorAgent.ts:518
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:333
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:246
performMultiDocumentAnalysis @ DataInspectorAgent.ts:136
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1767}
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 903}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
discoverEntitiesIntelligently @ DataInspectorAgent.ts:474
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:336
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 3360}
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 714}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
discoverDocumentRole @ DataInspectorAgent.ts:575
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:339
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 2109}
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2262}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
analyzeDocumentIntelligently @ DataInspectorAgent.ts:419
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:315
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 929}
DataInspectorAgent.ts:317 🔍 Document 2 intelligent analysis: {docType: 'Resume', primaryEntity: 'Rutwik Shinde', isRelevant: true, reasoning: 'No reasoning provided...'}
DataInspectorAgent.ts:326 ✅ Including relevant document: Resume (Rutwik Shinde)
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 974}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
discoverContentAreas @ DataInspectorAgent.ts:518
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:333
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1518}
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 903}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
discoverEntitiesIntelligently @ DataInspectorAgent.ts:474
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:336
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 2662}
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}connected: truehasClient: truemodel: "qwen3:0.6b"[[Prototype]]: Object
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 714}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
discoverDocumentRole @ DataInspectorAgent.ts:575
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:339
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1162}
DataInspectorAgent.ts:356 📊 Document filtering: 2 total → 2 relevant
DataInspectorAgent.ts:262 📋 Multi-Document Analysis: 2 documents with 0 relationships
Orchestrator.ts:278 ✅ Tool DataInspector completed in 81011ms
Orchestrator.ts:82 🔄 Master LLM Iteration 3: ANALYZE DOCUMENT STRUCTURE AND CONTENT
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2012}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
makeMasterLLMDecision @ Orchestrator.ts:165
masterLLMOrchestration @ Orchestrator.ts:85
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 3174}
Orchestrator.ts:168 🧠 Master LLM Decision Response (3174 chars): <think>
Okay, let's see. The user provided 11 chunks of documents that need to be analyzed. The current situation is that we've already completed the document analysis and have two patterns available. But the data extraction isn't done yet. The goal is to extract specific information from the chunks.

First, I need to check if there's a need to use the tools in the correct order. The previous steps were:

1. Have 0 chunks → call ChunkSelector
2. Have chunks but no analysis → call DataInspector
3...
Orchestrator.ts:171 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'Extractor', reasoning: 'Once the data is extracted, the final answer can be synthesized.'}
Orchestrator.ts:93 🔧 Master LLM calling tool: Extractor - Once the data is extracted, the final answer can be synthesized.
Orchestrator.ts:272 🔧 Executing tool: Extractor (original: Extractor)
ExtractionAgent.ts:28 ⛏️ Extractor: Processing 11 chunks
ExtractionAgent.ts:711 🧠 LLM discovering patterns for query: "tell me the best projects by Rutwik"
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1601}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
discoverPatternsWithLLM @ ExtractionAgent.ts:739
process @ ExtractionAgent.ts:45
executeToolCall @ Orchestrator.ts:276
masterLLMOrchestration @ Orchestrator.ts:94
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1783}
ExtractionAgent.ts:740 🔍 LLM pattern discovery response: <think>
Okay, let's see. The user wants me to analyze the provided document and figure out what patterns, measurements, or data types exist that would answer their query about "best projects by Rutwik...
ExtractionAgent.ts:866 🔍 Extracted 6 patterns from LLM response: (6) ['would be the project names', 'project names', 'project names and technologies mentioned in the document', 'years of experience from dates like "01/2024 – Present" or "2025/01/16"', 'projects', 'work']
ExtractionAgent.ts:58 🧠 LLM discovered patterns: would be the project names, project names, project names and technologies mentioned in the document, years of experience from dates like "01/2024 – Present" or "2025/01/16", projects, work
ExtractionAgent.ts:770 ⚡ Fast extraction using 6 LLM-discovered patterns
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 22531}
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1859}
ExtractionAgent.ts:793 🎯 Pattern-based extraction (1859 chars): <think>
Okay, let me start by reading through the user's query and the provided text. The user wants me to extract all instances of the patterns that the LLM identified. They specified to be direct and complete, focusing on the specific patterns.

First, I need to look through the text and identify 
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
extractUsingDiscoveredPatterns @ ExtractionAgent.ts:792
process @ ExtractionAgent.ts:63
ExtractionAgent.ts:812 ✅ Pattern-based extraction complete: Found 1 items
ExtractionAgent.ts:117 📊 Extraction Statistics:
ExtractionAgent.ts:118 - Total extracted: 1
ExtractionAgent.ts:119 - After deduplication: 1
ExtractionAgent.ts:120 - Items with time values: 0
ExtractionAgent.ts:121 - Table rows: 0
ExtractionAgent.ts:122 - Current records: 0
ExtractionAgent.ts:125 📈 Item types:
ExtractionAgent.ts:127   - general_data: 1
ExtractionAgent.ts:97 ✅ Extraction complete: 1 items found
Orchestrator.ts:278 ✅ Tool Extractor completed in 29353ms
Orchestrator.ts:82 🔄 Master LLM Iteration 4: Synthesizer
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1973}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
makeMasterLLMDecision @ Orchestrator.ts:165
masterLLMOrchestration @ Orchestrator.ts:85
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 2383}
Orchestrator.ts:168 🧠 Master LLM Decision Response (2383 chars): <think>
Okay, let's see. The user is asking what to do next given that they have 11 chunks loaded and they need to analyze them. The available tools include ChunkSelector, DataInspector, PatternGenerator, Extractor, and Synthesizer. The current situation is that the documents are analyzed, and they have 2 patterns available. But the final answer is not done, so they need to synthesize it.

First, I need to check if the analysis is done. The user mentioned that Document Analysis is COMPLETED, so ...
Orchestrator.ts:171 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'Extractor', reasoning: "Since we have 2 patterns available and they are ready for extraction, it's best to use Extractor to "}
Orchestrator.ts:93 🔧 Master LLM calling tool: Extractor - Since we have 2 patterns available and they are ready for extraction, it's best to use Extractor to extract specific data using these patterns. This ensures that the extracted information is accurate and tailored to the existing data.
Orchestrator.ts:272 🔧 Executing tool: Extractor (original: Extractor)
ExtractionAgent.ts:28 ⛏️ Extractor: Processing 11 chunks
ExtractionAgent.ts:711 🧠 LLM discovering patterns for query: "tell me the best projects by Rutwik"
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1601}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
discoverPatternsWithLLM @ ExtractionAgent.ts:739
process @ ExtractionAgent.ts:45
executeToolCall @ Orchestrator.ts:276
masterLLMOrchestration @ Orchestrator.ts:94
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1860}
ExtractionAgent.ts:740 🔍 LLM pattern discovery response: <think>
Okay, let's see. The user wants me to analyze the provided document and identify patterns or data points that would answer their query. The query is "tell me the best projects by Rutwik". 

Fi...
ExtractionAgent.ts:866 🔍 Extracted 8 patterns from LLM response: (8) ['related technologies or skills mentioned in the text', 'project names', 'project titles or names in the document', 'any mention of projects', 'performance or duration data', 'patterns or data points that would answer their query', 'time-based metrics such as "hours"', 'experience']
ExtractionAgent.ts:58 🧠 LLM discovered patterns: related technologies or skills mentioned in the text, project names, project titles or names in the document, any mention of projects, performance or duration data, patterns or data points that would answer their query, time-based metrics such as "hours", experience
ExtractionAgent.ts:770 ⚡ Fast extraction using 8 LLM-discovered patterns
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 22609}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
extractUsingDiscoveredPatterns @ ExtractionAgent.ts:792
process @ ExtractionAgent.ts:63
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 2230}
ExtractionAgent.ts:793 🎯 Pattern-based extraction (2230 chars): <think>
Okay, let me try to work through this. The user wants me to extract all instances of the patterns discovered by the LLM. They mentioned focusing on specific patterns and being direct and complete.

First, I need to look at the provided text and identify any patterns that the LLM might have i
ExtractionAgent.ts:812 ✅ Pattern-based extraction complete: Found 1 items
ExtractionAgent.ts:117 📊 Extraction Statistics:
ExtractionAgent.ts:118 - Total extracted: 1
ExtractionAgent.ts:119 - After deduplication: 1
ExtractionAgent.ts:120 - Items with time values: 0
ExtractionAgent.ts:121 - Table rows: 0
ExtractionAgent.ts:122 - Current records: 0
ExtractionAgent.ts:125 📈 Item types:
ExtractionAgent.ts:127   - general_data: 1
ExtractionAgent.ts:97 ✅ Extraction complete: 1 items found
Orchestrator.ts:278 ✅ Tool Extractor completed in 31877ms
Orchestrator.ts:82 🔄 Master LLM Iteration 5: DATASOURCE ANALYSIS
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1981}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
makeMasterLLMDecision @ Orchestrator.ts:165
masterLLMOrchestration @ Orchestrator.ts:85
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 3245}
Orchestrator.ts:168 🧠 Master LLM Decision Response (3245 chars): <think>
Okay, let's see. I have 11 chunks of documents loaded, and they're already analyzed. The user mentioned that the patterns are available, so I need to check what's next. 

First, the flow is that after each tool is called, the next step is determined by the current situation. So, since we've already done the analysis, maybe the next step is to use the patterns to generate extraction. Wait, but the instructions say to call tools in order. Wait, the flow is 7 steps. So after analyzing, mayb...
Orchestrator.ts:171 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'Synthesizer', reasoning: "Since we have extracted data and the final answer is NOT DONE, it's time to synthesize the informati"}
Orchestrator.ts:93 🔧 Master LLM calling tool: Synthesizer - Since we have extracted data and the final answer is NOT DONE, it's time to synthesize the information.
Orchestrator.ts:272 🔧 Executing tool: Synthesizer (original: Synthesizer)
SynthesisAgent.ts:62 📝 Synthesizer: Creating final answer from 1 items
SynthesisAgent.ts:63    Sources: 11 RAG chunks, 0 Web sources
SynthesisAgent.ts:67 ⏱️ Time-based items received: 0
SynthesisAgent.ts:906 🧹 Starting content cleaning and deduplication for 1 items
SynthesisAgent.ts:930 🧹 After content cleaning: 1 items (removed 0 malformed)
SynthesisAgent.ts:981 🧹 After deduplication: 1 items (removed 0 duplicates)
SynthesisAgent.ts:88 🧹 After cleaning: 1 items remain
SynthesisAgent.ts:1166 📊 Found 0 table items out of 1 total
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 695}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
groupAndRankItems @ SynthesisAgent.ts:1196
process @ SynthesisAgent.ts:99
executeToolCall @ Orchestrator.ts:276
masterLLMOrchestration @ Orchestrator.ts:94
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 2787}
SynthesisAgent.ts:1197 🤖 LLM grouping analysis: <think>
Okay, let's take a look at the user's query and the three items they provided. The user wants to group the extracted items meaningfully, so I need to analyze them.

First, the three items are:
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 410}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
classifyItemsWithLLM @ SynthesisAgent.ts:171
process @ SynthesisAgent.ts:102
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1207}
SynthesisAgent.ts:172 🤖 LLM classification response: <think>
Okay, let's see. The user asked, "tell me the best projects by Rutwik," and I found an item here: "Here are the specific patterns identified by the LLM - Type: general_data." I need to determi
responseCompletion.ts:40 🔄 Generation attempt 1 for prompt length: 1451
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1451}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
response.maxRetries @ SynthesisAgent.ts:249
generateWithCompletion @ responseCompletion.ts:47
generateDeepResearchReportWithReasoning @ SynthesisAgent.ts:247
await in generateDeepResearchReportWithReasoning
process @ SynthesisAgent.ts:105
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1756}
responseCompletion.ts:58 ⚠️ Response issue detected: Abrupt ending without punctuation. Attempting continuation...
overrideMethod @ hook.js:608
generateWithCompletion @ responseCompletion.ts:58
responseCompletion.ts:40 🔄 Generation attempt 2 for prompt length: 3277
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 3277}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
response.maxRetries @ SynthesisAgent.ts:249
generateWithCompletion @ responseCompletion.ts:47
generateWithCompletion @ responseCompletion.ts:62
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 534}
SynthesisAgent.ts:261 🧹 Sanitized synthesis with reasoning: <think>
Okay, let's start by understanding the user's request. They want the best projects by Rutwik, combining information from two documents. First, I need to check if the documents are separate and
SynthesisAgent.ts:143 ✅ Synthesis complete: 1643 characters
Orchestrator.ts:278 ✅ Tool Synthesizer completed in 24402ms
Orchestrator.ts:82 🔄 Master LLM Iteration 6: NOT DONE
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1923}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
makeMasterLLMDecision @ Orchestrator.ts:165
masterLLMOrchestration @ Orchestrator.ts:85
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1370}
Orchestrator.ts:168 🧠 Master LLM Decision Response (1370 chars): <think>
Okay, let's see. The user has 11 chunks loaded, and they've already analyzed and extracted data. So the next step is to call the tools. The available tools are ChunkSelector, DataInspector, PatternGenerator, Extractor, and Synthesizer. But according to the flow, once you have analysis but no patterns, you call PatternGenerator. But here, they have analysis already. So maybe the next step is to use DataInspector to understand the structure of the documents. Wait, but the flow says if you ...
Orchestrator.ts:171 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'Synthesizer', reasoning: 'Since the user has extracted data and the necessary steps in the flow have been completed, the next '}
Orchestrator.ts:93 🔧 Master LLM calling tool: Synthesizer - Since the user has extracted data and the necessary steps in the flow have been completed, the next step is to finalize the answer using the synthesizer.
Orchestrator.ts:272 🔧 Executing tool: Synthesizer (original: Synthesizer)
SynthesisAgent.ts:62 📝 Synthesizer: Creating final answer from 1 items
SynthesisAgent.ts:63    Sources: 11 RAG chunks, 0 Web sources
SynthesisAgent.ts:67 ⏱️ Time-based items received: 0
SynthesisAgent.ts:906 🧹 Starting content cleaning and deduplication for 1 items
SynthesisAgent.ts:930 🧹 After content cleaning: 1 items (removed 0 malformed)
SynthesisAgent.ts:981 🧹 After deduplication: 1 items (removed 0 duplicates)
SynthesisAgent.ts:88 🧹 After cleaning: 1 items remain
SynthesisAgent.ts:1166 📊 Found 0 table items out of 1 total
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 695}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
groupAndRankItems @ SynthesisAgent.ts:1196
process @ SynthesisAgent.ts:99
executeToolCall @ Orchestrator.ts:276
masterLLMOrchestration @ Orchestrator.ts:94
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 3025}
SynthesisAgent.ts:1197 🤖 LLM grouping analysis: <think>
Okay, let's tackle this problem step by step. The user has provided three questions, and I need to analyze the extracted items to determine which ones are unique, duplicates, or related. The f
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 410}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
classifyItemsWithLLM @ SynthesisAgent.ts:171
process @ SynthesisAgent.ts:102
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1378}
SynthesisAgent.ts:172 🤖 LLM classification response: <think>
Okay, let's see. The user asked, "tell me the best projects by Rutwik," and they provided an item with a specific pattern: general_data. The task is to determine if each item is current, histo
responseCompletion.ts:40 🔄 Generation attempt 1 for prompt length: 1451
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1451}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
response.maxRetries @ SynthesisAgent.ts:249
generateWithCompletion @ responseCompletion.ts:47
generateDeepResearchReportWithReasoning @ SynthesisAgent.ts:247
await in generateDeepResearchReportWithReasoning
process @ SynthesisAgent.ts:105
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 4301}
SynthesisAgent.ts:261 🧹 Sanitized synthesis with reasoning: <think>
Okay, let's see. The user is asking for the best projects by Rutwik, and there are two documents provided. The cross-document strategy is to process each document independently without mixing 
SynthesisAgent.ts:143 ✅ Synthesis complete: 3808 characters
Orchestrator.ts:278 ✅ Tool Synthesizer completed in 33557ms
Orchestrator.ts:82 🔄 Master LLM Iteration 7: COMPLETE
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1923}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
makeMasterLLMDecision @ Orchestrator.ts:165
masterLLMOrchestration @ Orchestrator.ts:85
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 2158}
Orchestrator.ts:168 🧠 Master LLM Decision Response (2158 chars): <think>
Okay, let's see. The user has 11 chunks loaded, and they want me to analyze them. The current situation says that Document Analysis has been completed, so I know the chunks are ready. Now, the next step is to use the DataInspector tool. Wait, but the user mentioned that the documents have been analyzed. So maybe after analyzing, I should call DataInspector to understand the structure. Then, once I have that, I can generate patterns with PatternGenerator. But wait, the user says "have chu...
Orchestrator.ts:171 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'Synthesizer', reasoning: 'With extracted data, I can now compile the final answer into a comprehensive response, ensuring all '}
Orchestrator.ts:93 🔧 Master LLM calling tool: Synthesizer - With extracted data, I can now compile the final answer into a comprehensive response, ensuring all information is accurately presented.
Orchestrator.ts:272 🔧 Executing tool: Synthesizer (original: Synthesizer)
SynthesisAgent.ts:62 📝 Synthesizer: Creating final answer from 1 items
SynthesisAgent.ts:63    Sources: 11 RAG chunks, 0 Web sources
SynthesisAgent.ts:67 ⏱️ Time-based items received: 0
SynthesisAgent.ts:906 🧹 Starting content cleaning and deduplication for 1 items
SynthesisAgent.ts:930 🧹 After content cleaning: 1 items (removed 0 malformed)
SynthesisAgent.ts:981 🧹 After deduplication: 1 items (removed 0 duplicates)
SynthesisAgent.ts:88 🧹 After cleaning: 1 items remain
SynthesisAgent.ts:1166 📊 Found 0 table items out of 1 total
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 695}
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754408033322:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/588550cdeafc1867.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754408033322:1367
Promise.then
hotCheck @ webpack.js?v=1754408033322:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1246ms
webpack.js?v=1754408033322:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/22c0daf2c1099c44.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754408033322:1367
Promise.then
hotCheck @ webpack.js?v=1754408033322:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleApplyUpdates @ hot-reloader-client.js:123
eval @ hot-reloader-client.js:143
Promise.then
tryApplyUpdatesWebpack @ hot-reloader-client.js:142
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
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
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
groupAndRankItems @ SynthesisAgent.ts:1196
process @ SynthesisAgent.ts:99
executeToolCall @ Orchestrator.ts:276
masterLLMOrchestration @ Orchestrator.ts:94
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 4020}
SynthesisAgent.ts:1197 🤖 LLM grouping analysis: <think>
Okay, let's tackle this step by step. The user provided three questions, and I need to analyze the extracted items and determine if they are unique entries or duplicates. Let me start by break
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 410}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
classifyItemsWithLLM @ SynthesisAgent.ts:171
process @ SynthesisAgent.ts:102
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1444}
SynthesisAgent.ts:172 🤖 LLM classification response: <think>
Okay, the user asked, "tell me the best projects by Rutwik," and I found one entry: "Here are the specific patterns identified by the LLM - Type: general_data." Now I need to figure out if thi
responseCompletion.ts:40 🔄 Generation attempt 1 for prompt length: 1451
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1451}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
response.maxRetries @ SynthesisAgent.ts:249
generateWithCompletion @ responseCompletion.ts:47
generateDeepResearchReportWithReasoning @ SynthesisAgent.ts:247
await in generateDeepResearchReportWithReasoning
process @ SynthesisAgent.ts:105
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 5956}
responseCompletion.ts:58 ⚠️ Response issue detected: Abrupt ending without punctuation. Attempting continuation...
overrideMethod @ hook.js:608
generateWithCompletion @ responseCompletion.ts:58
responseCompletion.ts:40 🔄 Generation attempt 2 for prompt length: 7477
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 7477}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
response.maxRetries @ SynthesisAgent.ts:249
generateWithCompletion @ responseCompletion.ts:47
generateWithCompletion @ responseCompletion.ts:62
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 805}
SynthesisAgent.ts:261 🧹 Sanitized synthesis with reasoning: <think>
Okay, let's tackle this problem. The user wants to find the best projects by Rutwik based on two documents. First, I need to process each document separately without cross-contamination. 

Loo
SynthesisAgent.ts:143 ✅ Synthesis complete: 4830 characters
Orchestrator.ts:278 ✅ Tool Synthesizer completed in 51471ms
Orchestrator.ts:82 🔄 Master LLM Iteration 8: GENERATE PATTERN
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1931}
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 2444}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
makeMasterLLMDecision @ Orchestrator.ts:165
masterLLMOrchestration @ Orchestrator.ts:85
Orchestrator.ts:168 🧠 Master LLM Decision Response (2444 chars): <think>
Okay, let's see. The user has provided a scenario where they have 11 chunks of documents loaded and are ready to analyze. The current situation is that the documents have been analyzed, and the patterns generated are ready. The available tools include ChunkSelector, DataInspector, PatternGenerator, Extractor, and Synthesizer. The critical decision logic is to follow the flow step by step.

First, the user has 11 chunks but they are analyzed. So step 2 is to call DataInspector. Wait, but ...
Orchestrator.ts:171 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'Synthesizer', reasoning: 'Since all prior steps (ChunkSelector, DataInspector, PatternGenerator, Extractor) have been complete'}
Orchestrator.ts:93 🔧 Master LLM calling tool: Synthesizer - Since all prior steps (ChunkSelector, DataInspector, PatternGenerator, Extractor) have been completed, and the final answer is already synthesized, the next logical step is to finalize the result.
Orchestrator.ts:272 🔧 Executing tool: Synthesizer (original: Synthesizer)
SynthesisAgent.ts:62 📝 Synthesizer: Creating final answer from 1 items
SynthesisAgent.ts:63    Sources: 11 RAG chunks, 0 Web sources
SynthesisAgent.ts:67 ⏱️ Time-based items received: 0
SynthesisAgent.ts:906 🧹 Starting content cleaning and deduplication for 1 items
SynthesisAgent.ts:930 🧹 After content cleaning: 1 items (removed 0 malformed)
SynthesisAgent.ts:981 🧹 After deduplication: 1 items (removed 0 duplicates)
SynthesisAgent.ts:88 🧹 After cleaning: 1 items remain
SynthesisAgent.ts:1166 📊 Found 0 table items out of 1 total
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 695}
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 2773}
SynthesisAgent.ts:1197 🤖 LLM grouping analysis: <think>
Okay, let's take a look at the user's query and the extracted items. The user is asking to group the extracted items, and they want to know if they are unique entries or duplicates. The items 
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 410}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
groupAndRankItems @ SynthesisAgent.ts:1196
process @ SynthesisAgent.ts:99
executeToolCall @ Orchestrator.ts:276
masterLLMOrchestration @ Orchestrator.ts:94
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
classifyItemsWithLLM @ SynthesisAgent.ts:171
process @ SynthesisAgent.ts:102
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1629}
SynthesisAgent.ts:172 🤖 LLM classification response: <think>
Okay, the user asked, "Tell me the best projects by Rutwik," and I found some items. One of them is: "Here are the specific patterns identified by the LLM - Type: general_data." I need to dete
responseCompletion.ts:40 🔄 Generation attempt 1 for prompt length: 1451
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1451}
inpage.js:12 [Violation] 'setTimeout' handler took 121ms
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
response.maxRetries @ SynthesisAgent.ts:249
generateWithCompletion @ responseCompletion.ts:47
generateDeepResearchReportWithReasoning @ SynthesisAgent.ts:247
await in generateDeepResearchReportWithReasoning
process @ SynthesisAgent.ts:105
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 6543}
responseCompletion.ts:58 ⚠️ Response issue detected: Abrupt ending without punctuation. Attempting continuation...
overrideMethod @ hook.js:608
generateWithCompletion @ responseCompletion.ts:58
responseCompletion.ts:40 🔄 Generation attempt 2 for prompt length: 8064
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 8064}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
response.maxRetries @ SynthesisAgent.ts:249
generateWithCompletion @ responseCompletion.ts:47
generateWithCompletion @ responseCompletion.ts:62
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 2167}
SynthesisAgent.ts:261 🧹 Sanitized synthesis with reasoning: <think>
Okay, let's see. The user is asking for the best projects by Rutwik. They provided two documents, and I need to process each independently to avoid cross-contamination. 

First, I need to look
SynthesisAgent.ts:143 ✅ Synthesis complete: 7948 characters
Orchestrator.ts:278 ✅ Tool Synthesizer completed in 60634ms
Orchestrator.ts:82 🔄 Master LLM Iteration 9: COMPLETE
useOllamaConnection.ts:385 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:428 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1923}
useOllamaConnection.ts:445 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:445
makeMasterLLMDecision @ Orchestrator.ts:165
masterLLMOrchestration @ Orchestrator.ts:85
useOllamaConnection.ts:478 ✅ Content generated successfully {responseLength: 1206}
Orchestrator.ts:168 🧠 Master LLM Decision Response (1206 chars): <think>
Okay, let's see. The user provided 11 chunks of document data, and all previous steps have been completed. So the next step depends on the current situation. The available tools include ChunkSelector, DataInspector, PatternGenerator, Extractor, and Synthesizer. 

First, the current situation says there are 11 chunks ready to analyze. But in the previous steps, I had checked if there were 0 chunks, which there aren't, so I called ChunkSelector. Then after that, there was a DataInspector c...
Orchestrator.ts:171 🎯 Parsed Decision: {action: 'COMPLETE', toolName: '', reasoning: 'All necessary steps have been completed, and the data extracted from the 11 chunks is sufficient for'}
Orchestrator.ts:88 ✅ Master LLM completed goal: All necessary steps have been completed, and the data extracted from the 11 chunks is sufficient for the final answer.
Orchestrator.ts:60 📝 Master Orchestrator final result: {hasAnswer: true, answerLength: 7948, preview: "<think>\nOkay, let's see. The user is asking for the best projects by Rutwik. They provided two docum"}
ResearchOrchestrator.ts:1559 ✅ Master Orchestrator generated answer with 0 agent calls
useResearch.ts:942 📋 Step update: synthesis - completed - ID: master_orchestrator_1754408051021_1_6ezcw
useResearch.ts:964 📋 Adding new step: master_orchestrator_1754408051021_1_6ezcw
ResearchSteps.tsx:513 🚫 Preventing duplicate step addition: master_orchestrator_1754408051021_1_6ezcw
useResearch.ts:994 ✅ Intelligent research completed: {steps: 1, sources: 10, confidence: 0.4486102158354931, processingTime: 397097}
ResearchSteps.tsx:513 🚫 Preventing duplicate step addition: master_orchestrator_1754408051021_1_6ezcw
hot-reloader-client.js:197 [Fast Refresh] rebuilding
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754408033322:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/0ee18f0e48508389.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754408033322:1367
Promise.then
hotCheck @ webpack.js?v=1754408033322:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 182ms
fetch-server-response.js:163 Fetch failed loading: GET "http://localhost:3000/deep-research?_rsc=1kjzf".
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
webpack.js?v=1754408033322:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/c552cbc60023080b.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754408033322:1367
Promise.then
hotCheck @ webpack.js?v=1754408033322:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
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
report-hmr-latency.js:14 [Fast Refresh] done in 556ms
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
hot-reloader-client.js:197 [Fast Refresh] rebuilding
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754408033322:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/f89656ab574d36bf.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754408033322:1367
Promise.then
hotCheck @ webpack.js?v=1754408033322:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 190ms
fetch-server-response.js:163 Fetch failed loading: GET "http://localhost:3000/deep-research?_rsc=1kjzf".
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
webpack.js?v=1754408033322:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/eb950df22ab85c30.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754408033322:1367
Promise.then
hotCheck @ webpack.js?v=1754408033322:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
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
report-hmr-latency.js:14 [Fast Refresh] done in 930ms
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754408033322:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/5e533cd9e93ccee1.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754408033322:1367
Promise.then
hotCheck @ webpack.js?v=1754408033322:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 751ms
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
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754408033322:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/42a37efa6dc0aa6f.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754408033322:1367
Promise.then
hotCheck @ webpack.js?v=1754408033322:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 159ms
fetch-server-response.js:163 Fetch failed loading: GET "http://localhost:3000/deep-research?_rsc=1kjzf".
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
webpack.js?v=1754408033322:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/ea0fc7f2982843d1.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754408033322:1367
Promise.then
hotCheck @ webpack.js?v=1754408033322:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 524ms
