useAIFlowBuilder.ts:1877 🚀 TimeCapsule Version 4.8.5_010 - AI Flow Builder Starting
useAIFlowBuilder.ts:1878 ✅ Fix 1: DataInspector trust LLM decisions (semantic override fix)
useAIFlowBuilder.ts:1879 ✅ Fix 2: PatternGenerator fail-fast validation (no garbage extraction)
useAIFlowBuilder.ts:1880 ✅ Fix 3: SelectTrigger infinite re-render fix (stable callbacks + stable values)
useAIFlowBuilder.ts:1881 ✅ Fix 4: DataInspector parsing improvements (methods, filename, JSON)
useAIFlowBuilder.ts:1882 ✅ Fix 5: Multi-line list parsing (preserve newlines in methods/concepts)
useAIFlowBuilder.ts:847 🎬 [SESSION] Creating new ai-flow session...
useAIFlowBuilder.ts:849 📦 [SESSION] New session object created: {id: 'ai-flow_1763725013116_x7nqe87e5', name: 'AI Flow: using ddp pdf file build a lesson plan for me on d', source: 'ai-flow'}
useAIFlowBuilder.ts:856 📋 [SESSION] Updating sessions array: 0 -> 1
useAIFlowBuilder.ts:889 💾 [SESSION] Saving new session to VectorStore...
useAIFlowBuilder.ts:897 ✅ [SESSION] Session creation complete. Returning session ID: ai-flow_1763725013116_x7nqe87e5
useAIFlowBuilder.ts:1932 🆕 Created new AI Flow session: AI Flow: using ddp pdf file build a lesson plan for me on d
Orchestrator.ts:476 🧠 Master LLM Orchestrator starting for: "using ddp pdf file build a lesson plan for me on distributed training"
Orchestrator.ts:479 🚀 TimeCapsule Version 4.8.5_010 - Master Orchestrator
Orchestrator.ts:480 ✅ Micro-session architecture enabled (60 iterations, per-agent limits)
Orchestrator.ts:481 ✅ PatternGenerator validation: Fail-fast if no documents available
Orchestrator.ts:482 ✅ Plan-aware sequencing with intelligent validation
Orchestrator.ts:497 🎯 Master Orchestrator: Discovering documents for query "using ddp pdf file build a lesson plan for me on distributed training"
Orchestrator.ts:533 🔍 Discovering documents for query: "using ddp pdf file build a lesson plan for me on distributed training"
VectorStore.ts:1116 🔍 getDocumentMetadata: Filtering for document types [userdocs]
useAIFlowBuilder.ts:861 🎯 [SESSION] Setting active session ID: null -> ai-flow_1763725013116_x7nqe87e5
useAIFlowBuilder.ts:861 🎯 [SESSION] Setting active session ID: null -> ai-flow_1763725013116_x7nqe87e5
useAIFlowBuilder.ts:856 📋 [SESSION] Updating sessions array: 0 -> 1
useAIProviders.ts:232 🔄 aiProviders object updated
useAIFlowBuilder.ts:1140 💾 Persisting active session ID to localStorage: ai-flow_1763725013116_x7nqe87e5
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'ai-flow_1763725013116_x7nqe87e5', sessionsCount: 1, sessionsList: Array(1)}
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 280ms
VectorStore.ts:1178 🔍 getDocumentMetadata: Retrieved 1 documents (filtered for: userdocs)
Orchestrator.ts:537 📚 Found 1 user documents
Orchestrator.ts:564 ✅ Master Orchestrator: Prepared 1 document metadata for DataInspector analysis
Orchestrator.ts:900 🎯 Master LLM analyzing situation and planning tool calls...
Orchestrator.ts:3047 ❌ No extracted data found in any location
Orchestrator.ts:997 🎯 Starting micro-session: "Analyze document structure and relevance"
Orchestrator.ts:3047 ❌ No extracted data found in any location
Orchestrator.ts:916 🔄 Master LLM Iteration 1: Analyze document structure and relevance
VectorStore.ts:1940 📊 Synced frame AI Flow: using ddp pdf file build a lesson plan for me on d to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: session_ai-flow_1763725013116_x7nqe87e5 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for session_ai-flow_1763725013116_x7nqe87e5: 1-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI Flow: using ddp pdf file build a lesson plan for me on d (ID: session_ai-flow_1763725013116_x7nqe87e5, Rev: 1-lmywoebweu)
sessionStore.ts:75 💾 Session saved: AI Flow: using ddp pdf file build a lesson plan for me on d (ai-flow_1763725013116_x7nqe87e5)
useAIFlowBuilder.ts:891 ✅ [SESSION] New session saved to VectorStore
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
makeMasterLLMDecision @ Orchestrator.ts:1375
masterLLMOrchestration @ Orchestrator.ts:918
research @ Orchestrator.ts:510
await in research
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:1983
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
Orchestrator.ts:1378 🧠 Master LLM Decision Response (500 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: The goal is to analyze document structure and relevance, but document analysis is not done yet, and there is 1 pre-loaded document chunk available. DataInspector is the mandatory first step in the execution sequence to analyze and filter documents, identifying structure, relevance, and any key chunks for the goal of document analysis.
NEXT_GOAL: Obtain filtered and analyzed document insights to enable subsequent planning and extraction steps.
Orchestrator.ts:1698 🔍 PARSING DEBUG: Full response (500 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: The goal is to analyze document structure and relevance, but document analysis is not done yet, and there is 1 pre-loaded document chunk available. DataInspector is the mandatory first step in the execution sequence to analyze and filter documents, identifying structure, relevance, and any key chunks for the goal of document analysis.
NEXT_GOAL: Obtain filtered and analyzed document insights to enable subsequent planning and extraction steps.
Orchestrator.ts:1711 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1714 🎯 PARSED TOOL_NAME (FIRST): DataInspector
Orchestrator.ts:1723 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1730 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataInspector
Orchestrator.ts:1381 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataInspector', reasoning: 'Need to call DataInspector to progress toward the goal'}
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "DataInspector"
Orchestrator.ts:2936 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "DataInspector"
Orchestrator.ts:2936 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "DataInspector"
Orchestrator.ts:2936 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
Orchestrator.ts:1855 🔍 PLAN-GUIDED VALIDATION: DataInspector
Orchestrator.ts:1856 📋 Agent Status: No agents called yet
Orchestrator.ts:1857 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:2428 ✅ Agent execution validated: DataInspector always allowed as first agent
Orchestrator.ts:2552 🔧 Executing tool: DataInspector (original: DataInspector)
Orchestrator.ts:2563 ⏳ [orch-1763725013119-c4z7] Starting DataInspector - waiting for completion...
DataInspectorAgent.ts:97 🚀 TimeCapsule Version 4.8.5_010 - DataInspector Agent (Root Cause Fixes Applied)
DataInspectorAgent.ts:98 ✅ Fix 1: Format-agnostic technical terms parsing (newlines + commas)
DataInspectorAgent.ts:99 ✅ Fix 2: Filename metadata preservation from VectorStore
DataInspectorAgent.ts:100 ✅ Fix 3: Simplified JSON prompt structure
DataInspectorAgent.ts:101 ✅ Fix 4: Preserve newlines in multi-line lists (methods/concepts parsing)
DataInspectorAgent.ts:120 🔎 DataInspector: Received document metadata - performing multi-document sampling and analysis
DataInspectorAgent.ts:2231 📋 Found 1 documents to analyze: ['thefirehacker-github-io-til-ddp-python-basics-html.pdf']
DataInspectorAgent.ts:2296 🔍 Sampling real chunks from 1 documents for intelligent analysis
DataInspectorAgent.ts:2326 🔍 Sampling chunks from document 1/1: thefirehacker-github-io-til-ddp-python-basics-html.pdf
DataInspectorAgent.ts:2425 ✅ Sampled 9 real chunks from "thefirehacker-github-io-til-ddp-python-basics-html.pdf" (29 total chunks)
DataInspectorAgent.ts:2487 ✅ Sampled chunks from 1 documents with real content
DataInspectorAgent.ts:2492 🧠 Analyzing 1 documents with real sampled content for intelligent relevance decisions
DataInspectorAgent.ts:449 🔍 Multi-document analysis: 1 documents detected
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 156ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
eval @ index.ts:86
performMultiDocumentAnalysis @ DataInspectorAgent.ts:507
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:2495
await in performDocumentMetadataAnalysis
processNormally @ DataInspectorAgent.ts:130
await in processNormally
process @ FeedbackAwareAgent.ts:211
executeToolCall @ Orchestrator.ts:2564
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1066
masterLLMOrchestration @ Orchestrator.ts:943
await in masterLLMOrchestration
research @ Orchestrator.ts:510
await in research
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:1983
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
DataInspectorAgent.ts:508 🤖 Multi-document analysis: # Multi-Document Analysis Report

## 1. DOCUMENT TYPES
**Document 1 (doc_1763711814300_10p1nthud)**: **Technical Tutorial/Educational Blog Post**
- This is a structured educational document about Distributed Data Parallel (DDP) training in PyTorch
- Contains a clear table of contents with 11 section
DataInspectorAgent.ts:770 🧠 DataInspector analyzing 1 documents with pure LLM intelligence
DataInspectorAgent.ts:980 🔍 DEBUG DataInspector Document 1 Sample Content: {chunksCount: 9, sampleLength: 4780, firstChunkPreview: 'TL;DR\n\n Core Python patterns explained: Core Pyt…ints) into model-ready tensors in one elegant ...', hasActualContent: true, filename: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', …}
DataInspectorAgent.ts:1043 📤 DEBUG DataInspector Document 1 LLM Prompt: {promptLength: 6296, containsDocumentContent: true, contentSampleInPrompt: 'Analyze this document and determine its relevance …;DR\n\n Core Python patterns explained: Core P...'}
useAIProviders.ts:232 🔄 aiProviders object updated
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1763724986334:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/dda8ea69adee3e7a.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763724986334:1367
Promise.then
hotCheck @ webpack.js?v=1763724986334:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1731ms
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
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
eval @ index.ts:86
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1053
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:801
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
await in performMultiDocumentAnalysis
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:2495
await in performDocumentMetadataAnalysis
processNormally @ DataInspectorAgent.ts:130
await in processNormally
process @ FeedbackAwareAgent.ts:211
executeToolCall @ Orchestrator.ts:2564
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1066
masterLLMOrchestration @ Orchestrator.ts:943
await in masterLLMOrchestration
research @ Orchestrator.ts:510
await in research
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:1983
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
DataInspectorAgent.ts:1056 🧠 DataInspector Document 1 LLM Response: TYPE: Tutorial/Educational Guide
MAIN_ENTITY: PyTorch Distributed Data Parallel (DDP) training in Python
RELEVANT: YES
REASON: Document is a comprehensive DDP tutorial covering distributed training concepts, patterns, and implementation - directly matches query for building a lesson plan on distributed training.

METHODS:
set_seed()
all_reduce()
optimizer.step()
model.forward()
average_grads()
torch.tensor()
torch.manual_seed()
torch.cuda.manual_seed_all()
AutoModelForSequenceClassification
dict...
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
installHook.js:1 ⚠️ DataInspector: Failed to parse structured JSON response: Error: Invalid JSON after all extraction attempts
    at parseJsonWithResilience (responseCompletion.ts:262:11)
    at DataInspectorAgent.parseStructuredAnalysis (DataInspectorAgent.ts:1204:45)
    at DataInspectorAgent.analyzeDocumentIntelligently (DataInspectorAgent.ts:1061:31)
    at async DataInspectorAgent.parseMultiDocumentAnalysis (DataInspectorAgent.ts:801:27)
    at async DataInspectorAgent.updateContextFromMultiDocumentInspection (DataInspectorAgent.ts:671:32)
    at async DataInspectorAgent.performMultiDocumentAnalysis (DataInspectorAgent.ts:512:9)
    at async DataInspectorAgent.performDocumentMetadataAnalysis (DataInspectorAgent.ts:2495:5)
    at async DataInspectorAgent.processNormally (DataInspectorAgent.ts:130:7)
    at async Orchestrator.executeToolCall (Orchestrator.ts:2564:7)
    at async Orchestrator.executeToolCallWithMicroSession (Orchestrator.ts:1066:5)
    at async Orchestrator.masterLLMOrchestration (Orchestrator.ts:943:9)
    at async Orchestrator.research (Orchestrator.ts:510:5)
    at async useAIFlowBuilder.useCallback[planFlow] (useAIFlowBuilder.ts:1983:7)
overrideMethod @ installHook.js:1
parseStructuredAnalysis @ DataInspectorAgent.ts:1209
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1061
installHook.js:1 ⚠️ DataInspector: Structured JSON missing or invalid, falling back to regex extraction
overrideMethod @ installHook.js:1
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1063
DataInspectorAgent.ts:1263 🎯 DataInspector: Extracted MAIN_ENTITY: "PyTorch Distributed Data Parallel (DDP) training in Python"
installHook.js:1 ⚠️ DataInspector failed to extract CONCEPT_SYNTHESIS from response: "TYPE: Tutorial/Educational Guide
MAIN_ENTITY: PyTorch Distributed Data Parallel (DDP) training in Python
RELEVANT: YES
REASON: Document is a comprehensive DDP tutorial covering distributed training co..."
overrideMethod @ installHook.js:1
extractValue @ DataInspectorAgent.ts:1358
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1081
DataInspectorAgent.ts:1285 🎯 DataInspector: Extracted RELEVANT: "YES"
DataInspectorAgent.ts:1152 🔍 DataInspector Document 1 Parsed: {docType: 'Tutorial/Educational Guide MAINENTITY: PyTorch Dis…eClassifierOutput hiddenstates logits loss values', mainEntity: 'PyTorch Distributed Data Parallel (DDP) training in Python', relevantText: 'YES', reasoning: 'Document is a comprehensive DDP tutorial covering …ributed training concepts, patterns, and imple...'}
DataInspectorAgent.ts:1164 🔍 COMPREHENSIVE ANALYSIS: Query="using ddp pdf file build a lesson plan for me on distributed training", Entity="PyTorch Distributed Data Parallel (DDP) training in Python" → Result: true
DataInspectorAgent.ts:807 🔍 Document 1 intelligent analysis: {docType: 'Tutorial/Educational Guide MAINENTITY: PyTorch Dis…eClassifierOutput hiddenstates logits loss values', primaryEntity: 'PyTorch Distributed Data Parallel (DDP) training in Python', isRelevant: true, reasoning: 'Document is a comprehensive DDP tutorial covering …ributed training concepts, patterns, and imple...'}
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 160ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
eval @ index.ts:86
discoverContentAreas @ DataInspectorAgent.ts:1606
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:818
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 178ms
ai-frames:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
ai-frames:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
ai-frames:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
ai-frames:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
eval @ index.ts:86
discoverEntitiesIntelligently @ DataInspectorAgent.ts:1559
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:821
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 162ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
use-websocket.js:113 [Violation] 'setInterval' handler took 57ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
eval @ index.ts:86
discoverDocumentRole @ DataInspectorAgent.ts:1680
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:824
DataInspectorAgent.ts:3446 ✅ LLM classified document as RELEVANT - validating with semantic analysis
DataInspectorAgent.ts:3479 ✅ LLM decision validated - semantic score acceptable (70%)
DataInspectorAgent.ts:838 ✅ Including relevant document: Tutorial/Educational Guide MAINENTITY: PyTorch Distributed Data Parallel (DDP) training in Python RELEVANT: YES REASON: Document is a comprehensive DDP tutorial covering distributed training concepts, patterns, and implementation - directly matches query for building a lesson plan on distributed training. METHODS: setseed() allreduce() optimizer.step() model.forward() averagegrads() torch.tensor() torch.manualseed() torch.cuda.manualseedall() AutoModelForSequenceClassification dictionary comprehension for tensor conversion kwargs unpacking with gradient averaging parameter broadcasting CONCEPTS: Distributed Data Parallel (DDP) model replicas synchronization gradient averaging vs gradient summing seeding for reproducibility rank-based data distribution worldsize tensor operations GPU device placement learning rate scaling parameter broadcasting lock-step training bucketing and overlap autograd hooks forward pass chain batch unpacking PEOPLE: [None explicitly mentioned - refers to "instructor" generically] DATATYPES: PyTorch tensors Python dictionaries Hugging Face datasets inputids attentionmask labels gradients model parameters SequenceClassifierOutput hiddenstates logits loss values (LLM decision trusted (semantic validation: 70%) - Document is a comprehensive DDP tutorial covering distributed training concepts, patterns, and imple)
DataInspectorAgent.ts:864 🎯 DataInspector: Stored concept synthesis for document doc_1763711814300_10p1nthud
DataInspectorAgent.ts:895 📊 Document filtering: 1 total → 1 relevant
DataInspectorAgent.ts:691 📋 Multi-Document Analysis: 1 documents with 0 relationships
DataInspectorAgent.ts:747 ✅ DOCUMENT ANALYSIS: All 1 documents deemed relevant - no filtering applied
DataInspectorAgent.ts:2651 🧠 DataInspector: Extracting intelligence from concept synthesis
DataInspectorAgent.ts:2675 🔍 Processing concept synthesis for doc_1763711814300_10p1nthud
DataInspectorAgent.ts:2689 ✅ Extracted from synthesis: 0 methods, 0 concepts, 0 data points
DataInspectorAgent.ts:2835 🔍 Additional intelligence from document content: 0 table entries
DataInspectorAgent.ts:2879 📊 Formatted 0 measurements for PatternGenerator
DataInspectorAgent.ts:2702 🎯 Intelligence extracted from concept synthesis: {methods: 0, concepts: 0, people: 0, data: 0, measurements: 0}
installHook.js:1 ⚠️ No actionable intelligence extracted from concept synthesis - PatternGenerator may need to analyze chunks directly
overrideMethod @ installHook.js:1
extractIntelligenceFromConceptSynthesis @ DataInspectorAgent.ts:2721
await in extractIntelligenceFromConceptSynthesis
performMultiDocumentAnalysis @ DataInspectorAgent.ts:519
DataInspectorAgent.ts:2579 🔬 DataInspector: Extracting query-relevant terms from 1 document for: "using ddp pdf file build a lesson plan for me on distributed training"
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 154ms
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1763724986334:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/9e7e3b0a7206014a.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763724986334:1367
Promise.then
hotCheck @ webpack.js?v=1763724986334:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1088ms
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
[Violation] Forced reflow while executing JavaScript took 48ms
[Violation] Forced reflow while executing JavaScript took 41ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
eval @ index.ts:86
analyzeQueryForContentPrioritization @ DataInspectorAgent.ts:3156
buildQueryAwareContentSample @ DataInspectorAgent.ts:3089
extractQueryRelevantTerms @ DataInspectorAgent.ts:2584
performMultiDocumentAnalysis @ DataInspectorAgent.ts:523
DataInspectorAgent.ts:3102 📊 Document 1: Sampling 5 of 9 chunks (56%)
DataInspectorAgent.ts:2589 🔍 Content sample for technical extraction (2339 chars): --- DOCUMENT 1: doc_1763711814300_10p1nthud ---
TL;DR

 Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists...
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 166ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 178ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
eval @ index.ts:86
extractQueryRelevantTerms @ DataInspectorAgent.ts:2605
DataInspectorAgent.ts:2606 🎯 Technical terms LLM response: Based on the user's query about building a lesson plan on distributed training using the DDP PDF file, here are the relevant terms:

METHODS: 
- DDP (Distributed Data Parallel)
- all_reduce
- broadcast
- Dictionary comprehensions
- Kwargs unpacking (**)
- set_seed
- optimizer.step()

CONCEPTS:
- Distributed training
- Model replicas
- Seeding (making model replicas identical)
- Visual mental model of distributed training
- Minimal distributed training loop
- Common pitfalls & fixes
- world_size
- rank
- Gradient synchronization (SUM of all grads, divide by world_size)
- GPU tensors
- Forward pass
- Tensor operations

DATA_TYPES:
- PyTorch tensors
- Hugging Face datasets
- Python dicts
- batch
- input_ids
- attention_mask
- labels

PEOPLE: [None mentioned in document]

The document appears to be a teaching resource structured as a tutorial with sections including: visual mental model, seeding, Python idioms, DDP wrapper, training loop, common pitfalls, exercises, cheatsheet, and appendix - making it well-suited for lesson plan development.
DataInspectorAgent.ts:2938 🔍 Parsing methods line: ""
DataInspectorAgent.ts:2967 💾 Saving methods: "DDP (Distributed Data Parallel)
all_reduce
broadcast
Dictionary comprehensions
Kwargs unpacking (**)..."
DataInspectorAgent.ts:2999 ✅ Parsed methods: 7 items (3) ['DDP (Distributed Data Parallel)', 'all_reduce', 'broadcast']
DataInspectorAgent.ts:2938 🔍 Parsing concepts line: ""
DataInspectorAgent.ts:2967 💾 Saving concepts: "Distributed training
Model replicas
Seeding (making model replicas identical)
Visual mental model of..."
DataInspectorAgent.ts:2999 ✅ Parsed concepts: 13 items (3) ['Distributed training', 'Model replicas', 'Seeding (making model replicas identical)']
DataInspectorAgent.ts:2938 🔍 Parsing data line: ""
DataInspectorAgent.ts:2967 💾 Saving data: "PyTorch tensors
Hugging Face datasets
Python dicts
batch
input_ids
attention_mask
labels..."
DataInspectorAgent.ts:2999 ✅ Parsed data: 7 items (3) ['PyTorch tensors', 'Hugging Face datasets', 'Python dicts']
DataInspectorAgent.ts:2938 🔍 Parsing people line: "[None mentioned in document]"
DataInspectorAgent.ts:2967 💾 Saving people: "[None mentioned in document]
The document appears to be a teaching resource structured as a tutorial..."
DataInspectorAgent.ts:2610 🔍 Parsed technical terms: {methods: Array(7), concepts: Array(13), people: Array(0), data: Array(7)}
DataInspectorAgent.ts:2620 ✅ Document insights stored in context.sharedKnowledge: {methods: 7, concepts: 13, people: 0, data: 7}
DataInspectorAgent.ts:2629 📋 Extracted methods: (7) ['DDP (Distributed Data Parallel)', 'all_reduce', 'broadcast', 'Dictionary comprehensions', 'Kwargs unpacking (**)', 'set_seed', 'optimizer.step()']
DataInspectorAgent.ts:2503 📊 Relevance filtering: 1 relevant out of 1 total documents
DataInspectorAgent.ts:2514 🔄 Replacing 1 document metadata with 9 relevant chunks from intelligent analysis
Orchestrator.ts:2565 ✅ [orch-1763725013119-c4z7] DataInspector process() completed - agent finished
Orchestrator.ts:2569 ✅ Tool DataInspector completed in 65908ms
Orchestrator.ts:3241 🔍 PlanningAgent consuming and validating DataInspector results using Claude Code-style logic
PlanningAgent.ts:2578 🎯 PlanningAgent: Consuming and validating results from DataInspector
PlanningAgent.ts:1849 🔍 PlanningAgent: Validating DataInspector results for query: "using ddp pdf file build a lesson plan for me on distributed training"
PlanningAgent.ts:1877 🔍 VALIDATION DEBUG: Testing query "using ddp pdf file build a lesson plan for me on distributed training" against entity patterns
PlanningAgent.ts:1881 🔍 VALIDATION DEBUG: Pattern /\b([A-Z][a-z]+)'s\s+(.+)/ → Match: null
PlanningAgent.ts:1881 🔍 VALIDATION DEBUG: Pattern /from\s+([A-Z][a-z]+)'s\s+(.+)/ → Match: null
PlanningAgent.ts:1881 🔍 VALIDATION DEBUG: Pattern /by\s+([A-Z][a-z]+)\b/ → Match: null
PlanningAgent.ts:1881 🔍 VALIDATION DEBUG: Pattern /([A-Z][a-z]+)'s\s+(blog|work|project|research)/ → Match: null
PlanningAgent.ts:1891 🔍 VALIDATION DEBUG: No entity ownership pattern found in query "using ddp pdf file build a lesson plan for me on distributed training"
PlanningAgent.ts:2063 ✅ VALIDATION SUCCESS: DataInspector results validated - Found relevant documents and extracted meaningful entities
PlanningAgent.ts:2068 ✅ VALIDATION SUCCESS RESULT: {isValid: true, reason: 'DataInspector successfully analyzed 1 documents and extracted 5 entity categories'}
PlanningAgent.ts:2591 ✅ DataInspector validation passed
Orchestrator.ts:2573 🔍 Quality assessment for DataInspector: acceptable
Orchestrator.ts:3520 🔍 DataInspector approved 1 documents - fetching ALL chunks
Orchestrator.ts:3521 📊 Approved documents: ['thefirehacker-github-io-til-ddp-python-basics-html.pdf']
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 177ms
VectorStore.ts:1094 📚 Retrieved 1 documents of type: userdocs
VectorStore.ts:1829 🔍 getAllChunks: Filtering for document types [userdocs]
VectorStore.ts:1868 🔍 getAllChunks: Retrieved 29 chunks from 1 documents (filtered for: userdocs)
Orchestrator.ts:3530 📚 Total chunks in vector store: 29
Orchestrator.ts:3545 🎯 Filtered to 29 chunks from approved documents
Orchestrator.ts:3546 📊 Current context has 9 chunks
Orchestrator.ts:3549 📦 Expanded chunks: 9 → 29 (20 additional chunks for approved documents)
Orchestrator.ts:2616 🎯 Strategic validation checkpoint: DataInspector - running PlanningAgent validation
Orchestrator.ts:2617 🔍 PlanningAgent consuming DataInspector results for quality analysis...
PlanningAgent.ts:2578 🎯 PlanningAgent: Consuming and validating results from [object Object]
PlanningAgent.ts:2625 ℹ️ No specific validation for [object Object] - allowing to continue
Orchestrator.ts:2672 ✅ DataInspector results validated by PlanningAgent - quality acceptable
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 170ms
Orchestrator.ts:2694 ⏱️ Validation UI sync delay completed
Orchestrator.ts:1010 🧾 Micro-session "Analyze document structure and relevance" finished with status: completed
Orchestrator.ts:3047 ❌ No extracted data found in any location
Orchestrator.ts:997 🎯 Starting micro-session: "Extract structured data using generated patterns"
Orchestrator.ts:3047 ❌ No extracted data found in any location
Orchestrator.ts:916 🔄 Master LLM Iteration 2: Extract structured data using generated patterns
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
makeMasterLLMDecision @ Orchestrator.ts:1375
masterLLMOrchestration @ Orchestrator.ts:918
Orchestrator.ts:1378 🧠 Master LLM Decision Response (585 chars): ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The mandatory execution order requires calling PlanningAgent next after DataInspector to create an intelligent execution strategy, as the execution plan is not yet created. This is essential for the goal of extracting structured data using generated patterns, as it will outline the precise steps for subsequent phases like pattern generation and extraction without skipping any sequence.
NEXT_GOAL: Generate a validated execution plan that seque...
Orchestrator.ts:1698 🔍 PARSING DEBUG: Full response (585 chars): ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The mandatory execution order requires calling PlanningAgent next after DataInspector to create an intelligent execution strategy, as the execution plan is not yet created. This is essential for the goal of extracting structured data using generated patterns, as it will outline the precise steps for subsequent phases like pattern generation and extraction without skipping any sequence.
NEXT_GOAL: Generate a validated execution plan that sequences PatternGenerator for patterns and extraction, leading to structured data output.
Orchestrator.ts:1711 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1714 🎯 PARSED TOOL_NAME (FIRST): PlanningAgent
Orchestrator.ts:1723 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1730 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PlanningAgent
Orchestrator.ts:1381 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PlanningAgent', reasoning: 'Need to call PlanningAgent to progress toward the goal'}
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PlanningAgent"
Orchestrator.ts:2948 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PlanningAgent"
Orchestrator.ts:2948 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PlanningAgent"
Orchestrator.ts:2948 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:1855 🔍 PLAN-GUIDED VALIDATION: PlanningAgent
Orchestrator.ts:1856 📋 Agent Status: ✅ Completed: [DataInspector]
Orchestrator.ts:1857 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:2428 ✅ Agent execution validated: PlanningAgent execution is contextually appropriate
Orchestrator.ts:2552 🔧 Executing tool: PlanningAgent (original: PlanningAgent)
Orchestrator.ts:2563 ⏳ [orch-1763725013119-c4z7] Starting PlanningAgent - waiting for completion...
PlanningAgent.ts:61 🎯 PlanningAgent: Creating intelligent execution strategy for "using ddp pdf file build a lesson plan for me on distributed training"
PlanningAgent.ts:68 📊 Situation Analysis: {hasDocuments: true, documentCount: 29, hasDocumentAnalysis: true, relevantDocuments: 1, documentTypes: Array(1), …}
PlanningAgent.ts:603 🎯 PlanningAgent: Creating extraction strategy from DataInspector analysis
PlanningAgent.ts:614 🧠 Document context analysis: {documentType: 'Method Paper', documentPurpose: 'Introduces new method/algorithm', isMethodPaper: true, isSurveyPaper: false, mainContribution: 'DDP (Distributed Data Parallel)', …}
PlanningAgent.ts:1469 🔍 PlanningAgent: Analyzing query intent directly for "using ddp pdf file build a lesson plan for me on distributed training"
PlanningAgent.ts:1498 🎯 Direct intent analysis: No override needed, proceeding with normal flow
PlanningAgent.ts:623 🎯 Intelligent expectations: {shouldFindSpecificMethod: true, shouldFindComparisons: false, shouldInferFromContribution: true, expectedAnswerType: 'method_from_paper_contribution', contextualReasoning: "This appears to be a method paper introducing DDP … should reference this paper's main contribution."}
PlanningAgent.ts:889 🎯 PlanningAgent: Assessing document-section relevance to query: "using ddp pdf file build a lesson plan for me on distributed training"
PlanningAgent.ts:1360 🧠 Method paper detected: Focusing on main contribution "DDP (Distributed Data Parallel)"
PlanningAgent.ts:1071 🎯 Dynamic extraction targets based on analysis: (8) ['content', 'methods', 'concepts', 'data', 'primary_focus', 'methodpaper', 'findspecificmethod', 'inferfromcontribution']
PlanningAgent.ts:645 ✅ Created extraction strategy: {documentType: 'Method Paper', queryIntent: 'method_from_paper_contribution', contentAreas: 0, patternCategories: 4, extractionTargets: 8, …}
PlanningAgent.ts:83 ✅ Created extraction strategy with 4 pattern categories
PlanningAgent.ts:1506 🔍 PlanningAgent: Validating DataInspector classifications against query
PlanningAgent.ts:1592 🔍 PlanningAgent: Validating DataInspector document selections against query
PlanningAgent.ts:1606 🎯 Query constraints for validation: {}
PlanningAgent.ts:1609 
🔍 Validating document 1: "thefirehacker-github-io-til-ddp-python-basics-html.pdf"
PlanningAgent.ts:1610 📊 Document analysis - Type: Tutorial/Educational Guide MAINENTITY: PyTorch Distributed Data Parallel (DDP) training in Python RELEVANT: YES REASON: Document is a comprehensive DDP tutorial covering distributed training concepts, patterns, and implementation - directly matches query for building a lesson plan on distributed training. METHODS: setseed() allreduce() optimizer.step() model.forward() averagegrads() torch.tensor() torch.manualseed() torch.cuda.manualseedall() AutoModelForSequenceClassification dictionary comprehension for tensor conversion kwargs unpacking with gradient averaging parameter broadcasting CONCEPTS: Distributed Data Parallel (DDP) model replicas synchronization gradient averaging vs gradient summing seeding for reproducibility rank-based data distribution worldsize tensor operations GPU device placement learning rate scaling parameter broadcasting lock-step training bucketing and overlap autograd hooks forward pass chain batch unpacking PEOPLE: [None explicitly mentioned - refers to "instructor" generically] DATATYPES: PyTorch tensors Python dictionaries Hugging Face datasets inputids attentionmask labels gradients model parameters SequenceClassifierOutput hiddenstates logits loss values, Primary: PyTorch Distributed Data Parallel (DDP) training in Python
PlanningAgent.ts:1616 ✅ Document 1 validation passed: Document meets all query constraints
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 181ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
eval @ index.ts:86
createExecutionPlan @ PlanningAgent.ts:224
await in createExecutionPlan
process @ PlanningAgent.ts:104
await in process
executeToolCall @ Orchestrator.ts:2564
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1066
masterLLMOrchestration @ Orchestrator.ts:943
PlanningAgent.ts:369 🔄 PlanningAgent parsing attempt 1/4
PlanningAgent.ts:389 ✅ Successfully parsed execution plan on attempt 1
PlanningAgent.ts:231 🎯 Generated execution plan: {strategy: 'Direct synthesis approach leveraging the comprehen…progression from fundamentals to advanced topics.', stepCount: 4, confidence: 0.92}
PlanningAgent.ts:122 ✅ Execution plan created: Direct synthesis approach leveraging the comprehensive DDP tutorial document to build a structured lesson plan on distributed training. The document contains rich educational content including mental models, code examples, concepts, and practical patterns. We will extract key teaching components systematically and organize them into a pedagogical lesson plan structure with learning objectives, modules, hands-on exercises, and progression from fundamentals to advanced topics.
Orchestrator.ts:2565 ✅ [orch-1763725013119-c4z7] PlanningAgent process() completed - agent finished
Orchestrator.ts:2569 ✅ Tool PlanningAgent completed in 22477ms
Orchestrator.ts:2573 🔍 Quality assessment for PlanningAgent: acceptable
Orchestrator.ts:3047 ❌ No extracted data found in any location
Orchestrator.ts:916 🔄 Master LLM Iteration 3: Extract structured data using generated patterns
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2926 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "Extractor"
Orchestrator.ts:2920 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2942 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "ResponseFormatter"
Orchestrator.ts:2966 🎯 Mapping ResponseFormatter → ResponseFormatter (semantic similarity)
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 175ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
makeMasterLLMDecision @ Orchestrator.ts:1375
masterLLMOrchestration @ Orchestrator.ts:918
Orchestrator.ts:1378 🧠 Master LLM Decision Response (696 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REASONING: The execution plan from PlanningAgent specifies PatternGenerator as the next step to generate content-aware patterns for extracting structured data from the 29 document chunks, focusing on lesson plan components like DDP concepts, code examples, mental models, pitfalls, and Hugging Face integrations. This is required to progress Phase 3 (Extraction) since no patterns have been generated yet, and it includes integrated extraction to avoid s...
Orchestrator.ts:1698 🔍 PARSING DEBUG: Full response (696 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REASONING: The execution plan from PlanningAgent specifies PatternGenerator as the next step to generate content-aware patterns for extracting structured data from the 29 document chunks, focusing on lesson plan components like DDP concepts, code examples, mental models, pitfalls, and Hugging Face integrations. This is required to progress Phase 3 (Extraction) since no patterns have been generated yet, and it includes integrated extraction to avoid separate calls.
NEXT_GOAL: Generate patterns and extract raw structured data (e.g., conceptual explanations, code snippets, best practices) from the documents to enable synthesis in the next phase.
Orchestrator.ts:1711 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1714 🎯 PARSED TOOL_NAME (FIRST): PatternGenerator
Orchestrator.ts:1723 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1730 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PatternGenerator
Orchestrator.ts:1381 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PatternGenerator', reasoning: 'Need to call PatternGenerator to progress toward the goal'}
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2926 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2926 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2926 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:1855 🔍 PLAN-GUIDED VALIDATION: PatternGenerator
Orchestrator.ts:1856 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent]
Orchestrator.ts:1857 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2926 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:2284 ✅ PatternGenerator validated against execution plan - prerequisites met
Orchestrator.ts:2428 ✅ Agent execution validated: PatternGenerator execution follows planned sequence - step 1 of 4
Orchestrator.ts:2552 🔧 Executing tool: PatternGenerator (original: PatternGenerator)
Orchestrator.ts:2563 ⏳ [orch-1763725013119-c4z7] Starting PatternGenerator - waiting for completion...
PatternGeneratorAgent.ts:29 🎯 PatternGenerator: Creating extraction strategies
PatternGeneratorAgent.ts:35 📋 DEBUG - Existing patterns before PatternGenerator: {count: 1, patterns: Array(1), hasSharedKnowledge: true}
PatternGeneratorAgent.ts:249 🧠 PatternGenerator: Generating dynamic patterns via LLM analysis
PatternGeneratorAgent.ts:277 ✅ Using PlanningAgent extraction strategy: {documentType: 'Method Paper', queryIntent: 'method_from_paper_contribution', patternCategories: 4, availableStrategies: 1}
PatternGeneratorAgent.ts:1560 🎯 PatternGenerator: Generating focused patterns (3 regex + 1 semantic)
PatternGeneratorAgent.ts:1603 ✅ Generated 2 focused patterns: (2) ['Method extraction using DataInspector intelligence', 'Tutorial/Educational Guide MAINENTITY: PyTorch Dis…istributed Data Parallel (DDP) training in Python']
PatternGeneratorAgent.ts:2236 🎯 Running focused extraction: 1 regex patterns + 0 semantic patterns
PatternGeneratorAgent.ts:2242 ✅ Regex extraction: Found 32 items
PatternGeneratorAgent.ts:2258 🔄 After deduplication: 32 unique items
PatternGeneratorAgent.ts:1610 ✅ PatternGenerator: Extracted 32 items with focused patterns
PatternGeneratorAgent.ts:103 🔍 DEBUG PatternGenerator measurements check: {hasSharedKnowledge: true, hasDocumentInsights: true, hasMeasurements: true, measurementsLength: 0, measurementsType: 'object'}
PatternGeneratorAgent.ts:125 🔍 PatternGenerator: No measurements from DataInspector - analyzing ALL chunks with content-grounded approach
PatternGeneratorAgent.ts:131 📊 Analyzing 29 chunks for comprehensive measurement discovery (Claude Code style)
PatternGeneratorAgent.ts:165 📊 PatternGenerator: Discovered 109 measurements from complete dataset analysis
PatternGeneratorAgent.ts:476 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*todevice)/gi found 0 matches
PatternGeneratorAgent.ts:476 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*buf)/gi found 0 matches
PatternGeneratorAgent.ts:476 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*s)/gi found 0 matches
PatternGeneratorAgent.ts:476 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*for)/gi found 0 matches
PatternGeneratorAgent.ts:476 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*enforcebroadcast)/gi found 0 matches
PatternGeneratorAgent.ts:476 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*\s*\/\s*worldsize)/gi found 0 matches
PatternGeneratorAgent.ts:476 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*visual)/gi found 0 matches
PatternGeneratorAgent.ts:476 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*seeding)/gi found 0 matches
PatternGeneratorAgent.ts:476 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*two)/gi found 0 matches
PatternGeneratorAgent.ts:476 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*a)/gi found 0 matches
PatternGeneratorAgent.ts:476 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*minimal)/gi found 0 matches
PatternGeneratorAgent.ts:476 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*why)/gi found 0 matches
PatternGeneratorAgent.ts:241 🔍 Pattern validation: 0/12 patterns passed validation
PatternGeneratorAgent.ts:244 ✅ Induced 0 measurement families from document (style=dot, hits=109)
PatternGeneratorAgent.ts:58 🎯 PatternGenerator: Running immediate extraction with 2 generated patterns
PatternGeneratorAgent.ts:2236 🎯 Running focused extraction: 1 regex patterns + 0 semantic patterns
PatternGeneratorAgent.ts:2242 ✅ Regex extraction: Found 32 items
PatternGeneratorAgent.ts:2258 🔄 After deduplication: 32 unique items
PatternGeneratorAgent.ts:63 ✅ PatternGenerator: Extracted 32 items immediately
Orchestrator.ts:2565 ✅ [orch-1763725013119-c4z7] PatternGenerator process() completed - agent finished
Orchestrator.ts:2569 ✅ Tool PatternGenerator completed in 49ms
Orchestrator.ts:3241 🔍 PlanningAgent consuming and validating PatternGenerator results using Claude Code-style logic
PlanningAgent.ts:2578 🎯 PlanningAgent: Consuming and validating results from PatternGenerator
PlanningAgent.ts:2077 🔍 PlanningAgent: Deep validation of PatternGenerator results for query: "using ddp pdf file build a lesson plan for me on distributed training"
PlanningAgent.ts:2150 ✅ PatternGenerator results validated: 2 content-grounded patterns for query intent
PlanningAgent.ts:2601 ✅ PatternGenerator validation passed
Orchestrator.ts:2573 🔍 Quality assessment for PatternGenerator: acceptable
Orchestrator.ts:2697 ⚡ Strategic validation: Skipping validation for PatternGenerator (not a strategic checkpoint)
Orchestrator.ts:3004 ✅ Found 32 items in context.extractedData.raw
Orchestrator.ts:1122 ✅ PatternGenerator micro-session goal achieved: patterns + extraction complete
Orchestrator.ts:1010 🧾 Micro-session "Extract structured data using generated patterns" finished with status: completed
Orchestrator.ts:3004 ✅ Found 32 items in context.extractedData.raw
Orchestrator.ts:997 🎯 Starting micro-session: "Synthesize findings into final response"
Orchestrator.ts:3004 ✅ Found 32 items in context.extractedData.raw
Orchestrator.ts:916 🔄 Master LLM Iteration 4: Synthesize findings into final response
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2926 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "Extractor"
Orchestrator.ts:2920 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2942 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "ResponseFormatter"
Orchestrator.ts:2966 🎯 Mapping ResponseFormatter → ResponseFormatter (semantic similarity)
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 200ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
Orchestrator.ts:1378 🧠 Master LLM Decision Response (791 chars): ACTION: CALL_TOOL
TOOL_NAME: SynthesisCoordinator
REASONING: The mandatory execution order specifies SynthesisCoordinator as the next step after PatternGenerator (which is complete and included integrated extraction, marking data extraction as done). All prerequisites are fulfilled: documents analyzed, planning done, patterns and extraction completed. DataAnalyzer is bypassed, so direct synthesis from raw extracted data is appropriate to assemble the final report and achieve the goal of synthesi...
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
makeMasterLLMDecision @ Orchestrator.ts:1375
masterLLMOrchestration @ Orchestrator.ts:918
Orchestrator.ts:1698 🔍 PARSING DEBUG: Full response (791 chars): ACTION: CALL_TOOL
TOOL_NAME: SynthesisCoordinator
REASONING: The mandatory execution order specifies SynthesisCoordinator as the next step after PatternGenerator (which is complete and included integrated extraction, marking data extraction as done). All prerequisites are fulfilled: documents analyzed, planning done, patterns and extraction completed. DataAnalyzer is bypassed, so direct synthesis from raw extracted data is appropriate to assemble the final report and achieve the goal of synthesizing findings into a final response without skipping steps or calling redundant tools like Extractor (which is integrated and not needed separately).
NEXT_GOAL: Produce a coherent, synthesized final answer from the extracted data, patterns, and analysis, ready for formatting and completion.
Orchestrator.ts:1711 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1714 🎯 PARSED TOOL_NAME (FIRST): SynthesisCoordinator
Orchestrator.ts:1723 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1730 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=SynthesisCoordinator
Orchestrator.ts:1381 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'SynthesisCoordinator', reasoning: 'Need to call SynthesisCoordinator to progress toward the goal'}
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2942 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2942 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2942 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:1855 🔍 PLAN-GUIDED VALIDATION: SynthesisCoordinator
Orchestrator.ts:1856 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent, PatternGenerator]
Orchestrator.ts:1857 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
installHook.js:1 ⚠️ PLAN-AWARE SEQUENCING WARNING: Critical prerequisite required: Extractor must run before SynthesisCoordinator
overrideMethod @ installHook.js:1
executeToolCall @ Orchestrator.ts:2397
executeToolCallWithMicroSession @ Orchestrator.ts:1066
masterLLMOrchestration @ Orchestrator.ts:943
installHook.js:1 💡 Suggestion: Call Extractor before SynthesisCoordinator
overrideMethod @ installHook.js:1
executeToolCall @ Orchestrator.ts:2399
executeToolCallWithMicroSession @ Orchestrator.ts:1066
masterLLMOrchestration @ Orchestrator.ts:943
Orchestrator.ts:2403 📊 Micro-session status:
Orchestrator.ts:2404   - Extraction completed: true
Orchestrator.ts:2405   - Synthesis completed: false
Orchestrator.ts:3004 ✅ Found 32 items in context.extractedData.raw
Orchestrator.ts:2406   - Has extracted data: true
Orchestrator.ts:2407   - Completed sessions: Analyze document structure and relevance, Extract structured data using generated patterns
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "Extractor"
Orchestrator.ts:2920 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
Orchestrator.ts:2417 🔄 Auto-enforcing pipeline: running Extractor before SynthesisCoordinator
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "Extractor"
Orchestrator.ts:2920 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "Extractor"
Orchestrator.ts:2920 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
Orchestrator.ts:1855 🔍 PLAN-GUIDED VALIDATION: Extractor
Orchestrator.ts:1856 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent, PatternGenerator]
Orchestrator.ts:1857 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2926 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "Extractor"
Orchestrator.ts:2920 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2926 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:2079 🎯 Validating Extractor prerequisites - checking PatternGenerator dependency
Orchestrator.ts:2081 📊 PatternGenerator called: true
Orchestrator.ts:2284 ✅ Extractor validated against execution plan - prerequisites met
Orchestrator.ts:2428 ✅ Agent execution validated: Extractor execution follows planned sequence - step 2 of 4
Orchestrator.ts:2436 🚫 SKIPPING REDUNDANT EXTRACTOR: PatternGenerator already extracted 32 items
Orchestrator.ts:2437 ✅ Using PatternGenerator's extracted data to prevent overwriting good results
Orchestrator.ts:2419 ✅ Extractor completed - re-evaluating SynthesisCoordinator
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2942 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2942 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:1855 🔍 PLAN-GUIDED VALIDATION: SynthesisCoordinator
Orchestrator.ts:1856 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent, PatternGenerator, Extractor]
Orchestrator.ts:1857 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:3004 ✅ Found 32 items in context.extractedData.raw
Orchestrator.ts:1946 ✅ Extraction prerequisite satisfied: 32 items extracted
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2926 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "Extractor"
Orchestrator.ts:2920 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2942 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2926 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "Extractor"
Orchestrator.ts:2920 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
Orchestrator.ts:2113 🎯 Validating SynthesisCoordinator prerequisites - checking extraction completion
Orchestrator.ts:2133 ✅ Extraction micro-session completed - SynthesisCoordinator can proceed
Orchestrator.ts:2137 📊 Has extracted data: true
Orchestrator.ts:2146 ✅ SynthesisCoordinator will work directly with 32 extracted items (DataAnalyzer bypassed)
Orchestrator.ts:2284 ✅ SynthesisCoordinator validated against execution plan - prerequisites met
Orchestrator.ts:2428 ✅ Agent execution validated: SynthesisCoordinator execution follows planned sequence - step 3 of 4
Orchestrator.ts:2552 🔧 Executing tool: SynthesisCoordinator (original: SynthesisCoordinator)
Orchestrator.ts:2563 ⏳ [orch-1763725013119-c4z7] Starting SynthesisCoordinator - waiting for completion...
SynthesisCoordinator.ts:42 🎯 SynthesisCoordinator: Using extracted data (32 items)
SynthesisCoordinator.ts:45 🔍 DEBUG: First data item structure: {
  "content": " Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists, ints) into model-ready tensors in one elegant line — {k: torch.tensor(v).to(device) for k, v in item.items()}",
  "value": " Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists, ints) into model-ready tensors in one elegant line — {k: torch.tensor(v).to(device) for k, v in item.items()}",
  "unit": "",
  "context": "TL;DR\n\n Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists, ints) into model-ready tensors in one elegant line — {k: torch.tensor(v).to(device) for k, v in item.items()}\n\nconverts Hugging Face dataset samples to GPU ten",
  "confidence": 0.9,
  "sourceChunkId": "chunk_0",
  "sourceDocument": "thefirehacker-github-io-til-ddp-python-basics-html.pdf",
  "metadata": {
    "method": "regex",
    "type": "pattern_generated",
    "pattern": "/([^\\n]*(?:DDP \\(Distributed Data Parallel\\)|all_reduce|broadcast|Dictionary comprehensions|Kwargs unpacking \\(\\*\\*\\))[^\\n]*)/gi",
    "description": "Method extraction using DataInspector intelligence"
  }
}
SynthesisCoordinator.ts:46 🔍 DEBUG: All data items count: 32
SynthesisCoordinator.ts:48 🔍 DEBUG Item 1: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 2: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 3: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 4: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 5: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 6: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 7: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 8: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 9: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 10: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 11: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 12: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 13: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 14: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 15: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 16: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 17: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 18: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 19: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 20: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 21: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 22: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 23: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 24: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 25: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 26: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 27: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 28: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 29: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 30: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 31: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 32: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:65 🎯 SynthesisCoordinator: Assembling final report from 0 sections
SynthesisCoordinator.ts:116 🎯 SynthesisCoordinator: Generating query-focused report for: "using ddp pdf file build a lesson plan for me on distributed training"
SynthesisCoordinator.ts:128 🎯 Ranked 32 data items by query relevance
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 1: {content: '12) Quick Reference: Gradient sync patterns DDP from Scratch: a learner-friendly guide Learn why dic', value: '12) Quick Reference: Gradient sync patterns DDP fr…equivalent in distributed training. Plus: build a', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 100}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 2: {content: 'TL;DR 0) Visual mental model of distributed training 1) Seeding: making model replicas identical 2) ', value: 'TL;DR 0) Visual mental model of distributed traini…d? 6) Common pitfalls & fixes 7) From toy to real', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 90}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 3: {content: 'exact state. Why this mirrors Py Torch’s official DDP:Why this mirrors Py Torch’s official DDP: Py T', value: 'exact state. Why this mirrors Py Torch’s official …-facing parameter to control it. It’s an internal', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 60}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 4: {content: 'would either error or require slow implicit conversion on each forward pass. For large datasetslarge', value: 'would either error or require slow implicit conver…he entire dict in memory). A better approach uses', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 5: {content: 'implementation detail that ensures correctness. In Mini DDP , we make this synchronization explicit ', value: "implementation detail that ensures correctness. In…0_buf, src=0) # everyone receives rank0's tens or", source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 6: {content: 'def main(): dist.init_process_group("nccl") rank = dist.get_rank(); local_rank = int(os.environ.get(', value: 'def main(): dist.init_process_group("nccl") rank =…ers(), lr=1e-3) ds = load_dataset("glue", "mrpc")', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 7: {content: 'init or are debugging initialization issues. Note Note: Py Torch’s official DDP always performs this', value: 'init or are debugging initialization issues. Note …but hides it from you. Mini DDP makes it explicit', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 8: {content: 'build_model() on every rank. Forgetting to divide after Forgetting to divide after all_reduce(SUM)al', value: 'build_model() on every rank. Forgetting to divide …(SUM) → LR effectively × world_size . Fix: divide', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 9: {content: 'enforce_broadcast=True and observe it succeed. 2. Batching Batching: replace the single‑example hack', value: 'enforce_broadcast=True and observe it succeed. 2. …e hack with a Data Loader + Distributed Sampler .', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 10: {content: 's): outputs = self.model(input_ids, attention_mask=attention_mask, **kwargs) pooled = outputs[0][:, ', value: 's): outputs = self.model(input_ids, attention_mask…ram -= (lr / world_size) * param.grad # Scaled LR', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 199ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useAIFlowBuilder.ts:1121 ⏰ Auto-saving session (2-minute interval)...
VectorStore.ts:2000 📋 Retrieved latest revision for session_ai-flow_1763725013116_x7nqe87e5: 1-lmywoebweu
VectorStore.ts:1936 📊 Synced frame AI Flow: using ddp pdf file build a lesson plan for me on d to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: session_ai-flow_1763725013116_x7nqe87e5 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
VectorStore.ts:2000 📋 Retrieved latest revision for session_ai-flow_1763725013116_x7nqe87e5: 2-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI Flow: using ddp pdf file build a lesson plan for me on d (ID: session_ai-flow_1763725013116_x7nqe87e5, Rev: 2-lmywoebweu)
sessionStore.ts:75 💾 Session saved: AI Flow: using ddp pdf file build a lesson plan for me on d (ai-flow_1763725013116_x7nqe87e5)
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'ai-flow_1763725013116_x7nqe87e5', sessionsCount: 1, sessionsList: Array(1)}
scheduler.development.js:14 [Violation] 'message' handler took 213ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
eval @ index.ts:86
generateQueryFocusedReport @ SynthesisCoordinator.ts:134
assembleReport @ SynthesisCoordinator.ts:109
process @ SynthesisCoordinator.ts:68
await in process
executeToolCall @ Orchestrator.ts:2564
await in executeToolCall
executeToolCall @ Orchestrator.ts:2420
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1066
masterLLMOrchestration @ Orchestrator.ts:943
Orchestrator.ts:2565 ✅ [orch-1763725013119-c4z7] SynthesisCoordinator process() completed - agent finished
Orchestrator.ts:2569 ✅ Tool SynthesisCoordinator completed in 34888ms
Orchestrator.ts:3241 🔍 PlanningAgent consuming and validating SynthesisCoordinator results using Claude Code-style logic
PlanningAgent.ts:2578 🎯 PlanningAgent: Consuming and validating results from SynthesisCoordinator
PlanningAgent.ts:2315 🔍 PlanningAgent: Validating SynthesisCoordinator results for hallucination detection
PlanningAgent.ts:2617 ❌ SynthesisCoordinator validation failed: No synthesis result available
PlanningAgent.ts:2392 🔄 PlanningAgent: Triggering intelligent replanning - rerun_synthesis
PlanningAgent.ts:2393 📝 Reason: No synthesis result available
PlanningAgent.ts:2395 🎯 Specific guidance: Ensure SynthesisCoordinator has access to extracted data before synthesis
PlanningAgent.ts:2427 ✅ Replanning request created with session-specific guidance: {target: 'PatternGenerator', guidance: 'Ensure SynthesisCoordinator has access to extracted data before synthesis', priority: 'general_improvement', sessionContext: {…}}
Orchestrator.ts:2573 🔍 Quality assessment for SynthesisCoordinator: replan_required
Orchestrator.ts:2576 ⚠️ Result quality insufficient: PlanningAgent identified quality issues requiring replanning
Orchestrator.ts:2579 🔄 Attempting intelligent retry for SynthesisCoordinator
Orchestrator.ts:3430 🔄 Intelligent retry #1 for SynthesisCoordinator: Use corrective guidance from replanning requests
Orchestrator.ts:3463 🔄 Replanning context: rerun_synthesis - No synthesis result available
Orchestrator.ts:3464 🎯 Specific corrective guidance: Ensure SynthesisCoordinator has access to extracted data before synthesis
Orchestrator.ts:3485 🎯 Executing SynthesisCoordinator retry with applied corrective guidance
SynthesisCoordinator.ts:42 🎯 SynthesisCoordinator: Using extracted data (32 items)
SynthesisCoordinator.ts:45 🔍 DEBUG: First data item structure: {
  "content": " Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists, ints) into model-ready tensors in one elegant line — {k: torch.tensor(v).to(device) for k, v in item.items()}",
  "value": " Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists, ints) into model-ready tensors in one elegant line — {k: torch.tensor(v).to(device) for k, v in item.items()}",
  "unit": "",
  "context": "TL;DR\n\n Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists, ints) into model-ready tensors in one elegant line — {k: torch.tensor(v).to(device) for k, v in item.items()}\n\nconverts Hugging Face dataset samples to GPU ten",
  "confidence": 0.9,
  "sourceChunkId": "chunk_0",
  "sourceDocument": "thefirehacker-github-io-til-ddp-python-basics-html.pdf",
  "metadata": {
    "method": "regex",
    "type": "pattern_generated",
    "pattern": "/([^\\n]*(?:DDP \\(Distributed Data Parallel\\)|all_reduce|broadcast|Dictionary comprehensions|Kwargs unpacking \\(\\*\\*\\))[^\\n]*)/gi",
    "description": "Method extraction using DataInspector intelligence"
  }
}
SynthesisCoordinator.ts:46 🔍 DEBUG: All data items count: 32
SynthesisCoordinator.ts:48 🔍 DEBUG Item 1: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 2: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 3: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 4: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 5: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 6: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 7: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 8: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 9: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 10: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 11: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 12: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 13: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 14: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 15: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 16: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 17: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 18: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 19: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 20: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 21: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 22: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 23: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 24: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 25: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 26: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 27: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 28: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 29: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 30: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 31: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 32: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:65 🎯 SynthesisCoordinator: Assembling final report from 0 sections
SynthesisCoordinator.ts:116 🎯 SynthesisCoordinator: Generating query-focused report for: "using ddp pdf file build a lesson plan for me on distributed training"
SynthesisCoordinator.ts:128 🎯 Ranked 32 data items by query relevance
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 1: {content: '12) Quick Reference: Gradient sync patterns DDP from Scratch: a learner-friendly guide Learn why dic', value: '12) Quick Reference: Gradient sync patterns DDP fr…equivalent in distributed training. Plus: build a', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 100}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 2: {content: 'TL;DR 0) Visual mental model of distributed training 1) Seeding: making model replicas identical 2) ', value: 'TL;DR 0) Visual mental model of distributed traini…d? 6) Common pitfalls & fixes 7) From toy to real', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 90}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 3: {content: 'exact state. Why this mirrors Py Torch’s official DDP:Why this mirrors Py Torch’s official DDP: Py T', value: 'exact state. Why this mirrors Py Torch’s official …-facing parameter to control it. It’s an internal', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 60}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 4: {content: 'would either error or require slow implicit conversion on each forward pass. For large datasetslarge', value: 'would either error or require slow implicit conver…he entire dict in memory). A better approach uses', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 5: {content: 'implementation detail that ensures correctness. In Mini DDP , we make this synchronization explicit ', value: "implementation detail that ensures correctness. In…0_buf, src=0) # everyone receives rank0's tens or", source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 6: {content: 'def main(): dist.init_process_group("nccl") rank = dist.get_rank(); local_rank = int(os.environ.get(', value: 'def main(): dist.init_process_group("nccl") rank =…ers(), lr=1e-3) ds = load_dataset("glue", "mrpc")', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 7: {content: 'init or are debugging initialization issues. Note Note: Py Torch’s official DDP always performs this', value: 'init or are debugging initialization issues. Note …but hides it from you. Mini DDP makes it explicit', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 8: {content: 'build_model() on every rank. Forgetting to divide after Forgetting to divide after all_reduce(SUM)al', value: 'build_model() on every rank. Forgetting to divide …(SUM) → LR effectively × world_size . Fix: divide', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 9: {content: 'enforce_broadcast=True and observe it succeed. 2. Batching Batching: replace the single‑example hack', value: 'enforce_broadcast=True and observe it succeed. 2. …e hack with a Data Loader + Distributed Sampler .', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 10: {content: 's): outputs = self.model(input_ids, attention_mask=attention_mask, **kwargs) pooled = outputs[0][:, ', value: 's): outputs = self.model(input_ids, attention_mask…ram -= (lr / world_size) * param.grad # Scaled LR', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 194ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 166ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
eval @ index.ts:86
generateQueryFocusedReport @ SynthesisCoordinator.ts:134
assembleReport @ SynthesisCoordinator.ts:109
process @ SynthesisCoordinator.ts:68
await in process
performIntelligentRetry @ Orchestrator.ts:3491
await in performIntelligentRetry
executeToolCall @ Orchestrator.ts:2581
Orchestrator.ts:3496 ✅ Agent SynthesisCoordinator retry completed successfully with corrective guidance
Orchestrator.ts:2616 🎯 Strategic validation checkpoint: SynthesisCoordinator - running PlanningAgent validation
Orchestrator.ts:2617 🔍 PlanningAgent consuming SynthesisCoordinator results for quality analysis...
PlanningAgent.ts:2578 🎯 PlanningAgent: Consuming and validating results from [object Object]
PlanningAgent.ts:2625 ℹ️ No specific validation for [object Object] - allowing to continue
Orchestrator.ts:2672 ✅ SynthesisCoordinator results validated by PlanningAgent - quality acceptable
useAIProviders.ts:232 🔄 aiProviders object updated
Orchestrator.ts:2694 ⏱️ Validation UI sync delay completed
Orchestrator.ts:1010 🧾 Micro-session "Synthesize findings into final response" finished with status: completed
Orchestrator.ts:3004 ✅ Found 32 items in context.extractedData.raw
Orchestrator.ts:997 🎯 Starting micro-session: "Format and finalize response for delivery"
Orchestrator.ts:3004 ✅ Found 32 items in context.extractedData.raw
Orchestrator.ts:910 ✅ All required pipeline stages completed - stopping orchestration
Orchestrator.ts:1010 🧾 Micro-session "Format and finalize response for delivery" finished with status: completed
Orchestrator.ts:513 📝 Master Orchestrator final result: {hasAnswer: true, answerLength: 5447, preview: '# Lesson Plan: Distributed Training with DDP (PyTorch)\n\nBased on the DDP PDF file content provided, '}
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
process @ FlowFramePlannerAgent.ts:104
await in process
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:2013
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 174ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
process @ FlowFrameGeneratorAgent.ts:97
await in process
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:2027
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 158ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
process @ FlowFrameGeneratorAgent.ts:97
await in process
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:2027
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 158ms
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 245ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
process @ FlowFrameGeneratorAgent.ts:97
await in process
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:2027
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 214ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useAIFlowBuilder.ts:1121 ⏰ Auto-saving session (2-minute interval)...
VectorStore.ts:2000 📋 Retrieved latest revision for session_ai-flow_1763725013116_x7nqe87e5: 2-lmywoebweu
VectorStore.ts:1936 📊 Synced frame AI Flow: using ddp pdf file build a lesson plan for me on d to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: session_ai-flow_1763725013116_x7nqe87e5 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for session_ai-flow_1763725013116_x7nqe87e5: 3-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI Flow: using ddp pdf file build a lesson plan for me on d (ID: session_ai-flow_1763725013116_x7nqe87e5, Rev: 3-lmywoebweu)
sessionStore.ts:75 💾 Session saved: AI Flow: using ddp pdf file build a lesson plan for me on d (ai-flow_1763725013116_x7nqe87e5)
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1239 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'ai-flow_1763725013116_x7nqe87e5', sessionsCount: 1, sessionsList: Array(1)}
scheduler.development.js:14 [Violation] 'message' handler took 200ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
process @ FlowFrameGeneratorAgent.ts:97
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 216ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
process @ FlowFrameGeneratorAgent.ts:97
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 210ms
page.tsx:3332 Manage KB button clicked - opening Knowledge Base Manager
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 272ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'mousedown' handler took 269ms
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'mousedown' handler took 298ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1954
process @ FlowFrameGeneratorAgent.ts:97
useAIFlowBuilder.ts:1864 🔬 DEBUG CHECKPOINT: Exported 6 frames to debug-frames-flowframegenerator-2025-11-21T11-41-31-553Z.json
useAIFlowBuilder.ts:1865 ⚠️ Validation warnings: {undefinedFrames: 0, missingTitle: 0, missingInformationText: 0, missingType: 0, missingOrder: 0}
useAIFlowBuilder.ts:2066 ✅ Filtered frames: 6 → 6 valid
installHook.js:1 ⚠️ Document processor unavailable - storing virtual document without embeddings
overrideMethod @ installHook.js:1
addVirtualDocument @ VectorStore.ts:813
useAIFlowBuilder.useCallback[persistSessionToKnowledgeBase] @ useAIFlowBuilder.ts:1161
useAIFlowBuilder.useCallback[persistSessionState] @ useAIFlowBuilder.ts:1204
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:2110
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 200ms
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
hot-reloader-client.js:197 [Fast Refresh] rebuilding
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1763724986334:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/82bcacb59df26a94.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763724986334:1367
Promise.then
hotCheck @ webpack.js?v=1763724986334:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 300ms
report-hmr-latency.js:14 [Fast Refresh] done in 608ms
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
webpack.js?v=1763724986334:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/40549dc8fcf1f881.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763724986334:1367
Promise.then
hotCheck @ webpack.js?v=1763724986334:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 684ms
useAIProviders.ts:232 🔄 aiProviders object updated
[Violation] Forced reflow while executing JavaScript took 56ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1983 📦 Accept All: Pushing 6 frames and 3 chapters
page.tsx:1984 📦 Frame IDs: (6) ['frame_1', 'frame_2', 'frame_3', 'frame_4', 'frame_5', 'frame_6']
page.tsx:1985 📦 Chapter frame mappings: (3) [{…}, {…}, {…}]
FrameGraphIntegration.tsx:1314 No graph nodes to organize
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1661 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 6, hasUnifiedMethods: true}
EnhancedLearningGraph.tsx:3698 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3710 EnhancedLearningGraph rerender: 1
useAIProviders.ts:232 🔄 aiProviders object updated
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
EnhancedLearningGraph.tsx:1973 🧪 Graph merge from initialGraphState {existingNodeCount: 12, incomingNodeIds: Array(9), appendedNodeIds: Array(9), skippedFrameIds: Array(0), skippedAttachmentIds: Array(0), …}
react-dom-client.development.js:16378 [Violation] 'click' handler took 579ms
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
EnhancedLearningGraph.tsx:3698 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3710 EnhancedLearningGraph rerender: 2
useAIProviders.ts:232 🔄 aiProviders object updated
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
EnhancedLearningGraph.tsx:3698 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3710 EnhancedLearningGraph rerender: 3
EnhancedLearningGraph.tsx:1973 🧪 Graph merge from initialGraphState {existingNodeCount: 21, incomingNodeIds: Array(3), appendedNodeIds: Array(3), skippedFrameIds: Array(0), skippedAttachmentIds: Array(0), …}
EnhancedLearningGraph.tsx:3698 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3710 EnhancedLearningGraph rerender: 4
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
EnhancedLearningGraph.tsx:3698 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3710 EnhancedLearningGraph rerender: 5
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
EnhancedLearningGraph.tsx:3698 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3710 EnhancedLearningGraph rerender: 6
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
installHook.js:1 [React Flow]: Node type "frame" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
useUnifiedStorage.ts:707 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 6, chapterCount: 3, nodeCount: 24, edgeCount: 6, frameIds: Array(6), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:3698 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3710 EnhancedLearningGraph rerender: 7
EnhancedLearningGraph.tsx:3698 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3710 EnhancedLearningGraph rerender: 8
unifiedStorage.ts:553 ✅ IndexedDB save completed
VectorStore.ts:2142 ✅ Document inserted: frames_session_1763724990084_z0jq4oeyk
VectorStore.ts:2634 🔍 Verifying document persistence: frames_session_1763724990084_z0jq4oeyk (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:1940 📊 Synced frame AI-Frame: This frame introduces the visual mental model of Distributed Data Parallel (DDP) in PyTorch, illustrating model replication across GPUs and gradient synchronization for efficient distributed training. to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_1 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for frames_session_1763724990084_z0jq4oeyk: 1-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: Frame Sequence - 6 frames (ID: frames_session_1763724990084_z0jq4oeyk, Rev: 1-lmywoebweu)
FrameGraphIntegration.tsx:1117 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
FrameGraphIntegration.tsx:1129 ✅ Session document inserted successfully: {sessionId: 'session_1763725337583', documentId: 'sess-1763725337583-kq3p9p'}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_1: 1-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: This frame introduces the visual mental model of Distributed Data Parallel (DDP) in PyTorch, illustrating model replication across GPUs and gradient synchronization for efficient distributed training. (ID: aiframe-frame_1, Rev: 1-lmywoebweu)
VectorStore.ts:1940 📊 Synced frame AI-Frame: This frame introduces the motivations for Distributed Data Parallel (DDP) in PyTorch, explaining how it scales training from single to multi-GPU setups to overcome compute and memory limitations while boosting throughput. to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_2 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_2: 1-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: This frame introduces the motivations for Distributed Data Parallel (DDP) in PyTorch, explaining how it scales training from single to multi-GPU setups to overcome compute and memory limitations while boosting throughput. (ID: aiframe-frame_2, Rev: 1-lmywoebweu)
VectorStore.ts:1940 📊 Synced frame AI-Frame: This frame covers the critical role of identical seeding across processes to initialize consistent model replicas in PyTorch DDP, preventing training divergence. to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_3 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_3: 1-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: This frame covers the critical role of identical seeding across processes to initialize consistent model replicas in PyTorch DDP, preventing training divergence. (ID: aiframe-frame_3, Rev: 1-lmywoebweu)
VectorStore.ts:1940 📊 Synced frame AI-Frame: This frame explores Python idioms like dictionary comprehensions and kwargs unpacking for efficient data handling in PyTorch DDP, alongside the mathematical equivalence of gradient averaging and learning rate scaling for synchronized multi-GPU training. to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_4 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_4: 1-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: This frame explores Python idioms like dictionary comprehensions and kwargs unpacking for efficient data handling in PyTorch DDP, alongside the mathematical equivalence of gradient averaging and learning rate scaling for synchronized multi-GPU training. (ID: aiframe-frame_4, Rev: 1-lmywoebweu)
VectorStore.ts:1940 📊 Synced frame AI-Frame: This frame guides you through implementing a simple DDP wrapper to replicate models and synchronize gradients across GPUs, demystifying distributed training fundamentals. to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_5 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_5: 1-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: This frame guides you through implementing a simple DDP wrapper to replicate models and synchronize gradients across GPUs, demystifying distributed training fundamentals. (ID: aiframe-frame_5, Rev: 1-lmywoebweu)
VectorStore.ts:1940 📊 Synced frame AI-Frame: Learners build a minimal distributed training loop, debug pitfalls like seeding and gradient errors, and learn to use PyTorch's real DDP for scalable training. to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_6 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_6: 1-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Learners build a minimal distributed training loop, debug pitfalls like seeding and gradient errors, and learn to use PyTorch's real DDP for scalable training. (ID: aiframe-frame_6, Rev: 1-lmywoebweu)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 14-cpufyliayg
VectorStore.ts:1936 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 15-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 15-lmywoebweu)
unifiedStorage.ts:104 ✅ Unified save completed successfully
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:736
useUnifiedStorage.ts:740 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-21T11:42:17.940Z'}
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 255ms
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1763724986334:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/d33d8646476adc58.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763724986334:1367
Promise.then
hotCheck @ webpack.js?v=1763724986334:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 513ms
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
[Violation] Forced reflow while executing JavaScript took 47ms
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
useAIProviders.ts:232 🔄 aiProviders object updated
FrameGraphIntegration.tsx:1318 🎨 Auto-layout: Organizing graph with 24 nodes
FrameGraphIntegration.tsx:127 🔍 Analyzing edges for attachments: {totalEdges: 6, attachmentNodeIds: Array(0), frameNodeIds: Array(6), edgeDetails: Array(6)}
FrameGraphIntegration.tsx:168 📊 Graph structure analysis: {chapters: 6, frames: 6, attachments: 0, concepts: 0, attachmentMapSize: 0, …}
FrameGraphIntegration.tsx:1354 ✅ Auto-layout: Graph organized successfully
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:707 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 6, chapterCount: 3, nodeCount: 12, edgeCount: 6, frameIds: Array(6), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_1: 1-lmywoebweu
EnhancedLearningGraph.tsx:2124 🎨 React Flow: Auto-layout event received {reason: 'auto-layout', nodeCount: 12, timestamp: 1763725349464, graphState: {…}, forceFitView: true}
EnhancedLearningGraph.tsx:2134 🎨 React Flow: Applying auto-layout positions {nodeCount: 12, edgeCount: 6, source: 'event'}
FrameGraphIntegration.tsx:1368 📡 Dispatched graph-layout-applied event
EnhancedLearningGraph.tsx:3698 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3710 EnhancedLearningGraph rerender: 9
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:3698 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3710 EnhancedLearningGraph rerender: 10
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
scheduler.development.js:14 [Violation] 'message' handler took 199ms
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
EnhancedLearningGraph.tsx:3698 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3710 EnhancedLearningGraph rerender: 11
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "text-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
installHook.js:1 [React Flow]: Node type "pdf-attachment-attachment" not found. Using fallback type "default". Help: https://reactflow.dev/error#003
overrideMethod @ installHook.js:1
devWarn @ index.js:723
NodeWrapper @ index.js:2966
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
flushPassiveEffects @ react-dom-client.development.js:15881
eval @ react-dom-client.development.js:15505
performWorkUntilDeadline @ scheduler.development.js:45
EnhancedLearningGraph.tsx:2154 ✅ Auto-layout viewport updated
FrameGraphIntegration.tsx:1615 💾 Saving frames to localStorage...
installHook.js:1 ⚠️ VectorStore sync failed
overrideMethod @ installHook.js:1
handleSaveGraph @ FrameGraphIntegration.tsx:1629
unifiedStorage.ts:553 ✅ IndexedDB save completed
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
VectorStore.ts:1936 📊 Synced frame AI-Frame: This frame introduces the visual mental model of Distributed Data Parallel (DDP) in PyTorch, illustrating model replication across GPUs and gradient synchronization for efficient distributed training. to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_1 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_1: 2-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: This frame introduces the visual mental model of Distributed Data Parallel (DDP) in PyTorch, illustrating model replication across GPUs and gradient synchronization for efficient distributed training. (ID: aiframe-frame_1, Rev: 2-lmywoebweu)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_2: 1-lmywoebweu
VectorStore.ts:1936 📊 Synced frame AI-Frame: This frame introduces the motivations for Distributed Data Parallel (DDP) in PyTorch, explaining how it scales training from single to multi-GPU setups to overcome compute and memory limitations while boosting throughput. to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_2 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_2: 2-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: This frame introduces the motivations for Distributed Data Parallel (DDP) in PyTorch, explaining how it scales training from single to multi-GPU setups to overcome compute and memory limitations while boosting throughput. (ID: aiframe-frame_2, Rev: 2-lmywoebweu)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_3: 1-lmywoebweu
VectorStore.ts:1936 📊 Synced frame AI-Frame: This frame covers the critical role of identical seeding across processes to initialize consistent model replicas in PyTorch DDP, preventing training divergence. to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_3 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_3: 2-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: This frame covers the critical role of identical seeding across processes to initialize consistent model replicas in PyTorch DDP, preventing training divergence. (ID: aiframe-frame_3, Rev: 2-lmywoebweu)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_4: 1-lmywoebweu
VectorStore.ts:1936 📊 Synced frame AI-Frame: This frame explores Python idioms like dictionary comprehensions and kwargs unpacking for efficient data handling in PyTorch DDP, alongside the mathematical equivalence of gradient averaging and learning rate scaling for synchronized multi-GPU training. to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_4 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_4: 2-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: This frame explores Python idioms like dictionary comprehensions and kwargs unpacking for efficient data handling in PyTorch DDP, alongside the mathematical equivalence of gradient averaging and learning rate scaling for synchronized multi-GPU training. (ID: aiframe-frame_4, Rev: 2-lmywoebweu)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_5: 1-lmywoebweu
VectorStore.ts:1936 📊 Synced frame AI-Frame: This frame guides you through implementing a simple DDP wrapper to replicate models and synchronize gradients across GPUs, demystifying distributed training fundamentals. to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_5 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_5: 2-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: This frame guides you through implementing a simple DDP wrapper to replicate models and synchronize gradients across GPUs, demystifying distributed training fundamentals. (ID: aiframe-frame_5, Rev: 2-lmywoebweu)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_6: 1-lmywoebweu
VectorStore.ts:1936 📊 Synced frame AI-Frame: Learners build a minimal distributed training loop, debug pitfalls like seeding and gradient errors, and learn to use PyTorch's real DDP for scalable training. to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_6 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_6: 2-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Learners build a minimal distributed training loop, debug pitfalls like seeding and gradient errors, and learn to use PyTorch's real DDP for scalable training. (ID: aiframe-frame_6, Rev: 2-lmywoebweu)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 15-lmywoebweu
VectorStore.ts:1936 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 16-lmywoebweu
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 16-lmywoebweu)
unifiedStorage.ts:104 ✅ Unified save completed successfully
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
useUnifiedStorage.ts:740 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-21T11:42:30.325Z'}
useAIProviders.ts:232 🔄 aiProviders object updated
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1763724986334:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/cea9dc99cc0965ea.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1763724986334:1367
Promise.then
hotCheck @ webpack.js?v=1763724986334:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 495ms
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
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
page.tsx:1518 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1518
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ webpack-internal:///…frames/page.tsx:852
