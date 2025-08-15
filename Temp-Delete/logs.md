analytics.ts:160 📱 Device Info Collected: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', platform: 'MacIntel', vendor: 'Google Inc.', language: 'en-US', languages: Array(4), …}
analytics.ts:177 [Violation] Only request geolocation information in response to a user gesture.
collectLocationInfo @ analytics.ts:177
Analytics @ analytics.ts:75
eval @ analytics.ts:556
(app-pages-browser)/./src/lib/analytics.ts @ layout.js:7974
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
fn @ webpack.js?v=1755293842147:369
eval @ Analytics.tsx:10
(app-pages-browser)/./src/components/analytics/Analytics.tsx @ layout.js:7820
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
fn @ webpack.js?v=1755293842147:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false!:5
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false! @ layout.js:4998
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
__webpack_exec__ @ layout.js:8073
(anonymous) @ layout.js:8074
__webpack_require__.O @ webpack.js?v=1755293842147:84
(anonymous) @ layout.js:8075
webpackJsonpCallback @ webpack.js?v=1755293842147:1388
(anonymous) @ layout.js:9
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
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
fn @ webpack.js?v=1755293842147:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7842
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
fn @ webpack.js?v=1755293842147:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false!:11
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false! @ layout.js:4998
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
__webpack_exec__ @ layout.js:8073
(anonymous) @ layout.js:8074
__webpack_require__.O @ webpack.js?v=1755293842147:84
(anonymous) @ layout.js:8075
webpackJsonpCallback @ webpack.js?v=1755293842147:1388
(anonymous) @ layout.js:9
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.16841956577578, longitude: 72.84669162851696, …}
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
VectorStore.ts:1789 🧠 Starting immediate Xenova download in background...
VectorStore.ts:1806 🔄 Initializing web worker (attempt 1/3)...
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1755293842147:160
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
fn @ webpack.js?v=1755293842147:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1755293842147:182
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
__webpack_exec__ @ main-app.js?v=1755293842147:2824
(anonymous) @ main-app.js?v=1755293842147:2825
webpackJsonpCallback @ webpack.js?v=1755293842147:1388
(anonymous) @ main-app.js?v=1755293842147:9
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1755293842147:160
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
fn @ webpack.js?v=1755293842147:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1755293842147:182
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
__webpack_exec__ @ main-app.js?v=1755293842147:2824
(anonymous) @ main-app.js?v=1755293842147:2825
webpackJsonpCallback @ webpack.js?v=1755293842147:1388
(anonymous) @ main-app.js?v=1755293842147:9
scheduler.development.js:14 [Violation] 'message' handler took 350ms
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1755293842147:160
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
fn @ webpack.js?v=1755293842147:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1755293842147:182
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
__webpack_exec__ @ main-app.js?v=1755293842147:2824
(anonymous) @ main-app.js?v=1755293842147:2825
webpackJsonpCallback @ webpack.js?v=1755293842147:1388
(anonymous) @ main-app.js?v=1755293842147:9
VectorStore.ts:323 📄 Creating documents collection...
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1755293842147:160
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
fn @ webpack.js?v=1755293842147:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1755293842147:182
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
__webpack_exec__ @ main-app.js?v=1755293842147:2824
(anonymous) @ main-app.js?v=1755293842147:2825
webpackJsonpCallback @ webpack.js?v=1755293842147:1388
(anonymous) @ main-app.js?v=1755293842147:9
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1755293842147:160
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
fn @ webpack.js?v=1755293842147:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1755293842147:182
options.factory @ webpack.js?v=1755293842147:712
__webpack_require__ @ webpack.js?v=1755293842147:37
__webpack_exec__ @ main-app.js?v=1755293842147:2824
(anonymous) @ main-app.js?v=1755293842147:2825
webpackJsonpCallback @ webpack.js?v=1755293842147:1388
(anonymous) @ main-app.js?v=1755293842147:9
embeddingWorker.js:231 🔧 Text processing worker loaded successfully
embeddingWorker.js:59 🔧 Initializing text processing worker...
embeddingWorker.js:73 ✅ Text processing worker initialized successfully
DocumentProcessor.ts:116 ✅ Text processing worker ready
DocumentProcessor.ts:125 ✅ DocumentProcessor initialization complete (embeddings will load when needed)
VectorStore.ts:1808 ✅ Web worker initialized successfully
VectorStore.ts:1826 🧠 Starting Xenova embedding service download...
EmbeddingService.ts:69 🧠 Starting Xenova embedding service initialization...
EmbeddingService.ts:77 ✅ Loading model (checking cache)...
EmbeddingService.ts:84 📦 Loading Xenova/all-MiniLM-L6-v2 model from Hugging Face CDN...
analytics.ts:363 📊 GA4: Page view tracked - DeepResearch-TimeCapsule
Analytics.tsx:69 📊 Analytics: Tracked page view - DeepResearch-TimeCapsule (/deep-research)
useOllamaConnection.ts:132 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ useOllamaConnection.ts:132
useOllamaConnection.useCallback[connect] @ useOllamaConnection.ts:226
useOllamaConnection.useEffect.autoReconnect @ useOllamaConnection.ts:578
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58d1v898116370za200zd898116370&_p=1755293845624&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528501~104684208~104684211~104948811~104948813~105033763~105033765~105102052~105103161~105103163~105231383~105231385&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=1&sid=1755270354&sct=38&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=3742".
Zc @ js?id=G-V1B8R98P79:242
um @ js?id=G-V1B8R98P79:424
ZM @ js?id=G-V1B8R98P79:904
k.flush @ js?id=G-V1B8R98P79:911
k.Jb @ js?id=G-V1B8R98P79:909
k.add @ js?id=G-V1B8R98P79:911
k.Il @ js?id=G-V1B8R98P79:926
k.Up @ js?id=G-V1B8R98P79:926
(anonymous) @ js?id=G-V1B8R98P79:923
qn @ js?id=G-V1B8R98P79:441
wp @ js?id=G-V1B8R98P79:461
(anonymous) @ js?id=G-V1B8R98P79:923
c @ js?id=G-V1B8R98P79:860
(anonymous) @ js?id=G-V1B8R98P79:861
Promise.then
wJ @ js?id=G-V1B8R98P79:861
k.Tp @ js?id=G-V1B8R98P79:923
c @ js?id=G-V1B8R98P79:938
v @ js?id=G-V1B8R98P79:480
zn @ js?id=G-V1B8R98P79:443
br @ js?id=G-V1B8R98P79:480
ar.flush @ js?id=G-V1B8R98P79:484
ar.push @ js?id=G-V1B8R98P79:482
Tq @ js?id=G-V1B8R98P79:477
event @ js?id=G-V1B8R98P79:737
uD @ js?id=G-V1B8R98P79:743
b.push @ js?id=G-V1B8R98P79:749
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
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58d1v898116370za200zd898116370&_p=1755293845624&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528501~104684208~104684211~104948811~104948813~105033763~105033765~105102052~105103161~105103163~105231383~105231385&sr=2240x1260&cid=995334552.1754650390&ul=en-us&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&sid=1755270354&sct=38&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-15T21%3A37%3A25.650Z&epn.page_duration=2&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=139.0.0.0&ep.viewport_size=2240x875&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&tfd=3751".
Zc @ js?id=G-V1B8R98P79:242
um @ js?id=G-V1B8R98P79:424
ZM @ js?id=G-V1B8R98P79:904
k.flush @ js?id=G-V1B8R98P79:911
k.Jb @ js?id=G-V1B8R98P79:909
k.add @ js?id=G-V1B8R98P79:911
k.Il @ js?id=G-V1B8R98P79:926
k.Up @ js?id=G-V1B8R98P79:926
(anonymous) @ js?id=G-V1B8R98P79:923
qn @ js?id=G-V1B8R98P79:441
wp @ js?id=G-V1B8R98P79:461
(anonymous) @ js?id=G-V1B8R98P79:923
c @ js?id=G-V1B8R98P79:860
wJ @ js?id=G-V1B8R98P79:860
k.Tp @ js?id=G-V1B8R98P79:923
c @ js?id=G-V1B8R98P79:938
v @ js?id=G-V1B8R98P79:480
zn @ js?id=G-V1B8R98P79:443
br @ js?id=G-V1B8R98P79:480
ar.flush @ js?id=G-V1B8R98P79:484
ar.push @ js?id=G-V1B8R98P79:482
Tq @ js?id=G-V1B8R98P79:477
event @ js?id=G-V1B8R98P79:737
uD @ js?id=G-V1B8R98P79:743
b.push @ js?id=G-V1B8R98P79:749
qD @ js?id=G-V1B8R98P79:749
yD @ js?id=G-V1B8R98P79:749
OI @ js?id=G-V1B8R98P79:841
JI @ js?id=G-V1B8R98P79:840
(anonymous) @ js?id=G-V1B8R98P79:844
setTimeout
Rc @ js?id=G-V1B8R98P79:239
RI @ js?id=G-V1B8R98P79:844
(anonymous) @ js?id=G-V1B8R98P79:347
k.invoke @ js?id=G-V1B8R98P79:254
Za @ js?id=G-V1B8R98P79:218
wd.evaluate @ js?id=G-V1B8R98P79:256
Sd @ js?id=G-V1B8R98P79:271
k.invoke @ js?id=G-V1B8R98P79:254
Za @ js?id=G-V1B8R98P79:218
Ya @ js?id=G-V1B8R98P79:217
(anonymous) @ js?id=G-V1B8R98P79:278
k.invoke @ js?id=G-V1B8R98P79:254
Za @ js?id=G-V1B8R98P79:218
k.Wn @ js?id=G-V1B8R98P79:220
cf @ js?id=G-V1B8R98P79:289
(anonymous) @ js?id=G-V1B8R98P79:775
ag @ js?id=G-V1B8R98P79:304
e @ js?id=G-V1B8R98P79:719
wC @ js?id=G-V1B8R98P79:720
AC @ js?id=G-V1B8R98P79:725
uD @ js?id=G-V1B8R98P79:744
b.push @ js?id=G-V1B8R98P79:749
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
useOllamaConnection.ts:174 ✅ Ollama connection test passed, sorted models: (6) ['gemma3n:e2b', 'hf.co/bubblspace/Timecapsule2.7B-g3n-mix-match-gguf:latest', 'llama3.1:8b', 'llama3.2:1b', 'qwen3:0.6b', 'tinyllama:1.1b']
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
initializeXenovaService @ VectorStore.ts:1834
startImmediateBackgroundDownload @ VectorStore.ts:1795
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58d1v898116370za200zd898116370&_p=1755293845624&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528501~104684208~104684211~104948811~104948813~105033763~105033765~105102052~105103161~105103163~105231383~105231385&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=3&sid=1755270354&sct=38&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=scroll&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&epn.percent_scrolled=90&tfd=3903".
Zc @ js?id=G-V1B8R98P79:242
um @ js?id=G-V1B8R98P79:424
ZM @ js?id=G-V1B8R98P79:904
k.flush @ js?id=G-V1B8R98P79:911
k.Jb @ js?id=G-V1B8R98P79:909
k.add @ js?id=G-V1B8R98P79:911
k.Il @ js?id=G-V1B8R98P79:926
k.Up @ js?id=G-V1B8R98P79:926
(anonymous) @ js?id=G-V1B8R98P79:923
qn @ js?id=G-V1B8R98P79:441
wp @ js?id=G-V1B8R98P79:461
(anonymous) @ js?id=G-V1B8R98P79:923
c @ js?id=G-V1B8R98P79:860
wJ @ js?id=G-V1B8R98P79:860
k.Tp @ js?id=G-V1B8R98P79:923
c @ js?id=G-V1B8R98P79:938
v @ js?id=G-V1B8R98P79:480
zn @ js?id=G-V1B8R98P79:443
br @ js?id=G-V1B8R98P79:480
ar.flush @ js?id=G-V1B8R98P79:484
ar.push @ js?id=G-V1B8R98P79:482
Tq @ js?id=G-V1B8R98P79:477
event @ js?id=G-V1B8R98P79:737
uD @ js?id=G-V1B8R98P79:743
b.push @ js?id=G-V1B8R98P79:749
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
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58d1v898116370za200zd898116370&_p=1755293845624&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528501~104684208~104684211~104948811~104948813~105033763~105033765~105102052~105103161~105103163~105231383~105231385&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&dt=DeepResearch-TimeCapsule&dl=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&sid=1755270354&sct=38&seg=1&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=research&ep.page_type=application&ep.pathname=%2Fdeep-research&ep.consent_analytics=true&ep.consent_functional=true&tfd=3907".
Zc @ js?id=G-V1B8R98P79:242
um @ js?id=G-V1B8R98P79:424
ZM @ js?id=G-V1B8R98P79:904
k.flush @ js?id=G-V1B8R98P79:911
k.Jb @ js?id=G-V1B8R98P79:909
k.add @ js?id=G-V1B8R98P79:911
k.Il @ js?id=G-V1B8R98P79:926
k.Up @ js?id=G-V1B8R98P79:926
(anonymous) @ js?id=G-V1B8R98P79:923
qn @ js?id=G-V1B8R98P79:441
wp @ js?id=G-V1B8R98P79:461
(anonymous) @ js?id=G-V1B8R98P79:923
c @ js?id=G-V1B8R98P79:860
wJ @ js?id=G-V1B8R98P79:860
k.Tp @ js?id=G-V1B8R98P79:923
c @ js?id=G-V1B8R98P79:938
v @ js?id=G-V1B8R98P79:480
zn @ js?id=G-V1B8R98P79:443
br @ js?id=G-V1B8R98P79:480
ar.flush @ js?id=G-V1B8R98P79:484
ar.push @ js?id=G-V1B8R98P79:482
Tq @ js?id=G-V1B8R98P79:477
event @ js?id=G-V1B8R98P79:737
uD @ js?id=G-V1B8R98P79:743
b.push @ js?id=G-V1B8R98P79:749
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
useDocuments.ts:72 📊 Document status updated: {documents: 2, totalSize: '1.5 MB', totalChunks: 20, totalVectors: 20, avgChunksPerDoc: '10.0', …}
EmbeddingService.ts:129 ✅ Model loaded successfully
EmbeddingService.ts:147 ✅ Model loaded from cache instantly
VectorStore.ts:1840 📊 Xenova progress: Embedding model ready (100%)
EmbeddingService.ts:156 ✅ EmbeddingService initialized successfully
VectorStore.ts:1846 ✅ Xenova embedding service ready
VectorStore.ts:1797 ✅ Immediate background download completed
VectorStore.ts:282 ✅ Xenova model loaded from cache - all features ready
VectorStore.ts:291 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
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
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58d1v898116370za200zd898116370&_p=1755293845624&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528501~104684208~104684211~104948811~104948813~105033763~105033765~105102052~105103161~105103163~105231383~105231385&sr=2240x1260&cid=995334552.1754650390&ul=en-us&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=5&sid=1755270354&sct=38&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-15T21%3A37%3A25.910Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=139.0.0.0&ep.viewport_size=2240x875&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&tfd=8909".
Zc @ js?id=G-V1B8R98P79:242
um @ js?id=G-V1B8R98P79:424
ZM @ js?id=G-V1B8R98P79:904
k.flush @ js?id=G-V1B8R98P79:911
(anonymous) @ js?id=G-V1B8R98P79:909
prompt-input.tsx:483 🔍 Submit context check: {enableRAG: true, webSearchEnabled: false, webSearchConfigured: false, hasRAGSearch: true, hasWebSearch: true}
prompt-input.tsx:504 🧠 Skipping initial RAG search for deep-research - Master Orchestrator will handle DataInspector magic filtering
prompt-input.tsx:509 🚫 UI web search disabled - WebSearchAgent will handle intelligent web expansion when needed
useResearch.ts:1202 ✅ Main step created at research start: "multi_agent_research"
useResearch.ts:1214 🔬 Starting intelligent research for: "give top 3 speed run from Tyler's blog"
Orchestrator.ts:402 🧠 Master LLM Orchestrator starting for: "give top 3 speed run from Tyler's blog"
Orchestrator.ts:417 🎯 Master Orchestrator: Discovering documents for query "give top 3 speed run from Tyler's blog"
Orchestrator.ts:453 🔍 Discovering documents for query: "give top 3 speed run from Tyler's blog"
VectorStore.ts:794 🔍 getDocumentMetadata: Filtering for document types [userdocs]
useResearchHistory.ts:147 ✅ Saved 10 research sessions (10.0KB)
useResearchHistory.ts:147 ✅ Saved 10 research sessions (10.0KB)
VectorStore.ts:856 🔍 getDocumentMetadata: Retrieved 2 documents (filtered for: userdocs)
Orchestrator.ts:457 📚 Found 2 user documents
Orchestrator.ts:484 ✅ Master Orchestrator: Prepared 2 document metadata for DataInspector analysis
Orchestrator.ts:781 🎯 Master LLM analyzing situation and planning tool calls...
Orchestrator.ts:789 🔄 Master LLM Iteration 1: Answer the user's query: "give top 3 speed run from Tyler's blog"
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je58d1v898116370za200zd898116370&_p=1755293845624&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528501~104684208~104684211~104948811~104948813~105033763~105033765~105102052~105103161~105103163~105231383~105231385&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not%253BA%253DBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B139.0.7258.67%7CChromium%3B139.0.7258.67&uamb=0&uam=&uap=macOS&uapv=15.6.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=6&sid=1755270354&sct=38&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=8751&tfd=23105".
Zc @ js?id=G-V1B8R98P79:242
um @ js?id=G-V1B8R98P79:424
ZM @ js?id=G-V1B8R98P79:904
k.flush @ js?id=G-V1B8R98P79:911
(anonymous) @ js?id=G-V1B8R98P79:909
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
makeMasterLLMDecision @ Orchestrator.ts:983
masterLLMOrchestration @ Orchestrator.ts:792
research @ Orchestrator.ts:430
await in research
useResearch.useCallback[performIntelligentResearch] @ useResearch.ts:1227
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
Orchestrator.ts:986 🧠 Master LLM Decision Response (2416 chars): <think>
Okay, let's see. The user wants the top 3 speed run from Tyler's blog. The available data includes 2 chunks of documents, and I need to check the tools available. The data analysis phase is done, the execution plan is available, patterns are generated, and the data extracted is pending. The current answer is not yet done. 

First, the goal is to provide the top 3 speed run from Tyler's blog. Since the user's query is a direct question, maybe the answer is in the data. But wait, the data ...
Orchestrator.ts:1307 🔍 PARSING DEBUG: Full response (2416 chars): <think>
Okay, let's see. The user wants the top 3 speed run from Tyler's blog. The available data includes 2 chunks of documents, and I need to check the tools available. The data analysis phase is done, the execution plan is available, patterns are generated, and the data extracted is pending. The current answer is not yet done. 

First, the goal is to provide the top 3 speed run from Tyler's blog. Since the user's query is a direct question, maybe the answer is in the data. But wait, the data available is two chunks. The problem is that the DataAnalyzer is bypassed, so maybe the data is already in the SynthesisCoordinator's step. However, the user hasn't called any of the agents yet. The PlanningAgent is supposed to create the execution plan, but it's not called yet. 

Wait, the current ...
Orchestrator.ts:1320 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1323 🎯 PARSED TOOL_NAME (FIRST): DataInspector
Orchestrator.ts:1332 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1339 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataInspector
Orchestrator.ts:989 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataInspector', reasoning: 'Need to call DataInspector to progress toward the goal'}
Orchestrator.ts:820 🔧 Master LLM calling tool: DataInspector - Need to call DataInspector to progress toward the goal
Orchestrator.ts:2356 🔧 Attempting intelligent fallback for: "DataInspector"
Orchestrator.ts:2376 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
Orchestrator.ts:2356 🔧 Attempting intelligent fallback for: "DataInspector"
Orchestrator.ts:2376 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
Orchestrator.ts:1464 🔍 PLAN-GUIDED VALIDATION: DataInspector
Orchestrator.ts:1465 📋 Agent Status: No agents called yet
Orchestrator.ts:1466 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1920 ✅ Agent execution validated: DataInspector always allowed as first agent
Orchestrator.ts:2026 🔧 Executing tool: DataInspector (original: DataInspector)
useResearch.ts:957 🚀 Agent DataInspector (DataInspector) started
useResearch.ts:964 ❌ START ERROR: Main step not found for agent "DataInspector". This should not happen!
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
useResearch.useMemo[progressCallback] @ useResearch.ts:964
startAgent @ AgentProgress.ts:75
executeToolCall @ Orchestrator.ts:2035
masterLLMOrchestration @ Orchestrator.ts:821
useResearch.ts:1008 📊 Agent DataInspector: 5% - Initializing document analysis
DataInspectorAgent.ts:55 🔎 DataInspector: Received document metadata - performing multi-document sampling and analysis
useResearch.ts:1008 📊 Agent DataInspector: 10% - Starting multi-document analysis
DataInspectorAgent.ts:1199 🧠 DataInspector Magic: Starting multi-document sampling and filtering
DataInspectorAgent.ts:1211 📋 Found 2 documents to analyze: (2) ['userdocs', 'userdocs']
DataInspectorAgent.ts:1236 🔍 Sampling real chunks from 2 documents for intelligent analysis
useResearch.ts:1008 📊 Agent DataInspector: 15% - Sampling real chunks from 2 documents
DataInspectorAgent.ts:1257 🔍 Sampling chunks from document 1/2: userdocs
DataInspectorAgent.ts:1324 ✅ Sampled 2 real chunks from "userdocs" (2 total chunks)
DataInspectorAgent.ts:1257 🔍 Sampling chunks from document 2/2: userdocs
DataInspectorAgent.ts:1324 ✅ Sampled 6 real chunks from "userdocs" (18 total chunks)
DataInspectorAgent.ts:1359 ✅ Sampled chunks from 2 documents with real content
DataInspectorAgent.ts:1362 🧠 Analyzing 2 documents with real sampled content for intelligent relevance decisions
DataInspectorAgent.ts:227 🔍 Multi-document analysis: 2 documents detected
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
performMultiDocumentAnalysis @ DataInspectorAgent.ts:267
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:1363
await in performDocumentMetadataAnalysis
process @ DataInspectorAgent.ts:57
executeToolCall @ Orchestrator.ts:2037
masterLLMOrchestration @ Orchestrator.ts:821
DataInspectorAgent.ts:268 🤖 Multi-document analysis: <think>
Okay, let's tackle this step by step. The user is asking for top 3 speed runs from Tyler's blog. First, I need to analyze the documents provided.

Starting with DOCUMENT 1. The sample content mentions Rutwik Shinde with a LinkedIn profile and GitHub. But the query is about Tyler's blog. Sinc
DataInspectorAgent.ts:458 🧠 DataInspector analyzing 2 documents with pure LLM intelligence
useResearch.ts:1008 📊 Agent DataInspector: 15% - [03:08:07] Step 1/2: Analyzing doc_1755067261690_sinzqcf6a
DataInspectorAgent.ts:560 🔍 DEBUG DataInspector Document 1 Sample Content: {chunksCount: 2, sampleLength: 1629, firstChunkPreview: 'Rutwik Shinde Software Developer | Pune rutwikshin…Developer, Ai Edx (Remote) 01/2024 – Present •...', hasActualContent: true}
DataInspectorAgent.ts:630 📤 DEBUG DataInspector Document 1 LLM Prompt: {promptLength: 4806, containsDocumentContent: true, contentSampleInPrompt: 'You are an intelligent document analyzer. Perform …twik187 | github.com/rutwik187 Experience Full...'}
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
analyzeDocumentIntelligently @ DataInspectorAgent.ts:636
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:475
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:388
performMultiDocumentAnalysis @ DataInspectorAgent.ts:271
DataInspectorAgent.ts:639 🧠 DataInspector Document 1 LLM Response: <think>
Okay, let me start by analyzing the document. The user provided two chunks, and I need to do a comprehensive analysis. First, I'll extract all information from the document.

For topics, the document mentions things like Full Stack AI Developers, AI Edx, and web development technologies like Next.js, Sanity CMS, and MongoDB. It also talks about integration with Stripe and Razorpay, real-time features, and serverless services. So the topics are web development, AI, and backend technologie...
DataInspectorAgent.ts:648 🔍 DataInspector Document 1 Parsed: {docType: 'DOCUMENT', mainEntity: 'RUTIK SHINDHE', relevantText: 'YES', reasoning: '- Document belongs to RUTIK SHINDHE, who is a Full Stack AI Developer and has a GitHub profile....'}
DataInspectorAgent.ts:655 🔍 COMPREHENSIVE ANALYSIS: Query="give top 3 speed run from Tyler's blog", Entity="RUTIK SHINDHE" → Result: true
DataInspectorAgent.ts:477 🔍 Document 1 intelligent analysis: {docType: 'DOCUMENT', primaryEntity: 'RUTIK SHINDHE', isRelevant: true, reasoning: '- Document belongs to RUTIK SHINDHE, who is a Full Stack AI Developer and has a GitHub profile....'}
DataInspectorAgent.ts:486 ✅ Including relevant document: DOCUMENT (RUTIK SHINDHE)
useResearch.ts:1008 📊 Agent DataInspector: 20% - [03:08:19] ✅ Including: RUTIK SHINDHE
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
discoverContentAreas @ DataInspectorAgent.ts:819
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:495
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
discoverEntitiesIntelligently @ DataInspectorAgent.ts:775
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:498
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
discoverDocumentRole @ DataInspectorAgent.ts:877
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:501
useResearch.ts:1008 📊 Agent DataInspector: 45% - [03:08:39] Step 2/2: Analyzing doc_1755067269362_76u38f2cd
DataInspectorAgent.ts:560 🔍 DEBUG DataInspector Document 2 Sample Content: {chunksCount: 6, sampleLength: 4901, firstChunkPreview: 'TYLER ROMERO POSTS Nano GPT Speedrun Living Worklo…omesomesomesomesomesome reallyreallyreallyreal...', hasActualContent: true}
DataInspectorAgent.ts:630 📤 DEBUG DataInspector Document 2 LLM Prompt: {promptLength: 8078, containsDocumentContent: true, contentSampleInPrompt: 'You are an intelligent document analyzer. Perform …s? March 8, 2025 I’ve seen somesomesomesomesom...'}
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
analyzeDocumentIntelligently @ DataInspectorAgent.ts:636
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:475
DataInspectorAgent.ts:639 🧠 DataInspector Document 2 LLM Response: <think>
Okay, let's start by understanding what the user is asking. They provided a document and want me to perform comprehensive analysis. The user mentioned "comprehensive analysis to understand what this document contains," so I need to go through the document step by step.

First, I'll look at the structure. The document starts with several chunks, each containing different sections. The first chunk lists Tyler's posts, including speedrun results and his GPU setup. Then there are methodologi...
DataInspectorAgent.ts:753 ⚠️ DataInspector failed to extract TYPE from response: "<think>
Okay, let's start by understanding what the user is asking. They provided a document and want me to perform comprehensive analysis. The user mentioned "comprehensive analysis to understand wha..."
overrideMethod @ hook.js:608
extractValue @ DataInspectorAgent.ts:753
analyzeDocumentIntelligently @ DataInspectorAgent.ts:642
DataInspectorAgent.ts:753 ⚠️ DataInspector failed to extract MAIN_ENTITY from response: "<think>
Okay, let's start by understanding what the user is asking. They provided a document and want me to perform comprehensive analysis. The user mentioned "comprehensive analysis to understand wha..."
overrideMethod @ hook.js:608
extractValue @ DataInspectorAgent.ts:753
analyzeDocumentIntelligently @ DataInspectorAgent.ts:643
DataInspectorAgent.ts:753 ⚠️ DataInspector failed to extract RELEVANT from response: "<think>
Okay, let's start by understanding what the user is asking. They provided a document and want me to perform comprehensive analysis. The user mentioned "comprehensive analysis to understand wha..."
overrideMethod @ hook.js:608
extractValue @ DataInspectorAgent.ts:753
analyzeDocumentIntelligently @ DataInspectorAgent.ts:644
DataInspectorAgent.ts:747 🧠 DataInspector extracted reasoning from <think>: "Okay, let's start by understanding what the user is asking. They provided a document and want me to ..."
DataInspectorAgent.ts:648 🔍 DataInspector Document 2 Parsed: {docType: 'Unknown Document', mainEntity: 'Unknown Entity', relevantText: 'NO', reasoning: "Okay, let's start by understanding what the user i…king. They provided a document and want me to ..."}
DataInspectorAgent.ts:655 🔍 COMPREHENSIVE ANALYSIS: Query="give top 3 speed run from Tyler's blog", Entity="Unknown Entity" → Result: false
DataInspectorAgent.ts:477 🔍 Document 2 intelligent analysis: {docType: 'Unknown Document', primaryEntity: 'Unknown Entity', isRelevant: false, reasoning: "Okay, let's start by understanding what the user i…king. They provided a document and want me to ..."}
DataInspectorAgent.ts:514 ⏭️ Skipping irrelevant document: Unknown Document (Unknown Entity) - Okay, let's start by understanding what the user i...
useResearch.ts:1008 📊 Agent DataInspector: 50% - [03:09:07] ⏭️ Skipping: Unknown Entity
DataInspectorAgent.ts:520 📊 Document filtering: 2 total → 1 relevant
useResearch.ts:1008 📊 Agent DataInspector: 90% - Filtered 2 documents → 1 relevant
DataInspectorAgent.ts:404 📋 Multi-Document Analysis: 1 documents with 0 relationships
DataInspectorAgent.ts:435 🚨 CROSS-CONTAMINATION PREVENTION: Filtered RAG chunks from 2 to 0 (removed 2 irrelevant chunks)
DataInspectorAgent.ts:1410 🔬 DataInspector: Extracting query-relevant terms from 1 document for: "give top 3 speed run from Tyler's blog"
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
analyzeQueryForContentPrioritization @ DataInspectorAgent.ts:1580
buildQueryAwareContentSample @ DataInspectorAgent.ts:1529
extractQueryRelevantTerms @ DataInspectorAgent.ts:1413
performMultiDocumentAnalysis @ DataInspectorAgent.ts:274
DataInspectorAgent.ts:1537 📊 Document 1: Sampling 2 of 2 chunks (100%)
DataInspectorAgent.ts:1415 🔍 Content sample for technical extraction (1250 chars): --- DOCUMENT 1: doc_1755067261690_sinzqcf6a ---
Rutwik Shinde Software Developer | Pune rutwikshinde34@gmail.com | 9370947507 | linkedin.com/in/rutwik187 | github.com/rutwik187 Experience Full Stack A...
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
extractQueryRelevantTerms @ DataInspectorAgent.ts:1423
await in extractQueryRelevantTerms
performMultiDocumentAnalysis @ DataInspectorAgent.ts:274
DataInspectorAgent.ts:1424 🎯 Technical terms LLM response: <think>
Okay, let's start by understanding the user's query. The user is asking for the top 3 speed run from Tyler's blog. Wait, the query is "give top 3 speed run from Tyler's blog". Hmm, maybe there's a typo here. The document content mentions Rutwik Shinde, Pune, and some technical terms like AI, Frontend, Git Hub, Razorpay, and Eleven Labs. 

First, I need to check if there's any mention of Tyler in the document. Scanning through, the document talks about Rutwik Shinde's work at his LinkedIn and GitHub. There's no mention of Tyler. So maybe the user made a mistake, or perhaps there's a typo. But according to the given document, there's no Tyler involved. 

The user might have intended to ask about Rutwik's work, but the query is "from Tyler's blog". Since the document doesn't reference Tyler, perhaps the user is confused. However, the task is to extract information from the document to answer the query. Since the document doesn't mention Tyler, perhaps there's no relevant information to extract here. 

Alternatively, maybe "speed run" refers to something specific in the document, but looking at the content, it's about development and technologies. The user's query is unclear, but based on the provided content, there's no Tyler in relation. Therefore, the answer would be that the document doesn't contain relevant information about Tyler's blog.
</think>

METHODS: []  
CONCEPTS: []  
PEOPLE: []  
DATA_TYPES: []
DataInspectorAgent.ts:1483 🔍 Parsing methods line: "[]"
DataInspectorAgent.ts:1488 ✅ Parsed methods: ['[]']
DataInspectorAgent.ts:1492 🔍 Parsing concepts line: "[]"
DataInspectorAgent.ts:1500 🔍 Parsing people line: "[]"
DataInspectorAgent.ts:1508 🔍 Parsing data line: "[]"
DataInspectorAgent.ts:1428 🔍 Parsed technical terms: {methods: Array(1), concepts: Array(1), people: Array(1), data: Array(1)}
DataInspectorAgent.ts:1438 ✅ Document insights stored in context.sharedKnowledge: {methods: 1, concepts: 1, people: 1, data: 1}
DataInspectorAgent.ts:1447 📋 Extracted methods: ['[]']
DataInspectorAgent.ts:1371 📊 Relevance filtering: 1 relevant out of 2 total documents
DataInspectorAgent.ts:1376 🔄 Replacing 0 document metadata with 2 relevant chunks from intelligent analysis
useResearch.ts:1080 ✅ Agent DataInspector completed
Orchestrator.ts:2041 ✅ Tool DataInspector completed in 81885ms
Orchestrator.ts:2646 🔍 PlanningAgent consuming and validating DataInspector results using Claude Code-style logic
PlanningAgent.ts:2434 🎯 PlanningAgent: Consuming and validating results from DataInspector
PlanningAgent.ts:1839 🔍 PlanningAgent: Validating DataInspector results for query: "give top 3 speed run from Tyler's blog"
PlanningAgent.ts:2443 ❌ DataInspector validation failed: Query "give top 3 speed run from Tyler's blog" requires numeric data for ranking but DataInspector found no measurements
PlanningAgent.ts:2265 🔄 PlanningAgent: Triggering intelligent replanning - enhance_numeric_extraction
PlanningAgent.ts:2266 📝 Reason: Query "give top 3 speed run from Tyler's blog" requires numeric data for ranking but DataInspector found no measurements
PlanningAgent.ts:2268 🎯 Specific guidance: Enhance document analysis to extract numeric measurements like "hours", "minutes", performance metrics, and quantifiable data from structured content like tables
PlanningAgent.ts:2300 ✅ Replanning request created with session-specific guidance: {target: 'DataInspector', guidance: 'Enhance document analysis to extract numeric measu…tifiable data from structured content like tables', priority: 'numeric_measurement_extraction', sessionContext: {…}}
Orchestrator.ts:2045 🔍 Quality assessment for DataInspector: replan_required
Orchestrator.ts:2048 ⚠️ Result quality insufficient: PlanningAgent identified quality issues requiring replanning
Orchestrator.ts:2051 🔄 Attempting intelligent retry for DataInspector
Orchestrator.ts:2835 🔄 Intelligent retry #1 for DataInspector: Use corrective guidance from replanning requests
Orchestrator.ts:2846 🎯 Using PlanningAgent corrective guidance: Enhance document analysis to extract numeric measurements like "hours", "minutes", performance metrics, and quantifiable data from structured content like tables
Orchestrator.ts:2868 🔄 Replanning context: enhance_numeric_extraction - Query "give top 3 speed run from Tyler's blog" requires numeric data for ranking but DataInspector found no measurements
Orchestrator.ts:2869 🎯 Specific corrective guidance: Enhance document analysis to extract numeric measurements like "hours", "minutes", performance metrics, and quantifiable data from structured content like tables
useResearch.ts:1008 📊 Agent DataInspector: 5% - Retrying with corrective guidance (attempt #1)
Orchestrator.ts:2890 🎯 Executing DataInspector retry with applied corrective guidance
useResearch.ts:957 🚀 Agent DataInspector (DataInspector) started
useResearch.ts:964 ❌ START ERROR: Main step not found for agent "DataInspector". This should not happen!
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
useResearch.useMemo[progressCallback] @ useResearch.ts:964
startAgent @ AgentProgress.ts:75
performIntelligentRetry @ Orchestrator.ts:2893
executeToolCall @ Orchestrator.ts:2053
useResearch.ts:1008 📊 Agent DataInspector: 5% - Initializing document analysis
DataInspectorAgent.ts:75 🔎 DataInspector: Analyzing 2 sources (2 RAG, 0 Web)
DataInspectorAgent.ts:171 📊 DataInspector: Extracted 22 numeric measurements from document text
DataInspectorAgent.ts:173 📊 Sample measurements: (3) ['"34" (twik Shinde Software Developer | Pune rutwik…mail.com | 9370947507 | linkedin.com/in/rutwik18)', '"9370947507" (tware Developer | Pune rutwikshinde3… linkedin.com/in/rutwik187 | github.com/rutwik18)', '"187" (34@gmail.com | 9370947507 | linkedin.com/in… github.com/rutwik187 Experience Full Stack AI D)']
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
