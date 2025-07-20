hub.js:216 Fetch finished loading: GET "https://cas-bridge.xethub.hf.co/xet-bridge-us/645192b75fb40b9f50b71914/c96f5f1e2aee643bd8191bb520a3e175db7b05821579a02a70acdf31e655d194?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cas%2F20250720%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250720T130229Z&X-Amz-Expires=3600&X-Amz-Signature=5cc78625a13a6a7597a7354567e3c8d29c911368252fb148c1c05f7d22229276&X-Amz-SignedHeaders=host&X-Xet-Cas-Uid=public&response-content-disposition=inline%3B+filename*%3DUTF-8%27%27model_quantized.onnx%3B+filename%3D%22model_quantized.onnx%22%3B&x-id=GetObject&Expires=1753020149&Policy=eyJTdGF0ZW1lbnQiOlt7IkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc1MzAyMDE0OX19LCJSZXNvdXJjZSI6Imh0dHBzOi8vY2FzLWJyaWRnZS54ZXRodWIuaGYuY28veGV0LWJyaWRnZS11cy82NDUxOTJiNzVmYjQwYjlmNTBiNzE5MTQvYzk2ZjVmMWUyYWVlNjQzYmQ4MTkxYmI1MjBhM2UxNzVkYjdiMDU4MjE1NzlhMDJhNzBhY2RmMzFlNjU1ZDE5NCoifV19&Signature=uA6Zavaw1j5yKSKM-kXiFaIumiwdFkQnsshyld6162GOmi7Qu2ZJU%7EDblp6YVomz3WvXaSH6pdZ69z2EixXJe8e5vzmB%7Evef2O3cbDhqCcqi6YxmbMReh3WSsoTZ93hQgdyN9HLImElT08Ift0gc8kCZRpOSLh8VEo0H77cMeBvg80ByKMwhcm5VVaIaQtaU8-FzKqCz4YieYJgApOMu4XKNN7JQFcBzv0LeEbR-0CPh5UfxtKMF-pSRqDzpRHUbl41VVHnnS3-miWHV9qaVzNgcumCeFogqzdWLTKtf6QSCUzeJdEFyG08kGxcZaOFMZUulqXdGjPh2VLB50fAdeg__&Key-Pair-Id=K2L8F4GPSG1IFC".
getFile @ hub.js:216
getModelFile @ hub.js:480
await in getModelFile
constructSession @ models.js:451
from_pretrained @ models.js:1123
from_pretrained @ models.js:5847
EmbeddingService.ts:147 ✅ Model loaded from cache instantly
VectorStore.ts:1467 📊 Xenova progress: Embedding model ready (100%)
EmbeddingService.ts:156 ✅ EmbeddingService initialized successfully
VectorStore.ts:1473 ✅ Xenova embedding service ready
VectorStore.ts:1473 ✅ Xenova embedding service ready
VectorStore.ts:1424 ✅ Immediate background download completed
VectorStore.ts:1424 ✅ Immediate background download completed
VectorStore.ts:267 ✅ Xenova model downloaded and cached - all features ready
VectorStore.ts:274 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
VectorStore.ts:267 ✅ Xenova model downloaded and cached - all features ready
VectorStore.ts:274 🔍 Status set to ready. Full status: {isInitialized: true, downloadStatus: 'ready', hasDocumentProcessor: true, processorAvailable: true, processingAvailable: true, …}
EnhancedLearningGraph.tsx:846 🔍 FRAME CREATION DEBUG: {currentFramesLength: 0, newFrameId: 'frame-1753017088200', newFrameTitle: 'Frame 1', updatedFramesLength: 1}
EnhancedLearningGraph.tsx:855 🔍 FINAL FRAME UPDATE: {finalFrameCount: 1, frameIds: Array(1), frameTitles: Array(1)}
EnhancedLearningGraph.tsx:873 ✅ Enhanced: New frame added to frames array → Frame Navigation sync triggered: {frameId: 'frame-1753017088200', title: 'Frame 1', totalFrames: 1}
useUnifiedStorage.ts:465 ⏱️ Starting 5-second auto-save countdown for content changes...
page.tsx:598 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasUnifiedMethods: true}
VectorStore.ts:1113 ✅ Document inserted: frames_session_1753017083208_mkln5n594
VectorStore.ts:1559 🔍 Verifying document persistence: frames_session_1753017083208_mkln5n594 (attempt 1/3)
VectorStore.ts:1604 💾 Database flush completed
VectorStore.ts:911 📊 Synced frame AI-Frame [1]: Frame 1 to Knowledge Base (inserted)
VectorStore.ts:1604 💾 Database flush completed
VectorStore.ts:1559 🔍 Verifying document persistence: aiframe-frame-1753017088200 (attempt 1/3)
VectorStore.ts:1604 💾 Database flush completed
VectorStore.ts:971 📋 Retrieved latest revision for frames_session_1753017083208_mkln5n594: 1-fgsxtbobok
VectorStore.ts:1572 ✅ Document persistence verified: Frame Sequence - 1 frames (ID: frames_session_1753017083208_mkln5n594, Rev: 1-fgsxtbobok)
VectorStore.ts:971 📋 Retrieved latest revision for aiframe-frame-1753017088200: 1-fgsxtbobok
VectorStore.ts:1572 ✅ Document persistence verified: AI-Frame [1]: Frame 1 (ID: aiframe-frame-1753017088200, Rev: 1-fgsxtbobok)
VectorStore.ts:1113 ✅ Document inserted: session-1753017088384
VectorStore.ts:1559 🔍 Verifying document persistence: session-1753017088384 (attempt 1/3)
VectorStore.ts:1604 💾 Database flush completed
VectorStore.ts:971 📋 Retrieved latest revision for session-1753017088384: 1-fgsxtbobok
VectorStore.ts:1572 ✅ Document persistence verified: AI-Frames Session (ID: session-1753017088384, Rev: 1-fgsxtbobok)
js?id=G-V1B8R98P79:240 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je57g1v898116370za200&_p=1753017080901&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104684208~104684211&cid=1089296885.1753017081&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.102%7CGoogle%2520Chrome%3B138.0.7204.102&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEAAAAQ&_s=7&dl=http%3A%2F%2Flocalhost%3A3000%2Fai-frames&dr=http%3A%2F%2Flocalhost%3A3000%2F&sid=1753017080&sct=1&seg=1&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=page_view&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&_et=870&tfd=10916".
Vc @ js?id=G-V1B8R98P79:240
mm @ js?id=G-V1B8R98P79:425
$M @ js?id=G-V1B8R98P79:902
k.flush @ js?id=G-V1B8R98P79:910
(anonymous) @ js?id=G-V1B8R98P79:907
EnhancedLearningGraph.tsx:917 🔄 Enhanced: Graph node selected → Frame Navigation sync triggered: {nodeId: 'enhanced_node_0', frameId: 'frame-1753017088200', frameIndex: 0}
unifiedStorage.ts:73 💾 Starting unified save...
unifiedStorage.ts:199 🔍 SAVE DEBUG: Creating app state with: {frameCount: 1, graphStateNodes: 0, graphStateEdges: 0, graphStateViewport: undefined, selectedNodeId: null}
unifiedStorage.ts:350 📝 IndexedDB save placeholder
VectorStore.ts:627 🗑️ Deleting document: aiframe-frame-1753017088200 (attempt 1/5)
VectorStore.ts:971 📋 Retrieved latest revision for aiframe-frame-1753017088200: 1-fgsxtbobok
VectorStore.ts:635 📋 Document aiframe-frame-1753017088200 found with revision: 1-fgsxtbobok
VectorStore.ts:639 ✅ Document deleted successfully: aiframe-frame-1753017088200
VectorStore.ts:1199 🔄 Bypassing duplicate detection for AI-Frames update: AI-Frame: Frame 1
VectorStore.ts:1113 ✅ Document inserted: aiframe-frame-1753017088200
VectorStore.ts:1559 🔍 Verifying document persistence: aiframe-frame-1753017088200 (attempt 1/3)
VectorStore.ts:1604 💾 Database flush completed
VectorStore.ts:971 📋 Retrieved latest revision for aiframe-frame-1753017088200: 3-fgsxtbobok
VectorStore.ts:1572 ✅ Document persistence verified: AI-Frame: Frame 1 (ID: aiframe-frame-1753017088200, Rev: 3-fgsxtbobok)
unifiedStorage.ts:95 ✅ Unified save completed successfully
page.tsx:598 🔧 AI-Frames unified storage interface updated: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 0, hasUnifiedMethods: true}
useUnifiedStorage.ts:311 🎯 Frame edit event captured: {frameId: 'frame-1753017088200', frameData: {…}, currentFrameCount: 0}
useUnifiedStorage.ts:355 🔄 Frame edit processed via updateFrames - direct save will trigger in 1 second
EnhancedAIFrameNode.tsx:76 ✏️ Enhanced AI Frame Node: Frame edit event emitted: {frameId: 'frame-1753017088200', title: 'f1'}
useUnifiedStorage.ts:465 ⏱️ Starting 5-second auto-save countdown for content changes...
VectorStore.ts:971 📋 Retrieved latest revision for aiframe-frame-1753017088200: 3-fgsxtbobok
VectorStore.ts:907 📊 Synced frame AI-Frame [1]: f1 to Knowledge Base (updated)
VectorStore.ts:1559 🔍 Verifying document persistence: aiframe-frame-1753017088200 (attempt 1/3)
VectorStore.ts:1604 💾 Database flush completed
VectorStore.ts:971 📋 Retrieved latest revision for aiframe-frame-1753017088200: 4-fgsxtbobok
VectorStore.ts:1572 ✅ Document persistence verified: AI-Frame [1]: f1 (ID: aiframe-frame-1753017088200, Rev: 4-fgsxtbobok)
useUnifiedStorage.ts:351 🎯 Edit event triggered FORCED save - no state checks
unifiedStorage.ts:73 💾 Starting unified save...
unifiedStorage.ts:199 🔍 SAVE DEBUG: Creating app state with: {frameCount: 0, graphStateNodes: 0, graphStateEdges: 0, graphStateViewport: undefined, selectedNodeId: null}
unifiedStorage.ts:350 📝 IndexedDB save placeholder
VectorStore.ts:627 🗑️ Deleting document: aiframe-frame-1753017088200 (attempt 1/5)
VectorStore.ts:971 📋 Retrieved latest revision for aiframe-frame-1753017088200: 4-fgsxtbobok
VectorStore.ts:635 📋 Document aiframe-frame-1753017088200 found with revision: 4-fgsxtbobok
VectorStore.ts:639 ✅ Document deleted successfully: aiframe-frame-1753017088200
unifiedStorage.ts:95 ✅ Unified save completed successfully
useUnifiedStorage.ts:101 ✅ Manual save completed successfully
unifiedStorage.ts:73 💾 Starting unified save...
unifiedStorage.ts:199 🔍 SAVE DEBUG: Creating app state with: {frameCount: 0, graphStateNodes: 0, graphStateEdges: 0, graphStateViewport: undefined, selectedNodeId: null}
unifiedStorage.ts:350 📝 IndexedDB save placeholder
unifiedStorage.ts:95 ✅ Unified save completed successfully
