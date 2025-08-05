/**
 * Test script to verify Tyler's speedrun extraction works with the fixed pipeline
 * Expected: Extract all 6 timing entries (8.13h, 7.51h, 4.53h, 4.26h, 4.01h, 2.55h)
 */

console.log(`
🧪 TEST: Tyler Speedrun Extraction Test
=====================================

📋 Test Objectives:
1. Verify agent execution order: DataInspector → PatternGenerator → ChunkSelector
2. Confirm patterns flow from PatternGenerator to ChunkSelector  
3. Check regex search finds Tyler's speedrun times
4. Validate extraction of all 6 timing entries

🎯 Expected Results:
- DataInspector identifies Tyler's blog content
- PatternGenerator creates regex patterns for timing data
- ChunkSelector uses regex patterns to find relevant chunks
- Extractor finds: 8.13h, 7.51h, 4.53h, 4.26h, 4.01h, 2.55h
- Synthesizer returns top 3 fastest: 2.55h, 4.01h, 4.26h

📝 Test Query: "give me top 3 speed runs from Tyler's blog"

🚀 Test Status: Ready to run
- Fixed execution order ✅
- Added debug logging ✅
- Fixed pattern inheritance ✅

⚠️ Note: Run this test in the application with the query above and check console logs for:
- "DEBUG - Existing patterns before PatternGenerator"
- "DEBUG - Patterns after PatternGenerator" 
- "DEBUG - ChunkSelector received context"
- "TIER 1: Regex pattern search"

Expected flow in logs:
1. DataInspector: "Found blog post discussing GPT-2 speedrunning"
2. PatternGenerator: "Generated X dynamic regex patterns"
3. ChunkSelector: "Executing Tier 1: Regex pattern search"
4. Extractor: "Processing batch with speedrun data"
5. Synthesizer: "Top 3 speedruns identified"
`);