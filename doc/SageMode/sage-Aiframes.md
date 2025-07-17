I need to see these specific logs to understand the fundamental issue:

  1. KB Save sequence:
  💾 KB SAVE FRAME CONTENT DEBUG:
  (Should show 2 saves - first with wrong data, second with correct data)

  2. Smart merge decisions:
  🔍 SMART MERGE DECISIONS:
  (To confirm merge is working correctly)

  3. Broadcast result:
  🔄 GOOGLE DOCS: Broadcasting merged frame data
  (To see what gets broadcast to application state)

  4. After refresh - KB load:
  Any logs that show what data is being loaded from KB after refresh (not
  saved, but loaded)

  These 4 log sets will show me:
  - What's being saved (should be correct)
  - What's being loaded (apparently wrong)
  - Where the disconnect happens between save and load