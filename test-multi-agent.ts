/**
 * Test script for the multi-agent system
 */

import { createMultiAgentSystem } from './src/lib/multi-agent';
import { createInitialContext } from './src/lib/multi-agent/interfaces/Context';

// Mock LLM function for testing
const mockLLM = async (prompt: string): Promise<string> => {
  console.log('\n🤖 LLM Prompt:', prompt.substring(0, 200) + '...\n');
  
  // Simulate different LLM responses based on prompt content
  if (prompt.includes('Understand what the user is asking')) {
    return 'The user wants to find the top 3 fastest speed run times from Tyler\'s blog. They are looking for completion times (in hours/minutes), not performance metrics like tokens/sec.';
  }
  
  if (prompt.includes('Look at this data and tell me')) {
    return `I can see this is a progress table from Tyler's blog showing speedrun attempts.
    
The data contains:
1. A numbered list of runs (1-6)
2. Descriptions like "Initial baseline", "Architectural changes"
3. Run times in hours (8.13 hours, 7.51 hours, 4.53 hours, etc.)
4. Performance metrics in tokens/sec (which we should ignore for speed runs)

For speed runs, we should extract the run times in hours, not the tokens/sec metrics.`;
  }
  
  if (prompt.includes('Create extraction strategies')) {
    return `To find speed runs from Tyler's blog:

1. Look for table rows with numbers followed by descriptions and time values
2. AVOID extracting tokens/sec, throughput, or performance metrics
3. Focus on entries with "hours" as the time unit

The data appears to be in a table format where each row has:
- Run number (1, 2, 3, etc.)
- Description (Initial baseline, Architectural changes, etc.)
- Time in hours (8.13 hours, 7.51 hours, etc.)`;
  }
  
  if (prompt.includes('Read this text and find')) {
    // Simulate finding the speed runs from the table
    return `Found these speed runs from the progress table:

1. Initial baseline - 8.13 hours
2. Architectural changes - 7.51 hours  
3. Muon optimizer - 4.53 hours
4. Dataloading tweaks - 4.26 hours
5. Logit Soft-capping at 30 - 4.01 hours
6. Longer Sequence Length - 2.55 hours`;
  }
  
  return 'No specific information found.';
};

// Test data simulating Tyler's blog
const testRAGChunks = [
  {
    id: 'chunk1',
    text: `# pdf part 
Progress so far
# Description Record time Training Tokens Tokens/Second Date Commit Log
1 Initial baseline 8.13 hours 6.44B 221k 2025/01/16 b3cc32ff88 heerree
2..1.1.1.1.1 Architectural changes 7.51 hours 5.07B 188k 2025/01/18 b7bb93ff heerree
2..2.2.2.2.2 Muon optimizer 4.53 hours 3.04B 187k 2025/01/23 b91cc2cc0 heerree
2..3.3.3.3.3 Dataloading tweaks 4.26 hours 3.31B 216k 2025/02/18 d59944d heerree
2..4.4.4.4.4 Logit Soft-capping at 30 4.01 hours 3.15B 218k 2025/02/23 12eeaab44 heerree
3 Longer Sequence Length 2.55 hours 1.88B 205k 2025/03/03 d9882eed5 heerree`,
    source: 'tyler-blog.pdf',
    similarity: 0.95
  }
];

async function runTest() {
  console.log('🧪 Testing Multi-Agent System\n');
  
  // Create the multi-agent system
  const orchestrator = createMultiAgentSystem(mockLLM);
  
  // Create initial context
  const context = createInitialContext(
    'Give me the top 3 speed runs from Tyler\'s blog',
    { chunks: testRAGChunks, totalChunks: 1 }
  );
  
  // Run the multi-agent pipeline
  console.log('🚀 Running multi-agent pipeline...\n');
  const result = await orchestrator.process(context);
  
  // Display results
  console.log('\n📊 Final Results:\n');
  console.log('Answer:', result.synthesis.answer);
  console.log('\nExtracted Items:', result.extractedData.raw.length);
  console.log('\nAgent Reasoning:');
  result.agentReasonings.forEach(r => {
    console.log(`  ${r.agent}: ${r.reasoning}`);
  });
}

// Run the test
runTest().catch(console.error);