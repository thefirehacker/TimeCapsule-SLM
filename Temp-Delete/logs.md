# errors 
Orchestrator.ts:685 ❌ SEQUENCING VIOLATION: Synthesizer cannot be called before Extractor!

Orchestrator.ts:686 🔥 Extractor must extract data first. Current agents called: [DataInspector, PlanningAgent, PatternGenerator]
Orchestrator.ts:687 📊 This prevents "No relevant information found" when data exists but hasn't been extracted yet
ResearchOrchestrator.ts:1569 ❌ Master Orchestrator failed: Error: Mandatory sequencing violation: Extractor required before Synthesizer
    at Orchestrator.executeToolCall (Orchestrator.ts:688:13)
    at Orchestrator.masterLLMOrchestration (Orchestrator.ts:194:20)
    at async Orchestrator.research (Orchestrator.ts:137:5)
    at async ResearchOrchestrator.executeMasterOrchestrator (ResearchOrchestrator.ts:1555:22)
    at async ResearchOrchestrator.executeResearch (ResearchOrchestrator.ts:153:33)
    at async useResearch.useCallback[performIntelligentResearch] (useResearch.ts:988:22)

    # Full
     Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5841v898116370za200zd898116370&_p=1754482968172&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528501~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=7&sid=1754482963&sct=15&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&_et=13402&tfd=466359".
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
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
fn @ webpack.js?v=1754483427982:369
eval @ Analytics.tsx:10
(app-pages-browser)/./src/components/analytics/Analytics.tsx @ layout.js:7820
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
fn @ webpack.js?v=1754483427982:369
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
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
fn @ webpack.js?v=1754483427982:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7842
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
fn @ webpack.js?v=1754483427982:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false!:11
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false! @ layout.js:4998
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
__webpack_exec__ @ layout.js:8073
(anonymous) @ layout.js:8074
__webpack_require__.O @ webpack.js?v=1754483427982:84
(anonymous) @ layout.js:8075
webpackJsonpCallback @ webpack.js?v=1754483427982:1388
(anonymous) @ layout.js:9
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.168449996549082, longitude: 72.84660339162433, …}
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754483427982:160
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
fn @ webpack.js?v=1754483427982:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754483427982:182
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
__webpack_exec__ @ main-app.js?v=1754483427982:2824
(anonymous) @ main-app.js?v=1754483427982:2825
webpackJsonpCallback @ webpack.js?v=1754483427982:1388
(anonymous) @ main-app.js?v=1754483427982:9
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754483427982:160
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
fn @ webpack.js?v=1754483427982:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754483427982:182
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
__webpack_exec__ @ main-app.js?v=1754483427982:2824
(anonymous) @ main-app.js?v=1754483427982:2825
webpackJsonpCallback @ webpack.js?v=1754483427982:1388
(anonymous) @ main-app.js?v=1754483427982:9
scheduler.development.js:14 [Violation] 'message' handler took 463ms
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754483427982:160
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
fn @ webpack.js?v=1754483427982:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754483427982:182
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
__webpack_exec__ @ main-app.js?v=1754483427982:2824
(anonymous) @ main-app.js?v=1754483427982:2825
webpackJsonpCallback @ webpack.js?v=1754483427982:1388
(anonymous) @ main-app.js?v=1754483427982:9
VectorStore.ts:317 📄 Creating documents collection...
Analytics.tsx:39 ⏳ Analytics: Skipping page tracking - no consent or not initialized
embeddingWorker.js:231 🔧 Text processing worker loaded successfully
analytics.ts:305 ✅ GA4: Successfully initialized with enhanced tracking
Analytics.tsx:20 ✅ Analytics: GA4 initialized with user consent
embeddingWorker.js:59 🔧 Initializing text processing worker...
embeddingWorker.js:73 ✅ Text processing worker initialized successfully
DocumentProcessor.ts:116 ✅ Text processing worker ready
DocumentProcessor.ts:125 ✅ DocumentProcessor initialization complete (embeddings will load when needed)
VectorStore.ts:1529 ✅ Web worker initialized successfully
VectorStore.ts:1547 🧠 Starting Xenova embedding service download...
EmbeddingService.ts:69 🧠 Starting Xenova embedding service initialization...
EmbeddingService.ts:77 ✅ Loading model (checking cache)...
EmbeddingService.ts:84 📦 Loading Xenova/all-MiniLM-L6-v2 model from Hugging Face CDN...
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
initializeXenovaService @ VectorStore.ts:1555
startImmediateBackgroundDownload @ VectorStore.ts:1516
useDocuments.ts:72 📊 Document status updated: {documents: 2, totalSize: '1.5 MB', totalChunks: 20, totalVectors: 20, avgChunksPerDoc: '10.0', …}
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5841v898116370za200zd898116370&_p=1754483432823&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528500~104684208~104684211~104948813~105087538~105087540~105103161~105103163&sr=2240x1260&cid=2050444394.1754292465&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&sid=1754482963&sct=15&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-06T12%3A30%3A32.837Z&epn.page_duration=2&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x618&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&tfd=5024".
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
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5841v898116370za200zd898116370&_p=1754483432823&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528500~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=1&sid=1754482963&sct=15&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=5011".
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
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5841v898116370za200zd898116370&_p=1754483432823&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528500~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=3&sid=1754482963&sct=15&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=scroll&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&epn.percent_scrolled=90&tfd=5126".
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
flushPendingEffects @ react-dom-client.development.js:15830
performSyncWorkOnRoot @ react-dom-client.development.js:16362
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16211
flushSpawnedWork @ react-dom-client.development.js:15805
commitRoot @ react-dom-client.development.js:15529
commitRootWhenReady @ react-dom-client.development.js:14759
performWorkOnRoot @ react-dom-client.development.js:14682
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16350
performWorkUntilDeadline @ scheduler.development.js:45
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5841v898116370za200zd898116370&_p=1754483432823&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528500~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&dt=DeepResearch-TimeCapsule&dl=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&sid=1754482963&sct=15&seg=1&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=research&ep.page_type=application&ep.pathname=%2Fdeep-research&ep.consent_analytics=true&ep.consent_functional=true&tfd=5131".
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
VectorStore.ts:1561 📊 Xenova progress: Embedding model ready (100%)
EmbeddingService.ts:156 ✅ EmbeddingService initialized successfully
VectorStore.ts:1567 ✅ Xenova embedding service ready
VectorStore.ts:1518 ✅ Immediate background download completed
VectorStore.ts:275 ✅ Xenova model loaded from cache - all features ready
VectorStore.ts:284 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
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
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754483427982:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/18d9463ecf906863.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754483427982:1367
Promise.then
hotCheck @ webpack.js?v=1754483427982:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
webpack.js?v=1754483427982:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/415398e371ba840b.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754483427982:1367
Promise.then
hotCheck @ webpack.js?v=1754483427982:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleApplyUpdates @ hot-reloader-client.js:123
eval @ hot-reloader-client.js:143
Promise.then
tryApplyUpdatesWebpack @ hot-reloader-client.js:142
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
useDocuments.ts:72 📊 Document status updated: {documents: 2, totalSize: '1.5 MB', totalChunks: 20, totalVectors: 20, avgChunksPerDoc: '10.0', …}
report-hmr-latency.js:14 [Fast Refresh] done in 1778ms
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754483427982:160
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
fn @ webpack.js?v=1754483427982:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754483427982:182
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
__webpack_exec__ @ main-app.js?v=1754483427982:2824
(anonymous) @ main-app.js?v=1754483427982:2825
webpackJsonpCallback @ webpack.js?v=1754483427982:1388
(anonymous) @ main-app.js?v=1754483427982:9
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754483427982:160
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
fn @ webpack.js?v=1754483427982:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754483427982:182
options.factory @ webpack.js?v=1754483427982:712
__webpack_require__ @ webpack.js?v=1754483427982:37
__webpack_exec__ @ main-app.js?v=1754483427982:2824
(anonymous) @ main-app.js?v=1754483427982:2825
webpackJsonpCallback @ webpack.js?v=1754483427982:1388
(anonymous) @ main-app.js?v=1754483427982:9
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
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5841v898116370za200zd898116370&_p=1754483432823&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528500~104684208~104684211~104948813~105087538~105087540~105103161~105103163&sr=2240x1260&cid=2050444394.1754292465&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=5&sid=1754482963&sct=15&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-06T12%3A30%3A33.079Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x618&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&tfd=10768".
Yc @ js?id=G-V1B8R98P79:241
zm @ js?id=G-V1B8R98P79:430
dN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:915
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754483427982:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/36d86b240a8cfa93.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754483427982:1367
Promise.then
hotCheck @ webpack.js?v=1754483427982:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
useDocuments.ts:72 📊 Document status updated: {documents: 2, totalSize: '1.5 MB', totalChunks: 20, totalVectors: 20, avgChunksPerDoc: '10.0', …}
report-hmr-latency.js:14 [Fast Refresh] done in 776ms
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
webpack.js?v=1754483427982:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/cbf85548bd0423ca.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754483427982:1367
Promise.then
hotCheck @ webpack.js?v=1754483427982:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 25ms
webpack.js?v=1754483427982:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/7d02685183587057.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754483427982:1367
Promise.then
hotCheck @ webpack.js?v=1754483427982:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
useDocuments.ts:72 📊 Document status updated: {documents: 2, totalSize: '1.5 MB', totalChunks: 20, totalVectors: 20, avgChunksPerDoc: '10.0', …}
report-hmr-latency.js:14 [Fast Refresh] done in 946ms
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
prompt-input.tsx:481 🔍 Submit context check: {enableRAG: true, webSearchEnabled: false, webSearchConfigured: false, hasRAGSearch: true, hasWebSearch: true}
prompt-input.tsx:502 🧠 Skipping initial RAG search for deep-research - Master Orchestrator will handle DataInspector magic filtering
prompt-input.tsx:517 🔍 Web search skipped: {webSearchEnabled: false, hasWebSearch: true, configured: false}
useResearch.ts:938 🔬 Starting intelligent research for: "give me the best project by Rutwik"
ResearchOrchestrator.ts:104 🔬 Starting research for: "give me the best project by Rutwik"
ResearchOrchestrator.ts:110 🎯 DataInspector Architecture: Getting document metadata for intelligent filtering
ResearchOrchestrator.ts:114 📊 Retrieved 2 documents (20 total chunks) - DataInspector will sample and filter
ResearchOrchestrator.ts:1410 🧠 Master Orchestrator eligibility: RAG sources: true, Substantial content: true
ResearchOrchestrator.ts:138 🧠 MASTER ORCHESTRATOR: Bypassing traditional pipeline entirely - using intelligent tool orchestration
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754483480169_1_9jxjb
useResearch.ts:964 📋 Adding new step: master_orchestrator_1754483480169_1_9jxjb
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
makeMasterLLMDecision @ Orchestrator.ts:307
masterLLMOrchestration @ Orchestrator.ts:165
research @ Orchestrator.ts:137
executeMasterOrchestrator @ ResearchOrchestrator.ts:1555
executeResearch @ ResearchOrchestrator.ts:153
await in executeResearch
useResearch.useCallback[performIntelligentResearch] @ useResearch.ts:988
handleSubmit @ ResearchOutput.tsx:807
handleSubmitWithContext @ prompt-input.tsx:525
handleKeyDown @ prompt-input.tsx:471
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
Orchestrator.ts:310 🧠 Master LLM Decision Response (1012 chars): <think>
Okay, let's see. The user wants the best project by Rutwik. They provided a list of available tools, and I need to figure out which one to call first.

First, the current available documents are two chunks. The goal is to answer the query, so maybe start by filtering documents to find relevant ones. The available tools include DataInspector, which is for filtering documents. Since the goal is a query, filtering documents would help in getting the best project. So the first step should be...
Orchestrator.ts:528 🔍 PARSING DEBUG: Full response (1012 chars): <think>
Okay, let's see. The user wants the best project by Rutwik. They provided a list of available tools, and I need to figure out which one to call first.

First, the current available documents are two chunks. The goal is to answer the query, so maybe start by filtering documents to find relevant ones. The available tools include DataInspector, which is for filtering documents. Since the goal is a query, filtering documents would help in getting the best project. So the first step should be to use DataInspector to analyze and filter the documents. That makes sense because without filtering, the documents might not be relevant. No other tools are needed here, so the answer is to call DataInspector.
</think>

ACTION: CALL_TOOL  
TOOL_NAME: DataInspector  
REASONING: DataInspector is ess...
Orchestrator.ts:541 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:544 🎯 PARSED TOOL_NAME (FIRST): DataInspector
Orchestrator.ts:553 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:560 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataInspector
Orchestrator.ts:313 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataInspector', reasoning: 'Need to call DataInspector to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: DataInspector - Need to call DataInspector to progress toward the goal
Orchestrator.ts:725 🔧 Executing tool: DataInspector (original: DataInspector)
ResearchOrchestrator.ts:1429 🚀 Master Orchestrator Agent started: DataInspector (DataInspector)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754483480169_1_9jxjb
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754483480169_1_9jxjb_in_progress
DataInspectorAgent.ts:49 🔎 DataInspector: Received document metadata - performing multi-document sampling and analysis
DataInspectorAgent.ts:1041 🧠 DataInspector Magic: Starting multi-document sampling and filtering
DataInspectorAgent.ts:1053 📋 Found 2 documents to analyze: (2) ['Rutwik_resume.pdf', 'www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf']
DataInspectorAgent.ts:1078 🔍 Sampling real chunks from 2 documents in VectorStore
DataInspectorAgent.ts:1138 ✅ Sampled 2 real chunks from "Rutwik_resume.pdf" (2 total chunks)
DataInspectorAgent.ts:1138 ✅ Sampled 2 real chunks from "www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf" (18 total chunks)
DataInspectorAgent.ts:1173 🔍 Performing multi-document analysis on 2 documents with real chunk samples
DataInspectorAgent.ts:1177 🔄 Replacing 2 document metadata entries with 4 real chunks
DataInspectorAgent.ts:121 🔍 Multi-document analysis: 2 documents detected
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5841v898116370za200zd898116370&_p=1754483432823&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528500~104684208~104684211~104948813~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=6&sid=1754482963&sct=15&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=1071&tfd=57284".
Yc @ js?id=G-V1B8R98P79:241
zm @ js?id=G-V1B8R98P79:430
dN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
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
performMultiDocumentAnalysis @ DataInspectorAgent.ts:161
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:1181
await in performDocumentMetadataAnalysis
process @ DataInspectorAgent.ts:50
executeToolCall @ Orchestrator.ts:736
masterLLMOrchestration @ Orchestrator.ts:194
DataInspectorAgent.ts:162 🤖 Multi-document analysis: <think>
Okay, let's tackle this step by step. The user wants to analyze two documents to answer the query "give me the best project by Rutwik". First, I need to figure out the document types and primary entities.

Starting with the first document, doc_1754292542574_sgxyitqvj. It mentions Rutwik Shin
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
DataInspectorAgent.ts:463 🧠 DataInspector Document 1 LLM Response: <think>
Okay, let's start by understanding what needs to be done here. The user provided a document and wants me to identify who owns or created it. The instructions mention breaking down the document into steps: document type, main person, relevance to the query, and explaining why if relevant. 

First, I need to determine the document's type. The document is a resume or a manual. Looking at the content, there's a resume entry for Rutwik Shinde. The sample content includes his name and contact ...
DataInspectorAgent.ts:472 🔍 DataInspector Document 1 Parsed: {docType: 'Resume', primaryEntity: 'Rutwik Shinde', relevantText: 'YES', reasoning: 'The document is a resume entry for Rutwik Shinde, …h directly matches the query about his project...'}
DataInspectorAgent.ts:515 🔍 RELEVANCE DEBUG: Query person: "rutwik", Entity words: [rutwik, shinde]
DataInspectorAgent.ts:479 🔍 RELEVANCE ANALYSIS: Text="YES", Entity="Rutwik Shinde", Query="give me the best project by Rutwik" → Result: true
DataInspectorAgent.ts:355 🔍 Document 1 intelligent analysis: {docType: 'Resume', primaryEntity: 'Rutwik Shinde', isRelevant: true, reasoning: 'The document is a resume entry for Rutwik Shinde, …h directly matches the query about his project...'}
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
discoverContentAreas @ DataInspectorAgent.ts:665
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
discoverEntitiesIntelligently @ DataInspectorAgent.ts:621
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
discoverDocumentRole @ DataInspectorAgent.ts:722
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
DataInspectorAgent.ts:463 🧠 DataInspector Document 2 LLM Response: <think>
Okay, let's see. The user provided a document and wants me to identify who owns/created it. The document is a blog post. The main person mentioned in the blog is Tyler Romero. The query is "give me the best project by Rutwik". Since the document is about Tyler and the query is about Rutwik, that's not relevant. So the answer should be TYPE: Blog, ENTITY: Tyler Romero, RELEVANT: NO.
</think>

TYPE: Blog  
ENTITY: Tyler Romero  
RELEVANT: NO  
REASON: The document is a blog post about Tyle...
DataInspectorAgent.ts:472 🔍 DataInspector Document 2 Parsed: {docType: 'Blog', primaryEntity: 'Tyler Romero', relevantText: 'NO', reasoning: "The document is a blog post about Tyler Romero's a…ities and projects, while the query is about R..."}
DataInspectorAgent.ts:515 🔍 RELEVANCE DEBUG: Query person: "rutwik", Entity words: [tyler, romero]
DataInspectorAgent.ts:479 🔍 RELEVANCE ANALYSIS: Text="NO", Entity="Tyler Romero", Query="give me the best project by Rutwik" → Result: false
DataInspectorAgent.ts:355 🔍 Document 2 intelligent analysis: {docType: 'Blog', primaryEntity: 'Tyler Romero', isRelevant: false, reasoning: "The document is a blog post about Tyler Romero's a…ities and projects, while the query is about R..."}
DataInspectorAgent.ts:390 ⏭️ Skipping irrelevant document: Blog (Tyler Romero) - The document is a blog post about Tyler Romero's a...
DataInspectorAgent.ts:394 📊 Document filtering: 2 total → 1 relevant
DataInspectorAgent.ts:291 📋 Multi-Document Analysis: 1 documents with 0 relationships
DataInspectorAgent.ts:327 ✅ SMART FILTERING: Preserving 4 pre-sampled chunks from DataInspector - no additional filtering needed
Orchestrator.ts:740 ✅ Tool DataInspector completed in 39503ms
ResearchOrchestrator.ts:1501 ✅ Master Orchestrator Agent completed: DataInspector
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754483480169_1_9jxjb
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754483480169_1_9jxjb_in_progress
Orchestrator.ts:162 🔄 Master LLM Iteration 2: Answer the user's query: "give me the best project by Rutwik"
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
makeMasterLLMDecision @ Orchestrator.ts:307
masterLLMOrchestration @ Orchestrator.ts:165
Orchestrator.ts:310 🧠 Master LLM Decision Response (2023 chars): <think>
Okay, let's see. The user wants the best project by Rutwik. The tools available are DataInspector, PlanningAgent, PatternGenerator, Extractor, WebSearchAgent, and Synthesizer. So first, check if DataInspector has been called. From the history, DataInspector was already called, so that's done. Then PlanningAgent hasn't been called yet, so maybe that's the next step. The goal is to create an execution strategy, so PlanningAgent would help here. Then, after that, if there's a pattern genera...
Orchestrator.ts:528 🔍 PARSING DEBUG: Full response (2023 chars): <think>
Okay, let's see. The user wants the best project by Rutwik. The tools available are DataInspector, PlanningAgent, PatternGenerator, Extractor, WebSearchAgent, and Synthesizer. So first, check if DataInspector has been called. From the history, DataInspector was already called, so that's done. Then PlanningAgent hasn't been called yet, so maybe that's the next step. The goal is to create an execution strategy, so PlanningAgent would help here. Then, after that, if there's a pattern generated, maybe use PatternGenerator. But the user's query is about the best project, so maybe the answer needs to be synthesized from the available data, which is being processed by Synthesizer. But wait, the user's current goal is to answer the query, so if the answer is being generated, maybe the Synt...
Orchestrator.ts:541 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:544 🎯 PARSED TOOL_NAME (FIRST): PlanningAgent
Orchestrator.ts:553 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:560 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PlanningAgent
Orchestrator.ts:313 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PlanningAgent', reasoning: 'Need to call PlanningAgent to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: PlanningAgent - Need to call PlanningAgent to progress toward the goal
Orchestrator.ts:725 🔧 Executing tool: PlanningAgent (original: PlanningAgent)
ResearchOrchestrator.ts:1429 🚀 Master Orchestrator Agent started: PlanningAgent (PlanningAgent)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754483480169_1_9jxjb
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754483480169_1_9jxjb_in_progress
PlanningAgent.ts:41 🎯 PlanningAgent: Creating intelligent execution strategy for "give me the best project by Rutwik"
PlanningAgent.ts:45 📊 Situation Analysis: {hasDocuments: true, documentCount: 4, hasDocumentAnalysis: true, relevantDocuments: 1, documentTypes: Array(1), …}
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
createExecutionPlan @ PlanningAgent.ts:140
process @ PlanningAgent.ts:48
executeToolCall @ Orchestrator.ts:736
masterLLMOrchestration @ Orchestrator.ts:194
PlanningAgent.ts:246 🔄 PlanningAgent parsing attempt 1/4
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:319 🔧 Array element separation fixes applied
PlanningAgent.ts:266 ✅ Successfully parsed execution plan on attempt 1
PlanningAgent.ts:143 🎯 Generated execution plan: {strategy: 'Use regex to extract candidate information, then u…rience and skills, and ensure proper attribution.', stepCount: 3, confidence: 0.8}
PlanningAgent.ts:60 ✅ Execution plan created: Use regex to extract candidate information, then use an extractor to summarize experience and skills, and ensure proper attribution.
Orchestrator.ts:740 ✅ Tool PlanningAgent completed in 10094ms
ResearchOrchestrator.ts:1501 ✅ Master Orchestrator Agent completed: PlanningAgent
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754483480169_1_9jxjb
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754483480169_1_9jxjb_in_progress
Orchestrator.ts:162 🔄 Master LLM Iteration 3: Answer the user's query: "give me the best project by Rutwik"
Orchestrator.ts:61 📋 Following execution plan: Next step is PatternGenerator - Extract candidate information (name, contact, LinkedIn, GitHub) and project experience
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
makeMasterLLMDecision @ Orchestrator.ts:307
masterLLMOrchestration @ Orchestrator.ts:165
Orchestrator.ts:310 🧠 Master LLM Decision Response (1075 chars): <think>
Okay, let's see. The user wants the best project by Rutwik. They've already mentioned that DataInspector and PlanningAgent have been called, but the next steps are to use PatternGenerator to extract candidate info and then Synthesizer to put it all together. Wait, the current available data includes 4 chunks but only no data extracted yet. So the next logical step is to call PatternGenerator to get the candidate info. Then, once that's done, use Synthesizer to create the final answer. Th...
Orchestrator.ts:528 🔍 PARSING DEBUG: Full response (1075 chars): <think>
Okay, let's see. The user wants the best project by Rutwik. They've already mentioned that DataInspector and PlanningAgent have been called, but the next steps are to use PatternGenerator to extract candidate info and then Synthesizer to put it all together. Wait, the current available data includes 4 chunks but only no data extracted yet. So the next logical step is to call PatternGenerator to get the candidate info. Then, once that's done, use Synthesizer to create the final answer. That makes sense. So the action is PatternGenerator and the reasoning is to extract the candidate's info directly using regex. Then, next goal is to have the best project by Rutwik.
</think>

ACTION: CALL_TOOL  
TOOL_NAME: PatternGenerator  
REASONING: Extract candidate information (name, contact, Lin...
Orchestrator.ts:541 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:544 🎯 PARSED TOOL_NAME (FIRST): PatternGenerator
Orchestrator.ts:553 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:560 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PatternGenerator
Orchestrator.ts:313 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PatternGenerator', reasoning: 'Need to call PatternGenerator to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: PatternGenerator - Need to call PatternGenerator to progress toward the goal
Orchestrator.ts:725 🔧 Executing tool: PatternGenerator (original: PatternGenerator)
ResearchOrchestrator.ts:1429 🚀 Master Orchestrator Agent started: PatternGenerator (PatternGenerator)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754483480169_1_9jxjb
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754483480169_1_9jxjb_in_progress
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
generateStrategiesWithLLM @ PatternGeneratorAgent.ts:162
process @ PatternGeneratorAgent.ts:34
executeToolCall @ Orchestrator.ts:736
masterLLMOrchestration @ Orchestrator.ts:194
PatternGeneratorAgent.ts:163 🎯 LLM regex generation response: <think>
Okay, let's see. The user wants me to find actual patterns in the given document content for Rutwik's projects. First, I need to look at each sample and identify any relevant data structures. 

Starting with Sample 1: Rutwik Shinde Software Developer. The key data here is his role, contact info, and a mention of building a frontend architecture. The numbers like 9370947507 and GitHub links
PatternGeneratorAgent.ts:259 🔍 Starting triple-tier pattern parsing from LLM response (3075 chars)
PatternGeneratorAgent.ts:297 🔍 Found REGEX_PATTERNS section: "- /•\s*([^\n•]+)/g
- /github.com/rutwik187/([^\n]+)/gi
- /•\s*([^\n•]+)/g
- /token\.(\d+\.?\d+)/gi..."
PatternGeneratorAgent.ts:400 🧪 Normalizing pattern: "/•\s*([^\n•]+)/g"
PatternGeneratorAgent.ts:404 ✅ Already normalized: /•\s*([^\n•]+)/g
PatternGeneratorAgent.ts:400 🧪 Normalizing pattern: "/github.com/rutwik187/([^\n]+)/gi"
PatternGeneratorAgent.ts:404 ✅ Already normalized: /github.com/rutwik187/([^\n]+)/gi
PatternGeneratorAgent.ts:400 🧪 Normalizing pattern: "/•\s*([^\n•]+)/g"
PatternGeneratorAgent.ts:404 ✅ Already normalized: /•\s*([^\n•]+)/g
PatternGeneratorAgent.ts:400 🧪 Normalizing pattern: "/token\.(\d+\.?\d+)/gi"
PatternGeneratorAgent.ts:404 ✅ Already normalized: /token\.(\d+\.?\d+)/gi
PatternGeneratorAgent.ts:264 ✅ Tier 1 SUCCESS: Found 4 patterns in structured format
PatternGeneratorAgent.ts:169 ✅ Generated 4 dynamic regex patterns: (4) ['/•\\s*([^\\n•]+)/g', '/github.com/rutwik187/([^\\n]+)/gi', '/•\\s*([^\\n•]+)/g', '/token\\.(\\d+\\.?\\d+)/gi']
PatternGeneratorAgent.ts:189 ✅ DEBUG - Patterns after PatternGenerator: {previousCount: 1, newCount: 4, totalCount: 5}
Orchestrator.ts:740 ✅ Tool PatternGenerator completed in 13378ms
ResearchOrchestrator.ts:1501 ✅ Master Orchestrator Agent completed: PatternGenerator
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754483480169_1_9jxjb
useResearch.ts:949 📋 Skipping duplicate step processing: master_orchestrator_1754483480169_1_9jxjb_in_progress
Orchestrator.ts:162 🔄 Master LLM Iteration 4: Answer the user's query: "give me the best project by Rutwik"
Orchestrator.ts:61 📋 Following execution plan: Next step is Extractor - Synthesize skills, experience, and projects
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
makeMasterLLMDecision @ Orchestrator.ts:307
masterLLMOrchestration @ Orchestrator.ts:165
Orchestrator.ts:310 🧠 Master LLM Decision Response (1789 chars): <think>
Okay, let's see. The user is asking for the best project by Rutwik, and I need to figure out which tool to call next. Let me start by looking at the available data and the tools already used.

First, the user's query is about projects, so the main goal is to find the best one. The current data available includes 4 chunks of documents, which were analyzed by DataInspector. The Patterns Generator has already generated 5 regex patterns, which might be useful for extraction. The Extraction p...
Orchestrator.ts:528 🔍 PARSING DEBUG: Full response (1789 chars): <think>
Okay, let's see. The user is asking for the best project by Rutwik, and I need to figure out which tool to call next. Let me start by looking at the available data and the tools already used.

First, the user's query is about projects, so the main goal is to find the best one. The current data available includes 4 chunks of documents, which were analyzed by DataInspector. The Patterns Generator has already generated 5 regex patterns, which might be useful for extraction. The Extraction plan is in progress, next step is Extractor, and the final answer is pending Synthesizer.

The key here is to find the tool that can generate the best project. Since the user wants the best, maybe they need synthesizing the skills and projects from the available data. The Extraction plan is next, so ...
Orchestrator.ts:541 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:544 🎯 PARSED TOOL_NAME (FIRST): Synthesizer
Orchestrator.ts:553 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:560 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=Synthesizer
Orchestrator.ts:313 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'Synthesizer', reasoning: 'Need to call Synthesizer to progress toward the goal'}
Orchestrator.ts:193 🔧 Master LLM calling tool: Synthesizer - Need to call Synthesizer to progress toward the goal
Orchestrator.ts:685 ❌ SEQUENCING VIOLATION: Synthesizer cannot be called before Extractor!
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
executeToolCall @ Orchestrator.ts:685
masterLLMOrchestration @ Orchestrator.ts:194
Orchestrator.ts:686 🔥 Extractor must extract data first. Current agents called: [DataInspector, PlanningAgent, PatternGenerator]
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
executeToolCall @ Orchestrator.ts:686
masterLLMOrchestration @ Orchestrator.ts:194
Orchestrator.ts:687 📊 This prevents "No relevant information found" when data exists but hasn't been extracted yet
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
executeToolCall @ Orchestrator.ts:687
masterLLMOrchestration @ Orchestrator.ts:194
ResearchOrchestrator.ts:1569 ❌ Master Orchestrator failed: Error: Mandatory sequencing violation: Extractor required before Synthesizer
    at Orchestrator.executeToolCall (Orchestrator.ts:688:13)
    at Orchestrator.masterLLMOrchestration (Orchestrator.ts:194:20)
    at async Orchestrator.research (Orchestrator.ts:137:5)
    at async ResearchOrchestrator.executeMasterOrchestrator (ResearchOrchestrator.ts:1555:22)
    at async ResearchOrchestrator.executeResearch (ResearchOrchestrator.ts:153:33)
    at async useResearch.useCallback[performIntelligentResearch] (useResearch.ts:988:22)
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
executeMasterOrchestrator @ ResearchOrchestrator.ts:1569
useResearch.ts:942 📋 Step update: synthesis - completed - ID: master_orchestrator_1754483480169_1_9jxjb
useResearch.ts:964 📋 Adding new step: master_orchestrator_1754483480169_1_9jxjb
ResearchSteps.tsx:513 🚫 Preventing duplicate step addition: master_orchestrator_1754483480169_1_9jxjb
useResearch.ts:994 ✅ Intelligent research completed: {steps: 1, sources: 2, confidence: 1, processingTime: 86352}
ResearchSteps.tsx:513 🚫 Preventing duplicate step addition: master_orchestrator_1754483480169_1_9jxjb
scheduler.development.js:14 [Violation] 'message' handler took 172ms
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
scheduler.development.js:14 [Violation] 'message' handler took 167ms
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754483427982:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/8ae4ab7992d6e2f0.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754483427982:1367
Promise.then
hotCheck @ webpack.js?v=1754483427982:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1467ms
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
webpack.js?v=1754483427982:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/d1a65f37505359be.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754483427982:1367
Promise.then
hotCheck @ webpack.js?v=1754483427982:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 671ms
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
