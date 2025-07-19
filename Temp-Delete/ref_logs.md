on using save button on frame below is shown 

{
    "frameId": "frame-1752944182960",
    "nodeId": "enhanced_node_2",
    "attachmentType": "video",
    "attachmentData": {
        "title": "Joy VIdeo 01",
        "videoUrl": "https://www.youtube.com/watch?v=po7doQNkhuU",
        "startTime": 600,
        "duration": 300,
        "notes": "Test Joy frame"
    }
}

Full console 
EnhancedLearningGraph.tsx:868 📡 Enhanced Graph: Attachment node updated event received: {frameId: 'frame-1752944182960', nodeId: 'enhanced_node_2', attachmentType: 'video', attachmentData: {…}}attachmentData: duration: 300notes: "Test Joy frame"startTime: 600title: "Joy VIdeo 01"videoUrl: "https://www.youtube.com/watch?v=po7doQNkhuU"[[Prototype]]: Objectconstructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()__proto__: (...)get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()attachmentType: "video"frameId: "frame-1752944182960"nodeId: "enhanced_node_2"[[Prototype]]: Object
EnhancedLearningGraph.tsx:129 🎥 CRITICAL DEBUG: Video attachment data: {attachmentDataVideoUrl: 'https://www.youtube.com/watch?v=po7doQNkhuU', attachmentDataStartTime: 600, attachmentDataDuration: 300, videoUrlEmpty: false, videoUrlLength: 43}
EnhancedLearningGraph.tsx:156 🎥 CRITICAL DEBUG: Frame updated with video data: {frameId: 'frame-1752944182960', frameVideoUrl: 'https://www.youtube.com/watch?v=po7doQNkhuU', frameStartTime: 600, frameDuration: 300, frameHasAttachment: true, …}
EnhancedLearningGraph.tsx:194 ✅ Enhanced: Content attached → Frame Navigation sync triggered: {frameId: 'frame-1752944182960', attachmentType: 'video', action: 'attached'}
VideoAttachmentNode.tsx:61 📡 Video attachment updated, notifying connected frame: {frameId: 'frame-1752944182960', videoUrl: 'https://www.youtube.com/watch?v=po7doQNkhuU'}
page.tsx:639 🔧 AI-Frames app interface exposed to window: {hasVectorStore: true, vectorStoreInitialized: true, frameCount: 1, hasSyncMethods: true, hasSaveMethod: true}
scheduler.development.js:14 [Violation] 'message' handler took 166ms


# local storage

## ai frames timecapsule 
{
    "0": {
        "id": "frame-1752944182960",
        "title": "Goal 01",
        "goal": "Goal 01",
        "informationText": "Context 01",
        "videoUrl": "",
        "startTime": 0,
        "duration": 300,
        "afterVideoText": "Key takeaways and next steps...",
        "aiConcepts": [],
        "isGenerated": true,
        "order": 1,
        "bubblSpaceId": "default",
        "timeCapsuleId": "default",
        "type": "frame",
        "createdAt": "2025-07-19T16:56:56.909Z",
        "updatedAt": "2025-07-19T16:57:55.486Z",
        "attachment": {
            "id": "enhanced_node_2",
            "type": "video",
            "data": {
                "title": "Video Content01",
                "videoUrl": "https://www.youtube.com/watch?v=po7doQNkhuU",
                "startTime": 600,
                "duration": 300,
                "notes": ""
            }
        }
    },
    "data": {
        "graphState": {
            "nodes": [],
            "edges": [],
            "selectedNodeId": null
        },
        "chapters": [
            {
                "id": "chapter-0",
                "title": "General",
                "description": "Chapter focusing on General",
                "frames": [
                    {
                        "id": "frame-1752944182960",
                        "title": "Goal 01",
                        "goal": "Goal 01",
                        "informationText": "Context 01",
                        "videoUrl": "https://www.youtube.com/watch?v=po7doQNkhuU",
                        "startTime": 600,
                        "duration": 300,
                        "afterVideoText": "Key takeaways and next steps...",
                        "aiConcepts": [],
                        "isGenerated": true,
                        "order": 1,
                        "type": "frame",
                        "createdAt": "2025-07-19T16:56:56.909Z",
                        "updatedAt": "2025-07-19T16:57:55.486Z",
                        "attachment": {
                            "id": "enhanced_node_2",
                            "type": "video",
                            "data": {
                                "title": "Joy VIdeo 01",
                                "videoUrl": "https://www.youtube.com/watch?v=po7doQNkhuU",
                                "startTime": 600,
                                "duration": 300,
                                "notes": "Test Joy frame"
                            }
                        }
                    }
                ],
                "startIndex": 0,
                "endIndex": 0
            }
        ],
        "lastGraphUpdate": "2025-07-19T17:02:20.572Z"
    }
}
