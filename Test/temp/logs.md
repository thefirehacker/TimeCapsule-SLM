useAIFlowBuilder.ts:2203 🚀 TimeCapsule Version 4.8.5_010 - AI Flow Builder Starting
useAIFlowBuilder.ts:2204 ✅ Fix 1: DataInspector trust LLM decisions (semantic override fix)
useAIFlowBuilder.ts:2205 ✅ Fix 2: PatternGenerator fail-fast validation (no garbage extraction)
useAIFlowBuilder.ts:2206 ✅ Fix 3: SelectTrigger infinite re-render fix (stable callbacks + stable values)
useAIFlowBuilder.ts:2207 ✅ Fix 4: DataInspector parsing improvements (methods, filename, JSON)
useAIFlowBuilder.ts:2208 ✅ Fix 5: Multi-line list parsing (preserve newlines in methods/concepts)
useAIFlowBuilder.ts:980 🎬 [SESSION] Creating new ai-flow session...
useAIFlowBuilder.ts:986 📦 [SESSION] New session object created: {id: 'ai-flow_1764347270268_ac9jcce9s', name: 'AI Flow: using ddp pdf file build a lesson plan for me on d', source: 'ai-flow', timeCapsuleId: ''}
useAIFlowBuilder.ts:1043 💾 [SESSION] Saving new session to VectorStore...
useAIFlowBuilder.ts:1051 ✅ [SESSION] Session creation complete. Returning session ID: ai-flow_1764347270268_ac9jcce9s
useAIFlowBuilder.ts:2254 🆕 Created new AI Flow session: AI Flow: using ddp pdf file build a lesson plan for me on d
Orchestrator.ts:476 🧠 Master LLM Orchestrator starting for: "using ddp pdf file build a lesson plan for me on distributed training of LLMs"
Orchestrator.ts:479 🚀 TimeCapsule Version 4.8.5_010 - Master Orchestrator
Orchestrator.ts:480 ✅ Micro-session architecture enabled (60 iterations, per-agent limits)
Orchestrator.ts:481 ✅ PatternGenerator validation: Fail-fast if no documents available
Orchestrator.ts:482 ✅ Plan-aware sequencing with intelligent validation
Orchestrator.ts:497 🎯 Master Orchestrator: Discovering documents for query "using ddp pdf file build a lesson plan for me on distributed training of LLMs"
Orchestrator.ts:533 🔍 Discovering documents for query: "using ddp pdf file build a lesson plan for me on distributed training of LLMs"
VectorStore.ts:1116 🔍 getDocumentMetadata: Filtering for document types [userdocs]
useAIFlowBuilder.ts:1004 🎯 [SESSION] Setting active session ID: null -> ai-flow_1764347270268_ac9jcce9s
useAIFlowBuilder.ts:1004 🎯 [SESSION] Setting active session ID: null -> ai-flow_1764347270268_ac9jcce9s
useAIFlowBuilder.ts:999 📋 [SESSION] Updating sessions array: 0 -> 1
useAIFlowBuilder.ts:999 📋 [SESSION] Updating sessions array: 0 -> 1
useAIProviders.ts:232 🔄 aiProviders object updated
useAIFlowBuilder.ts:1456 💾 Persisting active session ID to localStorage: ai-flow_1764347270268_ac9jcce9s
page.tsx:1550 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'ai-flow_1764347270268_ac9jcce9s', sessionsCount: 1, sessionsList: Array(1)}
page.tsx:1616 🔄 [SESSION] Graph changed, queued session save {sessionId: 'ai-flow_1764347270268_ac9jcce9s', nodeCount: 0, edgeCount: 0}
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 325ms
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
VectorStore.ts:2634 🔍 Verifying document persistence: session_ai-flow_1764347270268_ac9jcce9s (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for session_ai-flow_1764347270268_ac9jcce9s: 1-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI Flow: using ddp pdf file build a lesson plan for me on d (ID: session_ai-flow_1764347270268_ac9jcce9s, Rev: 1-ujtnbfvhuz)
sessionStore.ts:76 💾 Session saved: AI Flow: using ddp pdf file build a lesson plan for me on d (ai-flow_1764347270268_ac9jcce9s)
useAIFlowBuilder.ts:1045 ✅ [SESSION] New session saved to VectorStore
VectorStore.ts:2000 📋 Retrieved latest revision for session_ai-flow_1764347270268_ac9jcce9s: 1-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI Flow: using ddp pdf file build a lesson plan for me on d to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: session_ai-flow_1764347270268_ac9jcce9s (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for session_ai-flow_1764347270268_ac9jcce9s: 2-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI Flow: using ddp pdf file build a lesson plan for me on d (ID: session_ai-flow_1764347270268_ac9jcce9s, Rev: 2-ujtnbfvhuz)
sessionStore.ts:76 💾 Session saved: AI Flow: using ddp pdf file build a lesson plan for me on d (ai-flow_1764347270268_ac9jcce9s)
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1550 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'ai-flow_1764347270268_ac9jcce9s', sessionsCount: 1, sessionsList: Array(1)}
scheduler.development.js:14 [Violation] 'message' handler took 169ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'click' handler took 180ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
makeMasterLLMDecision @ Orchestrator.ts:1375
masterLLMOrchestration @ Orchestrator.ts:918
research @ Orchestrator.ts:510
Orchestrator.ts:1378 🧠 Master LLM Decision Response (503 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: The goal is to analyze document structure and relevance, and no agents have been called yet. DataInspector is the mandatory first step to analyze and filter the 1 available document chunk, identifying relevant structure and content for the goal while removing any irrelevant parts, enabling subsequent steps like planning.
NEXT_GOAL: Obtain filtered document analysis to inform the execution plan and ensure focused relevance for structure analys...
 🔍 PARSING DEBUG: Full response (503 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: The goal is to analyze document structure and relevance, and no agents have been called yet. DataInspector is the mandatory first step to analyze and filter the 1 available document chunk, identifying relevant structure and content for the goal while removing any irrelevant parts, enabling subsequent steps like planning.
NEXT_GOAL: Obtain filtered document analysis to inform the execution plan and ensure focused relevance for structure analysis.
 🎯 PARSED ACTION (FIRST): CALL_TOOL
 🎯 PARSED TOOL_NAME (FIRST): DataInspector
 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataInspector
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
Orchestrator.ts:2563 ⏳ [orch-1764347270271-0ecq] Starting DataInspector - waiting for completion...
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
scheduler.development.js:14 [Violation] 'message' handler took 171ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
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
DataInspectorAgent.ts:508 🤖 Multi-document analysis: # Multi-Document Analysis Report

## 1. DOCUMENT TYPES
**Document 1 (doc_1764347240805_st3qtizz9)**: **Technical Tutorial/Educational Blog Post**
- This is a structured educational document about Distributed Data Parallel (DDP) training
- Contains a clear table of contents with 11 sections plus bonu
DataInspectorAgent.ts:770 🧠 DataInspector analyzing 1 documents with pure LLM intelligence
DataInspectorAgent.ts:980 🔍 DEBUG DataInspector Document 1 Sample Content: {chunksCount: 9, sampleLength: 4780, firstChunkPreview: 'TL;DR\n\n Core Python patterns explained: Core Pyt…ints) into model-ready tensors in one elegant ...', hasActualContent: true, filename: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', …}
DataInspectorAgent.ts:1043 📤 DEBUG DataInspector Document 1 LLM Prompt: {promptLength: 6304, containsDocumentContent: true, contentSampleInPrompt: 'Analyze this document and determine its relevance …;DR\n\n Core Python patterns explained: Core P...'}
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 191ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
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
DataInspectorAgent.ts:1056 🧠 DataInspector Document 1 LLM Response: TYPE: Tutorial/Educational Document
MAIN_ENTITY: Distributed Data Parallel (DDP) training in PyTorch with Python patterns
RELEVANT: YES
REASON: Document directly covers DDP distributed training concepts, patterns, and implementation - perfect foundation for building a lesson plan on distributed LLM training.

METHODS:
set_seed() - for making model replicas identical
all_reduce() - gradient synchronization across ranks
average_grads() - averaging gradients across GPUs
model(**batch) - kwargs unpa...
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
    at async useAIFlowBuilder.useCallback[planFlow] (useAIFlowBuilder.ts:2305:7)
overrideMethod @ installHook.js:1
parseStructuredAnalysis @ DataInspectorAgent.ts:1209
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1061
await in analyzeDocumentIntelligently
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:801
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
await in performMultiDocumentAnalysis
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:2495
installHook.js:1 ⚠️ DataInspector: Structured JSON missing or invalid, falling back to regex extraction
overrideMethod @ installHook.js:1
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1063
await in analyzeDocumentIntelligently
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:801
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
await in performMultiDocumentAnalysis
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:2495
DataInspectorAgent.ts:1263 🎯 DataInspector: Extracted MAIN_ENTITY: "Distributed Data Parallel (DDP) training in PyTorch with Python patterns"
installHook.js:1 ⚠️ DataInspector failed to extract CONCEPT_SYNTHESIS from response: "TYPE: Tutorial/Educational Document
MAIN_ENTITY: Distributed Data Parallel (DDP) training in PyTorch with Python patterns
RELEVANT: YES
REASON: Document directly covers DDP distributed training concep..."
overrideMethod @ installHook.js:1
extractValue @ DataInspectorAgent.ts:1358
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1081
await in analyzeDocumentIntelligently
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:801
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
await in performMultiDocumentAnalysis
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:2495
DataInspectorAgent.ts:1285 🎯 DataInspector: Extracted RELEVANT: "YES"
DataInspectorAgent.ts:1152 🔍 DataInspector Document 1 Parsed: {docType: 'Tutorial/Educational Document MAINENTITY: Distribu…enceClassifierOutput Hugging Face dataset samples', mainEntity: 'Distributed Data Parallel (DDP) training in PyTorch with Python patterns', relevantText: 'YES', reasoning: 'Document directly covers DDP distributed training …epts, patterns, and implementation - perfect f...'}
DataInspectorAgent.ts:1164 🔍 COMPREHENSIVE ANALYSIS: Query="using ddp pdf file build a lesson plan for me on distributed training of LLMs", Entity="Distributed Data Parallel (DDP) training in PyTorch with Python patterns" → Result: true
DataInspectorAgent.ts:807 🔍 Document 1 intelligent analysis: {docType: 'Tutorial/Educational Document MAINENTITY: Distribu…enceClassifierOutput Hugging Face dataset samples', primaryEntity: 'Distributed Data Parallel (DDP) training in PyTorch with Python patterns', isRelevant: true, reasoning: 'Document directly covers DDP distributed training …epts, patterns, and implementation - perfect f...'}
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 184ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
eval @ index.ts:86
discoverContentAreas @ DataInspectorAgent.ts:1606
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:818
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
await in performMultiDocumentAnalysis
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:2495
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 209ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
eval @ index.ts:86
discoverEntitiesIntelligently @ DataInspectorAgent.ts:1559
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:821
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 262ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
eval @ index.ts:86
discoverDocumentRole @ DataInspectorAgent.ts:1680
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:824
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:671
performMultiDocumentAnalysis @ DataInspectorAgent.ts:512
DataInspectorAgent.ts:3446 ✅ LLM classified document as RELEVANT - validating with semantic analysis
DataInspectorAgent.ts:3479 ✅ LLM decision validated - semantic score acceptable (70%)
DataInspectorAgent.ts:838 ✅ Including relevant document: Tutorial/Educational Document MAINENTITY: Distributed Data Parallel (DDP) training in PyTorch with Python patterns RELEVANT: YES REASON: Document directly covers DDP distributed training concepts, patterns, and implementation - perfect foundation for building a lesson plan on distributed LLM training. METHODS: setseed() - for making model replicas identical allreduce() - gradient synchronization across ranks averagegrads() - averaging gradients across GPUs model(batch) - kwargs unpacking for forward pass torch.tensor(v).to(device) - tensor conversion and device placement optimizer.step() - parameter updates Dictionary comprehension for data transformation Gradient averaging (PyTorch DDP default pattern) Gradient summing with LR scaling (Horovod-style pattern) broadcast - synchronizing parameters from rank 0 CONCEPTS: Distributed Data Parallel (DDP) Dictionary comprehensions Kwargs unpacking Model replicas synchronization Seeding for reproducibility Gradient averaging vs summing World size Rank (GPU/process identifier) Lock-step training Tensor operations Device placement (GPU/CPU) Forward pass Autograd hooks Bucketing All-reduce operation Learning rate scaling Parameter synchronization Hugging Face datasets integration Sequence classification PEOPLE: [None explicitly mentioned] DATATYPES: PyTorch tensors Python dictionaries inputids attention_mask labels Gradients Hidden states Logits Loss values SequenceClassifierOutput Hugging Face dataset samples (LLM decision trusted (semantic validation: 70%) - Document directly covers DDP distributed training concepts, patterns, and implementation - perfect f)
DataInspectorAgent.ts:864 🎯 DataInspector: Stored concept synthesis for document doc_1764347240805_st3qtizz9
DataInspectorAgent.ts:895 📊 Document filtering: 1 total → 1 relevant
DataInspectorAgent.ts:691 📋 Multi-Document Analysis: 1 documents with 0 relationships
DataInspectorAgent.ts:747 ✅ DOCUMENT ANALYSIS: All 1 documents deemed relevant - no filtering applied
DataInspectorAgent.ts:2651 🧠 DataInspector: Extracting intelligence from concept synthesis
DataInspectorAgent.ts:2675 🔍 Processing concept synthesis for doc_1764347240805_st3qtizz9
DataInspectorAgent.ts:2689 ✅ Extracted from synthesis: 0 methods, 0 concepts, 0 data points
DataInspectorAgent.ts:2835 🔍 Additional intelligence from document content: 0 table entries
DataInspectorAgent.ts:2879 📊 Formatted 0 measurements for PatternGenerator
DataInspectorAgent.ts:2702 🎯 Intelligence extracted from concept synthesis: {methods: 0, concepts: 0, people: 0, data: 0, measurements: 0}
installHook.js:1 ⚠️ No actionable intelligence extracted from concept synthesis - PatternGenerator may need to analyze chunks directly
overrideMethod @ installHook.js:1
extractIntelligenceFromConceptSynthesis @ DataInspectorAgent.ts:2721
await in extractIntelligenceFromConceptSynthesis
performMultiDocumentAnalysis @ DataInspectorAgent.ts:519
DataInspectorAgent.ts:2579 🔬 DataInspector: Extracting query-relevant terms from 1 document for: "using ddp pdf file build a lesson plan for me on distributed training of LLMs"
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 186ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
eval @ index.ts:86
analyzeQueryForContentPrioritization @ DataInspectorAgent.ts:3156
buildQueryAwareContentSample @ DataInspectorAgent.ts:3089
extractQueryRelevantTerms @ DataInspectorAgent.ts:2584
performMultiDocumentAnalysis @ DataInspectorAgent.ts:523
DataInspectorAgent.ts:3102 📊 Document 1: Sampling 5 of 9 chunks (56%)
DataInspectorAgent.ts:2589 🔍 Content sample for technical extraction (2339 chars): --- DOCUMENT 1: doc_1764347240805_st3qtizz9 ---
TL;DR

 Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Dictionary comprehensions: Transform raw data (lists...
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 192ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
eval @ index.ts:86
extractQueryRelevantTerms @ DataInspectorAgent.ts:2605
await in extractQueryRelevantTerms
performMultiDocumentAnalysis @ DataInspectorAgent.ts:523
 🎯 Technical terms LLM response: Based on the user's query about building a lesson plan for distributed training of LLMs using the DDP PDF file, here are the relevant extracted terms:

METHODS: 
- DDP (Distributed Data Parallel)
- Dictionary comprehensions
- Kwargs unpacking (**)
- all_reduce (SUM)
- Seeding
- broadcast

CONCEPTS:
- Distributed training
- Model replicas
- GPU tensors
- Gradient synchronization (all_reduce operation)
- world_size
- rank
- Forward pass
- Optimizer step
- Tensor operations
- Device placement (to(device))
- Hugging Face datasets
- PyTorch models
- Auto Model For Sequence Classification

DATA_TYPES:
- Tensors (torch.tensor)
- Python dicts
- Lists and ints
- Batch data
- input_ids
- attention_mask
- labels

PEOPLE: [None mentioned in document]

**Key Teaching Components Identified in Document:**
1. Visual mental model of distributed training
2. Seeding for identical model replicas
3. Python idioms (dictionary comprehensions, kwargs unpacking)
4. DDP wrapper (teaching version)
5. Minimal distributed training loop
6. Common pitfalls & fixes
7. Exercises
8. Cheatsheet
9. Appendix with utilities
 🔍 Parsing methods line: ""
 💾 Saving methods: "DDP (Distributed Data Parallel)
Dictionary comprehensions
Kwargs unpacking (**)
all_reduce (SUM)
See..."
 ✅ Parsed methods: 6 items (3) ['DDP (Distributed Data Parallel)', 'Dictionary comprehensions', 'Kwargs unpacking (**)']
 🔍 Parsing concepts line: ""
 💾 Saving concepts: "Distributed training
Model replicas
GPU tensors
Gradient synchronization (all_reduce operation)
worl..."
 ✅ Parsed concepts: 13 items (3) ['Distributed training', 'Model replicas', 'GPU tensors']
 🔍 Parsing data line: ""
DataInspectorAgent.ts:2967 💾 Saving data: "Tensors (torch.tensor)
Python dicts
Lists and ints
Batch data
input_ids
attention_mask
labels..."
DataInspectorAgent.ts:2999 ✅ Parsed data: 7 items (3) ['Tensors (torch.tensor)', 'Python dicts', 'Lists and ints']
DataInspectorAgent.ts:2938 🔍 Parsing people line: "[None mentioned in document]"
DataInspectorAgent.ts:2967 💾 Saving people: "[None mentioned in document]
*Key Teaching Components Identified in Document:**
1. Visual mental mod..."
DataInspectorAgent.ts:2610 🔍 Parsed technical terms: {methods: Array(6), concepts: Array(13), people: Array(0), data: Array(7)}
DataInspectorAgent.ts:2620 ✅ Document insights stored in context.sharedKnowledge: {methods: 6, concepts: 13, people: 0, data: 7}
DataInspectorAgent.ts:2629 📋 Extracted methods: (6) ['DDP (Distributed Data Parallel)', 'Dictionary comprehensions', 'Kwargs unpacking (**)', 'all_reduce (SUM)', 'Seeding', 'broadcast']
DataInspectorAgent.ts:2503 📊 Relevance filtering: 1 relevant out of 1 total documents
DataInspectorAgent.ts:2514 🔄 Replacing 1 document metadata with 9 relevant chunks from intelligent analysis
Orchestrator.ts:2565 ✅ [orch-1764347270271-0ecq] DataInspector process() completed - agent finished
Orchestrator.ts:2569 ✅ Tool DataInspector completed in 72550ms
Orchestrator.ts:3241 🔍 PlanningAgent consuming and validating DataInspector results using Claude Code-style logic
PlanningAgent.ts:2578 🎯 PlanningAgent: Consuming and validating results from DataInspector
PlanningAgent.ts:1849 🔍 PlanningAgent: Validating DataInspector results for query: "using ddp pdf file build a lesson plan for me on distributed training of LLMs"
PlanningAgent.ts:1877 🔍 VALIDATION DEBUG: Testing query "using ddp pdf file build a lesson plan for me on distributed training of LLMs" against entity patterns
PlanningAgent.ts:1881 🔍 VALIDATION DEBUG: Pattern /\b([A-Z][a-z]+)'s\s+(.+)/ → Match: null
PlanningAgent.ts:1881 🔍 VALIDATION DEBUG: Pattern /from\s+([A-Z][a-z]+)'s\s+(.+)/ → Match: null
PlanningAgent.ts:1881 🔍 VALIDATION DEBUG: Pattern /by\s+([A-Z][a-z]+)\b/ → Match: null
PlanningAgent.ts:1881 🔍 VALIDATION DEBUG: Pattern /([A-Z][a-z]+)'s\s+(blog|work|project|research)/ → Match: null
PlanningAgent.ts:1891 🔍 VALIDATION DEBUG: No entity ownership pattern found in query "using ddp pdf file build a lesson plan for me on distributed training of LLMs"
PlanningAgent.ts:2063 ✅ VALIDATION SUCCESS: DataInspector results validated - Found relevant documents and extracted meaningful entities
PlanningAgent.ts:2068 ✅ VALIDATION SUCCESS RESULT: {isValid: true, reason: 'DataInspector successfully analyzed 1 documents and extracted 5 entity categories'}
PlanningAgent.ts:2591 ✅ DataInspector validation passed
Orchestrator.ts:2573 🔍 Quality assessment for DataInspector: acceptable
Orchestrator.ts:3520 🔍 DataInspector approved 1 documents - fetching ALL chunks
Orchestrator.ts:3521 📊 Approved documents: ['thefirehacker-github-io-til-ddp-python-basics-html.pdf']
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 213ms
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
scheduler.development.js:14 [Violation] 'message' handler took 202ms
Orchestrator.ts:2694 ⏱️ Validation UI sync delay completed
Orchestrator.ts:1010 🧾 Micro-session "Analyze document structure and relevance" finished with status: completed
Orchestrator.ts:3047 ❌ No extracted data found in any location
Orchestrator.ts:997 🎯 Starting micro-session: "Extract structured data using generated patterns"
Orchestrator.ts:3047 ❌ No extracted data found in any location
Orchestrator.ts:916 🔄 Master LLM Iteration 2: Extract structured data using generated patterns
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
makeMasterLLMDecision @ Orchestrator.ts:1375
masterLLMOrchestration @ Orchestrator.ts:918
 🧠 Master LLM Decision Response (517 chars): ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The mandatory execution order requires calling PlanningAgent next after DataInspector to create an intelligent execution strategy, as no plan exists yet. This will define the sequence for pattern generation and extraction, ensuring structured data is extracted efficiently from the analyzed documents without skipping steps.
NEXT_GOAL: Generate a validated execution plan to guide the subsequent PatternGenerator call for identifying patterns and...
 🔍 PARSING DEBUG: Full response (517 chars): ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The mandatory execution order requires calling PlanningAgent next after DataInspector to create an intelligent execution strategy, as no plan exists yet. This will define the sequence for pattern generation and extraction, ensuring structured data is extracted efficiently from the analyzed documents without skipping steps.
NEXT_GOAL: Generate a validated execution plan to guide the subsequent PatternGenerator call for identifying patterns and extracting data.
 🎯 PARSED ACTION (FIRST): CALL_TOOL
 🎯 PARSED TOOL_NAME (FIRST): PlanningAgent
 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PlanningAgent
 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PlanningAgent', reasoning: 'Need to call PlanningAgent to progress toward the goal'}
 🔧 Attempting intelligent fallback for: "PlanningAgent"
 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
 🔧 Attempting intelligent fallback for: "PlanningAgent"
 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "PlanningAgent"
Orchestrator.ts:2948 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:1855 🔍 PLAN-GUIDED VALIDATION: PlanningAgent
Orchestrator.ts:1856 📋 Agent Status: ✅ Completed: [DataInspector]
Orchestrator.ts:1857 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:2428 ✅ Agent execution validated: PlanningAgent execution is contextually appropriate
Orchestrator.ts:2552 🔧 Executing tool: PlanningAgent (original: PlanningAgent)
Orchestrator.ts:2563 ⏳ [orch-1764347270271-0ecq] Starting PlanningAgent - waiting for completion...
PlanningAgent.ts:61 🎯 PlanningAgent: Creating intelligent execution strategy for "using ddp pdf file build a lesson plan for me on distributed training of LLMs"
PlanningAgent.ts:68 📊 Situation Analysis: {hasDocuments: true, documentCount: 29, hasDocumentAnalysis: true, relevantDocuments: 1, documentTypes: Array(1), …}
PlanningAgent.ts:603 🎯 PlanningAgent: Creating extraction strategy from DataInspector analysis
PlanningAgent.ts:614 🧠 Document context analysis: {documentType: 'Method Paper', documentPurpose: 'Introduces new method/algorithm', isMethodPaper: true, isSurveyPaper: false, mainContribution: 'DDP (Distributed Data Parallel)', …}
PlanningAgent.ts:1469 🔍 PlanningAgent: Analyzing query intent directly for "using ddp pdf file build a lesson plan for me on distributed training of LLMs"
PlanningAgent.ts:1498 🎯 Direct intent analysis: No override needed, proceeding with normal flow
PlanningAgent.ts:623 🎯 Intelligent expectations: {shouldFindSpecificMethod: true, shouldFindComparisons: false, shouldInferFromContribution: true, expectedAnswerType: 'method_from_paper_contribution', contextualReasoning: "This appears to be a method paper introducing DDP … should reference this paper's main contribution."}
PlanningAgent.ts:889 🎯 PlanningAgent: Assessing document-section relevance to query: "using ddp pdf file build a lesson plan for me on distributed training of LLMs"
PlanningAgent.ts:1360 🧠 Method paper detected: Focusing on main contribution "DDP (Distributed Data Parallel)"
PlanningAgent.ts:1071 🎯 Dynamic extraction targets based on analysis: (8) ['content', 'methods', 'concepts', 'data', 'primary_focus', 'methodpaper', 'findspecificmethod', 'inferfromcontribution']
PlanningAgent.ts:645 ✅ Created extraction strategy: {documentType: 'Method Paper', queryIntent: 'method_from_paper_contribution', contentAreas: 0, patternCategories: 4, extractionTargets: 8, …}
PlanningAgent.ts:83 ✅ Created extraction strategy with 4 pattern categories
PlanningAgent.ts:1506 🔍 PlanningAgent: Validating DataInspector classifications against query
PlanningAgent.ts:1592 🔍 PlanningAgent: Validating DataInspector document selections against query
PlanningAgent.ts:1606 🎯 Query constraints for validation: {}
PlanningAgent.ts:1609 
🔍 Validating document 1: "thefirehacker-github-io-til-ddp-python-basics-html.pdf"
PlanningAgent.ts:1610 📊 Document analysis - Type: Tutorial/Educational Document MAINENTITY: Distributed Data Parallel (DDP) training in PyTorch with Python patterns RELEVANT: YES REASON: Document directly covers DDP distributed training concepts, patterns, and implementation - perfect foundation for building a lesson plan on distributed LLM training. METHODS: setseed() - for making model replicas identical allreduce() - gradient synchronization across ranks averagegrads() - averaging gradients across GPUs model(batch) - kwargs unpacking for forward pass torch.tensor(v).to(device) - tensor conversion and device placement optimizer.step() - parameter updates Dictionary comprehension for data transformation Gradient averaging (PyTorch DDP default pattern) Gradient summing with LR scaling (Horovod-style pattern) broadcast - synchronizing parameters from rank 0 CONCEPTS: Distributed Data Parallel (DDP) Dictionary comprehensions Kwargs unpacking Model replicas synchronization Seeding for reproducibility Gradient averaging vs summing World size Rank (GPU/process identifier) Lock-step training Tensor operations Device placement (GPU/CPU) Forward pass Autograd hooks Bucketing All-reduce operation Learning rate scaling Parameter synchronization Hugging Face datasets integration Sequence classification PEOPLE: [None explicitly mentioned] DATATYPES: PyTorch tensors Python dictionaries inputids attention_mask labels Gradients Hidden states Logits Loss values SequenceClassifierOutput Hugging Face dataset samples, Primary: Distributed Data Parallel (DDP) training in PyTorch with Python patterns
PlanningAgent.ts:1616 ✅ Document 1 validation passed: Document meets all query constraints
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 198ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
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
PlanningAgent.ts:231 🎯 Generated execution plan: {strategy: 'Direct synthesis from available DDP documentation.…work rather than extracting specific data points.', stepCount: 3, confidence: 0.92}
PlanningAgent.ts:122 ✅ Execution plan created: Direct synthesis from available DDP documentation. The single comprehensive tutorial document contains all necessary components for building a structured lesson plan on distributed LLM training using DDP. We will extract key educational content areas (concepts, patterns, code examples, pitfalls) and synthesize them into a pedagogically sound lesson plan with learning objectives, modules, hands-on exercises, and assessments. No pattern generation needed since we're creating an educational framework rather than extracting specific data points.
Orchestrator.ts:2565 ✅ [orch-1764347270271-0ecq] PlanningAgent process() completed - agent finished
Orchestrator.ts:2569 ✅ Tool PlanningAgent completed in 18438ms
Orchestrator.ts:2573 🔍 Quality assessment for PlanningAgent: acceptable
Orchestrator.ts:3047 ❌ No extracted data found in any location
Orchestrator.ts:916 🔄 Master LLM Iteration 3: Extract structured data using generated patterns
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "DataInspector"
Orchestrator.ts:2936 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2942 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "ResponseFormatter"
Orchestrator.ts:2966 🎯 Mapping ResponseFormatter → ResponseFormatter (semantic similarity)
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 208ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
makeMasterLLMDecision @ Orchestrator.ts:1375
masterLLMOrchestration @ Orchestrator.ts:918
Orchestrator.ts:1378 🧠 Master LLM Decision Response (850 chars): ACTION: CALL_TOOL
TOOL_NAME: SynthesisCoordinator
REASONING: The execution plan from PlanningAgent indicates SynthesisCoordinator as the immediate next step, with 1/3 steps done and patterns already generated (1 pattern available). This tool is needed to assemble the final report and design the multi-module lesson plan structure from the available analyzed data, progressing the pipeline toward synthesis and completion while bypassing DataAnalyzer. Calling it now follows the active plan to avoid ...
 🔍 PARSING DEBUG: Full response (850 chars): ACTION: CALL_TOOL
TOOL_NAME: SynthesisCoordinator
REASONING: The execution plan from PlanningAgent indicates SynthesisCoordinator as the immediate next step, with 1/3 steps done and patterns already generated (1 pattern available). This tool is needed to assemble the final report and design the multi-module lesson plan structure from the available analyzed data, progressing the pipeline toward synthesis and completion while bypassing DataAnalyzer. Calling it now follows the active plan to avoid sequencing violations, as PatternGenerator is integrated or prior steps have prepared the raw data for this assembly.
NEXT_GOAL: Generate a structured multi-module lesson plan on DDP concepts, including progression from foundations to advanced topics with objectives, explanations, exercises, and ass...
 🎯 PARSED ACTION (FIRST): CALL_TOOL
 🎯 PARSED TOOL_NAME (FIRST): SynthesisCoordinator
 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=SynthesisCoordinator
 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'SynthesisCoordinator', reasoning: 'Need to call SynthesisCoordinator to progress toward the goal'}
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔍 PLAN-GUIDED VALIDATION: SynthesisCoordinator
 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent]
 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
 ⚠️ PLAN-AWARE SEQUENCING WARNING: Critical prerequisite required: PatternGenerator must run before SynthesisCoordinator
overrideMethod @ installHook.js:1
executeToolCall @ webpack-internal:///…rchestrator.ts:1947
executeToolCallWithMicroSession @ webpack-internal:///…Orchestrator.ts:863
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:749
 💡 Suggestion: Call PatternGenerator before SynthesisCoordinator
overrideMethod @ installHook.js:1
executeToolCall @ webpack-internal:///…rchestrator.ts:1949
executeToolCallWithMicroSession @ webpack-internal:///…Orchestrator.ts:863
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:749
 📊 Micro-session status:
   - Extraction completed: false
   - Synthesis completed: false
 ❌ No extracted data found in any location
   - Has extracted data: false
   - Completed sessions: Analyze document structure and relevance
 🔧 Attempting intelligent fallback for: "PatternGenerator"
 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
 🔄 Auto-enforcing pipeline: running PatternGenerator before SynthesisCoordinator
 🔧 Attempting intelligent fallback for: "PatternGenerator"
 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
 🔧 Attempting intelligent fallback for: "PatternGenerator"
 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
 🔍 PLAN-GUIDED VALIDATION: PatternGenerator
 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent]
 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
 🔧 Attempting intelligent fallback for: "DataInspector"
 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "ResponseFormatter"
 🎯 Mapping ResponseFormatter → ResponseFormatter (semantic similarity)
 🤔 PatternGenerator not explicitly in execution plan - validating as intelligent addition
 🧠 Validating intelligent addition: PatternGenerator
 📋 Original plan: [DataInspector, SynthesisCoordinator, ResponseFormatter]
 ✅ Agent execution validated: PatternGenerator can improve extraction quality - intelligent addition
 🔧 Executing tool: PatternGenerator (original: PatternGenerator)
 ⏳ [orch-1764347270271-0ecq] Starting PatternGenerator - waiting for completion...
 🎯 PatternGenerator: Creating extraction strategies
 📋 DEBUG - Existing patterns before PatternGenerator: {count: 1, patterns: Array(1), hasSharedKnowledge: true}
 🧠 PatternGenerator: Generating dynamic patterns via LLM analysis
 ✅ Using PlanningAgent extraction strategy: {documentType: 'Method Paper', queryIntent: 'method_from_paper_contribution', patternCategories: 4, availableStrategies: 1}
 🎯 PatternGenerator: Generating focused patterns (3 regex + 1 semantic)
 ✅ Generated 2 focused patterns: (2) ['Method extraction using DataInspector intelligence', 'Tutorial/Educational Document MAINENTITY: Distribu…el (DDP) training in PyTorch with Python patterns']
 🎯 Running focused extraction: 1 regex patterns + 0 semantic patterns
 ✅ Regex extraction: Found 14 items
 🔄 After deduplication: 14 unique items
 ✅ PatternGenerator: Extracted 14 items with focused patterns
 🔍 DEBUG PatternGenerator measurements check: {hasSharedKnowledge: true, hasDocumentInsights: true, hasMeasurements: true, measurementsLength: 0, measurementsType: 'object'}
 🔍 PatternGenerator: No measurements from DataInspector - analyzing ALL chunks with content-grounded approach
 📊 Analyzing 29 chunks for comprehensive measurement discovery (Claude Code style)
 📊 PatternGenerator: Discovered 109 measurements from complete dataset analysis
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*todevice)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*buf)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*s)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*for)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*enforcebroadcast)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*\s*\/\s*worldsize)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*visual)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*seeding)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*two)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*a)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*minimal)/gi found 0 matches
 🧪 Pattern validation: /((?:\d+(?:\.\d+)?)\s*why)/gi found 0 matches
 🔍 Pattern validation: 0/12 patterns passed validation
 ✅ Induced 0 measurement families from document (style=dot, hits=109)
 🎯 PatternGenerator: Running immediate extraction with 2 generated patterns
 🎯 Running focused extraction: 1 regex patterns + 0 semantic patterns
 ✅ Regex extraction: Found 14 items
 🔄 After deduplication: 14 unique items
 ✅ PatternGenerator: Extracted 14 items immediately
 ✅ [orch-1764347270271-0ecq] PatternGenerator process() completed - agent finished
 ✅ Tool PatternGenerator completed in 55ms
 🔍 PlanningAgent consuming and validating PatternGenerator results using Claude Code-style logic
 🎯 PlanningAgent: Consuming and validating results from PatternGenerator
 🔍 PlanningAgent: Deep validation of PatternGenerator results for query: "using ddp pdf file build a lesson plan for me on distributed training of LLMs"
 ✅ PatternGenerator results validated: 2 content-grounded patterns for query intent
PlanningAgent.ts:2601 ✅ PatternGenerator validation passed
Orchestrator.ts:2573 🔍 Quality assessment for PatternGenerator: acceptable
Orchestrator.ts:2697 ⚡ Strategic validation: Skipping validation for PatternGenerator (not a strategic checkpoint)
Orchestrator.ts:2419 ✅ PatternGenerator completed - re-evaluating SynthesisCoordinator
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
executeToolCall @ Orchestrator.ts:2420
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1066
masterLLMOrchestration @ Orchestrator.ts:943
installHook.js:1 💡 Suggestion: Call Extractor before SynthesisCoordinator
overrideMethod @ installHook.js:1
executeToolCall @ Orchestrator.ts:2399
executeToolCall @ Orchestrator.ts:2420
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1066
masterLLMOrchestration @ Orchestrator.ts:943
Orchestrator.ts:2403 📊 Micro-session status:
Orchestrator.ts:2404   - Extraction completed: false
Orchestrator.ts:2405   - Synthesis completed: false
Orchestrator.ts:3004 ✅ Found 14 items in context.extractedData.raw
Orchestrator.ts:2406   - Has extracted data: true
Orchestrator.ts:2407   - Completed sessions: Analyze document structure and relevance
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "Extractor"
Orchestrator.ts:2920 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
Orchestrator.ts:2417 🔄 Auto-enforcing pipeline: running Extractor before SynthesisCoordinator
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "Extractor"
Orchestrator.ts:2920 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
Orchestrator.ts:2916 🔧 Attempting intelligent fallback for: "Extractor"
Orchestrator.ts:2920 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
 🔍 PLAN-GUIDED VALIDATION: Extractor
 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent, PatternGenerator]
 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
 🔧 Attempting intelligent fallback for: "DataInspector"
 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "ResponseFormatter"
 🎯 Mapping ResponseFormatter → ResponseFormatter (semantic similarity)
 🤔 Extractor not explicitly in execution plan - validating as intelligent addition
 🧠 Validating intelligent addition: Extractor
 📋 Original plan: [DataInspector, SynthesisCoordinator, ResponseFormatter]
 🔍 Extractor dependency check: PatternGenerator called: true, regex patterns: 1
 ⚡ Extractor validation passed - PatternGenerator was called
 ✅ Agent execution validated: PatternGenerator called - Extractor can proceed
 🚫 SKIPPING REDUNDANT EXTRACTOR: PatternGenerator already extracted 14 items
 ✅ Using PatternGenerator's extracted data to prevent overwriting good results
 ✅ Extractor completed - re-evaluating SynthesisCoordinator
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔍 PLAN-GUIDED VALIDATION: SynthesisCoordinator
 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent, PatternGenerator, Extractor]
 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
 ✅ Found 14 items in context.extractedData.raw
 ✅ Extraction prerequisite satisfied: 14 items extracted
 🔧 Attempting intelligent fallback for: "DataInspector"
 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "DataInspector"
 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
 🎯 Validating SynthesisCoordinator prerequisites - checking extraction completion
 📊 Has extracted data: true
 ✅ SynthesisCoordinator will work directly with 14 extracted items (DataAnalyzer bypassed)
 ✅ SynthesisCoordinator validated against execution plan - prerequisites met
 ✅ Agent execution validated: SynthesisCoordinator execution follows planned sequence - step 2 of 3
 🔧 Executing tool: SynthesisCoordinator (original: SynthesisCoordinator)
 ⏳ [orch-1764347270271-0ecq] Starting SynthesisCoordinator - waiting for completion...
 🎯 SynthesisCoordinator: Using extracted data (14 items)
 🔍 DEBUG: First data item structure: {
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
    "pattern": "/([^\\n]*(?:DDP \\(Distributed Data Parallel\\)|Dictionary comprehensions|Kwargs unpacking \\(\\*\\*\\)|all_reduce \\(SUM\\)|Seeding)[^\\n]*)/gi",
    "description": "Method extraction using DataInspector intelligence"
  }
}
 🔍 DEBUG: All data items count: 14
 🔍 DEBUG Item 1: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 2: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 3: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 4: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 5: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 6: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 7: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 8: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 9: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 10: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 11: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 12: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 13: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 14: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:65 🎯 SynthesisCoordinator: Assembling final report from 0 sections
SynthesisCoordinator.ts:116 🎯 SynthesisCoordinator: Generating query-focused report for: "using ddp pdf file build a lesson plan for me on distributed training of LLMs"
SynthesisCoordinator.ts:128 🎯 Ranked 14 data items by query relevance
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 1: {content: '12) Quick Reference: Gradient sync patterns DDP from Scratch: a learner-friendly guide Learn why dic', value: '12) Quick Reference: Gradient sync patterns DDP fr…equivalent in distributed training. Plus: build a', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 100}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 2: {content: 'TL;DR 0) Visual mental model of distributed training 1) Seeding: making model replicas identical 2) ', value: 'TL;DR 0) Visual mental model of distributed traini…d? 6) Common pitfalls & fixes 7) From toy to real', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 90}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 3: {content: '# In your entry point (each process runs this): set_seed(43) # must happen BEFORE model creation mod', value: '# In your entry point (each process runs this): se… the model doesn’t retroactively change weights."', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 4: {content: 'would either error or require slow implicit conversion on each forward pass. For large datasetslarge', value: 'would either error or require slow implicit conver…he entire dict in memory). A better approach uses', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 5: {content: 'implementation detail that ensures correctness. In Mini DDP , we make this synchronization explicit ', value: "implementation detail that ensures correctness. In…0_buf, src=0) # everyone receives rank0's tens or", source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 6: {content: ' Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Diction', value: ' Core Python patterns explained: Core Python pat…ch.tensor(v).to(device) for k, v in item.items()}', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 7: {content: 'AUTHOR PUBLISHED THE FIRE HACKERTHE FIRE HACKER Home Blog Today I Learned About Me   1) Seeding: m', value: 'AUTHOR PUBLISHED THE FIRE HACKERTHE FIRE HACKER Ho…W’}, averaging grads is meaningless. We seed each', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 8: {content: 'Why this transformation is essential:Why this transformation is essential: Hugging Face datasets ret', value: 'Why this transformation is essential:Why this tran… grads) │ divide by world_size │ optimizer.step()', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 9: {content: 'initialization: 1. enforce_broadcast=Falseenforce_broadcast=False (default) (default): Verifies Veri', value: 'initialization: 1. enforce_broadcast=Falseenforce_… responsible for ensuring equality (via seeding),', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 10: {content: 'and the wrapper checks that you did it correctly. 2. enforce_broadcast=Trueenforce_broadcast=True : ', value: 'and the wrapper checks that you did it correctly. …ed or parameters diverged, everyone gets rank 0’s', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 194ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
eval @ index.ts:86
generateQueryFocusedReport @ SynthesisCoordinator.ts:134
assembleReport @ SynthesisCoordinator.ts:109
process @ SynthesisCoordinator.ts:68
await in process
executeToolCall @ Orchestrator.ts:2564
await in executeToolCall
executeToolCall @ Orchestrator.ts:2420
await in executeToolCall
executeToolCall @ Orchestrator.ts:2420
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1066
masterLLMOrchestration @ Orchestrator.ts:943
 ✅ [orch-1764347270271-0ecq] SynthesisCoordinator process() completed - agent finished
 ✅ Tool SynthesisCoordinator completed in 24313ms
 🔍 PlanningAgent consuming and validating SynthesisCoordinator results using Claude Code-style logic
 🎯 PlanningAgent: Consuming and validating results from SynthesisCoordinator
 🔍 PlanningAgent: Validating SynthesisCoordinator results for hallucination detection
 ❌ SynthesisCoordinator validation failed: No synthesis result available
 🔄 PlanningAgent: Triggering intelligent replanning - rerun_synthesis
 📝 Reason: No synthesis result available
 🎯 Specific guidance: Ensure SynthesisCoordinator has access to extracted data before synthesis
 ✅ Replanning request created with session-specific guidance: {target: 'PatternGenerator', guidance: 'Ensure SynthesisCoordinator has access to extracted data before synthesis', priority: 'general_improvement', sessionContext: {…}}
 🔍 Quality assessment for SynthesisCoordinator: replan_required
 ⚠️ Result quality insufficient: PlanningAgent identified quality issues requiring replanning
 🔄 Attempting intelligent retry for SynthesisCoordinator
 🔄 Intelligent retry #1 for SynthesisCoordinator: Use corrective guidance from replanning requests
 🔄 Replanning context: rerun_synthesis - No synthesis result available
 🎯 Specific corrective guidance: Ensure SynthesisCoordinator has access to extracted data before synthesis
 🎯 Executing SynthesisCoordinator retry with applied corrective guidance
 🎯 SynthesisCoordinator: Using extracted data (14 items)
 🔍 DEBUG: First data item structure: {
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
    "pattern": "/([^\\n]*(?:DDP \\(Distributed Data Parallel\\)|Dictionary comprehensions|Kwargs unpacking \\(\\*\\*\\)|all_reduce \\(SUM\\)|Seeding)[^\\n]*)/gi",
    "description": "Method extraction using DataInspector intelligence"
  }
}
 🔍 DEBUG: All data items count: 14
 🔍 DEBUG Item 1: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 2: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 3: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 4: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 5: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 6: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 7: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 8: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 9: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 10: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
 🔍 DEBUG Item 11: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 12: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 13: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 14: {keys: Array(8), hasContent: true, hasValue: true, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:65 🎯 SynthesisCoordinator: Assembling final report from 0 sections
SynthesisCoordinator.ts:116 🎯 SynthesisCoordinator: Generating query-focused report for: "using ddp pdf file build a lesson plan for me on distributed training of LLMs"
SynthesisCoordinator.ts:128 🎯 Ranked 14 data items by query relevance
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 1: {content: '12) Quick Reference: Gradient sync patterns DDP from Scratch: a learner-friendly guide Learn why dic', value: '12) Quick Reference: Gradient sync patterns DDP fr…equivalent in distributed training. Plus: build a', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 100}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 2: {content: 'TL;DR 0) Visual mental model of distributed training 1) Seeding: making model replicas identical 2) ', value: 'TL;DR 0) Visual mental model of distributed traini…d? 6) Common pitfalls & fixes 7) From toy to real', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 90}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 3: {content: '# In your entry point (each process runs this): set_seed(43) # must happen BEFORE model creation mod', value: '# In your entry point (each process runs this): se… the model doesn’t retroactively change weights."', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 4: {content: 'would either error or require slow implicit conversion on each forward pass. For large datasetslarge', value: 'would either error or require slow implicit conver…he entire dict in memory). A better approach uses', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 5: {content: 'implementation detail that ensures correctness. In Mini DDP , we make this synchronization explicit ', value: "implementation detail that ensures correctness. In…0_buf, src=0) # everyone receives rank0's tens or", source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 30}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 6: {content: ' Core Python patterns explained: Core Python patterns explained: Dictionary comprehensions Diction', value: ' Core Python patterns explained: Core Python pat…ch.tensor(v).to(device) for k, v in item.items()}', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 7: {content: 'AUTHOR PUBLISHED THE FIRE HACKERTHE FIRE HACKER Home Blog Today I Learned About Me   1) Seeding: m', value: 'AUTHOR PUBLISHED THE FIRE HACKERTHE FIRE HACKER Ho…W’}, averaging grads is meaningless. We seed each', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 8: {content: 'Why this transformation is essential:Why this transformation is essential: Hugging Face datasets ret', value: 'Why this transformation is essential:Why this tran… grads) │ divide by world_size │ optimizer.step()', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 9: {content: 'initialization: 1. enforce_broadcast=Falseenforce_broadcast=False (default) (default): Verifies Veri', value: 'initialization: 1. enforce_broadcast=Falseenforce_… responsible for ensuring equality (via seeding),', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 10: {content: 'and the wrapper checks that you did it correctly. 2. enforce_broadcast=Trueenforce_broadcast=True : ', value: 'and the wrapper checks that you did it correctly. …ed or parameters diverged, everyone gets rank 0’s', source: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', relevanceScore: 0}
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 262ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
eval @ index.ts:86
generateQueryFocusedReport @ SynthesisCoordinator.ts:134
assembleReport @ SynthesisCoordinator.ts:109
process @ SynthesisCoordinator.ts:68
await in process
performIntelligentRetry @ Orchestrator.ts:3491
await in performIntelligentRetry
executeToolCall @ Orchestrator.ts:2581
await in executeToolCall
executeToolCall @ Orchestrator.ts:2420
await in executeToolCall
executeToolCall @ Orchestrator.ts:2420
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1066
masterLLMOrchestration @ Orchestrator.ts:943
Orchestrator.ts:3496 ✅ Agent SynthesisCoordinator retry completed successfully with corrective guidance
Orchestrator.ts:2616 🎯 Strategic validation checkpoint: SynthesisCoordinator - running PlanningAgent validation
Orchestrator.ts:2617 🔍 PlanningAgent consuming SynthesisCoordinator results for quality analysis...
PlanningAgent.ts:2578 🎯 PlanningAgent: Consuming and validating results from [object Object]
PlanningAgent.ts:2625 ℹ️ No specific validation for [object Object] - allowing to continue
Orchestrator.ts:2672 ✅ SynthesisCoordinator results validated by PlanningAgent - quality acceptable
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 279ms
Orchestrator.ts:2694 ⏱️ Validation UI sync delay completed
Orchestrator.ts:3004 ✅ Found 14 items in context.extractedData.raw
Orchestrator.ts:910 ✅ All required pipeline stages completed - stopping orchestration
Orchestrator.ts:1010 🧾 Micro-session "Extract structured data using generated patterns" finished with status: completed
Orchestrator.ts:513 📝 Master Orchestrator final result: {hasAnswer: true, answerLength: 4486, preview: '# Lesson Plan: Distributed Training with DDP (Data Distributed Parallel)\n\nBased on the DDP PDF file '}
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 170ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
process @ FlowFramePlannerAgent.ts:104
await in process
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:2335
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 247ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
process @ FlowFrameGeneratorAgent.ts:97
await in process
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:2349
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 234ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
process @ FlowFrameGeneratorAgent.ts:97
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 254ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
process @ FlowFrameGeneratorAgent.ts:97
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 237ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
process @ FlowFrameGeneratorAgent.ts:97
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 223ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
process @ FlowFrameGeneratorAgent.ts:97
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 279ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:2276
process @ FlowFrameGeneratorAgent.ts:97
useAIFlowBuilder.ts:2190 🔬 DEBUG CHECKPOINT: Exported 6 frames to debug-frames-flowframegenerator-2025-11-28T16-32-24-630Z.json
useAIFlowBuilder.ts:2191 ⚠️ Validation warnings: {undefinedFrames: 0, missingTitle: 0, missingInformationText: 0, missingType: 0, missingOrder: 0}
useAIFlowBuilder.ts:2399 ✅ Filtered frames: 6 → 6 valid
useAIFlowBuilder.ts:509 Using generated chapters from FlowPlannerPlan: (3) [{…}, {…}, {…}]
installHook.js:1 ⚠️ Document processor unavailable - storing virtual document without embeddings
overrideMethod @ installHook.js:1
addVirtualDocument @ VectorStore.ts:813
useAIFlowBuilder.useCallback[persistSessionToKnowledgeBase] @ useAIFlowBuilder.ts:1477
useAIFlowBuilder.useCallback[persistSessionState] @ useAIFlowBuilder.ts:1520
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:2443
useAIProviders.ts:232 🔄 aiProviders object updated
useAIProviders.ts:232 🔄 aiProviders object updated
scheduler.development.js:14 [Violation] 'message' handler took 533ms
useAIProviders.ts:232 🔄 aiProviders object updated
use-websocket.js:113 [Violation] 'setInterval' handler took 50ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
hot-reloader-client.js:197 [Fast Refresh] rebuilding
hot-reloader-client.js:197 [Fast Refresh] rebuilding
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
webpack.js?v=1764347187983:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/41310ad986a2d011.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764347187983:1367
Promise.then
hotCheck @ webpack.js?v=1764347187983:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 529ms
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
webpack.js?v=1764347187983:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/18c23c87b3670195.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764347187983:1367
Promise.then
hotCheck @ webpack.js?v=1764347187983:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 2168ms
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
[Violation] Forced reflow while executing JavaScript took 53ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
useAIFlowBuilder.ts:3061 ✅ [ACCEPT] Using plan.frames (6 frames available)
useAIFlowBuilder.ts:3168 ✅ [ACCEPT] Converted 6 frames from plan.frames
page.tsx:2589 📦 Accept All: Pushing 6 frames and 3 chapters
page.tsx:2590 📦 Frame IDs: (6) ['frame_ddp_1', 'frame_ddp_2', 'frame_ddp_3', 'frame_ddp_4', 'frame_ddp_5', 'frame_ddp_6']
page.tsx:2591 📦 Chapter frame mappings: (3) [{…}, {…}, {…}]
page.tsx:2608 🔄 Replacing AI Flow content: removing 0 old frames, adding 6 new frames
page.tsx:2620 ✅ Regenerated graphState with 6 converted frames (proper attachment structure)
page.tsx:2638 🔄 Chapters: removing 0 old AI Flow chapters, adding 3 new chapters
page.tsx:2645 ✅ Using atomic batchUpdate with replaced content (prevents duplicate nodes)
useUnifiedStorage.ts:1949 🔄 Batch update: {hasFrames: true, hasChapters: true, hasGraphState: true, frameCount: 6, chapterCount: 3, …}
page.tsx:2653 📊 After batchUpdate: {frameCount: 0, chapterCount: 0, graphStateNodeCount: 9, graphStateChapterNodeCount: 3, graphStateFrameNodeCount: 6}
FrameGraphIntegration.tsx:1318 No graph nodes to organize
page.tsx:2672 ✅ Flow Builder panel closed after accepting frames
useUnifiedStorage.ts:1572 📥 handleForceSaveEvent received! {reason: 'chapter-created', hasGraphState: true, nodeCount: 3, hasFrames: false, frameCount: undefined, …}
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1616 🔄 [SESSION] Graph changed, queued session save {sessionId: 'ai-flow_1764347270268_ac9jcce9s', nodeCount: 9, edgeCount: 9}
page.tsx:2156 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 6, hasUnifiedMethods: true}
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 1
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:304
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:304
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:334
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:334
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:304
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:304
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:334
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:334
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:304
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:304
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:334
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:334
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:304
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:304
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:334
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:334
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:304
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:304
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:334
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:334
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:304
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:304
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:334
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
RichTextEditor @ rich-text-editor.tsx:126
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:334
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
 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 9, edgeCount: 9}
 🧪 Graph merge from initialGraphState {existingNodeCount: 7, incomingNodeIds: Array(9), appendedNodeIds: Array(3), skippedFrameIds: Array(0), skippedAttachmentIds: Array(0), …}
 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 9, edgeCount: 9}
 📥 handleForceSaveEvent received! {reason: 'chapter-edges-synced', hasGraphState: true, nodeCount: 10, hasFrames: false, frameCount: undefined, …}
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 2
 📥 handleForceSaveEvent received! {reason: 'chapter-edges-synced', hasGraphState: true, nodeCount: 9, hasFrames: false, frameCount: undefined, …}
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 3
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:490
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:490
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:544
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:544
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:490
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:490
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:544
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:544
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:490
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:490
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:544
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:544
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:490
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:490
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:544
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
EnhancedAIFrameNode @ webpack-internal:///…AIFrameNode.tsx:544
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
RichTextEditor @ webpack-internal:///…text-editor.tsx:135
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
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 4
webpack-internal:///…evelopment.js:16378 [Violation] 'click' handler took 759ms
 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
 ✅ Session document inserted successfully: {sessionId: 'session_1764347616303', documentId: 'sess-1764347616303-ktpayf'}
[Violation] Forced reflow while executing JavaScript took 43ms
 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
 EnhancedLearningGraph rerender: 5
 🔄 aiProviders object updated
 🔄 [SESSION] Graph changed, queued session save {sessionId: 'ai-flow_1764347270268_ac9jcce9s', nodeCount: 10, edgeCount: 6}
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 6}
EnhancedLearningGraph.tsx:2157 🧪 Graph merge from initialGraphState {existingNodeCount: 9, incomingNodeIds: Array(7), appendedNodeIds: Array(1), skippedFrameIds: Array(0), skippedAttachmentIds: Array(0), …}
useUnifiedStorage.ts:1572 📥 handleForceSaveEvent received! {reason: 'chapter-edges-synced', hasGraphState: true, nodeCount: 10, hasFrames: false, frameCount: undefined, …}
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 6
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":false,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 7
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 8
useUnifiedStorage.ts:725 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 6, chapterCount: 3, nodeCount: 10, edgeCount: 6, frameIds: Array(6), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 9
unifiedStorage.ts:553 ✅ IndexedDB save completed
VectorStore.ts:1940 📊 Synced frame AI-Frame: Why Distributed Training for LLMs? to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_1 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_1: 9-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Why Distributed Training for LLMs? (ID: aiframe-frame_ddp_1, Rev: 9-ujtnbfvhuz)
VectorStore.ts:1940 📊 Synced frame AI-Frame: Visual Mental Model of DDP to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_2 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_2: 9-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Visual Mental Model of DDP (ID: aiframe-frame_ddp_2, Rev: 9-ujtnbfvhuz)
VectorStore.ts:1940 📊 Synced frame AI-Frame: Python Idioms: Dictionary Comprehensions and Kwargs Unpacking to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_3 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1616 🔄 [SESSION] Graph changed, queued session save {sessionId: 'ai-flow_1764347270268_ac9jcce9s', nodeCount: 10, edgeCount: 7}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_3: 9-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Python Idioms: Dictionary Comprehensions and Kwargs Unpacking (ID: aiframe-frame_ddp_3, Rev: 9-ujtnbfvhuz)
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 7}
VectorStore.ts:1940 📊 Synced frame AI-Frame: Seeding and Gradient Averaging Basics to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_4 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_4: 9-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Seeding and Gradient Averaging Basics (ID: aiframe-frame_ddp_4, Rev: 9-ujtnbfvhuz)
VectorStore.ts:1940 📊 Synced frame AI-Frame: Building a Tiny DDP Wrapper to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_5 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_5: 9-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Building a Tiny DDP Wrapper (ID: aiframe-frame_ddp_5, Rev: 9-ujtnbfvhuz)
VectorStore.ts:1940 📊 Synced frame AI-Frame: Minimal Training Loop, Pitfalls, and LLM Scaling to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_6 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_6: 9-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Minimal Training Loop, Pitfalls, and LLM Scaling (ID: aiframe-frame_ddp_6, Rev: 9-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 26-bozdjdnohz
VectorStore.ts:1936 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 7}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 27-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 27-ujtnbfvhuz)
unifiedStorage.ts:104 ✅ Unified save completed successfully
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:754
useUnifiedStorage.ts:758 🔄 BACKGROUND SAVE: Completed with result: {success: true, persistedNodeCount: 10, persistedEdgeCount: 6, persistedFrameCount: 6, persistedChapterCount: 3, …}
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:2000 📋 Retrieved latest revision for session_ai-flow_1764347270268_ac9jcce9s: 2-ujtnbfvhuz
webpack.js?v=1764347187983:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/e726f1d975a6e0cb.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764347187983:1367
Promise.then
hotCheck @ webpack.js?v=1764347187983:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
VectorStore.ts:1936 📊 Synced frame AI Flow: using ddp pdf file build a lesson plan for me on d to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: session_ai-flow_1764347270268_ac9jcce9s (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
report-hmr-latency.js:14 [Fast Refresh] done in 999ms
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
[Violation] Forced reflow while executing JavaScript took 45ms
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:2000 📋 Retrieved latest revision for session_ai-flow_1764347270268_ac9jcce9s: 3-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI Flow: using ddp pdf file build a lesson plan for me on d (ID: session_ai-flow_1764347270268_ac9jcce9s, Rev: 3-ujtnbfvhuz)
sessionStore.ts:76 💾 Session saved: AI Flow: using ddp pdf file build a lesson plan for me on d (ai-flow_1764347270268_ac9jcce9s)
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1550 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'ai-flow_1764347270268_ac9jcce9s', sessionsCount: 1, sessionsList: Array(1)}
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 10
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 11
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 12
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 13
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 14
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 15
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 16
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 17
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 18
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 19
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 20
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 21
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 7}
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:725 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 6, chapterCount: 3, nodeCount: 10, edgeCount: 7, frameIds: Array(6), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: true}
unifiedStorage.ts:553 ✅ IndexedDB save completed
unifiedStorage.ts:104 ✅ Unified save completed successfully
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:754
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1491
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:445
useUnifiedStorage.ts:758 🔄 BACKGROUND SAVE: Completed with result: {success: true, persistedNodeCount: 10, persistedEdgeCount: 7, persistedFrameCount: 6, persistedChapterCount: 3, …}
useAIProviders.ts:232 🔄 aiProviders object updated
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1764347187983:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/c07fe9e8a2851c8f.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764347187983:1367
Promise.then
hotCheck @ webpack.js?v=1764347187983:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 488ms
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
[Violation] Forced reflow while executing JavaScript took 42ms
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 22
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 7}
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
PDFAttachmentNode.tsx:196 🎯 PDF attachment data updated, triggering node data save: {nodeId: 'frame_ddp_6::https_//thefirehacker.github.io/til-ddp-python-basics.html', title: 'DDP Python Basics Cheatsheet', source: 'url', pdfUrl: 'https://thefirehacker.github.io/til-ddp-python-basics.html'}
DualPaneFrameView.tsx:239 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 6}
page.tsx:2302 🔧 handleFramesChange: Merged 6 new frames with 6 existing frames {totalAfterMerge: 6, activeTimeCapsuleId: 'timecapsule_1764332688799_k2kas6sls', activeSessionId: 'ai-flow_1764347270268_ac9jcce9s', framesWithBoth: 6}
useUnifiedStorage.ts:1572 📥 handleForceSaveEvent received! {reason: 'pdf-attachment-updated', hasGraphState: false, nodeCount: undefined, hasFrames: false, frameCount: undefined, …}
PDFAttachmentNode.tsx:270 📡 PDF attachment updated, notifying connected frame: {frameId: 'frame_ddp_6', type: 'pdf', source: 'url'}
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 23
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 24
react-dom-client.development.js:16378 [Violation] 'click' handler took 254ms
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 25
useUnifiedStorage.ts:1572 📥 handleForceSaveEvent received! {reason: 'node-data-updated', hasGraphState: true, nodeCount: 10, hasFrames: false, frameCount: undefined, …}
useUnifiedStorage.ts:1614 ⏭️ Priority save - will override in-progress save with fresh graph state
useUnifiedStorage.ts:725 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 6, chapterCount: 3, nodeCount: 10, edgeCount: 7, frameIds: Array(6), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_1: 9-ujtnbfvhuz
useUnifiedStorage.ts:1572 📥 handleForceSaveEvent received! {reason: 'node-data-updated', hasGraphState: true, nodeCount: 10, hasFrames: false, frameCount: undefined, …}
useUnifiedStorage.ts:1614 ⏭️ Priority save - will override in-progress save with fresh graph state
useUnifiedStorage.ts:1572 📥 handleForceSaveEvent received! {reason: 'node-data-updated', hasGraphState: true, nodeCount: 10, hasFrames: false, frameCount: undefined, …}
useUnifiedStorage.ts:1614 ⏭️ Priority save - will override in-progress save with fresh graph state
unifiedStorage.ts:553 ✅ IndexedDB save completed
VectorStore.ts:1936 📊 Synced frame AI-Frame: Why Distributed Training for LLMs? to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_1 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
useAIProviders.ts:232 🔄 aiProviders object updated
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_1: 10-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Why Distributed Training for LLMs? (ID: aiframe-frame_ddp_1, Rev: 10-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_2: 9-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Visual Mental Model of DDP to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_2 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 7}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_2: 10-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Visual Mental Model of DDP (ID: aiframe-frame_ddp_2, Rev: 10-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_3: 9-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Python Idioms: Dictionary Comprehensions and Kwargs Unpacking to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_3 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_3: 10-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Python Idioms: Dictionary Comprehensions and Kwargs Unpacking (ID: aiframe-frame_ddp_3, Rev: 10-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_4: 9-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Seeding and Gradient Averaging Basics to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_4 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_4: 10-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Seeding and Gradient Averaging Basics (ID: aiframe-frame_ddp_4, Rev: 10-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_5: 9-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Building a Tiny DDP Wrapper to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_5 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_5: 10-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Building a Tiny DDP Wrapper (ID: aiframe-frame_ddp_5, Rev: 10-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_6: 9-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Minimal Training Loop, Pitfalls, and LLM Scaling to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_6 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_6: 10-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Minimal Training Loop, Pitfalls, and LLM Scaling (ID: aiframe-frame_ddp_6, Rev: 10-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 27-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 7}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 28-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 28-ujtnbfvhuz)
unifiedStorage.ts:104 ✅ Unified save completed successfully
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:754
useUnifiedStorage.ts:758 🔄 BACKGROUND SAVE: Completed with result: {success: true, persistedNodeCount: 10, persistedEdgeCount: 7, persistedFrameCount: 6, persistedChapterCount: 3, …}
useUnifiedStorage.ts:622 🔒 PRIORITY SAVE: Locked queue with fresh graph state {nodeCount: 10, edgeCount: 7, frameCount: 6, chapterCount: 3}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_1: 10-ujtnbfvhuz
useAIProviders.ts:232 🔄 aiProviders object updated
hot-reloader-client.js:197 [Fast Refresh] rebuilding
unifiedStorage.ts:553 ✅ IndexedDB save completed
VectorStore.ts:1936 📊 Synced frame AI-Frame: Why Distributed Training for LLMs? to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_1 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_1: 11-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Why Distributed Training for LLMs? (ID: aiframe-frame_ddp_1, Rev: 11-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_2: 10-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Visual Mental Model of DDP to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_2 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_2: 11-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Visual Mental Model of DDP (ID: aiframe-frame_ddp_2, Rev: 11-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_3: 10-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Python Idioms: Dictionary Comprehensions and Kwargs Unpacking to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_3 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_3: 11-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Python Idioms: Dictionary Comprehensions and Kwargs Unpacking (ID: aiframe-frame_ddp_3, Rev: 11-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_4: 10-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Seeding and Gradient Averaging Basics to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_4 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_4: 11-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Seeding and Gradient Averaging Basics (ID: aiframe-frame_ddp_4, Rev: 11-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_5: 10-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Building a Tiny DDP Wrapper to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_5 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_5: 11-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Building a Tiny DDP Wrapper (ID: aiframe-frame_ddp_5, Rev: 11-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_6: 10-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Minimal Training Loop, Pitfalls, and LLM Scaling to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_6 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_6: 11-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Minimal Training Loop, Pitfalls, and LLM Scaling (ID: aiframe-frame_ddp_6, Rev: 11-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 28-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 29-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 29-ujtnbfvhuz)
unifiedStorage.ts:104 ✅ Unified save completed successfully
report-hmr-latency.js:14 [Fast Refresh] done in 737ms
webpack.js?v=1764347187983:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/4783874016ba25f6.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764347187983:1367
Promise.then
hotCheck @ webpack.js?v=1764347187983:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
useUnifiedStorage.ts:653 🔒 PRIORITY SAVE: Completed with result: {success: true, persistedNodeCount: 10, persistedEdgeCount: 7, persistedFrameCount: 6, persistedChapterCount: 3}
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
hot-reloader-client.js:197 [Fast Refresh] rebuilding
[Violation] Forced reflow while executing JavaScript took 41ms
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1764347187983:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/f93163241d49470b.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764347187983:1367
Promise.then
hotCheck @ webpack.js?v=1764347187983:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 2433ms
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
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
[Violation] Forced reflow while executing JavaScript took 76ms
useAIProviders.ts:232 🔄 aiProviders object updated
[Violation] Forced reflow while executing JavaScript took 42ms
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 26
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 27
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 28
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 29
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 30
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 31
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 32
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 33
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 34
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 35
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 36
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 37
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 38
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 39
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 7}
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:725 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 6, chapterCount: 3, nodeCount: 10, edgeCount: 7, frameIds: Array(6), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: true}
unifiedStorage.ts:553 ✅ IndexedDB save completed
unifiedStorage.ts:104 ✅ Unified save completed successfully
useUnifiedStorage.ts:758 🔄 BACKGROUND SAVE: Completed with result: {success: true, persistedNodeCount: 10, persistedEdgeCount: 7, persistedFrameCount: 6, persistedChapterCount: 3, …}
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:754
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:1491
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:445
setTimeout
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:443
triggerNodeChanges @ index.js:5054
updateNodePositions @ index.js:5042
eval @ index.js:2246
call @ dispatch.js:61
gesture @ drag.js:159
mouseupped @ drag.js:89
eval @ on.js:7
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1764347187983:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/c14cbaf4f8a0d5a5.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764347187983:1367
Promise.then
hotCheck @ webpack.js?v=1764347187983:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 780ms
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
[Violation] Forced reflow while executing JavaScript took 49ms
useAIProviders.ts:232 🔄 aiProviders object updated
[Violation] Forced reflow while executing JavaScript took 32ms
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 40
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 41
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 42
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 43
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 44
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 7}
FrameGraphIntegration.tsx:1322 🎨 Auto-layout: Organizing graph with 10 nodes
FrameGraphIntegration.tsx:129 🔍 Analyzing edges for attachments: {totalEdges: 7, attachmentNodeIds: Array(1), frameNodeIds: Array(6), edgeDetails: Array(7)}
FrameGraphIntegration.tsx:157 ✅ Found attachment edge: {frameId: 'node_frame_ddp_6_1', attachmentId: 'frame_ddp_6::https_//thefirehacker.github.io/til-ddp-python-basics.html'}
FrameGraphIntegration.tsx:170 📊 Graph structure analysis: {chapters: 3, frames: 6, attachments: 1, concepts: 0, attachmentMapSize: 1, …}
useUnifiedStorage.ts:1572 📥 handleForceSaveEvent received! {reason: 'auto-layout-graph', hasGraphState: true, nodeCount: 10, hasFrames: false, frameCount: undefined, …}
FrameGraphIntegration.tsx:1358 ✅ Auto-layout: Graph organized successfully
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:725 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 6, chapterCount: 3, nodeCount: 10, edgeCount: 7, frameIds: Array(6), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_1: 11-ujtnbfvhuz
EnhancedLearningGraph.tsx:2305 🎨 React Flow: Auto-layout event received {reason: 'auto-layout', nodeCount: 10, timestamp: 1764347639270, graphState: {…}, forceFitView: true}
EnhancedLearningGraph.tsx:2315 🎨 React Flow: Applying auto-layout positions {nodeCount: 10, edgeCount: 7, source: 'event'}
FrameGraphIntegration.tsx:1372 📡 Dispatched graph-layout-applied event
page.tsx:2302 🔧 handleFramesChange: Merged 6 new frames with 6 existing frames {totalAfterMerge: 6, activeTimeCapsuleId: 'timecapsule_1764332688799_k2kas6sls', activeSessionId: 'ai-flow_1764347270268_ac9jcce9s', framesWithBoth: 6}
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 7}
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 45
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 46
scheduler.development.js:14 [Violation] 'message' handler took 172ms
EnhancedLearningGraph.tsx:2335 ✅ Auto-layout viewport updated
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'setTimeout' handler took 100ms
unifiedStorage.ts:553 ✅ IndexedDB save completed
FrameGraphIntegration.tsx:1619 💾 Saving frames to localStorage...
installHook.js:1 ⚠️ VectorStore sync failed
overrideMethod @ installHook.js:1
handleSaveGraph @ FrameGraphIntegration.tsx:1633
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 7}
react-dom-client.development.js:16378 [Violation] 'requestAnimationFrame' handler took 62ms
VectorStore.ts:1936 📊 Synced frame AI-Frame: Why Distributed Training for LLMs? to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_1 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_1: 12-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Why Distributed Training for LLMs? (ID: aiframe-frame_ddp_1, Rev: 12-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_2: 11-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Visual Mental Model of DDP to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_2 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 7}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_2: 12-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Visual Mental Model of DDP (ID: aiframe-frame_ddp_2, Rev: 12-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_3: 11-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Python Idioms: Dictionary Comprehensions and Kwargs Unpacking to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_3 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_3: 12-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Python Idioms: Dictionary Comprehensions and Kwargs Unpacking (ID: aiframe-frame_ddp_3, Rev: 12-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_4: 11-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Seeding and Gradient Averaging Basics to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_4 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_4: 12-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Seeding and Gradient Averaging Basics (ID: aiframe-frame_ddp_4, Rev: 12-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_5: 11-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Building a Tiny DDP Wrapper to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_5 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_5: 12-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Building a Tiny DDP Wrapper (ID: aiframe-frame_ddp_5, Rev: 12-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_6: 11-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame: Minimal Training Loop, Pitfalls, and LLM Scaling to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame_ddp_6 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame_ddp_6: 12-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: Minimal Training Loop, Pitfalls, and LLM Scaling (ID: aiframe-frame_ddp_6, Rev: 12-ujtnbfvhuz)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 29-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 30-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 30-ujtnbfvhuz)
unifiedStorage.ts:104 ✅ Unified save completed successfully
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useUnifiedStorage.ts:758 🔄 BACKGROUND SAVE: Completed with result: {success: true, persistedNodeCount: 10, persistedEdgeCount: 7, persistedFrameCount: 6, persistedChapterCount: 3, …}
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:725 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 6, chapterCount: 3, nodeCount: 10, edgeCount: 7, frameIds: Array(6), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: true}
useAIProviders.ts:232 🔄 aiProviders object updated
unifiedStorage.ts:553 ✅ IndexedDB save completed
unifiedStorage.ts:104 ✅ Unified save completed successfully
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 47
EnhancedLearningGraph.tsx:4110 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:4122 EnhancedLearningGraph rerender: 48
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:754
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:799
useUnifiedStorage.ts:758 🔄 BACKGROUND SAVE: Completed with result: {success: true, persistedNodeCount: 10, persistedEdgeCount: 7, persistedFrameCount: 6, persistedChapterCount: 3, …}
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
hot-reloader-client.js:197 [Fast Refresh] rebuilding
EnhancedLearningGraph.tsx:239 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 10, edgeCount: 7}
webpack.js?v=1764347187983:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/5763ee83c9d82610.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764347187983:1367
Promise.then
hotCheck @ webpack.js?v=1764347187983:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 138ms
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
[Violation] Forced reflow while executing JavaScript took 41ms
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1764347187983:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/d0c5654bbc092518.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764347187983:1367
Promise.then
hotCheck @ webpack.js?v=1764347187983:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
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
report-hmr-latency.js:14 [Fast Refresh] done in 1053ms
[Violation] Forced reflow while executing JavaScript took 53ms
useAIProviders.ts:232 🔄 aiProviders object updated
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useAIFlowBuilder.ts:1437 ⏰ Auto-saving session (2-minute interval)...
VectorStore.ts:2000 📋 Retrieved latest revision for session_ai-flow_1764347270268_ac9jcce9s: 3-ujtnbfvhuz
VectorStore.ts:1936 📊 Synced frame AI Flow: using ddp pdf file build a lesson plan for me on d to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: session_ai-flow_1764347270268_ac9jcce9s (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for session_ai-flow_1764347270268_ac9jcce9s: 4-ujtnbfvhuz
VectorStore.ts:2647 ✅ Document persistence verified: AI Flow: using ddp pdf file build a lesson plan for me on d (ID: session_ai-flow_1764347270268_ac9jcce9s, Rev: 4-ujtnbfvhuz)
sessionStore.ts:76 💾 Session saved: AI Flow: using ddp pdf file build a lesson plan for me on d (ai-flow_1764347270268_ac9jcce9s)
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1550 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'ai-flow_1764347270268_ac9jcce9s', sessionsCount: 1, sessionsList: Array(1)}
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
hot-reloader-client.js:197 [Fast Refresh] rebuilding
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
webpack.js?v=1764347187983:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/d1e53e483fdd7711.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764347187983:1367
Promise.then
hotCheck @ webpack.js?v=1764347187983:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 7206ms
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
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
useAIProviders.ts:232 🔄 aiProviders object updated
[Violation] Forced reflow while executing JavaScript took 72ms
[Violation] Forced reflow while executing JavaScript took 48ms
ai-frames:1 The resource http://localhost:3000/_next/static/css/app/layout.css?v=1764347604245 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
page.tsx:1994 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1994
