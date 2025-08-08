# Errors 
responseCompletion.ts:249 🔍 Array extraction failed: SyntaxError: Expected ',' or '}' after property value in JSON at position 3106 (line 34 column 66)
    at JSON.parse (<anonymous>)
    at parseJsonWithResilience (responseCompletion.ts:246:29)
    at Array.eval (PlanningAgent.ts:293:41)
    at PlanningAgent.parseExecutionPlan (PlanningAgent.ts:315:42)
    at PlanningAgent.createExecutionPlan (PlanningAgent.ts:192:25)
    at async PlanningAgent.process (PlanningAgent.ts:80:27)
    at async Orchestrator.executeToolCall (Orchestrator.ts:1171:7)
    at async Orchestrator.masterLLMOrchestration (Orchestrator.ts:198:9)
    at async Orchestrator.research (Orchestrator.ts:141:5)
    at async ResearchOrchestrator.executeMasterOrchestrator (ResearchOrchestrator.ts:1589:22)
    at async ResearchOrchestrator.executeResearch (ResearchOrchestrator.ts:153:33)
    at async useResearch.useCallback[performIntelligentResearch] (useResearch.ts:993:22)
responseCompletion.ts:250 🔍 Problematic array text: [
    {
      "agent": "PatternGenerator",
      "action": "Generate regex patterns for extracting key information (title, author, date, keywords, abstract, methodology, results, discussion, conclusio...
responseCompletion.ts:234 🔍 JSON extraction failed: SyntaxError: Expected ',' or '}' after property value in JSON at position 3501 (line 36 column 66)
    at JSON.parse (<anonymous>)
    at parseJsonWithResilience (responseCompletion.ts:232:21)
    at Array.eval (PlanningAgent.ts:303:41)
    at PlanningAgent.parseExecutionPlan (PlanningAgent.ts:315:42)
    at PlanningAgent.createExecutionPlan (PlanningAgent.ts:192:25)
    at async PlanningAgent.process (PlanningAgent.ts:80:27)
    at async Orchestrator.executeToolCall (Orchestrator.ts:1171:7)
    at async Orchestrator.masterLLMOrchestration (Orchestrator.ts:198:9)
    at async Orchestrator.research (Orchestrator.ts:141:5)
    at async ResearchOrchestrator.executeMasterOrchestrator (ResearchOrchestrator.ts:1589:22)
    at async ResearchOrchestrator.executeResearch (ResearchOrchestrator.ts:153:33)
    at async useResearch.useCallback[performIntelligentResearch] (useResearch.ts:993:22)
responseCompletion.ts:235 🔍 Problematic JSON text: {
  "strategy": "Employ a structured extraction and synthesis approach to identify the best RL methods.  First, generate regex patterns to extract key information from the research papers. Then, use t...
responseCompletion.ts:249 🔍 Array extraction failed: SyntaxError: Expected ',' or '}' after property value in JSON at position 3106 (line 34 column 66)
    at JSON.parse (<anonymous>)
    at parseJsonWithResilience (responseCompletion.ts:246:29)
    at Array.eval (PlanningAgent.ts:303:41)
    at PlanningAgent.parseExecutionPlan (PlanningAgent.ts:315:42)
    at PlanningAgent.createExecutionPlan (PlanningAgent.ts:192:25)
    at async PlanningAgent.process (PlanningAgent.ts:80:27)
    at async Orchestrator.executeToolCall (Orchestrator.ts:1171:7)
    at async Orchestrator.masterLLMOrchestration (Orchestrator.ts:198:9)
    at async Orchestrator.research (Orchestrator.ts:141:5)
    at async ResearchOrchestrator.executeMasterOrchestrator (ResearchOrchestrator.ts:1589:22)
    at async ResearchOrchestrator.executeResearch (ResearchOrchestrator.ts:153:33)
    at async useResearch.useCallback[performIntelligentResearch] (useResearch.ts:993:22)
responseCompletion.ts:250 🔍 Problematic array text: [
    {
      "agent": "PatternGenerator",
      "action": "Generate regex patterns for extracting key information (title, author, date, keywords, abstract, methodology, results, discussion, conclusio...


      # Full Logs 
      Navigated to http://localhost:3000/deep-research
analytics.ts:160 📱 Device Info Collected: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', platform: 'MacIntel', vendor: 'Google Inc.', language: 'en-US', languages: Array(4), …}
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
options.factory @ webpack.js?v=1754681745268:712
__webpack_require__ @ webpack.js?v=1754681745268:37
fn @ webpack.js?v=1754681745268:369
eval @ VectorStoreProvider.tsx:11
(app-pages-browser)/./src/components/providers/VectorStoreProvider.tsx @ layout.js:7842
options.factory @ webpack.js?v=1754681745268:712
__webpack_require__ @ webpack.js?v=1754681745268:37
fn @ webpack.js?v=1754681745268:369
Promise.then
eval @ next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false!:11
(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22src%2Fapp%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Poppins%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22variable%5C%22%3A%5C%22--font-poppins%5C%22%2C%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%2C%5C%22weight%5C%22%3A%5B%5C%22400%5C%22%2C%5C%22500%5C%22%2C%5C%22600%5C%22%2C%5C%22700%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22poppins%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fanalytics%2FAnalytics.tsx%22%2C%22ids%22%3A%5B%22Analytics%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FSessionProvider.tsx%22%2C%22ids%22%3A%5B%22SessionProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2Ftheme-provider.tsx%22%2C%22ids%22%3A%5B%22ThemeProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2FUsers%2Fbooimac%2FAIEDX%2FTemp%2FCode-Temp%2FCanvas3D-LLM%2Fsrc%2Fcomponents%2Fproviders%2FVectorStoreProvider.tsx%22%2C%22ids%22%3A%5B%22VectorStoreProvider%22%5D%7D&server=false! @ layout.js:4998
options.factory @ webpack.js?v=1754681745268:712
__webpack_require__ @ webpack.js?v=1754681745268:37
__webpack_exec__ @ layout.js:8073
(anonymous) @ layout.js:8074
__webpack_require__.O @ webpack.js?v=1754681745268:84
(anonymous) @ layout.js:8075
webpackJsonpCallback @ webpack.js?v=1754681745268:1388
(anonymous) @ layout.js:9
analytics.ts:183 🌍 Location Info Updated: {timezone: 'Asia/Calcutta', timezoneOffset: -330, language: 'en-US', latitude: 19.16840985100936, longitude: 72.84667036296719, …}
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
scheduler.development.js:14 [Violation] 'message' handler took 339ms
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
useOllamaConnection.ts:132 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ useOllamaConnection.ts:132
useOllamaConnection.useCallback[connect] @ useOllamaConnection.ts:226
useOllamaConnection.useEffect.autoReconnect @ useOllamaConnection.ts:578
useOllamaConnection.ts:174 ✅ Ollama connection test passed, sorted models: (6) ['gemma3n:e2b', 'hf.co/bubblspace/Timecapsule2.7B-g3n-mix-match-gguf:latest', 'llama3.1:8b', 'llama3.2:1b', 'qwen3:0.6b', 'tinyllama:1.1b']
analytics.ts:305 ✅ GA4: Successfully initialized with enhanced tracking
Analytics.tsx:20 ✅ Analytics: GA4 initialized with user consent
useDocuments.ts:72 📊 Document status updated: {documents: 2, totalSize: '2.2 MB', totalChunks: 89, totalVectors: 89, avgChunksPerDoc: '44.5', …}
analytics.ts:363 📊 GA4: Page view tracked - DeepResearch-TimeCapsule
Analytics.tsx:69 📊 Analytics: Tracked page view - DeepResearch-TimeCapsule (/deep-research)
EmbeddingService.ts:129 ✅ Model loaded successfully
EmbeddingService.ts:147 ✅ Model loaded from cache instantly
VectorStore.ts:1835 📊 Xenova progress: Embedding model ready (100%)
EmbeddingService.ts:156 ✅ EmbeddingService initialized successfully
VectorStore.ts:1841 ✅ Xenova embedding service ready
VectorStore.ts:1792 ✅ Immediate background download completed
VectorStore.ts:282 ✅ Xenova model loaded from cache - all features ready
VectorStore.ts:291 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5861v898116370za200zd898116370&_p=1754681751373&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528500~104684208~104684211~104948813~105103161~105103163~105135708~105135710&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=1&sid=1754680531&sct=8&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&up.device_type=desktop&up.operating_system=macOS&up.browser=Chrome&up.timezone=Asia%2FCalcutta&tfd=6182".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
k.Kb @ js?id=G-V1B8R98P79:915
k.add @ js?id=G-V1B8R98P79:918
k.Kl @ js?id=G-V1B8R98P79:934
k.cq @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:930
vn @ js?id=G-V1B8R98P79:448
Bp @ js?id=G-V1B8R98P79:468
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:662
(anonymous) @ js?id=G-V1B8R98P79:662
Promise.then
gz @ js?id=G-V1B8R98P79:662
k.bq @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:946
v @ js?id=G-V1B8R98P79:487
En @ js?id=G-V1B8R98P79:450
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
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5861v898116370za200zd898116370&_p=1754681751373&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528500~104684208~104684211~104948813~105103161~105103163~105135708~105135710&sr=2240x1260&cid=995334552.1754650390&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=2&sid=1754680531&sct=8&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=ga4_initialized&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-08T19%3A35%3A51.381Z&epn.page_duration=2&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x661&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&_et=1&tfd=6186".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
k.Kb @ js?id=G-V1B8R98P79:915
k.add @ js?id=G-V1B8R98P79:918
k.Kl @ js?id=G-V1B8R98P79:934
k.cq @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:930
vn @ js?id=G-V1B8R98P79:448
Bp @ js?id=G-V1B8R98P79:468
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:662
gz @ js?id=G-V1B8R98P79:662
k.bq @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:946
v @ js?id=G-V1B8R98P79:487
En @ js?id=G-V1B8R98P79:450
er @ js?id=G-V1B8R98P79:487
dr.flush @ js?id=G-V1B8R98P79:491
dr.push @ js?id=G-V1B8R98P79:489
Wq @ js?id=G-V1B8R98P79:484
event @ js?id=G-V1B8R98P79:751
VD @ js?id=G-V1B8R98P79:757
YD.b.push @ js?id=G-V1B8R98P79:763
RD @ js?id=G-V1B8R98P79:763
ZD @ js?id=G-V1B8R98P79:763
kJ @ js?id=G-V1B8R98P79:854
fJ @ js?id=G-V1B8R98P79:853
(anonymous) @ js?id=G-V1B8R98P79:857
setTimeout
Qc @ js?id=G-V1B8R98P79:239
nJ @ js?id=G-V1B8R98P79:857
(anonymous) @ js?id=G-V1B8R98P79:351
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
k.ao @ js?id=G-V1B8R98P79:220
bf @ js?id=G-V1B8R98P79:289
(anonymous) @ js?id=G-V1B8R98P79:788
$f @ js?id=G-V1B8R98P79:304
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
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5861v898116370za200zd898116370&_p=1754681751373&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528500~104684208~104684211~104948813~105103161~105103163~105135708~105135710&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=3&sid=1754680531&sct=8&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=scroll&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&epn.percent_scrolled=90&_et=3&tfd=6307".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
k.Kb @ js?id=G-V1B8R98P79:915
k.add @ js?id=G-V1B8R98P79:918
k.Kl @ js?id=G-V1B8R98P79:934
k.cq @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:930
vn @ js?id=G-V1B8R98P79:448
Bp @ js?id=G-V1B8R98P79:468
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:662
gz @ js?id=G-V1B8R98P79:662
k.bq @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:946
v @ js?id=G-V1B8R98P79:487
En @ js?id=G-V1B8R98P79:450
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
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5861v898116370za200zd898116370&_p=1754681751373&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528500~104684208~104684211~104948813~105103161~105103163~105135708~105135710&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&dt=DeepResearch-TimeCapsule&dl=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&sid=1754680531&sct=8&seg=1&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&en=page_view&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.page_category=research&ep.page_type=application&ep.pathname=%2Fdeep-research&ep.consent_analytics=true&ep.consent_functional=true&_et=118&tfd=6310".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
k.Kb @ js?id=G-V1B8R98P79:915
k.add @ js?id=G-V1B8R98P79:918
k.Kl @ js?id=G-V1B8R98P79:934
k.cq @ js?id=G-V1B8R98P79:934
(anonymous) @ js?id=G-V1B8R98P79:930
vn @ js?id=G-V1B8R98P79:448
Bp @ js?id=G-V1B8R98P79:468
(anonymous) @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:662
gz @ js?id=G-V1B8R98P79:662
k.bq @ js?id=G-V1B8R98P79:930
c @ js?id=G-V1B8R98P79:946
v @ js?id=G-V1B8R98P79:487
En @ js?id=G-V1B8R98P79:450
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754681745268:160
options.factory @ webpack.js?v=1754681745268:712
__webpack_require__ @ webpack.js?v=1754681745268:37
fn @ webpack.js?v=1754681745268:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754681745268:182
options.factory @ webpack.js?v=1754681745268:712
__webpack_require__ @ webpack.js?v=1754681745268:37
__webpack_exec__ @ main-app.js?v=1754681745268:2824
(anonymous) @ main-app.js?v=1754681745268:2825
webpackJsonpCallback @ webpack.js?v=1754681745268:1388
(anonymous) @ main-app.js?v=1754681745268:9
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
(app-pages-browser)/./node_modules/next/dist/client/app-index.js @ main-app.js?v=1754681745268:160
options.factory @ webpack.js?v=1754681745268:712
__webpack_require__ @ webpack.js?v=1754681745268:37
fn @ webpack.js?v=1754681745268:369
eval @ app-next-dev.js:11
eval @ app-bootstrap.js:62
loadScriptsInSequence @ app-bootstrap.js:23
appBootstrap @ app-bootstrap.js:56
eval @ app-next-dev.js:10
(app-pages-browser)/./node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1754681745268:182
options.factory @ webpack.js?v=1754681745268:712
__webpack_require__ @ webpack.js?v=1754681745268:37
__webpack_exec__ @ main-app.js?v=1754681745268:2824
(anonymous) @ main-app.js?v=1754681745268:2825
webpackJsonpCallback @ webpack.js?v=1754681745268:1388
(anonymous) @ main-app.js?v=1754681745268:9
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
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5861v898116370za200zd898116370&_p=1754681751373&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528500~104684208~104684211~104948813~105103161~105103163~105135708~105135710&sr=2240x1260&cid=995334552.1754650390&ul=en-us&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=5&sid=1754680531&sct=8&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-08-08T19%3A35%3A51.519Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=138.0.0.0&ep.viewport_size=2240x661&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=35&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&_et=1&tfd=11312".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
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
prompt-input.tsx:481 🔍 Submit context check: {enableRAG: true, webSearchEnabled: false, webSearchConfigured: false, hasRAGSearch: true, hasWebSearch: true}
prompt-input.tsx:502 🧠 Skipping initial RAG search for deep-research - Master Orchestrator will handle DataInspector magic filtering
prompt-input.tsx:507 🚫 UI web search disabled - WebSearchAgent will handle intelligent web expansion when needed
useResearch.ts:943 🔬 Starting intelligent research for: "which is the best RL Methods"
ResearchOrchestrator.ts:104 🔬 Starting research for: "which is the best RL Methods"
ResearchOrchestrator.ts:110 🎯 DataInspector Architecture: Getting userdocs metadata for intelligent filtering
VectorStore.ts:794 🔍 getDocumentMetadata: Filtering for document types [userdocs]
VectorStore.ts:856 🔍 getDocumentMetadata: Retrieved 2 documents (filtered for: userdocs)
ResearchOrchestrator.ts:114 📊 Retrieved 2 documents (89 total chunks) - DataInspector will sample and filter
ResearchOrchestrator.ts:1427 🧠 Master Orchestrator eligibility: RAG sources: true, Substantial content: true
ResearchOrchestrator.ts:138 🧠 MASTER ORCHESTRATOR: Bypassing traditional pipeline entirely - using intelligent tool orchestration
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:969 📋 Adding new step: master_orchestrator_1754681774445_1_oxpvr
ResearchOrchestrator.ts:1437 🧠 Master Orchestrator: Starting with intelligent document analysis for "which is the best RL Methods"
ResearchOrchestrator.ts:1438 📊 Found 2 sources for DataInspector magic filtering
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
ResearchOrchestrator.ts:1588 🧠 Calling Master Orchestrator.research() with 2 found sources for intelligent analysis
Orchestrator.ts:130 🧠 Master LLM Orchestrator starting for: "which is the best RL Methods"
Orchestrator.ts:158 🎯 Master LLM analyzing situation and planning tool calls...
Orchestrator.ts:166 🔄 Master LLM Iteration 1: Answer the user's query: "which is the best RL Methods"
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5861v898116370za200zd898116370&_p=1754681751373&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528500~104684208~104684211~104948813~105103161~105103163~105135708~105135710&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=6&sid=1754680531&sct=8&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=22878&tfd=34221".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
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
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:169
research @ Orchestrator.ts:141
executeMasterOrchestrator @ ResearchOrchestrator.ts:1589
executeResearch @ ResearchOrchestrator.ts:153
await in executeResearch
useResearch.useCallback[performIntelligentResearch] @ useResearch.ts:993
handleSubmit @ ResearchOutput.tsx:809
handleSubmitWithContext @ prompt-input.tsx:513
handleKeyDown @ prompt-input.tsx:471
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
Orchestrator.ts:316 🧠 Master LLM Decision Response (633 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: The goal is to identify the "best RL methods." To do this, we need to understand the available information. DataInspector is crucial for filtering and analyzing the provided documents to identify relevant information about RL methods.
NEXT_GOAAL: Analyze the 2 documents to extract information about different RL methods, their strengths, weaknesses, and applications.

ACTION: COMplete
REASONING: After DataInspector analyzes the documents, we w...
Orchestrator.ts:587 🔍 PARSING DEBUG: Full response (633 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: The goal is to identify the "best RL methods." To do this, we need to understand the available information. DataInspector is crucial for filtering and analyzing the provided documents to identify relevant information about RL methods.
NEXT_GOAAL: Analyze the 2 documents to extract information about different RL methods, their strengths, weaknesses, and applications.

ACTION: COMplete
REASONING: After DataInspector analyzes the documents, we will proceed to extract patterns and relevant data.
NEXT_GOAAL: Extract key information about RL methods from the filtered documents.

Orchestrator.ts:600 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:603 🎯 PARSED TOOL_NAME (FIRST): DataInspector
Orchestrator.ts:612 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:619 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataInspector
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataInspector', reasoning: 'Need to call DataInspector to progress toward the goal'}
Orchestrator.ts:197 🔧 Master LLM calling tool: DataInspector - Need to call DataInspector to progress toward the goal
Orchestrator.ts:736 🔍 PLAN-GUIDED VALIDATION: DataInspector
Orchestrator.ts:737 📋 Current agents called: []
Orchestrator.ts:738 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1128 ✅ Agent execution validated: DataInspector always allowed as first agent
Orchestrator.ts:1160 🔧 Executing tool: DataInspector (original: DataInspector)
ResearchOrchestrator.ts:1446 🚀 Master Orchestrator Agent started: DataInspector (DataInspector)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 5% (Initializing document analysis)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
DataInspectorAgent.ts:55 🔎 DataInspector: Received document metadata - performing multi-document sampling and analysis
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 10% (Starting multi-document analysis)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
DataInspectorAgent.ts:1057 🧠 DataInspector Magic: Starting multi-document sampling and filtering
DataInspectorAgent.ts:1069 📋 Found 2 documents to analyze: (2) ['GRPO_Papper.pdf', 'LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf']
DataInspectorAgent.ts:1094 🔍 Analyzing 2 documents for relevance BEFORE sampling
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 15% (Analyzing 2 documents for relevance)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
DataInspectorAgent.ts:1102 🔍 DEBUG Document 1 Metadata Text: {documentSource: 'GRPO_Papper.pdf', hasText: true, textLength: 34, textPreview: 'Document metadata: GRPO_Papper.pdf...'}
DataInspectorAgent.ts:1102 🔍 DEBUG Document 2 Metadata Text: {documentSource: 'LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf', hasText: true, textLength: 104, textPreview: 'Document metadata: LLMS FOR ENGINEERING- TEACHING …O DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf...'}
DataInspectorAgent.ts:128 🔍 Multi-document analysis: 2 documents detected
scheduler.development.js:14 [Violation] 'message' handler took 197ms
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
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:1124
process @ DataInspectorAgent.ts:57
executeToolCall @ Orchestrator.ts:1171
masterLLMOrchestration @ Orchestrator.ts:198
DataInspectorAgent.ts:169 🤖 Multi-document analysis: Okay, let's break down this multi-document analysis and answer the critical questions.

**1. DOCUMENT TYPES:**

*   **DOCUMENT 1 (doc_1754658663251_vpl5u967b):** Likely a Research Paper or a technical report. The title "GRP0_Papper.pdf" strongly suggests this.
*   **DOCUMENT 2 (doc_1754658915966_7rv
DataInspectorAgent.ts:349 🧠 DataInspector analyzing 2 documents with pure LLM intelligence
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 15% ([01:07:31] Step 1/2: Analyzing doc_1754658663251_vpl5u967b)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
DataInspectorAgent.ts:450 🔍 DEBUG DataInspector Document 1 Sample Content: {chunksCount: 1, sampleLength: 45, firstChunkPreview: 'Document metadata: GRPO_Papper.pdf...', hasActualContent: false}
DataInspectorAgent.ts:490 📤 DEBUG DataInspector Document 1 LLM Prompt: {promptLength: 1335, containsDocumentContent: true, contentSampleInPrompt: 'You are an intelligent document analyzer. Perform …n from this document:\n\nTOPICS: List all topics...'}
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
analyzeDocumentIntelligently @ DataInspectorAgent.ts:496
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:366
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:282
performMultiDocumentAnalysis @ DataInspectorAgent.ts:172
DataInspectorAgent.ts:499 🧠 DataInspector Document 1 LLM Response: Okay, I understand. I will analyze the provided document sample and respond in the requested format.

**Document 1 Sample Content:**

[CHUNK 1]:
Document metadata: GRPO_Papper.pdf

STEP 1: Comprehensive Document Analysis

**TOPICS:**
*   Reinforcement Learning (RL)
*   Algorithms
*   Deep Learning
*   Optimization
*   Decision Making
*   Control Systems

**PEOPLE:**
*   (No specific people mentioned in the provided snippet.  Assuming the document is a research paper, it would likely mention auth...
DataInspectorAgent.ts:508 🔍 DataInspector Document 1 Parsed: {docType: '** Research Paper', mainEntity: '** Reinforcement Learning', relevantText: '** YES', reasoning: '** The document snippet explicitly mentions severa… algorithms (Q-Learning, SARSA, Policy Gradien...'}
DataInspectorAgent.ts:515 🔍 COMPREHENSIVE ANALYSIS: Query="which is the best RL Methods", Entity="** Reinforcement Learning" → Result: true
DataInspectorAgent.ts:368 🔍 Document 1 intelligent analysis: {docType: '** Research Paper', primaryEntity: '** Reinforcement Learning', isRelevant: true, reasoning: '** The document snippet explicitly mentions severa… algorithms (Q-Learning, SARSA, Policy Gradien...'}
DataInspectorAgent.ts:377 ✅ Including relevant document: ** Research Paper (** Reinforcement Learning)
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 20% ([01:08:09] ✅ Including: ** Reinforcement Learning)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
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
discoverContentAreas @ DataInspectorAgent.ts:679
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:386
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
discoverEntitiesIntelligently @ DataInspectorAgent.ts:635
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:389
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
discoverDocumentRole @ DataInspectorAgent.ts:737
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:392
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 45% ([01:08:39] Step 2/2: Analyzing doc_1754658915966_7rvdl7exw)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
DataInspectorAgent.ts:450 🔍 DEBUG DataInspector Document 2 Sample Content: {chunksCount: 1, sampleLength: 115, firstChunkPreview: 'Document metadata: LLMS FOR ENGINEERING- TEACHING …O DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf...', hasActualContent: true}
DataInspectorAgent.ts:490 📤 DEBUG DataInspector Document 2 LLM Prompt: {promptLength: 1405, containsDocumentContent: true, contentSampleInPrompt: 'You are an intelligent document analyzer. Perform …v2.pdf\n\nSTEP 1: Comprehensive Document Analysi...'}
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
analyzeDocumentIntelligently @ DataInspectorAgent.ts:496
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:366
DataInspectorAgent.ts:499 🧠 DataInspector Document 2 LLM Response: Okay, I will analyze the provided document sample and respond in the requested format.

**Analysis of "LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf"**

**STEP 1: Comprehensive Document Analysis**

*   **TOPICS:**
    *   Rocket Design
    *   High-Powered Rockets
    *   Engineering (specifically aerospace/rocket engineering)
    *   Machine Learning (LLMs)
    *   Teaching/Training Models
    *   Computational Design
*   **PEOPLE:** (This is difficult to...
DataInspectorAgent.ts:508 🔍 DataInspector Document 2 Parsed: {docType: '** Research Paper/Technical Report', mainEntity: '** Large Language Models (LLMs) in Aerospace Engineering', relevantText: '** YES', reasoning: '** The document title explicitly mentions "RL Meth… and "LLMs for engineering."  The query asks a...'}
DataInspectorAgent.ts:515 🔍 COMPREHENSIVE ANALYSIS: Query="which is the best RL Methods", Entity="** Large Language Models (LLMs) in Aerospace Engineering" → Result: true
DataInspectorAgent.ts:368 🔍 Document 2 intelligent analysis: {docType: '** Research Paper/Technical Report', primaryEntity: '** Large Language Models (LLMs) in Aerospace Engineering', isRelevant: true, reasoning: '** The document title explicitly mentions "RL Meth… and "LLMs for engineering."  The query asks a...'}
DataInspectorAgent.ts:377 ✅ Including relevant document: ** Research Paper/Technical Report (** Large Language Models (LLMs) in Aerospace Engineering)
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 50% ([01:09:21] ✅ Including: ** Large Language Models (LLMs) in Aerospace Engineering)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
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
discoverContentAreas @ DataInspectorAgent.ts:679
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:386
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
discoverEntitiesIntelligently @ DataInspectorAgent.ts:635
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:389
scheduler.development.js:14 [Violation] 'message' handler took 182ms
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
discoverDocumentRole @ DataInspectorAgent.ts:737
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:392
DataInspectorAgent.ts:411 📊 Document filtering: 2 total → 2 relevant
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 90% (Filtered 2 documents → 2 relevant)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
DataInspectorAgent.ts:298 📋 Multi-Document Analysis: 2 documents with 0 relationships
DataInspectorAgent.ts:336 ✅ DOCUMENT ANALYSIS: All 2 documents deemed relevant - no filtering applied
DataInspectorAgent.ts:1134 📊 Relevance analysis: 2 relevant out of 2 total documents
DataInspectorAgent.ts:1137 🔍 Sampling real chunks from 2 RELEVANT documents only
DataInspectorAgent.ts:1227 ✅ Sampled 18 real chunks from "GRPO_Papper.pdf" (60 total chunks)
DataInspectorAgent.ts:1227 ✅ Sampled 9 real chunks from "LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf" (29 total chunks)
DataInspectorAgent.ts:1262 ✅ Sampled chunks from 2 RELEVANT documents only
DataInspectorAgent.ts:1266 🔄 Replacing 2 document metadata with 27 relevant chunks (NO CONTAMINATION)
Orchestrator.ts:1175 ✅ Tool DataInspector completed in 189681ms
ResearchOrchestrator.ts:1535 ✅ Master Orchestrator Agent completed: DataInspector
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
Orchestrator.ts:166 🔄 Master LLM Iteration 2: Answer the user's query: "which is the best RL Methods"
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
masterLLMOrchestration @ Orchestrator.ts:169
Orchestrator.ts:316 🧠 Master LLM Decision Response (518 chars): ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The current execution plan is not created. The PlanningAgent is needed to create an intelligent execution strategy to address the goal of finding the best RL methods.
NEXT_GOAAL: Create an execution plan.



ACTION: COMplete
REASONING: The PlanningAgent will create an execution plan. This plan will guide the subsequent actions, ensuring that the data is processed in the most efficient and effective way.
NEXT_GOAL: Execute the plan created by ...
Orchestrator.ts:587 🔍 PARSING DEBUG: Full response (518 chars): ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The current execution plan is not created. The PlanningAgent is needed to create an intelligent execution strategy to address the goal of finding the best RL methods.
NEXT_GOAAL: Create an execution plan.



ACTION: COMplete
REASONING: The PlanningAgent will create an execution plan. This plan will guide the subsequent actions, ensuring that the data is processed in the most efficient and effective way.
NEXT_GOAL: Execute the plan created by the PlanningAgent.
Orchestrator.ts:600 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:603 🎯 PARSED TOOL_NAME (FIRST): PlanningAgent
Orchestrator.ts:612 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:619 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PlanningAgent
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PlanningAgent', reasoning: 'Need to call PlanningAgent to progress toward the goal'}
Orchestrator.ts:197 🔧 Master LLM calling tool: PlanningAgent - Need to call PlanningAgent to progress toward the goal
Orchestrator.ts:736 🔍 PLAN-GUIDED VALIDATION: PlanningAgent
Orchestrator.ts:737 📋 Current agents called: [DataInspector]
Orchestrator.ts:738 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1128 ✅ Agent execution validated: PlanningAgent execution is contextually appropriate
Orchestrator.ts:1160 🔧 Executing tool: PlanningAgent (original: PlanningAgent)
ResearchOrchestrator.ts:1446 🚀 Master Orchestrator Agent started: PlanningAgent (PlanningAgent)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
PlanningAgent.ts:60 🎯 PlanningAgent: Creating intelligent execution strategy for "which is the best RL Methods"
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 10% (Analyzing research context)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
PlanningAgent.ts:67 📊 Situation Analysis: {hasDocuments: true, documentCount: 27, hasDocumentAnalysis: true, relevantDocuments: 2, documentTypes: Array(2), …}
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 25% (Creating extraction strategy from DataInspector analysis)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
PlanningAgent.ts:550 🎯 PlanningAgent: Creating extraction strategy from DataInspector analysis
PlanningAgent.ts:573 ✅ Created extraction strategy: {documentType: 'Generic Document', queryIntent: 'performance_ranking', contentAreas: 0, patternCategories: 6, extractionTargets: 1}
PlanningAgent.ts:73 ✅ Created extraction strategy with 6 pattern categories
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 40% (Creating execution plan)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 50% (Generating strategic plan with LLM)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
scheduler.development.js:14 [Violation] 'message' handler took 164ms
inpage.js:12 [Violation] 'setTimeout' handler took 78ms
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
createExecutionPlan @ PlanningAgent.ts:187
process @ PlanningAgent.ts:80
executeToolCall @ Orchestrator.ts:1171
masterLLMOrchestration @ Orchestrator.ts:198
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 60% (Parsing execution strategy)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
PlanningAgent.ts:314 🔄 PlanningAgent parsing attempt 1/4
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:319 🔧 Array element separation fixes applied
responseCompletion.ts:234 🔍 JSON extraction failed: SyntaxError: Expected ',' or '}' after property value in JSON at position 3501 (line 36 column 66)
    at JSON.parse (<anonymous>)
    at parseJsonWithResilience (responseCompletion.ts:232:21)
    at Array.eval (PlanningAgent.ts:287:36)
    at PlanningAgent.parseExecutionPlan (PlanningAgent.ts:315:42)
    at PlanningAgent.createExecutionPlan (PlanningAgent.ts:192:25)
    at async PlanningAgent.process (PlanningAgent.ts:80:27)
    at async Orchestrator.executeToolCall (Orchestrator.ts:1171:7)
    at async Orchestrator.masterLLMOrchestration (Orchestrator.ts:198:9)
    at async Orchestrator.research (Orchestrator.ts:141:5)
    at async ResearchOrchestrator.executeMasterOrchestrator (ResearchOrchestrator.ts:1589:22)
    at async ResearchOrchestrator.executeResearch (ResearchOrchestrator.ts:153:33)
    at async useResearch.useCallback[performIntelligentResearch] (useResearch.ts:993:22)
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
parseJsonWithResilience @ responseCompletion.ts:234
eval @ PlanningAgent.ts:287
parseExecutionPlan @ PlanningAgent.ts:315
createExecutionPlan @ PlanningAgent.ts:192
responseCompletion.ts:235 🔍 Problematic JSON text: {
  "strategy": "Employ a structured extraction and synthesis approach to identify the best RL methods.  First, generate regex patterns to extract key information from the research papers. Then, use t...
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
parseJsonWithResilience @ responseCompletion.ts:235
eval @ PlanningAgent.ts:287
parseExecutionPlan @ PlanningAgent.ts:315
createExecutionPlan @ PlanningAgent.ts:192
responseCompletion.ts:319 🔧 Array element separation fixes applied
responseCompletion.ts:249 🔍 Array extraction failed: SyntaxError: Expected ',' or '}' after property value in JSON at position 3106 (line 34 column 66)
    at JSON.parse (<anonymous>)
    at parseJsonWithResilience (responseCompletion.ts:246:29)
    at Array.eval (PlanningAgent.ts:287:36)
    at PlanningAgent.parseExecutionPlan (PlanningAgent.ts:315:42)
    at PlanningAgent.createExecutionPlan (PlanningAgent.ts:192:25)
    at async PlanningAgent.process (PlanningAgent.ts:80:27)
    at async Orchestrator.executeToolCall (Orchestrator.ts:1171:7)
    at async Orchestrator.masterLLMOrchestration (Orchestrator.ts:198:9)
    at async Orchestrator.research (Orchestrator.ts:141:5)
    at async ResearchOrchestrator.executeMasterOrchestrator (ResearchOrchestrator.ts:1589:22)
    at async ResearchOrchestrator.executeResearch (ResearchOrchestrator.ts:153:33)
    at async useResearch.useCallback[performIntelligentResearch] (useResearch.ts:993:22)
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
parseJsonWithResilience @ responseCompletion.ts:249
eval @ PlanningAgent.ts:287
parseExecutionPlan @ PlanningAgent.ts:315
createExecutionPlan @ PlanningAgent.ts:192
responseCompletion.ts:250 🔍 Problematic array text: [
    {
      "agent": "PatternGenerator",
      "action": "Generate regex patterns for extracting key information (title, author, date, keywords, abstract, methodology, results, discussion, conclusio...
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
parseJsonWithResilience @ responseCompletion.ts:250
eval @ PlanningAgent.ts:287
parseExecutionPlan @ PlanningAgent.ts:315
createExecutionPlan @ PlanningAgent.ts:192
PlanningAgent.ts:339 ⚠️ Parsing attempt 1 failed: Invalid JSON after all extraction attempts
overrideMethod @ hook.js:608
parseExecutionPlan @ PlanningAgent.ts:339
createExecutionPlan @ PlanningAgent.ts:192
PlanningAgent.ts:314 🔄 PlanningAgent parsing attempt 2/4
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:319 🔧 Array element separation fixes applied
responseCompletion.ts:234 🔍 JSON extraction failed: SyntaxError: Expected ',' or '}' after property value in JSON at position 3501 (line 36 column 66)
    at JSON.parse (<anonymous>)
    at parseJsonWithResilience (responseCompletion.ts:232:21)
    at Array.eval (PlanningAgent.ts:293:41)
    at PlanningAgent.parseExecutionPlan (PlanningAgent.ts:315:42)
    at PlanningAgent.createExecutionPlan (PlanningAgent.ts:192:25)
    at async PlanningAgent.process (PlanningAgent.ts:80:27)
    at async Orchestrator.executeToolCall (Orchestrator.ts:1171:7)
    at async Orchestrator.masterLLMOrchestration (Orchestrator.ts:198:9)
    at async Orchestrator.research (Orchestrator.ts:141:5)
    at async ResearchOrchestrator.executeMasterOrchestrator (ResearchOrchestrator.ts:1589:22)
    at async ResearchOrchestrator.executeResearch (ResearchOrchestrator.ts:153:33)
    at async useResearch.useCallback[performIntelligentResearch] (useResearch.ts:993:22)
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
parseJsonWithResilience @ responseCompletion.ts:234
eval @ PlanningAgent.ts:293
parseExecutionPlan @ PlanningAgent.ts:315
createExecutionPlan @ PlanningAgent.ts:192
responseCompletion.ts:235 🔍 Problematic JSON text: {
  "strategy": "Employ a structured extraction and synthesis approach to identify the best RL methods.  First, generate regex patterns to extract key information from the research papers. Then, use t...
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
parseJsonWithResilience @ responseCompletion.ts:235
eval @ PlanningAgent.ts:293
parseExecutionPlan @ PlanningAgent.ts:315
createExecutionPlan @ PlanningAgent.ts:192
responseCompletion.ts:319 🔧 Array element separation fixes applied
responseCompletion.ts:249 🔍 Array extraction failed: SyntaxError: Expected ',' or '}' after property value in JSON at position 3106 (line 34 column 66)
    at JSON.parse (<anonymous>)
    at parseJsonWithResilience (responseCompletion.ts:246:29)
    at Array.eval (PlanningAgent.ts:293:41)
    at PlanningAgent.parseExecutionPlan (PlanningAgent.ts:315:42)
    at PlanningAgent.createExecutionPlan (PlanningAgent.ts:192:25)
    at async PlanningAgent.process (PlanningAgent.ts:80:27)
    at async Orchestrator.executeToolCall (Orchestrator.ts:1171:7)
    at async Orchestrator.masterLLMOrchestration (Orchestrator.ts:198:9)
    at async Orchestrator.research (Orchestrator.ts:141:5)
    at async ResearchOrchestrator.executeMasterOrchestrator (ResearchOrchestrator.ts:1589:22)
    at async ResearchOrchestrator.executeResearch (ResearchOrchestrator.ts:153:33)
    at async useResearch.useCallback[performIntelligentResearch] (useResearch.ts:993:22)
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
parseJsonWithResilience @ responseCompletion.ts:249
eval @ PlanningAgent.ts:293
parseExecutionPlan @ PlanningAgent.ts:315
createExecutionPlan @ PlanningAgent.ts:192
responseCompletion.ts:250 🔍 Problematic array text: [
    {
      "agent": "PatternGenerator",
      "action": "Generate regex patterns for extracting key information (title, author, date, keywords, abstract, methodology, results, discussion, conclusio...
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
parseJsonWithResilience @ responseCompletion.ts:250
eval @ PlanningAgent.ts:293
parseExecutionPlan @ PlanningAgent.ts:315
createExecutionPlan @ PlanningAgent.ts:192
PlanningAgent.ts:339 ⚠️ Parsing attempt 2 failed: Invalid JSON after all extraction attempts
overrideMethod @ hook.js:608
parseExecutionPlan @ PlanningAgent.ts:339
createExecutionPlan @ PlanningAgent.ts:192
PlanningAgent.ts:314 🔄 PlanningAgent parsing attempt 3/4
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:319 🔧 Array element separation fixes applied
responseCompletion.ts:234 🔍 JSON extraction failed: SyntaxError: Expected ',' or '}' after property value in JSON at position 3501 (line 36 column 66)
    at JSON.parse (<anonymous>)
    at parseJsonWithResilience (responseCompletion.ts:232:21)
    at Array.eval (PlanningAgent.ts:303:41)
    at PlanningAgent.parseExecutionPlan (PlanningAgent.ts:315:42)
    at PlanningAgent.createExecutionPlan (PlanningAgent.ts:192:25)
    at async PlanningAgent.process (PlanningAgent.ts:80:27)
    at async Orchestrator.executeToolCall (Orchestrator.ts:1171:7)
    at async Orchestrator.masterLLMOrchestration (Orchestrator.ts:198:9)
    at async Orchestrator.research (Orchestrator.ts:141:5)
    at async ResearchOrchestrator.executeMasterOrchestrator (ResearchOrchestrator.ts:1589:22)
    at async ResearchOrchestrator.executeResearch (ResearchOrchestrator.ts:153:33)
    at async useResearch.useCallback[performIntelligentResearch] (useResearch.ts:993:22)
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
parseJsonWithResilience @ responseCompletion.ts:234
eval @ PlanningAgent.ts:303
parseExecutionPlan @ PlanningAgent.ts:315
createExecutionPlan @ PlanningAgent.ts:192
responseCompletion.ts:235 🔍 Problematic JSON text: {
  "strategy": "Employ a structured extraction and synthesis approach to identify the best RL methods.  First, generate regex patterns to extract key information from the research papers. Then, use t...
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
parseJsonWithResilience @ responseCompletion.ts:235
eval @ PlanningAgent.ts:303
parseExecutionPlan @ PlanningAgent.ts:315
createExecutionPlan @ PlanningAgent.ts:192
responseCompletion.ts:319 🔧 Array element separation fixes applied
responseCompletion.ts:249 🔍 Array extraction failed: SyntaxError: Expected ',' or '}' after property value in JSON at position 3106 (line 34 column 66)
    at JSON.parse (<anonymous>)
    at parseJsonWithResilience (responseCompletion.ts:246:29)
    at Array.eval (PlanningAgent.ts:303:41)
    at PlanningAgent.parseExecutionPlan (PlanningAgent.ts:315:42)
    at PlanningAgent.createExecutionPlan (PlanningAgent.ts:192:25)
    at async PlanningAgent.process (PlanningAgent.ts:80:27)
    at async Orchestrator.executeToolCall (Orchestrator.ts:1171:7)
    at async Orchestrator.masterLLMOrchestration (Orchestrator.ts:198:9)
    at async Orchestrator.research (Orchestrator.ts:141:5)
    at async ResearchOrchestrator.executeMasterOrchestrator (ResearchOrchestrator.ts:1589:22)
    at async ResearchOrchestrator.executeResearch (ResearchOrchestrator.ts:153:33)
    at async useResearch.useCallback[performIntelligentResearch] (useResearch.ts:993:22)
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
parseJsonWithResilience @ responseCompletion.ts:249
eval @ PlanningAgent.ts:303
parseExecutionPlan @ PlanningAgent.ts:315
createExecutionPlan @ PlanningAgent.ts:192
responseCompletion.ts:250 🔍 Problematic array text: [
    {
      "agent": "PatternGenerator",
      "action": "Generate regex patterns for extracting key information (title, author, date, keywords, abstract, methodology, results, discussion, conclusio...
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
parseJsonWithResilience @ responseCompletion.ts:250
eval @ PlanningAgent.ts:303
parseExecutionPlan @ PlanningAgent.ts:315
createExecutionPlan @ PlanningAgent.ts:192
PlanningAgent.ts:339 ⚠️ Parsing attempt 3 failed: Invalid JSON after all extraction attempts
overrideMethod @ hook.js:608
parseExecutionPlan @ PlanningAgent.ts:339
createExecutionPlan @ PlanningAgent.ts:192
PlanningAgent.ts:314 🔄 PlanningAgent parsing attempt 4/4
PlanningAgent.ts:352 🔍 Attempting manual plan extraction from text response
PlanningAgent.ts:334 ✅ Successfully parsed execution plan on attempt 4
PlanningAgent.ts:194 🎯 Generated execution plan: {strategy: 'regex-extraction', stepCount: 4, confidence: 0.7}
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 80% (Storing execution plan)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 100% (Execution plan completed)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
PlanningAgent.ts:98 ✅ Execution plan created: regex-extraction
Orchestrator.ts:1175 ✅ Tool PlanningAgent completed in 60040ms
ResearchOrchestrator.ts:1535 ✅ Master Orchestrator Agent completed: PlanningAgent
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
Orchestrator.ts:166 🔄 Master LLM Iteration 3: Answer the user's query: "which is the best RL Methods"
Orchestrator.ts:65 📋 Following execution plan: Next step is PatternGenerator - create patterns
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
scheduler.development.js:14 [Violation] 'message' handler took 346ms
scheduler.development.js:14 [Violation] 'message' handler took 226ms
scheduler.development.js:14 [Violation] 'message' handler took 200ms
scheduler.development.js:14 [Violation] 'message' handler took 211ms
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
masterLLMOrchestration @ Orchestrator.ts:169
Orchestrator.ts:316 🧠 Master LLM Decision Response (373 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REAASONING: The goal is to identify the best RL methods. To do this, we need to extract relevant information from the documents about different RL methods and their characteristics. Patterns will help us to identify these methods and their key features.
NEXT_GOAAL: Create patterns to extract structured data about RL methods.

Orchestrator.ts:587 🔍 PARSING DEBUG: Full response (373 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REAASONING: The goal is to identify the best RL methods. To do this, we need to extract relevant information from the documents about different RL methods and their characteristics. Patterns will help us to identify these methods and their key features.
NEXT_GOAAL: Create patterns to extract structured data about RL methods.

Orchestrator.ts:600 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:603 🎯 PARSED TOOL_NAME (FIRST): PatternGenerator
Orchestrator.ts:612 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:619 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PatternGenerator
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PatternGenerator', reasoning: 'Need to call PatternGenerator to progress toward the goal'}
Orchestrator.ts:197 🔧 Master LLM calling tool: PatternGenerator - Need to call PatternGenerator to progress toward the goal
Orchestrator.ts:736 🔍 PLAN-GUIDED VALIDATION: PatternGenerator
Orchestrator.ts:737 📋 Current agents called: [DataInspector, PlanningAgent]
Orchestrator.ts:738 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1023 ✅ PatternGenerator validated against execution plan - prerequisites met
Orchestrator.ts:1128 ✅ Agent execution validated: PatternGenerator execution follows planned sequence - step 1 of 4
Orchestrator.ts:1160 🔧 Executing tool: PatternGenerator (original: PatternGenerator)
ResearchOrchestrator.ts:1446 🚀 Master Orchestrator Agent started: PatternGenerator (PatternGenerator)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
PatternGeneratorAgent.ts:26 🎯 PatternGenerator: Creating extraction strategies
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PatternGenerator - 10% (Analyzing existing patterns)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
PatternGeneratorAgent.ts:32 📋 DEBUG - Existing patterns before PatternGenerator: {count: 2, patterns: Array(2), hasSharedKnowledge: true}
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PatternGenerator - 30% (Generating extraction strategies)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
PatternGeneratorAgent.ts:51 🧠 PatternGenerator: Generating dynamic patterns via LLM analysis
PatternGeneratorAgent.ts:56 ✅ Using PlanningAgent extraction strategy: {documentType: 'Generic Document', queryIntent: 'performance_ranking', patternCategories: 6}
PatternGeneratorAgent.ts:818 🎯 PatternGenerator: Creating patterns from extraction strategy
PatternGeneratorAgent.ts:875 💡 Creating patterns for 2 concepts
PatternGeneratorAgent.ts:917 🏆 Adding performance ranking patterns
PatternGeneratorAgent.ts:935 ✅ Generated 4 strategy-based patterns: (4) ['Concept pattern for which', 'Concept pattern for methods', 'Ranking indicators', 'Comparative metrics']
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PatternGenerator - 100% (Pattern generation completed)
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
Orchestrator.ts:1175 ✅ Tool PatternGenerator completed in 3ms
ResearchOrchestrator.ts:1535 ✅ Master Orchestrator Agent completed: PatternGenerator
useResearch.ts:947 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754681774445_1_oxpvr
useResearch.ts:954 📋 Skipping duplicate step processing: master_orchestrator_1754681774445_1_oxpvr_in_progress
Orchestrator.ts:166 🔄 Master LLM Iteration 4: Answer the user's query: "which is the best RL Methods"
Orchestrator.ts:65 📋 Following execution plan: Next step is Extractor - extract data
scheduler.development.js:14 [Violation] 'message' handler took 175ms
scheduler.development.js:14 [Violation] 'message' handler took 196ms
