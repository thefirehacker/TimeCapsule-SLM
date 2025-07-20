# Phase 2: Attachment & Connection Testing Plan

## ✅ **What We've Fixed**

### **Breakthrough Applied to Attachments:**
1. **🔧 Stale Closure Fix**: Applied `framesRef.current` pattern to:
   - `handleAttachContent` - Fixed attachment operations
   - `handleDetachContent` - Fixed detachment operations
   - `handleFrameUpdate` - Already fixed in Phase 1

2. **🚀 Dynamic Architecture**: Removed hardcoding:
   - `FrameAttachment.type: string` (was hardcoded to 'video' | 'pdf' | 'text')
   - `FrameAttachment.data: Record<string, any>` (was hardcoded properties)
   - `UnifiedAIFrame.attachment` - Now fully dynamic
   - Content generation - Now handles any attachment properties

## 🧪 **Test Scenarios to Validate**

### **TC-002: Attachment Persistence Test**
```
STEPS:
1. Create frame "f1"
2. Add video attachment with URL "https://youtube.com/test"
3. Set video startTime: 30, duration: 120
4. Save and refresh
5. Verify attachment persists exactly

EXPECTED:
✅ Frame "f1" appears
✅ Video attachment preserved
✅ URL = "https://youtube.com/test"
✅ StartTime = 30, Duration = 120
✅ Attachment connection visible
```

### **TC-003: Multiple Attachment Types**
```
STEPS:
1. Create frame "f2" with PDF attachment
2. Create frame "f3" with text attachment  
3. Create frame "f4" with video attachment
4. Save and refresh
5. Verify all attachment types work

EXPECTED:
✅ All 3 frames appear with correct attachments
✅ PDF, text, video attachments all preserved
✅ No cross-contamination between attachment types
```

### **TC-004: Connection Persistence**
```
STEPS:
1. Create frame "f1" and frame "f2"
2. Connect f1 → f2 with edge/connection
3. Add attachment to f1
4. Connect attachment → f1
5. Save and refresh
6. Verify all connections preserved

EXPECTED:
✅ Frame-to-frame connection preserved
✅ Attachment-to-frame connection preserved
✅ Connection visual lines display correctly
✅ No broken/orphaned connections
```

### **TC-005: Dynamic Extensibility Test**
```
STEPS:
1. Create custom attachment type "audio" 
2. Add properties: audioUrl, bitrate, artist
3. Attach to frame and save
4. Refresh and verify preservation

EXPECTED:
✅ Custom "audio" type accepted
✅ Custom properties (audioUrl, bitrate, artist) preserved
✅ No hardcoding blocks new attachment type
✅ Future-proof for dark mode, AR, VR types
```

## 🎯 **Ready for Testing**

The breakthrough fix that resolved frame content corruption has been:
1. ✅ **Applied to attachments** - `handleAttachContent`, `handleDetachContent`
2. ✅ **Made dynamic** - No hardcoded attachment types or properties
3. ✅ **Future-proofed** - Supports any attachment type for dark mode, etc.

**Next Step**: Test all scenarios above to confirm Phase 2 complete.