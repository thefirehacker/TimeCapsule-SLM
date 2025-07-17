# Test Text Attachment Workflow

## Steps to Test Text Attachment Persistence

1. **Create a Frame**
   - Go to ai-frames page
   - Create a new frame (f1)
   - Verify frame is created successfully

2. **Attach Text Content**
   - In graph view, drag a text attachment node
   - Edit the text attachment node and add content: "This is my test text content"
   - Save the text attachment
   - Connect the text attachment to the frame

3. **Edit Text Content**
   - Edit the text attachment again
   - Change content to: "This is my UPDATED test text content"
   - Save the changes

4. **Save Graph**
   - Click "Save Graph" button
   - Wait for all sync operations to complete

5. **Test Persistence**
   - Refresh the page OR
   - Go to deep-research and come back to ai-frames
   - Check if the text content persists

## Expected Behavior
- Text content should persist after save graph and refresh
- The UPDATED text should be visible

## Current Issue
- Text content is lost after save graph and refresh
- Frame shows text attachment but with empty content

## Debug Information
With the enhanced logging, we should see:
- Text content being extracted from graph nodes
- Text content being saved to Knowledge Base  
- Text content being restored from Knowledge Base
- Where exactly the text content gets lost