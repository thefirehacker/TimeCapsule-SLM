# full logs 
 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754308134651&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~102015666~103116026~103200004~103233427~104684208~104684211~104948813~105033766~105033768~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=8&sid=1754305220&sct=3&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2F&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=scroll&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&epn.percent_scrolled=90&_et=4417&tfd=39604".
Yc @ js:241
ym @ js:431
dN @ js:911
(anonymous) @ js:919
(anonymous) @ js:916
 🔍 Testing Ollama connection at: http://localhost:11434
 ✅ Ollama connection test passed, models: (4) ['tinyllama:1.1b', 'qwen3:0.6b', 'llama3.2:1b', 'llama3.1:8b']
 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ webpack-internal:///…amaConnection.ts:84
handleTest @ webpack-internal:///…nectionModal.tsx:87
executeDispatch @ webpack-internal:///…evelopment.js:16502
runWithFiberInDEV @ webpack-internal:///….development.js:845
processDispatchQueue @ webpack-internal:///…evelopment.js:16552
eval @ webpack-internal:///…evelopment.js:17150
batchedUpdates$1 @ webpack-internal:///…development.js:3263
dispatchEventForPluginEventSystem @ webpack-internal:///…evelopment.js:16706
dispatchEvent @ webpack-internal:///…evelopment.js:20816
dispatchDiscreteEvent @ webpack-internal:///…evelopment.js:20784
<button>
exports.jsxDEV @ webpack-internal:///….development.js:346
Button @ webpack-internal:///…ts/ui/button.tsx:42
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
<Button>
exports.jsxDEV @ webpack-internal:///….development.js:346
OllamaConnectionModal @ webpack-internal:///…ectionModal.tsx:621
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
 🔌 Starting Ollama connection process... {baseURL: 'http://localhost:11434', model: 'qwen3:0.6b'}
 🔍 Testing Ollama connection at: http://localhost:11434
 ✅ Ollama connection test passed, models: (4) ['tinyllama:1.1b', 'qwen3:0.6b', 'llama3.2:1b', 'llama3.1:8b']
 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ webpack-internal:///…amaConnection.ts:84
useOllamaConnection.useCallback[connect] @ webpack-internal:///…maConnection.ts:152
handleOllamaConnect @ webpack-internal:///…ResearchApp.tsx:207
handleConnect @ webpack-internal:///…ectionModal.tsx:118
executeDispatch @ webpack-internal:///…evelopment.js:16502
runWithFiberInDEV @ webpack-internal:///….development.js:845
processDispatchQueue @ webpack-internal:///…evelopment.js:16552
eval @ webpack-internal:///…evelopment.js:17150
batchedUpdates$1 @ webpack-internal:///…development.js:3263
dispatchEventForPluginEventSystem @ webpack-internal:///…evelopment.js:16706
dispatchEvent @ webpack-internal:///…evelopment.js:20816
dispatchDiscreteEvent @ webpack-internal:///…evelopment.js:20784
 🤖 Creating Ollama client... {baseURL: 'http://localhost:11434', selectedModel: 'qwen3:0.6b'}
 ✅ Ollama client created successfully
 🧪 Testing content generation...
 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ webpack-internal:///…/dist/index.mjs:599
postJsonToApi @ webpack-internal:///…/dist/index.mjs:554
doGenerate @ webpack-internal:///…/dist/index.mjs:485
fn @ webpack-internal:///…dist/index.mjs:4389
eval @ webpack-internal:///…/dist/index.mjs:558
startActiveSpan @ webpack-internal:///…/dist/index.mjs:485
recordSpan @ webpack-internal:///…/dist/index.mjs:556
eval @ webpack-internal:///…dist/index.mjs:4346
_retryWithExponentialBackoff @ webpack-internal:///…/dist/index.mjs:359
eval @ webpack-internal:///…/dist/index.mjs:348
fn @ webpack-internal:///…dist/index.mjs:4345
await in fn
eval @ webpack-internal:///…/dist/index.mjs:558
startActiveSpan @ webpack-internal:///…/dist/index.mjs:485
recordSpan @ webpack-internal:///…/dist/index.mjs:556
generateText @ webpack-internal:///…dist/index.mjs:4273
useOllamaConnection.useCallback[connect] @ webpack-internal:///…maConnection.ts:190
await in useOllamaConnection.useCallback[connect]
handleOllamaConnect @ webpack-internal:///…ResearchApp.tsx:207
handleConnect @ webpack-internal:///…ectionModal.tsx:118
executeDispatch @ webpack-internal:///…evelopment.js:16502
runWithFiberInDEV @ webpack-internal:///….development.js:845
processDispatchQueue @ webpack-internal:///…evelopment.js:16552
eval @ webpack-internal:///…evelopment.js:17150
batchedUpdates$1 @ webpack-internal:///…development.js:3263
dispatchEventForPluginEventSystem @ webpack-internal:///…evelopment.js:16706
dispatchEvent @ webpack-internal:///…evelopment.js:20816
dispatchDiscreteEvent @ webpack-internal:///…evelopment.js:20784
 ✅ Test generation successful: <think>
Okay, the user wants me to say "Connection test successful" to confirm. Let me
 ✅ Successfully connected to Ollama with model: qwen3:0.6b
 🔌 Disconnected from Ollama
 🔍 Testing Ollama connection at: http://localhost:11434
 ✅ Ollama connection test passed, models: (4) ['tinyllama:1.1b', 'qwen3:0.6b', 'llama3.2:1b', 'llama3.1:8b']
 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ webpack-internal:///…amaConnection.ts:84
handleTest @ webpack-internal:///…nectionModal.tsx:87
executeDispatch @ webpack-internal:///…evelopment.js:16502
runWithFiberInDEV @ webpack-internal:///….development.js:845
processDispatchQueue @ webpack-internal:///…evelopment.js:16552
eval @ webpack-internal:///…evelopment.js:17150
batchedUpdates$1 @ webpack-internal:///…development.js:3263
dispatchEventForPluginEventSystem @ webpack-internal:///…evelopment.js:16706
dispatchEvent @ webpack-internal:///…evelopment.js:20816
dispatchDiscreteEvent @ webpack-internal:///…evelopment.js:20784
<button>
exports.jsxDEV @ webpack-internal:///….development.js:346
Button @ webpack-internal:///…ts/ui/button.tsx:42
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
<Button>
exports.jsxDEV @ webpack-internal:///….development.js:346
OllamaConnectionModal @ webpack-internal:///…ectionModal.tsx:621
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
 🔌 Starting Ollama connection process... {baseURL: 'http://localhost:11434', model: 'qwen3:0.6b'}
 🔍 Testing Ollama connection at: http://localhost:11434
 Fetch finished loading: GET "http://localhost:11434/api/tags".
useOllamaConnection.useCallback[testConnection] @ webpack-internal:///…amaConnection.ts:84
useOllamaConnection.useCallback[connect] @ webpack-internal:///…maConnection.ts:152
handleOllamaConnect @ webpack-internal:///…ResearchApp.tsx:207
handleConnect @ webpack-internal:///…ectionModal.tsx:118
executeDispatch @ webpack-internal:///…evelopment.js:16502
runWithFiberInDEV @ webpack-internal:///….development.js:845
processDispatchQueue @ webpack-internal:///…evelopment.js:16552
eval @ webpack-internal:///…evelopment.js:17150
batchedUpdates$1 @ webpack-internal:///…development.js:3263
dispatchEventForPluginEventSystem @ webpack-internal:///…evelopment.js:16706
dispatchEvent @ webpack-internal:///…evelopment.js:20816
dispatchDiscreteEvent @ webpack-internal:///…evelopment.js:20784
<button>
exports.jsxDEV @ webpack-internal:///….development.js:346
Button @ webpack-internal:///…ts/ui/button.tsx:42
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
<Button>
exports.jsxDEV @ webpack-internal:///….development.js:346
OllamaConnectionModal @ webpack-internal:///…ectionModal.tsx:653
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
 ✅ Ollama connection test passed, models: (4) ['tinyllama:1.1b', 'qwen3:0.6b', 'llama3.2:1b', 'llama3.1:8b']
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
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308196167_pibvspvaq - "tell me about best project from Rutwik's CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308196167_pibvspvaq: Searching for "tell me about best project from Rutwik's CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (43 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 120ms
VectorStore.ts:751 🧠 RAG Query rag_1754308196167_pibvspvaq: Generated embedding in 120ms
VectorStore.ts:758 📚 RAG Query rag_1754308196167_pibvspvaq: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308196167_pibvspvaq - 2 results, avg similarity: 0.339, 121ms
VectorStore.ts:811 ✅ RAG Query rag_1754308196167_pibvspvaq completed: {totalTime: '121ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.339', threshold: 0.1, …}
useResearch.ts:325 🔍 RAG Search completed: 1 documents found
prompt-input.tsx:514 🔍 Web search skipped: {webSearchEnabled: false, hasWebSearch: true, configured: false}
useResearch.ts:938 🔬 Starting intelligent research for: "tell me about best project from Rutwik's CV"
ResearchOrchestrator.ts:104 🔬 Starting research for: "tell me about best project from Rutwik's CV"
useResearch.ts:942 📋 Step update: analysis - in_progress - ID: analysis_1754308196335_1_30f69e8c
useResearch.ts:964 📋 Adding new step: analysis_1754308196335_1_30f69e8c
QueryIntelligenceService.ts:71 🧠 Analyzing query: "tell me about best project from Rutwik's CV"
QueryIntelligenceService.ts:75 📋 Rule-based analysis: unknown (0.3)
QueryIntelligenceService.ts:82 🤖 Low confidence (0.3), trying LLM analysis...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 269}
js?id=G-V1B8R98P79:241 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57u1v898116370za200zd898116370&_p=1754308134651&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~102015666~103116026~103200004~103233427~104684208~104684211~104948813~105033766~105033768~105087538~105087540~105103161~105103163&cid=2050444394.1754292465&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=9&sid=1754305220&sct=3&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dr=http%3A%2F%2Flocalhost%3A3000%2F&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=27156&tfd=71874".
Yc @ js?id=G-V1B8R98P79:241
ym @ js?id=G-V1B8R98P79:431
dN @ js?id=G-V1B8R98P79:911
(anonymous) @ js?id=G-V1B8R98P79:919
(anonymous) @ js?id=G-V1B8R98P79:916
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2889}
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
QueryIntelligenceService.ts:89 🔄 Combined analysis: 6 total queries
QueryIntelligenceService.ts:104 ✅ Query analysis complete: 6 queries in 13188ms
useResearch.ts:942 📋 Step update: analysis - completed - ID: analysis_1754308196335_1_30f69e8c
useResearch.ts:964 📋 Adding new step: analysis_1754308196335_1_30f69e8c
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: analysis_1754308196335_1_30f69e8c
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 239}
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: analysis_1754308196335_1_30f69e8c
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
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 3958}
ResearchOrchestrator.ts:1051 🔍 Parsing LLM response: <think>
Okay, the user wants to research "best project from Rutwik's CV" and is looking for steps to find comprehensive information. They have available options: search local knowledge base (rag_search).

First, I need to break down the steps they should take. Let me start by considering the structu...
ResearchOrchestrator.ts:1126 ✅ Parsed 12 steps from natural language
ResearchOrchestrator.ts:266 🤖 LLM planned 12 research steps
ResearchOrchestrator.ts:124 📋 Research plan: 12 steps planned
useResearch.ts:942 📋 Step update: rag_search - in_progress - ID: rag_search_1754308223131_1_luyyt
useResearch.ts:964 📋 Adding new step: rag_search_1754308223131_1_luyyt
ResearchOrchestrator.ts:424 📚 Executing RAG search with 6 queries: (6) ["tell me about best project from Rutwik's CV", 'best project Rutwik CV', 'projects Rutvik CV', 'best project in Rutvik CV.', 'best project Rutvik CV', "Rutvik's best project CV."]
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223131_tx2qztscl - "tell me about best project from Rutwik's CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223131_tx2qztscl: Searching for "tell me about best project from Rutwik's CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (43 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 38ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223131_tx2qztscl: Generated embedding in 38ms
VectorStore.ts:758 📚 RAG Query rag_1754308223131_tx2qztscl: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223131_tx2qztscl - 2 results, avg similarity: 0.339, 38ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223131_tx2qztscl completed: {totalTime: '38ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.339', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223170_aumjklwub - "best project Rutwik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223170_aumjklwub: Searching for "best project Rutwik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (22 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 16ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223170_aumjklwub: Generated embedding in 16ms
VectorStore.ts:758 📚 RAG Query rag_1754308223170_aumjklwub: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223170_aumjklwub - 2 results, avg similarity: 0.312, 16ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223170_aumjklwub completed: {totalTime: '16ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.312', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223186_dv4q6vcq8 - "projects Rutvik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223186_dv4q6vcq8: Searching for "projects Rutvik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (18 chars)...
 ✅ Generated embedding: 384 dimensions in 15ms
 🧠 RAG Query rag_1754308223186_dv4q6vcq8: Generated embedding in 15ms
 📚 RAG Query rag_1754308223186_dv4q6vcq8: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754308223186_dv4q6vcq8 - 2 results, avg similarity: 0.275, 15ms
 ✅ RAG Query rag_1754308223186_dv4q6vcq8 completed: {totalTime: '15ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.275', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754308223201_arbt8uu26 - "best project in Rutvik CV...."
 🔍 RAG Query rag_1754308223201_arbt8uu26: Searching for "best project in Rutvik CV." with threshold: 0.1
 🔍 Generating embedding for text (26 chars)...
 ✅ Generated embedding: 384 dimensions in 21ms
 🧠 RAG Query rag_1754308223201_arbt8uu26: Generated embedding in 21ms
 📚 RAG Query rag_1754308223201_arbt8uu26: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754308223201_arbt8uu26 - 2 results, avg similarity: 0.297, 21ms
 ✅ RAG Query rag_1754308223201_arbt8uu26 completed: {totalTime: '21ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.297', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223222_yqy8iq4xj - "best project Rutvik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223222_yqy8iq4xj: Searching for "best project Rutvik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (22 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 14ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223222_yqy8iq4xj: Generated embedding in 14ms
VectorStore.ts:758 📚 RAG Query rag_1754308223222_yqy8iq4xj: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223222_yqy8iq4xj - 2 results, avg similarity: 0.289, 14ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223222_yqy8iq4xj completed: {totalTime: '14ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.289', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223236_c0juuy18c - "Rutvik's best project CV...."
VectorStore.ts:743 🔍 RAG Query rag_1754308223236_c0juuy18c: Searching for "Rutvik's best project CV." with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (25 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 16ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223236_c0juuy18c: Generated embedding in 16ms
VectorStore.ts:758 📚 RAG Query rag_1754308223236_c0juuy18c: Retrieved 1 documents in 1ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223236_c0juuy18c - 2 results, avg similarity: 0.305, 17ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223236_c0juuy18c completed: {totalTime: '17ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.305', threshold: 0.1, …}
ResearchOrchestrator.ts:450 📚 RAG search found 2 unique results from 6 queries
ResearchOrchestrator.ts:499 ✅ RAG search found 2 sources
useResearch.ts:942 📋 Step update: rag_search - completed - ID: rag_search_1754308223131_1_luyyt
useResearch.ts:964 📋 Adding new step: rag_search_1754308223131_1_luyyt
ResearchOrchestrator.ts:147 🔄 Adding 0 additional steps: Insufficient sources for comprehensive answer
useResearch.ts:942 📋 Step update: rag_search - in_progress - ID: rag_search_1754308223253_2_4udx0
useResearch.ts:964 📋 Adding new step: rag_search_1754308223253_2_4udx0
ResearchOrchestrator.ts:424 📚 Executing RAG search with 6 queries: (6) ["tell me about best project from Rutwik's CV", 'best project Rutwik CV', 'projects Rutvik CV', 'best project in Rutvik CV.', 'best project Rutvik CV', "Rutvik's best project CV."]
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223253_41atvhbsc - "tell me about best project from Rutwik's CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223253_41atvhbsc: Searching for "tell me about best project from Rutwik's CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (43 chars)...
 ✅ Generated embedding: 384 dimensions in 21ms
 🧠 RAG Query rag_1754308223253_41atvhbsc: Generated embedding in 21ms
 📚 RAG Query rag_1754308223253_41atvhbsc: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754308223253_41atvhbsc - 2 results, avg similarity: 0.339, 21ms
 ✅ RAG Query rag_1754308223253_41atvhbsc completed: {totalTime: '21ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.339', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223274_hskbs55ov - "best project Rutwik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223274_hskbs55ov: Searching for "best project Rutwik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (22 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 14ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223274_hskbs55ov: Generated embedding in 14ms
VectorStore.ts:758 📚 RAG Query rag_1754308223274_hskbs55ov: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223274_hskbs55ov - 2 results, avg similarity: 0.312, 14ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223274_hskbs55ov completed: {totalTime: '14ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.312', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223288_j9f2dfaql - "projects Rutvik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223288_j9f2dfaql: Searching for "projects Rutvik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (18 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 12ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223288_j9f2dfaql: Generated embedding in 12ms
VectorStore.ts:758 📚 RAG Query rag_1754308223288_j9f2dfaql: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223288_j9f2dfaql - 2 results, avg similarity: 0.275, 12ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223288_j9f2dfaql completed: {totalTime: '12ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.275', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223300_43delolls - "best project in Rutvik CV...."
VectorStore.ts:743 🔍 RAG Query rag_1754308223300_43delolls: Searching for "best project in Rutvik CV." with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (26 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 15ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223300_43delolls: Generated embedding in 15ms
VectorStore.ts:758 📚 RAG Query rag_1754308223300_43delolls: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223300_43delolls - 2 results, avg similarity: 0.297, 15ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223300_43delolls completed: {totalTime: '15ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.297', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223315_c9vkuu2z8 - "best project Rutvik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223315_c9vkuu2z8: Searching for "best project Rutvik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (22 chars)...
 ✅ Generated embedding: 384 dimensions in 13ms
 🧠 RAG Query rag_1754308223315_c9vkuu2z8: Generated embedding in 13ms
 📚 RAG Query rag_1754308223315_c9vkuu2z8: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754308223315_c9vkuu2z8 - 2 results, avg similarity: 0.289, 13ms
 ✅ RAG Query rag_1754308223315_c9vkuu2z8 completed: {totalTime: '13ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.289', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754308223328_tfhl074sp - "Rutvik's best project CV...."
 🔍 RAG Query rag_1754308223328_tfhl074sp: Searching for "Rutvik's best project CV." with threshold: 0.1
 🔍 Generating embedding for text (25 chars)...
 ✅ Generated embedding: 384 dimensions in 16ms
 🧠 RAG Query rag_1754308223328_tfhl074sp: Generated embedding in 16ms
 📚 RAG Query rag_1754308223328_tfhl074sp: Retrieved 1 documents in 1ms
 ✅ RAG Query completed: rag_1754308223328_tfhl074sp - 2 results, avg similarity: 0.305, 17ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223328_tfhl074sp completed: {totalTime: '17ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.305', threshold: 0.1, …}
ResearchOrchestrator.ts:450 📚 RAG search found 2 unique results from 6 queries
ResearchOrchestrator.ts:499 ✅ RAG search found 2 sources
useResearch.ts:942 📋 Step update: rag_search - completed - ID: rag_search_1754308223253_2_4udx0
useResearch.ts:964 📋 Adding new step: rag_search_1754308223253_2_4udx0
useResearch.ts:942 📋 Step update: rag_search - in_progress - ID: rag_search_1754308223345_3_jvv2t
useResearch.ts:964 📋 Adding new step: rag_search_1754308223345_3_jvv2t
ResearchOrchestrator.ts:424 📚 Executing RAG search with 6 queries: (6) ["tell me about best project from Rutwik's CV", 'best project Rutwik CV', 'projects Rutvik CV', 'best project in Rutvik CV.', 'best project Rutvik CV', "Rutvik's best project CV."]
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223345_zxbuf8p57 - "tell me about best project from Rutwik's CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223345_zxbuf8p57: Searching for "tell me about best project from Rutwik's CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (43 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 20ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223345_zxbuf8p57: Generated embedding in 20ms
VectorStore.ts:758 📚 RAG Query rag_1754308223345_zxbuf8p57: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223345_zxbuf8p57 - 2 results, avg similarity: 0.339, 21ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223345_zxbuf8p57 completed: {totalTime: '21ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.339', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223366_c4jm4z6bx - "best project Rutwik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223366_c4jm4z6bx: Searching for "best project Rutwik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (22 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 13ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223366_c4jm4z6bx: Generated embedding in 14ms
VectorStore.ts:758 📚 RAG Query rag_1754308223366_c4jm4z6bx: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223366_c4jm4z6bx - 2 results, avg similarity: 0.312, 14ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223366_c4jm4z6bx completed: {totalTime: '14ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.312', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223380_lnmb8and5 - "projects Rutvik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223380_lnmb8and5: Searching for "projects Rutvik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (18 chars)...
 ✅ Generated embedding: 384 dimensions in 12ms
 🧠 RAG Query rag_1754308223380_lnmb8and5: Generated embedding in 12ms
 📚 RAG Query rag_1754308223380_lnmb8and5: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754308223380_lnmb8and5 - 2 results, avg similarity: 0.275, 12ms
 ✅ RAG Query rag_1754308223380_lnmb8and5 completed: {totalTime: '12ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.275', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754308223392_mjugl33t1 - "best project in Rutvik CV...."
 🔍 RAG Query rag_1754308223392_mjugl33t1: Searching for "best project in Rutvik CV." with threshold: 0.1
 🔍 Generating embedding for text (26 chars)...
 ✅ Generated embedding: 384 dimensions in 15ms
 🧠 RAG Query rag_1754308223392_mjugl33t1: Generated embedding in 15ms
 📚 RAG Query rag_1754308223392_mjugl33t1: Retrieved 1 documents in 1ms
 ✅ RAG Query completed: rag_1754308223392_mjugl33t1 - 2 results, avg similarity: 0.297, 16ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223392_mjugl33t1 completed: {totalTime: '16ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.297', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223408_5hfrmhj6c - "best project Rutvik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223408_5hfrmhj6c: Searching for "best project Rutvik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (22 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 13ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223408_5hfrmhj6c: Generated embedding in 13ms
VectorStore.ts:758 📚 RAG Query rag_1754308223408_5hfrmhj6c: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223408_5hfrmhj6c - 2 results, avg similarity: 0.289, 13ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223408_5hfrmhj6c completed: {totalTime: '13ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.289', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223421_9pecoef56 - "Rutvik's best project CV...."
VectorStore.ts:743 🔍 RAG Query rag_1754308223421_9pecoef56: Searching for "Rutvik's best project CV." with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (25 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 16ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223421_9pecoef56: Generated embedding in 16ms
VectorStore.ts:758 📚 RAG Query rag_1754308223421_9pecoef56: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223421_9pecoef56 - 2 results, avg similarity: 0.305, 16ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223421_9pecoef56 completed: {totalTime: '16ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.305', threshold: 0.1, …}
ResearchOrchestrator.ts:450 📚 RAG search found 2 unique results from 6 queries
ResearchOrchestrator.ts:499 ✅ RAG search found 2 sources
useResearch.ts:942 📋 Step update: rag_search - completed - ID: rag_search_1754308223345_3_jvv2t
useResearch.ts:964 📋 Adding new step: rag_search_1754308223345_3_jvv2t
useResearch.ts:942 📋 Step update: rag_search - in_progress - ID: rag_search_1754308223437_4_if5tx
useResearch.ts:964 📋 Adding new step: rag_search_1754308223437_4_if5tx
ResearchOrchestrator.ts:424 📚 Executing RAG search with 6 queries: (6) ["tell me about best project from Rutwik's CV", 'best project Rutwik CV', 'projects Rutvik CV', 'best project in Rutvik CV.', 'best project Rutvik CV', "Rutvik's best project CV."]
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223438_kylnvydhj - "tell me about best project from Rutwik's CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223438_kylnvydhj: Searching for "tell me about best project from Rutwik's CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (43 chars)...
 ✅ Generated embedding: 384 dimensions in 20ms
 🧠 RAG Query rag_1754308223438_kylnvydhj: Generated embedding in 20ms
 📚 RAG Query rag_1754308223438_kylnvydhj: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754308223438_kylnvydhj - 2 results, avg similarity: 0.339, 20ms
 ✅ RAG Query rag_1754308223438_kylnvydhj completed: {totalTime: '20ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.339', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223459_9118s3x5y - "best project Rutwik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223459_9118s3x5y: Searching for "best project Rutwik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (22 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 14ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223459_9118s3x5y: Generated embedding in 14ms
VectorStore.ts:758 📚 RAG Query rag_1754308223459_9118s3x5y: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223459_9118s3x5y - 2 results, avg similarity: 0.312, 14ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223459_9118s3x5y completed: {totalTime: '14ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.312', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223473_xehrk9wya - "projects Rutvik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223473_xehrk9wya: Searching for "projects Rutvik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (18 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 12ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223473_xehrk9wya: Generated embedding in 12ms
VectorStore.ts:758 📚 RAG Query rag_1754308223473_xehrk9wya: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223473_xehrk9wya - 2 results, avg similarity: 0.275, 12ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223473_xehrk9wya completed: {totalTime: '12ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.275', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223485_fqiv981p7 - "best project in Rutvik CV...."
VectorStore.ts:743 🔍 RAG Query rag_1754308223485_fqiv981p7: Searching for "best project in Rutvik CV." with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (26 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 15ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223485_fqiv981p7: Generated embedding in 15ms
VectorStore.ts:758 📚 RAG Query rag_1754308223485_fqiv981p7: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223485_fqiv981p7 - 2 results, avg similarity: 0.297, 15ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223485_fqiv981p7 completed: {totalTime: '15ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.297', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223500_gfa2he08y - "best project Rutvik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223500_gfa2he08y: Searching for "best project Rutvik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (22 chars)...
 ✅ Generated embedding: 384 dimensions in 13ms
 🧠 RAG Query rag_1754308223500_gfa2he08y: Generated embedding in 13ms
 📚 RAG Query rag_1754308223500_gfa2he08y: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754308223500_gfa2he08y - 2 results, avg similarity: 0.289, 13ms
 ✅ RAG Query rag_1754308223500_gfa2he08y completed: {totalTime: '13ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.289', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754308223513_nzrz59p1x - "Rutvik's best project CV...."
 🔍 RAG Query rag_1754308223513_nzrz59p1x: Searching for "Rutvik's best project CV." with threshold: 0.1
 🔍 Generating embedding for text (25 chars)...
 ✅ Generated embedding: 384 dimensions in 17ms
 🧠 RAG Query rag_1754308223513_nzrz59p1x: Generated embedding in 17ms
 📚 RAG Query rag_1754308223513_nzrz59p1x: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754308223513_nzrz59p1x - 2 results, avg similarity: 0.305, 17ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223513_nzrz59p1x completed: {totalTime: '17ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.305', threshold: 0.1, …}
ResearchOrchestrator.ts:450 📚 RAG search found 2 unique results from 6 queries
ResearchOrchestrator.ts:499 ✅ RAG search found 2 sources
useResearch.ts:942 📋 Step update: rag_search - completed - ID: rag_search_1754308223437_4_if5tx
useResearch.ts:964 📋 Adding new step: rag_search_1754308223437_4_if5tx
useResearch.ts:942 📋 Step update: rag_search - in_progress - ID: rag_search_1754308223530_5_a6a8i
useResearch.ts:964 📋 Adding new step: rag_search_1754308223530_5_a6a8i
ResearchOrchestrator.ts:424 📚 Executing RAG search with 6 queries: (6) ["tell me about best project from Rutwik's CV", 'best project Rutwik CV', 'projects Rutvik CV', 'best project in Rutvik CV.', 'best project Rutvik CV', "Rutvik's best project CV."]
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223531_4nmerrz8b - "tell me about best project from Rutwik's CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223531_4nmerrz8b: Searching for "tell me about best project from Rutwik's CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (43 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 20ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223531_4nmerrz8b: Generated embedding in 20ms
VectorStore.ts:758 📚 RAG Query rag_1754308223531_4nmerrz8b: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223531_4nmerrz8b - 2 results, avg similarity: 0.339, 20ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223531_4nmerrz8b completed: {totalTime: '20ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.339', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223551_e6xmnoaf5 - "best project Rutwik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223551_e6xmnoaf5: Searching for "best project Rutwik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (22 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 14ms
VectorStore.ts:751 🧠 RAG Query rag_1754308223551_e6xmnoaf5: Generated embedding in 14ms
VectorStore.ts:758 📚 RAG Query rag_1754308223551_e6xmnoaf5: Retrieved 1 documents in 0ms
RAGTracker.ts:120 ✅ RAG Query completed: rag_1754308223551_e6xmnoaf5 - 2 results, avg similarity: 0.312, 14ms
VectorStore.ts:811 ✅ RAG Query rag_1754308223551_e6xmnoaf5 completed: {totalTime: '14ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.312', threshold: 0.1, …}
RAGTracker.ts:71 🔍 RAG Query started: rag_1754308223565_z6bhd41u9 - "projects Rutvik CV..."
VectorStore.ts:743 🔍 RAG Query rag_1754308223565_z6bhd41u9: Searching for "projects Rutvik CV" with threshold: 0.1
EmbeddingService.ts:177 🔍 Generating embedding for text (18 chars)...
 ✅ Generated embedding: 384 dimensions in 12ms
 🧠 RAG Query rag_1754308223565_z6bhd41u9: Generated embedding in 12ms
 📚 RAG Query rag_1754308223565_z6bhd41u9: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754308223565_z6bhd41u9 - 2 results, avg similarity: 0.275, 12ms
 ✅ RAG Query rag_1754308223565_z6bhd41u9 completed: {totalTime: '12ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.275', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754308223577_aotd26kjm - "best project in Rutvik CV...."
 🔍 RAG Query rag_1754308223577_aotd26kjm: Searching for "best project in Rutvik CV." with threshold: 0.1
 🔍 Generating embedding for text (26 chars)...
 ✅ Generated embedding: 384 dimensions in 16ms
 🧠 RAG Query rag_1754308223577_aotd26kjm: Generated embedding in 16ms
 📚 RAG Query rag_1754308223577_aotd26kjm: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754308223577_aotd26kjm - 2 results, avg similarity: 0.297, 16ms
 ✅ RAG Query rag_1754308223577_aotd26kjm completed: {totalTime: '16ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.297', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754308223593_o6nka7sfr - "best project Rutvik CV..."
 🔍 RAG Query rag_1754308223593_o6nka7sfr: Searching for "best project Rutvik CV" with threshold: 0.1
 🔍 Generating embedding for text (22 chars)...
 ✅ Generated embedding: 384 dimensions in 13ms
 🧠 RAG Query rag_1754308223593_o6nka7sfr: Generated embedding in 13ms
 📚 RAG Query rag_1754308223593_o6nka7sfr: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754308223593_o6nka7sfr - 2 results, avg similarity: 0.289, 13ms
 ✅ RAG Query rag_1754308223593_o6nka7sfr completed: {totalTime: '13ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.289', threshold: 0.1, …}
 🔍 RAG Query started: rag_1754308223606_5l7zojztq - "Rutvik's best project CV...."
 🔍 RAG Query rag_1754308223606_5l7zojztq: Searching for "Rutvik's best project CV." with threshold: 0.1
 🔍 Generating embedding for text (25 chars)...
 ✅ Generated embedding: 384 dimensions in 16ms
 🧠 RAG Query rag_1754308223606_5l7zojztq: Generated embedding in 16ms
 📚 RAG Query rag_1754308223606_5l7zojztq: Retrieved 1 documents in 0ms
 ✅ RAG Query completed: rag_1754308223606_5l7zojztq - 2 results, avg similarity: 0.305, 16ms
 ✅ RAG Query rag_1754308223606_5l7zojztq completed: {totalTime: '16ms', breakdown: {…}, results: '2/2 (filtered by limit)', avgSimilarity: '0.305', threshold: 0.1, …}
 📚 RAG search found 2 unique results from 6 queries
ResearchOrchestrator.ts:499 ✅ RAG search found 2 sources
useResearch.ts:942 📋 Step update: rag_search - completed - ID: rag_search_1754308223530_5_a6a8i
useResearch.ts:964 📋 Adding new step: rag_search_1754308223530_5_a6a8i
ResearchOrchestrator.ts:129 ⚠️ Max steps (6) reached
ResearchOrchestrator.ts:153 📚 Total sources collected: 10
ResearchOrchestrator.ts:154 📊 Source breakdown: {rag: 10, web: 0, totalContentLength: 7990}
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:964 📋 Adding new step: synthesis_1754308223623_2_f0d0664b
ResearchOrchestrator.ts:634 🤖 Using multi-agent system for intelligent extraction
AgentRegistry.ts:21 📝 Registered agent: QueryPlanner - Expands queries based on intent and domain understanding
AgentRegistry.ts:21 📝 Registered agent: DataInspector - Analyzes RAG chunks to understand data structure and quality
AgentRegistry.ts:21 📝 Registered agent: PatternGenerator - Creates extraction strategies based on data inspection
AgentRegistry.ts:21 📝 Registered agent: Extractor - Executes extraction using generated patterns
AgentRegistry.ts:21 📝 Registered agent: Synthesizer - Consolidates extracted data into a coherent answer
Orchestrator.ts:50 🎯 Orchestrator starting research for: "tell me about best project from Rutwik's CV"
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 458}
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754308223131_1_luyyt
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754308223131_1_luyyt
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754308223253_2_4udx0
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754308223253_2_4udx0
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754308223345_3_jvv2t
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754308223345_3_jvv2t
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754308223437_4_if5tx
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754308223437_4_if5tx
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754308223530_5_a6a8i
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: rag_search_1754308223530_5_a6a8i
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
analyzeQuery @ Orchestrator.ts:96
research @ Orchestrator.ts:56
synthesizeAnswer @ ResearchOrchestrator.ts:790
executeResearch @ ResearchOrchestrator.ts:168
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1309}
Orchestrator.ts:97 🤖 Query understanding: <think>
Okay, the user is asking about the best project Rutwik has in his CV. Let me break down the questions they want addressed.

First, the user is looking for something specific. They want to know
Orchestrator.ts:127 🎯 Detected ranking query based on LLM analysis
Orchestrator.ts:136 📊 Query type determined: ranking for "tell me about best project from Rutwik's CV"
Orchestrator.ts:114 📊 Query analysis complete: {intent: 'User wants ranking about technology', domain: 'technology', requirements: Array(1), queryType: 'ranking'}
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 1082}
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
summarizeRAGResults @ Orchestrator.ts:198
research @ Orchestrator.ts:59
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2311}
Orchestrator.ts:199 📚 RAG summary: <think>
Okay, let's start by understanding what the user is asking. They want a summary of the data ...
Orchestrator.ts:214 📋 Using optimized pipeline for small models: (4) ['DataInspector', 'PatternGenerator', 'Extractor', 'Synthesizer']
Orchestrator.ts:252 🤖 Executing agent: DataInspector (1/4)
ResearchOrchestrator.ts:643 🚀 Agent started: DataInspector (data_inspector)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
ResearchOrchestrator.ts:686 📊 Agent progress: DataInspector - 10% (Initializing)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
DataInspectorAgent.ts:30 🔎 DataInspector: Analyzing 10 sources (10 RAG, 0 Web)
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2615}
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
executeAgentPipeline @ Orchestrator.ts:270
research @ Orchestrator.ts:65
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 3084}
DataInspectorAgent.ts:68 🤖 Data inspection: <think>
Okay, let's see. The user wants to know about the best project from Rutwik's CV. They provided three different sources. 

First, Source 1 and 3 mention Rutwik as a Full Stack AI Developer, with projects like building frontend architecture, integrating APIs, and designing a serverless backend
DataInspectorAgent.ts:106 ✅ Generated 1 patterns from inspection
Orchestrator.ts:277 🔍 Agent DataInspector reasoning length: 3084
Orchestrator.ts:281 🧠 Thinking extraction for DataInspector: {hasThinking: true, thinkingLength: 2078, reasoningSnippet: "<think>\nOkay, let's see. The user wants to know ab… mention Rutwik as a Full Stack AI Developer, wit"}
Orchestrator.ts:298 ✅ Setting thinking for DataInspector: {thinkingContentLength: 2078, summaryLength: 103}
ResearchOrchestrator.ts:714 🧠 Agent thinking: DataInspector
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
ResearchOrchestrator.ts:733 ✅ Agent completed: DataInspector
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
Orchestrator.ts:252 🤖 Executing agent: PatternGenerator (2/4)
ResearchOrchestrator.ts:643 🚀 Agent started: PatternGenerator (pattern_generator)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
ResearchOrchestrator.ts:686 📊 Agent progress: PatternGenerator - 10% (Initializing)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
PatternGeneratorAgent.ts:24 🎯 PatternGenerator: Creating extraction strategies
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 194}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent DataInspector thinking data: {hasThinking: true, thinkingContentLength: 2078, summaryLength: 103, thinkingPreview: "Okay, let's see. The user wants to know about the best project from Rutwik's CV. They provided three"}
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
executeAgentPipeline @ Orchestrator.ts:270
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 3148}
PatternGeneratorAgent.ts:41 🤖 Strategy generation: <think>
Okay, the user is looking for information about the best project from Rutwik's CV and wants to know how to find relevant information. They mentioned that the data type is technology, so I need to focus on technology-related patterns or indicators.

First, I should think about the structure o
PatternGeneratorAgent.ts:82 ✅ Generated 2 extraction strategies
Orchestrator.ts:277 🔍 Agent PatternGenerator reasoning length: 3148
Orchestrator.ts:281 🧠 Thinking extraction for PatternGenerator: {hasThinking: true, thinkingLength: 2210, reasoningSnippet: '<think>\nOkay, the user is looking for information …ioned that the data type is technology, so I need'}
Orchestrator.ts:298 ✅ Setting thinking for PatternGenerator: {thinkingContentLength: 2210, summaryLength: 103}
ResearchOrchestrator.ts:714 🧠 Agent thinking: PatternGenerator
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
ResearchOrchestrator.ts:733 ✅ Agent completed: PatternGenerator
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
Orchestrator.ts:252 🤖 Executing agent: Extractor (3/4)
ResearchOrchestrator.ts:643 🚀 Agent started: Extractor (extraction)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
ResearchOrchestrator.ts:686 📊 Agent progress: Extractor - 10% (Initializing)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
ExtractionAgent.ts:26 ⛏️ Extractor: Processing 10 chunks
ExtractionAgent.ts:58 📊 Processing batch 1/5 (chunks 1-2 of 10)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2519}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent PatternGenerator thinking data: {hasThinking: true, thinkingContentLength: 2210, summaryLength: 103, thinkingPreview: "Okay, the user is looking for information about the best project from Rutwik's CV and wants to know "}
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
extractFromBatch @ ExtractionAgent.ts:202
process @ ExtractionAgent.ts:60
executeAgentPipeline @ Orchestrator.ts:270
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2343}
ExtractionAgent.ts:203 🤖 LLM extraction response: <think>
Okay, let's start by understanding the user's query and the text to extract. The user wants all data from the given text, starting immediately with "Entry 1:" or similar. The text is about Rutwik Shinde's CV and his projects with Next.js, Sanity CMS, and Mongo DB. 

First, I need to extract 
ExtractionAgent.ts:58 📊 Processing batch 2/5 (chunks 3-4 of 10)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2519}
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
extractFromBatch @ ExtractionAgent.ts:202
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2023}
ExtractionAgent.ts:203 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all data from the given text. The example they provided was in a table with entries, each with time values and some numbers. So first, I need to parse the text and find all those entries.

Looking at the text: Rutwik Shinde has a Software Develop
ExtractionAgent.ts:58 📊 Processing batch 3/5 (chunks 5-6 of 10)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2519}
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
extractFromBatch @ ExtractionAgent.ts:202
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 3246}
ExtractionAgent.ts:203 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all data from the given text. First, I need to make sure I understand the instructions correctly. They want all rows from tables, including all 6+ entries if present. Then, I have to include every time value found, handle any numbering format lik
ExtractionAgent.ts:58 📊 Processing batch 4/5 (chunks 7-8 of 10)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2519}
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
extractFromBatch @ ExtractionAgent.ts:202
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2381}
ExtractionAgent.ts:203 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all data from the given text, starting immediately with Entry 1. The example shows that entries are listed with time values and numbers like 1.1, 2.2, etc. So first, I need to go through the text and find all the rows mentioned.

Looking at the t
ExtractionAgent.ts:58 📊 Processing batch 5/5 (chunks 9-10 of 10)...
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2519}
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
extractFromBatch @ ExtractionAgent.ts:202
process @ ExtractionAgent.ts:60
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 1994}
ExtractionAgent.ts:203 🤖 LLM extraction response: <think>
Okay, let's see. The user wants me to extract all data from the given text and start immediately with the first entry. The example provided includes entries like "Initial baseline" and "Current record". 

First, I need to parse the text and find all the relevant rows. The text is about Rutwi
ExtractionAgent.ts:106 📊 Extraction Statistics:
ExtractionAgent.ts:107 - Total extracted: 47
ExtractionAgent.ts:108 - After deduplication: 28
ExtractionAgent.ts:109 - Items with time values: 25
ExtractionAgent.ts:110 - Table rows: 16
ExtractionAgent.ts:111 - Current records: 1
ExtractionAgent.ts:114 📈 Item types:
ExtractionAgent.ts:116   - current_record: 1
ExtractionAgent.ts:116   - table_row: 16
ExtractionAgent.ts:116   - list_item: 8
ExtractionAgent.ts:116   - time_data: 3
ExtractionAgent.ts:126 🔍 Sample time items:
ExtractionAgent.ts:128   - 3.14 minutes." That's the current record. Then there's the list of projects with Next.js, Sanity CMS, and Mongo DB. Each entry has time values. Let me check each one. → 3.14 minutes
ExtractionAgent.ts:128   - Entry 1: Initial baseline → 8.13 hours
ExtractionAgent.ts:128   - Entry 2: Architectural changes → 7.51 hours
ExtractionAgent.ts:86 ✅ Extraction complete: 28 items found
Orchestrator.ts:277 🔍 Agent Extractor reasoning length: 1149
Orchestrator.ts:281 🧠 Thinking extraction for Extractor: {hasThinking: false, thinkingLength: 0, reasoningSnippet: '📊 Starting extraction process for 10 chunks...\n\n\uD83C…tanding\n- Looking for: User wants ranking about t'}
Orchestrator.ts:305 ❌ No thinking found for Extractor, reasoning starts with: 📊 Starting extraction process for 10 chunks...

🎯 Extraction Strategy:
- Processing in batches of 
ResearchOrchestrator.ts:733 ✅ Agent completed: Extractor
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
Orchestrator.ts:252 🤖 Executing agent: Synthesizer (4/4)
ResearchOrchestrator.ts:643 🚀 Agent started: Synthesizer (synthesis)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
ResearchOrchestrator.ts:686 📊 Agent progress: Synthesizer - 10% (Initializing)
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
SynthesisAgent.ts:57 📝 Synthesizer: Creating final answer from 28 items
SynthesisAgent.ts:58    Sources: 10 RAG chunks, 0 Web sources
SynthesisAgent.ts:62 ⏱️ Time-based items received: 25
SynthesisAgent.ts:64   1. 3.14 minutes." That's the current record. Then there's the list of projects with Next.js, Sanity CMS, and Mongo DB. Each entry has time values. Let me check each one. → 3.14 minutes
SynthesisAgent.ts:64   2. Entry 1: Initial baseline → 8.13 hours
SynthesisAgent.ts:64   3. Entry 2: Architectural changes → 7.51 hours
SynthesisAgent.ts:64   4. Entry 2: Initial baseline → 8.13 hours
SynthesisAgent.ts:64   5. Entry 3: Muon optimizer → 4.53 hours
SynthesisAgent.ts:64   6. Entry 3: Architectural changes → 7.51 hours
SynthesisAgent.ts:619 🧹 Starting content cleaning and deduplication for 28 items
SynthesisAgent.ts:643 🧹 After content cleaning: 28 items (removed 0 malformed)
SynthesisAgent.ts:690 🗑️ Removing duplicate: "Entry 2: Initial baseline..." (similar to existing)
SynthesisAgent.ts:690 🗑️ Removing duplicate: "Entry 3: Architectural changes..." (similar to existing)
SynthesisAgent.ts:690 🗑️ Removing duplicate: "Entry 4: Muon optimizer..." (similar to existing)
SynthesisAgent.ts:690 🗑️ Removing duplicate: "Entry 6: Longer Sequence Length..." (similar to existing)
SynthesisAgent.ts:690 🗑️ Removing duplicate: "Entry 6: Logit Soft..." (similar to existing)
SynthesisAgent.ts:690 🗑️ Removing duplicate: "Entry 6: Dataloading tweaks..." (similar to existing)
SynthesisAgent.ts:690 🗑️ Removing duplicate: "Entry 7: Logit Soft..." (similar to existing)
SynthesisAgent.ts:690 🗑️ Removing duplicate: "Entry 8: Longer Sequence Length..." (similar to existing)
SynthesisAgent.ts:694 🧹 After deduplication: 20 items (removed 8 duplicates)
SynthesisAgent.ts:83 🧹 After cleaning: 20 items remain
SynthesisAgent.ts:879 📊 Found 8 table items out of 20 total
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 3358}
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
executeAgentPipeline @ Orchestrator.ts:270
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 3251}
SynthesisAgent.ts:910 🤖 LLM grouping analysis: <think>
Okay, let's start by understanding the user's query and the items they provided. The user wants to group the extracted items intelligently, specifically about the best project from Rutwik's CV
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 2504}
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
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 4269}
SynthesisAgent.ts:153 🤖 LLM classification response: <think>
Okay, let's break this down. The user asked about the best project from Rutwik's CV, and they provided some items with time values. The task is to categorize each item into current record/achi
useOllamaConnection.ts:353 🤖 Starting content generation... {hasClient: true, connected: true, model: 'qwen3:0.6b'}
useOllamaConnection.ts:396 🤖 Generating content with Ollama... {model: 'qwen3:0.6b', promptLength: 885}
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
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 2631}
SynthesisAgent.ts:124 ✅ Synthesis complete: 2631 characters
Orchestrator.ts:277 🔍 Agent Synthesizer reasoning length: 405
Orchestrator.ts:281 🧠 Thinking extraction for Synthesizer: {hasThinking: false, thinkingLength: 0, reasoningSnippet: '✅ Synthesis Complete!\n\n📊 Report Statistics:\n- Cri… 2631 characters\n\n🎯 The research report includes'}
Orchestrator.ts:305 ❌ No thinking found for Synthesizer, reasoning starts with: ✅ Synthesis Complete!

📊 Report Statistics:
- Critical findings identified: 3
- Total data points a
ResearchOrchestrator.ts:733 ✅ Agent completed: Synthesizer
useResearch.ts:942 📋 Step update: synthesis - in_progress - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:949 📋 Skipping duplicate step processing: synthesis_1754308223623_2_f0d0664b_in_progress
Orchestrator.ts:68 📝 Final synthesis: {hasAnswer: true, answerLength: 2631, preview: `<think>\nOkay, so the user asked, "tell me about best project from Rutwik's CV". They provided some t`}
ResearchOrchestrator.ts:796 ✅ Multi-agent system generated answer with 4 agent sub-steps
useResearch.ts:942 📋 Step update: synthesis - completed - ID: synthesis_1754308223623_2_f0d0664b
useResearch.ts:964 📋 Adding new step: synthesis_1754308223623_2_f0d0664b
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: synthesis_1754308223623_2_f0d0664b
ResearchOrchestrator.ts:211 ✅ Research completed: 7 steps, 10 sources, 200903ms
useResearch.ts:994 ✅ Intelligent research completed: {steps: 7, sources: 10, confidence: 0.5372491344835453, processingTime: 200903}
ResearchSteps.tsx:511 🚫 Preventing duplicate step addition: synthesis_1754308223623_2_f0d0664b
PerplexityStyleResearch.tsx:198 🎭 UI - Agent DataInspector thinking data: {hasThinking: true, thinkingContentLength: 2078, summaryLength: 103, thinkingPreview: "Okay, let's see. The user wants to know about the best project from Rutwik's CV. They provided three"}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent PatternGenerator thinking data: {hasThinking: true, thinkingContentLength: 2210, summaryLength: 103, thinkingPreview: "Okay, the user is looking for information about the best project from Rutwik's CV and wants to know "}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent DataInspector thinking data: {hasThinking: true, thinkingContentLength: 2078, summaryLength: 103, thinkingPreview: "Okay, let's see. The user wants to know about the best project from Rutwik's CV. They provided three"}
PerplexityStyleResearch.tsx:198 🎭 UI - Agent PatternGenerator thinking data: {hasThinking: true, thinkingContentLength: 2210, summaryLength: 103, thinkingPreview: "Okay, the user is looking for information about the best project from Rutwik's CV and wants to know "}
scheduler.development.js:14 [Violation] 'message' handler took 186ms
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
