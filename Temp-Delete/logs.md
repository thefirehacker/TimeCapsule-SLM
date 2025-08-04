useOllamaConnection.ts:94 🔍 Testing Ollama connection at: http://localhost:11434
useOllamaConnection.ts:136 ✅ Ollama connection test passed, models: (4) ['tinyllama:1.1b', 'qwen3:0.6b', 'llama3.2:1b', 'llama3.1:8b']
useOllamaConnection.ts:109 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ useOllamaConnection.ts:109
handleTest @ OllamaConnectionModal.tsx:112
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
<button>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
Button @ button.tsx:51
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
<Button>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
OllamaConnectionModal @ OllamaConnectionModal.tsx:346
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
useOllamaConnection.ts:176 🔌 Starting Ollama connection process... {baseURL: 'http://localhost:11434', model: 'qwen3:0.6b'}
useOllamaConnection.ts:94 🔍 Testing Ollama connection at: http://localhost:11434
useOllamaConnection.ts:109 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ useOllamaConnection.ts:109
useOllamaConnection.useCallback[connect] @ useOllamaConnection.ts:192
handleOllamaConnect @ DeepResearchApp.tsx:200
handleConnect @ OllamaConnectionModal.tsx:152
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
useOllamaConnection.ts:136 ✅ Ollama connection test passed, models: (4) ['tinyllama:1.1b', 'qwen3:0.6b', 'llama3.2:1b', 'llama3.1:8b']
useOllamaConnection.ts:211 🤖 Creating Ollama client... {baseURL: 'http://localhost:11434', selectedModel: 'qwen3:0.6b'}
useOllamaConnection.ts:235 ✅ Ollama client created successfully
useOllamaConnection.ts:239 🧪 Testing content generation...
useOllamaConnection.ts:247 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[connect] @ useOllamaConnection.ts:247
await in useOllamaConnection.useCallback[connect]
handleOllamaConnect @ DeepResearchApp.tsx:200
handleConnect @ OllamaConnectionModal.tsx:152
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
useOllamaConnection.ts:258 ✅ Test generation successful: <think>
Okay, the user wants me to say "Connection test successful" to confirm. Let me
useOllamaConnection.ts:285 ✅ Successfully connected to Ollama with model: qwen3:0.6b
prompt-input.tsx:481 🔍 Submit context check: {enableRAG: true, webSearchEnabled: false, webSearchConfigured: false, hasRAGSearch: true, hasWebSearch: true}
prompt-input.tsx:491 🔍 Performing RAG search...
RAGTracker.ts:71 🔍 RAG Query started: rag_1754309839132_h4a2ffmgj - "tell me the best project from Rutwik's CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754309839132_h4a2ffmgj: Searching for "tell me the best project from Rutwik's CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (41 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 118ms
VectorStore.ts:751 🧠 RAG Query rag_1754309839132_h4a2ffmgj: Generated embedding in 119ms
VectorStore.ts:758 📚 RAG Query rag_1754309839132_h4a2ffmgj: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754309839132_h4a2ffmgj - 2 results, avg similarity: 0.313, 120ms
VectorStore.ts:811 ✅ RAG Query rag_1754309839132_h4a2ffmgj completed: {totalTime: '120ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.313', threshold: 0.1, …}
useResearch.ts:325 🔍 RAG Search completed: 1 documents found
prompt-input.tsx:514 🔍 Web search skipped: {webSearchEnabled: false, hasWebSearch: true, configured: false}
useResearch.ts:938 🔬 Starting intelligent research for: "tell me the best project from Rutwik's CV"
ResearchOrchestrator.ts:104 🔬 Starting research for: "tell me the best project from Rutwik's CV"
useResearch.ts:942 📋 Step update: analysis - in_progress - ID: analysis_1754309839298_1_5a575872
useResearch.ts:964 📋 Adding new step: analysis_1754309839298_1_5a575872
QueryIntelligenceService.ts:71 🧠 Analyzing query: "tell me the best project from Rutwik's CV"
QueryIntelligenceService.ts:75 📋 Rule-based analysis: unknown (0.3)
QueryIntelligenceService.ts:82 🤖 Low confidence (0.3), trying LLM analysis...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 267}
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754309792794&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211~104948813~105087538~105087540~105103161~105103163~105113532&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=6&sid=1754305220&sct=3&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=21701&tfd=60513".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
k.flush @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:916
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
analyzeWithLLM @ QueryIntelligenceService.ts:167
analyzeQuery @ QueryIntelligenceService.ts:84
executeResearch @ ResearchOrchestrator.ts:112
useResearch.useCallback[performIntelligentResearch] @ useResearch.ts:988
handleSubmit @ ResearchOutput.tsx:803
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
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1221}
QueryIntelligenceService.ts:89 🔄 Combined analysis: 6 total queries
QueryIntelligenceService.ts:104 ✅ Query analysis complete: 6 queries in 5364ms
useResearch.ts:942 📋 Step update: analysis - completed - ID: analysis_1754309839298_1_5a575872
useResearch.ts:964 📋 Adding new step: analysis_1754309839298_1_5a575872
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: analysis_1754309839298_1_5a575872
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 237}
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: analysis_1754309839298_1_5a575872
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
planResearchStrategy @ ResearchOrchestrator.ts:263
executeResearch @ ResearchOrchestrator.ts:123
 ✅ Content generated successfully {responseLength: 3478}
 🔍 Parsing LLM response: <think>
Okay, the user wants to research the best project from Rutwik's CV using the available options. Let me start by understanding the problem. They need steps to find comprehensive information, so I should outline a systematic approach.

First, I need to make sure the user knows that they're loo...
 ✅ Parsed 10 steps from natural language
 🤖 LLM planned 10 research steps
 📋 Research plan: 10 steps planned
 📋 Step update: rag_search - in_progress - ID: rag_search_1754309857907_1_4ulky
 📋 Adding new step: rag_search_1754309857907_1_4ulky
 📚 Executing RAG search with 6 queries: (6) ["tell me the best project from Rutwik's CV", 'best project in Rutwik CV', "top project in Rutwik's resume.", "Rutwik's resume: top projects", 'find', 'find best project Rutwik CV']
 🔍 RAG Query started: rag_1754309857908_km3kkws76 - "tell me the best project from Rutwik's CV..."
 🔍 RAG Query rag_1754309857908_km3kkws76: Searching for "tell me the best project from Rutwik's CV" with threshold: 0.1
 🔍 Generating embedding for text (41 chars)...
 ✅ Generated embedding: 384 dimensions in 74ms
 🧠 RAG Query rag_1754309857908_km3kkws76: Generated embedding in 75ms
 📚 RAG Query rag_1754309857908_km3kkws76: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309857908_km3kkws76 - 2 results, avg similarity: 0.313, 75ms
 ✅ RAG Query rag_1754309857908_km3kkws76 completed: {totalTime: '75ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.313', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309857983_668k67gbl - "best project in Rutwik CV..."
 🔍 RAG Query rag_1754309857983_668k67gbl: Searching for "best project in Rutwik CV" with threshold: 0.1
 🔍 Generating embedding for text (25 chars)...
 ✅ Generated embedding: 384 dimensions in 20ms
 🧠 RAG Query rag_1754309857983_668k67gbl: Generated embedding in 20ms
 📚 RAG Query rag_1754309857983_668k67gbl: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309857983_668k67gbl - 2 results, avg similarity: 0.311, 20ms
 ✅ RAG Query rag_1754309857983_668k67gbl completed: {totalTime: '20ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.311', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858003_htrznrxim - "top project in Rutwik's resume...."
 🔍 RAG Query rag_1754309858003_htrznrxim: Searching for "top project in Rutwik's resume." with threshold: 0.1
 🔍 Generating embedding for text (31 chars)...
 ✅ Generated embedding: 384 dimensions in 21ms
 🧠 RAG Query rag_1754309858003_htrznrxim: Generated embedding in 21ms
 📚 RAG Query rag_1754309858003_htrznrxim: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858003_htrznrxim - 2 results, avg similarity: 0.270, 22ms
 ✅ RAG Query rag_1754309858003_htrznrxim completed: {totalTime: '22ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.270', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858025_u3v981n6z - "Rutwik's resume: top projects..."
 🔍 RAG Query rag_1754309858025_u3v981n6z: Searching for "Rutwik's resume: top projects" with threshold: 0.1
 🔍 Generating embedding for text (29 chars)...
 ✅ Generated embedding: 384 dimensions in 20ms
 🧠 RAG Query rag_1754309858025_u3v981n6z: Generated embedding in 20ms
 📚 RAG Query rag_1754309858025_u3v981n6z: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858025_u3v981n6z - 2 results, avg similarity: 0.261, 20ms
 ✅ RAG Query rag_1754309858025_u3v981n6z completed: {totalTime: '20ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.261', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858046_5xcackt2o - "find..."
 🔍 RAG Query rag_1754309858046_5xcackt2o: Searching for "find" with threshold: 0.1
 🔍 Generating embedding for text (4 chars)...
 ✅ Generated embedding: 384 dimensions in 7ms
 🧠 RAG Query rag_1754309858046_5xcackt2o: Generated embedding in 7ms
 📚 RAG Query rag_1754309858046_5xcackt2o: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858046_5xcackt2o - 2 results, avg similarity: 0.147, 7ms
 ✅ RAG Query rag_1754309858046_5xcackt2o completed: {totalTime: '7ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.147', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858053_zrk4nw3qy - "find best project Rutwik CV..."
 🔍 RAG Query rag_1754309858053_zrk4nw3qy: Searching for "find best project Rutwik CV" with threshold: 0.1
 🔍 Generating embedding for text (27 chars)...
 ✅ Generated embedding: 384 dimensions in 15ms
 🧠 RAG Query rag_1754309858053_zrk4nw3qy: Generated embedding in 15ms
 📚 RAG Query rag_1754309858053_zrk4nw3qy: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858053_zrk4nw3qy - 2 results, avg similarity: 0.278, 15ms
 ✅ RAG Query rag_1754309858053_zrk4nw3qy completed: {totalTime: '15ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.278', threshold: 0.1, …}
 📚 RAG search found 2 unique results from 6 queries
 ✅ RAG search found 2 sources
 📋 Step update: rag_search - completed - ID: rag_search_1754309857907_1_4ulky
 📋 Adding new step: rag_search_1754309857907_1_4ulky
 🔄 Adding 0 additional steps: Insufficient sources for comprehensive answer
 📋 Step update: rag_search - in_progress - ID: rag_search_1754309858069_2_ttuk9
 📋 Adding new step: rag_search_1754309858069_2_ttuk9
 📚 Executing RAG search with 6 queries: (6) ["tell me the best project from Rutwik's CV", 'best project in Rutwik CV', "top project in Rutwik's resume.", "Rutwik's resume: top projects", 'find', 'find best project Rutwik CV']
 🔍 RAG Query started: rag_1754309858069_41j1d727h - "tell me the best project from Rutwik's CV..."
 🔍 RAG Query rag_1754309858069_41j1d727h: Searching for "tell me the best project from Rutwik's CV" with threshold: 0.1
 🔍 Generating embedding for text (41 chars)...
 ✅ Generated embedding: 384 dimensions in 20ms
 🧠 RAG Query rag_1754309858069_41j1d727h: Generated embedding in 20ms
 📚 RAG Query rag_1754309858069_41j1d727h: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858069_41j1d727h - 2 results, avg similarity: 0.313, 20ms
 ✅ RAG Query rag_1754309858069_41j1d727h completed: {totalTime: '20ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.313', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858090_uzg23fu5j - "best project in Rutwik CV..."
 🔍 RAG Query rag_1754309858090_uzg23fu5j: Searching for "best project in Rutwik CV" with threshold: 0.1
 🔍 Generating embedding for text (25 chars)...
 ✅ Generated embedding: 384 dimensions in 14ms
 🧠 RAG Query rag_1754309858090_uzg23fu5j: Generated embedding in 14ms
 📚 RAG Query rag_1754309858090_uzg23fu5j: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858090_uzg23fu5j - 2 results, avg similarity: 0.311, 14ms
 ✅ RAG Query rag_1754309858090_uzg23fu5j completed: {totalTime: '14ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.311', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858105_zp9hjxv8g - "top project in Rutwik's resume...."
 🔍 RAG Query rag_1754309858105_zp9hjxv8g: Searching for "top project in Rutwik's resume." with threshold: 0.1
 🔍 Generating embedding for text (31 chars)...
 ✅ Generated embedding: 384 dimensions in 17ms
 🧠 RAG Query rag_1754309858105_zp9hjxv8g: Generated embedding in 18ms
 📚 RAG Query rag_1754309858105_zp9hjxv8g: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858105_zp9hjxv8g - 2 results, avg similarity: 0.270, 18ms
 ✅ RAG Query rag_1754309858105_zp9hjxv8g completed: {totalTime: '18ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.270', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858123_u46kknpm5 - "Rutwik's resume: top projects..."
 🔍 RAG Query rag_1754309858123_u46kknpm5: Searching for "Rutwik's resume: top projects" with threshold: 0.1
 🔍 Generating embedding for text (29 chars)...
 ✅ Generated embedding: 384 dimensions in 16ms
 🧠 RAG Query rag_1754309858123_u46kknpm5: Generated embedding in 17ms
 📚 RAG Query rag_1754309858123_u46kknpm5: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858123_u46kknpm5 - 2 results, avg similarity: 0.261, 17ms
 ✅ RAG Query rag_1754309858123_u46kknpm5 completed: {totalTime: '17ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.261', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858140_apqd47tkx - "find..."
 🔍 RAG Query rag_1754309858140_apqd47tkx: Searching for "find" with threshold: 0.1
 🔍 Generating embedding for text (4 chars)...
 ✅ Generated embedding: 384 dimensions in 7ms
 🧠 RAG Query rag_1754309858140_apqd47tkx: Generated embedding in 7ms
 📚 RAG Query rag_1754309858140_apqd47tkx: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858140_apqd47tkx - 2 results, avg similarity: 0.147, 7ms
 ✅ RAG Query rag_1754309858140_apqd47tkx completed: {totalTime: '7ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.147', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858147_an3aqmoze - "find best project Rutwik CV..."
 🔍 RAG Query rag_1754309858147_an3aqmoze: Searching for "find best project Rutwik CV" with threshold: 0.1
 🔍 Generating embedding for text (27 chars)...
 ✅ Generated embedding: 384 dimensions in 15ms
 🧠 RAG Query rag_1754309858147_an3aqmoze: Generated embedding in 15ms
 📚 RAG Query rag_1754309858147_an3aqmoze: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858147_an3aqmoze - 2 results, avg similarity: 0.278, 15ms
 ✅ RAG Query rag_1754309858147_an3aqmoze completed: {totalTime: '15ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.278', threshold: 0.1, …}
 📚 RAG search found 2 unique results from 6 queries
 ✅ RAG search found 2 sources
 📋 Step update: rag_search - completed - ID: rag_search_1754309858069_2_ttuk9
 📋 Adding new step: rag_search_1754309858069_2_ttuk9
 📋 Step update: rag_search - in_progress - ID: rag_search_1754309858162_3_yzdxa
 📋 Adding new step: rag_search_1754309858162_3_yzdxa
 📚 Executing RAG search with 6 queries: (6) ["tell me the best project from Rutwik's CV", 'best project in Rutwik CV', "top project in Rutwik's resume.", "Rutwik's resume: top projects", 'find', 'find best project Rutwik CV']
 🔍 RAG Query started: rag_1754309858162_hhxok18oq - "tell me the best project from Rutwik's CV..."
 🔍 RAG Query rag_1754309858162_hhxok18oq: Searching for "tell me the best project from Rutwik's CV" with threshold: 0.1
 🔍 Generating embedding for text (41 chars)...
 ✅ Generated embedding: 384 dimensions in 20ms
 🧠 RAG Query rag_1754309858162_hhxok18oq: Generated embedding in 20ms
 📚 RAG Query rag_1754309858162_hhxok18oq: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858162_hhxok18oq - 2 results, avg similarity: 0.313, 20ms
 ✅ RAG Query rag_1754309858162_hhxok18oq completed: {totalTime: '20ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.313', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858183_3w40j1vnj - "best project in Rutwik CV..."
 🔍 RAG Query rag_1754309858183_3w40j1vnj: Searching for "best project in Rutwik CV" with threshold: 0.1
 🔍 Generating embedding for text (25 chars)...
 ✅ Generated embedding: 384 dimensions in 14ms
 🧠 RAG Query rag_1754309858183_3w40j1vnj: Generated embedding in 14ms
 📚 RAG Query rag_1754309858183_3w40j1vnj: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858183_3w40j1vnj - 2 results, avg similarity: 0.311, 14ms
 ✅ RAG Query rag_1754309858183_3w40j1vnj completed: {totalTime: '14ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.311', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858197_v3h343jv5 - "top project in Rutwik's resume...."
 🔍 RAG Query rag_1754309858197_v3h343jv5: Searching for "top project in Rutwik's resume." with threshold: 0.1
 🔍 Generating embedding for text (31 chars)...
 ✅ Generated embedding: 384 dimensions in 18ms
 🧠 RAG Query rag_1754309858197_v3h343jv5: Generated embedding in 18ms
 📚 RAG Query rag_1754309858197_v3h343jv5: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858197_v3h343jv5 - 2 results, avg similarity: 0.270, 18ms
 ✅ RAG Query rag_1754309858197_v3h343jv5 completed: {totalTime: '18ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.270', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858215_674fj152o - "Rutwik's resume: top projects..."
 🔍 RAG Query rag_1754309858215_674fj152o: Searching for "Rutwik's resume: top projects" with threshold: 0.1
 🔍 Generating embedding for text (29 chars)...
 ✅ Generated embedding: 384 dimensions in 16ms
 🧠 RAG Query rag_1754309858215_674fj152o: Generated embedding in 16ms
 📚 RAG Query rag_1754309858215_674fj152o: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858215_674fj152o - 2 results, avg similarity: 0.261, 17ms
 ✅ RAG Query rag_1754309858215_674fj152o completed: {totalTime: '17ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.261', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858232_3mag8b0id - "find..."
 🔍 RAG Query rag_1754309858232_3mag8b0id: Searching for "find" with threshold: 0.1
 🔍 Generating embedding for text (4 chars)...
 ✅ Generated embedding: 384 dimensions in 8ms
 🧠 RAG Query rag_1754309858232_3mag8b0id: Generated embedding in 8ms
 📚 RAG Query rag_1754309858232_3mag8b0id: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858232_3mag8b0id - 2 results, avg similarity: 0.147, 8ms
 ✅ RAG Query rag_1754309858232_3mag8b0id completed: {totalTime: '8ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.147', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858240_ev7bldqoj - "find best project Rutwik CV..."
 🔍 RAG Query rag_1754309858240_ev7bldqoj: Searching for "find best project Rutwik CV" with threshold: 0.1
 🔍 Generating embedding for text (27 chars)...
 ✅ Generated embedding: 384 dimensions in 14ms
 🧠 RAG Query rag_1754309858240_ev7bldqoj: Generated embedding in 14ms
 📚 RAG Query rag_1754309858240_ev7bldqoj: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858240_ev7bldqoj - 2 results, avg similarity: 0.278, 15ms
 ✅ RAG Query rag_1754309858240_ev7bldqoj completed: {totalTime: '15ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.278', threshold: 0.1, …}
 📚 RAG search found 2 unique results from 6 queries
 ✅ RAG search found 2 sources
 📋 Step update: rag_search - completed - ID: rag_search_1754309858162_3_yzdxa
 📋 Adding new step: rag_search_1754309858162_3_yzdxa
 📋 Step update: rag_search - in_progress - ID: rag_search_1754309858255_4_wc2th
 📋 Adding new step: rag_search_1754309858255_4_wc2th
 📚 Executing RAG search with 6 queries: (6) ["tell me the best project from Rutwik's CV", 'best project in Rutwik CV', "top project in Rutwik's resume.", "Rutwik's resume: top projects", 'find', 'find best project Rutwik CV']
RAGTracker.ts:71 🔍 RAG Query started: rag_1754309858255_hv857mwtn - "tell me the best project from Rutwik's CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754309858255_hv857mwtn: Searching for "tell me the best project from Rutwik's CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (41 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 20ms
VectorStore.ts:751 🧠 RAG Query rag_1754309858255_hv857mwtn: Generated embedding in 20ms
VectorStore.ts:758 📚 RAG Query rag_1754309858255_hv857mwtn: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754309858255_hv857mwtn - 2 results, avg similarity: 0.313, 20ms
VectorStore.ts:811 ✅ RAG Query rag_1754309858255_hv857mwtn completed: {totalTime: '20ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.313', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754309858275_hmk84yvvn - "best project in Rutwik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754309858275_hmk84yvvn: Searching for "best project in Rutwik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (25 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 15ms
VectorStore.ts:751 🧠 RAG Query rag_1754309858275_hmk84yvvn: Generated embedding in 15ms
VectorStore.ts:758 📚 RAG Query rag_1754309858275_hmk84yvvn: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754309858275_hmk84yvvn - 2 results, avg similarity: 0.311, 15ms
VectorStore.ts:811 ✅ RAG Query rag_1754309858275_hmk84yvvn completed: {totalTime: '15ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.311', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754309858290_eryv2rzct - "top project in Rutwik's resume...."
VectorStore.ts:743 🔍 RAG Query rag_1754309858290_eryv2rzct: Searching for "top project in Rutwik's resume." with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (31 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 18ms
VectorStore.ts:751 🧠 RAG Query rag_1754309858290_eryv2rzct: Generated embedding in 18ms
VectorStore.ts:758 📚 RAG Query rag_1754309858290_eryv2rzct: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754309858290_eryv2rzct - 2 results, avg similarity: 0.270, 18ms
VectorStore.ts:811 ✅ RAG Query rag_1754309858290_eryv2rzct completed: {totalTime: '18ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.270', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754309858308_i5w7j6zps - "Rutwik's resume: top projects..."
VectorStore.ts:743 🔍 RAG Query rag_1754309858308_i5w7j6zps: Searching for "Rutwik's resume: top projects" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (29 chars)...
 ✅ Generated embedding: 384 dimensions in 21ms
 🧠 RAG Query rag_1754309858308_i5w7j6zps: Generated embedding in 21ms
 📚 RAG Query rag_1754309858308_i5w7j6zps: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858308_i5w7j6zps - 2 results, avg similarity: 0.261, 21ms
 ✅ RAG Query rag_1754309858308_i5w7j6zps completed: {totalTime: '21ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.261', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858331_u8nmrp70e - "find..."
 🔍 RAG Query rag_1754309858331_u8nmrp70e: Searching for "find" with threshold: 0.1
 🔍 Generating embedding for text (4 chars)...
 ✅ Generated embedding: 384 dimensions in 8ms
 🧠 RAG Query rag_1754309858331_u8nmrp70e: Generated embedding in 8ms
 📚 RAG Query rag_1754309858331_u8nmrp70e: Retrieved 1 documents in 1ms
 ✅ RAG Query completed: rag_1754309858331_u8nmrp70e - 2 results, avg similarity: 0.147, 9ms
 ✅ RAG Query rag_1754309858331_u8nmrp70e completed: {totalTime: '9ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.147', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858340_oj6ndbqf6 - "find best project Rutwik CV..."
 🔍 RAG Query rag_1754309858340_oj6ndbqf6: Searching for "find best project Rutwik CV" with threshold: 0.1
 🔍 Generating embedding for text (27 chars)...
 ✅ Generated embedding: 384 dimensions in 15ms
 🧠 RAG Query rag_1754309858340_oj6ndbqf6: Generated embedding in 15ms
 📚 RAG Query rag_1754309858340_oj6ndbqf6: Retrieved 1 documents in 1ms
 ✅ RAG Query completed: rag_1754309858340_oj6ndbqf6 - 2 results, avg similarity: 0.278, 16ms
 ✅ RAG Query rag_1754309858340_oj6ndbqf6 completed: {totalTime: '16ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.278', threshold: 0.1, …}
 📚 RAG search found 2 unique results from 6 queries
 ✅ RAG search found 2 sources
 📋 Step update: rag_search - completed - ID: rag_search_1754309858255_4_wc2th
 📋 Adding new step: rag_search_1754309858255_4_wc2th
 📋 Step update: rag_search - in_progress - ID: rag_search_1754309858356_5_04rbu
 📋 Adding new step: rag_search_1754309858356_5_04rbu
 📚 Executing RAG search with 6 queries: (6) ["tell me the best project from Rutwik's CV", 'best project in Rutwik CV', "top project in Rutwik's resume.", "Rutwik's resume: top projects", 'find', 'find best project Rutwik CV']
 🔍 RAG Query started: rag_1754309858356_11ent8ch7 - "tell me the best project from Rutwik's CV..."
 🔍 RAG Query rag_1754309858356_11ent8ch7: Searching for "tell me the best project from Rutwik's CV" with threshold: 0.1
 🔍 Generating embedding for text (41 chars)...
 ✅ Generated embedding: 384 dimensions in 22ms
 🧠 RAG Query rag_1754309858356_11ent8ch7: Generated embedding in 22ms
 📚 RAG Query rag_1754309858356_11ent8ch7: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858356_11ent8ch7 - 2 results, avg similarity: 0.313, 22ms
 ✅ RAG Query rag_1754309858356_11ent8ch7 completed: {totalTime: '22ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.313', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858378_wskq2fct8 - "best project in Rutwik CV..."
 🔍 RAG Query rag_1754309858378_wskq2fct8: Searching for "best project in Rutwik CV" with threshold: 0.1
 🔍 Generating embedding for text (25 chars)...
 ✅ Generated embedding: 384 dimensions in 16ms
 🧠 RAG Query rag_1754309858378_wskq2fct8: Generated embedding in 16ms
 📚 RAG Query rag_1754309858378_wskq2fct8: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858378_wskq2fct8 - 2 results, avg similarity: 0.311, 17ms
 ✅ RAG Query rag_1754309858378_wskq2fct8 completed: {totalTime: '17ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.311', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858395_ctb51tsz1 - "top project in Rutwik's resume...."
 🔍 RAG Query rag_1754309858395_ctb51tsz1: Searching for "top project in Rutwik's resume." with threshold: 0.1
 🔍 Generating embedding for text (31 chars)...
 ✅ Generated embedding: 384 dimensions in 21ms
 🧠 RAG Query rag_1754309858395_ctb51tsz1: Generated embedding in 21ms
 📚 RAG Query rag_1754309858395_ctb51tsz1: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858395_ctb51tsz1 - 2 results, avg similarity: 0.270, 21ms
 ✅ RAG Query rag_1754309858395_ctb51tsz1 completed: {totalTime: '21ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.270', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858416_42m4g3mjw - "Rutwik's resume: top projects..."
 🔍 RAG Query rag_1754309858416_42m4g3mjw: Searching for "Rutwik's resume: top projects" with threshold: 0.1
 🔍 Generating embedding for text (29 chars)...
 ✅ Generated embedding: 384 dimensions in 34ms
 🧠 RAG Query rag_1754309858416_42m4g3mjw: Generated embedding in 34ms
 📚 RAG Query rag_1754309858416_42m4g3mjw: Retrieved 1 documents in 1ms
 ✅ RAG Query completed: rag_1754309858416_42m4g3mjw - 2 results, avg similarity: 0.261, 35ms
 ✅ RAG Query rag_1754309858416_42m4g3mjw completed: {totalTime: '35ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.261', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858451_u4iqdz0qf - "find..."
 🔍 RAG Query rag_1754309858451_u4iqdz0qf: Searching for "find" with threshold: 0.1
 🔍 Generating embedding for text (4 chars)...
 ✅ Generated embedding: 384 dimensions in 18ms
 🧠 RAG Query rag_1754309858451_u4iqdz0qf: Generated embedding in 18ms
 📚 RAG Query rag_1754309858451_u4iqdz0qf: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858451_u4iqdz0qf - 2 results, avg similarity: 0.147, 18ms
 ✅ RAG Query rag_1754309858451_u4iqdz0qf completed: {totalTime: '18ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.147', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754309858470_czcz2ktte - "find best project Rutwik CV..."
 🔍 RAG Query rag_1754309858470_czcz2ktte: Searching for "find best project Rutwik CV" with threshold: 0.1
 🔍 Generating embedding for text (27 chars)...
 ✅ Generated embedding: 384 dimensions in 28ms
 🧠 RAG Query rag_1754309858470_czcz2ktte: Generated embedding in 28ms
 📚 RAG Query rag_1754309858470_czcz2ktte: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754309858470_czcz2ktte - 2 results, avg similarity: 0.278, 28ms
 ✅ RAG Query rag_1754309858470_czcz2ktte completed: {totalTime: '28ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.278', threshold: 0.1, …}
 📚 RAG search found 2 unique results from 6 queries
ResearchOrchestrator.ts:499 ✅ RAG search found 2 sources
useResearch.ts:942 📋 Step update: rag_search - completed - ID: rag_search_1754309858356_5_04rbu
useResearch.ts:964 📋 Adding new step: rag_search_1754309858356_5_04rbu
ResearchOrchestrator.ts:129 ⚠️ Max steps (6) reached
ResearchOrchestrator.ts:153 📚 Total sources collected: 10
ResearchOrchestrator.ts:154 📊 Source breakdown: {rag: 10, web: 0, totalContentLength: 7990}
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:964 📋 Adding new step: synthesis_1754309858499_2_4d01f058
ResearchOrchestrator.ts:634 🤖 Using multi-agent system for intelligent extraction
AgentRegistry.ts:21 📝 Registered agent: QueryPlanner - Expands queries based on intent and domain understanding
AgentRegistry.ts:21 📝 Registered agent: DataInspector - Analyzes RAG chunks to understand data structure and quality
AgentRegistry.ts:21 📝 Registered agent: PatternGenerator - Creates extraction strategies based on data inspection
AgentRegistry.ts:21 📝 Registered agent: Extractor - Executes extraction using generated patterns
AgentRegistry.ts:21 📝 Registered agent: Synthesizer - Consolidates extracted data into a coherent answer
Orchestrator.ts:50 🎯 Orchestrator starting research for: "tell me the best project from Rutwik's CV"
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 385}
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754309857907_1_4ulky
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754309857907_1_4ulky
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754309858069_2_ttuk9
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754309858069_2_ttuk9
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754309858162_3_yzdxa
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754309858162_3_yzdxa
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754309858255_4_wc2th
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754309858255_4_wc2th
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754309858356_5_04rbu
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754309858356_5_04rbu
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 966}
Orchestrator.ts:96 🤖 Query understanding: <think>
Okay, the user is asking for the best project from Rutwik's CV. Let me break down the query. First, they want to know the specific project they're looking for. The answer should be direct. Now
Orchestrator.ts:126 🎯 Detected ranking query based on LLM analysis
Orchestrator.ts:135 📊 Query type determined: ranking for "tell me the best project from Rutwik's CV"
Orchestrator.ts:113 📊 Query analysis complete: {intent: 'User wants ranking about technology', domain: 'technology', requirements: Array(1), queryType: 'ranking'}
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1079}
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
analyzeQuery @ Orchestrator.ts:95
research @ Orchestrator.ts:56
synthesizeAnswer @ ResearchOrchestrator.ts:790
executeResearch @ ResearchOrchestrator.ts:168
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754309788526:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/8748fa5e290ba117.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754309788526:1367
Promise.then
hotCheck @ webpack.js?v=1754309788526:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 264ms
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
scheduler.development.js:14 [Violation] 'message' handler took 160ms
webpack.js?v=1754309788526:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/042342c155cccba8.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754309788526:1367
Promise.then
hotCheck @ webpack.js?v=1754309788526:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1606ms
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
webpack.js?v=1754309788526:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/01beca7087f0bc48.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754309788526:1367
Promise.then
hotCheck @ webpack.js?v=1754309788526:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1943ms
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
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
summarizeRAGResults @ Orchestrator.ts:197
research @ Orchestrator.ts:59
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1892}
Orchestrator.ts:198 📚 RAG summary: <think>
Okay, let's start by analyzing the data provided. The user wants a brief summary of three di...
Orchestrator.ts:213 📋 Using optimized pipeline for small models: (4) ['DataInspector', 'PatternGenerator', 'Extractor', 'Synthesizer']
Orchestrator.ts:251 🤖 Executing agent: DataInspector (1/4)
ResearchOrchestrator.ts:643 🚀 Agent started: DataInspector (data_inspector)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
ResearchOrchestrator.ts:686 📊 Agent progress: DataInspector - 10% (Initializing)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
DataInspectorAgent.ts:30 🔎 DataInspector: Analyzing 10 sources (10 RAG, 0 Web)
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2613}
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
inspectWithLLM @ DataInspectorAgent.ts:67
process @ DataInspectorAgent.ts:38
executeAgentPipeline @ Orchestrator.ts:269
research @ Orchestrator.ts:65
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 3090}
DataInspectorAgent.ts:68 🤖 Data inspection: <think>
Okay, let's see what the user needs here. They want to know the best project from Rutwik's CV. The user found three different sources, each with some project information.

First, looking at Source 1, it mentions being a Full Stack AI Developer at Ai Edx. They used Next.js, Sanity CMS, and Mo
DataInspectorAgent.ts:106 ✅ Generated 1 patterns from inspection
Orchestrator.ts:276 🔍 Agent DataInspector reasoning length: 3090
Orchestrator.ts:280 🧠 Thinking extraction for DataInspector: {hasThinking: true, thinkingLength: 1853, reasoningSnippet: "<think>\nOkay, let's see what the user needs here. …h some project information.\n\nFirst, looking at So"}
Orchestrator.ts:297 ✅ Setting thinking for DataInspector: {thinkingContentLength: 1853, summaryLength: 103}
ResearchOrchestrator.ts:714 🧠 Agent thinking: DataInspector
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
ResearchOrchestrator.ts:733 ✅ Agent completed: DataInspector
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
Orchestrator.ts:251 🤖 Executing agent: PatternGenerator (2/4)
ResearchOrchestrator.ts:643 🚀 Agent started: PatternGenerator (pattern_generator)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
ResearchOrchestrator.ts:686 📊 Agent progress: PatternGenerator - 10% (Initializing)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
PatternGeneratorAgent.ts:24 🎯 PatternGenerator: Creating extraction strategies
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 192}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent DataInspector thinking data: {hasThinking: true, thinkingContentLength: 1853, summaryLength: 103, thinkingPreview: "Okay, let's see what the user needs here. They want to know the best project from Rutwik's CV. The u"}
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
generateStrategiesWithLLM @ PatternGeneratorAgent.ts:40
process @ PatternGeneratorAgent.ts:27
executeAgentPipeline @ Orchestrator.ts:269
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 3628}
PatternGeneratorAgent.ts:41 🤖 Strategy generation: <think>
Okay, the user is asking for the best project from Rutwik's CV based on a technology-related ranking. Let me break this down.

First, I need to figure out what Rutwik's CV typically includes. Typically, a CV lists projects, skills, and achievements. The user wants a project that's ranked in 
PatternGeneratorAgent.ts:82 ✅ Generated 2 extraction strategies
Orchestrator.ts:276 🔍 Agent PatternGenerator reasoning length: 3628
Orchestrator.ts:280 🧠 Thinking extraction for PatternGenerator: {hasThinking: true, thinkingLength: 2244, reasoningSnippet: "<think>\nOkay, the user is asking for the best proj… figure out what Rutwik's CV typically includes. "}
Orchestrator.ts:297 ✅ Setting thinking for PatternGenerator: {thinkingContentLength: 2244, summaryLength: 103}
ResearchOrchestrator.ts:714 🧠 Agent thinking: PatternGenerator
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
ResearchOrchestrator.ts:733 ✅ Agent completed: PatternGenerator
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
Orchestrator.ts:251 🤖 Executing agent: Extractor (3/4)
ResearchOrchestrator.ts:643 🚀 Agent started: Extractor (extraction)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
ResearchOrchestrator.ts:686 📊 Agent progress: Extractor - 10% (Initializing)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
ExtractionAgent.ts:26 ⛏️ Extractor: Processing 10 chunks
ExtractionAgent.ts:58 📊 Processing batch 1/5 (chunks 1-2 of 10)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2106}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent PatternGenerator thinking data: {hasThinking: true, thinkingContentLength: 2244, summaryLength: 103, thinkingPreview: "Okay, the user is asking for the best project from Rutwik's CV based on a technology-related ranking"}
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
extractFromBatch @ ExtractionAgent.ts:193
process @ ExtractionAgent.ts:60
executeAgentPipeline @ Orchestrator.ts:269
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2863}
ExtractionAgent.ts:194 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all data from the given text. The text is about Rutwik Shinde's professional experience. First, I need to start with "Entry 1:" or similar.

Looking at the text, there's a lot of information. Let me break it down. First, Rutwik's CV with his cont
ExtractionAgent.ts:58 📊 Processing batch 2/5 (chunks 3-4 of 10)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2106}
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
extractFromBatch @ ExtractionAgent.ts:193
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2762}
ExtractionAgent.ts:194 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all data from the provided text. The text is about Rutwik Shinde's career, mentioning his projects and experience. First, I need to start immediately with "Entry 1:" or "Current record:".

Looking at the text, there's a lot of information. Let me
ExtractionAgent.ts:58 📊 Processing batch 3/5 (chunks 5-6 of 10)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2106}
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
extractFromBatch @ ExtractionAgent.ts:193
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 3838}
ExtractionAgent.ts:194 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all the data from the provided text. The text is about Rutwik Shinde's experience, and they mentioned Next.js, Sanity CMS, and Mongo DB. But wait, the user's instruction says to extract every row from tables, which are all 6+ entries. Let me chec
ExtractionAgent.ts:58 📊 Processing batch 4/5 (chunks 7-8 of 10)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2106}
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
extractFromBatch @ ExtractionAgent.ts:193
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2932}
ExtractionAgent.ts:194 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all data from the given text and start immediately with "Entry 1:".

First, I need to scan the text carefully. The text starts with Rutwik Shinde's information, then lists his experience as a Full Stack AI Developer and Intern at Priyam. There ar
ExtractionAgent.ts:58 📊 Processing batch 5/5 (chunks 9-10 of 10)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2106}
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
extractFromBatch @ ExtractionAgent.ts:193
process @ ExtractionAgent.ts:60
 ✅ Content generated successfully {responseLength: 3559}
 🤖 LLM extraction response: <think>
Okay, let me start by reading the user's query and the text to extract from. The user wants me to extract all data from the given text, starting immediately with "Entry 1:" or similar. 

First, I need to parse the text. The text mentions Rutwik Shinde's job titles, contact information, and v
 📊 Extraction Statistics:
 - Total extracted: 7
 - After deduplication: 3
 - Items with time values: 0
 - Table rows: 1
 - Current records: 1
 📈 Item types:
ExtractionAgent.ts:116   - current_record: 1
ExtractionAgent.ts:116   - table_row: 1
ExtractionAgent.ts:116   - list_item: 1
ExtractionAgent.ts:86 ✅ Extraction complete: 3 items found
Orchestrator.ts:276 🔍 Agent Extractor reasoning length: 1042
Orchestrator.ts:280 🧠 Thinking extraction for Extractor: {hasThinking: false, thinkingLength: 0, reasoningSnippet: '📊 Starting extraction process for 10 chunks...\n\n\uD83C…tanding\n- Looking for: User wants ranking about t'}
Orchestrator.ts:304 ❌ No thinking found for Extractor, reasoning starts with: 📊 Starting extraction process for 10 chunks...

🎯 Extraction Strategy:
- Processing in batches of 
ResearchOrchestrator.ts:733 ✅ Agent completed: Extractor
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
Orchestrator.ts:251 🤖 Executing agent: Synthesizer (4/4)
ResearchOrchestrator.ts:643 🚀 Agent started: Synthesizer (synthesis)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
ResearchOrchestrator.ts:686 📊 Agent progress: Synthesizer - 10% (Initializing)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
SynthesisAgent.ts:57 📝 Synthesizer: Creating final answer from 3 items
SynthesisAgent.ts:58    Sources: 10 RAG chunks, 0 Web sources
SynthesisAgent.ts:62 ⏱️ Time-based items received: 0
SynthesisAgent.ts:619 🧹 Starting content cleaning and deduplication for 3 items
SynthesisAgent.ts:643 🧹 After content cleaning: 2 items (removed 1 malformed)
SynthesisAgent.ts:694 🧹 After deduplication: 2 items (removed 0 duplicates)
SynthesisAgent.ts:83 🧹 After cleaning: 2 items remain
SynthesisAgent.ts:879 📊 Found 1 table items out of 2 total
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 746}
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
groupAndRankItems @ SynthesisAgent.ts:909
process @ SynthesisAgent.ts:94
executeAgentPipeline @ Orchestrator.ts:269
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 6346}
SynthesisAgent.ts:910 🤖 LLM grouping analysis: <think>
Okay, let's try to figure this out. The user provided three items and wants me to analyze them. Let me start by breaking down each item one by one.

First, the three items are:

1. Are these f
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 452}
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
classifyItemsWithLLM @ SynthesisAgent.ts:152
process @ SynthesisAgent.ts:97
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1556}
SynthesisAgent.ts:153 🤖 LLM classification response: <think>
Okay, let's see. The user asked for the best project from Rutwik's CV, and I found two entries. Both entries are undefined in type, but looking at their content, maybe there's some information
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 211}
useOllamaConnection.ts:410 Fetch finished loading: POST "http://localhost:11434/api/chat".
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
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:410
generateDeepResearchReport @ SynthesisAgent.ts:201
process @ SynthesisAgent.ts:100
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1875}
SynthesisAgent.ts:124 ✅ Synthesis complete: 1875 characters
Orchestrator.ts:276 🔍 Agent Synthesizer reasoning length: 404
Orchestrator.ts:280 🧠 Thinking extraction for Synthesizer: {hasThinking: false, thinkingLength: 0, reasoningSnippet: '✅ Synthesis Complete!\n\n📊 Report Statistics:\n- Cri…1875 characters\n\n🎯 The research report includes:'}
Orchestrator.ts:304 ❌ No thinking found for Synthesizer, reasoning starts with: ✅ Synthesis Complete!

📊 Report Statistics:
- Critical findings identified: 2
- Total data points a
ResearchOrchestrator.ts:733 ✅ Agent completed: Synthesizer
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754309858499_2_4d01f058_in_progress
Orchestrator.ts:68 📝 Final synthesis: {hasAnswer: true, answerLength: 1875, preview: `<think>\nOkay, the user asked, "Tell me the best project from Rutwik's CV". They provided two entries`}
ResearchOrchestrator.ts:796 ✅ Multi-agent system generated answer with 4 agent sub-steps
useResearch.ts:942 📋 Step update: synthesis - completed - ID: synthesis_1754309858499_2_4d01f058
useResearch.ts:964 📋 Adding new step: synthesis_1754309858499_2_4d01f058
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: synthesis_1754309858499_2_4d01f058
ResearchOrchestrator.ts:211 ✅ Research completed: 7 steps, 10 sources, 174462ms
useResearch.ts:994 ✅ Intelligent research completed: {steps: 7, sources: 10, confidence: 0.5264483487451924, processingTime: 174462}
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: synthesis_1754309858499_2_4d01f058
PerplexityStyleResearch.tsx:198 🎭 UI - Agent DataInspector thinking data: {hasThinking: true, thinkingContentLength: 1853, summaryLength: 103, thinkingPreview: "Okay, let's see what the user needs here. They want to know the best project from Rutwik's CV. The u"}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent PatternGenerator thinking data: {hasThinking: true, thinkingContentLength: 2244, summaryLength: 103, thinkingPreview: "Okay, the user is asking for the best project from Rutwik's CV based on a technology-related ranking"}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent DataInspector thinking data: {hasThinking: true, thinkingContentLength: 1853, summaryLength: 103, thinkingPreview: "Okay, let's see what the user needs here. They want to know the best project from Rutwik's CV. The u"}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent PatternGenerator thinking data: {hasThinking: true, thinkingContentLength: 2244, summaryLength: 103, thinkingPreview: "Okay, the user is asking for the best project from Rutwik's CV based on a technology-related ranking"}
scheduler.development.js:14 [Violation] 'message' handler took 177ms
PerplexityStyleResearch.tsx:84 ✅ Multi-Agent Process details copied to clipboard
hot-reloader-client.js:197 [Fast Refresh] rebuilding
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754309788526:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/0987888a1ecd7c9a.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754309788526:1367
Promise.then
hotCheck @ webpack.js?v=1754309788526:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 210ms
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
webpack.js?v=1754309788526:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/dc077fb2951fc40d.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754309788526:1367
Promise.then
hotCheck @ webpack.js?v=1754309788526:553
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
report-hmr-latency.js:14 [Fast Refresh] done in 550ms
