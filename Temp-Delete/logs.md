 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58c0h2v898116370za200zd898116370&_p=1755106111970&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104684208~104684211~104948813~105033766~105033768~105103161~105103163~105113532~105231383~105231385&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=7&sid=1755089233&sct=29&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&_et=43138&tfd=1566464".
Yc @ js:242
um @ js:425
YM @ js:906
k.flush @ js:913
k.flush @ js:929
(anonymous) @ js:941
(anonymous) @ js:878
(anonymous) @ js:877
Navigated to http://localhost:3000/deep-research
analytics.ts:160 📱 Device Info Collected: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', platform: 'MacIntel', vendor: 'Google Inc.', language: 'en-US', languages: Array(4), …}
analytics.ts:193 🌍 Location Info Collected: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US'}
analytics.ts:79 📊 GA4 Environment Variables Debug: {measurementId: 'G-V1B8R98P79', anonymizeIp: false, debugMode: false, siteName: 'TimeCapsule- SLM', siteUrl: 'http://localhost:3000', …}
VectorStore.ts:22 -------------- RxDB dev-mode warning -------------------------------
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
eval @ VectorStore.ts:22
(app-pages-browser)/./src/components/VectorStore/VectorStore.ts @ layout.js:7809
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
fn @ webpack.js?v=1755107672324:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7842
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
fn @ webpack.js?v=1755107672324:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false!:11
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false! @ layout.js:4998
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
__webpack_exec__ @ layout.js:8073
(anonymous) @ layout.js:8074
__webpack_require__.O @ webpack.js?v=1755107672324:84
(anonymous) @ layout.js:8075
webpackJsonpCallback @ webpack.js?v=1755107672324:1388
(anonymous) @ layout.js:9
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.16842458326284, longitude: 72.84676214911678, …}
EmbeddingService.ts:35 🧠 Xenova environment configured for CDN loading
VectorStoreProvider.tsx:143 🚀 Auto-initializing VectorStore for route: /deep-research
VectorStoreProvider.tsx:79 🚀 VectorStoreProvider: Creating new singleton VectorStore...
RAGTracker.ts:26 🔍 RAG Tracker initialized with config: {enableTracking: true, enableVisualization: true, enablePerformanceMetrics: true, enableQualityMetrics: false, maxQueryHistory: 1000, …}
VectorStore.ts:195 🗂️ VectorStore constructor called
VectorStore.ts:196 🔍 RAG Tracker initialized for VectorStore
VectorStore.ts:257 🗂️ Initializing RxDB Vector Store...
VectorStore.ts:260 🤖 Loading document processor and starting immediate Xenova download...
DocumentProcessor.ts:61 🔧 DocumentProcessor constructor called (new architecture)
VectorStore.ts:264 🧠 Starting immediate background Xenova download...
VectorStore.ts:1784 🧠 Starting immediate Xenova download in background...
VectorStore.ts:1801 🔄 Initializing web worker (attempt 1/3)...
DocumentProcessor.ts:72 🔧 Initializing DocumentProcessor with immediate download architecture...
DocumentProcessor.ts:95 🔧 Initializing text processing worker...
VectorStore.ts:309 📚 Creating RxDB database...
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
DeepResearchComponent @ DeepResearchApp.tsx:377
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1755107672324:160
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
fn @ webpack.js?v=1755107672324:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1755107672324:182
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
__webpack_exec__ @ main-app.js?v=1755107672324:2824
(anonymous) @ main-app.js?v=1755107672324:2825
webpackJsonpCallback @ webpack.js?v=1755107672324:1388
(anonymous) @ main-app.js?v=1755107672324:9
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
DeepResearchComponent @ DeepResearchApp.tsx:377
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1755107672324:160
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
fn @ webpack.js?v=1755107672324:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1755107672324:182
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
__webpack_exec__ @ main-app.js?v=1755107672324:2824
(anonymous) @ main-app.js?v=1755107672324:2825
webpackJsonpCallback @ webpack.js?v=1755107672324:1388
(anonymous) @ main-app.js?v=1755107672324:9
scheduler.development.js:14 [Violation] 'message' handler took 307ms
VectorStore.ts:316 -------------- RxDB Open Core RxStorage -------------------------------
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
init @ VectorStore.ts:316
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1755107672324:160
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
fn @ webpack.js?v=1755107672324:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1755107672324:182
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
__webpack_exec__ @ main-app.js?v=1755107672324:2824
(anonymous) @ main-app.js?v=1755107672324:2825
webpackJsonpCallback @ webpack.js?v=1755107672324:1388
(anonymous) @ main-app.js?v=1755107672324:9
VectorStore.ts:323 📄 Creating documents collection...
Analytics.tsx:39 ⏳ Analytics: Skipping page tracking - no consent or not initialized
embeddingWorker.js:231 🔧 Text processing worker loaded successfully
embeddingWorker.js:59 🔧 Initializing text processing worker...
embeddingWorker.js:73 ✅ Text processing worker initialized successfully
DocumentProcessor.ts:116 ✅ Text processing worker ready
DocumentProcessor.ts:125 ✅ DocumentProcessor initialization complete (embeddings will load when needed)
VectorStore.ts:1803 ✅ Web worker initialized successfully
VectorStore.ts:1821 🧠 Starting Xenova embedding service download...
EmbeddingService.ts:69 🧠 Starting Xenova embedding service initialization...
EmbeddingService.ts:77 ✅ Loading model (checking cache)...
EmbeddingService.ts:84 📦 Loading Xenova/all-MiniLM-L6-v2 model from Hugging Face CDN...
VectorStore.ts:412 ✅ RxDB Vector Store initialized successfully
VectorStore.ts:413 🧠 Xenova download running in background...
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
initializeXenovaService @ VectorStore.ts:1829
startImmediateBackgroundDownload @ VectorStore.ts:1790
analytics.ts:305 ✅ GA4: Successfully initialized with enhanced tracking
Analytics.tsx:20 ✅ Analytics: GA4 initialized with user consent
useOllamaConnection.ts:132 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ useOllamaConnection.ts:132
useOllamaConnection.useCallback[connect] @ useOllamaConnection.ts:226
useOllamaConnection.useEffect.autoReconnect @ useOllamaConnection.ts:578
useOllamaConnection.ts:174 ✅ Ollama connection test passed, sorted models: (6) ['gemma3n:e2b', 'hf.co/bubblspace/Timecapsule2.7B-g3n-mix-match-gguf:latest', 'llama3.1:8b', 'llama3.2:1b', 'qwen3:0.6b', 'tinyllama:1.1b']
useDocuments.ts:72 📊 Document status updated: {documents: 2, totalSize: '1.5 MB', totalChunks: 20, totalVectors: 20, avgChunksPerDoc: '10.0', …}
analytics.ts:363 📊 GA4: Page view tracked - DeepResearch-TimeCapsule
Analytics.tsx:69 📊 Analytics: Tracked page view - DeepResearch-TimeCapsule (/deep-research)
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58b0v898116370za200zd898116370&_p=1755107679112&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104630776~104630778~104684208~104684211~104948813~105033766~105033768~105103161~105103163~105113532~105231383~105231385&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=1&sid=1755089233&sct=29&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=6858".
Yc @ js?id=G-V1B8R98P79:242
um @ js?id=G-V1B8R98P79:426
bN @ js?id=G-V1B8R98P79:907
k.flush @ js?id=G-V1B8R98P79:915
k.Jb @ js?id=G-V1B8R98P79:912
k.add @ js?id=G-V1B8R98P79:915
k.Kl @ js?id=G-V1B8R98P79:930
k.Zp @ js?id=G-V1B8R98P79:930
(anonymous) @ js?id=G-V1B8R98P79:927
qn @ js?id=G-V1B8R98P79:443
wp @ js?id=G-V1B8R98P79:463
(anonymous) @ js?id=G-V1B8R98P79:927
c @ js?id=G-V1B8R98P79:655
(anonymous) @ js?id=G-V1B8R98P79:655
Promise.then
az @ js?id=G-V1B8R98P79:655
k.Yp @ js?id=G-V1B8R98P79:927
c @ js?id=G-V1B8R98P79:942
v @ js?id=G-V1B8R98P79:482
zn @ js?id=G-V1B8R98P79:445
br @ js?id=G-V1B8R98P79:482
ar.flush @ js?id=G-V1B8R98P79:486
ar.push @ js?id=G-V1B8R98P79:484
Tq @ js?id=G-V1B8R98P79:479
event @ js?id=G-V1B8R98P79:743
ND @ js?id=G-V1B8R98P79:749
QD.b.push @ js?id=G-V1B8R98P79:755
window.gtag @ analytics.ts:279
trackEvent @ analytics.ts:384
initializeGA4 @ analytics.ts:308
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58b0v898116370za200zd898116370&_p=1755107679112&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104630776~104630778~104684208~104684211~104948813~105033766~105033768~105103161~105103163~105113532~105231383~105231385&sr=2240x1260&cid=995334552.1754650390&ul=en-us&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&sid=1755089233&sct=29&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-13T17%3A54%3A39.120Z&epn.page_duration=2&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=139.0.0.0&ep.viewport_size=2240x547&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&_et=2&tfd=6863".
Yc @ js?id=G-V1B8R98P79:242
um @ js?id=G-V1B8R98P79:426
bN @ js?id=G-V1B8R98P79:907
k.flush @ js?id=G-V1B8R98P79:915
k.Jb @ js?id=G-V1B8R98P79:912
k.add @ js?id=G-V1B8R98P79:915
k.Kl @ js?id=G-V1B8R98P79:930
k.Zp @ js?id=G-V1B8R98P79:930
(anonymous) @ js?id=G-V1B8R98P79:927
qn @ js?id=G-V1B8R98P79:443
wp @ js?id=G-V1B8R98P79:463
(anonymous) @ js?id=G-V1B8R98P79:927
c @ js?id=G-V1B8R98P79:655
az @ js?id=G-V1B8R98P79:655
k.Yp @ js?id=G-V1B8R98P79:927
c @ js?id=G-V1B8R98P79:942
v @ js?id=G-V1B8R98P79:482
zn @ js?id=G-V1B8R98P79:445
br @ js?id=G-V1B8R98P79:482
ar.flush @ js?id=G-V1B8R98P79:486
ar.push @ js?id=G-V1B8R98P79:484
Tq @ js?id=G-V1B8R98P79:479
event @ js?id=G-V1B8R98P79:743
ND @ js?id=G-V1B8R98P79:749
QD.b.push @ js?id=G-V1B8R98P79:755
JD @ js?id=G-V1B8R98P79:755
RD @ js?id=G-V1B8R98P79:755
gJ @ js?id=G-V1B8R98P79:847
bJ @ js?id=G-V1B8R98P79:846
(anonymous) @ js?id=G-V1B8R98P79:850
setTimeout
Qc @ js?id=G-V1B8R98P79:239
jJ @ js?id=G-V1B8R98P79:850
(anonymous) @ js?id=G-V1B8R98P79:349
k.invoke @ js?id=G-V1B8R98P79:254
Ya @ js?id=G-V1B8R98P79:218
vd.evaluate @ js?id=G-V1B8R98P79:256
Rd @ js?id=G-V1B8R98P79:271
k.invoke @ js?id=G-V1B8R98P79:254
Ya @ js?id=G-V1B8R98P79:218
Xa @ js?id=G-V1B8R98P79:217
(anonymous) @ js?id=G-V1B8R98P79:278
k.invoke @ js?id=G-V1B8R98P79:254
Ya @ js?id=G-V1B8R98P79:218
k.Yn @ js?id=G-V1B8R98P79:220
bf @ js?id=G-V1B8R98P79:289
(anonymous) @ js?id=G-V1B8R98P79:781
$f @ js?id=G-V1B8R98P79:304
e @ js?id=G-V1B8R98P79:725
PC @ js?id=G-V1B8R98P79:726
TC @ js?id=G-V1B8R98P79:731
ND @ js?id=G-V1B8R98P79:750
QD.b.push @ js?id=G-V1B8R98P79:755
window.gtag @ analytics.ts:279
initializeGA4 @ analytics.ts:283
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58b0v898116370za200zd898116370&_p=1755107679112&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104630776~104630778~104684208~104684211~104948813~105033766~105033768~105103161~105103163~105113532~105231383~105231385&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=3&sid=1755089233&sct=29&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=scroll&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&epn.percent_scrolled=90&_et=4&tfd=6942".
Yc @ js?id=G-V1B8R98P79:242
um @ js?id=G-V1B8R98P79:426
bN @ js?id=G-V1B8R98P79:907
k.flush @ js?id=G-V1B8R98P79:915
k.Jb @ js?id=G-V1B8R98P79:912
k.add @ js?id=G-V1B8R98P79:915
k.Kl @ js?id=G-V1B8R98P79:930
k.Zp @ js?id=G-V1B8R98P79:930
(anonymous) @ js?id=G-V1B8R98P79:927
qn @ js?id=G-V1B8R98P79:443
wp @ js?id=G-V1B8R98P79:463
(anonymous) @ js?id=G-V1B8R98P79:927
c @ js?id=G-V1B8R98P79:655
az @ js?id=G-V1B8R98P79:655
k.Yp @ js?id=G-V1B8R98P79:927
c @ js?id=G-V1B8R98P79:942
v @ js?id=G-V1B8R98P79:482
zn @ js?id=G-V1B8R98P79:445
br @ js?id=G-V1B8R98P79:482
ar.flush @ js?id=G-V1B8R98P79:486
ar.push @ js?id=G-V1B8R98P79:484
Tq @ js?id=G-V1B8R98P79:479
event @ js?id=G-V1B8R98P79:743
ND @ js?id=G-V1B8R98P79:749
QD.b.push @ js?id=G-V1B8R98P79:755
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
flushPendingEffects @ react-dom-client.development.js:15830
performSyncWorkOnRoot @ react-dom-client.development.js:16362
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58b0v898116370za200zd898116370&_p=1755107679112&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104630776~104630778~104684208~104684211~104948813~105033766~105033768~105103161~105103163~105113532~105231383~105231385&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&dt=DeepResearch-TimeCapsule&dl=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&sid=1755089233&sct=29&seg=1&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=research&ep.page_type=application&ep.pathname=%2Fdeep-research&ep.consent_analytics=true&ep.consent_functional=true&_et=73&tfd=6957".
Yc @ js?id=G-V1B8R98P79:242
um @ js?id=G-V1B8R98P79:426
bN @ js?id=G-V1B8R98P79:907
k.flush @ js?id=G-V1B8R98P79:915
k.Jb @ js?id=G-V1B8R98P79:912
k.add @ js?id=G-V1B8R98P79:915
k.Kl @ js?id=G-V1B8R98P79:930
k.Zp @ js?id=G-V1B8R98P79:930
(anonymous) @ js?id=G-V1B8R98P79:927
qn @ js?id=G-V1B8R98P79:443
wp @ js?id=G-V1B8R98P79:463
(anonymous) @ js?id=G-V1B8R98P79:927
c @ js?id=G-V1B8R98P79:655
az @ js?id=G-V1B8R98P79:655
k.Yp @ js?id=G-V1B8R98P79:927
c @ js?id=G-V1B8R98P79:942
v @ js?id=G-V1B8R98P79:482
zn @ js?id=G-V1B8R98P79:445
br @ js?id=G-V1B8R98P79:482
ar.flush @ js?id=G-V1B8R98P79:486
ar.push @ js?id=G-V1B8R98P79:484
Tq @ js?id=G-V1B8R98P79:479
event @ js?id=G-V1B8R98P79:743
ND @ js?id=G-V1B8R98P79:749
QD.b.push @ js?id=G-V1B8R98P79:755
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
flushPendingEffects @ react-dom-client.development.js:15830
performSyncWorkOnRoot @ react-dom-client.development.js:16362
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
EmbeddingService.ts:129 ✅ Model loaded successfully
EmbeddingService.ts:147 ✅ Model loaded from cache instantly
VectorStore.ts:1835 📊 Xenova progress: Embedding model ready (100%)
EmbeddingService.ts:156 ✅ EmbeddingService initialized successfully
VectorStore.ts:1841 ✅ Xenova embedding service ready
VectorStore.ts:1792 ✅ Immediate background download completed
VectorStore.ts:282 ✅ Xenova model loaded from cache - all features ready
VectorStore.ts:291 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
scheduler.development.js:14 [Violation] 'message' handler took 168ms
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1755107672324:160
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
fn @ webpack.js?v=1755107672324:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1755107672324:182
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
__webpack_exec__ @ main-app.js?v=1755107672324:2824
(anonymous) @ main-app.js?v=1755107672324:2825
webpackJsonpCallback @ webpack.js?v=1755107672324:1388
(anonymous) @ main-app.js?v=1755107672324:9
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1755107672324:160
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
fn @ webpack.js?v=1755107672324:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1755107672324:182
options.factory @ webpack.js?v=1755107672324:712
__webpack_require__ @ webpack.js?v=1755107672324:37
__webpack_exec__ @ main-app.js?v=1755107672324:2824
(anonymous) @ main-app.js?v=1755107672324:2825
webpackJsonpCallback @ webpack.js?v=1755107672324:1388
(anonymous) @ main-app.js?v=1755107672324:9
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
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58b0v898116370za200zd898116370&_p=1755107679112&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104630776~104630778~104684208~104684211~104948813~105033766~105033768~105103161~105103163~105113532~105231383~105231385&sr=2240x1260&cid=995334552.1754650390&ul=en-us&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=5&sid=1755089233&sct=29&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-13T17%3A54%3A39.241Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=139.0.0.0&ep.viewport_size=2240x547&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&_et=4&tfd=11960".
Yc @ js?id=G-V1B8R98P79:242
um @ js?id=G-V1B8R98P79:426
bN @ js?id=G-V1B8R98P79:907
k.flush @ js?id=G-V1B8R98P79:915
(anonymous) @ js?id=G-V1B8R98P79:912
prompt-input.tsx:483 🔍 Submit context check: {enableRAG: true, webSearchEnabled: false, webSearchConfigured: false, hasRAGSearch: true, hasWebSearch: true}
prompt-input.tsx:504 🧠 Skipping initial RAG search for deep-research - Master Orchestrator will handle DataInspector magic filtering
prompt-input.tsx:509 🚫 UI web search disabled - WebSearchAgent will handle intelligent web expansion when needed
useResearch.ts:971 🔬 Starting intelligent research for: "give me the top 3 speed runs from tyler's blog"
ResearchOrchestrator.ts:263 🔬 Starting research for: "give me the top 3 speed runs from tyler's blog"
ResearchOrchestrator.ts:269 🎯 DataInspector Architecture: Getting userdocs metadata for intelligent filtering
VectorStore.ts:794 🔍 getDocumentMetadata: Filtering for document types [userdocs]
VectorStore.ts:856 🔍 getDocumentMetadata: Retrieved 2 documents (filtered for: userdocs)
ResearchOrchestrator.ts:273 📊 Retrieved 2 documents (20 total chunks) - DataInspector will sample and filter
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
extractQueryConstraints @ QueryIntelligenceService.ts:119
executeResearch @ ResearchOrchestrator.ts:298
await in executeResearch
useResearch.useCallback[performIntelligentResearch] @ useResearch.ts:1032
handleSubmit @ ResearchOutput.tsx:821
handleSubmitWithContext @ prompt-input.tsx:515
handleKeyDown @ prompt-input.tsx:473
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
ResearchOrchestrator.ts:304 ℹ️ Prefilter found no strict matches; using all candidates (constraints.strictness=must)
ResearchOrchestrator.ts:311 📑 Synopsis ranking reduced candidates 2 → 2
ResearchOrchestrator.ts:1644 🧠 Master Orchestrator eligibility: RAG sources: true, Substantial content: true
ResearchOrchestrator.ts:318 🧠 MASTER ORCHESTRATOR: Bypassing traditional pipeline entirely - using intelligent tool orchestration
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
ResearchOrchestrator.ts:334 📦 Sampled 8 chunks from 2 document(s) for DataInspector
ResearchOrchestrator.ts:1654 🧠 Master Orchestrator: Starting with intelligent document analysis for "give me the top 3 speed runs from tyler's blog"
ResearchOrchestrator.ts:1655 📊 Found 8 sources for DataInspector magic filtering
AgentRegistry.ts:21 📝 Registered agent: QueryPlanner - Expands queries based on intent and domain understanding
AgentRegistry.ts:21 📝 Registered agent: DataInspector - Analyzes RAG chunks to understand data structure and quality
AgentRegistry.ts:21 📝 Registered agent: PlanningAgent - Creates intelligent execution strategies based on document analysis and query requirements
AgentRegistry.ts:21 📝 Registered agent: PatternGenerator - Creates extraction strategies based on data inspection
AgentRegistry.ts:21 📝 Registered agent: Extractor - Executes extraction using generated patterns
index.ts:87 🌐 WebSearchAgent disabled by configuration
AgentRegistry.ts:21 📝 Registered agent: DataAnalyzer - Cleans, deduplicates, and categorizes extracted data
AgentRegistry.ts:21 📝 Registered agent: SynthesisCoordinator - Orchestrates synthesis agents and assembles final report
AgentRegistry.ts:21 📝 Registered agent: Synthesizer - Consolidates extracted data into a coherent answer
AgentRegistry.ts:21 📝 Registered agent: ResponseFormatter - Ensures responses directly answer questions with clear formatting and structure
ResearchOrchestrator.ts:1807 🧠 Calling Master Orchestrator.research() with 8 found sources for intelligent analysis
Orchestrator.ts:312 🧠 Master LLM Orchestrator starting for: "give me the top 3 speed runs from tyler's blog"
Orchestrator.ts:535 🎯 Master LLM analyzing situation and planning tool calls...
Orchestrator.ts:543 🔄 Master LLM Iteration 1: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58b0v898116370za200zd898116370&_p=1755107679112&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104630776~104630778~104684208~104684211~104948813~105033766~105033768~105103161~105103163~105113532~105231383~105231385&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=6&sid=1755089233&sct=29&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=6845&tfd=18813".
Yc @ js?id=G-V1B8R98P79:242
um @ js?id=G-V1B8R98P79:426
bN @ js?id=G-V1B8R98P79:907
k.flush @ js?id=G-V1B8R98P79:915
(anonymous) @ js?id=G-V1B8R98P79:912
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
research @ Orchestrator.ts:323
executeMasterOrchestrator @ ResearchOrchestrator.ts:1808
executeResearch @ ResearchOrchestrator.ts:337
await in executeResearch
useResearch.useCallback[performIntelligentResearch] @ useResearch.ts:1032
handleSubmit @ ResearchOutput.tsx:821
handleSubmitWithContext @ prompt-input.tsx:515
handleKeyDown @ prompt-input.tsx:473
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
Orchestrator.ts:727 🧠 Master LLM Decision Response (1778 chars): <think>
Okay, let's see. The user wants the top 3 speed runs from Tyler's blog. First, I need to figure out which tool to call next. The available tools are DataInspector, PlanningAgent, PatternGenerator, Extractor, DataAnalyzer, SynthesisCoordinator, Synthesis, and ResponseFormatter.

The goal is to get the top 3 speed runs. Since the current available documents are 8 chunks, maybe the first step is to analyze those. But the user mentioned that DataInspector is needed for document filtering. So...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (1778 chars): <think>
Okay, let's see. The user wants the top 3 speed runs from Tyler's blog. First, I need to figure out which tool to call next. The available tools are DataInspector, PlanningAgent, PatternGenerator, Extractor, DataAnalyzer, SynthesisCoordinator, Synthesis, and ResponseFormatter.

The goal is to get the top 3 speed runs. Since the current available documents are 8 chunks, maybe the first step is to analyze those. But the user mentioned that DataInspector is needed for document filtering. So the next step should be to use DataInspector to filter the documents. Once that's done, the PlanningAgent can create an execution plan. After that, the Extraction tool can extract data, then DataAnalyzer processes it, and finally SynthesisCoordinator synthesizes the results. But the user's current ...
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): DataInspector
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataInspector
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataInspector', reasoning: 'Need to call DataInspector to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: DataInspector - Need to call DataInspector to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: DataInspector
Orchestrator.ts:1148 📋 Current agents called: []
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1539 ✅ Agent execution validated: DataInspector always allowed as first agent
Orchestrator.ts:1618 🔧 Executing tool: DataInspector (original: DataInspector)
ResearchOrchestrator.ts:1663 🚀 Master Orchestrator Agent started: DataInspector (DataInspector)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: DataInspector - 5% (Initializing document analysis)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
DataInspectorAgent.ts:67 🔎 DataInspector: Analyzing 8 sources (8 RAG, 0 Web)
DataInspectorAgent.ts:128 🔍 Multi-document analysis: 2 documents detected
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
performMultiDocumentAnalysis @ DataInspectorAgent.ts:168
inspectWithLLM @ DataInspectorAgent.ts:86
process @ DataInspectorAgent.ts:75
executeToolCall @ Orchestrator.ts:1629
masterLLMOrchestration @ Orchestrator.ts:575
DataInspectorAgent.ts:169 🤖 Multi-document analysis: <think>
Okay, let's start by analyzing each document and the user's query. 

First, the user wants the top 3 speed runs from Tyler's blog. Let's look at the documents.

Document 1 is a resume for Rutwik Shinde. His experience mentions using Next.js, Sanity CMS, and MongoDB. It also talks about 10+ s
DataInspectorAgent.ts:352 🧠 DataInspector analyzing 2 documents with pure LLM intelligence
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: DataInspector - 15% ([23:25:11] Step 1/2: Analyzing Rutwik_resume.pdf)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
DataInspectorAgent.ts:453 🔍 DEBUG DataInspector Document 1 Sample Content: {chunksCount: 2, sampleLength: 1629, firstChunkPreview: 'Rutwik Shinde Software Developer | Pune rutwikshin…Developer, Ai Edx (Remote) 01/2024 – Present •...', hasActualContent: true}
DataInspectorAgent.ts:493 📤 DEBUG DataInspector Document 1 LLM Prompt: {promptLength: 2937, containsDocumentContent: true, contentSampleInPrompt: 'You are an intelligent document analyzer. Perform …twik187 | github.com/rutwik187 Experience Full...'}
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
analyzeDocumentIntelligently @ DataInspectorAgent.ts:499
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:369
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:285
performMultiDocumentAnalysis @ DataInspectorAgent.ts:172
DataInspectorAgent.ts:502 🧠 DataInspector Document 1 LLM Response: <think>
Okay, let's start by analyzing the document. The user provided two chunks, each with information about a person and their skills and projects. 

First, in the first chunk, the person is Rutwik Shinde, a Software Developer. They mention their experience as Full Stack AI Developer, working remotely for Ai Edx. They list several technologies and projects, like building frontend architecture, integrating APIs, using Next.js, MongoDB, and S3. Then, in the second chunk, they talk about tools l...
DataInspectorAgent.ts:511 🔍 DataInspector Document 1 Parsed: {docType: 'DOCUMENT', mainEntity: 'RUTWIK SHINDE', relevantText: 'NO', reasoning: 'The document contains information about Rutwik Shi…s professional experience and projects, but th...'}
DataInspectorAgent.ts:518 🔍 COMPREHENSIVE ANALYSIS: Query="give me the top 3 speed runs from tyler's blog", Entity="RUTWIK SHINDE" → Result: false
DataInspectorAgent.ts:371 🔍 Document 1 intelligent analysis: {docType: 'DOCUMENT', primaryEntity: 'RUTWIK SHINDE', isRelevant: false, reasoning: 'The document contains information about Rutwik Shi…s professional experience and projects, but th...'}
DataInspectorAgent.ts:408 ⏭️ Skipping irrelevant document: DOCUMENT (RUTWIK SHINDE) - The document contains information about Rutwik Shi...
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: DataInspector - 20% ([23:25:17] ⏭️ Skipping: RUTWIK SHINDE)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: DataInspector - 45% ([23:25:17] Step 2/2: Analyzing www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
DataInspectorAgent.ts:453 🔍 DEBUG DataInspector Document 2 Sample Content: {chunksCount: 6, sampleLength: 4901, firstChunkPreview: 'TYLER ROMERO POSTS Nano GPT Speedrun Living Worklo…omesomesomesomesomesome reallyreallyreallyreal...', hasActualContent: true}
DataInspectorAgent.ts:493 📤 DEBUG DataInspector Document 2 LLM Prompt: {promptLength: 6209, containsDocumentContent: true, contentSampleInPrompt: 'You are an intelligent document analyzer. Perform …s? March 8, 2025 I’ve seen somesomesomesomesom...'}
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
analyzeDocumentIntelligently @ DataInspectorAgent.ts:499
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:369
DataInspectorAgent.ts:502 🧠 DataInspector Document 2 LLM Response: <think>
Okay, let's start by understanding what the user is asking here. They want me to perform a comprehensive document analysis. The document they provided is a mix of text chunks, each describing different aspects of a Nano GPT Speedrun project. The user's goal is to analyze the content to determine if it contains information relevant to the query "give me the top 3 speed runs from tyler's blog."

First, I need to extract all the relevant information from the document. Let's go through each ...
DataInspectorAgent.ts:511 🔍 DataInspector Document 2 Parsed: {docType: 'DOCUMENT', mainEntity: 'TYLER ROMERO', relevantText: 'YES', reasoning: "The document includes information about speedrun r…ts from Tyler Romero's posts, directly address..."}
DataInspectorAgent.ts:518 🔍 COMPREHENSIVE ANALYSIS: Query="give me the top 3 speed runs from tyler's blog", Entity="TYLER ROMERO" → Result: true
DataInspectorAgent.ts:371 🔍 Document 2 intelligent analysis: {docType: 'DOCUMENT', primaryEntity: 'TYLER ROMERO', isRelevant: true, reasoning: "The document includes information about speedrun r…ts from Tyler Romero's posts, directly address..."}
DataInspectorAgent.ts:380 ✅ Including relevant document: DOCUMENT (TYLER ROMERO)
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: DataInspector - 50% ([23:26:19] ✅ Including: TYLER ROMERO)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
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
discoverContentAreas @ DataInspectorAgent.ts:682
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:389
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
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
discoverEntitiesIntelligently @ DataInspectorAgent.ts:638
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:392
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
discoverDocumentRole @ DataInspectorAgent.ts:740
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:395
DataInspectorAgent.ts:414 📊 Document filtering: 2 total → 1 relevant
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: DataInspector - 90% (Filtered 2 documents → 1 relevant)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
DataInspectorAgent.ts:301 📋 Multi-Document Analysis: 1 documents with 0 relationships
DataInspectorAgent.ts:332 🚨 CROSS-CONTAMINATION PREVENTION: Filtered RAG chunks from 8 to 6 (removed 2 irrelevant chunks)
DataInspectorAgent.ts:1270 🔬 DataInspector: Extracting query-relevant terms from 2 documents for: "give me the top 3 speed runs from tyler's blog"
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
analyzeQueryForContentPrioritization @ DataInspectorAgent.ts:1440
buildQueryAwareContentSample @ DataInspectorAgent.ts:1389
extractQueryRelevantTerms @ DataInspectorAgent.ts:1273
performMultiDocumentAnalysis @ DataInspectorAgent.ts:175
DataInspectorAgent.ts:1397 📊 Document 1: Sampling 2 of 2 chunks (100%)
DataInspectorAgent.ts:1397 📊 Document 2: Sampling 5 of 6 chunks (83%)
DataInspectorAgent.ts:1275 🔍 Content sample for technical extraction (6369 chars): --- DOCUMENT 1: Rutwik_resume.pdf ---
Rutwik Shinde Software Developer | Pune rutwikshinde34@gmail.com | 9370947507 | linkedin.com/in/rutwik187 | github.com/rutwik187 Experience Full Stack AI Develope...
DataInspectorAgent.ts:1284 🎯 Technical terms LLM response: <think>
Okay, let's tackle this query. The user is asking for the top 3 speed runs from Tyler's blog. Looking at the document content, I need to check which parts mention Tyler or speed runs.

First, DOCUMENT 1: Rutwik resume. It talks about his experience as a Full Stack AI Developer, integrating various technologies like Next.js, Sanity CMS, and Mongo DB. No mention of Tyler or speed runs here.

Then, DOCUMENT 2: Tyler Romero's posts. The title mentions "Nano GPT Speedrun" and some technical terms like training steps, tokens, and logit soft-capping. The user's query is about speed runs, so the key terms here would be "speed runs" and perhaps "Nano GPT speedrun." Also, the mention of training steps and tokens could be relevant. But the user is specifically asking for the top 3, so maybe the blog's posts themselves contribute. The document's content is about his work on GPT speedruns, so the main method or contribution would be the Nano GPT speedrun. Therefore, the relevant terms are "Nano GPT speedrun" and any related concepts like training steps or tokens. Since the user wants top 3, but there's no direct list, perhaps the answer is that the top speed runs from Tyler's blog are the Nano GPT speedruns mentioned. So the methods would be the Nano GPT speedrun, and the people involved are Tyler Romero.
</think>

METHODS: nano-gpt-speedrun  
CONCEPTS: training steps, tokens, logit soft-capping  
PEOPLE: tyler romero  
DATA_TYPES: speedruns, tokens, training steps
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
extractQueryRelevantTerms @ DataInspectorAgent.ts:1283
await in extractQueryRelevantTerms
performMultiDocumentAnalysis @ DataInspectorAgent.ts:175
DataInspectorAgent.ts:1343 🔍 Parsing methods line: "nano-gpt-speedrun"
DataInspectorAgent.ts:1348 ✅ Parsed methods: ['nano-gpt-speedrun']
DataInspectorAgent.ts:1352 🔍 Parsing concepts line: "training steps, tokens, logit soft-capping"
DataInspectorAgent.ts:1360 🔍 Parsing people line: "tyler romero"
DataInspectorAgent.ts:1368 🔍 Parsing data line: "speedruns, tokens, training steps"
DataInspectorAgent.ts:1288 🔍 Parsed technical terms: {methods: Array(1), concepts: Array(3), people: Array(1), data: Array(3)}
DataInspectorAgent.ts:1298 ✅ Document insights stored in context.sharedKnowledge: {methods: 1, concepts: 3, people: 1, data: 3}
DataInspectorAgent.ts:1307 📋 Extracted methods: ['nano-gpt-speedrun']
Orchestrator.ts:1633 ✅ Tool DataInspector completed in 117619ms
Orchestrator.ts:1920 🔍 Asking PlanningAgent to assess DataInspector results
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
assessResultQuality @ Orchestrator.ts:1921
executeToolCall @ Orchestrator.ts:1636
Orchestrator.ts:1637 🔍 Quality assessment for DataInspector: [insufficient]
Orchestrator.ts:1640 ⚠️ Result quality insufficient: The current context does not contain information about Tyler's blog or specific speed runs. The available data includes training concepts, but no details about the top 3 speed runs are extracted.
Orchestrator.ts:1646 📋 Continuing with current results, quality will be addressed by downstream agents
ResearchOrchestrator.ts:1752 ✅ Master Orchestrator Agent completed: DataInspector
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
Orchestrator.ts:543 🔄 Master LLM Iteration 2: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
Orchestrator.ts:727 🧠 Master LLM Decision Response (2849 chars): <think>
Okay, let's see. The user wants the top 3 speed runs from Tyler's blog, and I need to figure out which tool to call next. 

First, looking at the available documents, there are 6 chunks already available. The DataInspector has already analyzed those, so maybe they're ready for processing. But the PlanningAgent hasn't been called yet, which is crucial since they need to create an execution strategy. The current goal is to answer the query, so the next step should be to plan how to extract...
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (2849 chars): <think>
Okay, let's see. The user wants the top 3 speed runs from Tyler's blog, and I need to figure out which tool to call next. 

First, looking at the available documents, there are 6 chunks already available. The DataInspector has already analyzed those, so maybe they're ready for processing. But the PlanningAgent hasn't been called yet, which is crucial since they need to create an execution strategy. The current goal is to answer the query, so the next step should be to plan how to extract and process the data.

The user's query is about speed runs, so the focus is on data extraction. The available tools include PatternGenerator for content-aware patterns and Extractor for data extraction. However, the PlanningAgent is needed to create an intelligent execution plan. Since the user wa...
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): PlanningAgent
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PlanningAgent
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PlanningAgent', reasoning: 'Need to call PlanningAgent to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: PlanningAgent - Need to call PlanningAgent to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: PlanningAgent
Orchestrator.ts:1148 📋 Current agents called: [DataInspector]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1539 ✅ Agent execution validated: PlanningAgent execution is contextually appropriate
Orchestrator.ts:1618 🔧 Executing tool: PlanningAgent (original: PlanningAgent)
ResearchOrchestrator.ts:1663 🚀 Master Orchestrator Agent started: PlanningAgent (PlanningAgent)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
PlanningAgent.ts:61 🎯 PlanningAgent: Creating intelligent execution strategy for "give me the top 3 speed runs from tyler's blog"
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: PlanningAgent - 10% (Analyzing research context)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
PlanningAgent.ts:68 📊 Situation Analysis: {hasDocuments: true, documentCount: 6, hasDocumentAnalysis: true, relevantDocuments: 1, documentTypes: Array(1), …}
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: PlanningAgent - 25% (Creating extraction strategy from DataInspector analysis)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
PlanningAgent.ts:588 🎯 PlanningAgent: Creating extraction strategy from DataInspector analysis
PlanningAgent.ts:599 🧠 Document context analysis: {documentType: 'Research Paper', documentPurpose: 'General research', isMethodPaper: false, isSurveyPaper: false, mainContribution: 'nano-gpt-speedrun', …}
PlanningAgent.ts:608 🎯 Intelligent expectations: {shouldFindSpecificMethod: false, shouldFindComparisons: false, shouldInferFromContribution: false, expectedAnswerType: 'general_information', contextualReasoning: 'Standard extraction approach'}
PlanningAgent.ts:873 🎯 PlanningAgent: Assessing document-section relevance to query: "give me the top 3 speed runs from tyler's blog"
PlanningAgent.ts:936 🎯 PlanningAgent: Extracting query-aware pattern categories
PlanningAgent.ts:954 🎯 Query-relevant categories: (2) ['methods', 'concepts']
PlanningAgent.ts:993 ✅ Query-aware pattern categories: concepts: 5, methods: 1
PlanningAgent.ts:1055 🎯 Dynamic extraction targets based on analysis: (4) ['content', 'methods', 'concepts', 'primary_focus']
PlanningAgent.ts:630 ✅ Created extraction strategy: {documentType: 'Research Paper', queryIntent: 'general_information', contentAreas: 0, patternCategories: 2, extractionTargets: 4, …}
PlanningAgent.ts:83 ✅ Created extraction strategy with 2 pattern categories
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: PlanningAgent - 40% (Creating execution plan)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: PlanningAgent - 50% (Generating strategic plan with LLM)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
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
createExecutionPlan @ PlanningAgent.ts:209
process @ PlanningAgent.ts:90
await in process
executeToolCall @ Orchestrator.ts:1629
masterLLMOrchestration @ Orchestrator.ts:575
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: PlanningAgent - 60% (Parsing execution strategy)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
PlanningAgent.ts:354 🔄 PlanningAgent parsing attempt 1/4
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:356 🔧 Array element separation fixes applied
PlanningAgent.ts:374 ✅ Successfully parsed execution plan on attempt 1
PlanningAgent.ts:216 🎯 Generated execution plan: {strategy: 'structured synthesis under 100 chars', stepCount: 1, confidence: 0.8}
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: PlanningAgent - 80% (Storing execution plan)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: PlanningAgent - 100% (Execution plan completed)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
PlanningAgent.ts:108 ✅ Execution plan created: structured synthesis under 100 chars
Orchestrator.ts:1633 ✅ Tool PlanningAgent completed in 8727ms
Orchestrator.ts:1637 🔍 Quality assessment for PlanningAgent: acceptable
ResearchOrchestrator.ts:1752 ✅ Master Orchestrator Agent completed: PlanningAgent
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
Orchestrator.ts:543 🔄 Master LLM Iteration 3: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:727 🧠 Master LLM Decision Response (1894 chars): <think>
Okay, let's see. The user wants to know the top 3 speed runs from Tyler's blog. So first, I need to figure out which tools to use next.

From the available data, they mentioned that there are 6 chunks of documents. Since the user's query is about Tyler's blog, maybe the first step is to analyze those documents to find relevant information. But wait, the history shows that DataInspector was already called, which does the document filtering. So that's done. Then, the next step is to use Pl...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (1894 chars): <think>
Okay, let's see. The user wants to know the top 3 speed runs from Tyler's blog. So first, I need to figure out which tools to use next.

From the available data, they mentioned that there are 6 chunks of documents. Since the user's query is about Tyler's blog, maybe the first step is to analyze those documents to find relevant information. But wait, the history shows that DataInspector was already called, which does the document filtering. So that's done. Then, the next step is to use PlanningAgent to create an execution strategy. But the user's query is asking for the top 3, so maybe after extracting data, we need to use PatternGenerator to create the content. Wait, the PatternGenerator is available, but the current state shows that the extracted data hasn't been done yet. So mayb...
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): QueryPlanner
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=QueryPlanner
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'QueryPlanner', reasoning: 'Need to call QueryPlanner to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: QueryPlanner - Need to call QueryPlanner to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: QueryPlanner
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1434 ✅ QueryPlanner validated against execution plan - prerequisites met
Orchestrator.ts:1539 ✅ Agent execution validated: QueryPlanner execution follows planned sequence - step 1 of 1
Orchestrator.ts:1618 🔧 Executing tool: QueryPlanner (original: QueryPlanner)
ResearchOrchestrator.ts:1663 🚀 Master Orchestrator Agent started: QueryPlanner (QueryPlanner)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
QueryPlannerAgent.ts:25 🔍 QueryPlanner: Expanding query variations
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
process @ QueryPlannerAgent.ts:46
executeToolCall @ Orchestrator.ts:1629
masterLLMOrchestration @ Orchestrator.ts:575
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:356 🔧 Array element separation fixes applied
QueryPlannerAgent.ts:54 ✅ Generated 10 query variations
Orchestrator.ts:1633 ✅ Tool QueryPlanner completed in 7202ms
Orchestrator.ts:1920 🔍 Asking PlanningAgent to assess QueryPlanner results
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
assessResultQuality @ Orchestrator.ts:1921
executeToolCall @ Orchestrator.ts:1636
await in executeToolCall
masterLLMOrchestration @ Orchestrator.ts:575
Orchestrator.ts:1637 🔍 Quality assessment for QueryPlanner: [insufficient/retry_recommended]
Orchestrator.ts:1640 ⚠️ Result quality insufficient: The current context lacks specific information about the top 3 speed runs from Tyler's blog. The documents contain concepts like training steps, tokens, and logit soft-capping, but no details about the actual data points required (e.g., specific speedrun titles or rankings).
Orchestrator.ts:1643 🔄 Attempting intelligent retry for QueryPlanner
Orchestrator.ts:2065 🔄 Intelligent retry #1 for QueryPlanner: Extract the top 3 speedrun titles from the source content.
Orchestrator.ts:2080 🎯 Re-executing QueryPlanner with improvement guidance: Extract the top 3 speedrun titles from the source content.
QueryPlannerAgent.ts:25 🔍 QueryPlanner: Expanding query variations
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
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
process @ QueryPlannerAgent.ts:46
performIntelligentRetry @ Orchestrator.ts:2081
executeToolCall @ Orchestrator.ts:1644
await in executeToolCall
masterLLMOrchestration @ Orchestrator.ts:575
responseCompletion.ts:356 🔧 Array element separation fixes applied
QueryPlannerAgent.ts:54 ✅ Generated 10 query variations
ResearchOrchestrator.ts:1752 ✅ Master Orchestrator Agent completed: QueryPlanner
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
Orchestrator.ts:543 🔄 Master LLM Iteration 4: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
Orchestrator.ts:727 🧠 Master LLM Decision Response (1639 chars): <think>
Okay, let's see. The user wants the top 3 speed runs from Tyler's blog. The available tools are QueryPlanner, DataInspector, PlanningAgent, PatternGenerator, Extractor, DataAnalyzer, SynthesisCoordinator, Synthesizer, and ResponseFormatter.

First, the goal is to extract data from Tyler's blog. So the first step would be to use the tool that extracts data. The current available documents are 6 chunks, and DataInspector already analyzed them. The next step in the pipeline is QueryPlanner,...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (1639 chars): <think>
Okay, let's see. The user wants the top 3 speed runs from Tyler's blog. The available tools are QueryPlanner, DataInspector, PlanningAgent, PatternGenerator, Extractor, DataAnalyzer, SynthesisCoordinator, Synthesizer, and ResponseFormatter.

First, the goal is to extract data from Tyler's blog. So the first step would be to use the tool that extracts data. The current available documents are 6 chunks, and DataInspector already analyzed them. The next step in the pipeline is QueryPlanner, which is supposed to extract key elements. The user's query is about speed runs, so the next logical step is to call the QueryPlanner to gather relevant information. After that, the PatternGenerator might be used to create patterns, but since the user's query is about extracting data, maybe just us...
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): QueryPlanner
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=QueryPlanner
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'QueryPlanner', reasoning: 'Need to call QueryPlanner to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: QueryPlanner - Need to call QueryPlanner to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: QueryPlanner
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1434 ✅ QueryPlanner validated against execution plan - prerequisites met
Orchestrator.ts:1539 ✅ Agent execution validated: QueryPlanner execution follows planned sequence - step 1 of 1
Orchestrator.ts:1618 🔧 Executing tool: QueryPlanner (original: QueryPlanner)
ResearchOrchestrator.ts:1663 🚀 Master Orchestrator Agent started: QueryPlanner (QueryPlanner)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
QueryPlannerAgent.ts:25 🔍 QueryPlanner: Expanding query variations
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:356 🔧 Array element separation fixes applied
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
process @ QueryPlannerAgent.ts:46
executeToolCall @ Orchestrator.ts:1629
masterLLMOrchestration @ Orchestrator.ts:575
QueryPlannerAgent.ts:54 ✅ Generated 10 query variations
Orchestrator.ts:1633 ✅ Tool QueryPlanner completed in 7722ms
Orchestrator.ts:1920 🔍 Asking PlanningAgent to assess QueryPlanner results
Orchestrator.ts:1637 🔍 Quality assessment for QueryPlanner: [insufficient/retry_recommended]
Orchestrator.ts:1640 ⚠️ Result quality insufficient: The query requires information about speed runs from Tyler's blog, but the current context lacks specific details on that topic.
Orchestrator.ts:1643 🔄 Attempting intelligent retry for QueryPlanner
Orchestrator.ts:2065 🔄 Intelligent retry #2 for QueryPlanner: Include "Tyler's blog content" or "speedrun examples" as requested.
Orchestrator.ts:2080 🎯 Re-executing QueryPlanner with improvement guidance: Include "Tyler's blog content" or "speedrun examples" as requested.
QueryPlannerAgent.ts:25 🔍 QueryPlanner: Expanding query variations
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
assessResultQuality @ Orchestrator.ts:1921
executeToolCall @ Orchestrator.ts:1636
await in executeToolCall
masterLLMOrchestration @ Orchestrator.ts:575
scheduler.development.js:14 [Violation] 'message' handler took 152ms
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
process @ QueryPlannerAgent.ts:46
performIntelligentRetry @ Orchestrator.ts:2081
executeToolCall @ Orchestrator.ts:1644
await in executeToolCall
masterLLMOrchestration @ Orchestrator.ts:575
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:356 🔧 Array element separation fixes applied
QueryPlannerAgent.ts:54 ✅ Generated 10 query variations
ResearchOrchestrator.ts:1752 ✅ Master Orchestrator Agent completed: QueryPlanner
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
Orchestrator.ts:543 🔄 Master LLM Iteration 5: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:727 🧠 Master LLM Decision Response (936 chars): <think>
Okay, let's see. The user wants the top 3 speed runs from Tyler's blog. The available tools include QueryPlanner, which is supposed to extract elements. The current status shows that QueryPlanner is the next step, and they need to extract key elements. So the next action is to call QueryPlanner to get the information. The reasoning would be that QueryPlanner's plan is validated and will handle the extraction part, leading to the final goal of providing the answer.
</think>

ACTION: CALL_...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (936 chars): <think>
Okay, let's see. The user wants the top 3 speed runs from Tyler's blog. The available tools include QueryPlanner, which is supposed to extract elements. The current status shows that QueryPlanner is the next step, and they need to extract key elements. So the next action is to call QueryPlanner to get the information. The reasoning would be that QueryPlanner's plan is validated and will handle the extraction part, leading to the final goal of providing the answer.
</think>

ACTION: CALL_TOOL
TOOL_NAME: QueryPlanner  
REASONING: QueryPlanner is validated to extract key elements from available documents, which aligns with the goal of identifying the top 3 speed runs from Tyler's blog.  
NEXT_GOAL: extract key elements from available documents  
ACTION: COMPLETE  
REASONING: The plan ...
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): QueryPlanner
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=QueryPlanner
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'QueryPlanner', reasoning: 'Need to call QueryPlanner to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: QueryPlanner - Need to call QueryPlanner to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: QueryPlanner
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1434 ✅ QueryPlanner validated against execution plan - prerequisites met
Orchestrator.ts:1539 ✅ Agent execution validated: QueryPlanner execution follows planned sequence - step 1 of 1
Orchestrator.ts:1618 🔧 Executing tool: QueryPlanner (original: QueryPlanner)
ResearchOrchestrator.ts:1663 🚀 Master Orchestrator Agent started: QueryPlanner (QueryPlanner)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
QueryPlannerAgent.ts:25 🔍 QueryPlanner: Expanding query variations
scheduler.development.js:14 [Violation] 'message' handler took 180ms
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
process @ QueryPlannerAgent.ts:46
executeToolCall @ Orchestrator.ts:1629
masterLLMOrchestration @ Orchestrator.ts:575
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:356 🔧 Array element separation fixes applied
QueryPlannerAgent.ts:54 ✅ Generated 10 query variations
Orchestrator.ts:1633 ✅ Tool QueryPlanner completed in 13224ms
Orchestrator.ts:1920 🔍 Asking PlanningAgent to assess QueryPlanner results
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
assessResultQuality @ Orchestrator.ts:1921
executeToolCall @ Orchestrator.ts:1636
Orchestrator.ts:1637 🔍 Quality assessment for QueryPlanner: [insufficient/retry_recommended]
Orchestrator.ts:1640 ⚠️ Result quality insufficient: The current context contains terms like "nano-gpt-speedrun" and "training steps" but lacks specific information about the top 3 speed runs or Tyler's blog content.
Orchestrator.ts:1646 📋 Continuing with current results, quality will be addressed by downstream agents
ResearchOrchestrator.ts:1752 ✅ Master Orchestrator Agent completed: QueryPlanner
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
Orchestrator.ts:543 🔄 Master LLM Iteration 6: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1755107672324:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/71ff0d878996bda1.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1755107672324:1367
Promise.then
hotCheck @ webpack.js?v=1755107672324:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
webpack.js?v=1755107672324:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/4623dba52d8c017d.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1755107672324:1367
Promise.then
hotCheck @ webpack.js?v=1755107672324:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleApplyUpdates @ hot-reloader-client.js:123
eval @ hot-reloader-client.js:143
Promise.then
tryApplyUpdatesWebpack @ hot-reloader-client.js:142
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 2648ms
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
Orchestrator.ts:727 🧠 Master LLM Decision Response (1648 chars): <think>
Okay, the user is asking for the top 3 speed runs from Tyler's blog. Let me think about the tools available.

First, the available documents are 6 chunks. The DataInspector already did document analysis, so maybe that's done. The next step in the execution plan is PatternGenerator, which is the tool to create patterns for data extraction. Since the user wants the top 3, the PatternGenerator should be called next. 

Wait, the user's query is about extracting data, so the next tool is Patt...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (1648 chars): <think>
Okay, the user is asking for the top 3 speed runs from Tyler's blog. Let me think about the tools available.

First, the available documents are 6 chunks. The DataInspector already did document analysis, so maybe that's done. The next step in the execution plan is PatternGenerator, which is the tool to create patterns for data extraction. Since the user wants the top 3, the PatternGenerator should be called next. 

Wait, the user's query is about extracting data, so the next tool is PatternGenerator. The Extraction tool is available, but it's not called yet. But the PatternGenerator is the one that creates patterns for data extraction, so that's the right choice. So the next step is to call PatternGenerator to generate the patterns, then use those to extract data, then use the Synt...
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): PatternGenerator
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PatternGenerator
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PatternGenerator', reasoning: 'Need to call PatternGenerator to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: PatternGenerator - Need to call PatternGenerator to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: PatternGenerator
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent, QueryPlanner]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1403 🤔 PatternGenerator not explicitly in execution plan - validating as intelligent addition
Orchestrator.ts:1180 🧠 Validating intelligent addition: PatternGenerator
Orchestrator.ts:1181 📋 Original plan: [QueryPlanner]
Orchestrator.ts:1539 ✅ Agent execution validated: PatternGenerator can improve extraction quality - intelligent addition
Orchestrator.ts:1618 🔧 Executing tool: PatternGenerator (original: PatternGenerator)
ResearchOrchestrator.ts:1663 🚀 Master Orchestrator Agent started: PatternGenerator (PatternGenerator)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
PatternGeneratorAgent.ts:29 🎯 PatternGenerator: Creating extraction strategies
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: PatternGenerator - 10% (Analyzing existing patterns)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
PatternGeneratorAgent.ts:35 📋 DEBUG - Existing patterns before PatternGenerator: {count: 1, patterns: Array(1), hasSharedKnowledge: true}
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: PatternGenerator - 30% (Generating extraction strategies)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
PatternGeneratorAgent.ts:163 🧠 PatternGenerator: Generating dynamic patterns via LLM analysis
PatternGeneratorAgent.ts:170 ✅ Using PlanningAgent extraction strategy: {documentType: 'Research Paper', queryIntent: 'general_information', patternCategories: 2, availableStrategies: 1}
PatternGeneratorAgent.ts:1059 🎯 PatternGenerator: Creating patterns from extraction strategy
PatternGeneratorAgent.ts:1072 🔍 Safe categories initialized: {people: 0, methods: 1, concepts: 5, data: 0}
PatternGeneratorAgent.ts:1106 🔬 Creating enhanced patterns for 1 methods
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
PatternGeneratorAgent.ts:712 🔍 Starting triple-tier pattern parsing from LLM response (86 chars)
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
generateMethodPatterns @ PatternGeneratorAgent.ts:1281
generatePatternsFromStrategy @ PatternGeneratorAgent.ts:1107
generateStrategiesWithLLM @ PatternGeneratorAgent.ts:178
process @ PatternGeneratorAgent.ts:45
executeToolCall @ Orchestrator.ts:1629
masterLLMOrchestration @ Orchestrator.ts:575
PatternGeneratorAgent.ts:785 🧠 Found think content (2 chars): "

..."
PatternGeneratorAgent.ts:818 🔍 Attempting free-form pattern extraction from response
PatternGeneratorAgent.ts:731 ✅ Tier 3 SUCCESS: Found 3 patterns in free-form text
PatternGeneratorAgent.ts:1294 ✅ Generated 3 LLM-based patterns for "nano-gpt-speedrun"
PatternGeneratorAgent.ts:1114 💡 Creating enhanced patterns for 5 concepts
PatternGeneratorAgent.ts:712 🔍 Starting triple-tier pattern parsing from LLM response (63 chars)
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
generateConceptPatterns @ PatternGeneratorAgent.ts:1339
generatePatternsFromStrategy @ PatternGeneratorAgent.ts:1115
await in generatePatternsFromStrategy
generateStrategiesWithLLM @ PatternGeneratorAgent.ts:178
process @ PatternGeneratorAgent.ts:45
executeToolCall @ Orchestrator.ts:1629
masterLLMOrchestration @ Orchestrator.ts:575
PatternGeneratorAgent.ts:750 🔍 Found REGEX_PATTERNS section: "- /definition/gi
- /usage/gi..."
PatternGeneratorAgent.ts:957 🧪 Normalizing pattern: "/definition/gi"
PatternGeneratorAgent.ts:961 ✅ Already normalized: /definition/gi
PatternGeneratorAgent.ts:957 🧪 Normalizing pattern: "/usage/gi"
PatternGeneratorAgent.ts:961 ✅ Already normalized: /usage/gi
PatternGeneratorAgent.ts:717 ✅ Tier 1 SUCCESS: Found 2 patterns in structured format
PatternGeneratorAgent.ts:1352 ✅ Generated 2 LLM-based patterns for "top"
PatternGeneratorAgent.ts:712 🔍 Starting triple-tier pattern parsing from LLM response (50 chars)
PatternGeneratorAgent.ts:785 🧠 Found think content (2 chars): "

..."
PatternGeneratorAgent.ts:818 🔍 Attempting free-form pattern extraction from response
PatternGeneratorAgent.ts:731 ✅ Tier 3 SUCCESS: Found 2 patterns in free-form text
PatternGeneratorAgent.ts:1352 ✅ Generated 2 LLM-based patterns for "speed"
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
generateConceptPatterns @ PatternGeneratorAgent.ts:1339
await in generateConceptPatterns
generatePatternsFromStrategy @ PatternGeneratorAgent.ts:1115
await in generatePatternsFromStrategy
generateStrategiesWithLLM @ PatternGeneratorAgent.ts:178
process @ PatternGeneratorAgent.ts:45
executeToolCall @ Orchestrator.ts:1629
masterLLMOrchestration @ Orchestrator.ts:575
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
generateConceptPatterns @ PatternGeneratorAgent.ts:1339
await in generateConceptPatterns
generatePatternsFromStrategy @ PatternGeneratorAgent.ts:1115
await in generatePatternsFromStrategy
generateStrategiesWithLLM @ PatternGeneratorAgent.ts:178
process @ PatternGeneratorAgent.ts:45
executeToolCall @ Orchestrator.ts:1629
masterLLMOrchestration @ Orchestrator.ts:575
PatternGeneratorAgent.ts:712 🔍 Starting triple-tier pattern parsing from LLM response (57 chars)
PatternGeneratorAgent.ts:750 🔍 Found REGEX_PATTERNS section: "- /run/.gi
- /runs/.gi..."
PatternGeneratorAgent.ts:957 🧪 Normalizing pattern: "/run/.gi"
PatternGeneratorAgent.ts:984 ✅ Normalized raw: //run/.gi/gi
PatternGeneratorAgent.ts:957 🧪 Normalizing pattern: "/runs/.gi"
PatternGeneratorAgent.ts:984 ✅ Normalized raw: //runs/.gi/gi
PatternGeneratorAgent.ts:717 ✅ Tier 1 SUCCESS: Found 1 patterns in structured format
PatternGeneratorAgent.ts:1352 ✅ Generated 1 LLM-based patterns for "runs"
PatternGeneratorAgent.ts:712 🔍 Starting triple-tier pattern parsing from LLM response (62 chars)
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
generateConceptPatterns @ PatternGeneratorAgent.ts:1339
await in generateConceptPatterns
generatePatternsFromStrategy @ PatternGeneratorAgent.ts:1115
PatternGeneratorAgent.ts:750 🔍 Found REGEX_PATTERNS section: "- /tylers.*?/
- /tylers.*?/..."
PatternGeneratorAgent.ts:957 🧪 Normalizing pattern: "/tylers.*?/"
PatternGeneratorAgent.ts:961 ✅ Already normalized: /tylers.*?/
PatternGeneratorAgent.ts:957 🧪 Normalizing pattern: "/tylers.*?/"
PatternGeneratorAgent.ts:961 ✅ Already normalized: /tylers.*?/
PatternGeneratorAgent.ts:717 ✅ Tier 1 SUCCESS: Found 2 patterns in structured format
PatternGeneratorAgent.ts:1352 ✅ Generated 2 LLM-based patterns for "tylers"
PatternGeneratorAgent.ts:1122 📄 Adding Research Paper specific patterns
PatternGeneratorAgent.ts:1168 ✅ Generated 19 strategy-based patterns: (19) ['LLM-generated nano-gpt-speedrun pattern 1', 'LLM-generated nano-gpt-speedrun pattern 2', 'LLM-generated nano-gpt-speedrun pattern 3', 'Flexible term variant for method', 'LLM-generated top pattern 1', 'LLM-generated top pattern 2', 'LLM-generated speed pattern 1', 'LLM-generated speed pattern 2', 'LLM-generated runs pattern 1', 'LLM-generated tylers pattern 1', 'LLM-generated tylers pattern 2', 'Flexible term variant for concept', 'Flexible term variant for concept', 'Flexible term variant for concept', 'Flexible term variant for concept', 'Flexible term variant for concept', 'Abstract section', 'Results section', 'Performance metrics']
RAGTracker.ts:71 🔍 RAG Query started: rag_1755107957756_h1c0642qy - "nano-gpt-speedrun..."
VectorStore.ts:1024 🔍 RAG Query rag_1755107957756_h1c0642qy: Searching for "nano-gpt-speedrun" with threshold: 0.3
EmbeddingService.ts:177 🔍 Generating embedding for text (17 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 38ms
VectorStore.ts:1032 🧠 RAG Query rag_1755107957756_h1c0642qy: Generated embedding in 38ms
VectorStore.ts:772 📚 Retrieved 2 documents of type: userdocs
VectorStore.ts:1046 📚 RAG Query rag_1755107957756_h1c0642qy: Filtered to 2 documents of types: userdocs
RAGTracker.ts:120 ✅ RAG Query completed: rag_1755107957756_h1c0642qy - 5 results, avg similarity: 0.445, 59ms
VectorStore.ts:1105 ✅ RAG Query rag_1755107957756_h1c0642qy completed: {totalTime: '59ms', breakdown: {…}, results: '5/9 (filtered by limit)', avgSimilarity: '0.445', threshold: 0.3, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1755107957815_0pl93ky15 - "training steps..."
VectorStore.ts:1024 🔍 RAG Query rag_1755107957815_0pl93ky15: Searching for "training steps" with threshold: 0.3
EmbeddingService.ts:177 🔍 Generating embedding for text (14 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 9ms
VectorStore.ts:1032 🧠 RAG Query rag_1755107957815_0pl93ky15: Generated embedding in 9ms
VectorStore.ts:772 📚 Retrieved 2 documents of type: userdocs
VectorStore.ts:1046 📚 RAG Query rag_1755107957815_0pl93ky15: Filtered to 2 documents of types: userdocs
RAGTracker.ts:120 ✅ RAG Query completed: rag_1755107957815_0pl93ky15 - 5 results, avg similarity: 0.344, 10ms
VectorStore.ts:1105 ✅ RAG Query rag_1755107957815_0pl93ky15 completed: {totalTime: '10ms', breakdown: {…}, results: '5/6 (filtered by limit)', avgSimilarity: '0.344', threshold: 0.3, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1755107957825_edebijz6d - "tokens..."
VectorStore.ts:1024 🔍 RAG Query rag_1755107957825_edebijz6d: Searching for "tokens" with threshold: 0.3
EmbeddingService.ts:177 🔍 Generating embedding for text (6 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 9ms
VectorStore.ts:1032 🧠 RAG Query rag_1755107957825_edebijz6d: Generated embedding in 9ms
VectorStore.ts:772 📚 Retrieved 2 documents of type: userdocs
VectorStore.ts:1046 📚 RAG Query rag_1755107957825_edebijz6d: Filtered to 2 documents of types: userdocs
RAGTracker.ts:120 ✅ RAG Query completed: rag_1755107957825_edebijz6d - 1 results, avg similarity: 0.311, 9ms
VectorStore.ts:1105 ✅ RAG Query rag_1755107957825_edebijz6d completed: {totalTime: '9ms', breakdown: {…}, results: '1/1 (filtered by limit)', avgSimilarity: '0.311', threshold: 0.3, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1755107957834_px7i2gxiv - "logit soft-capping..."
VectorStore.ts:1024 🔍 RAG Query rag_1755107957834_px7i2gxiv: Searching for "logit soft-capping" with threshold: 0.3
EmbeddingService.ts:177 🔍 Generating embedding for text (18 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 14ms
VectorStore.ts:1032 🧠 RAG Query rag_1755107957834_px7i2gxiv: Generated embedding in 14ms
VectorStore.ts:772 📚 Retrieved 2 documents of type: userdocs
VectorStore.ts:1046 📚 RAG Query rag_1755107957834_px7i2gxiv: Filtered to 2 documents of types: userdocs
RAGTracker.ts:120 ✅ RAG Query completed: rag_1755107957834_px7i2gxiv - 1 results, avg similarity: 0.604, 14ms
VectorStore.ts:1105 ✅ RAG Query rag_1755107957834_px7i2gxiv completed: {totalTime: '14ms', breakdown: {…}, results: '1/1 (filtered by limit)', avgSimilarity: '0.604', threshold: 0.3, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1755107957848_am7qlztjr - "tyler romero..."
VectorStore.ts:1024 🔍 RAG Query rag_1755107957848_am7qlztjr: Searching for "tyler romero" with threshold: 0.3
EmbeddingService.ts:177 🔍 Generating embedding for text (12 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 10ms
VectorStore.ts:1032 🧠 RAG Query rag_1755107957848_am7qlztjr: Generated embedding in 10ms
VectorStore.ts:772 📚 Retrieved 2 documents of type: userdocs
VectorStore.ts:1046 📚 RAG Query rag_1755107957848_am7qlztjr: Filtered to 2 documents of types: userdocs
RAGTracker.ts:120 ✅ RAG Query completed: rag_1755107957848_am7qlztjr - 1 results, avg similarity: 0.331, 10ms
VectorStore.ts:1105 ✅ RAG Query rag_1755107957848_am7qlztjr completed: {totalTime: '10ms', breakdown: {…}, results: '1/1 (filtered by limit)', avgSimilarity: '0.331', threshold: 0.3, …}avgSimilarity: "0.331"breakdown: {embedding: '10ms', documents: '0ms', similarity: '0ms', ranking: '0ms'}documentsScanned: 2results: "1/1 (filtered by limit)"threshold: 0.3totalTime: "10ms"vectorsProcessed: 20[[Prototype]]: Object
PatternGeneratorAgent.ts:158 ✅ Induced 12 measurement families from document (style=dot, hits=209)
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: PatternGenerator - 85% (Learned 12 measurement families from document)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
ResearchOrchestrator.ts:1698 📊 Master Orchestrator Agent progress: PatternGenerator - 100% (Pattern generation completed)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
Orchestrator.ts:1633 ✅ Tool PatternGenerator completed in 4110ms
Orchestrator.ts:1920 🔍 Asking PlanningAgent to assess PatternGenerator results
hot-reloader-client.js:197 [Fast Refresh] rebuilding
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
assessResultQuality @ Orchestrator.ts:1921
executeToolCall @ Orchestrator.ts:1636
Orchestrator.ts:1637 🔍 Quality assessment for PatternGenerator: [insufficient]
Orchestrator.ts:1640 ⚠️ Result quality insufficient: The current context does not contain specific information about speed runs from Tyler's blog. While the documents mention training steps, tokens, and concepts related to speed runs, no details about individual speed runs or their top rankings are extracted.
Orchestrator.ts:1646 📋 Continuing with current results, quality will be addressed by downstream agents
ResearchOrchestrator.ts:1752 ✅ Master Orchestrator Agent completed: PatternGenerator
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
Orchestrator.ts:543 🔄 Master LLM Iteration 7: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
webpack.js?v=1755107672324:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/a71c68fe6d719354.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1755107672324:1367
Promise.then
hotCheck @ webpack.js?v=1755107672324:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 827ms
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
Orchestrator.ts:727 🧠 Master LLM Decision Response (2217 chars): <think>
Okay, let's see. The user is asking for the top 3 speed runs from Tyler's blog. First, I need to figure out which tool to call next. The available tools include DataInspector, PlanningAgent, PatternGenerator, Extractor, DataAnalyzer, SynthesisCoordinator, Synthesizer, and ResponseFormatter.

The goal is to get the top 3 speed runs from Tyler's blog. So, first, I should check if there's data already available. The current documents are 6 chunks, and DataInspector has already analyzed them...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (2217 chars): <think>
Okay, let's see. The user is asking for the top 3 speed runs from Tyler's blog. First, I need to figure out which tool to call next. The available tools include DataInspector, PlanningAgent, PatternGenerator, Extractor, DataAnalyzer, SynthesisCoordinator, Synthesizer, and ResponseFormatter.

The goal is to get the top 3 speed runs from Tyler's blog. So, first, I should check if there's data already available. The current documents are 6 chunks, and DataInspector has already analyzed them. The next steps are to extract data using the Extractor, because that's needed once DataInspector is done. 

Wait, but the user's query is to find the top 3, so maybe after extracting the data, we need to process it. However, the current state shows that DataAnalyzer is not yet called, and Synthesi...
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): Extractor
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=Extractor
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'Extractor', reasoning: 'Need to call Extractor to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: Extractor - Need to call Extractor to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: Extractor
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent, QueryPlanner, PatternGenerator]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1403 🤔 Extractor not explicitly in execution plan - validating as intelligent addition
Orchestrator.ts:1180 🧠 Validating intelligent addition: Extractor
Orchestrator.ts:1181 📋 Original plan: [QueryPlanner]
Orchestrator.ts:1193 ⚡ Extractor is essential for data extraction - allowing intelligent addition
Orchestrator.ts:1539 ✅ Agent execution validated: Extractor is essential for data extraction - intelligent addition to plan
Orchestrator.ts:1618 🔧 Executing tool: Extractor (original: Extractor)
ResearchOrchestrator.ts:1663 🚀 Master Orchestrator Agent started: Extractor (Extractor)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
ExtractionAgent.ts:28 ⛏️ Extractor: Processing 6 chunks
ExtractionAgent.ts:49 🔍 Pattern Analysis: 31 regex patterns, 1 descriptor patterns
ExtractionAgent.ts:52 🎯 Using REGEX MODE: Found 31 regex patterns from PatternGenerator
ExtractionAgent.ts:53 📋 Regex patterns: /nano-gpt-speedrun/gi, /speedrun/gi, /nano-gpt-performance/gi, /(?:nano\s*[-_]?\s*gpt\s*[-_]?\s*speedrun)/i, /definition/gi, /usage/gi, /speed/gi, /speed usage/gi, //runs/.gi/gi, /tylers.*?/, /tylers.*?/, /(?:top)/i, /(?:speed)/i, /(?:runs)/i, /(?:tylers)/i, /(?:blog)/i, /(?:abstract|summary):\s*([^\n]{50,300})/gi, /(?:results?|conclusions?):\s*([^\n]{30,200})/gi, /(?:accuracy|performance|score|metric)\s*:?\s*([\d.]+%?)/gi, /((?:\d+(?:\.\d+)?)\s*gemma)/gi, /((?:\d+(?:\.\d+)?)\s*grad62304977grad62)/gi, /((?:\d+(?:\.\d+)?)\s*c32f8b3c32f8b3c32f8b)/gi, /((?:\d+(?:\.\d+)?)\s*f8b3c32f8b3c32f8b3c3)/gi, /((?:\d+(?:\.\d+)?)\s*b3c32f8b3c32f8b3c32f)/gi, /((?:\d+(?:\.\d+)?)\s*bb93fb7bb93fb7bb93fb)/gi, /((?:\d+(?:\.\d+)?)\s*fb7bb93fb7bb93fb7bb9)/gi, /((?:\d+(?:\.\d+)?)\s*dd59944dd59944dd5994)/gi, /((?:\d+(?:\.\d+)?)\s*eab4412eab4412eab441)/gi, /((?:\d+(?:\.\d+)?)\s*gpt2gpt2gpt2gpt2)/gi, /((?:\d+(?:\.\d+)?)\s*x)/gi, /((?:\d+(?:\.\d+)?)\s*hours)/gi
ExtractionAgent.ts:800 🎯 Starting REGEX extraction with 31 patterns
ExtractionAgent.ts:806 📊 Processing 6 chunks with 31 regex patterns
ExtractionAgent.ts:853 ✅ Worker regex extraction completed with 180 items
ExtractionAgent.ts:858 🎯 REGEX extraction complete: 180 items extracted
ExtractionAgent.ts:151 📊 Extraction Statistics:
ExtractionAgent.ts:152 - Total extracted: 180
ExtractionAgent.ts:153 - After deduplication: 6
ExtractionAgent.ts:154 - Items with time values: 0
ExtractionAgent.ts:155 - Table rows: 0
ExtractionAgent.ts:156 - Current records: 0
ExtractionAgent.ts:159 📈 Item types:
ExtractionAgent.ts:161   - unknown: 6
ExtractionAgent.ts:131 ✅ Extraction complete: 6 items found
Orchestrator.ts:1633 ✅ Tool Extractor completed in 61ms
Orchestrator.ts:1920 🔍 Asking PlanningAgent to assess Extractor results
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
assessResultQuality @ Orchestrator.ts:1921
executeToolCall @ Orchestrator.ts:1636
await in executeToolCall
masterLLMOrchestration @ Orchestrator.ts:575
Orchestrator.ts:1637 🔍 Quality assessment for Extractor: INSUFFICIENT
Orchestrator.ts:1640 ⚠️ Result quality insufficient: The current context does not explicitly state the top 3 speed runs from Tyler's blog. While relevant terms like "speed runs" and "training steps" are present, no specific details about the top 3 or Tyler's blog content are extracted.
Orchestrator.ts:1646 📋 Continuing with current results, quality will be addressed by downstream agents
ResearchOrchestrator.ts:1752 ✅ Master Orchestrator Agent completed: Extractor
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
Orchestrator.ts:543 🔄 Master LLM Iteration 8: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:727 🧠 Master LLM Decision Response (1420 chars): <think>
Okay, so the user is asking for the top 3 speed runs from Tyler's blog. Let me think about how to approach this. 

First, the available documents are 6 chunks, and the previous steps have already analyzed and extracted data. The PlanningAgent was used to create the execution plan, which is done. Now, the DataAnalyzer is needed because the final answer requires synthesizing the data, but the user hasn't provided the final answer yet. Wait, the current answer is "No final answer yet," so m...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (1420 chars): <think>
Okay, so the user is asking for the top 3 speed runs from Tyler's blog. Let me think about how to approach this. 

First, the available documents are 6 chunks, and the previous steps have already analyzed and extracted data. The PlanningAgent was used to create the execution plan, which is done. Now, the DataAnalyzer is needed because the final answer requires synthesizing the data, but the user hasn't provided the final answer yet. Wait, the current answer is "No final answer yet," so maybe the next step is to call SynthesisCoordinator to make the final report.

The available tools are DataAnalyzer, SynthesisCoordinator, and SynthesisCoordinator is already available. So the next logical step is to use SynthesisCoordinator. The reasoning would be that synthesizing the extracted dat...
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): SynthesisCoordinator
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=SynthesisCoordinator
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'SynthesisCoordinator', reasoning: 'Need to call SynthesisCoordinator to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: SynthesisCoordinator - Need to call SynthesisCoordinator to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: SynthesisCoordinator
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent, QueryPlanner, PatternGenerator, Extractor]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1403 🤔 SynthesisCoordinator not explicitly in execution plan - validating as intelligent addition
Orchestrator.ts:1180 🧠 Validating intelligent addition: SynthesisCoordinator
Orchestrator.ts:1181 📋 Original plan: [QueryPlanner]
Orchestrator.ts:1247 ⚠️ Unknown agent SynthesisCoordinator exists in registry - allowing but with caution
Orchestrator.ts:1539 ✅ Agent execution validated: SynthesisCoordinator exists in registry - allowing as potential intelligent addition
Orchestrator.ts:1618 🔧 Executing tool: SynthesisCoordinator (original: SynthesisCoordinator)
ResearchOrchestrator.ts:1663 🚀 Master Orchestrator Agent started: SynthesisCoordinator (SynthesisCoordinator)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
SynthesisCoordinator.ts:39 🎯 SynthesisCoordinator: Using extracted data (6 items)
SynthesisCoordinator.ts:46 🎯 SynthesisCoordinator: Assembling final report from 0 sections
SynthesisCoordinator.ts:89 🎯 SynthesisCoordinator: Generating query-focused report for: "give me the top 3 speed runs from tyler's blog"
SynthesisCoordinator.ts:101 🎯 Ranked 6 data items by query relevance
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
generateQueryFocusedReport @ SynthesisCoordinator.ts:107
assembleReport @ SynthesisCoordinator.ts:82
process @ SynthesisCoordinator.ts:49
executeToolCall @ Orchestrator.ts:1629
masterLLMOrchestration @ Orchestrator.ts:575
Orchestrator.ts:1633 ✅ Tool SynthesisCoordinator completed in 6007ms
Orchestrator.ts:1920 🔍 Asking PlanningAgent to assess SynthesisCoordinator results
Orchestrator.ts:1637 🔍 Quality assessment for SynthesisCoordinator: Insufficient
Orchestrator.ts:1640 ⚠️ Result quality insufficient: The current context does not provide specific information about the top 3 speed runs from Tyler's blog. While extracted terms like "speedruns" and "training steps" are available, there is no direct or explicit mention of rankings or specific entries.
Orchestrator.ts:1646 📋 Continuing with current results, quality will be addressed by downstream agents
ResearchOrchestrator.ts:1752 ✅ Master Orchestrator Agent completed: SynthesisCoordinator
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
assessResultQuality @ Orchestrator.ts:1921
executeToolCall @ Orchestrator.ts:1636
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
Orchestrator.ts:543 🔄 Master LLM Iteration 9: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:727 🧠 Master LLM Decision Response (1748 chars): <think>
Okay, let's see. The user is asking for the top 3 speed runs from Tyler's blog. First, I need to figure out which tool to use next. The available documents are 6 chunks, and the execution plan is active. 

The available tools are QueryPlanner, DataInspector, PlanningAgent, PatternGenerator, Extractor, DataAnalyzer, SynthesisCoordinator, SynthesisCoordinator (already called), and Synthesizer (already called). Wait, there's a SynthesisCoordinator again, which is already called. But the use...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (1748 chars): <think>
Okay, let's see. The user is asking for the top 3 speed runs from Tyler's blog. First, I need to figure out which tool to use next. The available documents are 6 chunks, and the execution plan is active. 

The available tools are QueryPlanner, DataInspector, PlanningAgent, PatternGenerator, Extractor, DataAnalyzer, SynthesisCoordinator, SynthesisCoordinator (already called), and Synthesizer (already called). Wait, there's a SynthesisCoordinator again, which is already called. But the user mentioned to use the exact names above.

First, check if DataAnalyzer is needed. The user hasn't analyzed the data yet, so maybe they need to clean it. But the current answer is ready, so maybe the next step is to use SynthesisCoordinator. However, the DataAnalyzer is part of the data processing p...
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): SynthesisCoordinator
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=SynthesisCoordinator
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'SynthesisCoordinator', reasoning: 'Need to call SynthesisCoordinator to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: SynthesisCoordinator - Need to call SynthesisCoordinator to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: SynthesisCoordinator
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent, QueryPlanner, PatternGenerator, Extractor, SynthesisCoordinator]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1403 🤔 SynthesisCoordinator not explicitly in execution plan - validating as intelligent addition
Orchestrator.ts:1180 🧠 Validating intelligent addition: SynthesisCoordinator
Orchestrator.ts:1181 📋 Original plan: [QueryPlanner]
Orchestrator.ts:1247 ⚠️ Unknown agent SynthesisCoordinator exists in registry - allowing but with caution
Orchestrator.ts:1539 ✅ Agent execution validated: SynthesisCoordinator exists in registry - allowing as potential intelligent addition
Orchestrator.ts:1580 ⚠️ Agent SynthesisCoordinator already called, skipping to prevent redundant processing
overrideMethod @ hook.js:608
executeToolCall @ Orchestrator.ts:1580
masterLLMOrchestration @ Orchestrator.ts:575
Orchestrator.ts:1586 📋 Agent SynthesisCoordinator was already executed successfully.
Orchestrator.ts:1587 📊 Current Pipeline Status: COMPLETED ✅ - All 1 planned steps executed
Orchestrator.ts:1588 💡 Next Step Guidance: 
📊 **PIPELINE PROGRESS**:
✅ QueryPlanner

✅ **All planned steps completed** - Pipeline execution finished.
Consider: option1, option2.

Orchestrator.ts:1613 🎯 Recommended Next Action: Continue to next agent in pipeline
Orchestrator.ts:543 🔄 Master LLM Iteration 10: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:727 🧠 Master LLM Decision Response (1650 chars): <think>
Okay, let's see. The user wants the top 3 speed runs from Tyler's blog. First, I need to figure out which tool to call next. The available documents are 6 chunks, and I already used DataInspector, PlanningAgent, PatternGenerator, and Extractor. So far, those tools have been called, and the next step is DataAnalyzer, which cleans and categorizes the extracted data. But wait, the user's query is about speed runs, which might be part of the data extraction process. The PatternGenerator gene...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (1650 chars): <think>
Okay, let's see. The user wants the top 3 speed runs from Tyler's blog. First, I need to figure out which tool to call next. The available documents are 6 chunks, and I already used DataInspector, PlanningAgent, PatternGenerator, and Extractor. So far, those tools have been called, and the next step is DataAnalyzer, which cleans and categorizes the extracted data. But wait, the user's query is about speed runs, which might be part of the data extraction process. The PatternGenerator generated 32 patterns, but maybe the actual data is already extracted through the Extractor. But the user's goal is to find the top 3, so maybe the next step is to use DataAnalyzer to categorize the data, then use SynthesisCoordinator to combine it into a final answer. Since the user's current answer is...
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): DataAnalyzer
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataAnalyzer
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataAnalyzer', reasoning: 'Need to call DataAnalyzer to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: DataAnalyzer - Need to call DataAnalyzer to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: DataAnalyzer
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent, QueryPlanner, PatternGenerator, Extractor, SynthesisCoordinator]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1403 🤔 DataAnalyzer not explicitly in execution plan - validating as intelligent addition
Orchestrator.ts:1180 🧠 Validating intelligent addition: DataAnalyzer
Orchestrator.ts:1181 📋 Original plan: [QueryPlanner]
Orchestrator.ts:1247 ⚠️ Unknown agent DataAnalyzer exists in registry - allowing but with caution
Orchestrator.ts:1539 ✅ Agent execution validated: DataAnalyzer exists in registry - allowing as potential intelligent addition
Orchestrator.ts:1618 🔧 Executing tool: DataAnalyzer (original: DataAnalyzer)
ResearchOrchestrator.ts:1663 🚀 Master Orchestrator Agent started: DataAnalyzer (DataAnalyzer)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
DataAnalysisAgent.ts:50 🔍 DataAnalyzer: Processing 6 extracted items
DataAnalysisAgent.ts:55 🧹 After cleaning: 5 items remain
DataAnalysisAgent.ts:278 🎯 DataAnalyzer: Filtering 5 items for query relevance
DataAnalysisAgent.ts:284 🔍 Query key terms: (8) ['give', 'the', 'top', 'speed', 'runs', 'from', 'tylers', 'blog']
DataAnalysisAgent.ts:285 🔍 Query intent: general_query
DataAnalysisAgent.ts:294 🔍 PlanningAgent categories available: Yes
DataAnalysisAgent.ts:296 📋 Categories: methods(0), concepts(0), people(0)
DataAnalysisAgent.ts:307 ❌ Filtered out low-relevance item: "Speedrun" (score: 21%)
DataAnalysisAgent.ts:307 ❌ Filtered out low-relevance item: "Nano GPT Speedrun" (score: 21%)
DataAnalysisAgent.ts:307 ❌ Filtered out low-relevance item: "Speed" (score: 24%)
DataAnalysisAgent.ts:307 ❌ Filtered out low-relevance item: "runs" (score: 24%)
DataAnalysisAgent.ts:307 ❌ Filtered out low-relevance item: "blog" (score: 24%)
DataAnalysisAgent.ts:319 🎯 Query filtering complete: 0/5 items kept
DataAnalysisAgent.ts:60 🎯 After query filtering: 0 items remain (5 irrelevant items removed)
Orchestrator.ts:1633 ✅ Tool DataAnalyzer completed in 5ms
Orchestrator.ts:1920 🔍 Asking PlanningAgent to assess DataAnalyzer results
Orchestrator.ts:1637 🔍 Quality assessment for DataAnalyzer: [insufficient/retry_recommended]
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
assessResultQuality @ Orchestrator.ts:1921
executeToolCall @ Orchestrator.ts:1636
await in executeToolCall
masterLLMOrchestration @ Orchestrator.ts:575
Orchestrator.ts:1640 ⚠️ Result quality insufficient: The current context lacks specific information about the top 3 speed runs from Tyler's blog. The required details (speedruns, Tyler's blog, top 3) are not present in the documents.
Orchestrator.ts:1643 🔄 Attempting intelligent retry for DataAnalyzer
Orchestrator.ts:2065 🔄 Intelligent retry #1 for DataAnalyzer: Request specific details about the top 3 speed runs from Tyler's blog in the extracted documents.
Orchestrator.ts:2080 🎯 Re-executing DataAnalyzer with improvement guidance: Request specific details about the top 3 speed runs from Tyler's blog in the extracted documents.
ResearchOrchestrator.ts:1752 ✅ Master Orchestrator Agent completed: DataAnalyzer
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
Orchestrator.ts:543 🔄 Master LLM Iteration 11: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1755107672324:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/80a374e39281eff9.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1755107672324:1367
Promise.then
hotCheck @ webpack.js?v=1755107672324:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1903ms
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:727 🧠 Master LLM Decision Response (2110 chars): <think>
Okay, let's see. The user is asking for the top 3 speed runs from Tyler's blog. First, I need to check which tool to use next. From the available documents, there are 6 chunks, and the previous agents like DataInspector, PlanningAgent, and Extractor were already called. The current step is to determine the next tool call.

The key here is to follow the execution plan. The execution plan is active, so I should use the PlanningAgent. The PlanningAgent was already called and generated 32 pa...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (2110 chars): <think>
Okay, let's see. The user is asking for the top 3 speed runs from Tyler's blog. First, I need to check which tool to use next. From the available documents, there are 6 chunks, and the previous agents like DataInspector, PlanningAgent, and Extractor were already called. The current step is to determine the next tool call.

The key here is to follow the execution plan. The execution plan is active, so I should use the PlanningAgent. The PlanningAgent was already called and generated 32 patterns. The next step would be to use the PlanningAgent again to create an execution strategy. Then, once the execution strategy is validated, the data will be processed by the DataAnalyzer. Finally, the SynthesisCoordinator will generate the final answer.

Wait, but the user's query is about the to...
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): PlanningAgent
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PlanningAgent
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PlanningAgent', reasoning: 'Need to call PlanningAgent to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: PlanningAgent - Need to call PlanningAgent to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: PlanningAgent
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent, QueryPlanner, PatternGenerator, Extractor, SynthesisCoordinator]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1403 🤔 PlanningAgent not explicitly in execution plan - validating as intelligent addition
Orchestrator.ts:1180 🧠 Validating intelligent addition: PlanningAgent
Orchestrator.ts:1181 📋 Original plan: [QueryPlanner]
Orchestrator.ts:1539 ✅ Agent execution validated: PlanningAgent can revise execution strategy - intelligent addition
Orchestrator.ts:1580 ⚠️ Agent PlanningAgent already called, skipping to prevent redundant processing
overrideMethod @ hook.js:608
executeToolCall @ Orchestrator.ts:1580
masterLLMOrchestration @ Orchestrator.ts:575
Orchestrator.ts:1586 📋 Agent PlanningAgent was already executed successfully.
Orchestrator.ts:1587 📊 Current Pipeline Status: COMPLETED ✅ - All 1 planned steps executed
Orchestrator.ts:1588 💡 Next Step Guidance: 
📊 **PIPELINE PROGRESS**:
✅ QueryPlanner

✅ **All planned steps completed** - Pipeline execution finished.
Consider: option1, option2.

Orchestrator.ts:1613 🎯 Recommended Next Action: Continue to next agent in pipeline
Orchestrator.ts:543 🔄 Master LLM Iteration 12: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:727 🧠 Master LLM Decision Response (1968 chars): <think>
Okay, so the user is asking for the top 3 speed runs from Tyler's blog. Let me think about how to approach this. The available documents are 6 chunks, and I need to use the tools already called to figure this out.

First, the task is to identify the top 3 speed runs from Tyler's blog, which probably relates to blog content or articles. The available tools include DataAnalyzer, which is supposed to clean and categorize extracted data. Since the user's query is about the blog, the DataAnal...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (1968 chars): <think>
Okay, so the user is asking for the top 3 speed runs from Tyler's blog. Let me think about how to approach this. The available documents are 6 chunks, and I need to use the tools already called to figure this out.

First, the task is to identify the top 3 speed runs from Tyler's blog, which probably relates to blog content or articles. The available tools include DataAnalyzer, which is supposed to clean and categorize extracted data. Since the user's query is about the blog, the DataAnalyzer would be the right tool to use here.

Wait, but the user hasn't provided any specific data yet. The current answer is ready, but maybe the next step is to call DataAnalyzer to process the existing documents. If there's no data extracted yet, then we can't proceed with any other tools. So the ne...
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): DataAnalyzer
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataAnalyzer
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataAnalyzer', reasoning: 'Need to call DataAnalyzer to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: DataAnalyzer - Need to call DataAnalyzer to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: DataAnalyzer
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent, QueryPlanner, PatternGenerator, Extractor, SynthesisCoordinator]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1403 🤔 DataAnalyzer not explicitly in execution plan - validating as intelligent addition
Orchestrator.ts:1180 🧠 Validating intelligent addition: DataAnalyzer
Orchestrator.ts:1181 📋 Original plan: [QueryPlanner]
Orchestrator.ts:1247 ⚠️ Unknown agent DataAnalyzer exists in registry - allowing but with caution
Orchestrator.ts:1539 ✅ Agent execution validated: DataAnalyzer exists in registry - allowing as potential intelligent addition
Orchestrator.ts:1618 🔧 Executing tool: DataAnalyzer (original: DataAnalyzer)
ResearchOrchestrator.ts:1663 🚀 Master Orchestrator Agent started: DataAnalyzer (DataAnalyzer)
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
Orchestrator.ts:1633 ✅ Tool DataAnalyzer completed in 0ms
Orchestrator.ts:1920 🔍 Asking PlanningAgent to assess DataAnalyzer results
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
assessResultQuality @ Orchestrator.ts:1921
executeToolCall @ Orchestrator.ts:1636
await in executeToolCall
masterLLMOrchestration @ Orchestrator.ts:575
Orchestrator.ts:1637 🔍 Quality assessment for DataAnalyzer: insufficient
Orchestrator.ts:1640 ⚠️ Result quality insufficient: The current context lacks specific information about Tyler's blog or the top 3 speed runs. The documents only mention terms like methods, training steps, and data without details on content or specifics related to the query.
Orchestrator.ts:1646 📋 Continuing with current results, quality will be addressed by downstream agents
ResearchOrchestrator.ts:1752 ✅ Master Orchestrator Agent completed: DataAnalyzer
useResearch.ts:975 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1755107687637_1_jv4kx
useResearch.ts:979 📋 Skipping duplicate step processing: master_orchestrator_1755107687637_1_jv4kx_in_progress
Orchestrator.ts:543 🔄 Master LLM Iteration 13: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
Orchestrator.ts:727 🧠 Master LLM Decision Response (1723 chars): <think>
Okay, let's see. The user wants the top 3 speed runs from Tyler's blog. First, I need to check the tools available. The available tools are QueryPlanner, DataInspector, PlanningAgent, PatternGenerator, Extractor, DataAnalyzer, SynthesisCoordinator, Synthesizer, and ResponseFormatter.

The goal is to find the top 3 speed runs from Tyler's blog. The current state shows that the documents are 6 chunks available, and DataAnalyzer hasn't been called yet. Also, no data extracted yet. The Execu...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (1723 chars): <think>
Okay, let's see. The user wants the top 3 speed runs from Tyler's blog. First, I need to check the tools available. The available tools are QueryPlanner, DataInspector, PlanningAgent, PatternGenerator, Extractor, DataAnalyzer, SynthesisCoordinator, Synthesizer, and ResponseFormatter.

The goal is to find the top 3 speed runs from Tyler's blog. The current state shows that the documents are 6 chunks available, and DataAnalyzer hasn't been called yet. Also, no data extracted yet. The Execution Plan is active, meaning it's validated. The PlanningAgent was already called, so maybe the next step is to use the DataAnalyzer to process the data.

Wait, the DataAnalyzer is already called. But the user's query is about extracting data. Since no data is extracted yet, the next step should be ...
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): DATAANALYZER
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DATAANALYZER
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DATAANALYZER', reasoning: 'Need to call DATAANALYZER to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: DATAANALYZER - Need to call DATAANALYZER to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: DataAnalyzer
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent, QueryPlanner, PatternGenerator, Extractor, SynthesisCoordinator, DataAnalyzer]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1403 🤔 DataAnalyzer not explicitly in execution plan - validating as intelligent addition
Orchestrator.ts:1180 🧠 Validating intelligent addition: DataAnalyzer
Orchestrator.ts:1181 📋 Original plan: [QueryPlanner]
Orchestrator.ts:1247 ⚠️ Unknown agent DataAnalyzer exists in registry - allowing but with caution
Orchestrator.ts:1539 ✅ Agent execution validated: DataAnalyzer exists in registry - allowing as potential intelligent addition
Orchestrator.ts:1580 ⚠️ Agent DataAnalyzer already called, skipping to prevent redundant processing
overrideMethod @ hook.js:608
executeToolCall @ Orchestrator.ts:1580
masterLLMOrchestration @ Orchestrator.ts:575
Orchestrator.ts:1586 📋 Agent DataAnalyzer was already executed successfully.
Orchestrator.ts:1587 📊 Current Pipeline Status: COMPLETED ✅ - All 1 planned steps executed
Orchestrator.ts:1588 💡 Next Step Guidance: 
📊 **PIPELINE PROGRESS**:
✅ QueryPlanner

✅ **All planned steps completed** - Pipeline execution finished.
Consider: option1, option2.

Orchestrator.ts:1613 🎯 Recommended Next Action: Continue to next agent in pipeline
Orchestrator.ts:543 🔄 Master LLM Iteration 14: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
scheduler.development.js:14 [Violation] 'message' handler took 202ms
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:727 🧠 Master LLM Decision Response (958 chars): <think>
Okay, let's see. The user is asking for the top 3 speed runs from Tyler's blog. They mentioned that they have 6 chunks of documents available, and the previous agents like DataInspector, PlanningAgent, and PatternGenerator have already been called. The DataAnalyzer is skipped because it's already executed, so I need to proceed.

The current data available is that documents are analyzed and there's no extracted data yet. The next step is to call the SynthesisCoordinator, which is needed a...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (958 chars): <think>
Okay, let's see. The user is asking for the top 3 speed runs from Tyler's blog. They mentioned that they have 6 chunks of documents available, and the previous agents like DataInspector, PlanningAgent, and PatternGenerator have already been called. The DataAnalyzer is skipped because it's already executed, so I need to proceed.

The current data available is that documents are analyzed and there's no extracted data yet. The next step is to call the SynthesisCoordinator, which is needed after DataAnalyzer. The user's goal is to get the top 3, so the Synthesis process is the next phase. Therefore, the correct tool to call is SynthesisCoordinator.
</think>

ACTION: CALL_TOOL
TOOL_NAME: SynthesisCoordinator
REASONING: The plan requires synthesizing the extracted data to answer the quer...
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): SynthesisCoordinator
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=SynthesisCoordinator
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'SynthesisCoordinator', reasoning: 'Need to call SynthesisCoordinator to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: SynthesisCoordinator - Need to call SynthesisCoordinator to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: SynthesisCoordinator
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent, QueryPlanner, PatternGenerator, Extractor, SynthesisCoordinator, DataAnalyzer]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1403 🤔 SynthesisCoordinator not explicitly in execution plan - validating as intelligent addition
Orchestrator.ts:1180 🧠 Validating intelligent addition: SynthesisCoordinator
Orchestrator.ts:1181 📋 Original plan: [QueryPlanner]
Orchestrator.ts:1247 ⚠️ Unknown agent SynthesisCoordinator exists in registry - allowing but with caution
Orchestrator.ts:1539 ✅ Agent execution validated: SynthesisCoordinator exists in registry - allowing as potential intelligent addition
Orchestrator.ts:1580 ⚠️ Agent SynthesisCoordinator already called, skipping to prevent redundant processing
overrideMethod @ hook.js:608
executeToolCall @ Orchestrator.ts:1580
masterLLMOrchestration @ Orchestrator.ts:575
Orchestrator.ts:1586 📋 Agent SynthesisCoordinator was already executed successfully.
Orchestrator.ts:1587 📊 Current Pipeline Status: COMPLETED ✅ - All 1 planned steps executed
Orchestrator.ts:1588 💡 Next Step Guidance: 
📊 **PIPELINE PROGRESS**:
✅ QueryPlanner

✅ **All planned steps completed** - Pipeline execution finished.
Consider: option1, option2.

Orchestrator.ts:1613 🎯 Recommended Next Action: Continue to next agent in pipeline
Orchestrator.ts:543 🔄 Master LLM Iteration 15: Answer the user's query: "give me the top 3 speed runs from tyler's blog"
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
makeMasterLLMDecision @ Orchestrator.ts:724
masterLLMOrchestration @ Orchestrator.ts:546
Orchestrator.ts:727 🧠 Master LLM Decision Response (1855 chars): <think>
Okay, let's see. The user is asking for the top 3 speed runs from Tyler's blog. So first, I need to figure out which tool to call next. 

The available tools are QueryPlanner, DataInspector, PlanningAgent, PatternGenerator, Extractor, DataAnalyzer, SynthesisCoordinator, SynthesisCoordinator (already called), and Synthesizer (legacy). The user's query is about extracting data, so maybe the next step is to use the DataAnalyzer. Wait, the DataAnalyzer is already called, so maybe not. But th...
Orchestrator.ts:998 🔍 PARSING DEBUG: Full response (1855 chars): <think>
Okay, let's see. The user is asking for the top 3 speed runs from Tyler's blog. So first, I need to figure out which tool to call next. 

The available tools are QueryPlanner, DataInspector, PlanningAgent, PatternGenerator, Extractor, DataAnalyzer, SynthesisCoordinator, SynthesisCoordinator (already called), and Synthesizer (legacy). The user's query is about extracting data, so maybe the next step is to use the DataAnalyzer. Wait, the DataAnalyzer is already called, so maybe not. But the user hasn't extracted any data yet, so perhaps the next step is to process it. 

Wait, the instruction says to use the next available tool based on the current available data. Since the documents are 6 chunks available, maybe the next step is to process that data. But the user's query is about fin...
Orchestrator.ts:1011 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1014 🎯 PARSED TOOL_NAME (FIRST): SynthesisCoordinator
Orchestrator.ts:1023 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1030 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=SynthesisCoordinator
Orchestrator.ts:730 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'SynthesisCoordinator', reasoning: 'Need to call SynthesisCoordinator to progress toward the goal'}
Orchestrator.ts:574 🔧 Master LLM calling tool: SynthesisCoordinator - Need to call SynthesisCoordinator to progress toward the goal
Orchestrator.ts:1147 🔍 PLAN-GUIDED VALIDATION: SynthesisCoordinator
Orchestrator.ts:1148 📋 Current agents called: [DataInspector, PlanningAgent, QueryPlanner, PatternGenerator, Extractor, SynthesisCoordinator, DataAnalyzer]
Orchestrator.ts:1149 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1403 🤔 SynthesisCoordinator not explicitly in execution plan - validating as intelligent addition
Orchestrator.ts:1180 🧠 Validating intelligent addition: SynthesisCoordinator
Orchestrator.ts:1181 📋 Original plan: [QueryPlanner]
Orchestrator.ts:1247 ⚠️ Unknown agent SynthesisCoordinator exists in registry - allowing but with caution
Orchestrator.ts:1539 ✅ Agent execution validated: SynthesisCoordinator exists in registry - allowing as potential intelligent addition
Orchestrator.ts:1580 ⚠️ Agent SynthesisCoordinator already called, skipping to prevent redundant processing
overrideMethod @ hook.js:608
executeToolCall @ Orchestrator.ts:1580
masterLLMOrchestration @ Orchestrator.ts:575
Orchestrator.ts:1586 📋 Agent SynthesisCoordinator was already executed successfully.
Orchestrator.ts:1587 📊 Current Pipeline Status: COMPLETED ✅ - All 1 planned steps executed
Orchestrator.ts:1588 💡 Next Step Guidance: 
📊 **PIPELINE PROGRESS**:
✅ QueryPlanner

✅ **All planned steps completed** - Pipeline execution finished.
Consider: option1, option2.

Orchestrator.ts:1613 🎯 Recommended Next Action: Continue to next agent in pipeline
Orchestrator.ts:615 ⚠️ Master LLM reached maximum iterations (15)
overrideMethod @ hook.js:608
masterLLMOrchestration @ Orchestrator.ts:615
Orchestrator.ts:326 📝 Master Orchestrator final result: {hasAnswer: true, answerLength: 607, preview: `From the relevant data, the top 3 speed runs from Tyler's blog are:  \n1. **"Speedrun"** (from the bl`}
ResearchOrchestrator.ts:1817 ✅ Master Orchestrator generated answer with 7 agent calls
useResearch.ts:975 📋 Step update: synthesis - completed - ID: master_orchestrator_1755107687637_1_jv4kx
ResearchSteps.tsx:543 🚫 Preventing duplicate step addition: master_orchestrator_1755107687637_1_jv4kx
ResearchSteps.tsx:543 🚫 Preventing duplicate step addition: master_orchestrator_1755107687637_1_jv4kx
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1755107672324:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/ce471131bf959613.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1755107672324:1367
Promise.then
hotCheck @ webpack.js?v=1755107672324:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 2420ms
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
report-hmr-latency.js:14 [Fast Refresh] done in 242ms
webpack.js?v=1755107672324:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/21495cd71aef1d27.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1755107672324:1367
Promise.then
hotCheck @ webpack.js?v=1755107672324:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
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
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1755107672324:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/99bd18e64a0eaccf.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1755107672324:1367
Promise.then
hotCheck @ webpack.js?v=1755107672324:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 262ms
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
webpack.js?v=1755107672324:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/1b70d4ea4a3d0931.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1755107672324:1367
Promise.then
hotCheck @ webpack.js?v=1755107672324:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 754ms
scheduler.development.js:14 [Violation] 'message' handler took 160ms
PerplexityStyleResearch.tsx:99 ✅ Multi-Agent Process details copied to clipboard
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1755107672324:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/896b40bad0ee397a.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1755107672324:1367
Promise.then
hotCheck @ webpack.js?v=1755107672324:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1707ms
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
[Violation] 'load' handler took 163ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 203ms
