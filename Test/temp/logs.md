page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
react-dom-client.development.js:16378 [Violation] 'pointerup' handler took 151ms
[Violation] 'input' handler took 179ms
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
Orchestrator.ts:475 🧠 Master LLM Orchestrator starting for: "using ddp pdf file build a lesson plan for me on distributed training"
Orchestrator.ts:490 🎯 Master Orchestrator: Discovering documents for query "using ddp pdf file build a lesson plan for me on distributed training"
Orchestrator.ts:526 🔍 Discovering documents for query: "using ddp pdf file build a lesson plan for me on distributed training"
VectorStore.ts:1104 🔍 getDocumentMetadata: Filtering for document types [userdocs]
react-dom-client.development.js:16378 [Violation] 'click' handler took 195ms
VectorStore.ts:1166 🔍 getDocumentMetadata: Retrieved 1 documents (filtered for: userdocs)
Orchestrator.ts:530 📚 Found 1 user documents
Orchestrator.ts:557 ✅ Master Orchestrator: Prepared 1 document metadata for DataInspector analysis
Orchestrator.ts:880 🎯 Master LLM analyzing situation and planning tool calls...
Orchestrator.ts:3027 ❌ No extracted data found in any location
Orchestrator.ts:977 🎯 Starting micro-session: "Analyze document structure and relevance"
Orchestrator.ts:3027 ❌ No extracted data found in any location
Orchestrator.ts:896 🔄 Master LLM Iteration 1: Analyze document structure and relevance
Orchestrator.ts:1358 🧠 Master LLM Decision Response (493 chars): ACTION: CALL_TOOL  
TOOL_NAME: DataInspector  
REASONING: No agents have been called yet, and the mandatory execution order requires starting with DataInspector to analyze and filter the 1 pre-loaded document chunk for structure and relevance, as document analysis is NOT DONE and this step is essential for identifying relevant content before planning or extraction.  
NEXT_GOAL: Obtain filtered and analyzed documents to enable the next step of creating an execution plan with PlanningAgent.
Orchestrator.ts:1678 🔍 PARSING DEBUG: Full response (493 chars): ACTION: CALL_TOOL  
TOOL_NAME: DataInspector  
REASONING: No agents have been called yet, and the mandatory execution order requires starting with DataInspector to analyze and filter the 1 pre-loaded document chunk for structure and relevance, as document analysis is NOT DONE and this step is essential for identifying relevant content before planning or extraction.  
NEXT_GOAL: Obtain filtered and analyzed documents to enable the next step of creating an execution plan with PlanningAgent.
Orchestrator.ts:1691 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1694 🎯 PARSED TOOL_NAME (FIRST): DataInspector
Orchestrator.ts:1703 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1710 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataInspector
Orchestrator.ts:1361 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataInspector', reasoning: 'Need to call DataInspector to progress toward the goal'}
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "DataInspector"
Orchestrator.ts:2916 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
makeMasterLLMDecision @ Orchestrator.ts:1355
masterLLMOrchestration @ Orchestrator.ts:898
research @ Orchestrator.ts:503
await in research
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:1400
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "DataInspector"
Orchestrator.ts:2916 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "DataInspector"
Orchestrator.ts:2916 🎯 Mapping DataInspector → DataInspector (contains 'inspector' or 'analyzer')
Orchestrator.ts:1835 🔍 PLAN-GUIDED VALIDATION: DataInspector
Orchestrator.ts:1836 📋 Agent Status: No agents called yet
Orchestrator.ts:1837 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:2408 ✅ Agent execution validated: DataInspector always allowed as first agent
Orchestrator.ts:2532 🔧 Executing tool: DataInspector (original: DataInspector)
Orchestrator.ts:2543 ⏳ [orch-1763571967057-qy8o] Starting DataInspector - waiting for completion...
DataInspectorAgent.ts:112 🔎 DataInspector: Received document metadata - performing multi-document sampling and analysis
DataInspectorAgent.ts:2223 📋 Found 1 documents to analyze: ['thefirehacker-github-io-til-ddp-python-basics-html.pdf']
DataInspectorAgent.ts:2288 🔍 Sampling real chunks from 1 documents for intelligent analysis
DataInspectorAgent.ts:2318 🔍 Sampling chunks from document 1/1: thefirehacker-github-io-til-ddp-python-basics-html.pdf
DataInspectorAgent.ts:2417 ✅ Sampled 9 real chunks from "thefirehacker-github-io-til-ddp-python-basics-html.pdf" (29 total chunks)
DataInspectorAgent.ts:2479 ✅ Sampled chunks from 1 documents with real content
DataInspectorAgent.ts:2484 🧠 Analyzing 1 documents with real sampled content for intelligent relevance decisions
DataInspectorAgent.ts:441 🔍 Multi-document analysis: 1 documents detected
scheduler.development.js:14 [Violation] 'message' handler took 188ms
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
react-dom-client.development.js:16378 [Violation] 'click' handler took 208ms
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
eval @ index.ts:86
performMultiDocumentAnalysis @ DataInspectorAgent.ts:499
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:2487
await in performDocumentMetadataAnalysis
processNormally @ DataInspectorAgent.ts:122
await in processNormally
process @ FeedbackAwareAgent.ts:211
executeToolCall @ Orchestrator.ts:2544
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1046
masterLLMOrchestration @ Orchestrator.ts:923
await in masterLLMOrchestration
research @ Orchestrator.ts:503
await in research
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:1400
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
DataInspectorAgent.ts:500 🤖 Multi-document analysis: # Multi-Document Analysis Report

## 1. DOCUMENT TYPES
**Document 1 (doc_1763566754002_y2sf72cfm)**: **Technical Tutorial/Educational Blog Post**
- This is a structured educational document about Distributed Data Parallel (DDP) training
- Contains a clear table of contents with 11 sections plus bonu
DataInspectorAgent.ts:762 🧠 DataInspector analyzing 1 documents with pure LLM intelligence
DataInspectorAgent.ts:972 🔍 DEBUG DataInspector Document 1 Sample Content: {chunksCount: 9, sampleLength: 4780, firstChunkPreview: 'TL;DR\n\n Core Python patterns explained: Core Pyt…ints) into model-ready tensors in one elegant ...', hasActualContent: true, filename: 'thefirehacker-github-io-til-ddp-python-basics-html.pdf', …}
DataInspectorAgent.ts:1035 📤 DEBUG DataInspector Document 1 LLM Prompt: {promptLength: 6296, containsDocumentContent: true, contentSampleInPrompt: 'Analyze this document and determine its relevance …;DR\n\n Core Python patterns explained: Core P...'}
scheduler.development.js:14 [Violation] 'message' handler took 184ms
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
DataInspectorAgent.ts:1048 🧠 DataInspector Document 1 LLM Response: TYPE: Tutorial/Educational Document
MAIN_ENTITY: PyTorch Distributed Data Parallel (DDP) training in Python
RELEVANT: YES
REASON: Document directly teaches DDP concepts, patterns, and implementation - perfect foundation for building a distributed training lesson plan as requested in query.

METHODS:
set_seed()
all_reduce()
optimizer.step()
torch.manual_seed()
torch.cuda.manual_seed_all()
model.forward()
average_grads()
dictionary comprehension for tensor conversion
kwargs unpacking (**)
gradient...
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
eval @ index.ts:86
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1045
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:793
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:663
performMultiDocumentAnalysis @ DataInspectorAgent.ts:504
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
DataInspectorAgent.ts:1201 ⚠️ DataInspector: Failed to parse structured JSON response: Error: Invalid JSON after all extraction attempts
    at parseJsonWithResilience (responseCompletion.ts:262:11)
    at DataInspectorAgent.parseStructuredAnalysis (DataInspectorAgent.ts:1196:45)
    at DataInspectorAgent.analyzeDocumentIntelligently (DataInspectorAgent.ts:1053:31)
    at async DataInspectorAgent.parseMultiDocumentAnalysis (DataInspectorAgent.ts:793:27)
    at async DataInspectorAgent.updateContextFromMultiDocumentInspection (DataInspectorAgent.ts:663:32)
    at async DataInspectorAgent.performMultiDocumentAnalysis (DataInspectorAgent.ts:504:9)
    at async DataInspectorAgent.performDocumentMetadataAnalysis (DataInspectorAgent.ts:2487:5)
    at async DataInspectorAgent.processNormally (DataInspectorAgent.ts:122:7)
    at async Orchestrator.executeToolCall (Orchestrator.ts:2544:7)
    at async Orchestrator.executeToolCallWithMicroSession (Orchestrator.ts:1046:5)
    at async Orchestrator.masterLLMOrchestration (Orchestrator.ts:923:9)
    at async Orchestrator.research (Orchestrator.ts:503:5)
    at async useAIFlowBuilder.useCallback[planFlow] (useAIFlowBuilder.ts:1400:7)
overrideMethod @ hook.js:608
parseStructuredAnalysis @ DataInspectorAgent.ts:1201
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1053
await in analyzeDocumentIntelligently
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:793
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:663
performMultiDocumentAnalysis @ DataInspectorAgent.ts:504
DataInspectorAgent.ts:1055 ⚠️ DataInspector: Structured JSON missing or invalid, falling back to regex extraction
overrideMethod @ hook.js:608
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1055
await in analyzeDocumentIntelligently
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:793
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:663
performMultiDocumentAnalysis @ DataInspectorAgent.ts:504
DataInspectorAgent.ts:1255 🎯 DataInspector: Extracted MAIN_ENTITY: "PyTorch Distributed Data Parallel (DDP) training in Python"
DataInspectorAgent.ts:1350 ⚠️ DataInspector failed to extract CONCEPT_SYNTHESIS from response: "TYPE: Tutorial/Educational Document
MAIN_ENTITY: PyTorch Distributed Data Parallel (DDP) training in Python
RELEVANT: YES
REASON: Document directly teaches DDP concepts, patterns, and implementation -..."
overrideMethod @ hook.js:608
extractValue @ DataInspectorAgent.ts:1350
analyzeDocumentIntelligently @ DataInspectorAgent.ts:1073
await in analyzeDocumentIntelligently
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:793
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:663
performMultiDocumentAnalysis @ DataInspectorAgent.ts:504
DataInspectorAgent.ts:1277 🎯 DataInspector: Extracted RELEVANT: "YES"
DataInspectorAgent.ts:1144 🔍 DataInspector Document 1 Parsed: {docType: 'Tutorial/Educational Document MAINENTITY: PyTorch …tates logits loss values SequenceClassifierOutput', mainEntity: 'PyTorch Distributed Data Parallel (DDP) training in Python', relevantText: 'YES', reasoning: 'Document directly teaches DDP concepts, patterns, …implementation - perfect foundation for buildi...'}
DataInspectorAgent.ts:1156 🔍 COMPREHENSIVE ANALYSIS: Query="using ddp pdf file build a lesson plan for me on distributed training", Entity="PyTorch Distributed Data Parallel (DDP) training in Python" → Result: true
DataInspectorAgent.ts:799 🔍 Document 1 intelligent analysis: {docType: 'Tutorial/Educational Document MAINENTITY: PyTorch …tates logits loss values SequenceClassifierOutput', primaryEntity: 'PyTorch Distributed Data Parallel (DDP) training in Python', isRelevant: true, reasoning: 'Document directly teaches DDP concepts, patterns, …implementation - perfect foundation for buildi...'}
scheduler.development.js:14 [Violation] 'message' handler took 179ms
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
eval @ index.ts:86
discoverContentAreas @ DataInspectorAgent.ts:1598
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:810
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:663
performMultiDocumentAnalysis @ DataInspectorAgent.ts:504
scheduler.development.js:14 [Violation] 'message' handler took 151ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
eval @ index.ts:86
discoverEntitiesIntelligently @ DataInspectorAgent.ts:1551
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:813
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:663
performMultiDocumentAnalysis @ DataInspectorAgent.ts:504
scheduler.development.js:14 [Violation] 'message' handler took 162ms
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
eval @ index.ts:86
discoverDocumentRole @ DataInspectorAgent.ts:1672
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:816
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:663
performMultiDocumentAnalysis @ DataInspectorAgent.ts:504
DataInspectorAgent.ts:873 ⏭️ Skipping irrelevant document: Semantic analysis override (70%):  - PyTorch Distributed Data Parallel (DDP) training in Python
DataInspectorAgent.ts:887 📊 Document filtering: 1 total → 0 relevant
DataInspectorAgent.ts:683 📋 Multi-Document Analysis: 0 documents with 0 relationships
DataInspectorAgent.ts:728 🚨 CROSS-CONTAMINATION PREVENTION: Filtered RAG chunks from 1 to 0 (removed 1 irrelevant chunks)
DataInspectorAgent.ts:2643 🧠 DataInspector: Extracting intelligence from concept synthesis
DataInspectorAgent.ts:2649 ⚠️ No concept synthesis available for intelligence extraction
DataInspectorAgent.ts:2495 📊 Relevance filtering: 0 relevant out of 1 total documents
DataInspectorAgent.ts:2506 🔄 Replacing 0 document metadata with 0 relevant chunks from intelligent analysis
Orchestrator.ts:2545 ✅ [orch-1763571967057-qy8o] DataInspector process() completed - agent finished
Orchestrator.ts:2549 ✅ Tool DataInspector completed in 50670ms
Orchestrator.ts:3221 🔍 PlanningAgent consuming and validating DataInspector results using Claude Code-style logic
PlanningAgent.ts:2578 🎯 PlanningAgent: Consuming and validating results from DataInspector
PlanningAgent.ts:1849 🔍 PlanningAgent: Validating DataInspector results for query: "using ddp pdf file build a lesson plan for me on distributed training"
PlanningAgent.ts:1877 🔍 VALIDATION DEBUG: Testing query "using ddp pdf file build a lesson plan for me on distributed training" against entity patterns
PlanningAgent.ts:1881 🔍 VALIDATION DEBUG: Pattern /\b([A-Z][a-z]+)'s\s+(.+)/ → Match: null
PlanningAgent.ts:1881 🔍 VALIDATION DEBUG: Pattern /from\s+([A-Z][a-z]+)'s\s+(.+)/ → Match: null
PlanningAgent.ts:1881 🔍 VALIDATION DEBUG: Pattern /by\s+([A-Z][a-z]+)\b/ → Match: null
PlanningAgent.ts:1881 🔍 VALIDATION DEBUG: Pattern /([A-Z][a-z]+)'s\s+(blog|work|project|research)/ → Match: null
PlanningAgent.ts:1891 🔍 VALIDATION DEBUG: No entity ownership pattern found in query "using ddp pdf file build a lesson plan for me on distributed training"
PlanningAgent.ts:2063 ✅ VALIDATION SUCCESS: DataInspector results validated - Found relevant documents and extracted meaningful entities
PlanningAgent.ts:2068 ✅ VALIDATION SUCCESS RESULT: {isValid: true, reason: 'DataInspector successfully analyzed 0 documents and extracted 0 entity categories'}
PlanningAgent.ts:2591 ✅ DataInspector validation passed
Orchestrator.ts:2553 🔍 Quality assessment for DataInspector: acceptable
Orchestrator.ts:3500 🔍 DataInspector approved 0 documents - fetching ALL chunks
Orchestrator.ts:3501 📊 Approved documents: []
scheduler.development.js:14 [Violation] 'message' handler took 181ms
VectorStore.ts:1082 📚 Retrieved 1 documents of type: userdocs
VectorStore.ts:1817 🔍 getAllChunks: Filtering for document types [userdocs]
VectorStore.ts:1856 🔍 getAllChunks: Retrieved 29 chunks from 1 documents (filtered for: userdocs)
Orchestrator.ts:3510 📚 Total chunks in vector store: 29
Orchestrator.ts:3525 🎯 Filtered to 0 chunks from approved documents
Orchestrator.ts:3526 📊 Current context has 0 chunks
Orchestrator.ts:3544 ✅ No expansion needed: already have 0 chunks
Orchestrator.ts:2596 🎯 Strategic validation checkpoint: DataInspector - running PlanningAgent validation
Orchestrator.ts:2597 🔍 PlanningAgent consuming DataInspector results for quality analysis...
PlanningAgent.ts:2578 🎯 PlanningAgent: Consuming and validating results from [object Object]
PlanningAgent.ts:2625 ℹ️ No specific validation for [object Object] - allowing to continue
Orchestrator.ts:2652 ✅ DataInspector results validated by PlanningAgent - quality acceptable
scheduler.development.js:14 [Violation] 'message' handler took 157ms
Orchestrator.ts:2674 ⏱️ Validation UI sync delay completed
Orchestrator.ts:3027 ❌ No extracted data found in any location
Orchestrator.ts:896 🔄 Master LLM Iteration 2: Analyze document structure and relevance
Orchestrator.ts:1358 🧠 Master LLM Decision Response (583 chars): ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The mandatory execution order requires calling PlanningAgent next after DataInspector to create an intelligent execution strategy for analyzing document structure and relevance, especially since no documents are available and the plan will guide how to proceed with pattern generation and synthesis despite the lack of pre-loaded chunks.
NEXT_GOAL: Generate a validated execution plan that outlines the next steps for pattern identification, data...
Orchestrator.ts:1678 🔍 PARSING DEBUG: Full response (583 chars): ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REASONING: The mandatory execution order requires calling PlanningAgent next after DataInspector to create an intelligent execution strategy for analyzing document structure and relevance, especially since no documents are available and the plan will guide how to proceed with pattern generation and synthesis despite the lack of pre-loaded chunks.
NEXT_GOAL: Generate a validated execution plan that outlines the next steps for pattern identification, data handling (even with zero documents), and synthesis to produce a relevant analysis.
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
makeMasterLLMDecision @ Orchestrator.ts:1355
masterLLMOrchestration @ Orchestrator.ts:898
Orchestrator.ts:1691 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1694 🎯 PARSED TOOL_NAME (FIRST): PlanningAgent
Orchestrator.ts:1703 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:1710 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PlanningAgent
Orchestrator.ts:1361 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PlanningAgent', reasoning: 'Need to call PlanningAgent to progress toward the goal'}
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "PlanningAgent"
Orchestrator.ts:2928 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "PlanningAgent"
Orchestrator.ts:2928 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "PlanningAgent"
Orchestrator.ts:2928 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:1835 🔍 PLAN-GUIDED VALIDATION: PlanningAgent
Orchestrator.ts:1836 📋 Agent Status: ✅ Completed: [DataInspector]
Orchestrator.ts:1837 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:2408 ✅ Agent execution validated: PlanningAgent execution is contextually appropriate
Orchestrator.ts:2532 🔧 Executing tool: PlanningAgent (original: PlanningAgent)
Orchestrator.ts:2543 ⏳ [orch-1763571967057-qy8o] Starting PlanningAgent - waiting for completion...
PlanningAgent.ts:61 🎯 PlanningAgent: Creating intelligent execution strategy for "using ddp pdf file build a lesson plan for me on distributed training"
PlanningAgent.ts:68 📊 Situation Analysis: {hasDocuments: false, documentCount: 0, hasDocumentAnalysis: true, relevantDocuments: 0, documentTypes: Array(0), …}
PlanningAgent.ts:603 🎯 PlanningAgent: Creating extraction strategy from DataInspector analysis
PlanningAgent.ts:614 🧠 Document context analysis: {documentType: 'Research Paper', documentPurpose: 'General research', isMethodPaper: false, isSurveyPaper: false, mainContribution: 'Unknown', …}
PlanningAgent.ts:1469 🔍 PlanningAgent: Analyzing query intent directly for "using ddp pdf file build a lesson plan for me on distributed training"
PlanningAgent.ts:1498 🎯 Direct intent analysis: No override needed, proceeding with normal flow
PlanningAgent.ts:623 🎯 Intelligent expectations: {shouldFindSpecificMethod: false, shouldFindComparisons: false, shouldInferFromContribution: false, expectedAnswerType: 'general_information', contextualReasoning: 'Standard extraction approach'}
PlanningAgent.ts:889 🎯 PlanningAgent: Assessing document-section relevance to query: "using ddp pdf file build a lesson plan for me on distributed training"
PlanningAgent.ts:952 🎯 PlanningAgent: Extracting query-aware pattern categories
PlanningAgent.ts:970 🎯 Query-relevant categories: (2) ['methods', 'concepts']
PlanningAgent.ts:1009 ✅ Query-aware pattern categories: concepts: 9
PlanningAgent.ts:1071 🎯 Dynamic extraction targets based on analysis: (2) ['content', 'concepts']
PlanningAgent.ts:645 ✅ Created extraction strategy: {documentType: 'Research Paper', queryIntent: 'general_information', contentAreas: 0, patternCategories: 1, extractionTargets: 2, …}
PlanningAgent.ts:83 ✅ Created extraction strategy with 1 pattern categories
PlanningAgent.ts:1506 🔍 PlanningAgent: Validating DataInspector classifications against query
PlanningAgent.ts:1592 🔍 PlanningAgent: Validating DataInspector document selections against query
PlanningAgent.ts:1596 ⚠️ No documents to validate
scheduler.development.js:14 [Violation] 'message' handler took 167ms
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
eval @ index.ts:86
createExecutionPlan @ PlanningAgent.ts:224
await in createExecutionPlan
process @ PlanningAgent.ts:104
await in process
executeToolCall @ Orchestrator.ts:2544
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1046
masterLLMOrchestration @ Orchestrator.ts:923
PlanningAgent.ts:369 🔄 PlanningAgent parsing attempt 1/4
PlanningAgent.ts:389 ✅ Successfully parsed execution plan on attempt 1
PlanningAgent.ts:231 🎯 Generated execution plan: {strategy: 'Since no documents are available and the query spe…esults into an educational lesson plan structure.', stepCount: 5, confidence: 0.75}
PlanningAgent.ts:122 ✅ Execution plan created: Since no documents are available and the query specifically requests using a 'ddp pdf file' to build a lesson plan on distributed training, the optimal approach is web-expansion to search for DDP (Distributed Data Parallel) resources and distributed training materials, then synthesize them into a structured lesson plan format. We'll coordinate the search for relevant content, extract key concepts about DDP and distributed training, and format the results into an educational lesson plan structure.
Orchestrator.ts:2545 ✅ [orch-1763571967057-qy8o] PlanningAgent process() completed - agent finished
Orchestrator.ts:2549 ✅ Tool PlanningAgent completed in 22248ms
Orchestrator.ts:2553 🔍 Quality assessment for PlanningAgent: acceptable
Orchestrator.ts:3027 ❌ No extracted data found in any location
Orchestrator.ts:896 🔄 Master LLM Iteration 3: Analyze document structure and relevance
scheduler.development.js:14 [Violation] 'message' handler took 227ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
makeMasterLLMDecision @ Orchestrator.ts:1355
masterLLMOrchestration @ Orchestrator.ts:898
 🧠 Master LLM Decision Response (654 chars): ACTION: CALL_TOOL
TOOL_NAME: QueryPlanner
REASONING: The execution plan from PlanningAgent is in progress and specifies QueryPlanner as the next step, which expands queries based on intent and domain understanding. This is necessary to intelligently proceed with analyzing document structure and relevance, especially since no documents are available—QueryPlanner can refine the approach or identify what structured analysis would entail in the absence of data, aligning with the plan's strategy with...
 🔍 PARSING DEBUG: Full response (654 chars): ACTION: CALL_TOOL
TOOL_NAME: QueryPlanner
REASONING: The execution plan from PlanningAgent is in progress and specifies QueryPlanner as the next step, which expands queries based on intent and domain understanding. This is necessary to intelligently proceed with analyzing document structure and relevance, especially since no documents are available—QueryPlanner can refine the approach or identify what structured analysis would entail in the absence of data, aligning with the plan's strategy without skipping mandatory sequencing.
NEXT_GOAL: Refine query expansions to guide pattern generation and extraction planning for document structure analysis.
 🎯 PARSED ACTION (FIRST): CALL_TOOL
 🎯 PARSED TOOL_NAME (FIRST): QueryPlanner
 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=QueryPlanner
Orchestrator.ts:1361 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'QueryPlanner', reasoning: 'Need to call QueryPlanner to progress toward the goal'}
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "QueryPlanner"
Orchestrator.ts:2928 🎯 Mapping QueryPlanner → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:1036 ⚠️ Agent PlanningAgent exhausted 1 attempts in micro-session "Analyze document structure and relevance"
overrideMethod @ hook.js:608
executeToolCallWithMicroSession @ Orchestrator.ts:1036
masterLLMOrchestration @ Orchestrator.ts:923
Orchestrator.ts:990 🧾 Micro-session "Analyze document structure and relevance" finished with status: failed
Orchestrator.ts:3027 ❌ No extracted data found in any location
Orchestrator.ts:977 🎯 Starting micro-session: "Generate extraction patterns from document insights"
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "PlanningAgent"
Orchestrator.ts:2928 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "PlanningAgent"
Orchestrator.ts:2928 🎯 Mapping PlanningAgent → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:1835 🔍 PLAN-GUIDED VALIDATION: PlanningAgent
Orchestrator.ts:1836 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent]
Orchestrator.ts:1837 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "QueryPlanner"
Orchestrator.ts:2928 🎯 Mapping QueryPlanner → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2264 ✅ PlanningAgent validated against execution plan - prerequisites met
Orchestrator.ts:2408 ✅ Agent execution validated: PlanningAgent execution follows planned sequence - step 1 of 5
Orchestrator.ts:2494 ⚠️ Agent PlanningAgent already called with same inputs (or max reruns reached), skipping
overrideMethod @ hook.js:608
executeToolCall @ Orchestrator.ts:2494
executeToolCallWithMicroSession @ Orchestrator.ts:1046
masterLLMOrchestration @ Orchestrator.ts:923
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "QueryPlanner"
Orchestrator.ts:2928 🎯 Mapping QueryPlanner → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2922 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "FlowFramePlanner"
Orchestrator.ts:2928 🎯 Mapping FlowFramePlanner → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "FlowFrameGenerator"
Orchestrator.ts:2910 🎯 Mapping FlowFrameGenerator → PatternGenerator (contains 'generator')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "ResponseFormatter"
Orchestrator.ts:2946 🎯 Mapping ResponseFormatter → ResponseFormatter (semantic similarity)
Orchestrator.ts:2500 📋 Agent PlanningAgent was already executed successfully.
Orchestrator.ts:2501 📊 Current Pipeline Status: IN PROGRESS 🔄 - 0/5 steps done, next: QueryPlanner
Orchestrator.ts:2502 💡 Next Step Guidance: 
📊 **PIPELINE PROGRESS**:
✅ PlanningAgent → → SynthesisCoordinator (NEXT) → ✅ PlanningAgent → ⏳ PatternGenerator → ⏳ ResponseFormatter

🎯 **IMMEDIATE NEXT STEP**:
- Agent: SynthesisCoordinator
- Action: Coordinate web expansion to gather comprehensive information about PyTorch DDP, distributed training fundamentals, architecture patterns, synchronization methods, and practical implementation guides from authoritative sources
- Purpose: Must collect sufficient educational content from web sources to build a complete lesson plan covering theory and practice of distributed training with DDP

**CRITICAL**: Call SynthesisCoordinator now to continue the pipeline.

📋 **Remaining Pipeline**: SynthesisCoordinator → PatternGenerator → ResponseFormatter

Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "QueryPlanner"
Orchestrator.ts:2928 🎯 Mapping QueryPlanner → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2922 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2527 🎯 Recommended Next Action: Call SynthesisCoordinator next - Coordinate web expansion to gather comprehensive information about PyTorch DDP, distributed training fundamentals, architecture patterns, synchronization methods, and practical implementation guides from authoritative sources
Orchestrator.ts:3027 ❌ No extracted data found in any location
Orchestrator.ts:896 🔄 Master LLM Iteration 4: Generate extraction patterns from document insights
scheduler.development.js:14 [Violation] 'message' handler took 188ms
Orchestrator.ts:1358 🧠 Master LLM Decision Response (1002 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REASONING: The mandatory execution order specifies PatternGenerator as the next step after PlanningAgent (both prerequisites are complete). The goal is to generate extraction patterns from document insights, and Phase 3 (Extraction via PatternGenerator) is marked as READY. PatternGenerator includes integrated extraction capabilities, allowing it to identify patterns and extract data directly from the available document analysis insights, even with 0 ...
Orchestrator.ts:1678 🔍 PARSING DEBUG: Full response (1002 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REASONING: The mandatory execution order specifies PatternGenerator as the next step after PlanningAgent (both prerequisites are complete). The goal is to generate extraction patterns from document insights, and Phase 3 (Extraction via PatternGenerator) is marked as READY. PatternGenerator includes integrated extraction capabilities, allowing it to identify patterns and extract data directly from the available document analysis insights, even with 0 pre-loaded document chunks. This adheres to the sequencing rules, avoids skipping steps, and follows the pipeline without calling SynthesisCoordinator prematurely. Although the execution plan mentions QueryPlanner next, the core sequence and goal prioritization require proceeding to PatternGenerator...
Orchestrator.ts:1691 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:1694 🎯 PARSED TOOL_NAME (FIRST): PatternGenerator
Orchestrator.ts:1703 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
makeMasterLLMDecision @ Orchestrator.ts:1355
masterLLMOrchestration @ Orchestrator.ts:898
Orchestrator.ts:1710 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PatternGenerator
Orchestrator.ts:1361 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PatternGenerator', reasoning: 'Need to call PatternGenerator to progress toward the goal'}
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2906 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2906 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "PatternGenerator"
Orchestrator.ts:2906 🎯 Mapping PatternGenerator → PatternGenerator (contains 'pattern' + 'generator')
Orchestrator.ts:1835 🔍 PLAN-GUIDED VALIDATION: PatternGenerator
Orchestrator.ts:1836 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent]
Orchestrator.ts:1837 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "QueryPlanner"
Orchestrator.ts:2928 🎯 Mapping QueryPlanner → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2922 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "FlowFramePlanner"
Orchestrator.ts:2928 🎯 Mapping FlowFramePlanner → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "FlowFrameGenerator"
Orchestrator.ts:2910 🎯 Mapping FlowFrameGenerator → PatternGenerator (contains 'generator')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "QueryPlanner"
Orchestrator.ts:2928 🎯 Mapping QueryPlanner → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2922 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "FlowFramePlanner"
Orchestrator.ts:2928 🎯 Mapping FlowFramePlanner → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2922 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2260 ⚡ Allowing PatternGenerator to skip optional prerequisites: [SynthesisCoordinator]
Orchestrator.ts:2264 ✅ PatternGenerator validated against execution plan - prerequisites met
Orchestrator.ts:2408 ✅ Agent execution validated: PatternGenerator execution follows planned sequence - step 4 of 5
Orchestrator.ts:2532 🔧 Executing tool: PatternGenerator (original: PatternGenerator)
Orchestrator.ts:2543 ⏳ [orch-1763571967057-qy8o] Starting PatternGenerator - waiting for completion...
PatternGeneratorAgent.ts:29 🎯 PatternGenerator: Creating extraction strategies
PatternGeneratorAgent.ts:35 📋 DEBUG - Existing patterns before PatternGenerator: {count: 0, patterns: Array(0), hasSharedKnowledge: true}
PatternGeneratorAgent.ts:249 🧠 PatternGenerator: Generating dynamic patterns via LLM analysis
PatternGeneratorAgent.ts:277 ✅ Using PlanningAgent extraction strategy: {documentType: 'Research Paper', queryIntent: 'general_information', patternCategories: 1, availableStrategies: 1}
PatternGeneratorAgent.ts:1560 🎯 PatternGenerator: Generating focused patterns (3 regex + 1 semantic)
PatternGeneratorAgent.ts:1603 ✅ Generated 1 focused patterns: ['Semantic content extraction']
PatternGeneratorAgent.ts:2236 🎯 Running focused extraction: 0 regex patterns + 1 semantic patterns
scheduler.development.js:14 [Violation] 'message' handler took 180ms
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
eval @ index.ts:86
extractUsingSemanticSearch @ PatternGeneratorAgent.ts:2331
extractWithGeneratedPatterns @ PatternGeneratorAgent.ts:2248
generateFocusedPatterns @ PatternGeneratorAgent.ts:1608
generateStrategiesWithLLM @ PatternGeneratorAgent.ts:285
process @ PatternGeneratorAgent.ts:45
await in process
executeToolCall @ Orchestrator.ts:2544
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1046
masterLLMOrchestration @ Orchestrator.ts:923
PatternGeneratorAgent.ts:2250 ✅ Semantic extraction: Found 4 items
PatternGeneratorAgent.ts:2258 🔄 After deduplication: 4 unique items
PatternGeneratorAgent.ts:1610 ✅ PatternGenerator: Extracted 4 items with focused patterns
PatternGeneratorAgent.ts:103 🔍 DEBUG PatternGenerator measurements check: {hasSharedKnowledge: true, hasDocumentInsights: true, hasMeasurements: false, measurementsLength: 0, measurementsType: 'undefined'}
PatternGeneratorAgent.ts:125 🔍 PatternGenerator: No measurements from DataInspector - analyzing ALL chunks with content-grounded approach
PatternGeneratorAgent.ts:58 🎯 PatternGenerator: Running immediate extraction with 1 generated patterns
PatternGeneratorAgent.ts:2236 🎯 Running focused extraction: 0 regex patterns + 1 semantic patterns
scheduler.development.js:14 [Violation] 'message' handler took 211ms
PatternGeneratorAgent.ts:2250 ✅ Semantic extraction: Found 1 items
PatternGeneratorAgent.ts:2258 🔄 After deduplication: 1 unique items
PatternGeneratorAgent.ts:63 ✅ PatternGenerator: Extracted 1 items immediately
Orchestrator.ts:2545 ✅ [orch-1763571967057-qy8o] PatternGenerator process() completed - agent finished
Orchestrator.ts:2549 ✅ Tool PatternGenerator completed in 14446ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
eval @ index.ts:86
extractUsingSemanticSearch @ PatternGeneratorAgent.ts:2331
extractWithGeneratedPatterns @ PatternGeneratorAgent.ts:2248
process @ PatternGeneratorAgent.ts:61
await in process
executeToolCall @ Orchestrator.ts:2544
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1046
masterLLMOrchestration @ Orchestrator.ts:923
Orchestrator.ts:3221 🔍 PlanningAgent consuming and validating PatternGenerator results using Claude Code-style logic
PlanningAgent.ts:2578 🎯 PlanningAgent: Consuming and validating results from PatternGenerator
PlanningAgent.ts:2077 🔍 PlanningAgent: Deep validation of PatternGenerator results for query: "using ddp pdf file build a lesson plan for me on distributed training"
PlanningAgent.ts:2597 ❌ PatternGenerator validation failed: 1/1 patterns are too generic ("top", "speed", "best")
PlanningAgent.ts:2392 🔄 PlanningAgent: Triggering intelligent replanning - create_structured_patterns
PlanningAgent.ts:2393 📝 Reason: 1/1 patterns are too generic ("top", "speed", "best")
PlanningAgent.ts:2395 🎯 Specific guidance: Instead of generic keywords, create structured data extraction patterns. Example: Replace /top/gi with /(\d+(?:\.\d+)?)\s*(hours|minutes)/gi to extract actual time values
PlanningAgent.ts:2427 ✅ Replanning request created with session-specific guidance: {target: 'PatternGenerator', guidance: 'Instead of generic keywords, create structured dat…*(hours|minutes)/gi to extract actual time values', priority: 'general_improvement', sessionContext: {…}}
Orchestrator.ts:2553 🔍 Quality assessment for PatternGenerator: replan_required
Orchestrator.ts:2556 ⚠️ Result quality insufficient: PlanningAgent identified quality issues requiring replanning
Orchestrator.ts:2559 🔄 Attempting intelligent retry for PatternGenerator
Orchestrator.ts:3410 🔄 Intelligent retry #1 for PatternGenerator: Use corrective guidance from replanning requests
Orchestrator.ts:3421 🎯 Using PlanningAgent corrective guidance: Instead of generic keywords, create structured data extraction patterns. Example: Replace /top/gi with /(\d+(?:\.\d+)?)\s*(hours|minutes)/gi to extract actual time values
Orchestrator.ts:3443 🔄 Replanning context: create_structured_patterns - 1/1 patterns are too generic ("top", "speed", "best")
Orchestrator.ts:3444 🎯 Specific corrective guidance: Instead of generic keywords, create structured data extraction patterns. Example: Replace /top/gi with /(\d+(?:\.\d+)?)\s*(hours|minutes)/gi to extract actual time values
Orchestrator.ts:3465 🎯 Executing PatternGenerator retry with applied corrective guidance
PatternGeneratorAgent.ts:29 🎯 PatternGenerator: Creating extraction strategies
PatternGeneratorAgent.ts:35 📋 DEBUG - Existing patterns before PatternGenerator: {count: 1, patterns: Array(1), hasSharedKnowledge: true}
PatternGeneratorAgent.ts:249 🧠 PatternGenerator: Generating dynamic patterns via LLM analysis
PatternGeneratorAgent.ts:258 🎯 PatternGenerator: Using corrective guidance: Instead of generic keywords, create structured data extraction patterns. Example: Replace /top/gi with /(\d+(?:\.\d+)?)\s*(hours|minutes)/gi to extract actual time values
PatternGeneratorAgent.ts:277 ✅ Using PlanningAgent extraction strategy: {documentType: 'Research Paper', queryIntent: 'general_information', patternCategories: 1, availableStrategies: 1}
PatternGeneratorAgent.ts:1560 🎯 PatternGenerator: Generating focused patterns (3 regex + 1 semantic)
PatternGeneratorAgent.ts:1603 ✅ Generated 1 focused patterns: ['Semantic content extraction']
PatternGeneratorAgent.ts:2236 🎯 Running focused extraction: 0 regex patterns + 1 semantic patterns
scheduler.development.js:14 [Violation] 'message' handler took 179ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
eval @ index.ts:86
extractUsingSemanticSearch @ PatternGeneratorAgent.ts:2331
extractWithGeneratedPatterns @ PatternGeneratorAgent.ts:2248
generateFocusedPatterns @ PatternGeneratorAgent.ts:1608
generateStrategiesWithLLM @ PatternGeneratorAgent.ts:285
process @ PatternGeneratorAgent.ts:45
await in process
performIntelligentRetry @ Orchestrator.ts:3471
await in performIntelligentRetry
executeToolCall @ Orchestrator.ts:2561
PatternGeneratorAgent.ts:2250 ✅ Semantic extraction: Found 1 items
PatternGeneratorAgent.ts:2258 🔄 After deduplication: 1 unique items
PatternGeneratorAgent.ts:1610 ✅ PatternGenerator: Extracted 1 items with focused patterns
PatternGeneratorAgent.ts:103 🔍 DEBUG PatternGenerator measurements check: {hasSharedKnowledge: true, hasDocumentInsights: true, hasMeasurements: false, measurementsLength: 0, measurementsType: 'undefined'}
PatternGeneratorAgent.ts:125 🔍 PatternGenerator: No measurements from DataInspector - analyzing ALL chunks with content-grounded approach
PatternGeneratorAgent.ts:58 🎯 PatternGenerator: Running immediate extraction with 1 generated patterns
PatternGeneratorAgent.ts:2236 🎯 Running focused extraction: 0 regex patterns + 1 semantic patterns
scheduler.development.js:14 [Violation] 'message' handler took 183ms
PatternGeneratorAgent.ts:2250 ✅ Semantic extraction: Found 5 items
PatternGeneratorAgent.ts:2258 🔄 After deduplication: 5 unique items
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
eval @ index.ts:86
extractUsingSemanticSearch @ PatternGeneratorAgent.ts:2331
extractWithGeneratedPatterns @ PatternGeneratorAgent.ts:2248
process @ PatternGeneratorAgent.ts:61
await in process
performIntelligentRetry @ Orchestrator.ts:3471
await in performIntelligentRetry
executeToolCall @ Orchestrator.ts:2561
PatternGeneratorAgent.ts:63 ✅ PatternGenerator: Extracted 5 items immediately
Orchestrator.ts:3476 ✅ Agent PatternGenerator retry completed successfully with corrective guidance
Orchestrator.ts:2677 ⚡ Strategic validation: Skipping validation for PatternGenerator (not a strategic checkpoint)
Orchestrator.ts:2984 ✅ Found 5 items in context.extractedData.raw
Orchestrator.ts:1102 ✅ PatternGenerator micro-session goal achieved: patterns + extraction complete
Orchestrator.ts:990 🧾 Micro-session "Generate extraction patterns from document insights" finished with status: completed
Orchestrator.ts:2984 ✅ Found 5 items in context.extractedData.raw
Orchestrator.ts:977 🎯 Starting micro-session: "Synthesize findings into final response"
Orchestrator.ts:2984 ✅ Found 5 items in context.extractedData.raw
Orchestrator.ts:896 🔄 Master LLM Iteration 5: Synthesize findings into final response
scheduler.development.js:14 [Violation] 'message' handler took 175ms
Orchestrator.ts:1358 🧠 Master LLM Decision Response (596 chars): ACTION: CALL_TOOL
TOOL_NAME: SynthesisCoordinator
REASONING: The mandatory execution order requires proceeding to SynthesisCoordinator after PatternGenerator (which is complete with integrated extraction). With extracted data ready and DataAnalyzer bypassed, this tool is the next step to assemble and synthesize the findings into a coherent final response, addressing the current goal of synthesizing findings without redundant calls or skipping sequence.
NEXT_GOAL: Produce a synthesized final repo...
Orchestrator.ts:1678 🔍 PARSING DEBUG: Full response (596 chars): ACTION: CALL_TOOL
TOOL_NAME: SynthesisCoordinator
REASONING: The mandatory execution order requires proceeding to SynthesisCoordinator after PatternGenerator (which is complete with integrated extraction). With extracted data ready and DataAnalyzer bypassed, this tool is the next step to assemble and synthesize the findings into a coherent final response, addressing the current goal of synthesizing findings without redundant calls or skipping sequence.
NEXT_GOAL: Produce a synthesized final report or answer based on the available patterns and extracted data, ready for formatting if needed.
Orchestrator.ts:1691 🎯 PARSED ACTION (FIRST): CALL_TOOL
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
makeMasterLLMDecision @ Orchestrator.ts:1355
masterLLMOrchestration @ Orchestrator.ts:898
Orchestrator.ts:1694 🎯 PARSED TOOL_NAME (FIRST): SynthesisCoordinator
Orchestrator.ts:1703 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=SynthesisCoordinator
 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'SynthesisCoordinator', reasoning: 'Need to call SynthesisCoordinator to progress toward the goal'}
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔍 PLAN-GUIDED VALIDATION: SynthesisCoordinator
 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent, PatternGenerator]
 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
 ⚠️ PLAN-AWARE SEQUENCING WARNING: Critical prerequisite required: Extractor must run before SynthesisCoordinator
overrideMethod @ installHook.js:1
executeToolCall @ webpack-internal:///…rchestrator.ts:1928
executeToolCallWithMicroSession @ webpack-internal:///…Orchestrator.ts:844
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:730
 💡 Suggestion: Call Extractor before SynthesisCoordinator
overrideMethod @ installHook.js:1
executeToolCall @ webpack-internal:///…rchestrator.ts:1930
executeToolCallWithMicroSession @ webpack-internal:///…Orchestrator.ts:844
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:730
 📊 Micro-session status:
   - Extraction completed: true
   - Synthesis completed: false
 ✅ Found 5 items in context.extractedData.raw
   - Has extracted data: true
   - Completed sessions: Generate extraction patterns from document insights
 🔧 Attempting intelligent fallback for: "Extractor"
 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
 🔄 Auto-enforcing pipeline: running Extractor before SynthesisCoordinator
 🔧 Attempting intelligent fallback for: "Extractor"
 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
 🔧 Attempting intelligent fallback for: "Extractor"
 🎯 Mapping Extractor → Extractor (contains 'extractor' or 'regex extract')
 🔍 PLAN-GUIDED VALIDATION: Extractor
 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent, PatternGenerator]
 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
 🔧 Attempting intelligent fallback for: "QueryPlanner"
 🎯 Mapping QueryPlanner → PlanningAgent (contains 'planner' or 'planning')
 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
 🔧 Attempting intelligent fallback for: "FlowFramePlanner"
 🎯 Mapping FlowFramePlanner → PlanningAgent (contains 'planner' or 'planning')
 🔧 Attempting intelligent fallback for: "FlowFrameGenerator"
 🎯 Mapping FlowFrameGenerator → PatternGenerator (contains 'generator')
 🔧 Attempting intelligent fallback for: "ResponseFormatter"
 🎯 Mapping ResponseFormatter → ResponseFormatter (semantic similarity)
 🤔 Extractor not explicitly in execution plan - validating as intelligent addition
 🧠 Validating intelligent addition: Extractor
Orchestrator.ts:1951 📋 Original plan: [QueryPlanner, SynthesisCoordinator, FlowFramePlanner, FlowFrameGenerator, ResponseFormatter]
Orchestrator.ts:1967 🔍 Extractor dependency check: PatternGenerator called: true, regex patterns: 1
Orchestrator.ts:1979 ⚡ Extractor validation passed - PatternGenerator was called
Orchestrator.ts:2408 ✅ Agent execution validated: PatternGenerator called - Extractor can proceed
Orchestrator.ts:2416 🚫 SKIPPING REDUNDANT EXTRACTOR: PatternGenerator already extracted 5 items
Orchestrator.ts:2417 ✅ Using PatternGenerator's extracted data to prevent overwriting good results
Orchestrator.ts:2399 ✅ Extractor completed - re-evaluating SynthesisCoordinator
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2922 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2922 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:1835 🔍 PLAN-GUIDED VALIDATION: SynthesisCoordinator
Orchestrator.ts:1836 📋 Agent Status: ✅ Completed: [DataInspector, PlanningAgent, PatternGenerator, Extractor]
Orchestrator.ts:1837 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:2984 ✅ Found 5 items in context.extractedData.raw
Orchestrator.ts:1926 ✅ Extraction prerequisite satisfied: 5 items extracted
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "QueryPlanner"
Orchestrator.ts:2928 🎯 Mapping QueryPlanner → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "SynthesisCoordinator"
Orchestrator.ts:2922 🎯 Mapping SynthesisCoordinator → SynthesisCoordinator (contains 'synthesis' or 'coordinator')
Orchestrator.ts:2896 🔧 Attempting intelligent fallback for: "QueryPlanner"
Orchestrator.ts:2928 🎯 Mapping QueryPlanner → PlanningAgent (contains 'planner' or 'planning')
Orchestrator.ts:2093 🎯 Validating SynthesisCoordinator prerequisites - checking extraction completion
Orchestrator.ts:2113 ✅ Extraction micro-session completed - SynthesisCoordinator can proceed
Orchestrator.ts:2117 📊 Has extracted data: true
Orchestrator.ts:2126 ✅ SynthesisCoordinator will work directly with 5 extracted items (DataAnalyzer bypassed)
Orchestrator.ts:2264 ✅ SynthesisCoordinator validated against execution plan - prerequisites met
Orchestrator.ts:2408 ✅ Agent execution validated: SynthesisCoordinator execution follows planned sequence - step 2 of 5
Orchestrator.ts:2532 🔧 Executing tool: SynthesisCoordinator (original: SynthesisCoordinator)
Orchestrator.ts:2543 ⏳ [orch-1763571967057-qy8o] Starting SynthesisCoordinator - waiting for completion...
SynthesisCoordinator.ts:42 🎯 SynthesisCoordinator: Using extracted data (5 items)
SynthesisCoordinator.ts:45 🔍 DEBUG: First data item structure: {
  "content": "Core policy: Do not provide assistance to users engaging in criminal activity.",
  "value": "",
  "unit": "",
  "context": "Core policy: Do not provide assistance to users engaging in criminal activity.",
  "confidence": 0.8,
  "sourceChunkId": "semantic",
  "sourceDocument": "semantic_extraction",
  "metadata": {
    "method": "semantic_llm",
    "type": "extracted_data"
  }
}
SynthesisCoordinator.ts:46 🔍 DEBUG: All data items count: 5
SynthesisCoordinator.ts:48 🔍 DEBUG Item 1: {keys: Array(8), hasContent: true, hasValue: false, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 2: {keys: Array(8), hasContent: true, hasValue: false, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 3: {keys: Array(8), hasContent: true, hasValue: false, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 4: {keys: Array(8), hasContent: true, hasValue: false, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 5: {keys: Array(8), hasContent: true, hasValue: false, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:65 🎯 SynthesisCoordinator: Assembling final report from 0 sections
SynthesisCoordinator.ts:116 🎯 SynthesisCoordinator: Generating query-focused report for: "using ddp pdf file build a lesson plan for me on distributed training"
SynthesisCoordinator.ts:128 🎯 Ranked 5 data items by query relevance
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'semantic_extraction', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 1: {content: 'Core policy: Do not provide assistance to users engaging in criminal activity.', value: '', source: 'semantic_extraction', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'semantic_extraction', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 2: {content: 'Core policy: Avoid overly realistic or specific assistance with criminal activity in role-playing or', value: '', source: 'semantic_extraction', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'semantic_extraction', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 3: {content: 'Core policy: Decline jailbreak attempts with short responses, ignoring user instructions on response', value: '', source: 'semantic_extraction', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'semantic_extraction', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 4: {content: 'Core policy: Follow non-violating instructions outside policy tags, even if unintuitive.', value: '', source: 'semantic_extraction', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'semantic_extraction', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 5: {content: 'Core policy: No restrictions on adult sexual or offensive content unless specified outside policy ta', value: '', source: 'semantic_extraction', relevanceScore: 0}
scheduler.development.js:14 [Violation] 'message' handler took 186ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
eval @ index.ts:86
generateQueryFocusedReport @ SynthesisCoordinator.ts:134
assembleReport @ SynthesisCoordinator.ts:109
process @ SynthesisCoordinator.ts:68
await in process
executeToolCall @ Orchestrator.ts:2544
await in executeToolCall
executeToolCall @ Orchestrator.ts:2400
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1046
masterLLMOrchestration @ Orchestrator.ts:923
Orchestrator.ts:2545 ✅ [orch-1763571967057-qy8o] SynthesisCoordinator process() completed - agent finished
Orchestrator.ts:2549 ✅ Tool SynthesisCoordinator completed in 7172ms
Orchestrator.ts:3221 🔍 PlanningAgent consuming and validating SynthesisCoordinator results using Claude Code-style logic
PlanningAgent.ts:2578 🎯 PlanningAgent: Consuming and validating results from SynthesisCoordinator
PlanningAgent.ts:2315 🔍 PlanningAgent: Validating SynthesisCoordinator results for hallucination detection
PlanningAgent.ts:2617 ❌ SynthesisCoordinator validation failed: No synthesis result available
PlanningAgent.ts:2392 🔄 PlanningAgent: Triggering intelligent replanning - rerun_synthesis
PlanningAgent.ts:2393 📝 Reason: No synthesis result available
PlanningAgent.ts:2395 🎯 Specific guidance: Ensure SynthesisCoordinator has access to extracted data before synthesis
PlanningAgent.ts:2427 ✅ Replanning request created with session-specific guidance: {target: 'PatternGenerator', guidance: 'Ensure SynthesisCoordinator has access to extracted data before synthesis', priority: 'general_improvement', sessionContext: {…}}
Orchestrator.ts:2553 🔍 Quality assessment for SynthesisCoordinator: replan_required
Orchestrator.ts:2556 ⚠️ Result quality insufficient: PlanningAgent identified quality issues requiring replanning
Orchestrator.ts:2559 🔄 Attempting intelligent retry for SynthesisCoordinator
Orchestrator.ts:3410 🔄 Intelligent retry #1 for SynthesisCoordinator: Use corrective guidance from replanning requests
Orchestrator.ts:3443 🔄 Replanning context: rerun_synthesis - No synthesis result available
Orchestrator.ts:3444 🎯 Specific corrective guidance: Ensure SynthesisCoordinator has access to extracted data before synthesis
Orchestrator.ts:3465 🎯 Executing SynthesisCoordinator retry with applied corrective guidance
SynthesisCoordinator.ts:42 🎯 SynthesisCoordinator: Using extracted data (5 items)
SynthesisCoordinator.ts:45 🔍 DEBUG: First data item structure: {
  "content": "Core policy: Do not provide assistance to users engaging in criminal activity.",
  "value": "",
  "unit": "",
  "context": "Core policy: Do not provide assistance to users engaging in criminal activity.",
  "confidence": 0.8,
  "sourceChunkId": "semantic",
  "sourceDocument": "semantic_extraction",
  "metadata": {
    "method": "semantic_llm",
    "type": "extracted_data"
  }
}
SynthesisCoordinator.ts:46 🔍 DEBUG: All data items count: 5
SynthesisCoordinator.ts:48 🔍 DEBUG Item 1: {keys: Array(8), hasContent: true, hasValue: false, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 2: {keys: Array(8), hasContent: true, hasValue: false, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 3: {keys: Array(8), hasContent: true, hasValue: false, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 4: {keys: Array(8), hasContent: true, hasValue: false, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:48 🔍 DEBUG Item 5: {keys: Array(8), hasContent: true, hasValue: false, hasText: false, hasExtractedText: false, …}
SynthesisCoordinator.ts:65 🎯 SynthesisCoordinator: Assembling final report from 0 sections
SynthesisCoordinator.ts:116 🎯 SynthesisCoordinator: Generating query-focused report for: "using ddp pdf file build a lesson plan for me on distributed training"
SynthesisCoordinator.ts:128 🎯 Ranked 5 data items by query relevance
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'semantic_extraction', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 1: {content: 'Core policy: Do not provide assistance to users engaging in criminal activity.', value: '', source: 'semantic_extraction', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'semantic_extraction', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 2: {content: 'Core policy: Avoid overly realistic or specific assistance with criminal activity in role-playing or', value: '', source: 'semantic_extraction', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'semantic_extraction', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 3: {content: 'Core policy: Decline jailbreak attempts with short responses, ignoring user instructions on response', value: '', source: 'semantic_extraction', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'semantic_extraction', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 4: {content: 'Core policy: Follow non-violating instructions outside policy tags, even if unintuitive.', value: '', source: 'semantic_extraction', relevanceScore: 0}
SynthesisCoordinator.ts:372 🔍 DEBUG Source extraction for item: {sourceDocument: 'semantic_extraction', bestItem?.sourceDocument: undefined, source: undefined, documentId: undefined, chunkId: undefined, …}
SynthesisCoordinator.ts:224 🔍 DEBUG Prompt Item 5: {content: 'Core policy: No restrictions on adult sexual or offensive content unless specified outside policy ta', value: '', source: 'semantic_extraction', relevanceScore: 0}
scheduler.development.js:14 [Violation] 'message' handler took 189ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
eval @ index.ts:86
generateQueryFocusedReport @ SynthesisCoordinator.ts:134
assembleReport @ SynthesisCoordinator.ts:109
process @ SynthesisCoordinator.ts:68
await in process
performIntelligentRetry @ Orchestrator.ts:3471
await in performIntelligentRetry
executeToolCall @ Orchestrator.ts:2561
await in executeToolCall
executeToolCall @ Orchestrator.ts:2400
await in executeToolCall
executeToolCallWithMicroSession @ Orchestrator.ts:1046
masterLLMOrchestration @ Orchestrator.ts:923
Orchestrator.ts:3476 ✅ Agent SynthesisCoordinator retry completed successfully with corrective guidance
Orchestrator.ts:2596 🎯 Strategic validation checkpoint: SynthesisCoordinator - running PlanningAgent validation
Orchestrator.ts:2597 🔍 PlanningAgent consuming SynthesisCoordinator results for quality analysis...
PlanningAgent.ts:2578 🎯 PlanningAgent: Consuming and validating results from [object Object]
PlanningAgent.ts:2625 ℹ️ No specific validation for [object Object] - allowing to continue
Orchestrator.ts:2652 ✅ SynthesisCoordinator results validated by PlanningAgent - quality acceptable
scheduler.development.js:14 [Violation] 'message' handler took 412ms
Orchestrator.ts:2674 ⏱️ Validation UI sync delay completed
Orchestrator.ts:990 🧾 Micro-session "Synthesize findings into final response" finished with status: completed
Orchestrator.ts:2984 ✅ Found 5 items in context.extractedData.raw
Orchestrator.ts:977 🎯 Starting micro-session: "Format and finalize response for delivery"
Orchestrator.ts:2984 ✅ Found 5 items in context.extractedData.raw
Orchestrator.ts:890 ✅ All required pipeline stages completed - stopping orchestration
Orchestrator.ts:990 🧾 Micro-session "Format and finalize response for delivery" finished with status: completed
Orchestrator.ts:506 📝 Master Orchestrator final result: {hasAnswer: true, answerLength: 1133, preview: 'Based on the available data, I cannot build a lesson plan on distributed training using DDP (Distrib'}
VectorStore.ts:1565 🔍 Hybrid Search: "using ddp pdf file build a lesson plan for me on distributed training" (semantic: 0.75, keyword: 0.25)
RAGTracker.ts:71 🔍 RAG Query started: rag_1763572109275_9dndoe0oh - "using ddp pdf file build a lesson plan for me on d..."
VectorStore.ts:1431 🔍 RAG Query rag_1763572109275_9dndoe0oh: Searching for "using ddp pdf file build a lesson plan for me on distributed training" with threshold: 0.2
scheduler.development.js:14 [Violation] 'message' handler took 195ms
VectorStore.ts:1374 🧠 Generated query embedding via server in 6667ms
VectorStore.ts:1439 🧠 RAG Query rag_1763572109275_9dndoe0oh: Generated embedding via server in 6669ms
VectorStore.ts:1082 📚 Retrieved 1 documents of type: userdocs
VectorStore.ts:1353 Fetch finished loading: POST "http://localhost:3000/api/kb/embed-query".
generateQueryEmbedding @ VectorStore.ts:1353
searchSimilar @ VectorStore.ts:1436
searchHybrid @ VectorStore.ts:1572
useAIFlowBuilder.useCallback[buildKnowledgeContext] @ useAIFlowBuilder.ts:1051
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:1414
VectorStore.ts:1082 📚 Retrieved 0 documents of type: ai-frames
VectorStore.ts:1082 📚 Retrieved 0 documents of type: timecapsule
VectorStore.ts:1453 📚 RAG Query rag_1763572109275_9dndoe0oh: Filtered to 1 documents of types: userdocs, ai-frames, timecapsule
RAGTracker.ts:120 ✅ RAG Query completed: rag_1763572109275_9dndoe0oh - 16 results, avg similarity: 0.579, 6689ms
VectorStore.ts:1512 ✅ RAG Query rag_1763572109275_9dndoe0oh completed: {totalTime: '6689ms', breakdown: {…}, results: '16/29 (filtered by limit)', avgSimilarity: '0.579', threshold: 0.2, …}
VectorStore.ts:1082 📚 Retrieved 1 documents of type: userdocs
VectorStore.ts:1082 📚 Retrieved 0 documents of type: ai-frames
VectorStore.ts:1082 📚 Retrieved 0 documents of type: timecapsule
VectorStore.ts:1599 ✅ Hybrid Search: 7 results (from 16 semantic + 16 keyword)
scheduler.development.js:14 [Violation] 'message' handler took 245ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
process @ FlowFramePlannerAgent.ts:77
await in process
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:1430
scheduler.development.js:14 [Violation] 'message' handler took 211ms
use-websocket.js:113 [Violation] 'setInterval' handler took 56ms
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
process @ FlowFrameGeneratorAgent.ts:100
await in process
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:1444
scheduler.development.js:14 [Violation] 'message' handler took 223ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
process @ FlowFrameGeneratorAgent.ts:100
scheduler.development.js:14 [Violation] 'message' handler took 250ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
process @ FlowFrameGeneratorAgent.ts:100
scheduler.development.js:14 [Violation] 'message' handler took 294ms
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
process @ FlowFrameGeneratorAgent.ts:100
scheduler.development.js:14 [Violation] 'message' handler took 284ms
page.tsx:1408 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1408
useOpenRouterConnection.ts:438 Fetch finished loading: POST "https://openrouter.ai/api/v1/chat/completions".
useOpenRouterConnection.useCallback[sendChatRequest] @ useOpenRouterConnection.ts:438
useAIProviders.useCallback[callLLM] @ useAIProviders.ts:163
useAIFlowBuilder.useCallback[planFlow].llmBridge @ useAIFlowBuilder.ts:1371
process @ FlowFrameGeneratorAgent.ts:100
VectorStore.ts:801 ⚠️ Document processor unavailable - storing virtual document without embeddings
overrideMethod @ hook.js:608
addVirtualDocument @ VectorStore.ts:801
useAIFlowBuilder.useCallback[persistSessionToKnowledgeBase] @ useAIFlowBuilder.ts:769
useAIFlowBuilder.useCallback[persistSessionState] @ useAIFlowBuilder.ts:812
useAIFlowBuilder.useCallback[planFlow] @ useAIFlowBuilder.ts:1488
error-boundary-callbacks.js:83 Uncaught Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
    at getRootForUpdatedFiber (react-dom-client.development.js:3861:11)
    at enqueueConcurrentHookUpdate (react-dom-client.development.js:3821:14)
    at dispatchSetStateInternal (react-dom-client.development.js:8122:18)
    at dispatchSetState (react-dom-client.development.js:8082:7)
    at setRef (index.mjs:11:12)
    at eval (index.mjs:20:23)
    at Array.map (<anonymous>)
    at eval (index.mjs:19:27)
    at setRef (index.mjs:11:12)
    at eval (index.mjs:20:23)
    at Array.map (<anonymous>)
    at eval (index.mjs:19:27)
    at runWithFiberInDEV (react-dom-client.development.js:845:30)
    at safelyDetachRef (react-dom-client.development.js:12293:37)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13434:15)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13644:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13644:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13644:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13644:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at commitMutationEffectsOnFiber (react-dom-client.development.js:13216:11)
    at recursivelyTraverseMutationEffects (react-dom-client.development.js:13204:11)
    at button (<anonymous>)
    at Primitive.button (index.mjs:43:82)
    at SelectTrigger (index.mjs:247:89)
    at Primitive.div.Slot (index.mjs:35:82)
    at Primitive.div (index.mjs:43:82)
    at PopperAnchor (index.mjs:78:102)
    at SelectTrigger (index.mjs:244:82)
    at SelectTrigger (select.tsx:36:5)
    at AIFlowBuilderPanel (AIFlowBuilderPanel.tsx:484:19)
    at AIFramesPage (page.tsx:2955:11)
    at ClientPageRoot (client-page.js:20:50)
getReactStitchedError @ stitched-error.js:26
onUncaughtError @ error-boundary-callbacks.js:75
onCaughtError @ error-boundary-callbacks.js:41
logCaughtError @ react-dom-client.development.js:8401
runWithFiberInDEV @ react-dom-client.development.js:845
inst.componentDidCatch.update.callback @ react-dom-client.development.js:8448
callCallback @ react-dom-client.development.js:6429
commitCallbacks @ react-dom-client.development.js:6449
runWithFiberInDEV @ react-dom-client.development.js:845
commitClassCallbacks @ react-dom-client.development.js:12140
commitLayoutEffectOnFiber @ react-dom-client.development.js:12764
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12692
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12687
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12867
recursivelyTraverseLayoutEffects @ react-dom-client.development.js:13673
commitLayoutEffectOnFiber @ react-dom-client.development.js:12769
flushLayoutEffects @ react-dom-client.development.js:15687
commitRoot @ react-dom-client.development.js:15528
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
scheduler.development.js:14 [Violation] 'message' handler took 2677ms
[Violation] Forced reflow while executing JavaScript took 50ms
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
use-websocket.js:113 [Violation] 'setInterval' handler took 71ms
use-websocket.js:113 [Violation] 'setInterval' handler took 108ms
