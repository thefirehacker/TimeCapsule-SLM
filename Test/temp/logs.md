EnhancedLearningGraph.tsx:3278 🎯 Dispatching ensure-manual-session event for frame drop
page.tsx:2081 🔍 Checking for manual session... {activeSessionId: null, sessionsCount: 0}
page.tsx:2091 🆕 Auto-creating manual session for frame drop
useAIFlowBuilder.ts:934 🎬 [SESSION] Creating new manual session...
useAIFlowBuilder.ts:940 📦 [SESSION] New session object created: {id: 'manual_1764103323860_apg2klhs5', name: 'Manual Session', source: 'manual', timeCapsuleId: 'timecapsule_1764103318831_hxdf89job'}
useAIFlowBuilder.ts:970 ✅ [SESSION] Skipping graph clear - preserving existing nodes
useAIFlowBuilder.ts:997 💾 [SESSION] Saving new session to VectorStore...
useAIFlowBuilder.ts:1005 ✅ [SESSION] Session creation complete. Returning session ID: manual_1764103323860_apg2klhs5
page.tsx:2096 ✅ Manual session created: manual_1764103323860_apg2klhs5
EnhancedLearningGraph.tsx:3340 🎯 onDrop: About to set up setTimeout {type: 'aiframe', hasWindow: true}
EnhancedLearningGraph.tsx:3343 🎯 onDrop: Setting up setTimeout for delayed save
EnhancedLearningGraph.tsx:3419 🎯 onDrop: setTimeout registered
DualPaneFrameView.tsx:169 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 1}
page.tsx:1957 🔧 handleFramesChange: Merged 1 new frames with 0 existing frames {totalAfterMerge: 1, activeTimeCapsuleId: 'timecapsule_1764103318831_hxdf89job', activeSessionId: null, framesWithBoth: 0}
useAIFlowBuilder.ts:958 🎯 [SESSION] Setting active session ID: null -> manual_1764103323860_apg2klhs5
useAIFlowBuilder.ts:958 🎯 [SESSION] Setting active session ID: null -> manual_1764103323860_apg2klhs5
useAIFlowBuilder.ts:953 📋 [SESSION] Updating sessions array: 0 -> 1
useAIFlowBuilder.ts:953 📋 [SESSION] Updating sessions array: 0 -> 1
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 1
useAIProviders.ts:232 🔄 aiProviders object updated
useAIFlowBuilder.ts:1380 💾 Persisting active session ID to localStorage: manual_1764103323860_apg2klhs5
page.tsx:1247 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'manual_1764103323860_apg2klhs5', sessionsCount: 1, sessionsList: Array(1)}
page.tsx:1811 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
page.tsx:2126 🔧 Found 1 orphaned frames, assigning to session manual_1764103323860_apg2klhs5
page.tsx:2135 ✅ Assigned sessionId to 1 orphaned frames
useAIFlowBuilder.ts:1327 📊 Updating session frame count: 1 frames for session manual_1764103323860_apg2klhs5
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
RichTextEditor @ rich-text-editor.tsx:115
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:298
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
RichTextEditor @ rich-text-editor.tsx:115
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:298
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
RichTextEditor @ rich-text-editor.tsx:115
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:328
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
RichTextEditor @ rich-text-editor.tsx:115
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
EnhancedAIFrameNode @ EnhancedAIFrameNode.tsx:328
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
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 2
react-dom-client.development.js:16378 [Violation] 'drop' handler took 301ms
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 3
EnhancedLearningGraph.tsx:3375 📦 Stored pending frame for delayed save (AFTER session creation): {frameId: 'frame-1764103323859-f95kgwjws', sessionId: 'manual_1764103323860_apg2klhs5', timeCapsuleId: 'timecapsule_1764103318831_hxdf89job'}
EnhancedLearningGraph.tsx:3384 🔥 DELAYED SAVE: setTimeout fired! {type: 'aiframe', nodeCount: 1, usedPending: true}
EnhancedLearningGraph.tsx:3393 🔥 DELAYED SAVE: Dispatching event {nodeCount: 1, reason: 'node-drop-delayed'}
useUnifiedStorage.ts:1572 📥 handleForceSaveEvent received! {reason: 'node-drop-delayed', hasGraphState: true, nodeCount: 1, hasFrames: true, frameCount: 1, …}
useUnifiedStorage.ts:1597 ✅ Using frames from event: 1 frames (merged to 1)
useUnifiedStorage.ts:1603 ✅ Using chapters from event: 0 chapters (merged to 0)
useUnifiedStorage.ts:1614 ⏭️ Priority save - will override in-progress save with fresh graph state
EnhancedLearningGraph.tsx:3406 🔥 DELAYED SAVE: Event dispatched {hasFrames: true, frameCount: 1, hasChapters: true, chapterCount: 0}
useUnifiedStorage.ts:725 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(1), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
useAIProviders.ts:232 🔄 aiProviders object updated
react-dom-client.development.js:16378 [Violation] 'setTimeout' handler took 80ms
react-dom-client.development.js:16378 [Violation] 'setTimeout' handler took 50ms
EnhancedLearningGraph.tsx:142 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 1, edgeCount: 0}
EnhancedLearningGraph.tsx:142 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 1, edgeCount: 0}
unifiedStorage.ts:553 ✅ IndexedDB save completed
VectorStore.ts:1940 📊 Synced frame Manual Session to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: session_manual_1764103323860_apg2klhs5 (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2142 ✅ Document inserted: frames_session_1764103318777_fzqygog8b
VectorStore.ts:2634 🔍 Verifying document persistence: frames_session_1764103318777_fzqygog8b (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:1940 📊 Synced frame AI-Frame: New AI Frame to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame-1764103323859-f95kgwjws (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for session_manual_1764103323860_apg2klhs5: 1-giztycvpew
VectorStore.ts:2647 ✅ Document persistence verified: Manual Session (ID: session_manual_1764103323860_apg2klhs5, Rev: 1-giztycvpew)
sessionStore.ts:76 💾 Session saved: Manual Session (manual_1764103323860_apg2klhs5)
sessionStore.ts:76 💾 Session saved: Manual Session (manual_1764103323860_apg2klhs5)
useAIFlowBuilder.ts:999 ✅ [SESSION] New session saved to VectorStore
useAIFlowBuilder.ts:1346 ✅ Session metadata updated with 1 frames
useAIProviders.ts:232 🔄 aiProviders object updated
page.tsx:1247 🔍 [PAGE-RENDER] Active session changed: {activeSessionId: 'manual_1764103323860_apg2klhs5', sessionsCount: 1, sessionsList: Array(1)}
VectorStore.ts:2000 📋 Retrieved latest revision for frames_session_1764103318777_fzqygog8b: 1-giztycvpew
VectorStore.ts:2647 ✅ Document persistence verified: Frame Sequence - 1 frames (ID: frames_session_1764103318777_fzqygog8b, Rev: 1-giztycvpew)
FrameGraphIntegration.tsx:1121 📋 SCHEMA CHECK: Session document structure before insertion: {hasId: true, hasTitle: true, hasContent: true, hasMetadata: true, hasChunks: true, …}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764103323859-f95kgwjws: 1-giztycvpew
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: New AI Frame (ID: aiframe-frame-1764103323859-f95kgwjws, Rev: 1-giztycvpew)
VectorStore.ts:2142 ✅ Document inserted: sess-1764103324472-svdm9z
VectorStore.ts:2634 🔍 Verifying document persistence: sess-1764103324472-svdm9z (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:1940 📊 Synced frame AI-Frame Chapters to Knowledge Base (inserted)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for sess-1764103324472-svdm9z: 1-giztycvpew
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frames Session (ID: sess-1764103324472-svdm9z, Rev: 1-giztycvpew)
FrameGraphIntegration.tsx:1133 ✅ Session document inserted successfully: {sessionId: 'session_1764103324473', documentId: 'sess-1764103324472-svdm9z'}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 1-giztycvpew
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 1-giztycvpew)
unifiedStorage.ts:104 ✅ Unified save completed successfully
useUnifiedStorage.ts:758 🔄 BACKGROUND SAVE: Completed with result: {success: true, persistedNodeCount: 1, persistedEdgeCount: 0, persistedFrameCount: 1, persistedChapterCount: 0, …}
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:754
useAIProviders.ts:232 🔄 aiProviders object updated
hot-reloader-client.js:197 [Fast Refresh] rebuilding
EnhancedLearningGraph.tsx:142 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 1, edgeCount: 0}
webpack.js?v=1764103315465:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/b9824818af7a59e6.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764103315465:1367
Promise.then
hotCheck @ webpack.js?v=1764103315465:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 4
report-hmr-latency.js:14 [Fast Refresh] done in 639ms
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 5
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
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 6
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 7
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 8
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 9
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 10
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 11
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 12
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 13
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 14
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 15
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 16
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 17
EnhancedLearningGraph.tsx:142 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 1, edgeCount: 0}
js?id=G-V1B8R98P79:277 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5bi1v898116370za200zd898116370&_p=1764103320817&gcd=13l3l3l3l1l1&npa=0&dma=0&sr=2240x1260&cid=643493266.1764103321&ul=en-us&uaa=arm&uab=64&uafvl=Chromium%3B142.0.7444.162%7CGoogle%2520Chrome%3B142.0.7444.162%7CNot_A%2520Brand%3B99.0.0.0&uamb=0&uam=&uap=macOS&uapv=26.1.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AAAAAAQ&_s=4&tag_exp=103116026~103200004~104527906~104528500~104684208~104684211~115583767~115616986~115938465~115938469~116184927~116184929~116217636~116217638&sid=1764103320&sct=1&seg=1&dl=http%3A%2F%2Flocalhost%2Fai-frames&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=user_engagement&_ee=1&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.timestamp=2025-11-25T20%3A42%3A00.942Z&epn.page_duration=0&ep.device_type=desktop&ep.operating_system=macOS&ep.browser=Chrome&ep.browser_version=142.0.0.0&ep.viewport_size=2240x873&ep.device_language=en-US&ep.device_timezone=Asia%2FCalcutta&ep.device_online=true&epn.device_pixel_ratio=2&epn.device_memory=8&epn.device_cores=8&epn.device_touch_points=0&ep.connection_type=4g&ep.user_timezone=Asia%2FCalcutta&epn.timezone_offset=-330&ep.user_language=en-US&epn.user_latitude=19.17&epn.user_longitude=72.85&epn.location_accuracy=45.75199890136719&ep.action=page_visited&epn.duration_seconds=0&ep.event_category=engagement&ep.event_label=page_visited&_et=2&tfd=10510".
bd @ js?id=G-V1B8R98P79:277
Cl @ js?id=G-V1B8R98P79:443
SN @ js?id=G-V1B8R98P79:970
(anonymous) @ js?id=G-V1B8R98P79:977
(anonymous) @ js?id=G-V1B8R98P79:974
page.tsx:1649 Fetch finished loading: GET "http://localhost:3000/api/local/aiframes/state".
AIFramesPage.useEffect.poll @ page.tsx:1649
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:725 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 0, frameIds: Array(1), …}
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
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:348
setTimeout
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:346
triggerNodeChanges @ index.js:5054
updateNodePositions @ index.js:5042
eval @ index.js:2246
call @ dispatch.js:61
gesture @ drag.js:159
mouseupped @ drag.js:89
eval @ on.js:7
useUnifiedStorage.ts:758 🔄 BACKGROUND SAVE: Completed with result: {success: true, persistedNodeCount: 1, persistedEdgeCount: 0, persistedFrameCount: 1, persistedChapterCount: 0, …}
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1764103315465:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/b327b9adc567149e.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764103315465:1367
Promise.then
hotCheck @ webpack.js?v=1764103315465:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 413ms
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
EnhancedLearningGraph.tsx:3340 🎯 onDrop: About to set up setTimeout {type: 'video-attachment', hasWindow: true}
EnhancedLearningGraph.tsx:3343 🎯 onDrop: Setting up setTimeout for delayed save
EnhancedLearningGraph.tsx:3419 🎯 onDrop: setTimeout registered
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 18
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 19
EnhancedLearningGraph.tsx:3384 🔥 DELAYED SAVE: setTimeout fired! {type: 'video-attachment', nodeCount: 2, usedPending: true}
EnhancedLearningGraph.tsx:3393 🔥 DELAYED SAVE: Dispatching event {nodeCount: 2, reason: 'node-drop-delayed'}
useUnifiedStorage.ts:1572 📥 handleForceSaveEvent received! {reason: 'node-drop-delayed', hasGraphState: true, nodeCount: 2, hasFrames: false, frameCount: undefined, …}
useUnifiedStorage.ts:1603 ✅ Using chapters from event: 0 chapters (merged to 0)
useUnifiedStorage.ts:622 🔒 PRIORITY SAVE: Locked queue with fresh graph state {nodeCount: 2, edgeCount: 0, frameCount: 1, chapterCount: 0}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
EnhancedLearningGraph.tsx:3406 🔥 DELAYED SAVE: Event dispatched {hasFrames: false, frameCount: 0, hasChapters: true, chapterCount: 0}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764103323859-f95kgwjws: 1-giztycvpew
useAIProviders.ts:232 🔄 aiProviders object updated
unifiedStorage.ts:553 ✅ IndexedDB save completed
VectorStore.ts:1936 📊 Synced frame AI-Frame: New AI Frame to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame-1764103323859-f95kgwjws (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764103323859-f95kgwjws: 2-giztycvpew
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: New AI Frame (ID: aiframe-frame-1764103323859-f95kgwjws, Rev: 2-giztycvpew)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 1-giztycvpew
VectorStore.ts:1936 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 2-giztycvpew
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 2-giztycvpew)
unifiedStorage.ts:104 ✅ Unified save completed successfully
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:650
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:1623
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:3396
setTimeout
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:3346
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
useUnifiedStorage.ts:653 🔒 PRIORITY SAVE: Completed with result: {success: true, persistedNodeCount: 2, persistedEdgeCount: 0, persistedFrameCount: 1, persistedChapterCount: 0}
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:142 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 2, edgeCount: 0}
webpack.js?v=1764103315465:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/7a2fa02a6d94d440.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764103315465:1367
Promise.then
hotCheck @ webpack.js?v=1764103315465:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 324ms
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
EnhancedLearningGraph.tsx:2798 🔗 onConnect triggered: {source: 'node_1764103328430_3hoh5zmcz_1', target: 'node_1764103323858_w7q7x5dfh_0', sourceHandle: null, targetHandle: 'attachment-slot'}
DualPaneFrameView.tsx:169 🌀 DualPane invokeFramesChange {reason: 'dual-pane', count: 1}
page.tsx:1957 🔧 handleFramesChange: Merged 1 new frames with 1 existing frames {totalAfterMerge: 1, activeTimeCapsuleId: 'timecapsule_1764103318831_hxdf89job', activeSessionId: 'manual_1764103323860_apg2klhs5', framesWithBoth: 1}
EnhancedLearningGraph.tsx:2982 📤 Emitting graph-connection-added event: {edgeId: 'edge|node_1764103328430_3hoh5zmcz_1|node_1764103323858_w7q7x5dfh_0|1764103330430_2od9irhbr', source: 'node_1764103328430_3hoh5zmcz_1', target: 'node_1764103323858_w7q7x5dfh_0'}
useUnifiedStorage.ts:1628 📥 handleGraphConnectionEvent received: {eventType: 'graph-connection-added', hasConnection: true}
useUnifiedStorage.ts:1421 📥 handleConnectionChangedEvent received: {connectionType: 'added', hasConnectionData: true}
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":true,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 20
useAIProviders.ts:232 🔄 aiProviders object updated
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 21
EnhancedLearningGraph.tsx:142 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 1, edgeCount: 1}
react-dom-client.development.js:16378 [Violation] 'mouseup' handler took 204ms
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 22
EnhancedLearningGraph.tsx:3914 🐛 EnhancedLearningGraph prop diff {"nodesChanged":true,"edgesChanged":false,"handleNodesChangeChanged":false,"handleEdgesChangeChanged":false,"handleNodesDeleteChanged":false,"onConnectChanged":false,"onEdgesDeleteChanged":false,"onDropChanged":false}
EnhancedLearningGraph.tsx:3926 EnhancedLearningGraph rerender: 23
useUnifiedStorage.ts:725 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 1, frameIds: Array(1), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: true}
EnhancedLearningGraph.tsx:3027 📤 Emitting graph-state-changed event (edge-added): {edgeId: 'edge|node_1764103328430_3hoh5zmcz_1|node_1764103323858_w7q7x5dfh_0|1764103330430_2od9irhbr', totalEdges: 2}
unifiedStorage.ts:553 ✅ IndexedDB save completed
unifiedStorage.ts:104 ✅ Unified save completed successfully
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:754
useUnifiedStorage.ts:758 🔄 BACKGROUND SAVE: Completed with result: {success: true, persistedNodeCount: 1, persistedEdgeCount: 1, persistedFrameCount: 1, persistedChapterCount: 0, …}
hot-reloader-client.js:197 [Fast Refresh] rebuilding
useAIProviders.ts:232 🔄 aiProviders object updated
useUnifiedStorage.ts:725 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 1, edgeCount: 2, frameIds: Array(1), …}
unifiedStorage.ts:74 💾 Starting unified save... {skipVectorStore: false}
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764103323859-f95kgwjws: 2-giztycvpew
unifiedStorage.ts:553 ✅ IndexedDB save completed
VectorStore.ts:1936 📊 Synced frame AI-Frame: New AI Frame to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-frame-1764103323859-f95kgwjws (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-frame-1764103323859-f95kgwjws: 3-giztycvpew
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame: New AI Frame (ID: aiframe-frame-1764103323859-f95kgwjws, Rev: 3-giztycvpew)
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 2-giztycvpew
VectorStore.ts:1936 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2634 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2679 💾 Database flush completed
VectorStore.ts:2000 📋 Retrieved latest revision for aiframe-chapters: 3-giztycvpew
VectorStore.ts:2647 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 3-giztycvpew)
unifiedStorage.ts:104 ✅ Unified save completed successfully
unifiedStorage.ts:720 Fetch finished loading: POST "http://localhost:3000/api/local/aiframes/state".
syncLocalBridge @ unifiedStorage.ts:720
saveAll @ unifiedStorage.ts:105
await in saveAll
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:754
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:799
useUnifiedStorage.ts:758 🔄 BACKGROUND SAVE: Completed with result: {success: true, persistedNodeCount: 1, persistedEdgeCount: 2, persistedFrameCount: 1, persistedChapterCount: 0, …}
hot-reloader-client.js:197 [Fast Refresh] rebuilding
EnhancedLearningGraph.tsx:142 🔄 [Issue 16] Syncing initialGraphState to graph: {nodeCount: 1, edgeCount: 1}
webpack.js?v=1764103315465:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/5fa19d316393d524.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764103315465:1367
Promise.then
hotCheck @ webpack.js?v=1764103315465:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 215ms
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
useAIProviders.ts:232 🔄 aiProviders object updated
webpack.js?v=1764103315465:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/97a558d13e35be45.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1764103315465:1367
Promise.then
hotCheck @ webpack.js?v=1764103315465:553
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
report-hmr-latency.js:14 [Fast Refresh] done in 472ms
useAIProviders.ts:232 🔄 aiProviders object updated
