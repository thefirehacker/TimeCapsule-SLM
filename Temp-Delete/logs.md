prompt-input.tsx:481 🔍 Submit context check: {enableRAG: true, webSearchEnabled: false, webSearchConfigured: false, hasRAGSearch: true, hasWebSearch: true}
prompt-input.tsx:502 🧠 Skipping initial RAG search for deep-research - Master Orchestrator will handle DataInspector magic filtering
prompt-input.tsx:507 🚫 UI web search disabled - WebSearchAgent will handle intelligent web expansion when needed
useResearch.ts:940 🔬 Starting intelligent research for: "give me the best project by Rutwik"
ResearchOrchestrator.ts:104 🔬 Starting research for: "give me the best project by Rutwik"
ResearchOrchestrator.ts:110 🎯 DataInspector Architecture: Getting userdocs metadata for intelligent filtering
VectorStore.ts:794 🔍 getDocumentMetadata: Filtering for document types [userdocs]
VectorStore.ts:856 🔍 getDocumentMetadata: Retrieved 2 documents (filtered for: userdocs)
ResearchOrchestrator.ts:114 📊 Retrieved 2 documents (20 total chunks) - DataInspector will sample and filter
ResearchOrchestrator.ts:1410 🧠 Master Orchestrator eligibility: RAG sources: true, Substantial content: true
ResearchOrchestrator.ts:138 🧠 MASTER ORCHESTRATOR: Bypassing traditional pipeline entirely - using intelligent tool orchestration
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:966 📋 Adding new step: master_orchestrator_1754654983957_1_397c3
ResearchOrchestrator.ts:1420 🧠 Master Orchestrator: Starting with intelligent document analysis for "give me the best project by Rutwik"
ResearchOrchestrator.ts:1421 📊 Found 2 sources for DataInspector magic filtering
AgentRegistry.ts:21 📝 Registered agent: QueryPlanner - Expands queries based on intent and domain understanding
AgentRegistry.ts:21 📝 Registered agent: DataInspector - Analyzes RAG chunks to understand data structure and quality
AgentRegistry.ts:21 📝 Registered agent: PlanningAgent - Creates intelligent execution strategies based on document analysis and query requirements
AgentRegistry.ts:21 📝 Registered agent: PatternGenerator - Creates extraction strategies based on data inspection
AgentRegistry.ts:21 📝 Registered agent: Extractor - Executes extraction using generated patterns
index.ts:74 🌐 WebSearchAgent disabled by configuration
AgentRegistry.ts:21 📝 Registered agent: Synthesizer - Consolidates extracted data into a coherent answer
ResearchOrchestrator.ts:1554 🧠 Calling Master Orchestrator.research() with 2 found sources for intelligent analysis
Orchestrator.ts:130 🧠 Master LLM Orchestrator starting for: "give me the best project by Rutwik"
Orchestrator.ts:158 🎯 Master LLM analyzing situation and planning tool calls...
Orchestrator.ts:166 🔄 Master LLM Iteration 1: Answer the user's query: "give me the best project by Rutwik"
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5861v898116370za200zd898116370&_p=1754654964757&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527906~104528501~104684208~104684211~104948813~105033763~105033765~105103161~105103163~105135708~105135710&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=6&sid=1754654956&sct=2&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=4021&tfd=31121".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:915
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754654955842:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/508a5a1202df984a.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754654955842:1367
Promise.then
hotCheck @ webpack.js?v=1754654955842:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
webpack.js?v=1754654955842:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/bcbd77698e393790.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754654955842:1367
Promise.then
hotCheck @ webpack.js?v=1754654955842:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleApplyUpdates @ hot-reloader-client.js:123
eval @ hot-reloader-client.js:143
Promise.then
tryApplyUpdatesWebpack @ hot-reloader-client.js:142
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 2355ms
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
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:169
research @ Orchestrator.ts:141
executeMasterOrchestrator @ ResearchOrchestrator.ts:1555
executeResearch @ ResearchOrchestrator.ts:153
await in executeResearch
useResearch.useCallback[performIntelligentResearch] @ useResearch.ts:990
handleSubmit @ ResearchOutput.tsx:807
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
Orchestrator.ts:316 🧠 Master LLM Decision Response (609 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: The goal is to find the "best project by Rutwik". To do this, we need to analyze the available documents to identify those authored or related to Rutwik. DataInspector is the most efficient tool for this, as it can filter the documents based on the author or content.
NEXT_GOAAL: Analyze the 2 available documents to identify those related to Rutwik.

ACTION: COMplete
REASONING: The DataInspector will return a filtered set of documents containi...
Orchestrator.ts:556 🔍 PARSING DEBUG: Full response (609 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: The goal is to find the "best project by Rutwik". To do this, we need to analyze the available documents to identify those authored or related to Rutwik. DataInspector is the most efficient tool for this, as it can filter the documents based on the author or content.
NEXT_GOAAL: Analyze the 2 available documents to identify those related to Rutwik.

ACTION: COMplete
REASONING: The DataInspector will return a filtered set of documents containing information about Rutwik's projects.
NEXT_GOAL:  The DataInspector will return the filtered documents.




Orchestrator.ts:569 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:572 🎯 PARSED TOOL_NAME (FIRST): DataInspector
Orchestrator.ts:581 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:588 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataInspector
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataInspector', reasoning: 'Need to call DataInspector to progress toward the goal'}
Orchestrator.ts:197 🔧 Master LLM calling tool: DataInspector - Need to call DataInspector to progress toward the goal
Orchestrator.ts:705 🔍 PLAN-GUIDED VALIDATION: DataInspector
Orchestrator.ts:706 📋 Current agents called: []
Orchestrator.ts:707 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1021 ✅ Agent execution validated: DataInspector always allowed as first agent
Orchestrator.ts:1053 🔧 Executing tool: DataInspector (original: DataInspector)
ResearchOrchestrator.ts:1429 🚀 Master Orchestrator Agent started: DataInspector (DataInspector)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
ResearchOrchestrator.ts:1464 📊 Master Orchestrator Agent progress: DataInspector - 5% (Initializing document analysis)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
DataInspectorAgent.ts:55 🔎 DataInspector: Received document metadata - performing multi-document sampling and analysis
ResearchOrchestrator.ts:1464 📊 Master Orchestrator Agent progress: DataInspector - 10% (Starting multi-document analysis)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
DataInspectorAgent.ts:1096 🧠 DataInspector Magic: Starting multi-document sampling and filtering
DataInspectorAgent.ts:1108 📋 Found 2 documents to analyze: (2) ['Rutwik_resume.pdf', 'www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf']
DataInspectorAgent.ts:1133 🔍 Analyzing 2 documents for relevance BEFORE sampling
ResearchOrchestrator.ts:1464 📊 Master Orchestrator Agent progress: DataInspector - 15% (Analyzing 2 documents for relevance)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
DataInspectorAgent.ts:128 🔍 Multi-document analysis: 2 documents detected
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754654955842:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/b849fd655c0cf2a0.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754654955842:1367
Promise.then
hotCheck @ webpack.js?v=1754654955842:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 814ms
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
webpack.js?v=1754654955842:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/9a4d20e96955b906.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754654955842:1367
Promise.then
hotCheck @ webpack.js?v=1754654955842:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1664ms
hot-reloader-client.js:197 [Fast Refresh] rebuilding
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
scheduler.development.js:14 [Violation] 'message' handler took 288ms
hot-reloader-client.js:197 [Fast Refresh] rebuilding
scheduler.development.js:14 [Violation] 'message' handler took 183ms
webpack.js?v=1754654955842:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/58b4054b65d1ee17.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754654955842:1367
Promise.then
hotCheck @ webpack.js?v=1754654955842:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 480ms
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
webpack.js?v=1754654955842:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/23af15cae3e0eccd.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754654955842:1367
Promise.then
hotCheck @ webpack.js?v=1754654955842:553
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
report-hmr-latency.js:14 [Fast Refresh] done in 1475ms
scheduler.development.js:14 [Violation] 'message' handler took 178ms
scheduler.development.js:14 [Violation] 'message' handler took 219ms
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
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:1151
process @ DataInspectorAgent.ts:57
executeToolCall @ Orchestrator.ts:1064
masterLLMOrchestration @ Orchestrator.ts:198
DataInspectorAgent.ts:169 🤖 Multi-document analysis: ## Analysis of Documents for "Best Project by Rutwik" Query

Here's a breakdown of the analysis based on the provided documents and critical rules:

**1. DOCUMENT TYPES:**

*   **DOCUMENT 1: `doc_1754651639787_1xpnqd751`**:  Likely a **CV/Resume**. The metadata explicitly states "Rutwik_resume.pdf".
DataInspectorAgent.ts:349 🧠 DataInspector analyzing 2 documents with pure LLM intelligence
ResearchOrchestrator.ts:1464 📊 Master Orchestrator Agent progress: DataInspector - 15% ([17:41:00] Step 1/2: Analyzing doc_1754651639787_1xpnqd751)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
inpage.js:12 [Violation] 'setTimeout' handler took 103ms
DataInspectorAgent.ts:481 🧠 DataInspector Document 1 LLM Response: TYPE: Resume
ENTITY: Rutwik Shinde
RELEVANT: YES
REASON: The document is titled "Rutwik_resume.pdf" and contains the name "Rutwik Shinde" in the filename. The query asks about "Rutwik's project", and the document is about Rutwik, making it relevant.
...
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
analyzeDocumentIntelligently @ DataInspectorAgent.ts:478
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:366
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:282
performMultiDocumentAnalysis @ DataInspectorAgent.ts:172
DataInspectorAgent.ts:490 🔍 DataInspector Document 1 Parsed: {docType: 'Resume', primaryEntity: 'Rutwik Shinde', relevantText: 'YES', reasoning: 'The document is titled "Rutwik_resume.pdf" and con…s the name "Rutwik Shinde" in the filename. Th...'}
DataInspectorAgent.ts:533 🔍 RELEVANCE DEBUG: Query person: "rutwik", Entity words: [rutwik, shinde]
DataInspectorAgent.ts:497 🔍 RELEVANCE ANALYSIS: Text="YES", Entity="Rutwik Shinde", Query="give me the best project by Rutwik" → Result: true
DataInspectorAgent.ts:368 🔍 Document 1 intelligent analysis: {docType: 'Resume', primaryEntity: 'Rutwik Shinde', isRelevant: true, reasoning: 'The document is titled "Rutwik_resume.pdf" and con…s the name "Rutwik Shinde" in the filename. Th...'}
DataInspectorAgent.ts:377 ✅ Including relevant document: Resume (Rutwik Shinde)
ResearchOrchestrator.ts:1464 📊 Master Orchestrator Agent progress: DataInspector - 20% ([17:41:08] ✅ Including: Rutwik Shinde)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
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
discoverContentAreas @ DataInspectorAgent.ts:720
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:386
scheduler.development.js:14 [Violation] 'message' handler took 181ms
scheduler.development.js:14 [Violation] 'message' handler took 165ms
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
discoverEntitiesIntelligently @ DataInspectorAgent.ts:676
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:389
scheduler.development.js:14 [Violation] 'message' handler took 169ms
ResearchOrchestrator.ts:1464 📊 Master Orchestrator Agent progress: DataInspector - 45% ([17:41:29] Step 2/2: Analyzing doc_1754651646772_rmrdolz5z)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
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
discoverDocumentRole @ DataInspectorAgent.ts:777
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:392
inpage.js:12 [Violation] 'setTimeout' handler took 83ms
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
analyzeDocumentIntelligently @ DataInspectorAgent.ts:478
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:366
DataInspectorAgent.ts:481 🧠 DataInspector Document 2 LLM Response: TYPE: Worklog/Blog Post
ENTITY: Tyler Romero
RELEVANT: YES
REASON: The document title includes "Tyler Romero" and the filename suggests it's a worklog related to a NanoGPT speedrun project, which is likely authored by Tyler Romero. The query asks about "Rutwik's project" and the document is about Tyler Romero, making the document relevant to the query.



...
DataInspectorAgent.ts:490 🔍 DataInspector Document 2 Parsed: {docType: 'Worklog/Blog Post', primaryEntity: 'Tyler Romero', relevantText: 'YES', reasoning: `The document title includes "Tyler Romero" and the…ename suggests it's a worklog related to a Nan...`}
DataInspectorAgent.ts:533 🔍 RELEVANCE DEBUG: Query person: "rutwik", Entity words: [tyler, romero]
DataInspectorAgent.ts:539 ⚠️ RELEVANCE OVERRIDE: LLM said YES but entity "Tyler Romero" doesn't match query person "rutwik"
overrideMethod @ hook.js:608
determineRelevance @ DataInspectorAgent.ts:539
analyzeDocumentIntelligently @ DataInspectorAgent.ts:495
DataInspectorAgent.ts:497 🔍 RELEVANCE ANALYSIS: Text="YES", Entity="Tyler Romero", Query="give me the best project by Rutwik" → Result: false
DataInspectorAgent.ts:368 🔍 Document 2 intelligent analysis: {docType: 'Worklog/Blog Post', primaryEntity: 'Tyler Romero', isRelevant: false, reasoning: `The document title includes "Tyler Romero" and the…ename suggests it's a worklog related to a Nan...`}
DataInspectorAgent.ts:405 ⏭️ Skipping irrelevant document: Worklog/Blog Post (Tyler Romero) - The document title includes "Tyler Romero" and the...
ResearchOrchestrator.ts:1464 📊 Master Orchestrator Agent progress: DataInspector - 50% ([17:41:37] ⏭️ Skipping: Tyler Romero)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
DataInspectorAgent.ts:411 📊 Document filtering: 2 total → 1 relevant
ResearchOrchestrator.ts:1464 📊 Master Orchestrator Agent progress: DataInspector - 90% (Filtered 2 documents → 1 relevant)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
DataInspectorAgent.ts:298 📋 Multi-Document Analysis: 1 documents with 0 relationships
DataInspectorAgent.ts:329 🚨 CROSS-CONTAMINATION PREVENTION: Filtered RAG chunks from 2 to 0 (removed 2 irrelevant chunks)
DataInspectorAgent.ts:1161 📊 Relevance analysis: 1 relevant out of 2 total documents
DataInspectorAgent.ts:1164 🔍 Sampling real chunks from 1 RELEVANT documents only
DataInspectorAgent.ts:1230 ✅ Sampled 2 real chunks from "Rutwik_resume.pdf" (2 total chunks)
DataInspectorAgent.ts:1185 ⏭️ Skipping chunk sampling for irrelevant document: www-tylerromero-com-posts-nanogpt-speedrun-worklog-....pdf
DataInspectorAgent.ts:1265 ✅ Sampled chunks from 1 RELEVANT documents only
DataInspectorAgent.ts:1269 🔄 Replacing 0 document metadata with 2 relevant chunks (NO CONTAMINATION)
Orchestrator.ts:1068 ✅ Tool DataInspector completed in 93262ms
ResearchOrchestrator.ts:1501 ✅ Master Orchestrator Agent completed: DataInspector
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
Orchestrator.ts:166 🔄 Master LLM Iteration 2: Answer the user's query: "give me the best project by Rutwik"
scheduler.development.js:14 [Violation] 'message' handler took 192ms
scheduler.development.js:14 [Violation] 'message' handler took 528ms
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
Orchestrator.ts:316 🧠 Master LLM Decision Response (534 chars): ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The goal is to find the "best project by Rutwik". To do this, we need a plan to efficiently analyze the available documents and extract relevant information about Rutwik's projects. The PlanningAgent will create an execution strategy to achieve this.
NEXT_GOAAL: Create an execution plan to find the best project by Rutwik.

ACTION: COMplete
REASONING: The PlanningAgent will provide a plan. We need to execute this plan.
NEXT_GOAL: Execute the p...
Orchestrator.ts:556 🔍 PARSING DEBUG: Full response (534 chars): ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The goal is to find the "best project by Rutwik". To do this, we need a plan to efficiently analyze the available documents and extract relevant information about Rutwik's projects. The PlanningAgent will create an execution strategy to achieve this.
NEXT_GOAAL: Create an execution plan to find the best project by Rutwik.

ACTION: COMplete
REASONING: The PlanningAgent will provide a plan. We need to execute this plan.
NEXT_GOAL: Execute the plan created by the PlanningAgent.

Orchestrator.ts:569 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:572 🎯 PARSED TOOL_NAME (FIRST): PlanningAgent
Orchestrator.ts:581 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:588 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PlanningAgent
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PlanningAgent', reasoning: 'Need to call PlanningAgent to progress toward the goal'}
Orchestrator.ts:197 🔧 Master LLM calling tool: PlanningAgent - Need to call PlanningAgent to progress toward the goal
Orchestrator.ts:705 🔍 PLAN-GUIDED VALIDATION: PlanningAgent
Orchestrator.ts:706 📋 Current agents called: [DataInspector]
Orchestrator.ts:707 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1021 ✅ Agent execution validated: PlanningAgent execution is contextually appropriate
Orchestrator.ts:1053 🔧 Executing tool: PlanningAgent (original: PlanningAgent)
ResearchOrchestrator.ts:1429 🚀 Master Orchestrator Agent started: PlanningAgent (PlanningAgent)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
PlanningAgent.ts:41 🎯 PlanningAgent: Creating intelligent execution strategy for "give me the best project by Rutwik"
PlanningAgent.ts:45 📊 Situation Analysis: {hasDocuments: true, documentCount: 2, hasDocumentAnalysis: true, relevantDocuments: 1, documentTypes: Array(1), …}
scheduler.development.js:14 [Violation] 'message' handler took 196ms
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
executeToolCall @ Orchestrator.ts:1064
masterLLMOrchestration @ Orchestrator.ts:198
PlanningAgent.ts:266 🔄 PlanningAgent parsing attempt 1/4
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:319 🔧 Array element separation fixes applied
PlanningAgent.ts:286 ✅ Successfully parsed execution plan on attempt 1
PlanningAgent.ts:146 🎯 Generated execution plan: {strategy: 'Employ a multi-stage approach leveraging pattern-b…ss potential information gaps through web search.', stepCount: 4, confidence: 0.8}
PlanningAgent.ts:60 ✅ Execution plan created: Employ a multi-stage approach leveraging pattern-based extraction and web expansion to identify and synthesize Rutwik's best project from available documents. Prioritize data quality and address potential information gaps through web search.
Orchestrator.ts:1068 ✅ Tool PlanningAgent completed in 45047ms
ResearchOrchestrator.ts:1501 ✅ Master Orchestrator Agent completed: PlanningAgent
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
Orchestrator.ts:166 🔄 Master LLM Iteration 3: Answer the user's query: "give me the best project by Rutwik"
Orchestrator.ts:65 📋 Following execution plan: Next step is PatternGenerator - Generate regex patterns for extracting relevant information from the resume documents (e.g., project titles, descriptions, technologies used, dates).
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
Orchestrator.ts:316 🧠 Master LLM Decision Response (324 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REASONING: The PlanningAgent has determined that generating regex patterns is the next step to extract relevant information from the documents. This is a crucial step for data extraction.
NEXT_GOAL: Generate regex patterns for extracting project information from the documents.

Orchestrator.ts:556 🔍 PARSING DEBUG: Full response (324 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REASONING: The PlanningAgent has determined that generating regex patterns is the next step to extract relevant information from the documents. This is a crucial step for data extraction.
NEXT_GOAL: Generate regex patterns for extracting project information from the documents.

Orchestrator.ts:569 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:572 🎯 PARSED TOOL_NAME (FIRST): PatternGenerator
Orchestrator.ts:581 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:588 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PatternGenerator
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PatternGenerator', reasoning: 'Need to call PatternGenerator to progress toward the goal'}
Orchestrator.ts:197 🔧 Master LLM calling tool: PatternGenerator - Need to call PatternGenerator to progress toward the goal
Orchestrator.ts:705 🔍 PLAN-GUIDED VALIDATION: PatternGenerator
Orchestrator.ts:706 📋 Current agents called: [DataInspector, PlanningAgent]
Orchestrator.ts:707 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:954 ✅ PatternGenerator validated against execution plan - prerequisites met
Orchestrator.ts:1021 ✅ Agent execution validated: PatternGenerator execution follows planned sequence - step 1 of 4
Orchestrator.ts:1053 🔧 Executing tool: PatternGenerator (original: PatternGenerator)
ResearchOrchestrator.ts:1429 🚀 Master Orchestrator Agent started: PatternGenerator (PatternGenerator)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
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
executeToolCall @ Orchestrator.ts:1064
masterLLMOrchestration @ Orchestrator.ts:198
PatternGeneratorAgent.ts:68 🎯 LLM regex generation response: REGEX_PATTERNS:
- - /Rutwik/gi
- - /Developed/gi
- - /frontend/gi
PatternGeneratorAgent.ts:425 🔍 Starting triple-tier pattern parsing from LLM response (65 chars)
PatternGeneratorAgent.ts:463 🔍 Found REGEX_PATTERNS section: "- - /Rutwik/gi
- - /Developed/gi
- - /frontend/gi..."
PatternGeneratorAgent.ts:567 🧪 Normalizing pattern: "/Rutwik/gi"
PatternGeneratorAgent.ts:571 ✅ Already normalized: /Rutwik/gi
PatternGeneratorAgent.ts:567 🧪 Normalizing pattern: "/Developed/gi"
PatternGeneratorAgent.ts:571 ✅ Already normalized: /Developed/gi
PatternGeneratorAgent.ts:567 🧪 Normalizing pattern: "/frontend/gi"
PatternGeneratorAgent.ts:571 ✅ Already normalized: /frontend/gi
PatternGeneratorAgent.ts:430 ✅ Tier 1 SUCCESS: Found 3 patterns in structured format
PatternGeneratorAgent.ts:74 ✅ Generated 3 dynamic regex patterns: (3) ['/Rutwik/gi', '/Developed/gi', '/frontend/gi']
PatternGeneratorAgent.ts:94 ✅ DEBUG - Patterns after PatternGenerator: {previousCount: 1, newCount: 3, totalCount: 4}
Orchestrator.ts:1068 ✅ Tool PatternGenerator completed in 5366ms
ResearchOrchestrator.ts:1501 ✅ Master Orchestrator Agent completed: PatternGenerator
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754654983957_1_397c3_in_progress
Orchestrator.ts:166 🔄 Master LLM Iteration 4: Answer the user's query: "give me the best project by Rutwik"
Orchestrator.ts:65 📋 Following execution plan: Next step is WebSearchAgent - Expand knowledge by searching for 'Rutwik' and 'projects' or 'work experience' to identify additional relevant projects or information not present in the documents.
Orchestrator.ts:316 🧠 Master LLM Decision Response (500 chars): ACTION: CALL_TOOL
TOOL_NAME: WebSearchAgent
REASONING: The current documents are limited. A web search for "Rutwik" and "projects" or "work experience" is needed to identify additional relevant projects or information not present in the documents. This will help identify the 'best' project based on available information.
NEXT_GOAAL: Expand knowledge by searching for 'Rutwik' and 'projects' or 'work experience' to identify additional relevant projects or information not present in the documents.

Orchestrator.ts:556 🔍 PARSING DEBUG: Full response (500 chars): ACTION: CALL_TOOL
TOOL_NAME: WebSearchAgent
REASONING: The current documents are limited. A web search for "Rutwik" and "projects" or "work experience" is needed to identify additional relevant projects or information not present in the documents. This will help identify the 'best' project based on available information.
NEXT_GOAAL: Expand knowledge by searching for 'Rutwik' and 'projects' or 'work experience' to identify additional relevant projects or information not present in the documents.

Orchestrator.ts:569 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:572 🎯 PARSED TOOL_NAME (FIRST): WebSearchAgent
Orchestrator.ts:581 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:588 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=WebSearchAgent
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'WebSearchAgent', reasoning: 'Need to call WebSearchAgent to progress toward the goal'}
Orchestrator.ts:197 🔧 Master LLM calling tool: WebSearchAgent - Need to call WebSearchAgent to progress toward the goal
Orchestrator.ts:705 🔍 PLAN-GUIDED VALIDATION: WebSearchAgent
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
Orchestrator.ts:706 📋 Current agents called: [DataInspector, PlanningAgent, PatternGenerator]
Orchestrator.ts:707 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:889 📝 WebSearchAgent has no critical prerequisites
Orchestrator.ts:954 ✅ WebSearchAgent validated against execution plan - prerequisites met
Orchestrator.ts:1021 ✅ Agent execution validated: WebSearchAgent execution follows planned sequence - step 2 of 4
Orchestrator.ts:1025 ❌ Tool name normalization failed. Original: "WebSearchAgent", Normalized: "WebSearchAgent"
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
executeToolCall @ Orchestrator.ts:1025
masterLLMOrchestration @ Orchestrator.ts:198
Orchestrator.ts:1026 📋 Available tools: (6) ['QueryPlanner', 'DataInspector', 'PlanningAgent', 'PatternGenerator', 'Extractor', 'Synthesizer']
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
executeToolCall @ Orchestrator.ts:1026
masterLLMOrchestration @ Orchestrator.ts:198
ResearchOrchestrator.ts:1569 ❌ Master Orchestrator failed: Error: Tool WebSearchAgent (normalized: WebSearchAgent) not found in registry. Available: QueryPlanner, DataInspector, PlanningAgent, PatternGenerator, Extractor, Synthesizer
    at Orchestrator.executeToolCall (Orchestrator.ts:1027:13)
    at Orchestrator.masterLLMOrchestration (Orchestrator.ts:198:20)
    at async Orchestrator.research (Orchestrator.ts:141:5)
    at async ResearchOrchestrator.executeMasterOrchestrator (ResearchOrchestrator.ts:1555:22)
    at async ResearchOrchestrator.executeResearch (ResearchOrchestrator.ts:153:33)
    at async useResearch.useCallback[performIntelligentResearch] (useResearch.ts:990:22)
overrideMethod @ hook.js:608
error @ intercept-console-error.js:50
executeMasterOrchestrator @ ResearchOrchestrator.ts:1569
useResearch.ts:944 📋 Step update: synthesis - completed - ID: master_orchestrator_1754654983957_1_397c3
useResearch.ts:966 📋 Adding new step: master_orchestrator_1754654983957_1_397c3
ResearchSteps.tsx:513 🚫 Preventing duplicate step addition: master_orchestrator_1754654983957_1_397c3
useResearch.ts:996 ✅ Intelligent research completed: {steps: 1, sources: 2, confidence: 1, processingTime: 208574}
ResearchSteps.tsx:513 🚫 Preventing duplicate step addition: master_orchestrator_1754654983957_1_397c3
scheduler.development.js:14 [Violation] 'message' handler took 256ms
[Violation] Forced reflow while executing JavaScript took 54ms
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
scheduler.development.js:14 [Violation] 'message' handler took 190ms
